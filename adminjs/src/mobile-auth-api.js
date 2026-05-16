import express from 'express';
import { createRateLimitMiddleware } from './security.js';
import {
  loginMobileUser,
  registerMobileUser,
  refreshMobileSession,
  revokeMobileSession,
  verifyMobileAccessToken,
} from './services/mobile-auth-service.js';

function getString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function getClientContext(request) {
  return {
    ipAddress: request.ip || request.connection?.remoteAddress || 'unknown',
    userAgent: request.headers['user-agent'] || 'unknown',
  };
}

function getBearerToken(request) {
  const authHeader = request.headers?.authorization;

  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim() || null;
  }

  return null;
}

function getSafeRegistrationError(error) {
  if (error && typeof error.message === 'string' && error.message) {
    return error.message;
  }

  return 'Registration failed.';
}

export function registerMobileAuthApi(app) {
  const router = express.Router();
  const authRateLimiter = createRateLimitMiddleware({
    keyPrefix: 'mobile-auth',
    windowMs: 15 * 60 * 1000,
    maxRequests: 30,
    message: 'Too many mobile authentication requests. Please try again later.',
  });

  router.post('/login', authRateLimiter, async (request, response) => {
    try {
      const email = getString(request.body?.email);
      const password = getString(request.body?.password);

      if (!email || !password) {
        response.status(400).json({ error: 'Email and password are required.' });
        return;
      }

      const result = await loginMobileUser({
        email,
        password,
        deviceName: getString(request.body?.deviceName),
        platform: getString(request.body?.platform),
        ...getClientContext(request),
      });

      response.status(200).json(result);
    } catch {
      response.status(401).json({ error: 'Email or password is incorrect.' });
    }
  });

  router.post('/register', authRateLimiter, async (request, response) => {
    try {
      const name = getString(request.body?.name);
      const email = getString(request.body?.email);
      const password = getString(request.body?.password);

      if (!name || !email || !password) {
        response.status(400).json({ error: 'Name, email, and password are required.' });
        return;
      }

      const result = await registerMobileUser({
        name,
        email,
        password,
        deviceName: getString(request.body?.deviceName),
        platform: getString(request.body?.platform),
        ...getClientContext(request),
      });

      response.status(201).json(result);
    } catch (error) {
      response.status(400).json({ error: getSafeRegistrationError(error) });
    }
  });

  router.post('/refresh', authRateLimiter, async (request, response) => {
    try {
      const refreshToken = getString(request.body?.refreshToken);
      const sessionId = getString(request.body?.sessionId);

      if (!refreshToken || !sessionId) {
        response.status(400).json({ error: 'Refresh token and session ID are required.' });
        return;
      }

      const result = await refreshMobileSession({
        refreshToken,
        sessionId,
        ...getClientContext(request),
      });

      response.status(200).json(result);
    } catch {
      response.status(401).json({ error: 'Session expired or invalid.' });
    }
  });

  router.post('/logout', async (request, response) => {
    try {
      const refreshToken = getString(request.body?.refreshToken);
      const sessionId = getString(request.body?.sessionId);

      if (refreshToken || sessionId) {
        await revokeMobileSession({
          sessionId,
          refreshToken,
          reason: 'mobile_logout',
        });
      }
    } catch {
      // Logout is best effort and intentionally does not reveal server-side session state.
    }

    response.status(204).send();
  });

  router.get('/session', async (request, response) => {
    try {
      const accessToken = getBearerToken(request);

      if (!accessToken) {
        response.status(401).json({ error: 'Authentication required.' });
        return;
      }

      const verified = await verifyMobileAccessToken(accessToken);

      response.status(200).json({
        user: verified.user,
        sessionId: verified.sessionId,
      });
    } catch {
      response.status(401).json({ error: 'Authentication required.' });
    }
  });

  app.use('/api/v1/mobile-auth', router);
}
