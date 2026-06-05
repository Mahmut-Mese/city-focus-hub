import { randomUUID } from 'node:crypto';
import { execute, queryAll, queryOne } from './sql.js';
import { sendPushNotificationToUser } from './push-service.js';

const DEFAULT_MAX_ATTEMPTS = 5;
const DEFAULT_RETRY_DELAY_MS = 5 * 60 * 1000;

function parseDataJson(value) {
  if (!value) return {};
  if (typeof value === 'object') return value;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function toOutboxNotification(row) {
  if (!row) return null;
  return {
    id: Number(row.id),
    userId: row.user_id == null ? null : Number(row.user_id),
    channel: row.channel,
    eventType: row.event_type,
    idempotencyKey: row.idempotency_key,
    title: row.title,
    body: row.body,
    data: parseDataJson(row.data_json),
    status: row.status,
    attempts: Number(row.attempts || 0),
    availableAt: row.available_at || null,
    lockedAt: row.locked_at || null,
    lockedBy: row.locked_by || null,
    sentAt: row.sent_at || null,
    failedAt: row.failed_at || null,
    lastError: row.last_error || null,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  };
}

function requireNonEmptyString(value, label) {
  const normalized = String(value || '').trim();
  if (!normalized) {
    throw new Error(`${label} is required.`);
  }
  return normalized;
}

function getWorkerId(workerId) {
  return String(workerId || `worker-${process.pid}-${randomUUID()}`).slice(0, 255);
}

export function normalizeNotificationData(data = {}) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(data)
      .filter(([key]) => typeof key === 'string' && key.length > 0)
      .map(([key, value]) => [key, value == null ? null : value]),
  );
}

export async function getNotificationByIdempotencyKey(idempotencyKey) {
  const normalizedKey = requireNonEmptyString(idempotencyKey, 'Idempotency key');
  const row = await queryOne(
    'SELECT * FROM notification_outbox WHERE idempotency_key = :idempotencyKey LIMIT 1',
    { idempotencyKey: normalizedKey },
  );
  return toOutboxNotification(row);
}

export async function enqueueNotification({
  userId = null,
  eventType,
  idempotencyKey,
  title,
  body,
  data = {},
  availableAt = new Date(),
  channel = 'push',
}) {
  const normalizedEventType = requireNonEmptyString(eventType, 'Event type');
  const normalizedIdempotencyKey = requireNonEmptyString(idempotencyKey, 'Idempotency key');
  const normalizedTitle = requireNonEmptyString(title, 'Title');
  const normalizedBody = requireNonEmptyString(body, 'Body');
  const normalizedChannel = requireNonEmptyString(channel, 'Channel');
  const now = new Date();

  await execute(
    `INSERT INTO notification_outbox
      (user_id, channel, event_type, idempotency_key, title, body, data_json, status, attempts, available_at, created_at, updated_at)
     VALUES
      (:userId, :channel, :eventType, :idempotencyKey, :title, :body, :dataJson, 'pending', 0, :availableAt, :now, :now)
     ON DUPLICATE KEY UPDATE idempotency_key = idempotency_key`,
    {
      userId,
      channel: normalizedChannel,
      eventType: normalizedEventType,
      idempotencyKey: normalizedIdempotencyKey,
      title: normalizedTitle,
      body: normalizedBody,
      dataJson: JSON.stringify(normalizeNotificationData(data)),
      availableAt,
      now,
    },
  );

  return getNotificationByIdempotencyKey(normalizedIdempotencyKey);
}

export async function claimPendingNotifications({ limit = 25, workerId = null, now = new Date() } = {}) {
  const normalizedLimit = Math.max(1, Math.min(100, Number(limit) || 25));
  const normalizedWorkerId = getWorkerId(workerId);

  const rows = await queryAll(
    `SELECT id FROM notification_outbox
      WHERE status = 'pending' AND available_at <= :now
      ORDER BY available_at ASC, id ASC
      LIMIT ${normalizedLimit}`,
    { now },
  );

  const ids = rows.map((row) => Number(row.id)).filter(Boolean);
  if (ids.length === 0) return [];

  await execute(
    `UPDATE notification_outbox
        SET status = 'processing', locked_at = :now, locked_by = :workerId, updated_at = :now
      WHERE status = 'pending' AND id IN (:ids)`,
    { ids, now, workerId: normalizedWorkerId },
  );

  const claimedRows = await queryAll(
    `SELECT * FROM notification_outbox
      WHERE locked_by = :workerId AND status = 'processing' AND id IN (:ids)
      ORDER BY available_at ASC, id ASC`,
    { ids, workerId: normalizedWorkerId },
  );

  return claimedRows.map(toOutboxNotification);
}

export async function markNotificationSent(id, { tickets = [] } = {}) {
  await execute(
    `UPDATE notification_outbox
        SET status = 'sent', sent_at = :now, failed_at = NULL, locked_at = NULL, locked_by = NULL,
            last_error = NULL, data_json = :dataJson, updated_at = :now
      WHERE id = :id`,
    {
      id,
      now: new Date(),
      dataJson: JSON.stringify({ tickets }),
    },
  );
  return queryOne('SELECT * FROM notification_outbox WHERE id = :id LIMIT 1', { id }).then(toOutboxNotification);
}

export async function markNotificationFailed(id, error, { retryDelayMs = DEFAULT_RETRY_DELAY_MS, maxAttempts = DEFAULT_MAX_ATTEMPTS } = {}) {
  const row = await queryOne('SELECT attempts FROM notification_outbox WHERE id = :id LIMIT 1', { id });
  const nextAttempts = Number(row?.attempts || 0) + 1;
  const shouldRetry = nextAttempts < maxAttempts;
  const now = new Date();
  const nextAvailableAt = new Date(now.getTime() + Math.max(0, Number(retryDelayMs) || DEFAULT_RETRY_DELAY_MS));

  await execute(
    `UPDATE notification_outbox
        SET status = :status,
            attempts = :attempts,
            available_at = :availableAt,
            locked_at = NULL,
            locked_by = NULL,
            failed_at = :failedAt,
            last_error = :lastError,
            updated_at = :now
      WHERE id = :id`,
    {
      id,
      status: shouldRetry ? 'pending' : 'failed',
      attempts: nextAttempts,
      availableAt: shouldRetry ? nextAvailableAt : now,
      failedAt: shouldRetry ? null : now,
      lastError: String(error?.message || error || 'Notification delivery failed.').slice(0, 2000),
      now,
    },
  );

  return queryOne('SELECT * FROM notification_outbox WHERE id = :id LIMIT 1', { id }).then(toOutboxNotification);
}

export async function deliverNotification(notification) {
  if (!notification) throw new Error('Notification is required.');

  try {
    if (notification.channel !== 'push') {
      throw new Error(`Unsupported notification channel: ${notification.channel}`);
    }
    if (!notification.userId) {
      throw new Error('Push notification requires a user ID.');
    }

    const result = await sendPushNotificationToUser({
      userId: notification.userId,
      title: notification.title,
      body: notification.body,
      data: notification.data,
    });

    return markNotificationSent(notification.id, { tickets: result.tickets });
  } catch (error) {
    return markNotificationFailed(notification.id, error);
  }
}

export async function deliverNotificationBatch(options = {}) {
  const notifications = await claimPendingNotifications(options);
  const results = [];

  for (const notification of notifications) {
    results.push(await deliverNotification(notification));
  }

  return {
    claimed: notifications.length,
    results,
  };
}
