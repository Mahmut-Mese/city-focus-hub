import { randomUUID } from 'node:crypto';
import { config } from '../config.js';
import { sequelize } from '../database.js';
import { execute, queryAll, queryOne } from './sql.js';
import {
  cancelStripePaymentIntent,
  cancelStripeSubscription,
  createImmediateMockPayment,
  createMembershipAdjustmentCheckoutSession,
  createMembershipUpgradePaymentIntentDraft,
  createStripeCheckoutSession,
  createStripeSubscription,
  createStripeSubscriptionIncomplete,
  ensurePlanStripePrice,
  ensureStripeCustomer,
  expireStripeCheckoutSession,
  isMockStripePaymentsEnabled,
  listStripePaymentIntents,
  previewStripeSubscriptionPlanChange,
  retrieveStripeCheckoutSession,
  retrieveStripePaymentIntent,
  retrieveStripeSubscription,
  updateStripeSubscriptionPlan,
} from './stripe-service.js';
import { findUserById, updateUserAccessStatus } from './users-service.js';
import { createLocalInvoice, upsertStripeInvoice } from './invoices-service.js';
import { refundMembershipAmount } from './refunds-service.js';

function toMembership(row) {
  if (!row) {
    return null;
  }

  return {
    id: Number(row.id),
    userId: Number(row.user_id),
    planId: Number(row.plan_id),
    planSlug: String(row.plan_slug),
    planName: String(row.plan_name),
    monthlyPriceMinor: Number(row.monthly_price_minor || 0),
    currency: String(row.currency || 'gbp'),
    status: String(row.status),
    stripeSubscriptionId: row.stripe_subscription_id || null,
    stripePriceId: row.stripe_price_id || null,
    cancelAtPeriodEnd: Boolean(row.cancel_at_period_end),
    currentPeriodStart: row.current_period_start || null,
    currentPeriodEnd: row.current_period_end || null,
    failedPaymentCount: Number(row.failed_payment_count || 0),
  };
}

const MEMBERSHIP_ADJUSTMENT_SELECT_QUERY = `SELECT membership_adjustments.*,
       current_plan.slug AS current_plan_slug,
       current_plan.name AS current_plan_name,
       current_plan.monthly_price_minor AS current_plan_monthly_price_minor,
       current_plan.currency AS current_plan_currency,
       target_plan.slug AS target_plan_slug,
       target_plan.name AS target_plan_name,
       target_plan.monthly_price_minor AS target_plan_monthly_price_minor,
       target_plan.currency AS target_plan_currency
  FROM membership_adjustments
  INNER JOIN membership_plans AS current_plan ON current_plan.id = membership_adjustments.current_plan_id
  INNER JOIN membership_plans AS target_plan ON target_plan.id = membership_adjustments.target_plan_id`;

function getMembershipAdjustmentHoldExpiryDate(baseDate = new Date()) {
  const expiresAt = new Date(baseDate);
  const holdMinutes = Math.max(5, Number(config.bookings.paymentHoldMinutes || 20));
  expiresAt.setMinutes(expiresAt.getMinutes() + holdMinutes);
  return expiresAt;
}

function isMembershipAdjustmentHoldExpired(adjustmentRow, now = Date.now()) {
  const expiresAt = adjustmentRow?.payment_hold_expires_at
    ? new Date(adjustmentRow.payment_hold_expires_at).getTime()
    : null;

  if (!expiresAt || Number.isNaN(expiresAt)) {
    return false;
  }

  return expiresAt <= now;
}

function normalizeMinorAmount(value, fallback = 0) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? Math.round(normalized) : fallback;
}

function getMembershipChangeSettlement(preview) {
  const subtotalMinor = normalizeMinorAmount(preview?.subtotalMinor);
  const taxMinor = normalizeMinorAmount(preview?.taxMinor);
  const totalMinor = normalizeMinorAmount(preview?.totalMinor);
  const paymentDueMinor = Math.max(0, totalMinor);
  const refundMinor = Math.max(0, totalMinor * -1);

  return {
    action: paymentDueMinor > 0 ? 'payment_required' : (refundMinor > 0 ? 'refunded' : 'updated'),
    currency: String(preview?.currency || 'gbp').toLowerCase(),
    subtotalMinor: Math.max(0, subtotalMinor),
    taxMinor: Math.max(0, taxMinor),
    totalMinor,
    paymentDueMinor,
    refundMinor,
  };
}

export async function getPlanBySlug(planSlug) {
  return queryOne(
    'SELECT * FROM membership_plans WHERE slug = :planSlug AND active = 1 LIMIT 1',
    { planSlug },
  );
}

export async function listPlans() {
  const rows = await queryAll(
    'SELECT * FROM membership_plans WHERE active = 1 ORDER BY monthly_price_minor ASC, id ASC',
  );

  return rows.map((row) => ({
    id: Number(row.id),
    slug: row.slug,
    name: row.name,
    description: row.description || '',
    monthlyPriceMinor: Number(row.monthly_price_minor || 0),
    currency: row.currency || 'gbp',
    features: typeof row.features === 'string' ? JSON.parse(row.features) : (row.features || []),
  }));
}

export async function getUserMembership(userId) {
  const row = await queryOne(
    `SELECT memberships.*, membership_plans.slug AS plan_slug, membership_plans.name AS plan_name, membership_plans.monthly_price_minor, membership_plans.currency
       FROM memberships
       INNER JOIN membership_plans ON membership_plans.id = memberships.plan_id
      WHERE memberships.user_id = :userId
      ORDER BY memberships.id DESC
      LIMIT 1`,
    { userId },
  );

  return toMembership(row);
}

async function getMembershipByStripeSubscriptionId(subscriptionId) {
  const row = await queryOne(
    `SELECT memberships.*, membership_plans.slug AS plan_slug, membership_plans.name AS plan_name, membership_plans.monthly_price_minor, membership_plans.currency
       FROM memberships
       INNER JOIN membership_plans ON membership_plans.id = memberships.plan_id
      WHERE memberships.stripe_subscription_id = :subscriptionId
      LIMIT 1`,
    { subscriptionId },
  );

  return toMembership(row);
}

async function getMembershipAdjustmentRowById(adjustmentId) {
  if (!adjustmentId) {
    return null;
  }

  return queryOne(
    `${MEMBERSHIP_ADJUSTMENT_SELECT_QUERY}
      WHERE membership_adjustments.id = :adjustmentId
      LIMIT 1`,
    { adjustmentId },
  );
}

async function getMembershipAdjustmentRowByCheckoutSessionId(checkoutSessionId) {
  if (!checkoutSessionId) {
    return null;
  }

  return queryOne(
    `${MEMBERSHIP_ADJUSTMENT_SELECT_QUERY}
      WHERE membership_adjustments.stripe_checkout_session_id = :checkoutSessionId
      ORDER BY membership_adjustments.id DESC
      LIMIT 1`,
    { checkoutSessionId },
  );
}

async function getActivePendingMembershipAdjustment(membershipId) {
  if (!membershipId) {
    return null;
  }

  return queryOne(
    `${MEMBERSHIP_ADJUSTMENT_SELECT_QUERY}
      WHERE membership_adjustments.membership_id = :membershipId
        AND membership_adjustments.status = 'pending_payment'
        AND (
          membership_adjustments.payment_hold_expires_at IS NULL
          OR membership_adjustments.payment_hold_expires_at > :now
        )
      ORDER BY membership_adjustments.id DESC
      LIMIT 1`,
    {
      membershipId,
      now: new Date(),
    },
  );
}

async function markMembershipAdjustmentStatus(adjustmentId, status, options = {}) {
  const shouldUpdateHold = options.clearHold || Object.prototype.hasOwnProperty.call(options, 'paymentHoldExpiresAt');
  const txOpts = options.transaction ? { transaction: options.transaction } : {};

  await execute(
    `UPDATE membership_adjustments
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
    txOpts,
  );
}

async function getPlanByStripePriceId(stripePriceId) {
  return queryOne(
    'SELECT * FROM membership_plans WHERE stripe_price_id = :stripePriceId LIMIT 1',
    { stripePriceId },
  );
}

async function persistMembershipSubscriptionUpdate({
  userId,
  membership,
  plan,
  stripePriceId,
  updatedSubscription,
  invoiceDescription,
  syncLatestInvoice = true,
  transaction = undefined,
}) {
  const txOpts = transaction ? { transaction } : {};

  await execute(
    `UPDATE memberships
        SET plan_id = :planId,
            status = :status,
            stripe_price_id = :stripePriceId,
            cancel_at_period_end = :cancelAtPeriodEnd,
            current_period_start = :currentPeriodStart,
            current_period_end = :currentPeriodEnd,
            suspended_at = NULL,
            updated_at = :updatedAt
      WHERE id = :membershipId`,
    {
      membershipId: membership.id,
      planId: plan.id,
      status: updatedSubscription.status,
      stripePriceId,
      cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end ? 1 : 0,
      currentPeriodStart: updatedSubscription.current_period_start ? new Date(updatedSubscription.current_period_start * 1000) : null,
      currentPeriodEnd: updatedSubscription.current_period_end ? new Date(updatedSubscription.current_period_end * 1000) : null,
      updatedAt: new Date(),
    },
    txOpts,
  );

  if (syncLatestInvoice && updatedSubscription.latest_invoice && typeof updatedSubscription.latest_invoice !== 'string') {
    await upsertStripeInvoice({
      userId,
      membershipId: membership.id,
      stripeInvoiceId: updatedSubscription.latest_invoice.id,
      stripePaymentIntentId: typeof updatedSubscription.latest_invoice.payment_intent === 'string'
        ? updatedSubscription.latest_invoice.payment_intent
        : updatedSubscription.latest_invoice.payment_intent?.id || null,
      invoiceNumber: updatedSubscription.latest_invoice.number || null,
      status: updatedSubscription.latest_invoice.status || updatedSubscription.status,
      description: invoiceDescription,
      currency: updatedSubscription.currency || 'gbp',
      subtotalMinor: Number(updatedSubscription.latest_invoice.subtotal || 0),
      taxMinor: Number(updatedSubscription.latest_invoice.tax || 0),
      totalMinor: Number(updatedSubscription.latest_invoice.total || 0),
      hostedInvoiceUrl: updatedSubscription.latest_invoice.hosted_invoice_url || null,
      invoicePdf: updatedSubscription.latest_invoice.invoice_pdf || null,
      paidAt: updatedSubscription.latest_invoice.status === 'paid' ? new Date() : null,
      transaction,
    });
  }

  return getUserMembership(userId);
}

async function createMembershipAdjustmentInvoice(adjustmentRow, stripePaymentIntentId, invoiceOptions = {}, transaction = undefined) {
  const txOpts = transaction ? { transaction } : {};

  const existingInvoice = await queryOne(
    'SELECT id FROM invoices WHERE stripe_payment_intent_id = :stripePaymentIntentId LIMIT 1',
    { stripePaymentIntentId },
    txOpts,
  );

  const payload = {
    userId: Number(adjustmentRow.user_id),
    membershipId: Number(adjustmentRow.membership_id),
    bookingId: null,
    stripeInvoiceId: invoiceOptions.stripeInvoiceId || null,
    stripePaymentIntentId,
    invoiceNumber: invoiceOptions.invoiceNumber || `MEM-ADJ-${adjustmentRow.id}`,
    status: invoiceOptions.status || 'paid',
    description: invoiceOptions.description || `${adjustmentRow.target_plan_name} membership upgrade`,
    currency: String(invoiceOptions.currency || adjustmentRow.currency || 'gbp').toLowerCase(),
    subtotalMinor: normalizeMinorAmount(invoiceOptions.subtotalMinor, Number(adjustmentRow.subtotal_minor || 0)),
    taxMinor: normalizeMinorAmount(invoiceOptions.taxMinor, Number(adjustmentRow.tax_minor || 0)),
    totalMinor: normalizeMinorAmount(invoiceOptions.totalMinor, Number(adjustmentRow.total_minor || 0)),
    hostedInvoiceUrl: invoiceOptions.hostedInvoiceUrl || null,
    invoicePdf: invoiceOptions.invoicePdf || null,
    paidAt: invoiceOptions.paidAt || new Date(),
  };

  if (existingInvoice?.id || payload.stripeInvoiceId) {
    await upsertStripeInvoice({ ...payload, transaction });
    return;
  }

  await createLocalInvoice({ ...payload, transaction });
}

async function hydrateMissingMembershipPaymentIntents(membershipId) {
  if (!membershipId) {
    return;
  }

  const membership = await getUserMembership((await queryOne(
    'SELECT user_id FROM memberships WHERE id = :membershipId LIMIT 1',
    { membershipId },
  ))?.user_id || 0);
  const user = membership ? await findUserById(membership.userId) : null;

  if (!user?.stripeCustomerId) {
    return;
  }

  const [invoices, existingRows, paymentIntents] = await Promise.all([
    queryAll(
      `SELECT * FROM invoices
        WHERE membership_id = :membershipId
          AND stripe_payment_intent_id IS NULL
          AND total_minor > 0
        ORDER BY COALESCE(paid_at, created_at) DESC, id DESC`,
      { membershipId },
    ),
    queryAll(
      'SELECT stripe_payment_intent_id FROM invoices WHERE membership_id = :membershipId AND stripe_payment_intent_id IS NOT NULL',
      { membershipId },
    ),
    listStripePaymentIntents({
      customerId: user.stripeCustomerId,
      limit: 50,
    }),
  ]);

  const usedPaymentIntentIds = new Set(existingRows.map((row) => row.stripe_payment_intent_id).filter(Boolean));
  const candidates = paymentIntents
    .filter((paymentIntent) => paymentIntent.status === 'succeeded' && !usedPaymentIntentIds.has(paymentIntent.id))
    .sort((left, right) => right.created - left.created);

  for (const invoice of invoices) {
    const invoiceTimestamp = Math.floor(new Date(invoice.paid_at || invoice.created_at || Date.now()).getTime() / 1000);
    const matchIndex = candidates.findIndex((paymentIntent) => {
      if (Number(paymentIntent.amount || 0) !== Number(invoice.total_minor || 0)) {
        return false;
      }

      const description = String(paymentIntent.description || '').toLowerCase();
      const isMembershipLike = description.includes('subscription') || description.includes('membership');
      const ageDelta = Math.abs(Number(paymentIntent.created || 0) - invoiceTimestamp);
      return isMembershipLike || ageDelta <= (24 * 60 * 60);
    });

    if (matchIndex < 0) {
      continue;
    }

    const [matchedPaymentIntent] = candidates.splice(matchIndex, 1);

    await execute(
      `UPDATE invoices
          SET stripe_payment_intent_id = :stripePaymentIntentId,
              updated_at = :updatedAt
        WHERE id = :invoiceId`,
      {
        invoiceId: invoice.id,
        stripePaymentIntentId: matchedPaymentIntent.id,
        updatedAt: new Date(),
      },
    );
  }
}

async function reconcilePendingMembershipAdjustmentRow(adjustmentRow) {
  if (!adjustmentRow || adjustmentRow.status !== 'pending_payment') {
    return adjustmentRow;
  }

  if (adjustmentRow.stripe_checkout_session_id) {
    const session = await retrieveStripeCheckoutSession(adjustmentRow.stripe_checkout_session_id);
    const paymentIntentId = typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id || null;

    if (session.payment_status === 'paid' && paymentIntentId) {
      return syncMembershipAdjustmentCheckoutSession({
        userId: Number(adjustmentRow.user_id),
        sessionId: session.id,
      }).catch(() => getMembershipAdjustmentRowById(adjustmentRow.id));
    }

    if (session.status === 'expired' || isMembershipAdjustmentHoldExpired(adjustmentRow)) {
      if (session.status === 'open') {
        await expireStripeCheckoutSession(session.id).catch((err) => console.error('[Stripe cleanup] Non-fatal error:', err.message));
      }

      await markMembershipAdjustmentStatus(adjustmentRow.id, 'expired', { clearHold: true });
      return getMembershipAdjustmentRowById(adjustmentRow.id);
    }
  } else if (adjustmentRow.stripe_payment_intent_id && isMembershipAdjustmentHoldExpired(adjustmentRow)) {
    // Payment intent-based adjustment that has expired — cancel the PI and expire the adjustment
    await cancelStripePaymentIntent(adjustmentRow.stripe_payment_intent_id).catch((err) => console.error('[Stripe cleanup] Non-fatal error:', err.message));
    await markMembershipAdjustmentStatus(adjustmentRow.id, 'expired', { clearHold: true });
    return getMembershipAdjustmentRowById(adjustmentRow.id);
  } else if (isMembershipAdjustmentHoldExpired(adjustmentRow)) {
    await markMembershipAdjustmentStatus(adjustmentRow.id, 'expired', { clearHold: true });
    return getMembershipAdjustmentRowById(adjustmentRow.id);
  }

  return adjustmentRow;
}

async function expireStalePendingMembershipAdjustments() {
  const staleRows = await queryAll(
    `${MEMBERSHIP_ADJUSTMENT_SELECT_QUERY}
      WHERE membership_adjustments.status = 'pending_payment'
        AND membership_adjustments.payment_hold_expires_at IS NOT NULL
        AND membership_adjustments.payment_hold_expires_at <= :now`,
    {
      now: new Date(),
    },
  );

  for (const adjustmentRow of staleRows) {
    await reconcilePendingMembershipAdjustmentRow(adjustmentRow);
  }
}

async function upsertMembershipFromSubscription({ userId, subscription, preferredPlanSlug = '' }) {
  const stripePriceId = subscription.items.data[0]?.price?.id || subscription.items.data[0]?.price || null;
  let plan = null;

  if (stripePriceId) {
    plan = await getPlanByStripePriceId(stripePriceId);
  }

  if (!plan && preferredPlanSlug) {
    plan = await getPlanBySlug(preferredPlanSlug);
  }

  if (!plan) {
    throw new Error('Membership plan could not be resolved from Stripe subscription.');
  }

  const existingMembership = await getMembershipByStripeSubscriptionId(subscription.id) || await getUserMembership(userId);
  const now = new Date();

  if (!existingMembership) {
    const [insertId, metadata] = await execute(
      `INSERT INTO memberships
        (document_id, user_id, plan_id, status, stripe_subscription_id, stripe_price_id, cancel_at_period_end, current_period_start, current_period_end, failed_payment_count, created_at, updated_at)
       VALUES
        (:documentId, :userId, :planId, :status, :stripeSubscriptionId, :stripePriceId, :cancelAtPeriodEnd, :currentPeriodStart, :currentPeriodEnd, 0, :createdAt, :updatedAt)`,
      {
        documentId: randomUUID(),
        userId,
        planId: plan.id,
        status: subscription.status,
        stripeSubscriptionId: subscription.id,
        stripePriceId,
        cancelAtPeriodEnd: subscription.cancel_at_period_end ? 1 : 0,
        currentPeriodStart: subscription.current_period_start ? new Date(subscription.current_period_start * 1000) : null,
        currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
        createdAt: now,
        updatedAt: now,
      },
    );

    return typeof insertId === 'number' ? insertId : metadata?.insertId || 0;
  }

  await execute(
    `UPDATE memberships
        SET plan_id = :planId,
            status = :status,
            stripe_subscription_id = :stripeSubscriptionId,
            stripe_price_id = :stripePriceId,
            cancel_at_period_end = :cancelAtPeriodEnd,
            current_period_start = :currentPeriodStart,
            current_period_end = :currentPeriodEnd,
            suspended_at = NULL,
            updated_at = :updatedAt
      WHERE id = :membershipId`,
    {
      membershipId: existingMembership.id,
      planId: plan.id,
      status: subscription.status,
      stripeSubscriptionId: subscription.id,
      stripePriceId,
      cancelAtPeriodEnd: subscription.cancel_at_period_end ? 1 : 0,
      currentPeriodStart: subscription.current_period_start ? new Date(subscription.current_period_start * 1000) : null,
      currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
      updatedAt: now,
    },
  );

  return existingMembership.id;
}

export async function createMembership({ userId, planSlug }) {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const existingMembership = await getUserMembership(userId);
  if (existingMembership && ['active', 'trialing', 'past_due'].includes(existingMembership.status)) {
    throw new Error('User already has an active membership.');
  }

  const plan = await getPlanBySlug(planSlug);
  if (!plan) {
    throw new Error('Membership plan was not found.');
  }

  const now = new Date();
  const [insertId, metadata] = await execute(
    `INSERT INTO memberships
      (document_id, user_id, plan_id, status, cancel_at_period_end, current_period_start, current_period_end, failed_payment_count, created_at, updated_at)
     VALUES
      (:documentId, :userId, :planId, 'pending', 0, NULL, NULL, 0, :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      userId,
      planId: plan.id,
      createdAt: now,
      updatedAt: now,
    },
  );

  const membershipId = typeof insertId === 'number' ? insertId : metadata?.insertId;
  const customerId = await ensureStripeCustomer(user);
  const { priceId } = await ensurePlanStripePrice({
    id: plan.id,
    slug: plan.slug,
    name: plan.name,
    description: plan.description,
    currency: plan.currency,
    monthlyPriceMinor: Number(plan.monthly_price_minor),
    stripePriceId: plan.stripe_price_id,
    stripeProductId: plan.stripe_product_id,
  });
  const subscription = await createStripeSubscription({
    customerId,
    priceId,
    userId,
    membershipId,
  });

  await execute(
    `UPDATE memberships
        SET status = :status,
            stripe_subscription_id = :stripeSubscriptionId,
            stripe_price_id = :stripePriceId,
            current_period_start = :currentPeriodStart,
            current_period_end = :currentPeriodEnd,
            updated_at = :updatedAt
      WHERE id = :membershipId`,
    {
      membershipId,
      status: subscription.status,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      currentPeriodStart: subscription.current_period_start ? new Date(subscription.current_period_start * 1000) : null,
      currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
      updatedAt: new Date(),
    },
  );

  // P0-9: Only activate access if subscription status indicates payment succeeded
  const activatableStatuses = ['active', 'trialing'];
  if (activatableStatuses.includes(subscription.status)) {
    await updateUserAccessStatus(userId, 'active');
  }

  if (subscription.latest_invoice && typeof subscription.latest_invoice !== 'string') {
    await upsertStripeInvoice({
      userId,
      membershipId,
      stripeInvoiceId: subscription.latest_invoice.id,
      stripePaymentIntentId: typeof subscription.latest_invoice.payment_intent === 'string'
        ? subscription.latest_invoice.payment_intent
        : subscription.latest_invoice.payment_intent?.id || null,
      invoiceNumber: subscription.latest_invoice.number || null,
      status: subscription.latest_invoice.status || subscription.status,
      description: `${plan.name} subscription`,
      currency: subscription.currency || 'gbp',
      subtotalMinor: Number(subscription.latest_invoice.subtotal || 0),
      taxMinor: Number(subscription.latest_invoice.tax || 0),
      totalMinor: Number(subscription.latest_invoice.total || 0),
      hostedInvoiceUrl: subscription.latest_invoice.hosted_invoice_url || null,
      invoicePdf: subscription.latest_invoice.invoice_pdf || null,
      paidAt: subscription.latest_invoice.status === 'paid' ? new Date() : null,
    });
  }

  await hydrateMissingMembershipPaymentIntents(membershipId);

  return getUserMembership(userId);
}

/**
 * Creates a Stripe subscription with payment_behavior: 'default_incomplete'.
 * Returns a payment draft with clientSecret so the frontend can collect card
 * details via Stripe Elements and confirm the payment in-page.
 */
export async function createMembershipPaymentDraft({ userId, planSlug }) {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const existingMembership = await getUserMembership(userId);
  if (existingMembership && ['active', 'trialing', 'past_due'].includes(existingMembership.status)) {
    throw new Error('User already has an active membership.');
  }

  const plan = await getPlanBySlug(planSlug);
  if (!plan) {
    throw new Error('Membership plan was not found.');
  }

  const now = new Date();
  const [insertId, metadata] = await execute(
    `INSERT INTO memberships
      (document_id, user_id, plan_id, status, cancel_at_period_end, current_period_start, current_period_end, failed_payment_count, created_at, updated_at)
     VALUES
      (:documentId, :userId, :planId, 'pending', 0, NULL, NULL, 0, :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      userId,
      planId: plan.id,
      createdAt: now,
      updatedAt: now,
    },
  );

  const membershipId = typeof insertId === 'number' ? insertId : metadata?.insertId;
  const customerId = await ensureStripeCustomer(user);
  const { priceId } = await ensurePlanStripePrice({
    id: plan.id,
    slug: plan.slug,
    name: plan.name,
    description: plan.description,
    currency: plan.currency,
    monthlyPriceMinor: Number(plan.monthly_price_minor),
    stripePriceId: plan.stripe_price_id,
    stripeProductId: plan.stripe_product_id,
  });

  const subscription = await createStripeSubscriptionIncomplete({
    customerId,
    priceId,
    userId,
    membershipId,
  });

  // Update the membership row with the subscription ID so we can find it later
  await execute(
    `UPDATE memberships
        SET stripe_subscription_id = :stripeSubscriptionId,
            stripe_price_id = :stripePriceId,
            updated_at = :updatedAt
      WHERE id = :membershipId`,
    {
      membershipId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: priceId,
      updatedAt: new Date(),
    },
  );

  const invoice = subscription.latest_invoice;
  const paymentIntent = typeof invoice === 'object' ? invoice?.payment_intent : null;

  if (!paymentIntent || typeof paymentIntent === 'string' || !paymentIntent.client_secret) {
    throw new Error('Could not obtain payment intent from the subscription. Please try again.');
  }

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    subscriptionId: subscription.id,
    membershipId,
    plan: {
      slug: plan.slug,
      name: plan.name,
      monthlyPriceMinor: Number(plan.monthly_price_minor),
      currency: plan.currency || 'gbp',
    },
    subtotalMinor: Number(invoice.subtotal || 0),
    taxMinor: Number(invoice.tax || 0),
    totalMinor: Number(invoice.total || 0),
    currency: invoice.currency || plan.currency || 'gbp',
  };
}

/**
 * Confirms a membership payment after the user successfully pays in-page.
 * Retrieves the subscription, updates the membership row, creates invoice, activates access.
 */
export async function confirmMembershipPayment({ userId, paymentIntentId }) {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const membership = await getUserMembership(userId);
  if (!membership) {
    throw new Error('Membership not found.');
  }

  if (!membership.stripeSubscriptionId) {
    throw new Error('Stripe subscription is missing for this membership.');
  }

  // Retrieve the subscription to get updated status after payment
  const subscription = await retrieveStripeSubscription(membership.stripeSubscriptionId);

  if (!subscription) {
    throw new Error('Stripe subscription could not be retrieved.');
  }

  // Update membership with latest subscription state
  await execute(
    `UPDATE memberships
        SET status = :status,
            stripe_subscription_id = :stripeSubscriptionId,
            stripe_price_id = :stripePriceId,
            current_period_start = :currentPeriodStart,
            current_period_end = :currentPeriodEnd,
            updated_at = :updatedAt
      WHERE id = :membershipId`,
    {
      membershipId: membership.id,
      status: subscription.status,
      stripeSubscriptionId: subscription.id,
      stripePriceId: membership.stripePriceId,
      currentPeriodStart: subscription.current_period_start ? new Date(subscription.current_period_start * 1000) : null,
      currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
      updatedAt: new Date(),
    },
  );

  // Activate access if subscription is active
  const activatableStatuses = ['active', 'trialing'];
  if (activatableStatuses.includes(subscription.status)) {
    await updateUserAccessStatus(userId, 'active');
  }

  // Upsert the invoice record
  if (subscription.latest_invoice && typeof subscription.latest_invoice !== 'string') {
    const pi = typeof subscription.latest_invoice.payment_intent === 'string'
      ? subscription.latest_invoice.payment_intent
      : subscription.latest_invoice.payment_intent?.id || paymentIntentId;

    // Retrieve the payment intent to get the receipt_url
    let receiptUrl = null;
    try {
      const fullPaymentIntent = await retrieveStripePaymentIntent(pi);
      receiptUrl = fullPaymentIntent?.latest_charge?.receipt_url || null;
    } catch {
      // Non-critical, proceed without receipt URL
    }

    const plan = await getPlanBySlug(membership.planSlug);

    await upsertStripeInvoice({
      userId,
      membershipId: membership.id,
      stripeInvoiceId: subscription.latest_invoice.id,
      stripePaymentIntentId: pi,
      invoiceNumber: subscription.latest_invoice.number || null,
      status: subscription.latest_invoice.status || subscription.status,
      description: `${plan?.name || membership.planName} subscription`,
      currency: subscription.currency || 'gbp',
      subtotalMinor: Number(subscription.latest_invoice.subtotal || 0),
      taxMinor: Number(subscription.latest_invoice.tax || 0),
      totalMinor: Number(subscription.latest_invoice.total || 0),
      hostedInvoiceUrl: receiptUrl || subscription.latest_invoice.hosted_invoice_url || null,
      invoicePdf: subscription.latest_invoice.invoice_pdf || null,
      paidAt: subscription.latest_invoice.status === 'paid' ? new Date() : null,
    });
  }

  await hydrateMissingMembershipPaymentIntents(membership.id);

  return getUserMembership(userId);
}

export async function createMembershipCheckout({ userId, planSlug, successUrl, cancelUrl }) {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const existingMembership = await getUserMembership(userId);
  if (existingMembership && ['active', 'trialing', 'past_due'].includes(existingMembership.status)) {
    throw new Error('User already has an active membership.');
  }

  const plan = await getPlanBySlug(planSlug);
  if (!plan) {
    throw new Error('Membership plan was not found.');
  }

  if (!successUrl || !cancelUrl) {
    throw new Error('Checkout success and cancel URLs are required.');
  }

  const customerId = await ensureStripeCustomer(user);
  const { priceId } = await ensurePlanStripePrice({
    id: plan.id,
    slug: plan.slug,
    name: plan.name,
    description: plan.description,
    currency: plan.currency,
    monthlyPriceMinor: Number(plan.monthly_price_minor),
    stripePriceId: plan.stripe_price_id,
    stripeProductId: plan.stripe_product_id,
  });

  return createStripeCheckoutSession({
    customerId,
    priceId,
    userId,
    planSlug,
    successUrl,
    cancelUrl,
  });
}

export async function syncMembershipCheckoutSession({ userId, sessionId }) {
  const session = await retrieveStripeCheckoutSession(sessionId);
  const sessionUserId = Number(session.metadata?.app_user_id || 0);

  if (!sessionUserId || sessionUserId !== userId) {
    throw new Error('Checkout session does not belong to this user.');
  }

  const subscription = typeof session.subscription === 'string'
    ? await retrieveStripeSubscription(session.subscription)
    : session.subscription;

  if (subscription) {
    const membershipId = await upsertMembershipFromSubscription({
      userId,
      subscription,
      preferredPlanSlug: String(session.metadata?.plan_slug || ''),
    });

    // P0-8: Only activate access if checkout payment was actually paid
    if (session.payment_status === 'paid') {
      await updateUserAccessStatus(userId, 'active');
    }

    if (subscription.latest_invoice && typeof subscription.latest_invoice !== 'string') {
      await upsertStripeInvoice({
        userId,
        membershipId,
        stripeInvoiceId: subscription.latest_invoice.id,
        stripePaymentIntentId: typeof subscription.latest_invoice.payment_intent === 'string'
          ? subscription.latest_invoice.payment_intent
          : subscription.latest_invoice.payment_intent?.id || null,
        invoiceNumber: subscription.latest_invoice.number || null,
        status: subscription.latest_invoice.status || subscription.status,
        description: 'Membership subscription',
        currency: subscription.currency || 'gbp',
        subtotalMinor: Number(subscription.latest_invoice.subtotal || 0),
        taxMinor: Number(subscription.latest_invoice.tax || 0),
        totalMinor: Number(subscription.latest_invoice.total || 0),
        hostedInvoiceUrl: subscription.latest_invoice.hosted_invoice_url || null,
        invoicePdf: subscription.latest_invoice.invoice_pdf || null,
        paidAt: subscription.latest_invoice.status === 'paid' ? new Date() : null,
      });
    }

    await hydrateMissingMembershipPaymentIntents(membershipId);
  }

  return getUserMembership(userId);
}

export async function changeMembershipPlan({ userId, planSlug, successUrl = '', cancelUrl = '' }) {
  await expireStalePendingMembershipAdjustments();

  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const membership = await getUserMembership(userId);
  if (!membership) {
    throw new Error('Membership not found.');
  }

  const plan = await getPlanBySlug(planSlug);
  if (!plan) {
    throw new Error('Membership plan was not found.');
  }

  if (!membership.stripeSubscriptionId) {
    throw new Error('Stripe subscription is missing for this membership.');
  }

  if (membership.planSlug === plan.slug) {
    return {
      membership,
      sessionId: null,
      url: null,
      adjustmentId: null,
      action: 'updated',
      paymentDueMinor: 0,
      refundMinor: 0,
    };
  }

  const pendingAdjustment = await getActivePendingMembershipAdjustment(membership.id);

  if (pendingAdjustment) {
    throw new Error('This membership already has a plan change awaiting payment. Complete or cancel that change first.');
  }

  const preview = await previewMembershipPlanChange({ userId, planSlug });
  const settlement = preview.settlement || getMembershipChangeSettlement(preview.preview);
  const { priceId } = await ensurePlanStripePrice({
    id: plan.id,
    slug: plan.slug,
    name: plan.name,
    description: plan.description,
    currency: plan.currency,
    monthlyPriceMinor: Number(plan.monthly_price_minor),
    stripePriceId: plan.stripe_price_id,
    stripeProductId: plan.stripe_product_id,
  });

  if (settlement.paymentDueMinor <= 0 && settlement.refundMinor <= 0) {
    const updatedSubscription = await updateStripeSubscriptionPlan({
      subscriptionId: membership.stripeSubscriptionId,
      priceId,
      userId,
      membershipId: membership.id,
      prorationBehavior: 'none',
    });

    return {
      membership: await persistMembershipSubscriptionUpdate({
        userId,
        membership,
        plan,
        stripePriceId: priceId,
        updatedSubscription,
        invoiceDescription: `${plan.name} subscription update`,
        syncLatestInvoice: false,
      }),
      sessionId: null,
      url: null,
      adjustmentId: null,
      action: 'updated',
      paymentDueMinor: 0,
      refundMinor: 0,
    };
  }

  if (settlement.refundMinor > 0) {
    const updatedSubscription = await updateStripeSubscriptionPlan({
      subscriptionId: membership.stripeSubscriptionId,
      priceId,
      userId,
      membershipId: membership.id,
      prorationBehavior: 'none',
    });

    const updatedMembership = await persistMembershipSubscriptionUpdate({
      userId,
      membership,
      plan,
      stripePriceId: priceId,
      updatedSubscription,
      invoiceDescription: `${plan.name} subscription update`,
      syncLatestInvoice: false,
    });

    await hydrateMissingMembershipPaymentIntents(membership.id);
    await refundMembershipAmount({
      membershipId: membership.id,
      userId,
      amountMinor: settlement.refundMinor,
      reason: 'requested_by_customer',
      metadata: {
        app_user_id: String(userId),
        membership_id: String(membership.id),
        membership_change: 'downgrade',
        from_plan_slug: membership.planSlug,
        to_plan_slug: plan.slug,
      },
    });

    return {
      membership: updatedMembership,
      sessionId: null,
      url: null,
      adjustmentId: null,
      action: 'refunded',
      paymentDueMinor: 0,
      refundMinor: settlement.refundMinor,
    };
  }

  if (isMockStripePaymentsEnabled()) {
    const customerId = await ensureStripeCustomer(user);
    const paymentIntent = await createImmediateMockPayment({
      customerId,
      amountMinor: settlement.paymentDueMinor,
      currency: settlement.currency,
      description: `${plan.name} membership upgrade`,
      metadata: {
        app_user_id: String(userId),
        membership_id: String(membership.id),
        membership_change: 'upgrade',
        from_plan_slug: membership.planSlug,
        to_plan_slug: plan.slug,
      },
    });

    // P0-5: Wrap DB writes in transaction for mock-mode membership change
    const mockTransaction = await sequelize.transaction();
    try {
      await createLocalInvoice({
        userId,
        membershipId: membership.id,
        stripePaymentIntentId: paymentIntent.id,
        invoiceNumber: `MEM-ADJ-${membership.id}-${Date.now()}`,
        status: 'paid',
        description: `${plan.name} membership upgrade`,
        currency: settlement.currency,
        subtotalMinor: settlement.subtotalMinor,
        taxMinor: settlement.taxMinor,
        totalMinor: settlement.paymentDueMinor,
        paidAt: new Date(),
        transaction: mockTransaction,
      });

      const updatedSubscription = await updateStripeSubscriptionPlan({
        subscriptionId: membership.stripeSubscriptionId,
        priceId,
        userId,
        membershipId: membership.id,
        prorationBehavior: 'none',
      });

      const updatedMembership = await persistMembershipSubscriptionUpdate({
        userId,
        membership,
        plan,
        stripePriceId: priceId,
        updatedSubscription,
        invoiceDescription: `${plan.name} subscription update`,
        syncLatestInvoice: false,
        transaction: mockTransaction,
      });

      await mockTransaction.commit();

      return {
        membership: updatedMembership,
        sessionId: null,
        url: null,
        adjustmentId: null,
        action: 'updated',
        paymentDueMinor: settlement.paymentDueMinor,
        refundMinor: 0,
      };
    } catch (error) {
      await mockTransaction.rollback();

      await refundMembershipAmount({
        membershipId: membership.id,
        userId,
        amountMinor: settlement.paymentDueMinor,
        reason: 'requested_by_customer',
        metadata: {
          app_user_id: String(userId),
          membership_id: String(membership.id),
          membership_change: 'upgrade_failed',
          from_plan_slug: membership.planSlug,
          to_plan_slug: plan.slug,
        },
      });

      throw new Error(`The membership change could not be completed. The extra payment was automatically refunded. ${String(error?.message || error)}`);
    }
  }

  const now = new Date();
  const [insertId, metadata] = await execute(
    `INSERT INTO membership_adjustments
      (document_id, membership_id, user_id, current_plan_id, target_plan_id, status, subtotal_minor, tax_minor, total_minor, currency, payment_hold_expires_at, created_at, updated_at)
     VALUES
      (:documentId, :membershipId, :userId, :currentPlanId, :targetPlanId, 'pending_payment', :subtotalMinor, :taxMinor, :totalMinor, :currency, :paymentHoldExpiresAt, :createdAt, :updatedAt)`,
    {
      documentId: randomUUID(),
      membershipId: membership.id,
      userId,
      currentPlanId: membership.planId,
      targetPlanId: plan.id,
      subtotalMinor: settlement.subtotalMinor,
      taxMinor: settlement.taxMinor,
      totalMinor: settlement.paymentDueMinor,
      currency: settlement.currency,
      paymentHoldExpiresAt: getMembershipAdjustmentHoldExpiryDate(now),
      createdAt: now,
      updatedAt: now,
    },
  );

  const adjustmentId = typeof insertId === 'number' ? insertId : metadata?.insertId;
  const customerId = await ensureStripeCustomer(user);

  // Create a PaymentIntent draft for in-page card collection instead of a checkout session redirect
  const paymentIntent = await createMembershipUpgradePaymentIntentDraft({
    customerId,
    amountMinor: settlement.paymentDueMinor,
    currency: settlement.currency,
    userId,
    membershipId: membership.id,
    membershipAdjustmentId: adjustmentId,
    description: `${plan.name} membership upgrade`,
  });

  await execute(
    `UPDATE membership_adjustments
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
    membership,
    sessionId: null,
    url: null,
    adjustmentId: Number(adjustmentId),
    action: 'payment_required',
    paymentDueMinor: settlement.paymentDueMinor,
    refundMinor: 0,
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    subtotalMinor: settlement.subtotalMinor,
    taxMinor: settlement.taxMinor,
    currency: settlement.currency,
  };
}

/**
 * Confirms a membership upgrade payment after the user pays in-page.
 * Retrieves the adjustment, verifies the payment intent succeeded, updates the subscription,
 * creates the invoice, and marks the adjustment as completed.
 */
export async function confirmMembershipUpgradePayment({ userId, paymentIntentId, adjustmentId }) {
  await expireStalePendingMembershipAdjustments();

  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const adjustmentRow = await getMembershipAdjustmentRowById(adjustmentId);
  if (!adjustmentRow || Number(adjustmentRow.user_id) !== userId) {
    throw new Error('Membership adjustment was not found.');
  }

  if (adjustmentRow.status === 'completed') {
    return getUserMembership(userId);
  }

  if (adjustmentRow.status !== 'pending_payment') {
    throw new Error('This membership adjustment is no longer awaiting payment.');
  }

  // Verify the payment intent succeeded
  const paymentIntent = await retrieveStripePaymentIntent(paymentIntentId);
  if (!paymentIntent || paymentIntent.status !== 'succeeded') {
    throw new Error('Payment has not been completed successfully.');
  }

  const membership = await getUserMembership(userId);
  if (!membership || membership.id !== Number(adjustmentRow.membership_id)) {
    throw new Error('The original membership can no longer be updated.');
  }

  const plan = await getPlanBySlug(String(adjustmentRow.target_plan_slug || ''));
  if (!plan) {
    throw new Error('The target membership plan was not found.');
  }

  const { priceId } = await ensurePlanStripePrice({
    id: plan.id,
    slug: plan.slug,
    name: plan.name,
    description: plan.description,
    currency: plan.currency,
    monthlyPriceMinor: Number(plan.monthly_price_minor),
    stripePriceId: plan.stripe_price_id,
    stripeProductId: plan.stripe_product_id,
  });

  const dbTransaction = await sequelize.transaction();
  try {
    const updatedSubscription = await updateStripeSubscriptionPlan({
      subscriptionId: membership.stripeSubscriptionId,
      priceId,
      userId,
      membershipId: membership.id,
      prorationBehavior: 'none',
    });

    const updatedMembership = await persistMembershipSubscriptionUpdate({
      userId,
      membership,
      plan,
      stripePriceId: priceId,
      updatedSubscription,
      invoiceDescription: `${plan.name} subscription update`,
      syncLatestInvoice: false,
      transaction: dbTransaction,
    });

    const receiptUrl = paymentIntent.latest_charge?.receipt_url || null;

    await createMembershipAdjustmentInvoice(adjustmentRow, paymentIntentId, {
      stripeInvoiceId: null,
      invoiceNumber: null,
      status: 'paid',
      description: `${plan.name} membership upgrade`,
      currency: paymentIntent.currency || adjustmentRow.currency || 'gbp',
      subtotalMinor: Number(adjustmentRow.subtotal_minor || 0),
      taxMinor: Number(adjustmentRow.tax_minor || 0),
      totalMinor: Number(adjustmentRow.total_minor || 0),
      hostedInvoiceUrl: receiptUrl,
      invoicePdf: null,
      paidAt: new Date(),
    }, dbTransaction);

    await markMembershipAdjustmentStatus(adjustmentRow.id, 'completed', {
      stripePaymentIntentId: paymentIntentId,
      clearHold: true,
      transaction: dbTransaction,
    });

    await dbTransaction.commit();
    return updatedMembership;
  } catch (error) {
    await dbTransaction.rollback();

    // Refund the payment since the subscription update failed
    await refundMembershipAmount({
      membershipId: Number(adjustmentRow.membership_id),
      userId,
      amountMinor: Number(adjustmentRow.total_minor || 0),
      reason: 'requested_by_customer',
      metadata: {
        app_user_id: String(userId),
        membership_id: String(adjustmentRow.membership_id),
        membership_adjustment_id: String(adjustmentRow.id),
        membership_adjustment_refund: 'subscription_update_failed',
      },
    });

    await markMembershipAdjustmentStatus(adjustmentRow.id, 'refunded', {
      stripePaymentIntentId: paymentIntentId,
      clearHold: true,
    });

    throw new Error(`The plan change could not be completed. The extra payment was automatically refunded. ${String(error?.message || error)}`);
  }
}

export async function previewMembershipPlanChange({ userId, planSlug }) {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const membership = await getUserMembership(userId);
  if (!membership) {
    throw new Error('Membership not found.');
  }

  const plan = await getPlanBySlug(planSlug);
  if (!plan) {
    throw new Error('Membership plan was not found.');
  }

  if (!membership.stripeSubscriptionId) {
    throw new Error('Stripe subscription is missing for this membership.');
  }

  const customerId = await ensureStripeCustomer(user);
  const { priceId } = await ensurePlanStripePrice({
    id: plan.id,
    slug: plan.slug,
    name: plan.name,
    description: plan.description,
    currency: plan.currency,
    monthlyPriceMinor: Number(plan.monthly_price_minor),
    stripePriceId: plan.stripe_price_id,
    stripeProductId: plan.stripe_product_id,
  });

  const upcomingInvoice = await previewStripeSubscriptionPlanChange({
    customerId,
    subscriptionId: membership.stripeSubscriptionId,
    priceId,
  });

  const prorationLines = Array.isArray(upcomingInvoice.lines?.data)
    ? upcomingInvoice.lines.data.filter((line) => Boolean(line?.parent?.subscription_item_details?.proration))
    : [];
  const prorationSubtotalMinor = prorationLines.reduce(
    (sum, line) => sum + Number(line?.amount ?? line?.subtotal ?? 0),
    0,
  );
  const prorationTaxMinor = prorationLines.reduce(
    (sum, line) => sum + (Array.isArray(line?.taxes)
      ? line.taxes.reduce((taxSum, tax) => taxSum + Number(tax?.amount || 0), 0)
      : 0),
    0,
  );
  const prorationTotalMinor = prorationSubtotalMinor + prorationTaxMinor;

  const preview = {
    currency: upcomingInvoice.currency || plan.currency || 'gbp',
    subtotalMinor: prorationSubtotalMinor,
    taxMinor: prorationTaxMinor,
    totalMinor: prorationTotalMinor,
    amountDueMinor: Math.max(0, prorationTotalMinor),
    amountRemainingMinor: Math.max(0, prorationTotalMinor),
    nextPaymentAttemptAt: upcomingInvoice.next_payment_attempt
      ? new Date(upcomingInvoice.next_payment_attempt * 1000)
      : null,
    periodEnd: membership.currentPeriodEnd,
    prorationDate: new Date(),
  };

  return {
    currentPlan: {
      slug: membership.planSlug,
      name: membership.planName,
      monthlyPriceMinor: membership.monthlyPriceMinor,
      currency: membership.currency,
    },
    nextPlan: {
      slug: plan.slug,
      name: plan.name,
      monthlyPriceMinor: Number(plan.monthly_price_minor || 0),
      currency: plan.currency || 'gbp',
    },
    preview,
    settlement: getMembershipChangeSettlement(preview),
  };
}

export async function syncMembershipAdjustmentCheckoutSession({ userId, sessionId }) {
  await expireStalePendingMembershipAdjustments();

  const session = await retrieveStripeCheckoutSession(sessionId);
  const sessionUserId = Number(session.metadata?.app_user_id || 0);
  const adjustmentId = Number(session.metadata?.membership_adjustment_id || 0);

  if (!sessionUserId || sessionUserId !== userId) {
    throw new Error('Checkout session does not belong to this user.');
  }

  if (!adjustmentId) {
    throw new Error('Membership adjustment session is missing adjustment metadata.');
  }

  const adjustmentRow = await getMembershipAdjustmentRowByCheckoutSessionId(sessionId)
    || await getMembershipAdjustmentRowById(adjustmentId);

  if (!adjustmentRow || Number(adjustmentRow.user_id) !== userId) {
    throw new Error('Membership adjustment was not found.');
  }

  if (adjustmentRow.status === 'completed') {
    return getUserMembership(userId);
  }

  if (adjustmentRow.status !== 'pending_payment') {
    throw new Error('This membership adjustment is no longer awaiting payment.');
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

  const membership = await getUserMembership(userId);
  if (!membership || membership.id !== Number(adjustmentRow.membership_id)) {
    throw new Error('The original membership can no longer be updated.');
  }

  const plan = await getPlanBySlug(String(adjustmentRow.target_plan_slug || ''));
  if (!plan) {
    throw new Error('The target membership plan was not found.');
  }

  const { priceId } = await ensurePlanStripePrice({
    id: plan.id,
    slug: plan.slug,
    name: plan.name,
    description: plan.description,
    currency: plan.currency,
    monthlyPriceMinor: Number(plan.monthly_price_minor),
    stripePriceId: plan.stripe_price_id,
    stripeProductId: plan.stripe_product_id,
  });

  // P0-5: Wrap DB writes in transaction — Stripe API calls are outside since they can't be rolled back
  const dbTransaction = await sequelize.transaction();
  try {
    const updatedSubscription = await updateStripeSubscriptionPlan({
      subscriptionId: membership.stripeSubscriptionId,
      priceId,
      userId,
      membershipId: membership.id,
      prorationBehavior: 'none',
    });

    const updatedMembership = await persistMembershipSubscriptionUpdate({
      userId,
      membership,
      plan,
      stripePriceId: priceId,
      updatedSubscription,
      invoiceDescription: `${plan.name} subscription update`,
      syncLatestInvoice: false,
      transaction: dbTransaction,
    });

    await createMembershipAdjustmentInvoice(adjustmentRow, paymentIntentId, {
      stripeInvoiceId: session.invoice?.id || null,
      invoiceNumber: session.invoice?.number || null,
      status: 'paid',
      description: `${plan.name} membership upgrade`,
      currency: session.currency || adjustmentRow.currency || 'gbp',
      subtotalMinor: session.amount_subtotal,
      taxMinor: session.total_details?.amount_tax,
      totalMinor: session.amount_total,
      hostedInvoiceUrl: session.invoice?.hosted_invoice_url || null,
      invoicePdf: session.invoice?.invoice_pdf || null,
      paidAt: new Date(),
    }, dbTransaction);

    await markMembershipAdjustmentStatus(adjustmentRow.id, 'completed', {
      stripePaymentIntentId: paymentIntentId,
      clearHold: true,
      transaction: dbTransaction,
    });

    await dbTransaction.commit();
    return updatedMembership;
  } catch (error) {
    await dbTransaction.rollback();

    await createMembershipAdjustmentInvoice(adjustmentRow, paymentIntentId, {
      stripeInvoiceId: session.invoice?.id || null,
      invoiceNumber: session.invoice?.number || null,
      status: 'paid',
      description: `${adjustmentRow.target_plan_name} membership upgrade`,
      currency: session.currency || adjustmentRow.currency || 'gbp',
      subtotalMinor: session.amount_subtotal,
      taxMinor: session.total_details?.amount_tax,
      totalMinor: session.amount_total,
      hostedInvoiceUrl: session.invoice?.hosted_invoice_url || null,
      invoicePdf: session.invoice?.invoice_pdf || null,
      paidAt: new Date(),
    });

    await refundMembershipAmount({
      membershipId: Number(adjustmentRow.membership_id),
      userId,
      amountMinor: Number(session.amount_total || adjustmentRow.total_minor || 0),
      reason: 'requested_by_customer',
      metadata: {
        app_user_id: String(userId),
        membership_id: String(adjustmentRow.membership_id),
        membership_adjustment_id: String(adjustmentRow.id),
        membership_adjustment_refund: 'subscription_update_failed',
      },
    });

    await markMembershipAdjustmentStatus(adjustmentRow.id, 'refunded', {
      stripePaymentIntentId: paymentIntentId,
      clearHold: true,
    });

    throw new Error(`The plan change could not be completed. The extra payment was automatically refunded. ${String(error?.message || error)}`);
  }
}

export async function cancelMembershipAdjustment({ userId, adjustmentId }) {
  await expireStalePendingMembershipAdjustments();

  const adjustmentRow = await getMembershipAdjustmentRowById(adjustmentId);

  if (!adjustmentRow || Number(adjustmentRow.user_id) !== userId) {
    throw new Error('Membership adjustment was not found.');
  }

  if (adjustmentRow.status !== 'pending_payment') {
    return getMembershipAdjustmentRowById(adjustmentId);
  }

  if (adjustmentRow.stripe_checkout_session_id) {
    await expireStripeCheckoutSession(adjustmentRow.stripe_checkout_session_id).catch((err) => console.error('[Stripe cleanup] Non-fatal error:', err.message));
  }

  if (adjustmentRow.stripe_payment_intent_id) {
    await cancelStripePaymentIntent(adjustmentRow.stripe_payment_intent_id).catch((err) => console.error('[Stripe cleanup] Non-fatal error:', err.message));
  }

  await markMembershipAdjustmentStatus(adjustmentId, 'canceled', { clearHold: true });
  return getMembershipAdjustmentRowById(adjustmentId);
}

export async function handleMembershipAdjustmentCheckoutExpired(session) {
  const adjustmentId = Number(session?.metadata?.membership_adjustment_id || 0);
  const adjustmentRow = await getMembershipAdjustmentRowByCheckoutSessionId(session?.id || '')
    || await getMembershipAdjustmentRowById(adjustmentId);

  if (!adjustmentRow || adjustmentRow.status !== 'pending_payment') {
    return adjustmentRow;
  }

  await markMembershipAdjustmentStatus(adjustmentRow.id, 'expired', { clearHold: true });
  return getMembershipAdjustmentRowById(adjustmentRow.id);
}

export async function handleMembershipAdjustmentInvoicePaid(invoice) {
  const adjustmentId = Number(invoice?.metadata?.membership_adjustment_id || 0);
  const adjustmentRow = await getMembershipAdjustmentRowById(adjustmentId);
  const stripePaymentIntentId = typeof invoice?.payment_intent === 'string'
    ? invoice.payment_intent
    : invoice?.payment_intent?.id || null;

  if (!adjustmentRow || !stripePaymentIntentId) {
    return adjustmentRow;
  }

  await createMembershipAdjustmentInvoice(adjustmentRow, stripePaymentIntentId, {
    stripeInvoiceId: invoice.id,
    invoiceNumber: invoice.number || null,
    status: invoice.status || 'paid',
    description: `${adjustmentRow.target_plan_name} membership upgrade`,
    currency: invoice.currency || adjustmentRow.currency || 'gbp',
    subtotalMinor: Number(invoice.subtotal || 0),
    taxMinor: Number(invoice.tax || 0),
    totalMinor: Number(invoice.total || 0),
    hostedInvoiceUrl: invoice.hosted_invoice_url || null,
    invoicePdf: invoice.invoice_pdf || null,
    paidAt: invoice.status === 'paid' ? new Date() : null,
  });

  return adjustmentRow;
}

export async function cancelMembership({ userId }) {
  const membership = await getUserMembership(userId);
  if (!membership) {
    throw new Error('Membership not found.');
  }

  if (!membership.stripeSubscriptionId) {
    throw new Error('Stripe subscription is missing for this membership.');
  }

  const updatedSubscription = await cancelStripeSubscription(membership.stripeSubscriptionId);

  await execute(
    `UPDATE memberships
        SET status = :status,
            cancel_at_period_end = :cancelAtPeriodEnd,
            current_period_start = :currentPeriodStart,
            current_period_end = :currentPeriodEnd,
            updated_at = :updatedAt
      WHERE id = :membershipId`,
    {
      membershipId: membership.id,
      status: updatedSubscription.status,
      cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end ? 1 : 0,
      currentPeriodStart: updatedSubscription.current_period_start ? new Date(updatedSubscription.current_period_start * 1000) : null,
      currentPeriodEnd: updatedSubscription.current_period_end ? new Date(updatedSubscription.current_period_end * 1000) : null,
      updatedAt: new Date(),
    },
  );

  return getUserMembership(userId);
}

export async function handleInvoicePaid(invoice) {
  let userId = Number(invoice.metadata?.app_user_id || 0);
  let membershipId = Number(invoice.metadata?.membership_id || 0) || null;
  const subscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id || null;

  if (subscriptionId && (!userId || !membershipId)) {
    const membership = await getMembershipByStripeSubscriptionId(subscriptionId);
    if (membership) {
      userId = membership.userId;
      membershipId = membership.id;
    }
  }

  if (userId) {
    await updateUserAccessStatus(userId, 'active');
    await execute(
      `UPDATE memberships
          SET failed_payment_count = 0,
              suspended_at = NULL,
              updated_at = :updatedAt
        WHERE user_id = :userId`,
      {
        userId,
        updatedAt: new Date(),
      },
    );
  }

  await upsertStripeInvoice({
    userId,
    membershipId,
    stripeInvoiceId: invoice.id,
    stripePaymentIntentId: typeof invoice.payment_intent === 'string' ? invoice.payment_intent : invoice.payment_intent?.id || null,
    invoiceNumber: invoice.number || null,
    status: invoice.status || 'paid',
    description: invoice.description || 'Stripe invoice',
    currency: invoice.currency || 'gbp',
    subtotalMinor: Number(invoice.subtotal || 0),
    taxMinor: Number(invoice.tax || 0),
    totalMinor: Number(invoice.total || 0),
    hostedInvoiceUrl: invoice.hosted_invoice_url || null,
    invoicePdf: invoice.invoice_pdf || null,
    paidAt: new Date(),
  });
}

export async function handleInvoicePaymentFailed(invoice) {
  let userId = Number(invoice.metadata?.app_user_id || 0);
  let membershipId = Number(invoice.metadata?.membership_id || 0) || null;
  const subscriptionId = typeof invoice.subscription === 'string' ? invoice.subscription : invoice.subscription?.id || null;

  if (subscriptionId && (!userId || !membershipId)) {
    const membership = await getMembershipByStripeSubscriptionId(subscriptionId);
    if (membership) {
      userId = membership.userId;
      membershipId = membership.id;
    }
  }

  if (userId) {
    await updateUserAccessStatus(userId, 'suspended');
  }

  if (membershipId) {
    await execute(
      `UPDATE memberships
          SET failed_payment_count = failed_payment_count + 1,
              suspended_at = :suspendedAt,
              updated_at = :updatedAt
        WHERE id = :membershipId`,
      {
        membershipId,
        suspendedAt: new Date(),
        updatedAt: new Date(),
      },
    );
  }

  await upsertStripeInvoice({
    userId,
    membershipId,
    stripeInvoiceId: invoice.id,
    stripePaymentIntentId: typeof invoice.payment_intent === 'string' ? invoice.payment_intent : invoice.payment_intent?.id || null,
    invoiceNumber: invoice.number || null,
    status: invoice.status || 'payment_failed',
    description: invoice.description || 'Stripe invoice',
    currency: invoice.currency || 'gbp',
    subtotalMinor: Number(invoice.subtotal || 0),
    taxMinor: Number(invoice.tax || 0),
    totalMinor: Number(invoice.total || 0),
    hostedInvoiceUrl: invoice.hosted_invoice_url || null,
    invoicePdf: invoice.invoice_pdf || null,
    paidAt: null,
  });
}

export async function handleSubscriptionUpdated(subscription) {
  let membershipId = Number(subscription.metadata?.membership_id || 0);
  const userId = Number(subscription.metadata?.app_user_id || 0);

  if (!membershipId && userId) {
    membershipId = (await upsertMembershipFromSubscription({
      userId,
      subscription,
      preferredPlanSlug: String(subscription.metadata?.plan_slug || ''),
    })) || 0;
  }

  if (!membershipId) {
    return;
  }

  await execute(
    `UPDATE memberships
        SET status = :status,
            cancel_at_period_end = :cancelAtPeriodEnd,
            current_period_start = :currentPeriodStart,
            current_period_end = :currentPeriodEnd,
            updated_at = :updatedAt
      WHERE id = :membershipId`,
    {
      membershipId,
      status: subscription.status,
      cancelAtPeriodEnd: subscription.cancel_at_period_end ? 1 : 0,
      currentPeriodStart: subscription.current_period_start ? new Date(subscription.current_period_start * 1000) : null,
      currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
      updatedAt: new Date(),
    },
  );
}

export async function handleSubscriptionDeleted(subscription) {
  let membershipId = Number(subscription.metadata?.membership_id || 0);
  const userId = Number(subscription.metadata?.app_user_id || 0);

  if (!membershipId && subscription.id) {
    membershipId = (await getMembershipByStripeSubscriptionId(subscription.id))?.id || 0;
  }

  if (membershipId) {
    await execute(
      `UPDATE memberships
          SET status = 'canceled',
              suspended_at = :suspendedAt,
              current_period_end = :currentPeriodEnd,
              updated_at = :updatedAt
        WHERE id = :membershipId`,
      {
        membershipId,
        suspendedAt: new Date(),
        currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
        updatedAt: new Date(),
      },
    );
  }

  if (userId) {
    await updateUserAccessStatus(userId, 'suspended');
  }
}
