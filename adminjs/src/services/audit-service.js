/**
 * P1-64: Audit logging service.
 *
 * Records key state-change events (bookings, memberships, payments, admin actions)
 * to the `audit_log` table for compliance and debugging purposes.
 *
 * The table is created at startup by bootstrap-commerce.js.
 * Each entry is immutable — no updates or deletes are ever issued.
 */
import { execute, queryAll } from './sql.js';

// ──────────────────────────────────────────────
// Action constants
// ──────────────────────────────────────────────

export const AuditAction = Object.freeze({
  // Auth
  USER_REGISTERED: 'user.registered',
  USER_LOGIN: 'user.login',
  USER_LOGOUT: 'user.logout',
  USER_PASSWORD_CHANGED: 'user.password_changed',
  USER_SUSPENDED: 'user.suspended',
  USER_ACTIVATED: 'user.activated',

  // Memberships
  MEMBERSHIP_CREATED: 'membership.created',
  MEMBERSHIP_ACTIVATED: 'membership.activated',
  MEMBERSHIP_CANCELLED: 'membership.cancelled',
  MEMBERSHIP_PLAN_CHANGED: 'membership.plan_changed',
  MEMBERSHIP_PAYMENT_CONFIRMED: 'membership.payment_confirmed',
  MEMBERSHIP_PAYMENT_FAILED: 'membership.payment_failed',

  // Bookings
  BOOKING_CREATED: 'booking.created',
  BOOKING_CONFIRMED: 'booking.confirmed',
  BOOKING_CANCELLED: 'booking.cancelled',
  BOOKING_UPDATED: 'booking.updated',
  BOOKING_EXPIRED: 'booking.expired',
  BOOKING_PAYMENT_CONFIRMED: 'booking.payment_confirmed',
  BOOKING_PAYMENT_FAILED: 'booking.payment_failed',

  // Refunds
  REFUND_ISSUED: 'refund.issued',
  REFUND_FAILED: 'refund.failed',

  // Admin
  ADMIN_CONTACT_DELETED: 'admin.contact_deleted',
  ADMIN_USER_UPDATED: 'admin.user_updated',
  ADMIN_RESOURCE_UPDATED: 'admin.resource_updated',
});

// ──────────────────────────────────────────────
// Core logging function
// ──────────────────────────────────────────────

/**
 * Records an audit event.
 *
 * @param {{ action: string, actorId?: number|null, actorType?: string,
 *   subjectId?: number|null, subjectType?: string,
 *   metadata?: Record<string, unknown> }} entry
 * @param {{ transaction?: import('sequelize').Transaction }} [options]
 */
export async function logAuditEvent(entry, options = {}) {
  try {
    await execute(
      `INSERT INTO audit_log
        (action, actor_id, actor_type, subject_id, subject_type, metadata, created_at)
       VALUES
        (:action, :actorId, :actorType, :subjectId, :subjectType, :metadata, :createdAt)`,
      {
        action: String(entry.action),
        actorId: entry.actorId ?? null,
        actorType: entry.actorType ?? null,
        subjectId: entry.subjectId ?? null,
        subjectType: entry.subjectType ?? null,
        metadata: entry.metadata ? JSON.stringify(entry.metadata) : null,
        createdAt: new Date(),
      },
      options,
    );
  } catch (error) {
    // Audit log failures must never crash the main flow — log and continue.
    console.error('[audit] Failed to write audit log entry:', error?.message || error, { entry });
  }
}

// ──────────────────────────────────────────────
// Query helpers (for admin views)
// ──────────────────────────────────────────────

/**
 * Returns the most recent audit log entries, newest first.
 * @param {{ limit?: number, actorId?: number, subjectId?: number, subjectType?: string, action?: string }} filters
 */
export async function listAuditEvents({ limit = 100, actorId, subjectId, subjectType, action } = {}) {
  const conditions = ['1=1'];
  const replacements = { limit: Math.min(Number(limit) || 100, 500) };

  if (actorId) {
    conditions.push('actor_id = :actorId');
    replacements.actorId = actorId;
  }

  if (subjectId) {
    conditions.push('subject_id = :subjectId');
    replacements.subjectId = subjectId;
  }

  if (subjectType) {
    conditions.push('subject_type = :subjectType');
    replacements.subjectType = subjectType;
  }

  if (action) {
    conditions.push('action = :action');
    replacements.action = action;
  }

  return queryAll(
    `SELECT id, action, actor_id AS actorId, actor_type AS actorType,
            subject_id AS subjectId, subject_type AS subjectType,
            metadata, created_at AS createdAt
       FROM audit_log
      WHERE ${conditions.join(' AND ')}
      ORDER BY created_at DESC
      LIMIT :limit`,
    replacements,
  );
}
