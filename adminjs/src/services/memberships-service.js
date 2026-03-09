import { randomUUID } from 'node:crypto';
import { execute, queryAll, queryOne } from './sql.js';
import {
  cancelStripeSubscription,
  createStripeCheckoutSession,
  createStripeSubscription,
  ensurePlanStripePrice,
  ensureStripeCustomer,
  previewStripeSubscriptionPlanChange,
  retrieveStripeCheckoutSession,
  retrieveStripeSubscription,
  updateStripeSubscriptionPlan,
} from './stripe-service.js';
import { findUserById, updateUserAccessStatus } from './users-service.js';
import { upsertStripeInvoice } from './invoices-service.js';

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

async function getPlanByStripePriceId(stripePriceId) {
  return queryOne(
    'SELECT * FROM membership_plans WHERE stripe_price_id = :stripePriceId LIMIT 1',
    { stripePriceId },
  );
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

  await updateUserAccessStatus(userId, 'active');

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

    await updateUserAccessStatus(userId, 'active');

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
  }

  return getUserMembership(userId);
}

export async function changeMembershipPlan({ userId, planSlug }) {
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

  const updatedSubscription = await updateStripeSubscriptionPlan({
    subscriptionId: membership.stripeSubscriptionId,
    priceId,
    userId,
    membershipId: membership.id,
  });

  await execute(
    `UPDATE memberships
        SET plan_id = :planId,
            status = :status,
            stripe_price_id = :stripePriceId,
            cancel_at_period_end = :cancelAtPeriodEnd,
            current_period_start = :currentPeriodStart,
            current_period_end = :currentPeriodEnd,
            updated_at = :updatedAt
      WHERE id = :membershipId`,
    {
      membershipId: membership.id,
      planId: plan.id,
      status: updatedSubscription.status,
      stripePriceId: priceId,
      cancelAtPeriodEnd: updatedSubscription.cancel_at_period_end ? 1 : 0,
      currentPeriodStart: updatedSubscription.current_period_start ? new Date(updatedSubscription.current_period_start * 1000) : null,
      currentPeriodEnd: updatedSubscription.current_period_end ? new Date(updatedSubscription.current_period_end * 1000) : null,
      updatedAt: new Date(),
    },
  );

  if (updatedSubscription.latest_invoice && typeof updatedSubscription.latest_invoice !== 'string') {
    await upsertStripeInvoice({
      userId,
      membershipId: membership.id,
      stripeInvoiceId: updatedSubscription.latest_invoice.id,
      stripePaymentIntentId: typeof updatedSubscription.latest_invoice.payment_intent === 'string'
        ? updatedSubscription.latest_invoice.payment_intent
        : updatedSubscription.latest_invoice.payment_intent?.id || null,
      invoiceNumber: updatedSubscription.latest_invoice.number || null,
      status: updatedSubscription.latest_invoice.status || updatedSubscription.status,
      description: `${plan.name} subscription update`,
      currency: updatedSubscription.currency || 'gbp',
      subtotalMinor: Number(updatedSubscription.latest_invoice.subtotal || 0),
      taxMinor: Number(updatedSubscription.latest_invoice.tax || 0),
      totalMinor: Number(updatedSubscription.latest_invoice.total || 0),
      hostedInvoiceUrl: updatedSubscription.latest_invoice.hosted_invoice_url || null,
      invoicePdf: updatedSubscription.latest_invoice.invoice_pdf || null,
      paidAt: updatedSubscription.latest_invoice.status === 'paid' ? new Date() : null,
    });
  }

  return getUserMembership(userId);
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
    preview: {
      currency: upcomingInvoice.currency || plan.currency || 'gbp',
      subtotalMinor: Number(upcomingInvoice.subtotal || 0),
      taxMinor: Number(upcomingInvoice.tax || 0),
      totalMinor: Number(upcomingInvoice.total || 0),
      amountDueMinor: Number(upcomingInvoice.amount_due || 0),
      amountRemainingMinor: Number(upcomingInvoice.amount_remaining || 0),
      nextPaymentAttemptAt: upcomingInvoice.next_payment_attempt
        ? new Date(upcomingInvoice.next_payment_attempt * 1000)
        : null,
      periodEnd: membership.currentPeriodEnd,
      prorationDate: new Date(),
    },
  };
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
