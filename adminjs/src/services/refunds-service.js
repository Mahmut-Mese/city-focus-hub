import { randomUUID } from 'node:crypto';
import { execute, queryAll, queryOne } from './sql.js';
import { createStripeRefund } from './stripe-service.js';

function normalizeRefundStatus(status) {
  const normalized = String(status || '').trim().toLowerCase();
  return normalized || 'pending';
}

function deriveInvoiceRefundStatus(totalMinor, refundedMinor, fallbackStatus = 'paid') {
  if (refundedMinor <= 0) {
    return fallbackStatus;
  }

  if (refundedMinor >= totalMinor) {
    return 'refunded';
  }

  return 'partially_refunded';
}

async function findInvoiceByPaymentIntentId(stripePaymentIntentId) {
  if (!stripePaymentIntentId) {
    return null;
  }

  return queryOne(
    'SELECT * FROM invoices WHERE stripe_payment_intent_id = :stripePaymentIntentId ORDER BY id DESC LIMIT 1',
    { stripePaymentIntentId },
  );
}

async function findBookingByPaymentIntentId(stripePaymentIntentId) {
  if (!stripePaymentIntentId) {
    return null;
  }

  return queryOne(
    'SELECT * FROM bookings WHERE stripe_payment_intent_id = :stripePaymentIntentId ORDER BY id DESC LIMIT 1',
    { stripePaymentIntentId },
  );
}

async function resolveRefundOwner(stripePaymentIntentId) {
  const [invoice, booking] = await Promise.all([
    findInvoiceByPaymentIntentId(stripePaymentIntentId),
    findBookingByPaymentIntentId(stripePaymentIntentId),
  ]);

  return {
    userId: invoice?.user_id ? Number(invoice.user_id) : (booking?.user_id ? Number(booking.user_id) : null),
    membershipId: invoice?.membership_id ? Number(invoice.membership_id) : (booking?.membership_id ? Number(booking.membership_id) : null),
    bookingId: invoice?.booking_id ? Number(invoice.booking_id) : (booking?.id ? Number(booking.id) : null),
    currency: invoice?.currency || booking?.currency || 'gbp',
  };
}

async function sumRefundedMinor(stripePaymentIntentId) {
  if (!stripePaymentIntentId) {
    return 0;
  }

  const row = await queryOne(
    `SELECT COALESCE(SUM(amount_minor), 0) AS refunded_minor
       FROM refunds
      WHERE stripe_payment_intent_id = :stripePaymentIntentId
        AND status = 'succeeded'`,
    { stripePaymentIntentId },
  );

  return Number(row?.refunded_minor || 0);
}

async function sumBookingRefundedMinor(bookingId) {
  if (!bookingId) {
    return 0;
  }

  const row = await queryOne(
    `SELECT COALESCE(SUM(amount_minor), 0) AS refunded_minor
       FROM refunds
      WHERE booking_id = :bookingId
        AND status = 'succeeded'`,
    { bookingId },
  );

  return Number(row?.refunded_minor || 0);
}

async function sumBookingChargedMinor(bookingId) {
  if (!bookingId) {
    return 0;
  }

  const row = await queryOne(
    `SELECT COALESCE(SUM(total_minor), 0) AS charged_minor
       FROM invoices
      WHERE booking_id = :bookingId
        AND stripe_payment_intent_id IS NOT NULL`,
    { bookingId },
  );

  return Number(row?.charged_minor || 0);
}

async function syncBookingRefundState(bookingId) {
  if (!bookingId) {
    return;
  }

  const booking = await queryOne('SELECT * FROM bookings WHERE id = :bookingId LIMIT 1', { bookingId });

  if (!booking) {
    return;
  }

  const [chargedMinor, refundedMinor] = await Promise.all([
    sumBookingChargedMinor(bookingId),
    sumBookingRefundedMinor(bookingId),
  ]);

  const netPaidMinor = Math.max(0, chargedMinor - refundedMinor);
  let nextStatus = booking.status;
  let nextPaymentStatus = booking.stripe_payment_status || 'succeeded';

  if (refundedMinor > 0 && netPaidMinor <= 0) {
    nextStatus = 'canceled';
    nextPaymentStatus = 'refunded';
  } else if (refundedMinor > 0 && refundedMinor < chargedMinor) {
    // P1-38: Detect partial refund regardless of booking status (not just 'canceled')
    nextStatus = booking.status === 'canceled' ? 'canceled' : booking.status;
    nextPaymentStatus = 'partially_refunded';
  } else if (booking.status !== 'pending') {
    nextStatus = booking.status === 'canceled' ? 'canceled' : 'confirmed';
    nextPaymentStatus = 'succeeded';
  }

  await execute(
    `UPDATE bookings
        SET status = :status,
            stripe_payment_status = :stripePaymentStatus,
            updated_at = :updatedAt
      WHERE id = :bookingId`,
    {
      bookingId,
      status: nextStatus,
      stripePaymentStatus: nextPaymentStatus,
      updatedAt: new Date(),
    },
  );
}

async function listRefundableBookingPayments(bookingId) {
  if (!bookingId) {
    return [];
  }

  return queryAll(
    `SELECT invoices.*,
            COALESCE(refund_totals.refunded_minor, 0) AS refunded_minor
       FROM invoices
       LEFT JOIN (
         SELECT stripe_payment_intent_id,
                SUM(amount_minor) AS refunded_minor
           FROM refunds
          WHERE status = 'succeeded'
          GROUP BY stripe_payment_intent_id
       ) AS refund_totals
         ON refund_totals.stripe_payment_intent_id = invoices.stripe_payment_intent_id
      WHERE invoices.booking_id = :bookingId
        AND invoices.stripe_payment_intent_id IS NOT NULL
      ORDER BY COALESCE(invoices.paid_at, invoices.created_at) DESC, invoices.id DESC`,
    { bookingId },
  );
}

async function listRefundableMembershipPayments(membershipId) {
  if (!membershipId) {
    return [];
  }

  return queryAll(
    `SELECT invoices.*,
            COALESCE(refund_totals.refunded_minor, 0) AS refunded_minor
       FROM invoices
       LEFT JOIN (
         SELECT stripe_payment_intent_id,
                SUM(amount_minor) AS refunded_minor
           FROM refunds
          WHERE status = 'succeeded'
          GROUP BY stripe_payment_intent_id
       ) AS refund_totals
         ON refund_totals.stripe_payment_intent_id = invoices.stripe_payment_intent_id
      WHERE invoices.membership_id = :membershipId
        AND invoices.stripe_payment_intent_id IS NOT NULL
      ORDER BY COALESCE(invoices.paid_at, invoices.created_at) DESC, invoices.id DESC`,
    { membershipId },
  );
}

async function refundInvoicePayments({
  refundableInvoices,
  userId = null,
  membershipId = null,
  bookingId = null,
  amountMinor,
  reason = 'requested_by_customer',
  metadata = {},
  insufficientBalanceMessage,
}) {
  const targetAmountMinor = Number(amountMinor || 0);

  if (!Number.isFinite(targetAmountMinor) || targetAmountMinor <= 0) {
    return [];
  }

  // P0-15: Pre-validate that sufficient refundable balance exists BEFORE issuing any Stripe refunds
  let totalAvailableMinor = 0;
  for (const invoice of refundableInvoices) {
    const availableMinor = Math.max(0, Number(invoice.total_minor || 0) - Number(invoice.refunded_minor || 0));
    const stripePaymentIntentId = invoice.stripe_payment_intent_id || null;
    if (stripePaymentIntentId && availableMinor > 0) {
      totalAvailableMinor += availableMinor;
    }
  }

  if (totalAvailableMinor < targetAmountMinor) {
    throw new Error(insufficientBalanceMessage);
  }

  let remainingMinor = targetAmountMinor;
  const refunds = [];

  for (const invoice of refundableInvoices) {
    const availableMinor = Math.max(0, Number(invoice.total_minor || 0) - Number(invoice.refunded_minor || 0));
    const stripePaymentIntentId = invoice.stripe_payment_intent_id || null;

    if (!stripePaymentIntentId || availableMinor <= 0) {
      continue;
    }

    const refundAmountMinor = Math.min(availableMinor, remainingMinor);
    const refund = await createStripeRefund({
      paymentIntentId: stripePaymentIntentId,
      amountMinor: refundAmountMinor,
      reason,
      metadata,
    });

    await upsertStripeRefund({
      userId: userId ?? (invoice.user_id ? Number(invoice.user_id) : null),
      membershipId: membershipId ?? (invoice.membership_id ? Number(invoice.membership_id) : null),
      bookingId: bookingId ?? (invoice.booking_id ? Number(invoice.booking_id) : null),
      stripeRefundId: refund.id,
      stripeChargeId: typeof refund.charge === 'string' ? refund.charge : refund.charge?.id || null,
      stripePaymentIntentId,
      amountMinor: Number(refund.amount || refundAmountMinor),
      currency: refund.currency || invoice.currency || 'gbp',
      status: refund.status || 'pending',
      reason: refund.reason || reason,
      rawPayload: refund,
    });

    refunds.push(refund);
    remainingMinor -= refundAmountMinor;

    if (remainingMinor <= 0) {
      break;
    }
  }

  return refunds;
}

export async function upsertStripeRefund({
  userId = null,
  membershipId = null,
  bookingId = null,
  stripeRefundId,
  stripeChargeId = null,
  stripePaymentIntentId = null,
  amountMinor = 0,
  currency = 'gbp',
  status = 'pending',
  reason = null,
  rawPayload = null,
}) {
  const existing = await queryOne(
    'SELECT id FROM refunds WHERE stripe_refund_id = :stripeRefundId LIMIT 1',
    { stripeRefundId },
  );

  const normalizedStatus = normalizeRefundStatus(status);
  const now = new Date();

  if (existing?.id) {
    await execute(
      `UPDATE refunds
          SET user_id = :userId,
              membership_id = :membershipId,
              booking_id = :bookingId,
              stripe_charge_id = :stripeChargeId,
              stripe_payment_intent_id = :stripePaymentIntentId,
              amount_minor = :amountMinor,
              currency = :currency,
              status = :status,
              reason = :reason,
              raw_payload = :rawPayload,
              updated_at = :updatedAt
        WHERE id = :refundId`,
      {
        refundId: existing.id,
        userId,
        membershipId,
        bookingId,
        stripeChargeId,
        stripePaymentIntentId,
        amountMinor,
        currency,
        status: normalizedStatus,
        reason,
        rawPayload: rawPayload ? JSON.stringify(rawPayload) : null,
        updatedAt: now,
      },
    );
  } else {
    await execute(
      `INSERT INTO refunds
        (document_id, user_id, membership_id, booking_id, stripe_refund_id, stripe_charge_id, stripe_payment_intent_id, amount_minor, currency, status, reason, raw_payload, created_at, updated_at)
       VALUES
        (:documentId, :userId, :membershipId, :bookingId, :stripeRefundId, :stripeChargeId, :stripePaymentIntentId, :amountMinor, :currency, :status, :reason, :rawPayload, :createdAt, :updatedAt)`,
      {
        documentId: randomUUID(),
        userId,
        membershipId,
        bookingId,
        stripeRefundId,
        stripeChargeId,
        stripePaymentIntentId,
        amountMinor,
        currency,
        status: normalizedStatus,
        reason,
        rawPayload: rawPayload ? JSON.stringify(rawPayload) : null,
        createdAt: now,
        updatedAt: now,
      },
    );
  }

  if (stripePaymentIntentId) {
    await syncRefundStateForPaymentIntent(stripePaymentIntentId);
  }
}

export async function syncRefundStateForPaymentIntent(stripePaymentIntentId) {
  if (!stripePaymentIntentId) {
    return;
  }

  const [invoice, booking, refundedMinor] = await Promise.all([
    findInvoiceByPaymentIntentId(stripePaymentIntentId),
    findBookingByPaymentIntentId(stripePaymentIntentId),
    sumRefundedMinor(stripePaymentIntentId),
  ]);

  if (invoice) {
    await execute(
      `UPDATE invoices
          SET status = :status,
              updated_at = :updatedAt
        WHERE id = :invoiceId`,
      {
        invoiceId: invoice.id,
        status: deriveInvoiceRefundStatus(Number(invoice.total_minor || 0), refundedMinor, invoice.status || 'paid'),
        updatedAt: new Date(),
      },
    );
  }

  await syncBookingRefundState(Number(invoice?.booking_id || booking?.id || 0));
}

export async function handleChargeRefunded(charge) {
  const stripeChargeId = charge?.id || null;
  const stripePaymentIntentId = typeof charge?.payment_intent === 'string'
    ? charge.payment_intent
    : charge?.payment_intent?.id || null;
  const owner = await resolveRefundOwner(stripePaymentIntentId);
  const refunds = Array.isArray(charge?.refunds?.data) ? charge.refunds.data : [];

  // P1-39: Guard for empty refunds array — Stripe may send charge.refunded with no inline refund data
  if (refunds.length === 0) {
    console.warn(`[handleChargeRefunded] charge ${stripeChargeId} has empty refunds.data — skipping. Payment intent: ${stripePaymentIntentId}`);
    return;
  }

  for (const refund of refunds) {
    await upsertStripeRefund({
      userId: owner.userId,
      membershipId: owner.membershipId,
      bookingId: owner.bookingId,
      stripeRefundId: refund.id,
      stripeChargeId,
      stripePaymentIntentId,
      amountMinor: Number(refund.amount || 0),
      currency: refund.currency || owner.currency,
      status: refund.status || 'pending',
      reason: refund.reason || null,
      rawPayload: refund,
    });
  }
}

export async function handleStripeRefundUpdated(refund) {
  if (!refund?.id) {
    return;
  }

  const stripePaymentIntentId = typeof refund?.payment_intent === 'string'
    ? refund.payment_intent
    : refund?.payment_intent?.id || null;
  const owner = await resolveRefundOwner(stripePaymentIntentId);

  await upsertStripeRefund({
    userId: owner.userId,
    membershipId: owner.membershipId,
    bookingId: owner.bookingId,
    stripeRefundId: refund?.id,
    stripeChargeId: typeof refund?.charge === 'string' ? refund.charge : refund?.charge?.id || null,
    stripePaymentIntentId,
    amountMinor: Number(refund?.amount || 0),
    currency: refund?.currency || owner.currency,
    status: refund?.status || 'pending',
    reason: refund?.reason || null,
    rawPayload: refund,
  });
}

export async function refundBookingAmount({
  bookingId,
  userId = null,
  membershipId = null,
  amountMinor,
  reason = 'requested_by_customer',
  metadata = {},
  invoiceId = null,
}) {
  let refundableInvoices = await listRefundableBookingPayments(bookingId);

  // P1-30: When a specific invoiceId is provided, scope refund to that invoice only
  if (invoiceId) {
    refundableInvoices = refundableInvoices.filter((inv) => Number(inv.id) === Number(invoiceId));
  }

  return refundInvoicePayments({
    refundableInvoices,
    userId,
    membershipId,
    bookingId,
    amountMinor,
    reason,
    metadata,
    insufficientBalanceMessage: 'Booking refund amount exceeds the paid balance.',
  });
}

export async function refundMembershipAmount({
  membershipId,
  userId = null,
  amountMinor,
  reason = 'requested_by_customer',
  metadata = {},
  invoiceId = null,
}) {
  let refundableInvoices = await listRefundableMembershipPayments(membershipId);

  // P1-30: When a specific invoiceId is provided, scope refund to that invoice only
  if (invoiceId) {
    refundableInvoices = refundableInvoices.filter((inv) => Number(inv.id) === Number(invoiceId));
  }

  return refundInvoicePayments({
    refundableInvoices,
    userId,
    membershipId,
    amountMinor,
    reason,
    metadata,
    insufficientBalanceMessage: 'Membership refund amount exceeds the paid balance.',
  });
}

export async function listRefundsByPaymentIntent(stripePaymentIntentId) {
  const rows = await queryAll(
    'SELECT * FROM refunds WHERE stripe_payment_intent_id = :stripePaymentIntentId ORDER BY created_at DESC, id DESC',
    { stripePaymentIntentId },
  );

  return rows.map((row) => ({
    id: Number(row.id),
    stripeRefundId: row.stripe_refund_id,
    stripeChargeId: row.stripe_charge_id || null,
    stripePaymentIntentId: row.stripe_payment_intent_id || null,
    amountMinor: Number(row.amount_minor || 0),
    currency: row.currency || 'gbp',
    status: row.status || 'pending',
    reason: row.reason || null,
    createdAt: row.created_at || null,
  }));
}
