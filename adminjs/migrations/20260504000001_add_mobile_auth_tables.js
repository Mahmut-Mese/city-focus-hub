/**
 * Migration: Add mobile auth tables
 * 
 * Creates mobile_sessions, mobile_refresh_tokens, and mobile_auth_audit_events
 * for managing mobile app authentication and secure token rotation.
 */

export async function up(sequelize) {
  // Create mobile_sessions
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS mobile_sessions (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      user_id BIGINT NOT NULL,
      session_id CHAR(36) NOT NULL UNIQUE,
      device_name VARCHAR(255),
      platform VARCHAR(32),
      user_agent TEXT,
      ip_address VARCHAR(64),
      status VARCHAR(32) NOT NULL DEFAULT 'active',
      compromised_at DATETIME NULL,
      revoked_at DATETIME NULL,
      revoked_reason VARCHAR(255) NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL,
      last_seen_at DATETIME NULL,
      KEY mobile_sessions_user_id_idx (user_id),
      KEY mobile_sessions_status_idx (status),
      KEY mobile_sessions_last_seen_idx (last_seen_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Create mobile_refresh_tokens
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS mobile_refresh_tokens (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      session_id CHAR(36) NOT NULL,
      token_hash CHAR(64) NOT NULL UNIQUE,
      family_id CHAR(36) NOT NULL,
      status VARCHAR(32) NOT NULL DEFAULT 'active',
      expires_at DATETIME NOT NULL,
      rotated_at DATETIME NULL,
      revoked_at DATETIME NULL,
      created_at DATETIME NOT NULL,
      KEY mobile_rt_session_idx (session_id),
      KEY mobile_rt_family_idx (family_id),
      KEY mobile_rt_status_idx (status),
      KEY mobile_rt_expires_idx (expires_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  // Create mobile_auth_audit_events
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS mobile_auth_audit_events (
      id BIGINT PRIMARY KEY AUTO_INCREMENT,
      user_id BIGINT NULL,
      session_id CHAR(36) NULL,
      event_type VARCHAR(64) NOT NULL,
      ip_address VARCHAR(64),
      user_agent TEXT,
      details_json JSON NULL,
      created_at DATETIME NOT NULL,
      KEY mobile_audit_user_idx (user_id),
      KEY mobile_audit_session_idx (session_id),
      KEY mobile_audit_event_idx (event_type),
      KEY mobile_audit_created_idx (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function down(sequelize) {
  await sequelize.query('DROP TABLE IF EXISTS mobile_auth_audit_events');
  await sequelize.query('DROP TABLE IF EXISTS mobile_refresh_tokens');
  await sequelize.query('DROP TABLE IF EXISTS mobile_sessions');
}
