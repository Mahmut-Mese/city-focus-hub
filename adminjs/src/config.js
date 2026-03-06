import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..', '..');

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
  session: {
    cookieName: process.env.SESSION_COOKIE_NAME || 'adminjs',
    cookieMaxAgeMs: Number(process.env.SESSION_COOKIE_MAX_AGE_MS || 7 * 24 * 60 * 60 * 1000),
    tableName: process.env.SESSION_TABLE_NAME || 'admin_sessions',
  },
  auth: {
    email: requireEnv('ADMINJS_EMAIL', 'admin@example.com'),
    password: requireEnv('ADMINJS_PASSWORD', 'admin123'),
  },
  database: {
    host: requireEnv('DATABASE_HOST', '127.0.0.1'),
    port: Number(process.env.DATABASE_PORT || 3306),
    name: requireEnv('DATABASE_NAME', 'city_focus_hub_admin'),
    user: requireEnv('DATABASE_USER', 'root'),
    password: process.env.DATABASE_PASSWORD || '',
  },
  mail: {
    enabled: Boolean(process.env.SMTP_HOST),
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    password: process.env.SMTP_PASSWORD || '',
    from: process.env.SMTP_FROM || process.env.SMTP_USER || process.env.ADMINJS_EMAIL || 'no-reply@example.com',
    to: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMINJS_EMAIL || 'admin@example.com',
  },
  uploads: {
    directory: process.env.UPLOADS_DIR || path.join(projectRoot, 'storage', 'uploads'),
    publicPath: process.env.UPLOADS_PUBLIC_PATH || '/uploads',
  },
};
