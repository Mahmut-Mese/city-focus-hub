import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import session from 'express-session';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createAdmin } from './admin.js';
import { config } from './config.js';
import { sequelize } from './database.js';
import { buildResources } from './models.js';
import { registerPublicApi } from './public-api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const start = async () => {
  await sequelize.authenticate();
  const { resources, resourceDefinitions } = await buildResources();
  const admin = createAdmin(resources);
  const app = express();

  if (process.env.NODE_ENV !== 'production') {
    await admin.watch();
  }

  const allowedOrigins = new Set([
    'http://localhost:8080',
    'http://localhost:8081',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:8081',
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

  app.use('/admin-assets', express.static(path.join(__dirname, '..', 'public')));
  app.use('/uploads', express.static(path.join(__dirname, '..', '..', 'cms', 'public', 'uploads')));
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

  app.use(admin.options.rootPath, adminRouter);

  app.use(express.json({ limit: '2mb' }));

  app.listen(config.port, () => {
    console.log(`AdminJS started on http://localhost:${config.port}${admin.options.rootPath}`);
  });
};

start().catch((error) => {
  console.error('Failed to start AdminJS', error);
  process.exit(1);
});
