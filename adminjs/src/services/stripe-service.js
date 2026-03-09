import Stripe from 'stripe';
import { config } from '../config.js';
import { updateUserStripeCustomerId } from './users-service.js';
import { execute } from './sql.js';

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

export function getStripePublishableKey() {
  return config.stripe.publishableKey || '';
}

export function isStripeEnabled() {
  return Boolean(getStripeClient());
}

export async function ensureStripeCustomer(user) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    address: {
      country: 'GB',
      postal_code: 'EC3V 1PJ',
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
    unit_amount: plan.monthlyPriceMinor,
    recurring: {
      interval: 'month',
    },
    metadata: {
      plan_slug: plan.slug,
    },
    tax_behavior: 'exclusive',
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
    if (!String(error?.message || '').includes('already been attached')) {
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
  totalMinor,
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
    success_url: successUrl,
    cancel_url: cancelUrl,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount: totalMinor,
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
  });
}

export async function updateStripeSubscriptionPlan({ subscriptionId, priceId, userId, membershipId }) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  const existingSubscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionItemId = existingSubscription.items.data[0]?.id;

  if (!subscriptionItemId) {
    throw new Error('Stripe subscription item was not found.');
  }

  return stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscriptionItemId,
        price: priceId,
      },
    ],
    proration_behavior: 'create_prorations',
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

  return stripe.invoices.createPreview({
    customer: customerId,
    subscription: subscriptionId,
    subscription_details: {
      proration_behavior: 'create_prorations',
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
    expand: ['subscription', 'payment_intent', 'line_items.data.price'],
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

  return stripe.paymentIntents.retrieve(paymentIntentId);
}

export function constructStripeWebhookEvent(payload, signature) {
  const stripe = getStripeClient();

  if (!stripe) {
    throw new Error('Stripe is not configured.');
  }

  return stripe.webhooks.constructEvent(payload, signature, config.stripe.webhookSecret);
}
