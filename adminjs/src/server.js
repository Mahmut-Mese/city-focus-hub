import 'dotenv/config';
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..', '..');
const frontendDistDirectory = path.join(projectRoot, 'dist');
const frontendIndexFile = path.join(frontendDistDirectory, 'index.html');
const frontendCmsDirectory = path.join(projectRoot, 'public', 'cms');
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
  const [
    { createAdmin },
    { authenticateAdmin, ensureAdminAccount },
    { getRecentContactSubmissions, getContactSubmissionById, deleteContactSubmissionById },
    { ensureContentDatabase },
    { config },
    { sequelize },
    { createMediaAssetFromUpload },
    { buildResources },
    { registerPublicApi },
  ] = await Promise.all([
    import('./admin.js'),
    import('./admin-account.js'),
    import('./contact-submissions.js'),
    import('./bootstrap-content.js'),
    import('./config.js'),
    import('./database.js'),
    import('./media-pages.js'),
    import('./models.js'),
    import('./public-api.js'),
  ]);

  await sequelize.authenticate();
  await ensureContentDatabase();
  await ensureAdminAccount();
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

  const allowedOrigins = new Set(config.cors.allowedOrigins);

  app.use((request, response, next) => {
    const origin = request.headers.origin;
    const isPublicApiRequest = request.path.startsWith('/api/') || request.path === '/api';

    if (origin && allowedOrigins.has(origin)) {
      response.setHeader('Access-Control-Allow-Origin', origin);
      response.setHeader('Vary', 'Origin');
      response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      response.setHeader('Access-Control-Allow-Credentials', 'true');
    } else if (origin && isPublicApiRequest) {
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

  app.use((request, response, next) => {
    const isAdminRequest = request.path === config.rootPath
      || request.path.startsWith(`${config.rootPath}/`)
      || request.path.startsWith('/admin-assets/');

    if (isAdminRequest) {
      response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.setHeader('Pragma', 'no-cache');
      response.setHeader('Expires', '0');
      response.setHeader('Surrogate-Control', 'no-store');
    }

    next();
  });

  await mkdir(config.uploads.directory, { recursive: true });

  app.use('/api', express.json({ limit: '2mb' }));
  app.use('/admin-assets', express.static(path.join(__dirname, '..', 'public')));
  app.use(config.uploads.publicPath, express.static(config.uploads.directory));
  app.use('/cms', express.static(frontendCmsDirectory));
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
      authenticate: async (email, password) => authenticateAdmin(email, password),
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

  adminRouter.get('/api/contact-submissions', async (request, response) => {
    try {
      const limit = Number.parseInt(String(request.query.limit ?? '25'), 10);
      const parsedLimit = Number.isFinite(limit) && limit > 0 ? Math.min(100, limit) : 25;
      const recentSubmissions = await getRecentContactSubmissions(parsedLimit);

      response.json({ data: recentSubmissions });
    } catch (error) {
      response.status(500).json({ error: String(error?.message ?? error) });
    }
  });

  adminRouter.get('/api/contact-submissions/:id', async (request, response) => {
    try {
      const submission = await getContactSubmissionById(request.params.id);

      if (!submission) {
        response.status(404).json({ error: 'Submission not found.' });
        return;
      }

      response.json({ data: submission });
    } catch (error) {
      response.status(500).json({ error: String(error?.message ?? error) });
    }
  });

  adminRouter.delete('/api/contact-submissions/:id', async (request, response) => {
    try {
      const deleted = await deleteContactSubmissionById(request.params.id);

      if (!deleted) {
        response.status(404).json({ error: 'Submission not found.' });
        return;
      }

      response.json({ ok: true, deleted: true, id: Number(request.params.id) });
    } catch (error) {
      response.status(500).json({ error: String(error?.message ?? error) });
    }
  });

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
