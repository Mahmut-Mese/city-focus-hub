import { randomUUID } from 'node:crypto';
import { sequelize } from './database.js';

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
];

const DEFAULT_PLANS = [
  {
    slug: 'hot-desk',
    name: 'Hot Desk Membership',
    description: 'Flexible access to shared workspace zones with monthly recurring billing.',
    monthlyPriceMinor: 25000,
    features: [
      'Access to hot desking areas',
      'High-speed internet included',
      '10% discount on meeting rooms',
      'Mail handling services',
    ],
  },
  {
    slug: 'dedicated-desk',
    name: 'Dedicated Desk Membership',
    description: 'Reserved desk membership for members who need a consistent setup.',
    monthlyPriceMinor: 35000,
    features: [
      'Reserved desk access',
      'Locker storage',
      '15% discount on meeting rooms',
      'Business mail handling',
    ],
  },
  {
    slug: 'virtual-office',
    name: 'Virtual Office Membership',
    description: 'Business address and mail handling with monthly recurring billing.',
    monthlyPriceMinor: 15000,
    features: [
      'Prestigious business address',
      'Mail forwarding',
      'Member community access',
      'Discounted day passes',
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

async function hasColumn(tableName, columnName) {
  const [rows] = await sequelize.query(
    `SHOW COLUMNS FROM ${tableName} LIKE :columnName`,
    {
      replacements: { columnName },
    },
  );

  return Array.isArray(rows) && rows.length > 0;
}

async function ensureColumn(tableName, columnName, definition) {
  if (await hasColumn(tableName, columnName)) {
    return;
  }

  await sequelize.query(`ALTER TABLE ${tableName} ADD COLUMN ${definition}`);
}

async function runCommerceMigrations() {
  await ensureColumn('member_users', 'entry_source', "entry_source VARCHAR(32) NOT NULL DEFAULT 'system' AFTER stripe_customer_id");
  await ensureColumn('bookings', 'entry_source', "entry_source VARCHAR(32) NOT NULL DEFAULT 'system' AFTER resource_id");
  await ensureColumn('invoices', 'entry_source', "entry_source VARCHAR(32) NOT NULL DEFAULT 'system' AFTER booking_id");
  await ensureColumn('bookings', 'stripe_checkout_session_id', 'stripe_checkout_session_id VARCHAR(255) NULL AFTER stripe_payment_intent_id');
  await ensureColumn('bookings', 'payment_hold_expires_at', 'payment_hold_expires_at DATETIME(6) NULL AFTER stripe_payment_status');
}

async function seedPlans() {
  const [rows] = await sequelize.query('SELECT COUNT(*) AS count FROM membership_plans');
  const count = Number(rows?.[0]?.count || 0);

  if (count > 0) {
    return;
  }

  const now = new Date();

  for (const plan of DEFAULT_PLANS) {
    await sequelize.query(
      `INSERT INTO membership_plans
        (document_id, slug, name, description, monthly_price_minor, currency, interval_name, features, active, created_at, updated_at)
       VALUES
        (:documentId, :slug, :name, :description, :monthlyPriceMinor, 'gbp', 'month', :features, 1, :createdAt, :updatedAt)`,
      {
        replacements: {
          documentId: randomUUID(),
          slug: plan.slug,
          name: plan.name,
          description: plan.description,
          monthlyPriceMinor: plan.monthlyPriceMinor,
          features: JSON.stringify(plan.features),
          createdAt: now,
          updatedAt: now,
        },
      },
    );
  }
}

async function seedResources() {
  const [rows] = await sequelize.query('SELECT COUNT(*) AS count FROM resources');
  const count = Number(rows?.[0]?.count || 0);

  if (count > 0) {
    return;
  }

  const now = new Date();

  for (const resource of DEFAULT_RESOURCES) {
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

export async function ensureCommerceSchema() {
  await ensureSchema();
  await runCommerceMigrations();
  await seedPlans();
  await seedResources();
}
