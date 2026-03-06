import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import express from 'express';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
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
const projectRoot = path.join(__dirname, '..', '..');
const frontendDistDirectory = path.join(projectRoot, 'dist');
const frontendIndexFile = path.join(frontendDistDirectory, 'index.html');
const MySQLStore = MySQLStoreFactory(session);

function getApiErrorMessage(error) {
  const sequelizeMessage = error?.parent?.sqlMessage
    || error?.parent?.message
    || error?.original?.sqlMessage
    || error?.original?.message;

  if (sequelizeMessage) {
    return sequelizeMessage;
  }

  return String(error?.message || 'Request failed.');
}

const start = async () => {
  await sequelize.authenticate();
  await ensureContentDatabase();
  const { resources, resourceDefinitions } = await buildResources();
  const admin = createAdmin(resources);
  const app = express();
  const hasFrontendBuild = existsSync(frontendIndexFile);
  const sessionStore = new MySQLStore({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    clearExpired: true,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: config.session.cookieMaxAgeMs,
    createDatabaseTable: true,
    schema: {
      tableName: config.session.tableName,
    },
  });

  app.set('trust proxy', 1);

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

  await mkdir(config.uploads.directory, { recursive: true });

  app.use('/api', express.json({ limit: '2mb' }));
  app.use('/admin-assets', express.static(path.join(__dirname, '..', 'public')));
  app.use(config.uploads.publicPath, express.static(config.uploads.directory));
  registerPublicApi(app);

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
      cookieName: config.session.cookieName,
      cookiePassword: config.sessionSecret,
    },
    null,
    {
      name: config.session.cookieName,
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: config.session.cookieMaxAgeMs,
        secure: config.publicOrigin.startsWith('https://'),
      },
      store: sessionStore,
    },
  );

  const upload = multer({
    storage: multer.diskStorage({
      destination: async (_request, _file, callback) => {
        try {
          await mkdir(config.uploads.directory, { recursive: true });
          callback(null, config.uploads.directory);
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

  if (hasFrontendBuild) {
    app.use(express.static(frontendDistDirectory));

    app.get(/^\/(?!api(?:\/|$)|admin(?:\/|$)|uploads(?:\/|$)|admin-assets(?:\/|$)|health$).*/, (_request, response) => {
      response.sendFile(frontendIndexFile);
    });
  } else {
    app.get('/', (_request, response) => {
      response.redirect(302, `${config.rootPath}`);
    });
  }

  app.use((error, request, response, next) => {
    const isAdminApi = request.originalUrl?.startsWith(`${config.rootPath}/api/`);

    if (!isAdminApi) {
      next(error);
      return;
    }

    const statusCode = Number(error?.statusCode || error?.status || 500);
    response.status(statusCode).json({
      message: getApiErrorMessage(error),
    });
  });

  app.listen(config.port, () => {
    console.log(`AdminJS started on http://localhost:${config.port}${admin.options.rootPath}`);
  });
};

start().catch((error) => {
  console.error('Failed to start AdminJS', error);
  process.exit(1);
});
