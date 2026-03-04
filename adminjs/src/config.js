import dotenv from 'dotenv';

dotenv.config();

function requireEnv(name, fallback) {
  const value = process.env[name] ?? fallback;

  if (typeof value === 'string' && value.length > 0) {
    return value;
  }

  throw new Error(`Missing required environment variable: ${name}`);
}

export const config = {
  port: Number(process.env.PORT || 3001),
  publicOrigin: process.env.PUBLIC_ORIGIN || `http://localhost:${process.env.PORT || 3001}`,
  rootPath: process.env.ADMINJS_ROOT_PATH || '/admin',
  sessionSecret: requireEnv('SESSION_SECRET', 'city-focus-hub-adminjs-session-secret'),
  auth: {
    email: requireEnv('ADMINJS_EMAIL', 'admin@example.com'),
    password: requireEnv('ADMINJS_PASSWORD', 'admin123'),
  },
  database: {
    host: requireEnv('DATABASE_HOST', '127.0.0.1'),
    port: Number(process.env.DATABASE_PORT || 3306),
    name: requireEnv('DATABASE_NAME', 'strapi_adminjs_compare'),
    user: requireEnv('DATABASE_USER', 'root'),
    password: process.env.DATABASE_PASSWORD || '',
  },
};
