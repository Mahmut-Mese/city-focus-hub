import { randomUUID } from 'node:crypto';

const rateLimitBuckets = new Map();

// P0-20: Evict expired buckets every 60 seconds to prevent unbounded memory growth
const EVICTION_INTERVAL_MS = 60_000;

// P1-48: KNOWN LIMITATION — This rate limiter is in-memory only.
// State is NOT shared across processes (PM2 cluster, Docker replicas, etc.).
// Under multi-process deployments, each process has its own independent counter,
// effectively multiplying the allowed request budget by the number of processes.
// For production cluster/replica deployments, replace with a Redis-backed solution
// (e.g. `rate-limiter-flexible` with Redis store).

setInterval(() => {
  const now = Date.now();
  for (const [key, bucket] of rateLimitBuckets) {
    if (bucket.resetAt <= now) {
      rateLimitBuckets.delete(key);
    }
  }
}, EVICTION_INTERVAL_MS).unref();

export function createRateLimitMiddleware({
  keyPrefix,
  windowMs,
  maxRequests,
  message,
}) {
  return (request, response, next) => {
    const now = Date.now();
    const ip = request.ip;
    const bucketKey = `${keyPrefix}:${ip}`;
    const existingBucket = rateLimitBuckets.get(bucketKey);

    if (!existingBucket || existingBucket.resetAt <= now) {
      rateLimitBuckets.set(bucketKey, {
        count: 1,
        resetAt: now + windowMs,
      });
      next();
      return;
    }

    if (existingBucket.count >= maxRequests) {
      const retryAfterSeconds = Math.max(1, Math.ceil((existingBucket.resetAt - now) / 1000));
      response.setHeader('Retry-After', String(retryAfterSeconds));
      response.status(429).json({
        error: message || 'Too many requests. Please try again later.',
      });
      return;
    }

    existingBucket.count += 1;
    rateLimitBuckets.set(bucketKey, existingBucket);
    next();
  };
}

// P0-3: CSRF double-submit token middleware.
// Generates a per-session CSRF token and validates it on state-mutating requests.
// GET/HEAD/OPTIONS are exempt (safe methods).
// Auth routes (login/register/logout) are exempt since they establish/destroy sessions.
// The token is stored in the session and must be sent via `X-CSRF-Token` header.
const CSRF_SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const CSRF_EXEMPT_PATHS = new Set([
  '/login',
  '/register',
  '/logout',
]);

export function createCsrfMiddleware() {
  return (request, response, next) => {
    // Skip CSRF check for safe (read-only) methods
    if (CSRF_SAFE_METHODS.has(request.method)) {
      return next();
    }

    // Skip CSRF check for auth routes (no session to validate against yet)
    if (CSRF_EXEMPT_PATHS.has(request.path)) {
      return next();
    }

    // Session must exist for CSRF to work
    if (!request.session) {
      return next();
    }

    // Generate token if not yet present in session
    if (!request.session.csrfToken) {
      request.session.csrfToken = randomUUID();
    }

    const headerToken = request.headers['x-csrf-token'];

    if (!headerToken || headerToken !== request.session.csrfToken) {
      return response.status(403).json({ error: 'Invalid or missing CSRF token.' });
    }

    next();
  };
}
