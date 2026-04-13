import { randomUUID } from 'node:crypto';
import { sequelize } from './database.js';
import { config } from './config.js';

const TABLE_DEFINITIONS = [
  `CREATE TABLE IF NOT EXISTS member_users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    stripe_customer_id VARCHAR(255) NULL,
    entry_source VARCHAR(32) NOT NULL DEFAULT 'system',
    access_status VARCHAR(32) NOT NULL DEFAULT 'active',
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    UNIQUE KEY member_users_email_unique (email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS membership_plans (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    slug VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    monthly_price_minor INT NOT NULL,
    currency VARCHAR(8) NOT NULL DEFAULT 'gbp',
    interval_name VARCHAR(32) NOT NULL DEFAULT 'month',
    features JSON NULL,
    stripe_product_id VARCHAR(255) NULL,
    stripe_price_id VARCHAR(255) NULL,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    UNIQUE KEY membership_plans_slug_unique (slug)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS memberships (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    plan_id INT UNSIGNED NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'inactive',
    stripe_subscription_id VARCHAR(255) NULL,
    stripe_price_id VARCHAR(255) NULL,
    cancel_at_period_end TINYINT(1) NOT NULL DEFAULT 0,
    current_period_start DATETIME(6) NULL,
    current_period_end DATETIME(6) NULL,
    suspended_at DATETIME(6) NULL,
    failed_payment_count INT NOT NULL DEFAULT 0,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    KEY memberships_user_idx (user_id),
    KEY memberships_plan_idx (plan_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS membership_adjustments (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    membership_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    current_plan_id INT UNSIGNED NOT NULL,
    target_plan_id INT UNSIGNED NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'pending_payment',
    subtotal_minor INT NOT NULL DEFAULT 0,
    tax_minor INT NOT NULL DEFAULT 0,
    total_minor INT NOT NULL DEFAULT 0,
    currency VARCHAR(8) NOT NULL DEFAULT 'gbp',
    stripe_checkout_session_id VARCHAR(255) NULL,
    stripe_payment_intent_id VARCHAR(255) NULL,
    payment_hold_expires_at DATETIME(6) NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    KEY membership_adjustments_membership_idx (membership_id),
    KEY membership_adjustments_user_idx (user_id),
    KEY membership_adjustments_target_plan_idx (target_plan_id),
    UNIQUE KEY membership_adjustments_checkout_session_unique (stripe_checkout_session_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS resources (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    slug VARCHAR(64) NOT NULL,
    type VARCHAR(32) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    capacity INT NOT NULL DEFAULT 1,
    hourly_rate_minor INT NOT NULL DEFAULT 0,
    active TINYINT(1) NOT NULL DEFAULT 1,
    metadata JSON NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    UNIQUE KEY resources_slug_unique (slug)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS bookings (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    membership_id INT UNSIGNED NULL,
    resource_id INT UNSIGNED NOT NULL,
    entry_source VARCHAR(32) NOT NULL DEFAULT 'system',
    booking_type VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'pending',
    start_at DATETIME(6) NOT NULL,
    end_at DATETIME(6) NOT NULL,
    purpose VARCHAR(255) NULL,
    notes LONGTEXT NULL,
    stripe_payment_intent_id VARCHAR(255) NULL,
    stripe_checkout_session_id VARCHAR(255) NULL,
    stripe_payment_status VARCHAR(64) NULL,
    payment_hold_expires_at DATETIME(6) NULL,
    subtotal_minor INT NOT NULL DEFAULT 0,
    tax_minor INT NOT NULL DEFAULT 0,
    total_minor INT NOT NULL DEFAULT 0,
    currency VARCHAR(8) NOT NULL DEFAULT 'gbp',
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    KEY bookings_user_idx (user_id),
    KEY bookings_resource_idx (resource_id),
    KEY bookings_membership_idx (membership_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS invoices (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    membership_id INT UNSIGNED NULL,
    booking_id INT UNSIGNED NULL,
    entry_source VARCHAR(32) NOT NULL DEFAULT 'system',
    stripe_invoice_id VARCHAR(255) NULL,
    stripe_payment_intent_id VARCHAR(255) NULL,
    invoice_number VARCHAR(128) NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'draft',
    description TEXT NULL,
    currency VARCHAR(8) NOT NULL DEFAULT 'gbp',
    subtotal_minor INT NOT NULL DEFAULT 0,
    tax_minor INT NOT NULL DEFAULT 0,
    total_minor INT NOT NULL DEFAULT 0,
    hosted_invoice_url TEXT NULL,
    invoice_pdf TEXT NULL,
    paid_at DATETIME(6) NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    UNIQUE KEY invoices_stripe_invoice_unique (stripe_invoice_id),
    KEY invoices_user_idx (user_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS refunds (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    user_id INT UNSIGNED NULL,
    membership_id INT UNSIGNED NULL,
    booking_id INT UNSIGNED NULL,
    stripe_refund_id VARCHAR(255) NOT NULL,
    stripe_charge_id VARCHAR(255) NULL,
    stripe_payment_intent_id VARCHAR(255) NULL,
    amount_minor INT NOT NULL DEFAULT 0,
    currency VARCHAR(8) NOT NULL DEFAULT 'gbp',
    status VARCHAR(32) NOT NULL DEFAULT 'pending',
    reason VARCHAR(64) NULL,
    raw_payload JSON NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    UNIQUE KEY refunds_stripe_refund_unique (stripe_refund_id),
    KEY refunds_user_idx (user_id),
    KEY refunds_payment_intent_idx (stripe_payment_intent_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS booking_adjustments (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    document_id VARCHAR(64) NOT NULL,
    booking_id INT UNSIGNED NOT NULL,
    user_id INT UNSIGNED NOT NULL,
    resource_id INT UNSIGNED NOT NULL,
    booking_type VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'pending_payment',
    start_at DATETIME(6) NOT NULL,
    end_at DATETIME(6) NOT NULL,
    purpose VARCHAR(255) NULL,
    notes LONGTEXT NULL,
    subtotal_minor INT NOT NULL DEFAULT 0,
    tax_minor INT NOT NULL DEFAULT 0,
    total_minor INT NOT NULL DEFAULT 0,
    adjustment_minor INT NOT NULL DEFAULT 0,
    currency VARCHAR(8) NOT NULL DEFAULT 'gbp',
    stripe_checkout_session_id VARCHAR(255) NULL,
    stripe_payment_intent_id VARCHAR(255) NULL,
    payment_hold_expires_at DATETIME(6) NULL,
    created_at DATETIME(6) NULL,
    updated_at DATETIME(6) NULL,
    KEY booking_adjustments_booking_idx (booking_id),
    KEY booking_adjustments_user_idx (user_id),
    KEY booking_adjustments_resource_idx (resource_id),
    UNIQUE KEY booking_adjustments_checkout_session_unique (stripe_checkout_session_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS stripe_webhook_events (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stripe_event_id VARCHAR(255) NOT NULL,
    event_type VARCHAR(255) NOT NULL,
    payload JSON NULL,
    processed_at DATETIME(6) NULL,
    created_at DATETIME(6) NULL,
    UNIQUE KEY stripe_webhook_events_event_unique (stripe_event_id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  // P1-64: Audit log table — records immutable state-change events for compliance and debugging.
  // actor_id / actor_type identify who triggered the action (member user, admin, or system).
  // subject_id / subject_type identify the affected record (booking, membership, invoice, etc.).
  `CREATE TABLE IF NOT EXISTS audit_log (
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
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

const DEFAULT_PLANS = [
  {
    slug: 'lounge1',
    name: 'Lounge1',
    description: 'Perfect for freelancers who need occasional workspace access.',
    monthlyPriceMinor: 12900,
    features: [
      'Access to lounge area1',
      'High-speed Wi-Fi1',
      '5 hours meeting room/month',
      'Community events access',
    ],
  },
  {
    slug: 'smart-office',
    name: 'Smart Office',
    description: 'Ideal for remote workers who need a dedicated desk.',
    monthlyPriceMinor: 3900,
    features: [
      'Dedicated desk access',
      'High-speed Wi-Fi',
      '10 hours meeting room/month',
      'Mail handling',
    ],
  },
  {
    slug: 'full-space',
    name: 'Full Space',
    description: 'Complete access to all amenities and private office.',
    monthlyPriceMinor: 5900,
    features: [
      'Private office access',
      'High-speed Wi-Fi',
      'Unlimited meeting rooms',
      '24/7 access',
    ],
  },
];

const DEFAULT_RESOURCES = [
  {
    slug: 'room-focus-4',
    type: 'meeting_room',
    name: '4-Person Meeting Room',
    description: 'Private room for small team sessions and client calls.',
    capacity: 4,
    hourlyRateMinor: 4500,
    metadata: { floor: 'Second Floor', zone: 'Room A' },
  },
  {
    slug: 'room-atlas-10',
    type: 'meeting_room',
    name: '10-Person Meeting Room',
    description: 'Larger presentation room with screen sharing and VC equipment.',
    capacity: 10,
    hourlyRateMinor: 8000,
    metadata: { floor: 'Third Floor', zone: 'Atlas Suite' },
  },
  {
    slug: 'desk-window-a1',
    type: 'desk',
    name: 'Window Desk A1',
    description: 'Quiet desk with natural light and monitor arm.',
    capacity: 1,
    hourlyRateMinor: 1800,
    metadata: { floor: 'Second Floor', zone: 'Window Row' },
  },
  {
    slug: 'desk-booth-b4',
    type: 'desk',
    name: 'Focus Booth B4',
    description: 'Semi-private desk for focused work sessions.',
    capacity: 1,
    hourlyRateMinor: 2200,
    metadata: { floor: 'Ground Floor', zone: 'Focus Booths' },
  },
];

async function ensureSchema() {
  for (const statement of TABLE_DEFINITIONS) {
    await sequelize.query(statement);
  }
}

// P1-63: Allowlist of valid identifiers to prevent SQL injection via ensureColumn/hasColumn.
// These functions accept raw table/column names — only allow known safe identifiers.
const VALID_IDENTIFIER_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function assertSafeIdentifier(value, label) {
  if (!VALID_IDENTIFIER_RE.test(value)) {
    throw new Error(`Invalid ${label}: "${value}". Only alphanumeric characters and underscores are allowed.`);
  }
}

async function hasColumn(tableName, columnName) {
  assertSafeIdentifier(tableName, 'table name');
  assertSafeIdentifier(columnName, 'column name');
  const [rows] = await sequelize.query(
    `SHOW COLUMNS FROM \`${tableName}\` LIKE :columnName`,
    {
      replacements: { columnName },
    },
  );

  return Array.isArray(rows) && rows.length > 0;
}

async function ensureColumn(tableName, columnName, definition) {
  assertSafeIdentifier(tableName, 'table name');
  assertSafeIdentifier(columnName, 'column name');
  if (await hasColumn(tableName, columnName)) {
    return;
  }

  await sequelize.query(`ALTER TABLE \`${tableName}\` ADD COLUMN ${definition}`);
}

// P2-107: Modify an existing column's type/attributes if the column already exists.
// Use when a migration needs to widen a column, change its default, etc.
async function ensureColumnType(tableName, columnName, definition) {
  assertSafeIdentifier(tableName, 'table name');
  assertSafeIdentifier(columnName, 'column name');
  if (!(await hasColumn(tableName, columnName))) {
    // Column doesn't exist yet — add it instead
    await sequelize.query(`ALTER TABLE \`${tableName}\` ADD COLUMN ${definition}`);
    return;
  }

  await sequelize.query(`ALTER TABLE \`${tableName}\` MODIFY COLUMN ${definition}`);
}

async function ensureIndex(tableName, indexName, columnDefs) {
  assertSafeIdentifier(tableName, 'table name');
  assertSafeIdentifier(indexName, 'index name');
  const [rows] = await sequelize.query(
    `SELECT INDEX_NAME FROM information_schema.STATISTICS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :tableName AND INDEX_NAME = :indexName LIMIT 1`,
    { replacements: { tableName, indexName } },
  );

  if (Array.isArray(rows) && rows.length > 0) {
    return;
  }

  await sequelize.query(`ALTER TABLE \`${tableName}\` ADD INDEX \`${indexName}\` (${columnDefs})`);
}

async function ensureForeignKey(tableName, constraintName, columnName, refTable, refColumn) {
  const [rows] = await sequelize.query(
    `SELECT CONSTRAINT_NAME FROM information_schema.TABLE_CONSTRAINTS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = :tableName AND CONSTRAINT_NAME = :constraintName AND CONSTRAINT_TYPE = 'FOREIGN KEY'`,
    { replacements: { tableName, constraintName } },
  );
  if (Array.isArray(rows) && rows.length > 0) {
    return;
  }
  try {
    await sequelize.query(
      `ALTER TABLE \`${tableName}\` ADD CONSTRAINT \`${constraintName}\` FOREIGN KEY (\`${columnName}\`) REFERENCES \`${refTable}\` (\`${refColumn}\`)`,
    );
  } catch (error) {
    console.warn(`[P0-22] Could not add FK ${constraintName} on ${tableName}.${columnName} → ${refTable}.${refColumn}: ${error.original?.sqlMessage || error.message}. Fix orphaned rows and restart.`);
  }
}

async function runCommerceMigrations() {
  await ensureColumn('member_users', 'entry_source', "entry_source VARCHAR(32) NOT NULL DEFAULT 'system' AFTER stripe_customer_id");
  await ensureColumn('bookings', 'entry_source', "entry_source VARCHAR(32) NOT NULL DEFAULT 'system' AFTER resource_id");
  await ensureColumn('invoices', 'entry_source', "entry_source VARCHAR(32) NOT NULL DEFAULT 'system' AFTER booking_id");
  await ensureColumn('bookings', 'stripe_checkout_session_id', 'stripe_checkout_session_id VARCHAR(255) NULL AFTER stripe_payment_intent_id');
  await ensureColumn('bookings', 'payment_hold_expires_at', 'payment_hold_expires_at DATETIME(6) NULL AFTER stripe_payment_status');

  // P0-10: Track Stripe cleanup failures so they can be retried
  await ensureColumn('bookings', 'stripe_cleanup_failed_at', 'stripe_cleanup_failed_at DATETIME(6) NULL');

  // Refund request workflow: customer requests → admin approves → Stripe refund fires
  await ensureColumn('bookings', 'refund_requested_at', 'refund_requested_at DATETIME(6) NULL');
  await ensureColumn('bookings', 'refund_request_status', "refund_request_status VARCHAR(32) NULL DEFAULT NULL COMMENT 'pending | approved | rejected'");
  await ensureColumn('booking_adjustments', 'stripe_cleanup_failed_at', 'stripe_cleanup_failed_at DATETIME(6) NULL');
  await ensureColumn('membership_adjustments', 'stripe_cleanup_failed_at', 'stripe_cleanup_failed_at DATETIME(6) NULL');

  // P0-22: Add foreign key constraints to prevent orphaned records
  await ensureForeignKey('memberships', 'fk_memberships_user', 'user_id', 'member_users', 'id');
  await ensureForeignKey('memberships', 'fk_memberships_plan', 'plan_id', 'membership_plans', 'id');
  await ensureForeignKey('membership_adjustments', 'fk_membership_adj_membership', 'membership_id', 'memberships', 'id');
  await ensureForeignKey('membership_adjustments', 'fk_membership_adj_user', 'user_id', 'member_users', 'id');
  await ensureForeignKey('membership_adjustments', 'fk_membership_adj_target_plan', 'target_plan_id', 'membership_plans', 'id');
  await ensureForeignKey('bookings', 'fk_bookings_user', 'user_id', 'member_users', 'id');
  await ensureForeignKey('bookings', 'fk_bookings_resource', 'resource_id', 'resources', 'id');
  await ensureForeignKey('booking_adjustments', 'fk_booking_adj_booking', 'booking_id', 'bookings', 'id');
  await ensureForeignKey('booking_adjustments', 'fk_booking_adj_user', 'user_id', 'member_users', 'id');
  await ensureForeignKey('booking_adjustments', 'fk_booking_adj_resource', 'resource_id', 'resources', 'id');
  await ensureForeignKey('invoices', 'fk_invoices_user', 'user_id', 'member_users', 'id');

  // #109: Add indexes on stripe_webhook_events for common filter/scan queries
  await ensureIndex('stripe_webhook_events', 'stripe_webhook_events_event_type_idx', '`event_type`');
  await ensureIndex('stripe_webhook_events', 'stripe_webhook_events_processed_at_idx', '`processed_at`');

  // Add phone and location columns to member_users for editable profiles
  await ensureColumn('member_users', 'phone', "phone VARCHAR(32) NULL AFTER email");
  await ensureColumn('member_users', 'location', "location VARCHAR(255) NULL AFTER phone");

  // Scheduled downgrade: store the target plan so the switch happens at period end
  await ensureColumn('memberships', 'scheduled_plan_id', 'scheduled_plan_id INT UNSIGNED NULL AFTER cancel_at_period_end');
}

async function seedPlans() {
  const now = new Date();

  for (const plan of DEFAULT_PLANS) {
    const [existingRows] = await sequelize.query(
      'SELECT id FROM membership_plans WHERE slug = :slug LIMIT 1',
      { replacements: { slug: plan.slug } },
    );

    if (existingRows.length > 0) {
      await sequelize.query(
        `UPDATE membership_plans
           SET name = :name, description = :description, monthly_price_minor = :monthlyPriceMinor,
               features = :features, active = 1, updated_at = :updatedAt
         WHERE slug = :slug`,
        {
          replacements: {
            slug: plan.slug,
            name: plan.name,
            description: plan.description,
            monthlyPriceMinor: plan.monthlyPriceMinor,
            features: JSON.stringify(plan.features),
            updatedAt: now,
          },
        },
      );
    } else {
      await sequelize.query(
        `INSERT INTO membership_plans
          (document_id, slug, name, description, monthly_price_minor, currency, interval_name, features, active, created_at, updated_at)
         VALUES
          (:documentId, :slug, :name, :description, :monthlyPriceMinor, :currency, 'month', :features, 1, :createdAt, :updatedAt)`,
        {
          replacements: {
            documentId: randomUUID(),
            slug: plan.slug,
            name: plan.name,
            description: plan.description,
            monthlyPriceMinor: plan.monthlyPriceMinor,
            currency: config.commerce.defaultCurrency,
            features: JSON.stringify(plan.features),
            createdAt: now,
            updatedAt: now,
          },
        },
      );
    }
  }
}

async function seedResources() {
  const now = new Date();

  for (const resource of DEFAULT_RESOURCES) {
    // P2-106: Upsert by slug — update if exists, insert if not (idempotent)
    const [existing] = await sequelize.query(
      'SELECT id FROM resources WHERE slug = :slug LIMIT 1',
      { replacements: { slug: resource.slug } },
    );

    if (existing.length > 0) {
      await sequelize.query(
        `UPDATE resources SET
           type = :type, name = :name, description = :description,
           capacity = :capacity, hourly_rate_minor = :hourlyRateMinor,
           metadata = :metadata, updated_at = :updatedAt
         WHERE slug = :slug`,
        {
          replacements: {
            slug: resource.slug,
            type: resource.type,
            name: resource.name,
            description: resource.description,
            capacity: resource.capacity,
            hourlyRateMinor: resource.hourlyRateMinor,
            metadata: JSON.stringify(resource.metadata),
            updatedAt: now,
          },
        },
      );
    } else {
      await sequelize.query(
        `INSERT INTO resources
          (document_id, slug, type, name, description, capacity, hourly_rate_minor, active, metadata, created_at, updated_at)
         VALUES
          (:documentId, :slug, :type, :name, :description, :capacity, :hourlyRateMinor, 1, :metadata, :createdAt, :updatedAt)`,
        {
          replacements: {
            documentId: randomUUID(),
            slug: resource.slug,
            type: resource.type,
            name: resource.name,
            description: resource.description,
            capacity: resource.capacity,
            hourlyRateMinor: resource.hourlyRateMinor,
            metadata: JSON.stringify(resource.metadata),
            createdAt: now,
            updatedAt: now,
          },
        },
      );
    }
  }
}

export async function ensureCommerceSchema() {
  await ensureSchema();
  await runCommerceMigrations();
  await seedPlans();
  await seedResources();
}
