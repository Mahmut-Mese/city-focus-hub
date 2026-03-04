import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import session from 'express-session';
import express from 'express';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createAdmin } from './admin.js';
import { ensureContentDatabase } from './bootstrap-content.js';
import { config } from './config.js';
import { sequelize } from './database.js';
import { createMediaAssetFromUpload } from './media-pages.js';
import { buildResources } from './models.js';
import { registerPublicApi } from './public-api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDirectory = path.join(__dirname, '..', 'public', 'uploads');

const start = async () => {
  await sequelize.authenticate();
  await ensureContentDatabase();
  const { resources, resourceDefinitions } = await buildResources();
  const admin = createAdmin(resources);
  const app = express();

  if (process.env.NODE_ENV !== 'production') {
    await admin.watch();
  }

  const allowedOrigins = new Set([
    'http://localhost:8080',
    'http://127.0.0.1:8080',
  ]);

  app.use((request, response, next) => {
    const origin = request.headers.origin;

    if (origin && allowedOrigins.has(origin)) {
      response.setHeader('Access-Control-Allow-Origin', origin);
      response.setHeader('Vary', 'Origin');
      response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    if (request.method === 'OPTIONS') {
      response.status(204).end();
      return;
    }

    next();
  });

  app.use('/api', express.json({ limit: '2mb' }));
  app.use('/admin-assets', express.static(path.join(__dirname, '..', 'public')));
  app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));
  registerPublicApi(app);

  app.get('/', (_request, response) => {
    response.redirect(302, `${config.rootPath}`);
  });

  app.get('/health', (_request, response) => {
    response.json({
      ok: true,
      database: config.database.name,
      rootPath: config.rootPath,
      resources: resourceDefinitions.map((resource) => resource.table),
    });
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => {
        if (email === config.auth.email && password === config.auth.password) {
          return { email };
        }

        return null;
      },
      cookieName: 'adminjs',
      cookiePassword: config.sessionSecret,
    },
    null,
    {
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
      },
      store: new session.MemoryStore(),
    },
  );

  const upload = multer({
    storage: multer.diskStorage({
      destination: async (_request, _file, callback) => {
        try {
          await mkdir(uploadsDirectory, { recursive: true });
          callback(null, uploadsDirectory);
        } catch (error) {
          callback(error);
        }
      },
      filename: (_request, file, callback) => {
        const ext = path.extname(file.originalname || '').toLowerCase();
        callback(null, `${Date.now()}-${randomUUID()}${ext}`);
      },
    }),
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (_request, file, callback) => {
      if (!file.mimetype?.startsWith('image/')) {
        callback(new Error('Only image uploads are allowed.'));
        return;
      }

      callback(null, true);
    },
  });

  const handleMediaUpload = (request, response) => {
    upload.single('file')(request, response, async (uploadError) => {
      if (uploadError) {
        response.status(400).json({ error: String(uploadError?.message ?? uploadError) });
        return;
      }

      try {
        if (!request.file) {
          response.status(400).json({ error: 'No file uploaded.' });
          return;
        }

        const item = await createMediaAssetFromUpload(request.file);
        response.status(201).json({
          ok: true,
          item,
          url: item.relativeUrl || item.url,
        });
      } catch (error) {
        response.status(500).json({ error: String(error?.message ?? error) });
      }
    });
  };

  app.post('/api/media/upload', handleMediaUpload);
  app.post('/admin/api/media/upload', handleMediaUpload);

  app.use(admin.options.rootPath, adminRouter);

  app.listen(config.port, () => {
    console.log(`AdminJS started on http://localhost:${config.port}${admin.options.rootPath}`);
  });
};

start().catch((error) => {
  console.error('Failed to start AdminJS', error);
  process.exit(1);
});
