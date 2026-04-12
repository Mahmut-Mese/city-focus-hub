/**
 * Migration: Add audit_log table
 *
 * Creates the audit_log table for recording immutable state-change events.
 * This table was also added to bootstrap-commerce.js TABLE_DEFINITIONS so that
 * fresh installs get it automatically — this migration ensures existing installs
 * receive it without a full re-bootstrap.
 */

export async function up(sequelize) {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS audit_log (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      action VARCHAR(128) NOT NULL,
      actor_id INT UNSIGNED NULL,
      actor_type VARCHAR(32) NULL,
      subject_id INT UNSIGNED NULL,
      subject_type VARCHAR(32) NULL,
      metadata JSON NULL,
      created_at DATETIME(6) NOT NULL,
      KEY audit_log_action_idx (action),
      KEY audit_log_actor_idx (actor_id, actor_type),
      KEY audit_log_subject_idx (subject_id, subject_type),
      KEY audit_log_created_idx (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function down(sequelize) {
  await sequelize.query('DROP TABLE IF EXISTS audit_log');
}
