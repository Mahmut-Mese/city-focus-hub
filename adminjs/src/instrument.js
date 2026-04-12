/**
 * P1-66: Sentry error tracking — backend instrumentation.
 *
 * This file MUST be imported before any other module so Sentry can
 * monkey-patch Node.js built-ins for automatic error capture.
 *
 * Sentry is only initialised when `SENTRY_DSN` is set in the environment.
 * In local development (no DSN), the import is a harmless no-op — all
 * Sentry API calls degrade gracefully when no client is active.
 *
 * Usage:
 *   Set `SENTRY_DSN` in your `.env` or production environment to enable.
 *   Optionally set `SENTRY_ENVIRONMENT` (defaults to NODE_ENV).
 */
import * as Sentry from '@sentry/node';

const dsn = process.env.SENTRY_DSN || '';

if (dsn) {
  Sentry.init({
    dsn,
    environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
    // Avoid capturing expected 4xx errors as noise
    beforeSend(event) {
      const status = event?.contexts?.response?.status_code;
      if (typeof status === 'number' && status >= 400 && status < 500) {
        return null;
      }
      return event;
    },
  });

  console.log('[sentry] Backend error tracking initialised.');
} else if (process.env.NODE_ENV === 'production') {
  console.warn('[sentry] SENTRY_DSN is not set — error tracking is disabled in production.');
}

export { Sentry };
