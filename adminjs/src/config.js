import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..', '..');
const DEFAULT_SESSION_SECRET = 'city-focus-hub-adminjs-session-secret';
const DEFAULT_ADMIN_EMAIL = 'admin@example.com';
const DEFAULT_ADMIN_PASSWORD = 'admin123';

function requireEnv(name, fallback) {
  const value = process.env[name] ?? fallback;

  if (typeof value === 'string' && value.length > 0) {
    return value;
  }

  throw new Error(`Missing required environment variable: ${name}`);
}

function parseList(value, fallback = []) {
  if (!value) {
    return fallback;
  }

  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSameSite(value, fallback = 'lax') {
  const normalized = String(value || fallback).trim().toLowerCase();

  if (['lax', 'strict', 'none'].includes(normalized)) {
    return normalized;
  }

  return fallback;
}

const runtimeEnv = process.env.NODE_ENV || 'development';
const isLocalLikeEnv = runtimeEnv !== 'production';
const defaultPort = Number(process.env.PORT || 3001);
const defaultPublicOrigin = process.env.PUBLIC_ORIGIN || `http://localhost:${defaultPort}`;
const sessionSecret = requireEnv('SESSION_SECRET', DEFAULT_SESSION_SECRET);
const adminEmail = requireEnv('ADMINJS_EMAIL', DEFAULT_ADMIN_EMAIL);
const adminPassword = requireEnv('ADMINJS_PASSWORD', DEFAULT_ADMIN_PASSWORD);
const defaultFrontendOrigins = isLocalLikeEnv
  ? [
      'http://localhost:4000',
      'http://127.0.0.1:4000',
      'http://localhost:4321',
      'http://127.0.0.1:4321',
      'http://localhost:8080',
      'http://127.0.0.1:8080',
      'http://localhost:4173',
      'http://127.0.0.1:4173',
    ]
  : parseList(process.env.PUBLIC_ORIGIN, []);

export const config = {
  host: process.env.HOST || '0.0.0.0',
  port: defaultPort,
  publicOrigin: defaultPublicOrigin,
  rootPath: process.env.ADMINJS_ROOT_PATH || '/admin',
  sessionSecret,
  session: {
    cookieName: process.env.SESSION_COOKIE_NAME || 'adminjs',
    cookieMaxAgeMs: Number(process.env.SESSION_COOKIE_MAX_AGE_MS || 7 * 24 * 60 * 60 * 1000),
    tableName: process.env.SESSION_TABLE_NAME || 'admin_sessions',
  },
  memberSession: {
    cookieName: process.env.MEMBER_SESSION_COOKIE_NAME || 'member_session',
    cookieMaxAgeMs: Number(process.env.MEMBER_SESSION_COOKIE_MAX_AGE_MS || 7 * 24 * 60 * 60 * 1000),
    tableName: process.env.MEMBER_SESSION_TABLE_NAME || 'member_sessions',
    secret: process.env.MEMBER_SESSION_SECRET || sessionSecret,
    sameSite: parseSameSite(process.env.MEMBER_SESSION_SAME_SITE, 'lax'),
  },
  auth: {
    email: adminEmail,
    password: adminPassword,
  },
  database: {
    host: requireEnv('DATABASE_HOST', '127.0.0.1'),
    port: Number(process.env.DATABASE_PORT || 3306),
    name: requireEnv('DATABASE_NAME', 'city_focus_hub_admin'),
    user: requireEnv('DATABASE_USER', 'root'),
    password: process.env.DATABASE_PASSWORD || '',
  },
  cors: {
    allowedOrigins: parseList(process.env.FRONTEND_ORIGINS, defaultFrontendOrigins),
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
  bookings: {
    paymentHoldMinutes: Number(process.env.BOOKING_PAYMENT_HOLD_MINUTES || 20),
  },
  staticSnapshots: {
    directory: process.env.STATIC_SNAPSHOT_DIR || path.join(projectRoot, 'public', 'cms'),
  },
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    secretKey: process.env.STRIPE_SECRET_KEY || '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_city_focus_hub_local',
    mockPaymentMethodId: process.env.STRIPE_MOCK_PAYMENT_METHOD_ID || 'pm_card_visa',
    allowMockPayments: process.env.STRIPE_ALLOW_MOCK_PAYMENTS
      ? process.env.STRIPE_ALLOW_MOCK_PAYMENTS === 'true'
      : isLocalLikeEnv,
  },
  commerce: {
    defaultCurrency: (process.env.DEFAULT_CURRENCY || 'gbp').toLowerCase(),
  },
};

// Skip production validation during prebundle — only DB access is needed.
if (runtimeEnv === 'production' && !process.env.ADMINJS_PREBUNDLE) {
  const productionErrors = [];

  if (config.sessionSecret === DEFAULT_SESSION_SECRET) {
    productionErrors.push('SESSION_SECRET must be set in production.');
  }

  if (config.auth.email === DEFAULT_ADMIN_EMAIL || config.auth.password === DEFAULT_ADMIN_PASSWORD) {
    productionErrors.push('ADMINJS_EMAIL and ADMINJS_PASSWORD must be set to non-default values in production.');
  }

  if (!config.cors.allowedOrigins.length) {
    productionErrors.push('FRONTEND_ORIGINS or PUBLIC_ORIGIN must be configured in production.');
  }

  if (!config.stripe.secretKey) {
    productionErrors.push('STRIPE_SECRET_KEY must be set in production.');
  }

  if (config.stripe.webhookSecret === 'whsec_city_focus_hub_local') {
    productionErrors.push('STRIPE_WEBHOOK_SECRET must be set to a real value in production.');
  }

  // P1-62: Validate Stripe key consistency — ensure publishable and secret keys are both test or both live
  if (config.stripe.publishableKey && config.stripe.secretKey) {
    const pkIsLive = config.stripe.publishableKey.startsWith('pk_live_');
    const skIsLive = config.stripe.secretKey.startsWith('sk_live_') || config.stripe.secretKey.startsWith('rk_live_');
    if (pkIsLive !== skIsLive) {
      productionErrors.push('STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY must both be test or both be live keys.');
    }
  }

  if (config.stripe.allowMockPayments) {
    productionErrors.push('STRIPE_ALLOW_MOCK_PAYMENTS must not be enabled in production.');
  }

  // P1-47: Ensure member session secret is separate from admin session secret
  if (!process.env.MEMBER_SESSION_SECRET || config.memberSession.secret === config.sessionSecret) {
    productionErrors.push('MEMBER_SESSION_SECRET must be set to a value different from SESSION_SECRET in production.');
  }

  if (!config.database.password) {
    productionErrors.push('DATABASE_PASSWORD must be set in production.');
  }

  if (productionErrors.length > 0) {
    throw new Error(productionErrors.join(' '));
  }
}
