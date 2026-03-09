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
    booking_type VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'pending',
    start_at DATETIME(6) NOT NULL,
    end_at DATETIME(6) NOT NULL,
    purpose VARCHAR(255) NULL,
    notes LONGTEXT NULL,
    stripe_payment_intent_id VARCHAR(255) NULL,
    stripe_payment_status VARCHAR(64) NULL,
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
  await seedPlans();
  await seedResources();
}
