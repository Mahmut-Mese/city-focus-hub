const rateLimitBuckets = new Map();

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
