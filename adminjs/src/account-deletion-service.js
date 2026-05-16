import { execute, queryOne } from './services/sql.js';
import { sequelize } from './database.js';

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function normalizeUserId(userId) {
  const id = Number(userId);
  if (!Number.isFinite(id) || id <= 0) throw new Error('User ID is required.');
  return id;
}

function normalizeId(value, message) {
  const id = Number(value);
  if (!Number.isFinite(id) || id <= 0) throw new Error(message);
  return id;
}

function normalizeReason(value, maxLength) {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, maxLength) : null;
}

function toAccountDeletionPayload(row) {
  if (!row) return null;
  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    status: String(row.status),
    reason: row.reason || null,
    requestedAt: row.requested_at || null,
    scheduledDeletionAt: row.scheduled_deletion_at || null,
    cancelledAt: row.cancelled_at || null,
    completedAt: row.completed_at || null,
    cancelledReason: row.cancelled_reason || null,
    completedReason: row.completed_reason || null,
    createdAt: row.created_at || null,
    updatedAt: row.updated_at || null,
  };
}

async function getRequestById(id, transaction) {
  return queryOne('SELECT * FROM account_deletion_requests WHERE id = :id LIMIT 1', { id }, transaction ? { transaction } : {});
}

export async function getAccountDeletionStatus(userId) {
  const normalizedUserId = normalizeUserId(userId);
  const row = await queryOne(
    `SELECT * FROM account_deletion_requests
      WHERE user_id = :userId
      ORDER BY requested_at DESC, id DESC
      LIMIT 1`,
    { userId: normalizedUserId },
  );
  return toAccountDeletionPayload(row);
}

export async function requestAccountDeletion({ userId, reason }) {
  const normalizedUserId = normalizeUserId(userId);
  const normalizedReason = normalizeReason(reason, 1000);

  return sequelize.transaction(async (transaction) => {
    const existing = await queryOne(
      `SELECT * FROM account_deletion_requests
        WHERE user_id = :userId AND status IN ('requested', 'processing')
        ORDER BY requested_at DESC, id DESC
        LIMIT 1 FOR UPDATE`,
      { userId: normalizedUserId },
      { transaction },
    );
    if (existing) return toAccountDeletionPayload(existing);

    const now = new Date();
    const scheduledDeletionAt = new Date(now.getTime() + THIRTY_DAYS_MS);
    const [insertId, metadata] = await execute(
      `INSERT INTO account_deletion_requests
        (user_id, status, reason, requested_at, scheduled_deletion_at, created_at, updated_at)
       VALUES
        (:userId, 'requested', :reason, :requestedAt, :scheduledDeletionAt, :now, :now)`,
      { userId: normalizedUserId, reason: normalizedReason, requestedAt: now, scheduledDeletionAt, now },
      { transaction },
    );
    const requestId = typeof insertId === 'number' ? insertId : metadata?.insertId;
    if (!requestId) throw new Error('Failed to create account deletion request.');
    return toAccountDeletionPayload(await getRequestById(requestId, transaction));
  });
}

export async function cancelAccountDeletionRequest({ userId, reason }) {
  const normalizedUserId = normalizeUserId(userId);
  const normalizedReason = normalizeReason(reason, 255);

  return sequelize.transaction(async (transaction) => {
    const row = await queryOne(
      `SELECT * FROM account_deletion_requests
        WHERE user_id = :userId AND status = 'requested'
        ORDER BY requested_at DESC, id DESC
        LIMIT 1 FOR UPDATE`,
      { userId: normalizedUserId },
      { transaction },
    );
    if (!row) throw new Error('No cancellable account deletion request found.');

    const now = new Date();
    await execute(
      `UPDATE account_deletion_requests
        SET status = 'cancelled', cancelled_at = :now, cancelled_reason = :reason, updated_at = :now
        WHERE id = :id`,
      { id: row.id, now, reason: normalizedReason },
      { transaction },
    );
    return toAccountDeletionPayload(await getRequestById(row.id, transaction));
  });
}

export async function markAccountDeletionCompleted({ requestId, userId, reason }) {
  const normalizedRequestId = normalizeId(requestId, 'Request ID is required.');
  const normalizedUserId = normalizeUserId(userId);
  const normalizedReason = normalizeReason(reason, 255) || 'account_deletion_completed';

  return sequelize.transaction(async (transaction) => {
    const row = await queryOne(
      `SELECT * FROM account_deletion_requests
        WHERE id = :requestId AND user_id = :userId
        LIMIT 1 FOR UPDATE`,
      { requestId: normalizedRequestId, userId: normalizedUserId },
      { transaction },
    );
    if (!row) throw new Error('Account deletion request not found.');
    if (row.status === 'cancelled') throw new Error('Cannot complete a cancelled account deletion request.');

    const now = new Date();
    await execute(
      `UPDATE mobile_refresh_tokens
        SET status = 'revoked', revoked_at = :now
        WHERE session_id IN (SELECT session_id FROM mobile_sessions WHERE user_id = :userId AND status = 'active')
          AND status = 'active'`,
      { userId: normalizedUserId, now },
      { transaction },
    );
    await execute(
      `UPDATE mobile_sessions
        SET status = 'revoked', revoked_at = :now, revoked_reason = :reason, updated_at = :now
        WHERE user_id = :userId AND status = 'active'`,
      { userId: normalizedUserId, reason: normalizedReason, now },
      { transaction },
    );
    await execute(
      `DELETE FROM member_sessions WHERE JSON_UNQUOTE(JSON_EXTRACT(data, '$.memberUserId')) = :userId`,
      { userId: String(normalizedUserId) },
      { transaction },
    );
    await execute(
      `UPDATE mobile_push_tokens
        SET status = 'revoked', revoked_at = :now, updated_at = :now
        WHERE user_id = :userId AND status = 'active'`,
      { userId: normalizedUserId, now },
      { transaction },
    );
    if (row.status !== 'completed') {
      await execute(
        `UPDATE account_deletion_requests
          SET status = 'completed', completed_at = :now, completed_reason = :reason, updated_at = :now
          WHERE id = :id`,
        { id: row.id, now, reason: normalizedReason },
        { transaction },
      );
    }
    return toAccountDeletionPayload(await getRequestById(row.id, transaction));
  });
}

