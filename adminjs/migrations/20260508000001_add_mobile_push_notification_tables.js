/**
 * Migration: Add mobile push notification tables
 *
 * Creates mobile_push_tokens, notification_preferences, and notification_outbox
 * for Expo push token registration, member notification preferences, and
 * idempotent notification delivery jobs.
 */

export async function up(sequelize) {
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS mobile_push_tokens (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      user_id BIGINT NOT NULL,
      token VARCHAR(512) NOT NULL,
      platform VARCHAR(32) NOT NULL,
      device_id VARCHAR(255) NULL,
      session_id CHAR(36) NULL,
      status VARCHAR(32) NOT NULL DEFAULT 'active',
      last_seen_at DATETIME NULL,
      revoked_at DATETIME NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      UNIQUE KEY mobile_push_tokens_token_unique (token),
      KEY mobile_push_tokens_user_idx (user_id),
      KEY mobile_push_tokens_status_idx (status),
      KEY mobile_push_tokens_platform_idx (platform),
      KEY mobile_push_tokens_device_idx (device_id),
      KEY mobile_push_tokens_session_idx (session_id),
      KEY mobile_push_tokens_last_seen_idx (last_seen_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS notification_preferences (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      user_id BIGINT NOT NULL,
      booking TINYINT(1) NOT NULL DEFAULT 1,
      payments TINYINT(1) NOT NULL DEFAULT 1,
      membership TINYINT(1) NOT NULL DEFAULT 1,
      access TINYINT(1) NOT NULL DEFAULT 1,
      marketing TINYINT(1) NOT NULL DEFAULT 0,
      quiet_hours_start VARCHAR(5) NULL,
      quiet_hours_end VARCHAR(5) NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      UNIQUE KEY notification_preferences_user_unique (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS notification_outbox (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      user_id BIGINT NULL,
      channel VARCHAR(32) NOT NULL DEFAULT 'push',
      event_type VARCHAR(64) NOT NULL,
      idempotency_key VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      data_json JSON NULL,
      status VARCHAR(32) NOT NULL DEFAULT 'pending',
      attempts INT NOT NULL DEFAULT 0,
      available_at DATETIME NOT NULL,
      locked_at DATETIME NULL,
      locked_by VARCHAR(255) NULL,
      sent_at DATETIME NULL,
      failed_at DATETIME NULL,
      last_error TEXT NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      UNIQUE KEY notification_outbox_idempotency_unique (idempotency_key),
      KEY notification_outbox_user_idx (user_id),
      KEY notification_outbox_status_available_idx (status, available_at),
      KEY notification_outbox_event_idx (event_type),
      KEY notification_outbox_locked_idx (locked_at),
      KEY notification_outbox_sent_idx (sent_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function down(sequelize) {
  await sequelize.query('DROP TABLE IF EXISTS notification_outbox');
  await sequelize.query('DROP TABLE IF EXISTS notification_preferences');
  await sequelize.query('DROP TABLE IF EXISTS mobile_push_tokens');
}
