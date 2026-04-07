import { randomUUID } from 'node:crypto';
import { config } from '../config.js';
import { calculateVat, chargeBooking, extractInvoicePaymentIntentId } from './payments-service.js';
import { createLocalInvoice, upsertStripeInvoice } from './invoices-service.js';
import { execute, queryAll, queryOne } from './sql.js';
import { getResourceById, listResources } from './resources-service.js';
import { getUserMembership } from './memberships-service.js';
import { refundBookingAmount } from './refunds-service.js';
import {
  cancelStripePaymentIntent,
  createBookingAdjustmentCheckoutSession,
  createBookingAdjustmentPaymentIntentDraft,
  createBookingCheckoutSession,
  createBookingPaymentIntentDraft,
  ensureStripeCustomer,
  expireStripeCheckoutSession,
  isStripeEnabled,
  retrieveStripeCheckoutSession,
  retrieveStripePaymentIntent,
} from './stripe-service.js';
import { createOrGetGuestUser, findUserByEmail, findUserById } from './users-service.js';
import { sequelize } from '../database.js';

const BOOKING_SELECT_QUERY = `SELECT bookings.*, resources.name AS resource_name, resources.type AS resource_type, resources.capacity AS resource_capacity, resources.metadata AS resource_metadata
       FROM bookings
       INNER JOIN resources ON resources.id = bookings.resource_id`;
const BOOKING_ADJUSTMENT_SELECT_QUERY = `SELECT booking_adjustments.*, resources.name AS resource_name, resources.type AS resource_type, resources.capacity AS resource_capacity, resources.metadata AS resource_metadata
       FROM booking_adjustments
       INNER JOIN resources ON resources.id = booking_adjustments.resource_id`;

function getBookingHoldExpiryDate(baseDate = new Date()) {
  const expiresAt = new Date(baseDate);
  const holdMinutes = Math.max(5, Number(config.bookings.paymentHoldMinutes || 20));
  expiresAt.setMinutes(expiresAt.getMinutes() + holdMinutes);
  return expiresAt;
}

function toUtcMysqlDateTime(value) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid datetime value.');
  }

  return date.toISOString().slice(0, 19).replace('T', ' ');
}

function isBookingHoldExpired(bookingRow, now = Date.now()) {
  const expiresAt = bookingRow?.payment_hold_expires_at
    ? new Date(bookingRow.payment_hold_expires_at).getTime()
    : null;

  if (!expiresAt || Number.isNaN(expiresAt)) {
    return false;
  }

  return expiresAt <= now;
}

function isAdjustmentHoldExpired(adjustmentRow, now = Date.now()) {
  const expiresAt = adjustmentRow?.payment_hold_expires_at
    ? new Date(adjustmentRow.payment_hold_expires_at).getTime()
    : null;

  if (!expiresAt || Number.isNaN(expiresAt)) {
    return false;
  }

  return expiresAt <= now;
}

function toBooking(row) {
  const metadata = row.resource_metadata && typeof row.resource_metadata === 'string'
    ? JSON.parse(row.resource_metadata)
    : (row.resource_metadata || {});

  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    membershipId: row.membership_id ? Number(row.membership_id) : null,
    resourceId: Number(row.resource_id),
    resourceName: row.resource_name,
    resourceType: row.resource_type,
    location: metadata.zone ? `${metadata.floor}, ${metadata.zone}` : (metadata.floor || 'Workspace'),
    bookingType: row.booking_type,
    status: row.status,
    startAt: row.start_at,
    endAt: row.end_at,
    purpose: row.purpose || '',
    notes: row.notes || '',
    subtotalMinor: Number(row.subtotal_minor || 0),
    taxMinor: Number(row.tax_minor || 0),
    totalMinor: Number(row.total_minor || 0),
    currency: row.currency || 'gbp',
    stripePaymentIntentId: row.stripe_payment_intent_id || null,
    stripePaymentStatus: row.stripe_payment_status || null,
    capacity: row.resource_capacity ? `Capacity: ${row.resource_capacity} people` : 'Capacity: 1 person',
    attendees: row.booking_type === 'desk'
      ? '1 attendee'
      : `${Math.min(Number(row.resource_capacity || 1), Number(row.resource_capacity || 1))} attendees`,
  };
}

export async function listUserBookings(userId) {
  await expireStalePendingBookings();
  await expireStalePendingBookingAdjustments();
  const rows = await queryAll(
    `SELECT bookings.*, resources.name AS resource_name, resources.type AS resource_type, resources.capacity AS resource_capacity, resources.metadata AS resource_metadata
       FROM bookings
       INNER JOIN resources ON resources.id = bookings.resource_id
      WHERE bookings.user_id = :userId
        AND bookings.status != 'canceled'
      ORDER BY bookings.start_at ASC, bookings.id ASC`,
    { userId },
  );

  return rows.map(toBooking);
}

async function getBookingRowForUser(userId, bookingId) {
  return queryOne(
    `${BOOKING_SELECT_QUERY}
      WHERE bookings.id = :bookingId AND bookings.user_id = :userId
      LIMIT 1`,
    {
      bookingId,
      userId,
    },
  );
}

async function getBookingRowById(bookingId) {
  return queryOne(
    `${BOOKING_SELECT_QUERY}
      WHERE bookings.id = :bookingId
      LIMIT 1`,
    { bookingId },
  );
}

async function getBookingRowByPaymentIntentId(paymentIntentId) {
  if (!paymentIntentId) {
    return null;
  }

  return queryOne(
    `${BOOKING_SELECT_QUERY}
      WHERE bookings.stripe_payment_intent_id = :paymentIntentId
      ORDER BY bookings.id DESC
      LIMIT 1`,
    { paymentIntentId },
  );
}

async function getBookingRowByCheckoutSessionId(checkoutSessionId) {
  if (!checkoutSessionId) {
    return null;
  }

  return queryOne(
    `${BOOKING_SELECT_QUERY}
      WHERE bookings.stripe_checkout_session_id = :checkoutSessionId
      ORDER BY bookings.id DESC
      LIMIT 1`,
    { checkoutSessionId },
  );
}

async function getBookingAdjustmentRowById(adjustmentId) {
  return queryOne(
    `${BOOKING_ADJUSTMENT_SELECT_QUERY}
      WHERE booking_adjustments.id = :adjustmentId
      LIMIT 1`,
    { adjustmentId },
  );
}

async function getBookingAdjustmentRowByCheckoutSessionId(checkoutSessionId) {
  if (!checkoutSessionId) {
    return null;
  }

  return queryOne(
    `${BOOKING_ADJUSTMENT_SELECT_QUERY}
      WHERE booking_adjustments.stripe_checkout_session_id = :checkoutSessionId
      ORDER BY booking_adjustments.id DESC
      LIMIT 1`,
    { checkoutSessionId },
  );
}

async function getActivePendingBookingAdjustment(bookingId) {
  if (!bookingId) {
    return null;
  }

  return queryOne(
    `${BOOKING_ADJUSTMENT_SELECT_QUERY}
      WHERE booking_adjustments.booking_id = :bookingId
        AND booking_adjustments.status = 'pending_payment'
        AND (
          booking_adjustments.payment_hold_expires_at IS NULL
          OR booking_adjustments.payment_hold_expires_at > :now
        )
      ORDER BY booking_adjustments.id DESC
      LIMIT 1`,
    {
      bookingId,
      now: new Date(),
    },
  );
}

async function markBookingAdjustmentStatus(adjustmentId, status, options = {}) {
  const shouldUpdateHold = options.clearHold || Object.prototype.hasOwnProperty.call(options, 'paymentHoldExpiresAt');

  await execute(
    `UPDATE booking_adjustments
        SET status = :status,
            stripe_payment_intent_id = COALESCE(:stripePaymentIntentId, stripe_payment_intent_id),
            payment_hold_expires_at = CASE
              WHEN :shouldUpdateHold = 1 THEN :paymentHoldExpiresAt
              ELSE payment_hold_expires_at
            END,
            updated_at = :updatedAt
      WHERE id = :adjustmentId`,
    {
      adjustmentId,
      status,
      stripePaymentIntentId: options.stripePaymentIntentId || null,
      shouldUpdateHold: shouldUpdateHold ? 1 : 0,
      paymentHoldExpiresAt: options.clearHold ? null : (options.paymentHoldExpiresAt ?? null),
      updatedAt: new Date(),
    },
  );
}

export async function listAvailableResources({ type = '', startAt = '', endAt = '' }) {
  await expireStalePendingBookings();
  await expireStalePendingBookingAdjustments();
  const resources = await listResources(type);

  if (!startAt || !endAt) {
    return resources.map((resource) => ({ ...resource, available: true }));
  }

  const conflictingRows = await queryAll(
    `SELECT resource_id
       FROM bookings
      WHERE (
              status = 'confirmed'
              OR (
                status = 'pending'
                AND (payment_hold_expires_at IS NULL OR payment_hold_expires_at > :now)
              )
            )
        AND start_at < :endAt
        AND end_at > :startAt
      UNION
      SELECT resource_id
        FROM booking_adjustments
       WHERE status = 'pending_payment'
         AND (payment_hold_expires_at IS NULL OR payment_hold_expires_at > :now)
         AND start_at < :endAt
         AND end_at > :startAt`,
    {
      now: new Date(),
      startAt: toUtcMysqlDateTime(startAt),
      endAt: toUtcMysqlDateTime(endAt),
    },
  );

  const conflictingResourceIds = new Set(conflictingRows.map((row) => Number(row.resource_id)));

  return resources.map((resource) => ({
    ...resource,
    available: !conflictingResourceIds.has(resource.id),
  }));
}

export async function validateAvailability({
  resourceId,
  startAt,
  endAt,
  excludeBookingId = null,
  excludeAdjustmentId = null,
  skipExpiryCleanup = false,
}) {
  if (!skipExpiryCleanup) {
    await expireStalePendingBookings();
    await expireStalePendingBookingAdjustments();
  }
  const resource = await getResourceById(resourceId);
  if (!resource || !resource.active) {
    throw new Error('Selected resource is unavailable.');
  }

  const conflict = await queryOne(
    `SELECT id
       FROM bookings
      WHERE resource_id = :resourceId
        AND (
              status = 'confirmed'
              OR (
                status = 'pending'
                AND (payment_hold_expires_at IS NULL OR payment_hold_expires_at > :now)
              )
            )
        AND start_at < :endAt
        AND end_at > :startAt
        AND (:excludeBookingId IS NULL OR id != :excludeBookingId)
      LIMIT 1`,
    {
      now: new Date(),
      resourceId,
      startAt: toUtcMysqlDateTime(startAt),
      endAt: toUtcMysqlDateTime(endAt),
      excludeBookingId,
    },
  );

  if (conflict) {
    throw new Error('The selected resource is already booked for that time range.');
  }

  const adjustmentConflict = await queryOne(
    `SELECT id
       FROM booking_adjustments
      WHERE resource_id = :resourceId
        AND status = 'pending_payment'
        AND (payment_hold_expires_at IS NULL OR payment_hold_expires_at > :now)
        AND start_at < :endAt
        AND end_at > :startAt
        AND (:excludeAdjustmentId IS NULL OR id != :excludeAdjustmentId)
      LIMIT 1`,
    {
      now: new Date(),
      resourceId,
      startAt: toUtcMysqlDateTime(startAt),
      endAt: toUtcMysqlDateTime(endAt),
      excludeAdjustmentId,
    },
  );

  if (adjustmentConflict) {
    throw new Error('The selected resource is already booked for that time range.');
  }

  return resource;
}

function calculateBookingSubtotalMinor(resource, startAt, endAt) {
  const durationMs = new Date(endAt).getTime() - new Date(startAt).getTime();
  const durationHours = Math.max(1, Math.ceil(durationMs / (60 * 60 * 1000)));
  return durationHours * Number(resource.hourlyRateMinor || 0);
}

function normalizeMinorAmount(value, fallback = 0) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? Math.round(normalized) : fallback;
}

function getBookingFinancials(bookingRow, financials = {}) {
  const subtotalMinor = normalizeMinorAmount(financials.subtotalMinor, Number(bookingRow?.subtotal_minor || 0));
  const totalMinor = normalizeMinorAmount(financials.totalMinor, Number(bookingRow?.total_minor || 0));
  const computedTaxMinor = Math.max(0, totalMinor - subtotalMinor);
  const taxMinor = normalizeMinorAmount(financials.taxMinor, computedTaxMinor);

  return {
    subtotalMinor,
    taxMinor,
    totalMinor,
    currency: String(financials.currency || bookingRow?.currency || 'gbp').toLowerCase(),
  };
}

function getCheckoutSessionFinancials(session, bookingRow) {
  return getBookingFinancials(bookingRow, {
    subtotalMinor: session?.amount_subtotal,
    taxMinor: session?.total_details?.amount_tax,
    totalMinor: session?.amount_total,
    currency: session?.currency,
  });
}

function getInvoiceFinancials(invoice, bookingRow) {
  return getBookingFinancials(bookingRow, {
    subtotalMinor: invoice?.subtotal,
    taxMinor: invoice?.tax,
    totalMinor: invoice?.total,
    currency: invoice?.currency,
  });
}

async function syncBookingFinancials(bookingId, financials = {}) {
  const subtotalMinor = normalizeMinorAmount(financials.subtotalMinor);
  const taxMinor = normalizeMinorAmount(financials.taxMinor);
  const totalMinor = normalizeMinorAmount(financials.totalMinor, subtotalMinor + taxMinor);

  await execute(
    `UPDATE bookings
        SET subtotal_minor = :subtotalMinor,
            tax_minor = :taxMinor,
            total_minor = :totalMinor,
            currency = :currency,
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId,
      subtotalMinor,
      taxMinor,
      totalMinor,
      currency: String(financials.currency || 'gbp').toLowerCase(),
      updatedAt: new Date(),
    },
  );
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
    throw new Error('Bookings cannot be longer than 24 hours.');
  }
}

async function createBookingInvoiceIfMissing(
  bookingRow,
  stripePaymentIntentId,
  status = 'paid',
  paidAt = new Date(),
  invoiceOptions = {},
) {
  const financials = getBookingFinancials(bookingRow, invoiceOptions);
  const existingInvoice = await queryOne(
    'SELECT id FROM invoices WHERE stripe_payment_intent_id = :stripePaymentIntentId LIMIT 1',
    { stripePaymentIntentId },
  );

  const payload = {
    userId: Number(bookingRow.user_id),
    membershipId: bookingRow.membership_id ? Number(bookingRow.membership_id) : null,
    bookingId: Number(bookingRow.id),
    stripeInvoiceId: invoiceOptions.stripeInvoiceId || null,
    stripePaymentIntentId,
    invoiceNumber: invoiceOptions.invoiceNumber || `BK-${bookingRow.id}`,
    status,
    description: `${bookingRow.resource_name} booking`,
    currency: financials.currency,
    subtotalMinor: financials.subtotalMinor,
    taxMinor: financials.taxMinor,
    totalMinor: financials.totalMinor,
    hostedInvoiceUrl: invoiceOptions.hostedInvoiceUrl || null,
    invoicePdf: invoiceOptions.invoicePdf || null,
    paidAt,
  };

  if (existingInvoice?.id || invoiceOptions.stripeInvoiceId) {
    await upsertStripeInvoice(payload);
    return;
  }

  await createLocalInvoice(payload);
}

function calculateBookingFinancialsForResource(resource, startAt, endAt) {
  const subtotalMinor = calculateBookingSubtotalMinor(resource, startAt, endAt);
  const taxMinor = calculateVat(subtotalMinor);
  const totalMinor = subtotalMinor + taxMinor;

  return {
    subtotalMinor,
    taxMinor,
    totalMinor,
    currency: 'gbp',
  };
}

async function applyBookingUpdate({
  bookingId,
  resourceId,
  startAt,
  endAt,
  purpose,
  notes,
  financials,
  stripePaymentIntentId = undefined,
  stripePaymentStatus = undefined,
  transaction = undefined,
}) {
  const fields = [
    'resource_id = :resourceId',
    'start_at = :startAt',
    'end_at = :endAt',
    'purpose = :purpose',
    'notes = :notes',
    'subtotal_minor = :subtotalMinor',
    'tax_minor = :taxMinor',
    'total_minor = :totalMinor',
    'currency = :currency',
    'updated_at = :updatedAt',
  ];

  if (stripePaymentIntentId !== undefined) {
    fields.push('stripe_payment_intent_id = :stripePaymentIntentId');
  }

  if (stripePaymentStatus !== undefined) {
    fields.push('stripe_payment_status = :stripePaymentStatus');
  }

  await execute(
    `UPDATE bookings
        SET ${fields.join(',\n            ')}
      WHERE id = :bookingId`,
    {
      bookingId,
      resourceId,
      startAt: toUtcMysqlDateTime(startAt),
      endAt: toUtcMysqlDateTime(endAt),
      purpose,
      notes,
      subtotalMinor: financials.subtotalMinor,
      taxMinor: financials.taxMinor,
      totalMinor: financials.totalMinor,
      currency: financials.currency || 'gbp',
      stripePaymentIntentId: stripePaymentIntentId ?? null,
      stripePaymentStatus: stripePaymentStatus ?? null,
      updatedAt: new Date(),
    },
    ...(transaction ? [{ transaction }] : []),
  );
}

async function createBookingAdjustmentInvoice(adjustmentRow, stripePaymentIntentId, invoiceOptions = {}) {
  const financials = getBookingFinancials(adjustmentRow, invoiceOptions);
  const existingInvoice = await queryOne(
    'SELECT id FROM invoices WHERE stripe_payment_intent_id = :stripePaymentIntentId LIMIT 1',
    { stripePaymentIntentId },
  );

  if (existingInvoice?.id) {
    await upsertStripeInvoice({
      userId: Number(adjustmentRow.user_id),
      membershipId: null,
      bookingId: Number(adjustmentRow.booking_id),
      stripeInvoiceId: invoiceOptions.stripeInvoiceId || null,
      stripePaymentIntentId,
      invoiceNumber: invoiceOptions.invoiceNumber || `BK-ADJ-${adjustmentRow.id}`,
      status: invoiceOptions.status || 'paid',
      description: invoiceOptions.description || `${adjustmentRow.resource_name} booking adjustment`,
      currency: financials.currency,
      subtotalMinor: financials.subtotalMinor,
      taxMinor: financials.taxMinor,
      totalMinor: financials.totalMinor,
      hostedInvoiceUrl: invoiceOptions.hostedInvoiceUrl || null,
      invoicePdf: invoiceOptions.invoicePdf || null,
      paidAt: invoiceOptions.paidAt || new Date(),
    });
    return;
  }

  await createLocalInvoice({
    userId: Number(adjustmentRow.user_id),
    membershipId: null,
    bookingId: Number(adjustmentRow.booking_id),
    stripeInvoiceId: invoiceOptions.stripeInvoiceId || null,
    stripePaymentIntentId,
    invoiceNumber: invoiceOptions.invoiceNumber || `BK-ADJ-${adjustmentRow.id}`,
    status: invoiceOptions.status || 'paid',
    description: invoiceOptions.description || `${adjustmentRow.resource_name} booking adjustment`,
    currency: financials.currency,
    subtotalMinor: financials.subtotalMinor,
    taxMinor: financials.taxMinor,
    totalMinor: financials.totalMinor,
    hostedInvoiceUrl: invoiceOptions.hostedInvoiceUrl || null,
    invoicePdf: invoiceOptions.invoicePdf || null,
    paidAt: invoiceOptions.paidAt || new Date(),
  });
}

async function markPendingBookingCanceled(bookingRow, stripePaymentStatus = 'canceled') {
  await execute(
    `UPDATE bookings
        SET status = 'canceled',
            stripe_payment_status = :stripePaymentStatus,
            payment_hold_expires_at = NULL,
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId: bookingRow.id,
      stripePaymentStatus,
      updatedAt: new Date(),
    },
  );
}

async function persistConfirmedBooking(
  bookingRow,
  stripePaymentIntentId,
  stripePaymentStatus = 'succeeded',
  financials = null,
) {
  const resolvedFinancials = getBookingFinancials(bookingRow, financials || {});

  await execute(
    `UPDATE bookings
        SET status = 'confirmed',
            stripe_payment_intent_id = :stripePaymentIntentId,
            stripe_payment_status = :stripePaymentStatus,
            subtotal_minor = :subtotalMinor,
            tax_minor = :taxMinor,
            total_minor = :totalMinor,
            currency = :currency,
            payment_hold_expires_at = NULL,
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId: bookingRow.id,
      stripePaymentIntentId,
      stripePaymentStatus,
      subtotalMinor: resolvedFinancials.subtotalMinor,
      taxMinor: resolvedFinancials.taxMinor,
      totalMinor: resolvedFinancials.totalMinor,
      currency: resolvedFinancials.currency,
      updatedAt: new Date(),
    },
  );

  const updatedBookingRow = await getBookingRowById(bookingRow.id);
  await createBookingInvoiceIfMissing(updatedBookingRow, stripePaymentIntentId, 'paid', new Date(), financials || {});
  return updatedBookingRow;
}

async function autoRefundBookingPayment(bookingRow, reasonLabel) {
  if (!isStripeEnabled() || !bookingRow?.id) {
    await markPendingBookingCanceled(bookingRow, 'refunded');
    return null;
  }

  const refunds = await refundBookingAmount({
    bookingId: Number(bookingRow.id),
    userId: Number(bookingRow.user_id),
    membershipId: bookingRow.membership_id ? Number(bookingRow.membership_id) : null,
    amountMinor: Number(bookingRow.total_minor || 0),
    reason: 'requested_by_customer',
    metadata: {
      app_user_id: String(bookingRow.user_id),
      booking_id: String(bookingRow.id),
      auto_refund_reason: String(reasonLabel || 'booking_unavailable'),
    },
  });

  await markPendingBookingCanceled(bookingRow, 'refunded');
  return refunds;
}

async function finalizeBookingAfterSuccessfulPayment(
  bookingRow,
  stripePaymentIntentId,
  stripePaymentStatus = 'succeeded',
  financials = null,
) {
  if (!bookingRow) {
    return { outcome: 'missing' };
  }

  if (bookingRow.status === 'confirmed') {
    let resolvedBookingRow = bookingRow;

    if (financials) {
      const currentBookingRow = await getBookingRowById(bookingRow.id);

      if (currentBookingRow) {
        await syncBookingFinancials(currentBookingRow.id, getBookingFinancials(currentBookingRow, financials));
        resolvedBookingRow = await getBookingRowById(currentBookingRow.id);
      }
    }

    if (resolvedBookingRow) {
      await createBookingInvoiceIfMissing(resolvedBookingRow, stripePaymentIntentId, 'paid', new Date(), financials || {});
    }

    return { outcome: 'confirmed', bookingRow: await getBookingRowById(bookingRow.id) };
  }

  if (bookingRow.status !== 'pending') {
    await autoRefundBookingPayment(bookingRow, 'booking_not_pending');
    return { outcome: 'refunded', bookingRow: await getBookingRowById(bookingRow.id) };
  }

  if (isBookingHoldExpired(bookingRow)) {
    await autoRefundBookingPayment(bookingRow, 'booking_hold_expired');
    return { outcome: 'refunded', bookingRow: await getBookingRowById(bookingRow.id) };
  }

  try {
    await validateAvailability({
      resourceId: Number(bookingRow.resource_id),
      startAt: bookingRow.start_at,
      endAt: bookingRow.end_at,
      excludeBookingId: Number(bookingRow.id),
      skipExpiryCleanup: true,
    });
  } catch (error) {
    await autoRefundBookingPayment(bookingRow, 'booking_conflict_after_payment');
    return {
      outcome: 'refunded',
      bookingRow: await getBookingRowById(bookingRow.id),
      error,
    };
  }

  return {
    outcome: 'confirmed',
    bookingRow: await persistConfirmedBooking(bookingRow, stripePaymentIntentId, stripePaymentStatus, financials),
  };
}

async function reconcilePendingBookingRow(bookingRow) {
  if (!bookingRow || bookingRow.status !== 'pending') {
    return bookingRow;
  }

  if (bookingRow.stripe_checkout_session_id && isStripeEnabled()) {
    const session = await retrieveStripeCheckoutSession(bookingRow.stripe_checkout_session_id);
    const paymentIntentId = typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id || null;

    if (session.payment_status === 'paid' && paymentIntentId) {
      return (await finalizeBookingAfterSuccessfulPayment(
        bookingRow,
        paymentIntentId,
        session.payment_status,
        getCheckoutSessionFinancials(session, bookingRow),
      )).bookingRow;
    }

    if (session.status === 'expired' || isBookingHoldExpired(bookingRow)) {
      if (session.status === 'open') {
        await expireStripeCheckoutSession(session.id).catch((err) => console.error('[Stripe cleanup] Non-fatal error:', err.message));
      }

      await markPendingBookingCanceled(bookingRow, 'expired');
      return getBookingRowById(bookingRow.id);
    }

    return bookingRow;
  }

  if (bookingRow.stripe_payment_intent_id && isStripeEnabled()) {
    const paymentIntent = await retrieveStripePaymentIntent(bookingRow.stripe_payment_intent_id);

    if (paymentIntent.status === 'succeeded') {
      return (await finalizeBookingAfterSuccessfulPayment(bookingRow, paymentIntent.id, paymentIntent.status)).bookingRow;
    }

    if (['canceled', 'requires_payment_method'].includes(paymentIntent.status) || isBookingHoldExpired(bookingRow)) {
      if (!['canceled', 'succeeded'].includes(paymentIntent.status)) {
        await cancelStripePaymentIntent(paymentIntent.id).catch((err) => console.error('[Stripe cleanup] Non-fatal error:', err.message));
      }

      await markPendingBookingCanceled(
        bookingRow,
        isBookingHoldExpired(bookingRow) ? 'expired' : paymentIntent.status,
      );
      return getBookingRowById(bookingRow.id);
    }

    return bookingRow;
  }

  if (isBookingHoldExpired(bookingRow)) {
    await markPendingBookingCanceled(bookingRow, 'expired');
    return getBookingRowById(bookingRow.id);
  }

  return bookingRow;
}

async function reconcilePendingBookingAdjustmentRow(adjustmentRow) {
  if (!adjustmentRow || adjustmentRow.status !== 'pending_payment') {
    return adjustmentRow;
  }

  if (adjustmentRow.stripe_checkout_session_id && isStripeEnabled()) {
    const session = await retrieveStripeCheckoutSession(adjustmentRow.stripe_checkout_session_id);
    const paymentIntentId = typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id || null;

    if (session.payment_status === 'paid' && paymentIntentId) {
      return syncBookingAdjustmentCheckoutSession({
        userId: Number(adjustmentRow.user_id),
        sessionId: session.id,
      }).catch(() => getBookingAdjustmentRowById(adjustmentRow.id));
    }

    if (session.status === 'expired' || isAdjustmentHoldExpired(adjustmentRow)) {
      if (session.status === 'open') {
        await expireStripeCheckoutSession(session.id).catch((err) => console.error('[Stripe cleanup] Non-fatal error:', err.message));
      }

      await markBookingAdjustmentStatus(adjustmentRow.id, 'expired', { clearHold: true });
      return getBookingAdjustmentRowById(adjustmentRow.id);
    }

    return adjustmentRow;
  }

  if (isAdjustmentHoldExpired(adjustmentRow)) {
    await markBookingAdjustmentStatus(adjustmentRow.id, 'expired', { clearHold: true });
    return getBookingAdjustmentRowById(adjustmentRow.id);
  }

  return adjustmentRow;
}

async function expireStalePendingBookings() {
  const staleRows = await queryAll(
    `${BOOKING_SELECT_QUERY}
      WHERE bookings.status = 'pending'
        AND bookings.payment_hold_expires_at IS NOT NULL
        AND bookings.payment_hold_expires_at <= :now`,
    {
      now: new Date(),
    },
  );

  for (const bookingRow of staleRows) {
    await reconcilePendingBookingRow(bookingRow);
  }
}

async function expireStalePendingBookingAdjustments() {
  const staleRows = await queryAll(
    `${BOOKING_ADJUSTMENT_SELECT_QUERY}
      WHERE booking_adjustments.status = 'pending_payment'
        AND booking_adjustments.payment_hold_expires_at IS NOT NULL
        AND booking_adjustments.payment_hold_expires_at <= :now`,
    {
      now: new Date(),
    },
  );

  for (const adjustmentRow of staleRows) {
    await reconcilePendingBookingAdjustmentRow(adjustmentRow);
  }
}

export async function createBooking({
  userId,
  resourceId,
  bookingType,
  startAt,
  endAt,
  purpose = '',
  notes = '',
}) {
  validateBookingWindow(startAt, endAt);
  const membership = await getUserMembership(userId);

  // P0-4: Wrap availability check + insert in a transaction to prevent double-booking
  const transaction = await sequelize.transaction();
  let resource;
  try {
    resource = await validateAvailability({ resourceId, startAt, endAt });
    const subtotalMinor = calculateBookingSubtotalMinor(resource, startAt, endAt);
    const taxMinor = calculateVat(subtotalMinor);
    const totalMinor = subtotalMinor + taxMinor;
    const now = new Date();

    const [insertId, metadata] = await execute(
      `INSERT INTO bookings
        (document_id, user_id, membership_id, resource_id, booking_type, status, start_at, end_at, purpose, notes, subtotal_minor, tax_minor, total_minor, currency, payment_hold_expires_at, created_at, updated_at)
       VALUES
        (:documentId, :userId, :membershipId, :resourceId, :bookingType, 'pending', :startAt, :endAt, :purpose, :notes, :subtotalMinor, :taxMinor, :totalMinor, 'gbp', :paymentHoldExpiresAt, :createdAt, :updatedAt)`,
      {
        documentId: randomUUID(),
        userId,
        membershipId: membership?.id || null,
        resourceId,
        bookingType,
        startAt: toUtcMysqlDateTime(startAt),
        endAt: toUtcMysqlDateTime(endAt),
        purpose,
        notes,
        subtotalMinor,
        taxMinor,
        totalMinor,
        paymentHoldExpiresAt: getBookingHoldExpiryDate(now),
        createdAt: now,
        updatedAt: now,
      },
      { transaction },
    );

    const bookingId = typeof insertId === 'number' ? insertId : metadata?.insertId;

    // P0-7: Charge then update status; if DB update fails, auto-refund
    const chargeResult = await chargeBooking({
      userId,
      bookingId,
      totalMinor,
      currency: 'gbp',
    });

    try {
      await execute(
        `UPDATE bookings
            SET status = 'confirmed',
                stripe_payment_intent_id = :stripePaymentIntentId,
                stripe_payment_status = :stripePaymentStatus,
                payment_hold_expires_at = NULL,
                updated_at = :updatedAt
          WHERE id = :bookingId`,
        {
          bookingId,
          stripePaymentIntentId: chargeResult.stripePaymentIntentId,
          stripePaymentStatus: chargeResult.stripePaymentStatus,
          updatedAt: new Date(),
        },
        { transaction },
      );
    } catch (dbError) {
      // P0-7: DB update failed after charge — attempt auto-refund
      console.error(`[P0-7] createBooking DB update failed after charge for booking ${bookingId}, attempting refund:`, dbError.message);
      try {
        await refundBookingAmount({
          bookingId,
          userId,
          membershipId: membership?.id || null,
          amountMinor: totalMinor,
          reason: 'requested_by_customer',
          metadata: { booking_id: String(bookingId), auto_refund: 'db_failure' },
        });
      } catch (refundError) {
        console.error(`[P0-7] CRITICAL: Auto-refund also failed for booking ${bookingId}:`, refundError.message);
      }
      throw dbError;
    }

    await createLocalInvoice({
      userId,
      membershipId: membership?.id || null,
      bookingId,
      stripePaymentIntentId: chargeResult.stripePaymentIntentId,
      invoiceNumber: `BK-${bookingId}`,
      status: chargeResult.stripePaymentStatus === 'succeeded' ? 'paid' : chargeResult.stripePaymentStatus,
      description: `${resource.name} booking`,
      currency: 'gbp',
      subtotalMinor,
      taxMinor,
      totalMinor,
      paidAt: chargeResult.stripePaymentStatus === 'succeeded' ? new Date() : null,
      transaction,
    });

    await transaction.commit();

    const bookings = await listUserBookings(userId);
    return bookings.find((booking) => booking.id === Number(bookingId)) || null;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

export async function initiateBookingPayment({
  userId,
  resourceId,
  bookingType,
  startAt,
  endAt,
  purpose = '',
  notes = '',
}) {
  validateBookingWindow(startAt, endAt);
  const membership = await getUserMembership(userId);
  const resource = await validateAvailability({ resourceId, startAt, endAt });
  const subtotalMinor = calculateBookingSubtotalMinor(resource, startAt, endAt);
  const taxMinor = calculateVat(subtotalMinor);
  const totalMinor = subtotalMinor + taxMinor;
  const now = new Date();

  const [insertId, metadata] = await execute(
    `INSERT INTO bookings
      (document_id, user_id, membership_id, resource_id, booking_type, status, start_at, end_at, purpose, notes, subtotal_minor, tax_minor, total_minor, currency, payment_hold_expires_at, created_at, updated_at)
     VALUES
      (:documentId, :userId, :membershipId, :resourceId, :bookingType, 'pending', :startAt, :endAt, :purpose, :notes, :subtotalMinor, :taxMinor, :totalMinor, 'gbp', :paymentHoldExpiresAt, :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      userId,
      membershipId: membership?.id || null,
      resourceId,
      bookingType,
      startAt: toUtcMysqlDateTime(startAt),
      endAt: toUtcMysqlDateTime(endAt),
      purpose,
      notes,
      subtotalMinor,
      taxMinor,
      totalMinor,
      paymentHoldExpiresAt: getBookingHoldExpiryDate(now),
      createdAt: now,
      updatedAt: now,
    },
  );

  const bookingId = typeof insertId === 'number' ? insertId : metadata?.insertId;

  if (!isStripeEnabled()) {
    await execute(
      `UPDATE bookings
          SET status = 'confirmed',
              stripe_payment_intent_id = :stripePaymentIntentId,
              stripe_payment_status = 'succeeded',
              payment_hold_expires_at = NULL,
              updated_at = :updatedAt
        WHERE id = :bookingId`,
      {
        bookingId,
        stripePaymentIntentId: `mock_pi_${bookingId}`,
        updatedAt: new Date(),
      },
    );

    await createLocalInvoice({
      userId,
      membershipId: membership?.id || null,
      bookingId,
      stripePaymentIntentId: `mock_pi_${bookingId}`,
      invoiceNumber: `BK-${bookingId}`,
      status: 'paid',
      description: `${resource.name} booking`,
      currency: 'gbp',
      subtotalMinor,
      taxMinor,
      totalMinor,
      paidAt: new Date(),
    });

    return {
      booking: (await listUserBookings(userId)).find((entry) => entry.id === Number(bookingId)) || null,
      clientSecret: null,
      paymentIntentId: `mock_pi_${bookingId}`,
    };
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const customerId = await ensureStripeCustomer(user);
  const paymentIntent = await createBookingPaymentIntentDraft({
    customerId,
    amountMinor: totalMinor,
    currency: 'gbp',
    userId,
    bookingId,
  });

  await execute(
    `UPDATE bookings
        SET stripe_payment_intent_id = :stripePaymentIntentId,
            stripe_payment_status = :stripePaymentStatus,
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId,
      stripePaymentIntentId: paymentIntent.id,
      stripePaymentStatus: paymentIntent.status,
      updatedAt: new Date(),
    },
  );

  return {
    booking: (await listUserBookings(userId)).find((entry) => entry.id === Number(bookingId)) || null,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
}

export async function initiateBookingCheckout({
  userId,
  resourceId,
  bookingType,
  startAt,
  endAt,
  purpose = '',
  notes = '',
  successUrl,
  cancelUrl,
}) {
  validateBookingWindow(startAt, endAt);

  if (!successUrl || !cancelUrl) {
    throw new Error('Checkout success and cancel URLs are required.');
  }

  const membership = await getUserMembership(userId);
  const resource = await validateAvailability({ resourceId, startAt, endAt });
  const subtotalMinor = calculateBookingSubtotalMinor(resource, startAt, endAt);
  const taxMinor = calculateVat(subtotalMinor);
  const totalMinor = subtotalMinor + taxMinor;
  const now = new Date();

  const [insertId, metadata] = await execute(
    `INSERT INTO bookings
      (document_id, user_id, membership_id, resource_id, booking_type, status, start_at, end_at, purpose, notes, subtotal_minor, tax_minor, total_minor, currency, payment_hold_expires_at, created_at, updated_at)
     VALUES
      (:documentId, :userId, :membershipId, :resourceId, :bookingType, 'pending', :startAt, :endAt, :purpose, :notes, :subtotalMinor, :taxMinor, :totalMinor, 'gbp', :paymentHoldExpiresAt, :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      userId,
      membershipId: membership?.id || null,
      resourceId,
      bookingType,
      startAt: toUtcMysqlDateTime(startAt),
      endAt: toUtcMysqlDateTime(endAt),
      purpose,
      notes,
      subtotalMinor,
      taxMinor,
      totalMinor,
      paymentHoldExpiresAt: getBookingHoldExpiryDate(now),
      createdAt: now,
      updatedAt: now,
    },
  );

  const bookingId = typeof insertId === 'number' ? insertId : metadata?.insertId;

  if (!isStripeEnabled()) {
    await execute(
      `UPDATE bookings
          SET status = 'confirmed',
              stripe_payment_intent_id = :stripePaymentIntentId,
              stripe_payment_status = 'succeeded',
              payment_hold_expires_at = NULL,
              updated_at = :updatedAt
        WHERE id = :bookingId`,
      {
        bookingId,
        stripePaymentIntentId: `mock_pi_${bookingId}`,
        updatedAt: new Date(),
      },
    );

    await createLocalInvoice({
      userId,
      membershipId: membership?.id || null,
      bookingId,
      stripePaymentIntentId: `mock_pi_${bookingId}`,
      invoiceNumber: `BK-${bookingId}`,
      status: 'paid',
      description: `${resource.name} booking`,
      currency: 'gbp',
      subtotalMinor,
      taxMinor,
      totalMinor,
      paidAt: new Date(),
    });

    return {
      booking: (await listUserBookings(userId)).find((entry) => entry.id === Number(bookingId)) || null,
      sessionId: null,
      url: null,
    };
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const customerId = await ensureStripeCustomer(user);
  const session = await createBookingCheckoutSession({
    customerId,
    bookingId,
    userId,
    resourceName: resource.name,
    startAt,
    endAt,
    subtotalMinor,
    currency: 'gbp',
    successUrl,
    cancelUrl: `${cancelUrl}${cancelUrl.includes('?') ? '&' : '?'}booking_id=${bookingId}`,
  });

  await execute(
    `UPDATE bookings
        SET stripe_checkout_session_id = :stripeCheckoutSessionId,
            stripe_payment_status = 'checkout_open',
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId,
      stripeCheckoutSessionId: session.id,
      updatedAt: new Date(),
    },
  );

  return {
    booking: (await listUserBookings(userId)).find((entry) => entry.id === Number(bookingId)) || null,
    sessionId: session.id,
    url: session.url,
  };
}

export async function syncBookingCheckoutSession({ userId, sessionId }) {
  await expireStalePendingBookings();
  const session = await retrieveStripeCheckoutSession(sessionId);
  const sessionUserId = Number(session.metadata?.app_user_id || 0);
  const bookingId = Number(session.metadata?.booking_id || 0);

  if (!sessionUserId || sessionUserId !== userId) {
    throw new Error('Checkout session does not belong to this user.');
  }

  if (!bookingId) {
    throw new Error('Booking checkout session is missing booking metadata.');
  }

  const bookingRow = await getBookingRowForUser(userId, bookingId);

  if (!bookingRow) {
    throw new Error('Booking not found.');
  }

  if (session.payment_status !== 'paid') {
    throw new Error('Stripe checkout payment has not completed yet.');
  }

  const paymentIntentId = typeof session.payment_intent === 'string'
    ? session.payment_intent
    : session.payment_intent?.id || null;

  if (!paymentIntentId) {
    throw new Error('Stripe checkout payment intent is missing.');
  }

  await finalizeBookingAfterSuccessfulPayment(
    bookingRow,
    paymentIntentId,
    session.payment_status,
    getCheckoutSessionFinancials(session, bookingRow),
  );

  const bookings = await listUserBookings(userId);
  return bookings.find((booking) => booking.id === Number(bookingId)) || null;
}

export async function confirmBookingPayment({ userId, bookingId, paymentIntentId }) {
  await expireStalePendingBookings();
  const bookingRow = await getBookingRowForUser(userId, bookingId);

  if (!bookingRow) {
    throw new Error('Booking not found.');
  }

  if (bookingRow.status === 'confirmed') {
    return toBooking(bookingRow);
  }

  if (paymentIntentId && bookingRow.stripe_payment_intent_id && paymentIntentId !== bookingRow.stripe_payment_intent_id) {
    throw new Error('Payment intent does not match this booking.');
  }

  if (!bookingRow.stripe_payment_intent_id) {
    throw new Error('Payment intent is missing for this booking.');
  }

  let paymentIntentStatus = 'succeeded';
  let resolvedPaymentIntentId = bookingRow.stripe_payment_intent_id;
  let chargeReceiptUrl = null;

  if (isStripeEnabled()) {
    const paymentIntent = await retrieveStripePaymentIntent(bookingRow.stripe_payment_intent_id);
    resolvedPaymentIntentId = paymentIntent.id;
    paymentIntentStatus = paymentIntent.status;

    // Extract the receipt URL from the expanded latest_charge
    const latestCharge = paymentIntent.latest_charge;
    if (latestCharge && typeof latestCharge === 'object') {
      chargeReceiptUrl = latestCharge.receipt_url || null;
    }

    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Payment has not completed yet. Please try again once Stripe confirms the charge.');
    }
  }

  if (bookingRow.status !== 'pending') {
    throw new Error('Booking is not awaiting payment confirmation.');
  }

  const invoiceFinancials = chargeReceiptUrl
    ? { hostedInvoiceUrl: chargeReceiptUrl, invoicePdf: chargeReceiptUrl }
    : null;

  await finalizeBookingAfterSuccessfulPayment(bookingRow, resolvedPaymentIntentId, paymentIntentStatus, invoiceFinancials);

  const bookings = await listUserBookings(userId);
  return bookings.find((booking) => booking.id === Number(bookingId)) || null;
}

export async function cancelPendingBooking({ userId, bookingId, paymentIntentId = '' }) {
  await expireStalePendingBookings();
  const bookingRow = await getBookingRowForUser(userId, bookingId);

  if (!bookingRow) {
    throw new Error('Booking not found.');
  }

  if (paymentIntentId && bookingRow.stripe_payment_intent_id && paymentIntentId !== bookingRow.stripe_payment_intent_id) {
    throw new Error('Payment intent does not match this booking.');
  }

  if (bookingRow.status !== 'pending') {
    return toBooking(bookingRow);
  }

  if (isStripeEnabled()) {
    if (bookingRow.stripe_checkout_session_id) {
      await expireStripeCheckoutSession(bookingRow.stripe_checkout_session_id).catch((err) => console.error('[Stripe cleanup] Non-fatal error:', err.message));
    }

    if (bookingRow.stripe_payment_intent_id) {
      await cancelStripePaymentIntent(bookingRow.stripe_payment_intent_id).catch((err) => console.error('[Stripe cleanup] Non-fatal error:', err.message));
    }
  }

  await markPendingBookingCanceled(bookingRow, 'canceled');

  const bookings = await listUserBookings(userId);
  return bookings.find((booking) => booking.id === Number(bookingId)) || null;
}

export async function updateBooking({
  userId,
  bookingId,
  resourceId,
  startAt,
  endAt,
  purpose = '',
  notes = '',
  successUrl = '',
  cancelUrl = '',
}) {
  validateBookingWindow(startAt, endAt);
  await expireStalePendingBookings();
  await expireStalePendingBookingAdjustments();

  const existingBooking = await getBookingRowForUser(userId, bookingId);

  if (!existingBooking) {
    throw new Error('Booking not found.');
  }

  const pendingAdjustment = await getActivePendingBookingAdjustment(bookingId);

  if (pendingAdjustment) {
    throw new Error('This booking already has an update awaiting payment. Complete or cancel that update first.');
  }

  const resource = await validateAvailability({ resourceId, startAt, endAt, excludeBookingId: bookingId });
  const financials = calculateBookingFinancialsForResource(resource, startAt, endAt);

  if (existingBooking.status === 'pending') {
    await applyBookingUpdate({
      bookingId,
      resourceId,
      startAt,
      endAt,
      purpose,
      notes,
      financials,
    });

    const bookings = await listUserBookings(userId);
    return {
      booking: bookings.find((booking) => booking.id === Number(bookingId)) || null,
      sessionId: null,
      url: null,
      adjustmentId: null,
      action: 'updated',
      paymentDueMinor: 0,
      refundMinor: 0,
    };
  }

  if (existingBooking.status !== 'confirmed') {
    throw new Error('Only active bookings can be updated.');
  }

  const currentSubtotalMinor = Number(existingBooking.subtotal_minor || 0);
  const currentTotalMinor = Number(existingBooking.total_minor || 0);
  const paymentDueMinor = Math.max(0, financials.totalMinor - currentTotalMinor);
  const refundMinor = Math.max(0, currentTotalMinor - financials.totalMinor);
  const adjustmentSubtotalMinor = Math.max(0, financials.subtotalMinor - currentSubtotalMinor);

  if (paymentDueMinor <= 0 && refundMinor <= 0) {
    await applyBookingUpdate({
      bookingId,
      resourceId,
      startAt,
      endAt,
      purpose,
      notes,
      financials,
      stripePaymentStatus: 'succeeded',
    });

    const bookings = await listUserBookings(userId);
    return {
      booking: bookings.find((booking) => booking.id === Number(bookingId)) || null,
      sessionId: null,
      url: null,
      adjustmentId: null,
      action: 'updated',
      paymentDueMinor: 0,
      refundMinor: 0,
    };
  }

  if (refundMinor > 0) {
    // P0-6: Wrap update + refund in transaction — rollback booking update if refund fails
    const refundTransaction = await sequelize.transaction();
    try {
      await applyBookingUpdate({
        bookingId,
        resourceId,
        startAt,
        endAt,
        purpose,
        notes,
        financials,
        stripePaymentStatus: 'succeeded',
        transaction: refundTransaction,
      });

      await refundBookingAmount({
        bookingId,
        userId,
        membershipId: existingBooking.membership_id ? Number(existingBooking.membership_id) : null,
        amountMinor: refundMinor,
        reason: 'requested_by_customer',
        metadata: {
          app_user_id: String(userId),
          booking_id: String(bookingId),
          booking_adjustment: 'decrease',
        },
      });

      await refundTransaction.commit();
    } catch (error) {
      await refundTransaction.rollback();
      throw error;
    }

    const bookings = await listUserBookings(userId);
    return {
      booking: bookings.find((booking) => booking.id === Number(bookingId)) || null,
      sessionId: null,
      url: null,
      adjustmentId: null,
      action: 'refunded',
      paymentDueMinor: 0,
      refundMinor,
    };
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new Error('User not found.');
  }

  const now = new Date();
  const [insertId, metadata] = await execute(
    `INSERT INTO booking_adjustments
      (document_id, booking_id, user_id, resource_id, booking_type, status, start_at, end_at, purpose, notes, subtotal_minor, tax_minor, total_minor, adjustment_minor, currency, payment_hold_expires_at, created_at, updated_at)
     VALUES
      (:documentId, :bookingId, :userId, :resourceId, :bookingType, 'pending_payment', :startAt, :endAt, :purpose, :notes, :subtotalMinor, :taxMinor, :totalMinor, :adjustmentMinor, :currency, :paymentHoldExpiresAt, :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      bookingId,
      userId,
      resourceId,
      bookingType: existingBooking.booking_type,
      startAt: toUtcMysqlDateTime(startAt),
      endAt: toUtcMysqlDateTime(endAt),
      purpose,
      notes,
      subtotalMinor: financials.subtotalMinor,
      taxMinor: financials.taxMinor,
      totalMinor: financials.totalMinor,
      adjustmentMinor: paymentDueMinor,
      currency: financials.currency,
      paymentHoldExpiresAt: getBookingHoldExpiryDate(now),
      createdAt: now,
      updatedAt: now,
    },
  );

  const adjustmentId = typeof insertId === 'number' ? insertId : metadata?.insertId;
  const customerId = await ensureStripeCustomer(user);

  // Create a PaymentIntent draft for in-page card collection instead of a checkout session redirect
  const paymentIntent = await createBookingAdjustmentPaymentIntentDraft({
    customerId,
    amountMinor: paymentDueMinor,
    currency: financials.currency,
    userId,
    bookingId,
    bookingAdjustmentId: adjustmentId,
    description: `${resource.name} booking adjustment`,
  });

  await execute(
    `UPDATE booking_adjustments
        SET stripe_payment_intent_id = :stripePaymentIntentId,
            updated_at = :updatedAt
      WHERE id = :adjustmentId`,
    {
      adjustmentId,
      stripePaymentIntentId: paymentIntent.id,
      updatedAt: new Date(),
    },
  );

  return {
    booking: toBooking(existingBooking),
    sessionId: null,
    url: null,
    adjustmentId: Number(adjustmentId),
    action: 'payment_required',
    paymentDueMinor,
    refundMinor: 0,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    subtotalMinor: adjustmentSubtotalMinor,
    taxMinor: paymentDueMinor - adjustmentSubtotalMinor,
    currency: financials.currency,
  };
}

export async function confirmBookingAdjustmentPayment({ userId, paymentIntentId, adjustmentId }) {
  await expireStalePendingBookings();
  await expireStalePendingBookingAdjustments();

  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const adjustmentRow = await getBookingAdjustmentRowById(adjustmentId);
  if (!adjustmentRow || Number(adjustmentRow.user_id) !== userId) {
    throw new Error('Booking adjustment was not found.');
  }

  if (adjustmentRow.status === 'completed') {
    const bookings = await listUserBookings(userId);
    return bookings.find((booking) => booking.id === Number(adjustmentRow.booking_id)) || null;
  }

  if (adjustmentRow.status !== 'pending_payment') {
    throw new Error('This booking adjustment is no longer awaiting payment.');
  }

  // Verify the payment intent succeeded
  const paymentIntent = await retrieveStripePaymentIntent(paymentIntentId);
  if (!paymentIntent || paymentIntent.status !== 'succeeded') {
    throw new Error('Payment has not been completed successfully.');
  }

  const bookingRow = await getBookingRowForUser(userId, Number(adjustmentRow.booking_id));

  if (!bookingRow || bookingRow.status !== 'confirmed') {
    throw new Error('The original booking can no longer be adjusted.');
  }

  try {
    await validateAvailability({
      resourceId: Number(adjustmentRow.resource_id),
      startAt: adjustmentRow.start_at,
      endAt: adjustmentRow.end_at,
      excludeBookingId: bookingRow.id,
      excludeAdjustmentId: adjustmentRow.id,
      skipExpiryCleanup: true,
    });
  } catch (error) {
    // Conflict after payment -- auto-refund
    await createBookingAdjustmentInvoice(adjustmentRow, paymentIntentId, {
      status: 'paid',
      description: `${adjustmentRow.resource_name} booking adjustment`,
      currency: adjustmentRow.currency || 'gbp',
      subtotalMinor: Number(adjustmentRow.subtotal_minor || 0),
      taxMinor: Number(adjustmentRow.tax_minor || 0),
      totalMinor: Number(adjustmentRow.total_minor || 0),
      hostedInvoiceUrl: paymentIntent.latest_charge?.receipt_url || null,
      paidAt: new Date(),
    });

    await refundBookingAmount({
      bookingId: Number(adjustmentRow.booking_id),
      userId,
      amountMinor: Number(adjustmentRow.adjustment_minor || adjustmentRow.total_minor || 0),
      reason: 'requested_by_customer',
      metadata: {
        app_user_id: String(userId),
        booking_id: String(adjustmentRow.booking_id),
        booking_adjustment_id: String(adjustmentRow.id),
        booking_adjustment_refund: 'resource_conflict',
      },
    });

    await markBookingAdjustmentStatus(adjustmentRow.id, 'refunded', {
      stripePaymentIntentId: paymentIntentId,
      clearHold: true,
    });

    throw new Error('The updated booking slot is no longer available. The extra payment was automatically refunded.');
  }

  await applyBookingUpdate({
    bookingId: bookingRow.id,
    resourceId: Number(adjustmentRow.resource_id),
    startAt: adjustmentRow.start_at,
    endAt: adjustmentRow.end_at,
    purpose: String(adjustmentRow.purpose || ''),
    notes: String(adjustmentRow.notes || ''),
    financials: getBookingFinancials(adjustmentRow),
    stripePaymentIntentId: paymentIntentId,
    stripePaymentStatus: 'succeeded',
  });

  const receiptUrl = paymentIntent.latest_charge?.receipt_url || null;

  await createBookingAdjustmentInvoice(adjustmentRow, paymentIntentId, {
    status: 'paid',
    description: `${adjustmentRow.resource_name} booking adjustment`,
    currency: adjustmentRow.currency || 'gbp',
    subtotalMinor: Number(adjustmentRow.subtotal_minor || 0),
    taxMinor: Number(adjustmentRow.tax_minor || 0),
    totalMinor: Number(adjustmentRow.total_minor || 0),
    hostedInvoiceUrl: receiptUrl,
    paidAt: new Date(),
  });

  await markBookingAdjustmentStatus(adjustmentRow.id, 'completed', {
    stripePaymentIntentId: paymentIntentId,
    clearHold: true,
  });

  const bookings = await listUserBookings(userId);
  return bookings.find((booking) => booking.id === Number(bookingRow.id)) || null;
}

export async function syncBookingAdjustmentCheckoutSession({ userId, sessionId }) {
  await expireStalePendingBookings();
  await expireStalePendingBookingAdjustments();

  const session = await retrieveStripeCheckoutSession(sessionId);
  const sessionUserId = Number(session.metadata?.app_user_id || 0);
  const adjustmentId = Number(session.metadata?.booking_adjustment_id || 0);

  if (!sessionUserId || sessionUserId !== userId) {
    throw new Error('Checkout session does not belong to this user.');
  }

  if (!adjustmentId) {
    throw new Error('Booking adjustment session is missing adjustment metadata.');
  }

  const adjustmentRow = await getBookingAdjustmentRowByCheckoutSessionId(sessionId)
    || await getBookingAdjustmentRowById(adjustmentId);

  if (!adjustmentRow || Number(adjustmentRow.user_id) !== userId) {
    throw new Error('Booking adjustment was not found.');
  }

  if (adjustmentRow.status === 'completed') {
    const bookings = await listUserBookings(userId);
    return bookings.find((booking) => booking.id === Number(adjustmentRow.booking_id)) || null;
  }

  if (adjustmentRow.status !== 'pending_payment') {
    throw new Error('This booking adjustment is no longer awaiting payment.');
  }

  if (session.payment_status !== 'paid') {
    throw new Error('Stripe checkout payment has not completed yet.');
  }

  const paymentIntentId = typeof session.payment_intent === 'string'
    ? session.payment_intent
    : session.payment_intent?.id || null;

  if (!paymentIntentId) {
    throw new Error('Stripe checkout payment intent is missing.');
  }

  const bookingRow = await getBookingRowForUser(userId, Number(adjustmentRow.booking_id));

  if (!bookingRow || bookingRow.status !== 'confirmed') {
    throw new Error('The original booking can no longer be adjusted.');
  }

  try {
    await validateAvailability({
      resourceId: Number(adjustmentRow.resource_id),
      startAt: adjustmentRow.start_at,
      endAt: adjustmentRow.end_at,
      excludeBookingId: bookingRow.id,
      excludeAdjustmentId: adjustmentRow.id,
      skipExpiryCleanup: true,
    });
  } catch (error) {
    await createBookingAdjustmentInvoice(adjustmentRow, paymentIntentId, {
      ...getCheckoutSessionFinancials(session, adjustmentRow),
      paidAt: new Date(),
      description: `${adjustmentRow.resource_name} booking adjustment`,
    });

    await refundBookingAmount({
      bookingId: Number(adjustmentRow.booking_id),
      userId,
      amountMinor: Number(session.amount_total || adjustmentRow.adjustment_minor || 0),
      reason: 'requested_by_customer',
      metadata: {
        app_user_id: String(userId),
        booking_id: String(adjustmentRow.booking_id),
        booking_adjustment_id: String(adjustmentRow.id),
        booking_adjustment_refund: 'resource_conflict',
      },
    });

    await markBookingAdjustmentStatus(adjustmentRow.id, 'refunded', {
      stripePaymentIntentId: paymentIntentId,
      clearHold: true,
    });

    throw new Error('The updated booking slot is no longer available. The extra payment was automatically refunded.');
  }

  await applyBookingUpdate({
    bookingId: bookingRow.id,
    resourceId: Number(adjustmentRow.resource_id),
    startAt: adjustmentRow.start_at,
    endAt: adjustmentRow.end_at,
    purpose: String(adjustmentRow.purpose || ''),
    notes: String(adjustmentRow.notes || ''),
    financials: getBookingFinancials(adjustmentRow),
    stripePaymentIntentId: paymentIntentId,
    stripePaymentStatus: 'succeeded',
  });

  await createBookingAdjustmentInvoice(adjustmentRow, paymentIntentId, {
    ...getCheckoutSessionFinancials(session, adjustmentRow),
    paidAt: new Date(),
    description: `${adjustmentRow.resource_name} booking adjustment`,
  });

  await markBookingAdjustmentStatus(adjustmentRow.id, 'completed', {
    stripePaymentIntentId: paymentIntentId,
    clearHold: true,
  });

  const bookings = await listUserBookings(userId);
  return bookings.find((booking) => booking.id === Number(bookingRow.id)) || null;
}

export async function cancelBookingAdjustment({ userId, adjustmentId }) {
  await expireStalePendingBookingAdjustments();

  const adjustmentRow = await getBookingAdjustmentRowById(adjustmentId);

  if (!adjustmentRow || Number(adjustmentRow.user_id) !== userId) {
    throw new Error('Booking adjustment was not found.');
  }

  if (adjustmentRow.status !== 'pending_payment') {
    return getBookingAdjustmentRowById(adjustmentId);
  }

  if (isStripeEnabled() && adjustmentRow.stripe_checkout_session_id) {
    await expireStripeCheckoutSession(adjustmentRow.stripe_checkout_session_id).catch((err) => console.error('[Stripe cleanup] Non-fatal error:', err.message));
  }

  await markBookingAdjustmentStatus(adjustmentId, 'canceled', { clearHold: true });
  return getBookingAdjustmentRowById(adjustmentId);
}

export async function handleBookingPaymentIntentSucceeded(paymentIntent) {
  if (Number(paymentIntent?.metadata?.booking_adjustment_id || 0)) {
    return null;
  }

  const paymentIntentId = paymentIntent?.id || null;
  const metadataBookingId = Number(paymentIntent?.metadata?.booking_id || 0);
  const bookingRow = await getBookingRowByPaymentIntentId(paymentIntentId)
    || (metadataBookingId ? await getBookingRowById(metadataBookingId) : null);

  if (!bookingRow || !paymentIntentId) {
    return null;
  }

  const latestCharge = paymentIntent.latest_charge;
  const chargeReceiptUrl = (latestCharge && typeof latestCharge === 'object')
    ? latestCharge.receipt_url || null
    : null;
  const invoiceFinancials = chargeReceiptUrl
    ? { hostedInvoiceUrl: chargeReceiptUrl, invoicePdf: chargeReceiptUrl }
    : null;

  return (await finalizeBookingAfterSuccessfulPayment(
    bookingRow,
    paymentIntentId,
    paymentIntent.status || 'succeeded',
    invoiceFinancials,
  )).bookingRow;
}

export async function handleBookingPaymentIntentFailed(paymentIntent) {
  const adjustmentId = Number(paymentIntent?.metadata?.booking_adjustment_id || 0);

  if (adjustmentId) {
    const adjustmentRow = await getBookingAdjustmentRowById(adjustmentId);

    if (adjustmentRow?.status === 'pending_payment') {
      await markBookingAdjustmentStatus(adjustmentId, 'failed', { clearHold: true });
    }

    return adjustmentRow;
  }

  const paymentIntentId = paymentIntent?.id || null;
  const metadataBookingId = Number(paymentIntent?.metadata?.booking_id || 0);
  const bookingRow = await getBookingRowByPaymentIntentId(paymentIntentId)
    || (metadataBookingId ? await getBookingRowById(metadataBookingId) : null);

  if (!bookingRow || bookingRow.status !== 'pending') {
    return bookingRow;
  }

  await markPendingBookingCanceled(
    bookingRow,
    paymentIntent?.status || paymentIntent?.last_payment_error?.code || 'payment_failed',
  );

  return getBookingRowById(bookingRow.id);
}

export async function handleBookingCheckoutExpired(session) {
  if (Number(session?.metadata?.booking_adjustment_id || 0)) {
    return handleBookingAdjustmentCheckoutExpired(session);
  }

  const sessionId = session?.id || null;
  const metadataBookingId = Number(session?.metadata?.booking_id || 0);
  const bookingRow = await getBookingRowByCheckoutSessionId(sessionId)
    || (metadataBookingId ? await getBookingRowById(metadataBookingId) : null);

  if (!bookingRow || bookingRow.status !== 'pending') {
    return bookingRow;
  }

  await markPendingBookingCanceled(bookingRow, 'expired');
  return getBookingRowById(bookingRow.id);
}

export async function handleBookingAdjustmentCheckoutExpired(session) {
  const adjustmentId = Number(session?.metadata?.booking_adjustment_id || 0);
  const adjustmentRow = await getBookingAdjustmentRowByCheckoutSessionId(session?.id || null)
    || (adjustmentId ? await getBookingAdjustmentRowById(adjustmentId) : null);

  if (!adjustmentRow || adjustmentRow.status !== 'pending_payment') {
    return adjustmentRow;
  }

  await markBookingAdjustmentStatus(adjustmentRow.id, 'expired', { clearHold: true });
  return getBookingAdjustmentRowById(adjustmentRow.id);
}

export async function handleBookingAdjustmentInvoicePaid(invoice) {
  const adjustmentId = Number(invoice?.metadata?.booking_adjustment_id || 0);
  const paymentIntentId = extractInvoicePaymentIntentId(invoice);
  const adjustmentRow = adjustmentId ? await getBookingAdjustmentRowById(adjustmentId) : null;

  if (!adjustmentRow || !paymentIntentId) {
    return null;
  }

  await createBookingAdjustmentInvoice(adjustmentRow, paymentIntentId, {
    ...getInvoiceFinancials(invoice, adjustmentRow),
    stripeInvoiceId: invoice?.id || null,
    invoiceNumber: invoice?.number || null,
    hostedInvoiceUrl: invoice?.hosted_invoice_url || null,
    invoicePdf: invoice?.invoice_pdf || null,
    paidAt: invoice?.status_transitions?.paid_at
      ? new Date(invoice.status_transitions.paid_at * 1000)
      : new Date(),
    description: `${adjustmentRow.resource_name} booking adjustment`,
  });

  return adjustmentRow;
}

export async function handleBookingInvoicePaid(invoice) {
  if (Number(invoice?.metadata?.booking_adjustment_id || 0)) {
    return handleBookingAdjustmentInvoicePaid(invoice);
  }

  const paymentIntentId = extractInvoicePaymentIntentId(invoice);
  const metadataBookingId = Number(invoice?.metadata?.booking_id || 0);

  let bookingRow = await getBookingRowByPaymentIntentId(paymentIntentId)
    || (metadataBookingId ? await getBookingRowById(metadataBookingId) : null);

  if (!bookingRow || !paymentIntentId) {
    return null;
  }

  const invoiceOptions = {
    ...getInvoiceFinancials(invoice, bookingRow),
    stripeInvoiceId: invoice?.id || null,
    invoiceNumber: invoice?.number || null,
    hostedInvoiceUrl: invoice?.hosted_invoice_url || null,
    invoicePdf: invoice?.invoice_pdf || null,
  };
  const paidAt = invoice?.status_transitions?.paid_at
    ? new Date(invoice.status_transitions.paid_at * 1000)
    : new Date();

  if (bookingRow.status === 'pending') {
    const outcome = await finalizeBookingAfterSuccessfulPayment(
      bookingRow,
      paymentIntentId,
      invoice?.status || 'paid',
      invoiceOptions,
    );

    bookingRow = outcome.bookingRow || bookingRow;
  } else {
    await syncBookingFinancials(bookingRow.id, getBookingFinancials(bookingRow, invoiceOptions));
    bookingRow = await getBookingRowById(bookingRow.id);
    await createBookingInvoiceIfMissing(
      bookingRow,
      paymentIntentId,
      invoice?.status || 'paid',
      paidAt,
      invoiceOptions,
    );
  }

  return bookingRow;
}

export async function handleBookingInvoicePaymentFailed(invoice) {
  const adjustmentId = Number(invoice?.metadata?.booking_adjustment_id || 0);

  if (adjustmentId) {
    const adjustmentRow = await getBookingAdjustmentRowById(adjustmentId);

    if (adjustmentRow?.status === 'pending_payment') {
      await markBookingAdjustmentStatus(adjustmentId, 'failed', { clearHold: true });
    }

    return adjustmentRow;
  }

  const paymentIntentId = extractInvoicePaymentIntentId(invoice);
  const metadataBookingId = Number(invoice?.metadata?.booking_id || 0);
  let bookingRow = await getBookingRowByPaymentIntentId(paymentIntentId)
    || (metadataBookingId ? await getBookingRowById(metadataBookingId) : null);

  if (!bookingRow) {
    return null;
  }

  const financials = getInvoiceFinancials(invoice, bookingRow);
  await syncBookingFinancials(bookingRow.id, financials);

  if (bookingRow.status === 'pending') {
    await markPendingBookingCanceled(bookingRow, invoice?.status || 'payment_failed');
  } else {
    await execute(
      `UPDATE bookings
          SET stripe_payment_status = :stripePaymentStatus,
              updated_at = :updatedAt
        WHERE id = :bookingId`,
      {
        bookingId: bookingRow.id,
        stripePaymentStatus: invoice?.status || 'payment_failed',
        updatedAt: new Date(),
      },
    );
  }

  bookingRow = await getBookingRowById(bookingRow.id);

  await upsertStripeInvoice({
    userId: Number(bookingRow.user_id),
    membershipId: bookingRow.membership_id ? Number(bookingRow.membership_id) : null,
    bookingId: Number(bookingRow.id),
    stripeInvoiceId: invoice?.id || null,
    stripePaymentIntentId: paymentIntentId || bookingRow.stripe_payment_intent_id || null,
    invoiceNumber: invoice?.number || `BK-${bookingRow.id}`,
    status: invoice?.status || 'payment_failed',
    description: `${bookingRow.resource_name} booking`,
    currency: financials.currency,
    subtotalMinor: financials.subtotalMinor,
    taxMinor: financials.taxMinor,
    totalMinor: financials.totalMinor,
    hostedInvoiceUrl: invoice?.hosted_invoice_url || null,
    invoicePdf: invoice?.invoice_pdf || null,
    paidAt: null,
  });

  return bookingRow;
}

export async function initiateGuestMeetingRoomBookingPayment({
  guestName,
  guestEmail,
  resourceId,
  startAt,
  endAt,
  purpose = '',
  notes = '',
}) {
  const guestUser = await createOrGetGuestUser({
    name: guestName,
    email: guestEmail,
  });

  if (!guestUser?.id) {
    throw new Error('Guest booking user could not be created.');
  }

  return initiateBookingPayment({
    userId: guestUser.id,
    resourceId,
    bookingType: 'meeting_room',
    startAt,
    endAt,
    purpose,
    notes,
  });
}

export async function initiateGuestMeetingRoomBookingCheckout({
  guestName,
  guestEmail,
  resourceId,
  startAt,
  endAt,
  purpose = '',
  notes = '',
  successUrl,
  cancelUrl,
}) {
  const guestUser = await createOrGetGuestUser({
    name: guestName,
    email: guestEmail,
  });

  if (!guestUser?.id) {
    throw new Error('Guest booking user could not be created.');
  }

  return initiateBookingCheckout({
    userId: guestUser.id,
    resourceId,
    bookingType: 'meeting_room',
    startAt,
    endAt,
    purpose,
    notes,
    successUrl,
    cancelUrl,
  });
}

export async function confirmGuestMeetingRoomBookingPayment({
  guestEmail,
  bookingId,
  paymentIntentId,
}) {
  const guestUser = await findUserByEmail(guestEmail);

  if (!guestUser?.user?.id) {
    throw new Error('Guest booking was not found.');
  }

  return confirmBookingPayment({
    userId: guestUser.user.id,
    bookingId,
    paymentIntentId,
  });
}

export async function cancelGuestMeetingRoomBookingPayment({
  guestEmail,
  bookingId,
  paymentIntentId = '',
}) {
  const guestUser = await findUserByEmail(guestEmail);

  if (!guestUser?.user?.id) {
    throw new Error('Guest booking was not found.');
  }

  return cancelPendingBooking({
    userId: guestUser.user.id,
    bookingId,
    paymentIntentId,
  });
}

export async function syncGuestMeetingRoomBookingCheckout({
  guestEmail,
  sessionId,
}) {
  const guestUser = await findUserByEmail(guestEmail);

  if (!guestUser?.user?.id) {
    throw new Error('Guest booking was not found.');
  }

  return syncBookingCheckoutSession({
    userId: guestUser.user.id,
    sessionId,
  });
}
