import { randomBytes, randomUUID, createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { authenticateUser, registerUser, findUserById } from './users-service.js';
import { execute, queryOne, queryAll } from './sql.js';
import { sequelize } from '../database.js';
import { config } from '../config.js';

const ACCESS_TOKEN_SECRET = process.env.MOBILE_AUTH_ACCESS_TOKEN_SECRET || config.memberSession.secret || config.sessionSecret;
const ACCESS_TOKEN_TTL_SECONDS = 15 * 60; // 15 minutes
const REFRESH_TOKEN_TTL_DAYS = 30; // 30 days

function base64urlEncode(buffer) {
  return buffer.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64urlDecode(str) {
  const padded = str + '==='.slice((str.length + 3) % 4);
  return Buffer.from(padded.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

function normalizePlatform(platform) {
  const p = String(platform || '').toLowerCase();
  return p === 'ios' || p === 'android' ? p : null;
}

function generateRefreshToken() {
  const token = base64urlEncode(randomBytes(32));
  const hash = createHash('sha256').update(token).digest('hex');
  return { token, hash };
}

function generateAccessToken(userId, sessionId, expiresInSeconds) {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const header = base64urlEncode(Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })));
  const payload = base64urlEncode(Buffer.from(JSON.stringify({
    userId,
    sessionId,
    iat: nowSeconds,
    jti: randomUUID(),
    exp: nowSeconds + expiresInSeconds
  })));
  const signature = createHmac('sha256', ACCESS_TOKEN_SECRET)
    .update(`${header}.${payload}`)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return `${header}.${payload}.${signature}`;
}

function verifyAccessToken(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    const expectedSignature = createHmac('sha256', ACCESS_TOKEN_SECRET)
      .update(`${header}.${payload}`)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
      
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }
    
    const parsedPayload = JSON.parse(base64urlDecode(payload).toString());
    if (parsedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return parsedPayload;
  } catch (err) {
    return null;
  }
}

async function logAudit(transaction, userId, sessionId, eventType, ipAddress, userAgent, details) {
  await execute(`
    INSERT INTO mobile_auth_audit_events 
    (user_id, session_id, event_type, ip_address, user_agent, details_json, created_at)
    VALUES (:userId, :sessionId, :eventType, :ipAddress, :userAgent, :details, NOW())
  `, {
    userId: userId || null,
    sessionId: sessionId || null,
    eventType,
    ipAddress: String(ipAddress || '').slice(0, 64) || null,
    userAgent: String(userAgent || '') || null,
    details: details ? JSON.stringify(details) : null,
  }, { transaction });
}

export async function loginMobileUser({ email, password, deviceName, platform, ipAddress, userAgent }) {
  const user = await authenticateUser({ email, password });
  return createMobileSession({ user, deviceName, platform, ipAddress, userAgent, eventType: 'login' });
}

export async function registerMobileUser({ name, email, password, deviceName, platform, ipAddress, userAgent }) {
  const user = await registerUser({ name, email, password, entrySource: 'mobile' });
  return createMobileSession({ user, deviceName, platform, ipAddress, userAgent, eventType: 'register' });
}

async function createMobileSession({ user, deviceName, platform, ipAddress, userAgent, eventType }) {
  return await sequelize.transaction(async (t) => {
    const sessionId = randomUUID();
    const familyId = randomUUID();
    const { token: refreshToken, hash: tokenHash } = generateRefreshToken();
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);
    const now = new Date();
    
    await execute(`
      INSERT INTO mobile_sessions 
      (user_id, session_id, device_name, platform, user_agent, ip_address, status, created_at, updated_at, last_seen_at)
      VALUES (:userId, :sessionId, :deviceName, :platform, :userAgent, :ipAddress, 'active', :now, :now, :now)
    `, {
      userId: user.id,
      sessionId,
      deviceName: deviceName ? String(deviceName).slice(0, 255) : null,
      platform: normalizePlatform(platform),
      userAgent: userAgent ? String(userAgent) : null,
      ipAddress: ipAddress ? String(ipAddress).slice(0, 64) : null,
      now
    }, { transaction: t });

    await execute(`
      INSERT INTO mobile_refresh_tokens
      (session_id, token_hash, family_id, status, expires_at, created_at)
      VALUES (:sessionId, :tokenHash, :familyId, 'active', :expiresAt, :now)
    `, {
      sessionId,
      tokenHash,
      familyId,
      expiresAt,
      now
    }, { transaction: t });

    await logAudit(t, user.id, sessionId, eventType, ipAddress, userAgent, {
      deviceName,
      platform: normalizePlatform(platform)
    });

    const accessToken = generateAccessToken(user.id, sessionId, ACCESS_TOKEN_TTL_SECONDS);

    return {
      user,
      accessToken,
      refreshToken,
      sessionId,
      expiresIn: ACCESS_TOKEN_TTL_SECONDS
    };
  });
}

export async function refreshMobileSession({ refreshToken, sessionId, ipAddress, userAgent }) {
  if (!refreshToken || !sessionId) {
    throw new Error('Invalid refresh token.');
  }

  const tokenHash = createHash('sha256').update(refreshToken).digest('hex');

  const result = await sequelize.transaction(async (t) => {
    const tokenRecord = await queryOne(`
      SELECT * FROM mobile_refresh_tokens 
      WHERE token_hash = :tokenHash AND session_id = :sessionId
      LIMIT 1 FOR UPDATE
    `, { tokenHash, sessionId }, { transaction: t });

    if (!tokenRecord) {
      await logAudit(t, null, sessionId, 'refresh_failed_not_found', ipAddress, userAgent, null);
      throw new Error('Invalid refresh token.');
    }

    const session = await queryOne(`
      SELECT * FROM mobile_sessions 
      WHERE session_id = :sessionId
      LIMIT 1 FOR UPDATE
    `, { sessionId }, { transaction: t });

    if (!session || session.status !== 'active') {
      await logAudit(t, session?.user_id, sessionId, 'refresh_failed_session_inactive', ipAddress, userAgent, { sessionStatus: session?.status });
      throw new Error('Session is inactive.');
    }

    const now = new Date();

    if (tokenRecord.status === 'revoked' || tokenRecord.status === 'rotated') {
      await execute(`
        UPDATE mobile_refresh_tokens 
        SET status = 'revoked', revoked_at = :now 
        WHERE family_id = :familyId AND status = 'active'
      `, { familyId: tokenRecord.family_id, now }, { transaction: t });

      await execute(`
        UPDATE mobile_sessions 
        SET status = 'compromised', compromised_at = :now, updated_at = :now 
        WHERE session_id = :sessionId
      `, { sessionId, now }, { transaction: t });

      await logAudit(t, session.user_id, sessionId, 'token_reuse_detected', ipAddress, userAgent, { familyId: tokenRecord.family_id });
      return { compromised: true };
    }

    if (new Date(tokenRecord.expires_at) < now) {
      await logAudit(t, session.user_id, sessionId, 'refresh_failed_expired', ipAddress, userAgent, null);
      throw new Error('Refresh token expired.');
    }

    await execute(`
      UPDATE mobile_refresh_tokens 
      SET status = 'rotated', rotated_at = :now 
      WHERE id = :id
    `, { now, id: tokenRecord.id }, { transaction: t });

    const { token: newRefreshToken, hash: newTokenHash } = generateRefreshToken();
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000);

    await execute(`
      INSERT INTO mobile_refresh_tokens
      (session_id, token_hash, family_id, status, expires_at, created_at)
      VALUES (:sessionId, :tokenHash, :familyId, 'active', :expiresAt, :now)
    `, {
      sessionId,
      tokenHash: newTokenHash,
      familyId: tokenRecord.family_id,
      expiresAt,
      now
    }, { transaction: t });

    await execute(`
      UPDATE mobile_sessions 
      SET last_seen_at = :now, updated_at = :now 
      WHERE session_id = :sessionId
    `, { sessionId, now }, { transaction: t });

    await logAudit(t, session.user_id, sessionId, 'session_refreshed', ipAddress, userAgent, null);

    const accessToken = generateAccessToken(session.user_id, sessionId, ACCESS_TOKEN_TTL_SECONDS);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      sessionId,
      expiresIn: ACCESS_TOKEN_TTL_SECONDS
    };
  });

  if (result && result.compromised) {
    throw new Error('Session compromised.');
  }

  return result;
}

export async function revokeMobileSession({ sessionId, refreshToken, reason }) {
  if (!sessionId && !refreshToken) {
    throw new Error('Must provide sessionId or refreshToken.');
  }

  await sequelize.transaction(async (t) => {
    let resolvedSessionId = sessionId;

    if (!resolvedSessionId && refreshToken) {
      const tokenHash = createHash('sha256').update(refreshToken).digest('hex');
      const tokenRecord = await queryOne(`
        SELECT session_id FROM mobile_refresh_tokens 
        WHERE token_hash = :tokenHash LIMIT 1
      `, { tokenHash }, { transaction: t });
      if (tokenRecord) {
        resolvedSessionId = tokenRecord.session_id;
      }
    }

    if (!resolvedSessionId) {
      return;
    }

    const now = new Date();
    await execute(`
      UPDATE mobile_refresh_tokens 
      SET status = 'revoked', revoked_at = :now 
      WHERE session_id = :sessionId AND status = 'active'
    `, { sessionId: resolvedSessionId, now }, { transaction: t });

    await execute(`
      UPDATE mobile_sessions 
      SET status = 'revoked', revoked_at = :now, revoked_reason = :reason, updated_at = :now 
      WHERE session_id = :sessionId AND status = 'active'
    `, { sessionId: resolvedSessionId, now, reason: reason ? String(reason).slice(0, 255) : null }, { transaction: t });

    await logAudit(t, null, resolvedSessionId, 'session_revoked', null, null, { reason: reason ? String(reason).slice(0, 255) : null });
  });
}

export async function revokeAllMobileSessionsForUser({ userId, reason }) {
  await sequelize.transaction(async (t) => {
    const now = new Date();
    const sessions = await queryAll(`
      SELECT session_id FROM mobile_sessions 
      WHERE user_id = :userId AND status = 'active'
    `, { userId }, { transaction: t });

    for (const s of sessions) {
      await execute(`
        UPDATE mobile_refresh_tokens 
        SET status = 'revoked', revoked_at = :now 
        WHERE session_id = :sessionId AND status = 'active'
      `, { sessionId: s.session_id, now }, { transaction: t });

      await logAudit(t, userId, s.session_id, 'session_revoked_by_user', null, null, { reason: reason ? String(reason).slice(0, 255) : null });
    }

    await execute(`
      UPDATE mobile_sessions 
      SET status = 'revoked', revoked_at = :now, revoked_reason = :reason, updated_at = :now 
      WHERE user_id = :userId AND status = 'active'
    `, { userId, now, reason: reason ? String(reason).slice(0, 255) : null }, { transaction: t });
  });
}

export async function verifyMobileAccessToken(accessToken) {
  if (!accessToken) {
    throw new Error('Invalid access token.');
  }

  const payload = verifyAccessToken(accessToken);
  if (!payload) {
    throw new Error('Invalid access token.');
  }

  const { userId, sessionId } = payload;
  
  if (!sessionId || typeof sessionId !== 'string') {
    throw new Error('Invalid access token.');
  }

  const session = await queryOne(`
    SELECT * FROM mobile_sessions 
    WHERE session_id = :sessionId
  `, { sessionId });

  if (!session || session.status !== 'active' || Number(session.user_id) !== Number(userId)) {
    throw new Error('Invalid access token.');
  }

  const user = await findUserById(userId);
  if (!user || user.accessStatus === 'suspended') {
    throw new Error('Invalid access token.');
  }

  try {
    await execute(`
      UPDATE mobile_sessions 
      SET last_seen_at = NOW(), updated_at = NOW() 
      WHERE id = :id
    `, { id: session.id });
  } catch (err) {
    // silently ignore without logging token values
  }

  return {
    user,
    sessionId,
    session: {
      id: session.id,
      userId: session.user_id,
      sessionId: session.session_id,
      status: session.status,
    }
  };
}