import Stripe from 'stripe';
import { config } from '../config.js';
import { updateUserStripeCustomerId } from './users-service.js';
import { execute } from './sql.js';
import { calculateVat } from './payments-service.js';

let stripeClient = null;

function getStripeClient() {
  if (!config.stripe.secretKey) {
    return null;
  }

  if (!stripeClient) {
    stripeClient = new Stripe(config.stripe.secretKey);
  }

  return stripeClient;
}

function resolveStripeMode() {
  const key = config.stripe.secretKey || config.stripe.publishableKey || '';

  if (!key) {
    return 'disabled';
  }

  return key.startsWith('sk_live_') || key.startsWith('pk_live_') ? 'live' : 'test';
}

export function getStripePublishableKey() {
  return config.stripe.publishableKey || '';
}

export function getStripeMode() {
  return resolveStripeMode();
}

export function isStripeEnabled() {
  return Boolean(getStripeClient());
}

export function isMockStripePaymentsEnabled() {
  return Boolean(config.stripe.allowMockPayments);
}

export async function ensureStripeCustomer(user) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  if (user.stripeCustomerId) {
    try {
      // Ensure existing customers have a default country for automatic tax calculation
      await stripe.customers.update(user.stripeCustomerId, {
        address: { country: 'GB' },
      });
    } catch (err) {
      // Ignore update errors
    }
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    address: {
      country: 'GB', // Default country required for Stripe automatic tax
    },
    metadata: {
      app_user_id: String(user.id),
    },
  });

  await updateUserStripeCustomerId(user.id, customer.id);
  return customer.id;
}

export async function ensurePlanStripePrice(plan) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  if (plan.stripePriceId) {
    return {
      productId: plan.stripeProductId,
      priceId: plan.stripePriceId,
    };
  }

  const product = await stripe.products.create({
    name: plan.name,
    description: plan.description || undefined,
    metadata: {
      plan_slug: plan.slug,
    },
  });

  const price = await stripe.prices.create({
    product: product.id,
    currency: plan.currency,
    unit_amount: plan.monthlyPriceMinor + calculateVat(plan.monthlyPriceMinor),
    recurring: {
      interval: 'month',
    },
    metadata: {
      plan_slug: plan.slug,
      net_amount: String(plan.monthlyPriceMinor),
      vat_amount: String(calculateVat(plan.monthlyPriceMinor)),
    },
    tax_behavior: 'inclusive',
  });

  await execute(
    `UPDATE membership_plans
        SET stripe_product_id = :stripeProductId,
            stripe_price_id = :stripePriceId,
            updated_at = :updatedAt
      WHERE id = :planId`,
    {
      planId: plan.id,
      stripeProductId: product.id,
      stripePriceId: price.id,
      updatedAt: new Date(),
    },
  );

  return {
    productId: product.id,
    priceId: price.id,
  };
}

export async function attachMockPaymentMethod(customerId) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  if (!isMockStripePaymentsEnabled()) {
    throw new Error('Mock Stripe payment methods are disabled for this environment.');
  }

  const configuredPaymentMethod = config.stripe.mockPaymentMethodId || 'tok_visa';
  const paymentMethod = configuredPaymentMethod.startsWith('tok_')
    ? await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: configuredPaymentMethod,
      },
    })
    : { id: configuredPaymentMethod };

  await stripe.paymentMethods.attach(paymentMethod.id, { customer: customerId }).catch((error) => {
    // Stripe error code for already-attached payment method
    if (error?.code !== 'payment_method_already_attached') {
      throw error;
    }
  });

  await stripe.customers.update(customerId, {
    invoice_settings: {
      default_payment_method: paymentMethod.id,
    },
  });

  return paymentMethod.id;
}

export async function createStripeSubscription({ customerId, priceId, userId, membershipId }) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  if (!isMockStripePaymentsEnabled()) {
    throw new Error('Direct subscription creation is disabled when mock Stripe payments are off. Use Stripe Checkout instead.');
  }

  await attachMockPaymentMethod(customerId);

  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    automatic_tax: {
      enabled: true,
    },
    collection_method: 'charge_automatically',
    metadata: {
      app_user_id: String(userId),
      membership_id: String(membershipId),
    },
    expand: ['latest_invoice'],
  });
}

/**
 * Creates a subscription with payment_behavior: 'default_incomplete'.
 * The subscription starts in 'incomplete' status and the first invoice has a
 * PaymentIntent with a client_secret that the frontend can use to collect
 * card details via Stripe Elements and confirm the payment in-page.
 */
export async function createStripeSubscriptionIncomplete({ customerId, priceId, userId, membershipId }) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    // NOTE: automatic_tax requires Stripe Tax to be enabled on the dashboard.
    // When it is not configured, invoices may be created without a payment_intent,
    // which breaks the incomplete-subscription flow. Re-enable once Stripe Tax is
    // properly set up on the account.
    // automatic_tax: { enabled: true },
    collection_method: 'charge_automatically',
    payment_behavior: 'default_incomplete',
    payment_settings: {
      payment_method_types: ['card'],
      save_default_payment_method: 'on_subscription',
    },
    metadata: {
      app_user_id: String(userId),
      membership_id: String(membershipId),
    },
    // Stripe API >= 2025-03-31.basil removed invoice.payment_intent.
    // Use confirmation_secret to get client_secret for card collection.
    // The payment_intent ID is extracted from the confirmation_secret or invoice.payments separately.
    expand: ['latest_invoice.confirmation_secret', 'latest_invoice.payments'],
  });
}

/**
 * Creates a PaymentIntent draft for a membership upgrade proration charge.
 * The client_secret is sent to the frontend for in-page card collection.
 */
export async function createMembershipUpgradePaymentIntentDraft({
  customerId,
  amountMinor,
  currency,
  userId,
  membershipId,
  membershipAdjustmentId,
  description = '',
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.paymentIntents.create({
    amount: amountMinor,
    currency,
    customer: customerId,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never',
    },
    description: description || undefined,
    metadata: {
      app_user_id: String(userId),
      membership_id: String(membershipId),
      membership_adjustment_id: String(membershipAdjustmentId),
    },
  });
}

export async function createStripeCheckoutSession({
  customerId,
  priceId,
  userId,
  planSlug,
  successUrl,
  cancelUrl,
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    billing_address_collection: 'required',
    customer_update: {
      address: 'auto',
      name: 'auto',
    },
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    automatic_tax: {
      enabled: true,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      app_user_id: String(userId),
      plan_slug: String(planSlug),
    },
    subscription_data: {
      metadata: {
        app_user_id: String(userId),
        plan_slug: String(planSlug),
      },
    },
  });
}

export async function createBookingCheckoutSession({
  customerId,
  bookingId,
  userId,
  resourceName,
  startAt,
  endAt,
  subtotalMinor,
  currency,
  successUrl,
  cancelUrl,
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.checkout.sessions.create({
    mode: 'payment',
    customer: customerId,
    billing_address_collection: 'required',
    customer_update: {
      address: 'auto',
      name: 'auto',
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    automatic_tax: {
      enabled: true,
    },
    invoice_creation: {
      enabled: true,
      invoice_data: {
        metadata: {
          app_user_id: String(userId),
          booking_id: String(bookingId),
        },
      },
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount: subtotalMinor,
          tax_behavior: 'exclusive',
          product_data: {
            name: `${resourceName} booking`,
            description: `${startAt} to ${endAt}`,
          },
        },
      },
    ],
    metadata: {
      app_user_id: String(userId),
      booking_id: String(bookingId),
    },
    payment_intent_data: {
      metadata: {
        app_user_id: String(userId),
        booking_id: String(bookingId),
      },
      description: `${resourceName} booking`,
    },
  });
}

export async function createBookingAdjustmentCheckoutSession({
  customerId,
  bookingId,
  bookingAdjustmentId,
  userId,
  resourceName,
  startAt,
  endAt,
  subtotalMinor,
  currency,
  successUrl,
  cancelUrl,
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.checkout.sessions.create({
    mode: 'payment',
    customer: customerId,
    billing_address_collection: 'required',
    customer_update: {
      address: 'auto',
      name: 'auto',
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    automatic_tax: {
      enabled: true,
    },
    invoice_creation: {
      enabled: true,
      invoice_data: {
        metadata: {
          app_user_id: String(userId),
          booking_id: String(bookingId),
          booking_adjustment_id: String(bookingAdjustmentId),
        },
      },
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount: subtotalMinor,
          tax_behavior: 'exclusive',
          product_data: {
            name: `${resourceName} booking adjustment`,
            description: `${startAt} to ${endAt}`,
          },
        },
      },
    ],
    metadata: {
      app_user_id: String(userId),
      booking_id: String(bookingId),
      booking_adjustment_id: String(bookingAdjustmentId),
    },
    payment_intent_data: {
      metadata: {
        app_user_id: String(userId),
        booking_id: String(bookingId),
        booking_adjustment_id: String(bookingAdjustmentId),
      },
      description: `${resourceName} booking adjustment`,
    },
  });
}

export async function createMembershipAdjustmentCheckoutSession({
  customerId,
  membershipId,
  membershipAdjustmentId,
  userId,
  currentPlanName,
  targetPlanName,
  subtotalMinor,
  currency,
  successUrl,
  cancelUrl,
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.checkout.sessions.create({
    mode: 'payment',
    customer: customerId,
    billing_address_collection: 'required',
    customer_update: {
      address: 'auto',
      name: 'auto',
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
    automatic_tax: {
      enabled: true,
    },
    invoice_creation: {
      enabled: true,
    },
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: `${targetPlanName} membership upgrade`,
            description: `Plan change from ${currentPlanName} to ${targetPlanName}`,
          },
          unit_amount: subtotalMinor,
          tax_behavior: 'exclusive',
        },
        quantity: 1,
      },
    ],
    metadata: {
      app_user_id: String(userId),
      membership_id: String(membershipId),
      membership_adjustment_id: String(membershipAdjustmentId),
    },
    payment_intent_data: {
      metadata: {
        app_user_id: String(userId),
        membership_id: String(membershipId),
        membership_adjustment_id: String(membershipAdjustmentId),
      },
      description: `${targetPlanName} membership upgrade`,
    },
  });
}

/**
 * Creates a PaymentIntent draft for a booking adjustment (upgrade) charge.
 * The client_secret is sent to the frontend for in-page card collection.
 */
export async function createBookingAdjustmentPaymentIntentDraft({
  customerId,
  amountMinor,
  currency,
  userId,
  bookingId,
  bookingAdjustmentId,
  description = '',
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.paymentIntents.create({
    amount: amountMinor,
    currency,
    customer: customerId,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never',
    },
    description: description || undefined,
    metadata: {
      app_user_id: String(userId),
      booking_id: String(bookingId),
      booking_adjustment_id: String(bookingAdjustmentId),
    },
  });
}

export async function listStripePaymentIntents({ customerId, limit = 20 }) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  const paymentIntents = await stripe.paymentIntents.list({
    customer: customerId,
    limit,
  });

  return paymentIntents.data;
}

export async function createImmediateMockPayment({
  customerId,
  amountMinor,
  currency,
  description = '',
  metadata = {},
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  if (!isMockStripePaymentsEnabled()) {
    throw new Error('Direct mock Stripe payments are disabled for this environment.');
  }

  const paymentMethodId = await attachMockPaymentMethod(customerId);

  return stripe.paymentIntents.create({
    amount: amountMinor,
    currency,
    customer: customerId,
    payment_method: paymentMethodId,
    confirm: true,
    off_session: true,
    description: description || undefined,
    metadata,
  });
}

export async function updateStripeSubscriptionPlan({
  subscriptionId,
  priceId,
  userId,
  membershipId,
  prorationBehavior = 'create_prorations',
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  const existingSubscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionItemId = existingSubscription.items.data[0]?.id;

  if (!subscriptionItemId) {
    throw new Error('Stripe subscription item was not found.');
  }

  if (existingSubscription.items.data.length > 1) {
    console.warn(`[stripe] Subscription ${subscriptionId} has ${existingSubscription.items.data.length} items — only updating the first item.`);
  }

  return stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscriptionItemId,
        price: priceId,
      },
    ],
    cancel_at_period_end: false,
    proration_behavior: prorationBehavior,
    automatic_tax: {
      enabled: true,
    },
    metadata: {
      app_user_id: String(userId),
      membership_id: String(membershipId),
    },
    expand: ['latest_invoice'],
  });
}

export async function previewStripeSubscriptionPlanChange({
  customerId,
  subscriptionId,
  priceId,
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  const existingSubscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionItemId = existingSubscription.items.data[0]?.id;

  if (!subscriptionItemId) {
    throw new Error('Stripe subscription item was not found.');
  }

  const prorationDate = Math.floor(Date.now() / 1000);

  return stripe.invoices.createPreview({
    customer: customerId,
    subscription: subscriptionId,
    subscription_details: {
      proration_behavior: 'create_prorations',
      proration_date: prorationDate,
      items: [
        {
          id: subscriptionItemId,
          price: priceId,
        },
      ],
    },
    automatic_tax: {
      enabled: true,
    },
  });
}

export async function cancelStripeSubscription(subscriptionId) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

export async function createBookingPaymentIntent({
  customerId,
  amountMinor,
  currency,
  userId,
  bookingId,
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  if (!isMockStripePaymentsEnabled()) {
    throw new Error('Direct booking charges are disabled when mock Stripe payments are off. Use the payment intent draft or Stripe Checkout flow.');
  }

  const paymentMethodId = await attachMockPaymentMethod(customerId);

  return stripe.paymentIntents.create({
    amount: amountMinor,
    currency,
    customer: customerId,
    payment_method: paymentMethodId,
    confirm: true,
    off_session: true,
    metadata: {
      app_user_id: String(userId),
      booking_id: String(bookingId),
    },
  });
}

export async function createBookingPaymentIntentDraft({
  customerId,
  amountMinor,
  currency,
  userId,
  bookingId,
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.paymentIntents.create({
    amount: amountMinor,
    currency,
    customer: customerId,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: 'never',
    },
    metadata: {
      app_user_id: String(userId),
      booking_id: String(bookingId),
    },
  });
}

export async function retrieveStripeCheckoutSession(sessionId) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['subscription', 'payment_intent', 'line_items.data.price', 'invoice'],
  });
}

export async function retrieveStripeSubscription(subscriptionId) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['latest_invoice', 'items.data.price'],
  });
}

export async function retrieveStripePaymentIntent(paymentIntentId) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ['latest_charge'],
  });
}

export async function cancelStripePaymentIntent(paymentIntentId) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.paymentIntents.cancel(paymentIntentId);
}

export async function expireStripeCheckoutSession(sessionId) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.checkout.sessions.expire(sessionId);
}

export async function createStripeRefund({
  paymentIntentId,
  amountMinor = null,
  reason = undefined,
  metadata = undefined,
}) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  const payload = {
    payment_intent: paymentIntentId,
    reason,
    metadata,
  };

  if (typeof amountMinor === 'number' && Number.isFinite(amountMinor) && amountMinor > 0) {
    payload.amount = amountMinor;
  }

  return stripe.refunds.create(payload);
}

export function constructStripeWebhookEvent(payload, signature) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.webhooks.constructEvent(payload, signature, config.stripe.webhookSecret);
}

export async function retrieveStripeSetupIntent(setupIntentId) {
  const stripe = getStripeClient();
  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }
  return stripe.setupIntents.retrieve(setupIntentId);
}

export async function createStripeSubscriptionWithPaymentMethod({ customerId, priceId, paymentMethodId, userId, membershipId, planSlug }) {
  const stripe = getStripeClient();
  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }
  return stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    collection_method: 'charge_automatically',
    default_payment_method: paymentMethodId,
    payment_settings: {
      payment_method_types: ['card'],
      save_default_payment_method: 'on_subscription',
    },
    metadata: {
      app_user_id: String(userId),
      membership_id: String(membershipId),
      plan_slug: String(planSlug),
    },
    expand: ['latest_invoice'],
  });
}

/**
 * Creates a Stripe SetupIntent for saving a card for future off-session use.
 * Used by the mobile PaymentSheet membership flow.
 * Does NOT create or activate a subscription or membership row.
 * client_secret must never be logged.
 */
export async function createStripeSetupIntent({ customerId, userId, planSlug }) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.setupIntents.create({
    customer: customerId,
    usage: 'off_session',
    payment_method_types: ['card'],
    metadata: {
      app_user_id: String(userId),
      plan_slug: String(planSlug),
      source: 'mobile_membership_setup',
    },
  });
}
