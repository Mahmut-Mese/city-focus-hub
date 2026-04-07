const rateLimitBuckets = new Map();

// P0-20: Evict expired buckets every 60 seconds to prevent unbounded memory growth
const EVICTION_INTERVAL_MS = 60_000;

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
