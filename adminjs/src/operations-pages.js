import { randomUUID } from 'node:crypto';
import { sequelize } from './database.js';
import { createLocalInvoice } from './services/invoices-service.js';
import { calculateVat } from './services/payments-service.js';
import { registerUser, updateUserAccessStatus } from './services/users-service.js';
import { cancelMembership } from './services/memberships-service.js';
import { config } from './config.js';
import { sendContactReplyEmail } from './mailer.js';

const OPERATION_DEFINITIONS = [
  {
    name: 'customers',
    label: 'Customers',
    pluralLabel: 'Customers',
    icon: 'User',
    metaLabel: 'Customers',
    titleField: 'name',
    listColumns: ['name', 'manualTag', 'email', 'accessStatus', 'createdAt'],
    sortableFields: ['name', 'email', 'accessStatus', 'createdAt', 'updatedAt'],
    defaultSortBy: 'createdAt',
    defaultSortOrder: 'desc',
    createLayout: [
      ['name', 'email'],
      ['password', 'accessStatus'],
    ],
    editLayout: [
      ['id'],
      ['name', 'email'],
      ['accessStatus'],
      ['createdAt'],
    ],
    manualEditLayout: [
      ['name', 'email'],
      ['accessStatus'],
    ],
    readOnly: false,
    allowCreate: true,
    allowSave: true,
    allowPublish: false,
    allowDuplicate: false,
    allowDelete: false,
    showVersionTabs: false,
    editableFields: ['accessStatus'],
    createFields: ['name', 'email', 'password', 'accessStatus'],
    manualEditableFields: ['name', 'email', 'accessStatus'],
    infoCardFields: ['manualTag', 'id', 'name', 'membershipSummary', 'email', 'createdAt', 'bookedRoomsSummary'],
    infoCardTitleField: 'name',
    optionalInfoCardFields: ['manualTag'],
    selectFields: {
      accessStatus: [
        { value: 'active', label: 'Active' },
        { value: 'suspended', label: 'Suspended' },
        { value: 'guest', label: 'Guest' },
      ],
    },
    baseQuery: `
      SELECT
        u.id,
        u.document_id AS documentId,
        u.name,
        u.email,
        u.stripe_customer_id AS stripeCustomerId,
        u.entry_source AS entrySource,
        CASE
          WHEN u.entry_source = 'manual' THEN 'Manual'
          ELSE ''
        END AS manualTag,
        u.access_status AS accessStatus,
        COALESCE((
          SELECT CONCAT(
            COALESCE(mp.name, 'Membership'),
            CASE
              WHEN m.status IS NULL OR m.status = '' THEN ''
              ELSE CONCAT('\n', REPLACE(UPPER(LEFT(m.status, 1)), '_', ' '), LOWER(SUBSTRING(REPLACE(m.status, '_', ' '), 2)))
            END
          )
          FROM memberships m
          LEFT JOIN membership_plans mp ON mp.id = m.plan_id
          WHERE m.user_id = u.id
          ORDER BY m.id DESC
          LIMIT 1
        ), 'No membership') AS membershipSummary,
        COALESCE((
          SELECT GROUP_CONCAT(DISTINCT r.name ORDER BY r.name SEPARATOR '\n')
          FROM bookings b
          INNER JOIN resources r ON r.id = b.resource_id
          WHERE b.user_id = u.id
            AND b.status != 'canceled'
            AND r.type = 'meeting_room'
        ), 'No rooms booked') AS bookedRoomsSummary,
        u.created_at AS createdAt,
        u.updated_at AS updatedAt
      FROM member_users u
    `,
    idColumn: 'u.id',
    dateFields: ['createdAt', 'updatedAt'],
  },
  {
    name: 'messages',
    label: 'Messages',
    pluralLabel: 'Messages',
    icon: 'MessageCircle',
    metaLabel: 'Messages',
    titleField: 'name',
    listColumns: ['name', 'email', 'createdAt'],
    sortableFields: ['name', 'email', 'createdAt', 'updatedAt'],
    defaultSortBy: 'createdAt',
    defaultSortOrder: 'desc',
    editLayout: [
      ['id'],
      ['name', 'email'],
      ['phone', 'createdAt'],
      ['message'],
    ],
    readOnly: true,
    allowCreate: false,
    allowDuplicate: false,
    allowDelete: false,
    infoCardFields: ['id', 'name', 'email', 'phone', 'createdAt'],
    infoCardTitleField: 'name',
    infoCardBlockFields: ['message'],
    baseQuery: `
      SELECT
        m.id,
        m.document_id AS documentId,
        m.name,
        m.phone,
        m.email,
        m.message,
        m.source_page AS sourcePage,
        m.created_at AS createdAt,
        m.updated_at AS updatedAt
      FROM contact_submissions m
    `,
    idColumn: 'm.id',
    dateFields: ['createdAt', 'updatedAt'],
  },
  {
    name: 'memberships',
    label: 'Memberships',
    pluralLabel: 'Memberships',
    icon: 'CreditCard',
    metaLabel: 'Memberships',
    titleField: 'customerName',
    infoCardTitleField: 'customerName',
    infoCardFields: [
      'id',
      'customerName',
      'customerEmail',
      'planName',
      'status',
      'cancelAtPeriodEnd',
      'failedPaymentCount',
      'currentPeriodStart',
      'currentPeriodEnd',
      'suspendedAt',
      'createdAt',
    ],
    optionalInfoCardFields: ['suspendedAt'],
    listColumns: ['customerName', 'planName', 'status', 'currentPeriodEnd', 'updatedAt'],
    sortableFields: ['customerName', 'planName', 'status', 'currentPeriodEnd', 'updatedAt', 'createdAt'],
    defaultSortBy: 'updatedAt',
    defaultSortOrder: 'desc',
    createLayout: [
      ['userId', 'planId'],
      ['status', 'cancelAtPeriodEnd'],
      ['currentPeriodStart', 'currentPeriodEnd'],
      ['failedPaymentCount'],
      ['suspendedAt'],
    ],
    editLayout: [
      ['id'],
      ['customerName', 'customerEmail'],
      ['planName', 'status'],
      ['cancelAtPeriodEnd', 'failedPaymentCount'],
      ['currentPeriodStart', 'currentPeriodEnd'],
      ['stripeSubscriptionId', 'stripePriceId'],
      ['suspendedAt'],
      ['createdAt'],
    ],
    manualEditLayout: [
      ['userId', 'planId'],
      ['status', 'cancelAtPeriodEnd'],
      ['currentPeriodStart', 'currentPeriodEnd'],
      ['failedPaymentCount'],
      ['suspendedAt'],
    ],
    readOnly: false,
    allowCreate: true,
    allowSave: true,
    allowPublish: false,
    allowDuplicate: false,
    allowDelete: false,
    showVersionTabs: false,
    createFields: ['userId', 'planId', 'status', 'cancelAtPeriodEnd', 'currentPeriodStart', 'currentPeriodEnd', 'failedPaymentCount', 'suspendedAt'],
    editableFields: ['userId', 'planId', 'status', 'cancelAtPeriodEnd', 'currentPeriodStart', 'currentPeriodEnd', 'failedPaymentCount', 'suspendedAt'],
    manualEditableFields: ['userId', 'planId', 'status', 'cancelAtPeriodEnd', 'currentPeriodStart', 'currentPeriodEnd', 'failedPaymentCount', 'suspendedAt'],
    inputTypes: {
      currentPeriodStart: 'datetime-local',
      currentPeriodEnd: 'datetime-local',
      suspendedAt: 'datetime-local',
    },
    selectFields: {
      status: [
        { value: 'inactive', label: 'Inactive' },
        { value: 'active', label: 'Active' },
        { value: 'trialing', label: 'Trialing' },
        { value: 'past_due', label: 'Past Due' },
        { value: 'canceled', label: 'Canceled' },
        { value: 'unpaid', label: 'Unpaid' },
      ],
    },
    baseQuery: `
      SELECT
        m.id,
        m.document_id AS documentId,
        m.user_id AS userId,
        u.name AS customerName,
        u.email AS customerEmail,
        m.plan_id AS planId,
        mp.name AS planName,
        m.status,
        m.stripe_subscription_id AS stripeSubscriptionId,
        m.stripe_price_id AS stripePriceId,
        m.cancel_at_period_end AS cancelAtPeriodEnd,
        m.current_period_start AS currentPeriodStart,
        m.current_period_end AS currentPeriodEnd,
        m.suspended_at AS suspendedAt,
        m.failed_payment_count AS failedPaymentCount,
        m.created_at AS createdAt,
        m.updated_at AS updatedAt
      FROM memberships m
      LEFT JOIN member_users u ON u.id = m.user_id
      LEFT JOIN membership_plans mp ON mp.id = m.plan_id
    `,
    idColumn: 'm.id',
    dateFields: ['currentPeriodStart', 'currentPeriodEnd', 'suspendedAt', 'createdAt', 'updatedAt'],
  },
  {
    name: 'orders',
    label: 'Orders',
    pluralLabel: 'Orders',
    icon: 'ShoppingCart',
    metaLabel: 'Orders',
    titleField: 'documentId',
    infoCardTitleField: 'resourceName',
    infoCardFields: [
      'manualTag',
      'id',
      'customerName',
      'customerEmail',
      'resourceName',
      'resourceType',
      'status',
      'stripePaymentStatus',
      'startAt',
      'endAt',
      'subtotalMinor',
      'taxMinor',
      'totalMinor',
      'currency',
      'createdAt',
      'refundStatus',
      'refundAmountMinor',
      'refundedAt',
    ],
    infoCardBlockFields: ['purpose', 'notes', 'refundReason'],
    optionalInfoCardFields: ['manualTag', 'refundStatus', 'refundAmountMinor', 'refundedAt'],
    optionalInfoCardBlockFields: ['refundReason'],
    listColumns: ['customerName', 'manualTag', 'resourceName', 'status', 'startAt', 'totalMinor'],
    sortableFields: ['customerName', 'resourceName', 'status', 'startAt', 'totalMinor', 'updatedAt', 'createdAt'],
    defaultSortBy: 'startAt',
    defaultSortOrder: 'desc',
    createLayout: [
      ['userId', 'resourceId'],
      ['status', 'stripePaymentStatus'],
      ['startAt', 'endAt'],
      ['purpose'],
      ['notes'],
    ],
    editLayout: [
      ['id'],
      ['customerName', 'customerEmail'],
      ['resourceName', 'resourceType'],
      ['status', 'stripePaymentStatus'],
      ['startAt', 'endAt'],
      ['subtotalMinor', 'taxMinor'],
      ['totalMinor', 'currency'],
      ['purpose'],
      ['notes'],
      ['createdAt'],
    ],
    manualEditLayout: [
      ['userId', 'resourceId'],
      ['status', 'stripePaymentStatus'],
      ['startAt', 'endAt'],
      ['purpose'],
      ['notes'],
    ],
    readOnly: true,
    allowCreate: true,
    allowSave: true,
    allowDuplicate: false,
    allowDelete: false,
    showVersionTabs: false,
    createFields: ['userId', 'resourceId', 'status', 'stripePaymentStatus', 'startAt', 'endAt', 'purpose', 'notes'],
    manualEditableFields: ['userId', 'resourceId', 'status', 'stripePaymentStatus', 'startAt', 'endAt', 'purpose', 'notes'],
    inputTypes: {
      startAt: 'datetime-local',
      endAt: 'datetime-local',
    },
    selectFields: {
      status: [
        { value: 'confirmed', label: 'Confirmed' },
        { value: 'canceled', label: 'Canceled' },
      ],
      stripePaymentStatus: [
        { value: 'succeeded', label: 'Succeeded' },
        { value: 'pending', label: 'Pending' },
        { value: 'failed', label: 'Failed' },
        { value: 'refunded', label: 'Refunded' },
        { value: 'canceled', label: 'Canceled' },
      ],
    },
    baseQuery: `
      SELECT
        b.id,
        b.document_id AS documentId,
        b.user_id AS userId,
        b.entry_source AS entrySource,
        CASE
          WHEN b.entry_source = 'manual' THEN 'Manual'
          ELSE ''
        END AS manualTag,
        u.name AS customerName,
        u.email AS customerEmail,
        b.membership_id AS membershipId,
        b.resource_id AS resourceId,
        r.name AS resourceName,
        r.type AS resourceType,
        b.booking_type AS bookingType,
        b.status,
        b.start_at AS startAt,
        b.end_at AS endAt,
        b.purpose,
        b.notes,
        b.stripe_payment_intent_id AS stripePaymentIntentId,
        b.stripe_checkout_session_id AS stripeCheckoutSessionId,
        b.stripe_payment_status AS stripePaymentStatus,
        b.payment_hold_expires_at AS paymentHoldExpiresAt,
        b.subtotal_minor AS subtotalMinor,
        b.tax_minor AS taxMinor,
        b.total_minor AS totalMinor,
        b.currency,
        b.created_at AS createdAt,
        b.updated_at AS updatedAt,
        (
          SELECT rf.status
          FROM refunds rf
          WHERE rf.booking_id = b.id
          ORDER BY rf.created_at DESC, rf.id DESC
          LIMIT 1
        ) AS refundStatus,
        (
          SELECT COALESCE(SUM(rf.amount_minor), 0)
          FROM refunds rf
          WHERE rf.booking_id = b.id
        ) AS refundAmountMinor,
        (
          SELECT rf.created_at
          FROM refunds rf
          WHERE rf.booking_id = b.id
          ORDER BY rf.created_at DESC, rf.id DESC
          LIMIT 1
        ) AS refundedAt,
        (
          SELECT rf.reason
          FROM refunds rf
          WHERE rf.booking_id = b.id
          ORDER BY rf.created_at DESC, rf.id DESC
          LIMIT 1
        ) AS refundReason
      FROM bookings b
      LEFT JOIN member_users u ON u.id = b.user_id
      LEFT JOIN resources r ON r.id = b.resource_id
    `,
    idColumn: 'b.id',
    dateFields: ['startAt', 'endAt', 'paymentHoldExpiresAt', 'createdAt', 'updatedAt', 'refundedAt'],
    moneyFields: ['subtotalMinor', 'taxMinor', 'totalMinor', 'refundAmountMinor'],
  },
  {
    name: 'invoices',
    label: 'Invoices',
    pluralLabel: 'Invoices',
    icon: 'FileText',
    metaLabel: 'Invoices',
    titleField: 'invoiceNumber',
    infoCardTitleField: 'invoiceNumber',
    infoCardFields: [
      'manualTag',
      'id',
      'invoiceNumber',
      'status',
      'customerName',
      'customerEmail',
      'userId',
      'subtotalMinor',
      'taxMinor',
      'totalMinor',
      'currency',
      'paidAt',
      'createdAt',
    ],
    infoCardBlockFields: ['description'],
    optionalInfoCardFields: ['manualTag'],
    listColumns: ['invoiceNumber', 'manualTag', 'customerName', 'status', 'totalMinor', 'paidAt'],
    sortableFields: ['invoiceNumber', 'customerName', 'status', 'totalMinor', 'paidAt', 'createdAt', 'updatedAt'],
    defaultSortBy: 'createdAt',
    defaultSortOrder: 'desc',
    createLayout: [
      ['userId', 'bookingId'],
      ['invoiceNumber', 'status'],
      ['subtotalMinor', 'taxMinor'],
      ['totalMinor', 'currency'],
      ['paidAt'],
      ['description'],
    ],
    editLayout: [
      ['id'],
      ['invoiceNumber', 'status'],
      ['customerName', 'customerEmail'],
      ['userId', 'currency'],
      ['subtotalMinor', 'taxMinor'],
      ['totalMinor', 'paidAt'],
      ['description'],
      ['createdAt'],
    ],
    manualEditLayout: [
      ['userId', 'bookingId'],
      ['invoiceNumber', 'status'],
      ['subtotalMinor', 'taxMinor'],
      ['totalMinor', 'currency'],
      ['paidAt'],
      ['description'],
    ],
    readOnly: true,
    allowCreate: true,
    allowSave: true,
    allowDuplicate: false,
    allowDelete: false,
    showVersionTabs: false,
    createFields: [
      'userId',
      'bookingId',
      'invoiceNumber',
      'status',
      'description',
      'currency',
      'subtotalMinor',
      'taxMinor',
      'totalMinor',
      'paidAt',
    ],
    manualEditableFields: [
      'userId',
      'bookingId',
      'invoiceNumber',
      'status',
      'description',
      'currency',
      'subtotalMinor',
      'taxMinor',
      'totalMinor',
      'paidAt',
    ],
    inputTypes: {
      paidAt: 'datetime-local',
    },
    selectFields: {
      status: [
        { value: 'draft', label: 'Draft' },
        { value: 'open', label: 'Open' },
        { value: 'paid', label: 'Paid' },
        { value: 'refunded', label: 'Refunded' },
        { value: 'void', label: 'Void' },
        { value: 'uncollectible', label: 'Uncollectible' },
      ],
      currency: [
        { value: 'gbp', label: 'GBP' },
      ],
    },
    baseQuery: `
      SELECT
        i.id,
        i.document_id AS documentId,
        i.user_id AS userId,
        i.entry_source AS entrySource,
        CASE
          WHEN i.entry_source = 'manual' THEN 'Manual'
          ELSE ''
        END AS manualTag,
        u.name AS customerName,
        u.email AS customerEmail,
        i.membership_id AS membershipId,
        i.booking_id AS bookingId,
        i.stripe_invoice_id AS stripeInvoiceId,
        i.stripe_payment_intent_id AS stripePaymentIntentId,
        i.invoice_number AS invoiceNumber,
        i.status,
        i.description,
        i.currency,
        i.subtotal_minor AS subtotalMinor,
        i.tax_minor AS taxMinor,
        i.total_minor AS totalMinor,
        i.hosted_invoice_url AS hostedInvoiceUrl,
        i.invoice_pdf AS invoicePdf,
        i.paid_at AS paidAt,
        i.created_at AS createdAt,
        i.updated_at AS updatedAt
      FROM invoices i
      LEFT JOIN member_users u ON u.id = i.user_id
    `,
    idColumn: 'i.id',
    dateFields: ['paidAt', 'createdAt', 'updatedAt'],
    moneyFields: ['subtotalMinor', 'taxMinor', 'totalMinor'],
  },
];

const OPERATION_MAP = Object.fromEntries(
  OPERATION_DEFINITIONS.map((definition) => [definition.name, definition]),
);

const EXACT_LABELS = {
  accessStatus: 'Access Status',
  amountMinor: 'Amount',
  manualTag: 'Tag',
  bookingId: 'Order',
  bookingType: 'Booking Type',
  createdAt: 'Created At',
  customerEmail: 'Customer Email',
  customerName: 'Customer',
  documentId: 'Document ID',
  endAt: 'End At',
  hostedInvoiceUrl: 'Hosted Invoice URL',
  invoiceNumber: 'Invoice Number',
  invoicePdf: 'Invoice PDF',
  membershipId: 'Membership ID',
  membershipSummary: 'Membership',
  paidAt: 'Paid At',
  paymentHoldExpiresAt: 'Hold Expires At',
  rawPayload: 'Raw Payload',
  refundAmountMinor: 'Refunded Amount',
  refundedAt: 'Refunded At',
  refundReason: 'Refund Reason',
  refundStatus: 'Refund Status',
  resourceId: 'Resource',
  resourceName: 'Resource',
  resourceType: 'Resource Type',
  sourcePage: 'Source Page',
  startAt: 'Start At',
  stripeChargeId: 'Stripe Charge ID',
  stripeCheckoutSessionId: 'Stripe Checkout Session ID',
  stripeCustomerId: 'Stripe Customer ID',
  stripeInvoiceId: 'Stripe Invoice ID',
  stripePaymentIntentId: 'Stripe Payment Intent ID',
  stripePaymentStatus: 'Payment Status',
  stripeRefundId: 'Stripe Refund ID',
  subtotalMinor: 'Subtotal',
  taxMinor: 'Tax',
  totalMinor: 'Total',
  updatedAt: 'Updated At',
  userId: 'Customer',
  bookedRoomsSummary: 'Bookings',
};

function toLabel(value) {
  if (EXACT_LABELS[value]) {
    return EXACT_LABELS[value];
  }

  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\bid\b/gi, 'ID')
    .replace(/\burl\b/gi, 'URL')
    .replace(/^./, (letter) => letter.toUpperCase());
}

function formatDateTime(value) {
  if (!value) {
    return '';
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date).replace(',', '');
}

function toDateTimeLocalValue(value) {
  if (!value) {
    return '';
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const pad = (part) => String(part).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toUtcMysqlDateTime(value) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid datetime value.');
  }

  return date.toISOString().slice(0, 19).replace('T', ' ');
}

function validateBookingWindow(startAt, endAt) {
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    throw new Error('Start and end time are required.');
  }

  if (endDate.getTime() <= startDate.getTime()) {
    throw new Error('End time must be after the start time.');
  }

  const durationMs = endDate.getTime() - startDate.getTime();
  const maxDurationMs = 24 * 60 * 60 * 1000;

  if (durationMs > maxDurationMs) {
    throw new Error('Orders cannot be longer than 24 hours.');
  }
}

function formatMinorAmount(value, currency) {
  const amount = Number(value ?? 0);
  const safeCurrency = String(currency || 'GBP').toUpperCase();

  try {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: safeCurrency,
    }).format(amount / 100);
  } catch {
    return `${safeCurrency} ${(amount / 100).toFixed(2)}`;
  }
}

async function selectRows(query, replacements = {}) {
  const [rows] = await sequelize.query(query, { replacements });
  return rows;
}

async function selectOne(query, replacements = {}) {
  const rows = await selectRows(query, replacements);
  return rows[0] ?? null;
}

function getAvailableFields(definition) {
  const seen = new Set();
  return [...definition.listColumns, ...definition.editLayout.flat()].filter((field) => {
    if (seen.has(field)) {
      return false;
    }
    seen.add(field);
    return true;
  });
}

function humanizeEnumLabel(value) {
  return String(value || '')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function calculateBookingFinancialsForResource(resource, startAt, endAt) {
  const durationMs = new Date(endAt).getTime() - new Date(startAt).getTime();
  const durationHours = Math.max(1, Math.ceil(durationMs / (60 * 60 * 1000)));
  const subtotalMinor = durationHours * Number(resource.hourly_rate_minor || 0);
  const taxMinor = calculateVat(subtotalMinor);
  const totalMinor = subtotalMinor + taxMinor;

  return {
    subtotalMinor,
    taxMinor,
    totalMinor,
    currency: 'gbp',
  };
}

function normalizeMinorAmount(value, label) {
  const numeric = Number(value ?? 0);

  if (!Number.isFinite(numeric) || numeric < 0) {
    throw new Error(`${label} must be a valid amount.`);
  }

  return Math.round(numeric);
}

function normalizeOptionalNumber(value) {
  if (value === '' || value == null) {
    return null;
  }

  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? Math.round(numeric) : null;
}

function normalizeUrlValue(value) {
  const normalized = String(value ?? '').trim();
  return normalized || null;
}

function generateInvoiceNumber() {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const suffix = randomUUID().slice(0, 6).toUpperCase();
  return `INV-${stamp}-${suffix}`;
}

function buildRecord(definition, row) {
  const record = {};
  const sortValues = {};

  Object.entries(row ?? {}).forEach(([key, value]) => {
    if ((definition.dateFields || []).includes(key)) {
      const date = value instanceof Date ? value : new Date(value);
      sortValues[key] = Number.isNaN(date.getTime()) ? '' : date.toISOString();
      record[key] = formatDateTime(value);
      return;
    }

    if ((definition.moneyFields || []).includes(key)) {
      record[key] = Number(value ?? 0);
      sortValues[key] = Number(value ?? 0);
      return;
    }

    record[key] = value ?? '';
    sortValues[key] = value ?? '';
  });

  return { record, sortValues };
}

function mapListValue(definition, field, value, raw) {
  if ((definition.moneyFields || []).includes(field)) {
    return formatMinorAmount(value, raw.currency);
  }

  if (typeof value === 'string' && value.length > 120) {
    return `${value.slice(0, 117)}...`;
  }

  return value ?? '';
}

function buildDefinitionPayload(definition) {
  return {
    name: definition.name,
    label: definition.label,
    pluralLabel: definition.pluralLabel,
    metaLabel: definition.metaLabel,
    titleField: definition.titleField,
    listColumns: definition.listColumns.map((field) => ({ field, label: toLabel(field) })),
    createLayout: definition.createLayout || definition.editLayout,
    editLayout: definition.editLayout,
    manualEditLayout: definition.manualEditLayout || definition.editLayout,
    readOnly: Boolean(definition.readOnly),
    allowCreate: definition.allowCreate !== false,
    allowSave: definition.allowSave !== false,
    allowPublish: definition.allowPublish !== false,
    allowDuplicate: definition.allowDuplicate !== false,
    allowDelete: definition.allowDelete !== false,
    showVersionTabs: definition.showVersionTabs !== false,
    editableFields: definition.editableFields || [],
    createFields: definition.createFields || [],
    manualEditableFields: definition.manualEditableFields || definition.editableFields || [],
    infoCardFields: definition.infoCardFields || [],
    infoCardTitleField: definition.infoCardTitleField || definition.titleField,
    infoCardBlockFields: definition.infoCardBlockFields || [],
    optionalInfoCardFields: definition.optionalInfoCardFields || [],
    optionalInfoCardBlockFields: definition.optionalInfoCardBlockFields || [],
    moneyFields: definition.moneyFields || [],
    inputTypes: definition.inputTypes || {},
    selectFields: definition.selectFields || {},
  };
}

async function buildDefinitionPayloadWithOptions(definition) {
  const payload = buildDefinitionPayload(definition);
  const selectFields = {
    ...payload.selectFields,
  };

  if (definition.name === 'orders' || definition.name === 'invoices') {
    const users = await selectRows(
      `SELECT id, name, email
         FROM member_users
        ORDER BY name ASC, email ASC, id ASC`,
    );

    selectFields.userId = [
      { value: '', label: 'Select a customer' },
      ...users.map((user) => ({
        value: String(user.id),
        label: `${user.name || 'Customer'} (${user.email || 'no-email'})`,
      })),
    ];
  }

  if (definition.name === 'memberships') {
    const [users, plans] = await Promise.all([
      selectRows(
        `SELECT id, name, email
           FROM member_users
          ORDER BY name ASC, email ASC, id ASC`,
      ),
      selectRows(
        `SELECT id, name, active
           FROM membership_plans
          ORDER BY active DESC, sort_order ASC, name ASC, id ASC`,
      ),
    ]);

    selectFields.userId = [
      { value: '', label: 'Select a customer' },
      ...users.map((user) => ({
        value: String(user.id),
        label: `${user.name || 'Customer'} (${user.email || 'no-email'})`,
      })),
    ];

    selectFields.planId = [
      { value: '', label: 'Select a plan' },
      ...plans.map((plan) => ({
        value: String(plan.id),
        label: `${plan.name || 'Plan'}${Number(plan.active) ? '' : ' (inactive)'}`,
      })),
    ];
  }

  if (definition.name === 'orders') {
    const resources = await selectRows(
      `SELECT id, name, type
         FROM resources
        ORDER BY name ASC, id ASC`,
    );

    selectFields.resourceId = [
      { value: '', label: 'Select a resource' },
      ...resources.map((resource) => ({
        value: String(resource.id),
        label: `${resource.name} · ${humanizeEnumLabel(resource.type)}`,
      })),
    ];
  }

  if (definition.name === 'invoices') {
    const bookings = await selectRows(
      `SELECT
          b.id,
          b.start_at AS startAt,
          u.name AS customerName,
          r.name AS resourceName
        FROM bookings b
        LEFT JOIN member_users u ON u.id = b.user_id
        LEFT JOIN resources r ON r.id = b.resource_id
        ORDER BY b.created_at DESC, b.id DESC`,
    );

    selectFields.bookingId = [
      { value: '', label: 'No linked order' },
      ...bookings.map((booking) => ({
        value: String(booking.id),
        label: `#${booking.id} · ${booking.customerName || 'Customer'} · ${booking.resourceName || 'Order'} · ${formatDateTime(booking.startAt)}`,
      })),
    ];
  }

  return {
    ...payload,
    selectFields,
  };
}

async function buildEmptyOperationsRecord(definition) {
  if (definition.name === 'customers') {
    return {
      name: '',
      email: '',
      password: '',
      accessStatus: 'active',
    };
  }

  if (definition.name === 'orders') {
    return {
      userId: '',
      resourceId: '',
      status: 'confirmed',
      stripePaymentStatus: 'succeeded',
      startAt: '',
      endAt: '',
      purpose: '',
      notes: '',
    };
  }

  if (definition.name === 'invoices') {
    return {
      userId: '',
      bookingId: '',
      invoiceNumber: generateInvoiceNumber(),
      status: 'paid',
      description: '',
      currency: 'gbp',
      subtotalMinor: 0,
      taxMinor: 0,
      totalMinor: 0,
      paidAt: '',
    };
  }

  if (definition.name === 'memberships') {
    return {
      userId: '',
      planId: '',
      status: 'inactive',
      cancelAtPeriodEnd: false,
      currentPeriodStart: '',
      currentPeriodEnd: '',
      failedPaymentCount: 0,
      suspendedAt: '',
    };
  }

  return {};
}

async function ensureBookingTimeRangeAvailable(resourceId, startAt, endAt, excludeBookingId = null) {
  const conflict = await selectOne(
    `SELECT id
       FROM bookings
      WHERE resource_id = :resourceId
        AND (:excludeBookingId IS NULL OR id != :excludeBookingId)
        AND (
          status = 'confirmed'
          OR (
            status = 'pending'
            AND (payment_hold_expires_at IS NULL OR payment_hold_expires_at > :now)
          )
        )
        AND start_at < :endAt
        AND end_at > :startAt
      LIMIT 1`,
    {
      resourceId,
      excludeBookingId,
      now: new Date(),
      startAt: toUtcMysqlDateTime(startAt),
      endAt: toUtcMysqlDateTime(endAt),
    },
  );

  if (conflict) {
    throw new Error('The selected resource is already booked for that time range.');
  }
}

async function loadOperationsList(definition, query = {}) {
  const rows = await selectRows(
    `${definition.baseQuery} ORDER BY ${definition.idColumn} DESC`,
  );

  const availableFields = getAvailableFields(definition);
  const searchText = String(query.search ?? '').trim().toLowerCase();
  const requestedDisplayedFields = String(query.displayedFields ?? '')
    .split(',')
    .map((field) => field.trim())
    .filter(Boolean);
  const displayedFields = requestedDisplayedFields.length
    ? requestedDisplayedFields.filter((field) => availableFields.includes(field))
    : definition.listColumns;
  const sortBy = definition.sortableFields.includes(query.sortBy)
    ? query.sortBy
    : definition.defaultSortBy;
  const sortOrder = String(query.sortOrder ?? definition.defaultSortOrder).toLowerCase() === 'asc'
    ? 'asc'
    : 'desc';

  const records = rows
    .map((row) => {
      const { record, sortValues } = buildRecord(definition, row);
      const searchBlob = Object.values(record)
        .map((value) => String(value ?? ''))
        .join(' ')
        .toLowerCase();

      return {
        id: record.id,
        documentId: record.documentId || record.id,
        title: record[definition.titleField] || definition.label,
        raw: record,
        sortValues,
        searchBlob,
        columns: Object.fromEntries(
          availableFields.map((field) => [field, mapListValue(definition, field, record[field], record)]),
        ),
      };
    })
    .filter((item) => !searchText || item.searchBlob.includes(searchText))
    .sort((left, right) => {
      const leftValue = left.sortValues[sortBy];
      const rightValue = right.sortValues[sortBy];

      if (typeof leftValue === 'number' || typeof rightValue === 'number') {
        const numericLeft = Number(leftValue ?? 0);
        const numericRight = Number(rightValue ?? 0);
        return sortOrder === 'asc' ? numericLeft - numericRight : numericRight - numericLeft;
      }

      const stringLeft = String(leftValue ?? '');
      const stringRight = String(rightValue ?? '');

      return sortOrder === 'asc'
        ? stringLeft.localeCompare(stringRight)
        : stringRight.localeCompare(stringLeft);
    });

  return {
    records,
    controls: {
      displayedFields,
      availableFields: availableFields.map((field) => ({ field, label: toLabel(field) })),
      filters: [],
      activeFilters: {},
      sortBy,
      sortOrder,
    },
  };
}

async function loadOperationsRecord(definition, recordId) {
  const row = await selectOne(
    `${definition.baseQuery} WHERE ${definition.idColumn} = :id LIMIT 1`,
    { id: recordId },
  );

  if (!row) {
    return null;
  }

  const { record } = buildRecord(definition, row);

  if (definition.name === 'messages') {
    const replies = await selectRows(
      `SELECT id, admin_email AS adminEmail, recipient_email AS recipientEmail, subject, body, created_at AS createdAt
         FROM contact_submission_replies
        WHERE contact_submission_id = :submissionId
        ORDER BY created_at DESC, id DESC`,
      { submissionId: recordId },
    );

    record.replies = replies.map((reply) => ({
      id: Number(reply.id),
      adminEmail: reply.adminEmail || '',
      recipientEmail: reply.recipientEmail || '',
      subject: reply.subject || '',
      body: reply.body || '',
      createdAt: formatDateTime(reply.createdAt),
    }));
  }

  return {
    draftRecord: record,
    publishedRecord: null,
  };
}

export function getOperationsPageDefinitions() {
  return OPERATION_DEFINITIONS;
}

export async function handleOperationsPage(pageName, request) {
  const definition = OPERATION_MAP[pageName];

  if (!definition) {
    throw new Error(`Unknown operations page: ${pageName}`);
  }

  const recordId = Number(
    request.query?.recordId
      ?? request.params?.recordId
      ?? request.payload?.recordId
      ?? request.searchParams?.recordId
      ?? 0,
  ) || null;
  const method = String(request.method ?? 'get').toLowerCase();
  const intent = String(request.payload?.intent ?? '').trim();
  const isNewRequest = String(
    request.query?.new
      ?? request.payload?.new
      ?? request.searchParams?.new
      ?? '',
  ).trim() === '1';

  if (method === 'post' && pageName === 'messages' && intent === 'sendReply') {
    if (!recordId) {
      throw new Error('Message record not found.');
    }

    const submission = await selectOne(
      `${definition.baseQuery} WHERE ${definition.idColumn} = :id LIMIT 1`,
      { id: recordId },
    );

    if (!submission) {
      throw new Error('Message entry not found.');
    }

    const subject = String(request.payload?.reply?.subject ?? '').trim();
    const body = String(request.payload?.reply?.body ?? '').trim();

    if (!subject) {
      throw new Error('Reply subject is required.');
    }

    if (!body) {
      throw new Error('Reply message is required.');
    }

    if (subject.length > 255) {
      throw new Error('Reply subject is too long.');
    }

    if (body.length > 10000) {
      throw new Error('Reply message is too long.');
    }

    const delivery = await sendContactReplyEmail({
      recipientName: submission.name,
      recipientEmail: submission.email,
      subject,
      body,
    });

    if (!delivery.ok) {
      throw new Error(delivery.reason || 'Reply email could not be sent.');
    }

    const now = new Date();

    await sequelize.query(
      `INSERT INTO contact_submission_replies
        (contact_submission_id, admin_email, recipient_email, subject, body, created_at, updated_at)
       VALUES
        (:submissionId, :adminEmail, :recipientEmail, :subject, :body, :createdAt, :updatedAt)`,
      {
        replacements: {
          submissionId: recordId,
          adminEmail: config.auth.email,
          recipientEmail: submission.email,
          subject,
          body,
          createdAt: now,
          updatedAt: now,
        },
      },
    );

    const result = await loadOperationsRecord(definition, recordId);

    return {
      definition: await buildDefinitionPayloadWithOptions(definition),
      ...result,
      notice: {
        message: 'Reply sent to customer.',
        type: 'success',
      },
    };
  }

  if (method === 'post' && pageName === 'customers' && intent === 'save') {
    if (!recordId) {
      const name = String(request.payload?.record?.name ?? '').trim();
      const email = String(request.payload?.record?.email ?? '').trim();
      const password = String(request.payload?.record?.password ?? '');
      const accessStatus = String(request.payload?.record?.accessStatus ?? 'active').trim().toLowerCase();
      const allowedStatuses = new Set(['active', 'suspended', 'guest']);

      if (!allowedStatuses.has(accessStatus)) {
        throw new Error('Access status is invalid.');
      }

      const createdUser = await registerUser({ name, email, password, entrySource: 'manual' });

      if (!createdUser?.id) {
        throw new Error('Customer could not be created.');
      }

      if (accessStatus !== 'active') {
        await updateUserAccessStatus(createdUser.id, accessStatus);
      }

      const result = await loadOperationsRecord(definition, createdUser.id);

      return {
        definition: await buildDefinitionPayloadWithOptions(definition),
        ...result,
        notice: {
          message: 'Customer created.',
          type: 'success',
        },
      };
    }

    const existingCustomer = await selectOne(
      `SELECT id, entry_source AS entrySource
         FROM member_users
        WHERE id = :recordId
        LIMIT 1`,
      { recordId },
    );

    if (!existingCustomer) {
      throw new Error('Customer record not found.');
    }

    const accessStatus = String(request.payload?.record?.accessStatus ?? '').trim().toLowerCase();
    const allowedStatuses = new Set(['active', 'suspended', 'guest']);

    if (!allowedStatuses.has(accessStatus)) {
      throw new Error('Access status is invalid.');
    }

    if (existingCustomer.entrySource === 'manual') {
      const name = String(request.payload?.record?.name ?? '').trim();
      const email = String(request.payload?.record?.email ?? '').trim().toLowerCase();

      if (!name) {
        throw new Error('Name is required.');
      }

      if (!email) {
        throw new Error('Email is required.');
      }

      const duplicateUser = await selectOne(
        `SELECT id
           FROM member_users
          WHERE email = :email
            AND id != :recordId
          LIMIT 1`,
        { email, recordId },
      );

      if (duplicateUser) {
        throw new Error('An account with this email already exists.');
      }

      await sequelize.query(
        `UPDATE member_users
            SET name = :name,
                email = :email,
                updated_at = :updatedAt
          WHERE id = :recordId`,
        {
          replacements: {
            recordId,
            name,
            email,
            updatedAt: new Date(),
          },
        },
      );
    }

    await updateUserAccessStatus(recordId, accessStatus);

    const result = await loadOperationsRecord(definition, recordId);

    return {
      definition: await buildDefinitionPayloadWithOptions(definition),
      ...result,
      notice: {
        message: 'Customer access status updated.',
        type: 'success',
      },
    };
  }

  if (method === 'post' && pageName === 'memberships' && intent === 'save') {
    const userId = Number(request.payload?.record?.userId ?? 0);
    const planId = Number(request.payload?.record?.planId ?? 0);
    const status = String(request.payload?.record?.status ?? 'inactive').trim().toLowerCase();
    const cancelAtPeriodEnd = Boolean(request.payload?.record?.cancelAtPeriodEnd);
    const currentPeriodStartInput = String(request.payload?.record?.currentPeriodStart ?? '').trim();
    const currentPeriodEndInput = String(request.payload?.record?.currentPeriodEnd ?? '').trim();
    const suspendedAtInput = String(request.payload?.record?.suspendedAt ?? '').trim();
    const failedPaymentCount = Math.max(0, Math.round(Number(request.payload?.record?.failedPaymentCount ?? 0) || 0));
    const allowedStatuses = new Set(['inactive', 'active', 'trialing', 'past_due', 'canceled', 'unpaid']);

    if (!Number.isFinite(userId) || userId <= 0) {
      throw new Error('Customer is required.');
    }

    if (!Number.isFinite(planId) || planId <= 0) {
      throw new Error('Plan is required.');
    }

    if (!allowedStatuses.has(status)) {
      throw new Error('Membership status is invalid.');
    }

    const currentPeriodStart = currentPeriodStartInput ? new Date(currentPeriodStartInput) : null;
    const currentPeriodEnd = currentPeriodEndInput ? new Date(currentPeriodEndInput) : null;
    const suspendedAt = suspendedAtInput ? new Date(suspendedAtInput) : null;

    if (currentPeriodStartInput && Number.isNaN(currentPeriodStart?.getTime())) {
      throw new Error('Current period start is invalid.');
    }

    if (currentPeriodEndInput && Number.isNaN(currentPeriodEnd?.getTime())) {
      throw new Error('Current period end is invalid.');
    }

    if (suspendedAtInput && Number.isNaN(suspendedAt?.getTime())) {
      throw new Error('Suspended at is invalid.');
    }

    if (currentPeriodStart && currentPeriodEnd && currentPeriodEnd.getTime() < currentPeriodStart.getTime()) {
      throw new Error('Current period end must be after the start date.');
    }

    const [user, plan] = await Promise.all([
      selectOne(
        `SELECT id
           FROM member_users
          WHERE id = :userId
          LIMIT 1`,
        { userId },
      ),
      selectOne(
        `SELECT id
           FROM membership_plans
          WHERE id = :planId
          LIMIT 1`,
        { planId },
      ),
    ]);

    if (!user) {
      throw new Error('Customer not found.');
    }

    if (!plan) {
      throw new Error('Plan not found.');
    }

    if (recordId) {
      const existingMembership = await selectOne(
        `SELECT id
           FROM memberships
          WHERE id = :recordId
          LIMIT 1`,
        { recordId },
      );

      if (!existingMembership) {
        throw new Error('Membership not found.');
      }

      await sequelize.query(
        `UPDATE memberships
            SET user_id = :userId,
                plan_id = :planId,
                status = :status,
                cancel_at_period_end = :cancelAtPeriodEnd,
                current_period_start = :currentPeriodStart,
                current_period_end = :currentPeriodEnd,
                suspended_at = :suspendedAt,
                failed_payment_count = :failedPaymentCount,
                updated_at = :updatedAt
          WHERE id = :recordId`,
        {
          replacements: {
            recordId,
            userId,
            planId,
            status,
            cancelAtPeriodEnd: cancelAtPeriodEnd ? 1 : 0,
            currentPeriodStart,
            currentPeriodEnd,
            suspendedAt,
            failedPaymentCount,
            updatedAt: new Date(),
          },
        },
      );

      const result = await loadOperationsRecord(definition, recordId);

      return {
        definition: await buildDefinitionPayloadWithOptions(definition),
        ...result,
        notice: {
          message: 'Membership updated.',
          type: 'success',
        },
      };
    }

    const documentId = randomUUID();
    const now = new Date();
    await sequelize.query(
      `INSERT INTO memberships
        (document_id, user_id, plan_id, status, stripe_subscription_id, stripe_price_id, cancel_at_period_end, current_period_start, current_period_end, suspended_at, failed_payment_count, created_at, updated_at)
       VALUES
        (:documentId, :userId, :planId, :status, NULL, NULL, :cancelAtPeriodEnd, :currentPeriodStart, :currentPeriodEnd, :suspendedAt, :failedPaymentCount, :createdAt, :updatedAt)`,
      {
        replacements: {
          documentId,
          userId,
          planId,
          status,
          cancelAtPeriodEnd: cancelAtPeriodEnd ? 1 : 0,
          currentPeriodStart,
          currentPeriodEnd,
          suspendedAt,
          failedPaymentCount,
          createdAt: now,
          updatedAt: now,
        },
      },
    );

    const createdMembership = await selectOne(
      `SELECT id
         FROM memberships
        WHERE document_id = :documentId
        LIMIT 1`,
      { documentId },
    );
    const createdMembershipId = Number(createdMembership?.id || 0);

    if (!createdMembershipId) {
      throw new Error('Membership was created but could not be reloaded.');
    }

    const result = await loadOperationsRecord(definition, createdMembershipId);

    return {
      definition: await buildDefinitionPayloadWithOptions(definition),
      ...result,
      notice: {
        message: 'Membership created.',
        type: 'success',
      },
    };
  }

  if (method === 'post' && pageName === 'orders' && intent === 'save') {
    const userId = Number(request.payload?.record?.userId ?? 0);
    const resourceId = Number(request.payload?.record?.resourceId ?? 0);
    const status = String(request.payload?.record?.status ?? 'confirmed').trim().toLowerCase();
    const stripePaymentStatus = String(request.payload?.record?.stripePaymentStatus ?? 'succeeded').trim().toLowerCase();
    const startAt = String(request.payload?.record?.startAt ?? '').trim();
    const endAt = String(request.payload?.record?.endAt ?? '').trim();
    const purpose = String(request.payload?.record?.purpose ?? '').trim();
    const notes = String(request.payload?.record?.notes ?? '').trim();
    const allowedStatuses = new Set(['confirmed', 'canceled']);
    const allowedPaymentStatuses = new Set(['succeeded', 'pending', 'failed', 'refunded', 'canceled']);

    if (!Number.isFinite(userId) || userId <= 0) {
      throw new Error('Customer is required.');
    }

    if (!Number.isFinite(resourceId) || resourceId <= 0) {
      throw new Error('Resource is required.');
    }

    if (!allowedStatuses.has(status)) {
      throw new Error('Order status is invalid.');
    }

    if (!allowedPaymentStatuses.has(stripePaymentStatus)) {
      throw new Error('Payment status is invalid.');
    }

    if (status === 'confirmed' && new Set(['refunded', 'canceled']).has(stripePaymentStatus)) {
      throw new Error('Confirmed orders cannot use refunded or canceled payment statuses.');
    }

    if (status === 'canceled' && new Set(['succeeded', 'pending']).has(stripePaymentStatus)) {
      throw new Error('Canceled orders must use canceled, refunded, or failed payment statuses.');
    }

    validateBookingWindow(startAt, endAt);

    const user = await selectOne(
      `SELECT id
         FROM member_users
        WHERE id = :userId
        LIMIT 1`,
      { userId },
    );

    if (!user) {
      throw new Error('Customer not found.');
    }

    const resource = await selectOne(
      `SELECT id, type, hourly_rate_minor
         FROM resources
        WHERE id = :resourceId
        LIMIT 1`,
      { resourceId },
    );

    if (!resource) {
      throw new Error('Resource not found.');
    }

    if (status === 'confirmed') {
      await ensureBookingTimeRangeAvailable(resourceId, startAt, endAt, recordId);
    }

    const financials = calculateBookingFinancialsForResource(resource, startAt, endAt);
    if (recordId) {
      const existingOrder = await selectOne(
        `SELECT id, entry_source AS entrySource
           FROM bookings
          WHERE id = :recordId
          LIMIT 1`,
        { recordId },
      );

      if (!existingOrder) {
        throw new Error('Order not found.');
      }

      if (existingOrder.entrySource !== 'manual') {
        throw new Error('Only manual orders can be edited.');
      }

      await sequelize.query(
        `UPDATE bookings
            SET user_id = :userId,
                resource_id = :resourceId,
                booking_type = :bookingType,
                status = :status,
                start_at = :startAt,
                end_at = :endAt,
                purpose = :purpose,
                notes = :notes,
                stripe_payment_status = :stripePaymentStatus,
                subtotal_minor = :subtotalMinor,
                tax_minor = :taxMinor,
                total_minor = :totalMinor,
                currency = :currency,
                payment_hold_expires_at = NULL,
                updated_at = :updatedAt
          WHERE id = :recordId`,
        {
          replacements: {
            recordId,
            userId,
            resourceId,
            bookingType: String(resource.type || 'meeting_room'),
            status,
            startAt: toUtcMysqlDateTime(startAt),
            endAt: toUtcMysqlDateTime(endAt),
            purpose,
            notes,
            stripePaymentStatus,
            subtotalMinor: financials.subtotalMinor,
            taxMinor: financials.taxMinor,
            totalMinor: financials.totalMinor,
            currency: financials.currency,
            updatedAt: new Date(),
          },
        },
      );

      const result = await loadOperationsRecord(definition, recordId);

      return {
        definition: await buildDefinitionPayloadWithOptions(definition),
        ...result,
        notice: {
          message: 'Order updated.',
          type: 'success',
        },
      };
    }

    const documentId = randomUUID();
    const now = new Date();
    await sequelize.query(
      `INSERT INTO bookings
        (document_id, user_id, membership_id, resource_id, entry_source, booking_type, status, start_at, end_at, purpose, notes, subtotal_minor, tax_minor, total_minor, currency, payment_hold_expires_at, stripe_payment_status, created_at, updated_at)
       VALUES
        (:documentId, :userId, NULL, :resourceId, 'manual', :bookingType, :status, :startAt, :endAt, :purpose, :notes, :subtotalMinor, :taxMinor, :totalMinor, :currency, NULL, :stripePaymentStatus, :createdAt, :updatedAt)`,
      {
        replacements: {
          documentId,
          userId,
          resourceId,
          bookingType: String(resource.type || 'meeting_room'),
          status,
          startAt: toUtcMysqlDateTime(startAt),
          endAt: toUtcMysqlDateTime(endAt),
          purpose,
          notes,
          subtotalMinor: financials.subtotalMinor,
          taxMinor: financials.taxMinor,
          totalMinor: financials.totalMinor,
          currency: financials.currency,
          stripePaymentStatus,
          createdAt: now,
          updatedAt: now,
        },
      },
    );

    const createdOrder = await selectOne(
      `SELECT id
         FROM bookings
        WHERE document_id = :documentId
        LIMIT 1`,
      { documentId },
    );
    const createdOrderId = Number(createdOrder?.id || 0);

    if (!createdOrderId) {
      throw new Error('Order was created but could not be reloaded.');
    }

    const result = await loadOperationsRecord(definition, createdOrderId);

    return {
      definition: await buildDefinitionPayloadWithOptions(definition),
      ...result,
      notice: {
        message: 'Order created.',
        type: 'success',
      },
    };
  }

  if (method === 'post' && pageName === 'invoices' && intent === 'save') {
    const userId = Number(request.payload?.record?.userId ?? 0);
    const bookingId = normalizeOptionalNumber(request.payload?.record?.bookingId);
    const invoiceNumber = String(request.payload?.record?.invoiceNumber ?? '').trim();
    const status = String(request.payload?.record?.status ?? 'paid').trim().toLowerCase();
    const description = String(request.payload?.record?.description ?? '').trim();
    const currency = String(request.payload?.record?.currency ?? 'gbp').trim().toLowerCase() || 'gbp';
    const subtotalMinor = normalizeMinorAmount(request.payload?.record?.subtotalMinor, 'Subtotal');
    const taxMinor = normalizeMinorAmount(request.payload?.record?.taxMinor, 'Tax');
    const totalMinor = normalizeMinorAmount(request.payload?.record?.totalMinor, 'Total');
    const hostedInvoiceUrl = normalizeUrlValue(request.payload?.record?.hostedInvoiceUrl);
    const invoicePdf = normalizeUrlValue(request.payload?.record?.invoicePdf);
    const paidAtInput = String(request.payload?.record?.paidAt ?? '').trim();
    const allowedStatuses = new Set(['draft', 'open', 'paid', 'refunded', 'void', 'uncollectible']);

    if (!Number.isFinite(userId) || userId <= 0) {
      throw new Error('Customer is required.');
    }

    if (!invoiceNumber) {
      throw new Error('Invoice number is required.');
    }

    if (!allowedStatuses.has(status)) {
      throw new Error('Invoice status is invalid.');
    }

    const user = await selectOne(
      `SELECT id
         FROM member_users
        WHERE id = :userId
        LIMIT 1`,
      { userId },
    );

    if (!user) {
      throw new Error('Customer not found.');
    }

    if (bookingId) {
      const booking = await selectOne(
        `SELECT id, user_id AS userId
           FROM bookings
          WHERE id = :bookingId
          LIMIT 1`,
        { bookingId },
      );

      if (!booking) {
        throw new Error('Linked order not found.');
      }

      if (Number(booking.userId) !== userId) {
        throw new Error('Linked order belongs to a different customer.');
      }
    }

    const paidAt = status === 'paid'
      ? (paidAtInput ? new Date(paidAtInput) : new Date())
      : null;

    if (paidAtInput && status === 'paid' && Number.isNaN(paidAt.getTime())) {
      throw new Error('Paid at is invalid.');
    }

    if (recordId) {
      const existingInvoice = await selectOne(
        `SELECT id, entry_source AS entrySource
           FROM invoices
          WHERE id = :recordId
          LIMIT 1`,
        { recordId },
      );

      if (!existingInvoice) {
        throw new Error('Invoice not found.');
      }

      if (existingInvoice.entrySource !== 'manual') {
        throw new Error('Only manual invoices can be edited.');
      }

      await sequelize.query(
        `UPDATE invoices
            SET user_id = :userId,
                booking_id = :bookingId,
                invoice_number = :invoiceNumber,
                status = :status,
                description = :description,
                currency = :currency,
                subtotal_minor = :subtotalMinor,
                tax_minor = :taxMinor,
                total_minor = :totalMinor,
                paid_at = :paidAt,
                updated_at = :updatedAt
          WHERE id = :recordId`,
        {
          replacements: {
            recordId,
            userId,
            bookingId,
            invoiceNumber,
            status,
            description,
            currency,
            subtotalMinor,
            taxMinor,
            totalMinor,
            paidAt,
            updatedAt: new Date(),
          },
        },
      );

      const result = await loadOperationsRecord(definition, recordId);

      return {
        definition: await buildDefinitionPayloadWithOptions(definition),
        ...result,
        notice: {
          message: 'Invoice updated.',
          type: 'success',
        },
      };
    }

    const createdInvoiceId = await createLocalInvoice({
      userId,
      bookingId,
      entrySource: 'manual',
      invoiceNumber,
      status,
      description,
      currency,
      subtotalMinor,
      taxMinor,
      totalMinor,
      hostedInvoiceUrl,
      invoicePdf,
      paidAt,
    });

    if (!createdInvoiceId) {
      throw new Error('Invoice was created but could not be reloaded.');
    }

    const result = await loadOperationsRecord(definition, createdInvoiceId);

    return {
      definition: await buildDefinitionPayloadWithOptions(definition),
      ...result,
      notice: {
        message: 'Invoice created.',
        type: 'success',
      },
    };
  }

  if (method === 'post' && pageName === 'memberships' && intent === 'cancelMembership') {
    if (!recordId) {
      throw new Error('Membership record not found.');
    }

    const membershipRow = await selectOne(
      `SELECT id, user_id AS userId, status
         FROM memberships
        WHERE id = :recordId
        LIMIT 1`,
      { recordId },
    );

    if (!membershipRow) {
      throw new Error('Membership not found.');
    }

    const cancelableStatuses = new Set(['active', 'trialing', 'past_due', 'unpaid']);
    if (!cancelableStatuses.has(String(membershipRow.status || ''))) {
      throw new Error(`Membership cannot be cancelled — current status is "${membershipRow.status}".`);
    }

    await cancelMembership({ userId: Number(membershipRow.userId) });

    const result = await loadOperationsRecord(definition, recordId);

    return {
      definition: await buildDefinitionPayloadWithOptions(definition),
      ...result,
      notice: {
        message: 'Membership cancelled successfully.',
        type: 'success',
      },
    };
  }

  if (method === 'get' && isNewRequest) {
    return {
      definition: await buildDefinitionPayloadWithOptions(definition),
      draftRecord: await buildEmptyOperationsRecord(definition),
      publishedRecord: null,
    };
  }

  if (recordId) {
    const result = await loadOperationsRecord(definition, recordId);

    if (!result?.draftRecord) {
      throw new Error(`${definition.label} entry not found.`);
    }

    return {
      definition: await buildDefinitionPayloadWithOptions(definition),
      ...result,
    };
  }

  const listResult = await loadOperationsList(definition, request.query ?? {});

  return {
    definition: await buildDefinitionPayloadWithOptions(definition),
    records: listResult.records,
    controls: listResult.controls,
  };
}
