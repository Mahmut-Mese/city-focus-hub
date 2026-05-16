import { execute, queryAll, queryOne } from './sql.js';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';
const PUSH_BATCH_SIZE = 100;
const SUPPORTED_PLATFORMS = new Set(['ios', 'android']);

const DEFAULT_PREFERENCES = Object.freeze({
  booking: true,
  payments: true,
  membership: true,
  access: true,
  marketing: false,
  quietHoursStart: null,
  quietHoursEnd: null,
});

let pushProvider = null;

function normalizeNullableString(value) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function toPreferencePayload(row) {
  if (!row) return { ...DEFAULT_PREFERENCES };
  return {
    booking: Boolean(row.booking),
    payments: Boolean(row.payments),
    membership: Boolean(row.membership),
    access: Boolean(row.access),
    marketing: Boolean(row.marketing),
    quietHoursStart: row.quiet_hours_start || null,
    quietHoursEnd: row.quiet_hours_end || null,
  };
}

function chunkArray(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function normalizePushMessage(message) {
  return {
    to: message.to,
    title: String(message.title || ''),
    body: String(message.body || ''),
    data: message.data && typeof message.data === 'object' ? message.data : {},
    sound: 'default',
  };
}

export function createExpoPushProvider(options = {}) {
  const endpoint = options.endpoint || EXPO_PUSH_URL;

  return {
    name: 'expo',
    async send(messages) {
      if (typeof fetch !== 'function') {
        throw new Error('Global fetch is not available for Expo push delivery.');
      }

      const tickets = [];
      const normalizedMessages = messages.map(normalizePushMessage);

      for (const batch of chunkArray(normalizedMessages, PUSH_BATCH_SIZE)) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(batch),
        });

        if (!response.ok) {
          throw new Error(`Expo push provider returned HTTP ${response.status}.`);
        }

        const payload = await response.json();
        if (Array.isArray(payload?.data)) {
          tickets.push(...payload.data);
        } else if (payload?.data) {
          tickets.push(payload.data);
        }
      }

      return tickets;
    },
  };
}

export function setPushProvider(provider) {
  if (!provider || typeof provider.send !== 'function') {
    throw new Error('Push provider must expose a send(messages) function.');
  }
  pushProvider = provider;
}

export function getPushProvider() {
  if (!pushProvider) {
    pushProvider = createExpoPushProvider();
  }
  return pushProvider;
}

export function isSupportedPushPlatform(platform) {
  return SUPPORTED_PLATFORMS.has(String(platform || '').toLowerCase());
}

export function isExpoPushToken(token) {
  return /^ExponentPushToken\[[^\]]+\]$/.test(String(token || ''))
    || /^ExpoPushToken\[[^\]]+\]$/.test(String(token || ''));
}

export async function registerPushToken({ userId, token, platform, deviceId = null, sessionId = null }) {
  const normalizedToken = String(token || '').trim();
  const normalizedPlatform = String(platform || '').trim().toLowerCase();

  if (!userId) throw new Error('User ID is required.');
  if (!isExpoPushToken(normalizedToken)) throw new Error('A valid Expo push token is required.');
  if (!isSupportedPushPlatform(normalizedPlatform)) throw new Error('A supported platform is required.');

  const now = new Date();
  await execute(
    `INSERT INTO mobile_push_tokens
      (user_id, token, platform, device_id, session_id, status, last_seen_at, revoked_at, created_at, updated_at)
     VALUES
      (:userId, :token, :platform, :deviceId, :sessionId, 'active', :now, NULL, :now, :now)
     ON DUPLICATE KEY UPDATE
      user_id = VALUES(user_id),
      platform = VALUES(platform),
      device_id = VALUES(device_id),
      session_id = VALUES(session_id),
      status = 'active',
      last_seen_at = VALUES(last_seen_at),
      revoked_at = NULL,
      updated_at = VALUES(updated_at)`,
    {
      userId,
      token: normalizedToken,
      platform: normalizedPlatform,
      deviceId: normalizeNullableString(deviceId),
      sessionId: normalizeNullableString(sessionId),
      now,
    },
  );

  return { ok: true };
}

export async function revokePushToken({ userId, token = '', deviceId = '', sessionId = '' }) {
  if (!userId) throw new Error('User ID is required.');

  const normalizedToken = normalizeNullableString(token);
  const normalizedDeviceId = normalizeNullableString(deviceId);
  const normalizedSessionId = normalizeNullableString(sessionId);

  if (!normalizedToken && !normalizedDeviceId && !normalizedSessionId) {
    throw new Error('Token, device ID, or session ID is required.');
  }

  await execute(
    `UPDATE mobile_push_tokens
        SET status = 'revoked', revoked_at = :now, updated_at = :now
      WHERE user_id = :userId
        AND status = 'active'
        AND (:token IS NULL OR token = :token)
        AND (:deviceId IS NULL OR device_id = :deviceId)
        AND (:sessionId IS NULL OR session_id = :sessionId)`,
    {
      userId,
      token: normalizedToken,
      deviceId: normalizedDeviceId,
      sessionId: normalizedSessionId,
      now: new Date(),
    },
  );

  return { ok: true };
}

export async function listActivePushTokensForUser(userId) {
  if (!userId) return [];
  const rows = await queryAll(
    `SELECT token, platform, device_id AS deviceId, session_id AS sessionId, last_seen_at AS lastSeenAt
       FROM mobile_push_tokens
      WHERE user_id = :userId AND status = 'active'
      ORDER BY COALESCE(last_seen_at, updated_at, created_at) DESC`,
    { userId },
  );
  return rows.map((row) => ({
    token: row.token,
    platform: row.platform,
    deviceId: row.deviceId || null,
    sessionId: row.sessionId || null,
    lastSeenAt: row.lastSeenAt || null,
  }));
}

export async function getNotificationPreferences(userId) {
  if (!userId) throw new Error('User ID is required.');
  const row = await queryOne('SELECT * FROM notification_preferences WHERE user_id = :userId LIMIT 1', { userId });
  return toPreferencePayload(row);
}

export async function updateNotificationPreferences(userId, input = {}) {
  if (!userId) throw new Error('User ID is required.');

  const next = {
    ...DEFAULT_PREFERENCES,
    ...await getNotificationPreferences(userId),
    ...input,
  };
  const now = new Date();

  await execute(
    `INSERT INTO notification_preferences
      (user_id, booking, payments, membership, access, marketing, quiet_hours_start, quiet_hours_end, created_at, updated_at)
     VALUES
      (:userId, :booking, :payments, :membership, :access, :marketing, :quietHoursStart, :quietHoursEnd, :now, :now)
     ON DUPLICATE KEY UPDATE
      booking = VALUES(booking),
      payments = VALUES(payments),
      membership = VALUES(membership),
      access = VALUES(access),
      marketing = VALUES(marketing),
      quiet_hours_start = VALUES(quiet_hours_start),
      quiet_hours_end = VALUES(quiet_hours_end),
      updated_at = VALUES(updated_at)`,
    {
      userId,
      booking: next.booking ? 1 : 0,
      payments: next.payments ? 1 : 0,
      membership: next.membership ? 1 : 0,
      access: next.access ? 1 : 0,
      marketing: next.marketing ? 1 : 0,
      quietHoursStart: normalizeNullableString(next.quietHoursStart),
      quietHoursEnd: normalizeNullableString(next.quietHoursEnd),
      now,
    },
  );

  return getNotificationPreferences(userId);
}

export async function sendPushNotificationToTokens({ tokens, title, body, data = {} }) {
  const validTokens = Array.from(new Set((tokens || []).map((token) => String(token || '').trim()).filter(isExpoPushToken)));
  if (validTokens.length === 0) {
    return { sent: 0, tickets: [] };
  }

  const messages = validTokens.map((token) => ({ to: token, title, body, data }));
  const tickets = await getPushProvider().send(messages);
  return { sent: validTokens.length, tickets };
}

export async function sendPushNotificationToUser({ userId, title, body, data = {} }) {
  const rows = await listActivePushTokensForUser(userId);
  if (rows.length === 0) {
    return { sent: 0, tickets: [] };
  }
  return sendPushNotificationToTokens({ tokens: rows.map((row) => row.token), title, body, data });
}
