/**
 * P1-66: Structured logging service.
 *
 * Provides consistent, structured log output for errors and key events.
 * All log entries are written as JSON to stdout/stderr so they can be
 * ingested by log aggregators (Datadog, Papertrail, CloudWatch, etc.)
 * or piped to a file in production.
 *
 * In development (NODE_ENV !== 'production'), output is prettified for
 * readability. In production it is compact single-line JSON per entry.
 *
 * Sentry integration:
 *   When `SENTRY_DSN` is set (see `instrument.js`), `logger.error()`
 *   automatically forwards exceptions to Sentry with structured context
 *   attached as `extra` data. No separate Sentry calls are needed.
 *
 * Usage:
 *   import { logger } from './services/logger.js';
 *
 *   logger.info('booking.confirmed', { bookingId: 42, userId: 7 });
 *   logger.warn('stripe.key_mismatch', { detail: '...' });
 *   logger.error('db.query_failed', error, { query: 'SELECT ...' });
 */

import * as Sentry from '@sentry/node';

const isProd = process.env.NODE_ENV === 'production';

function serialize(level, event, contextOrError, extra) {
  const entry = {
    ts: new Date().toISOString(),
    level,
    event,
  };

  if (contextOrError instanceof Error) {
    entry.error = {
      message: contextOrError.message,
      name: contextOrError.name,
      stack: isProd ? undefined : contextOrError.stack,
    };
    if (extra && typeof extra === 'object') {
      entry.context = extra;
    }
  } else if (contextOrError && typeof contextOrError === 'object') {
    entry.context = contextOrError;
  }

  return isProd ? JSON.stringify(entry) : JSON.stringify(entry, null, 2);
}

export const logger = {
  /**
   * Informational event — normal application flow.
   * @param {string} event  Dot-namespaced event name, e.g. 'booking.confirmed'
   * @param {Record<string, unknown>} [context]
   */
  info(event, context) {
    process.stdout.write(serialize('info', event, context) + '\n');
  },

  /**
   * Warning — unexpected condition that doesn't stop execution.
   * @param {string} event
   * @param {Record<string, unknown>} [context]
   */
  warn(event, context) {
    process.stderr.write(serialize('warn', event, context) + '\n');
  },

  /**
   * Error — exception or critical failure.
   * Automatically forwards to Sentry when `SENTRY_DSN` is configured.
   * @param {string} event
   * @param {Error|unknown} error
   * @param {Record<string, unknown>} [context]
   */
  error(event, error, context) {
    const err = error instanceof Error ? error : new Error(String(error?.message ?? error));
    process.stderr.write(serialize('error', event, err, context) + '\n');

    // P1-66: Forward to Sentry with structured context
    Sentry.withScope((scope) => {
      scope.setTag('event', event);
      if (context && typeof context === 'object') {
        scope.setExtras(context);
      }
      Sentry.captureException(err);
    });
  },
};

// ──────────────────────────────────────────────
// Express error-handler middleware
// ──────────────────────────────────────────────

/**
 * Express 4.x error handler — attach as the LAST middleware in server.js.
 * Logs the error with structured context (method, path, status), forwards
 * to Sentry, and sends a safe JSON response to the client.
 *
 * Usage in server.js:
 *   import { expressErrorHandler } from './services/logger.js';
 *   app.use(expressErrorHandler);
 */
export function expressErrorHandler(err, req, res, _next) {
  const status = err.status || err.statusCode || 500;

  logger.error('http.unhandled_error', err, {
    method: req.method,
    path: req.path,
    status,
    ip: req.ip,
  });

  if (res.headersSent) {
    return;
  }

  res.status(status).json({
    error: isProd && status >= 500
      ? 'An unexpected error occurred.'
      : String(err?.message ?? err),
  });
}
