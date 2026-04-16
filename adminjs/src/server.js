import './load-env.js';
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
import { createRateLimitMiddleware, createCsrfMiddleware } from './security.js';
import { expressErrorHandler, logger } from './services/logger.js';

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
    await unlink(file.path).catch((err) => {
      console.error('[server] Failed to clean up invalid upload file:', file.path, String(err?.message ?? err));
    });
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
  const { ensureAdminRuntimeBinaries } = await import('./runtime-binaries.js');
  await ensureAdminRuntimeBinaries();

  const [
    { createAdmin },
    { authenticateAdmin, ensureAdminAccount },
    { getRecentContactSubmissions, getContactSubmissionById, deleteContactSubmissionById },
    { ensureContentDatabase },
    { ensureCommerceSchema },
    { config },
    { sequelize },
    { exportPublishedSnapshots },
    { createMediaAssetFromUpload },
    { buildResources },
    { registerPublicApi },
    { registerMemberPortalApi, registerStripeWebhook },
    { approveBookingRefund, listPendingRefundRequests, listProcessedRefundRequests, rejectBookingRefund },
  ] = await Promise.all([
    import('./admin.js'),
    import('./admin-account.js'),
    import('./contact-submissions.js'),
    import('./bootstrap-content.js'),
    import('./bootstrap-commerce.js'),
    import('./config.js'),
    import('./database.js'),
    import('./export-static-cms.js'),
    import('./media-pages.js'),
    import('./models.js'),
    import('./public-api.js'),
    import('./member-portal-api.js'),
    import('./services/bookings-service.js'),
  ]);

  await sequelize.authenticate();
  await ensureContentDatabase();
  await ensureCommerceSchema();
  await ensureAdminAccount();
  await exportPublishedSnapshots();
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
  const adminSessionOptions = {
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
  };
  const adminSessionMiddleware = session(adminSessionOptions);

  const memberSessionMiddleware = session({
    name: config.memberSession.cookieName,
    secret: config.memberSession.secret,
    resave: false,
    saveUninitialized: false,
    // P2-93: Rolling sessions — refresh cookie expiry on every request so
    // active users are never silently logged out after the 7-day window.
    rolling: true,
    cookie: {
      httpOnly: true,
      sameSite: config.memberSession.sameSite === 'none' ? 'none' : 'strict',
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

  const defaultHelmet = helmet();
  const adminHelmet = helmet({ contentSecurityPolicy: false });

  // AdminJS relies on inline <script> tags to bootstrap its React app.
  // Disable CSP only for the admin HTML routes; keep helmet defaults elsewhere.
  app.use((request, response, next) => {
    const isAdminPageRequest = request.path === config.rootPath
      || request.path.startsWith(`${config.rootPath}/`);

    if (isAdminPageRequest) {
      return adminHelmet(request, response, next);
    }

    return defaultHelmet(request, response, next);
  });

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

  // P0-18: Rate limit admin login attempts
  const adminLoginRateLimiter = createRateLimitMiddleware({
    keyPrefix: 'admin-login',
    windowMs: 15 * 60 * 1000,
    maxRequests: 10,
    message: 'Too many admin login attempts. Please try again later.',
  });
  app.use('/admin/api/login', adminLoginRateLimiter);

  registerStripeWebhook(app);
  app.use('/api', express.json({ limit: '2mb' }));
  app.use('/api/member-auth', memberSessionMiddleware);
  app.use('/api/member-portal', memberSessionMiddleware);

  // P0-3: CSRF protection for member portal state-mutating endpoints
  const csrfProtect = createCsrfMiddleware();
  app.use('/api/member-portal', csrfProtect);
  app.use('/api/member-auth', csrfProtect);

  app.use('/admin-assets', express.static(path.join(__dirname, '..', 'public')));
  app.use(config.uploads.publicPath, express.static(config.uploads.directory));
  app.use('/cms', express.static(config.staticSnapshots.directory));
  registerPublicApi(app);
  registerMemberPortalApi(app);

  app.get('/health', (_request, response) => {
    response.json({ ok: true });
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: async (email, password) => authenticateAdmin(email, password),
      cookieName: config.session.cookieName,
      cookiePassword: config.sessionSecret,
    },
    null,
    adminSessionOptions,
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

  // Admin: list all bookings with a pending refund request (or processed if ?status=processed)
  adminRouter.get('/api/admin/bookings/refund-requests', async (request, response) => {
    try {
      const status = request.query.status;
      const requests = status === 'processed'
        ? await listProcessedRefundRequests()
        : await listPendingRefundRequests();
      response.json({ data: requests });
    } catch (error) {
      response.status(500).json({ error: String(error?.message ?? error) });
    }
  });

  // Admin: approve a pending refund request → fires Stripe refund
  adminRouter.post('/api/admin/bookings/:bookingId/approve-refund', async (request, response) => {
    try {
      const bookingId = Number(request.params.bookingId);
      if (!bookingId || !Number.isFinite(bookingId)) {
        response.status(400).json({ error: 'Invalid booking ID.' });
        return;
      }
      const result = await approveBookingRefund({ bookingId });
      response.json(result);
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
    }
  });

  // Admin: reject a pending refund request — no Stripe refund, booking stays confirmed
  adminRouter.post('/api/admin/bookings/:bookingId/reject-refund', async (request, response) => {
    try {
      const bookingId = Number(request.params.bookingId);
      if (!bookingId || !Number.isFinite(bookingId)) {
        response.status(400).json({ error: 'Invalid booking ID.' });
        return;
      }
      const result = await rejectBookingRefund({ bookingId });
      response.json(result);
    } catch (error) {
      response.status(400).json({ error: String(error?.message ?? error) });
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

  const requireAdminAuthentication = (request, response, next) => {
    if (!request.session?.adminUser) {
      response.status(401).json({ error: 'Unauthorized' });
      return;
    }
    next();
  };

  app.post(`${config.rootPath}/api/media/upload`, adminSessionMiddleware, requireAdminAuthentication, handleMediaUpload);
  app.use(admin.options.rootPath, adminRouter);

  if (hasFrontendBuild) {
    // Astro _astro/ assets have content hashes in filenames — cache aggressively (1 year, immutable).
    app.use('/_astro', express.static(path.join(frontendDistDirectory, '_astro'), {
      maxAge: '1y',
      immutable: true,
    }));
    app.use(express.static(frontendDistDirectory));

    // Astro static build: each route has its own HTML file (e.g. dist/about/index.html).
    // Try to resolve the correct HTML file for the requested path; for React-router pages
    // (auth, dashboard, meeting-rooms/book, pricing/checkout) walk up the path to find the
    // nearest index.html so client-side routing works (e.g. /auth/login → dist/auth/index.html).
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

      // SPA fallback: walk up the directory tree to find the nearest index.html.
      // This supports React Router sub-routes (e.g. /auth/login, /dashboard/billing).
      const segments = urlPath.split('/').filter(Boolean);
      while (segments.length > 0) {
        segments.pop();
        const parentIndex = path.join(frontendDistDirectory, ...segments, 'index.html');
        if (existsSync(parentIndex)) {
          response.sendFile(parentIndex);
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

  // P1-66: Structured error handler — catches all unhandled Express errors,
  // logs them as structured JSON, and returns a safe response to the client.
  app.use(expressErrorHandler);

  app.listen(config.port, config.host, () => {
    logger.info('server.started', {
      host: config.host,
      port: config.port,
      adminPath: admin.options.rootPath,
      publicOrigin: config.publicOrigin,
    });
  });
};

start().catch((error) => {
  console.error('Failed to start AdminJS', error);
  process.exit(1);
});
