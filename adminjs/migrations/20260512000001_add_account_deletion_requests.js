/**
 * Migration: Add account deletion requests table
 *
 * Creates account_deletion_requests for member-initiated account deletion
 * workflow tracking with 30-day processing window support.
 */

export async function up(sequelize) {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS account_deletion_requests (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      user_id BIGINT NOT NULL,
      status VARCHAR(32) NOT NULL DEFAULT 'requested',
      reason TEXT NULL,
      requested_at DATETIME NOT NULL,
      scheduled_deletion_at DATETIME NOT NULL,
      cancelled_at DATETIME NULL,
      completed_at DATETIME NULL,
      cancelled_reason VARCHAR(255) NULL,
      completed_reason VARCHAR(255) NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      KEY account_deletion_requests_user_idx (user_id),
      KEY account_deletion_requests_status_idx (status),
      KEY account_deletion_requests_scheduled_idx (status, scheduled_deletion_at),
      KEY account_deletion_requests_requested_idx (requested_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function down(sequelize) {
  await sequelize.query('DROP TABLE IF EXISTS account_deletion_requests');
}
