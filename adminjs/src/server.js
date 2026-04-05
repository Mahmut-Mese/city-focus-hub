import 'dotenv/config';
import AdminJSExpress from '@adminjs/express';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import express from 'express';
import helmet from 'helmet';
import multer from 'multer';
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, unlink } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

function detectImageFormat(buffer) {
  if (!Buffer.isBuffer(buffer) || buffer.length < 12) {
    return null;
  }

  const isPng = buffer[0] === 0x89
    && buffer[1] === 0x50
    && buffer[2] === 0x4e
    && buffer[3] === 0x47
    && buffer[4] === 0x0d
    && buffer[5] === 0x0a
    && buffer[6] === 0x1a
    && buffer[7] === 0x0a;

  if (isPng) {
    return { mime: 'image/png', ext: '.png' };
  }

  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;

  if (isJpeg) {
    return { mime: 'image/jpeg', ext: '.jpg' };
  }

  const header6 = buffer.subarray(0, 6).toString('ascii');
  const header4 = buffer.subarray(0, 4).toString('ascii');
  const header12 = buffer.subarray(8, 12).toString('ascii');
  const isGif = header6 === 'GIF87a' || header6 === 'GIF89a';

  if (isGif) {
    return { mime: 'image/gif', ext: '.gif' };
  }

  const isWebp = header4 === 'RIFF' && header12 === 'WEBP';

  if (isWebp) {
    return { mime: 'image/webp', ext: '.webp' };
  }

  return null;
}

async function normalizeUploadedImage(file) {
  if (!file?.path || !file.destination) {
    throw new Error('Uploaded file is invalid.');
  }

  const buffer = await readFile(file.path);
  const detectedFormat = detectImageFormat(buffer);

  if (!detectedFormat) {
    await unlink(file.path).catch(() => {});
    throw new Error('Uploaded file must be a valid PNG, JPEG, GIF, or WebP image.');
  }

  const nextFilename = `${path.basename(file.filename, path.extname(file.filename))}${detectedFormat.ext}`;
  const nextPath = path.join(file.destination, nextFilename);

  if (nextPath !== file.path) {
    await rename(file.path, nextPath);
    file.path = nextPath;
    file.filename = nextFilename;
  }

  file.mimetype = detectedFormat.mime;
  file.detectedExtension = detectedFormat.ext;
  return file;
}

const start = async () => {
  const [
    { createAdmin },
    { authenticateAdmin, ensureAdminAccount },
    { getRecentContactSubmissions, getContactSubmissionById, deleteContactSubmissionById },
    { ensureContentDatabase },
    { ensureCommerceSchema },
    { config },
    { sequelize },
    { createMediaAssetFromUpload },
    { buildResources },
    { registerPublicApi },
    { registerMemberPortalApi, registerStripeWebhook },
  ] = await Promise.all([
    import('./admin.js'),
    import('./admin-account.js'),
    import('./contact-submissions.js'),
    import('./bootstrap-content.js'),
    import('./bootstrap-commerce.js'),
    import('./config.js'),
    import('./database.js'),
    import('./media-pages.js'),
    import('./models.js'),
    import('./public-api.js'),
    import('./member-portal-api.js'),
  ]);

  await sequelize.authenticate();
  await ensureContentDatabase();
  await ensureCommerceSchema();
  await ensureAdminAccount();
  const { resources, resourceDefinitions } = await buildResources();
  const admin = createAdmin(resources);
  const app = express();
  app.disable('x-powered-by');
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
  const memberSessionStore = new MySQLStore({
    host: config.database.host,
    port: config.database.port,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name,
    clearExpired: true,
    checkExpirationInterval: 15 * 60 * 1000,
    expiration: config.memberSession.cookieMaxAgeMs,
    createDatabaseTable: true,
    schema: {
      tableName: config.memberSession.tableName,
    },
  });
  const memberSessionMiddleware = session({
    name: config.memberSession.cookieName,
    secret: config.memberSession.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: config.memberSession.sameSite,
      maxAge: config.memberSession.cookieMaxAgeMs,
      secure: config.publicOrigin.startsWith('https://') || config.memberSession.sameSite === 'none',
    },
    store: memberSessionStore,
  });

  app.set('trust proxy', 1);

  if (process.env.NODE_ENV !== 'production') {
    await admin.watch();
  }

  const allowedOrigins = new Set(config.cors.allowedOrigins);

  app.use(helmet());

  app.use((request, response, next) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
  });

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
  await mkdir(config.staticSnapshots.directory, { recursive: true });

  registerStripeWebhook(app);
  app.use('/api', express.json({ limit: '2mb' }));
  app.use('/api/member-auth', memberSessionMiddleware);
  app.use('/api/member-portal', memberSessionMiddleware);
  app.use('/admin-assets', express.static(path.join(__dirname, '..', 'public')));
  app.use(config.uploads.publicPath, express.static(config.uploads.directory));
  app.use('/cms', express.static(config.staticSnapshots.directory));
  registerPublicApi(app);
  registerMemberPortalApi(app);

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
        callback(null, `${Date.now()}-${randomUUID()}`);
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

        await normalizeUploadedImage(request.file);
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

  adminRouter.post('/api/media/upload', handleMediaUpload);
  app.use(admin.options.rootPath, adminRouter);

  if (hasFrontendBuild) {
    app.use(express.static(frontendDistDirectory));

    // Astro static build: each route has its own HTML file (e.g. dist/about/index.html).
    // Try to resolve the correct HTML file for the requested path, fall back to 404.html.
    app.get(/^\/(?!api(?:\/|$)|admin(?:\/|$)|uploads(?:\/|$)|admin-assets(?:\/|$)|health$).*/, (request, response) => {
      const urlPath = request.path.replace(/\/+$/, '') || '/index';
      const candidates = [
        path.join(frontendDistDirectory, `${urlPath}.html`),
        path.join(frontendDistDirectory, urlPath, 'index.html'),
      ];

      for (const candidate of candidates) {
        if (existsSync(candidate)) {
          response.sendFile(candidate);
          return;
        }
      }

      // Astro generates a 404.html at the root of the dist directory
      const notFoundFile = path.join(frontendDistDirectory, '404.html');

      if (existsSync(notFoundFile)) {
        response.status(404).sendFile(notFoundFile);
      } else {
        response.status(404).send('Not Found');
      }
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

  app.listen(config.port, config.host, () => {
    console.log(
      `AdminJS started on http://${config.host}:${config.port}${admin.options.rootPath} `
      + `(public: ${config.publicOrigin}${admin.options.rootPath})`,
    );
  });
};

start().catch((error) => {
  console.error('Failed to start AdminJS', error);
  process.exit(1);
});
