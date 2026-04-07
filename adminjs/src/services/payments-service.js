import { createBookingPaymentIntent, ensureStripeCustomer, isStripeEnabled } from './stripe-service.js';
import { findUserById } from './users-service.js';

export function calculateVat(subtotalMinor) {
  return Math.round(Number(subtotalMinor || 0) * 0.2);
}

/**
 * Extracts the payment intent ID from a Stripe invoice object.
 * Stripe API >= 2025-03-31.basil removed `invoice.payment_intent`.
 * New API path: `invoice.payments.data[].payment.payment_intent`
 * Falls back to the legacy `invoice.payment_intent` for older API versions.
 */
export function extractInvoicePaymentIntentId(invoice) {
  if (!invoice) return null;

  // 1. New API: invoice.payments.data[].payment.payment_intent
  const payments = invoice.payments?.data;
  if (Array.isArray(payments) && payments.length > 0) {
    for (const entry of payments) {
      const pi = entry.payment?.payment_intent;
      if (typeof pi === 'string') return pi;
      if (pi?.id) return pi.id;
    }
  }

  // 2. Legacy fallback: invoice.payment_intent (pre-Basil API versions)
  if (invoice.payment_intent) {
    return typeof invoice.payment_intent === 'string'
      ? invoice.payment_intent
      : invoice.payment_intent?.id || null;
  }

  return null;
}

export async function chargeBooking({ userId, bookingId, totalMinor, currency = 'gbp' }) {
  if (!isStripeEnabled()) {
    return {
      stripePaymentIntentId: `mock_pi_${bookingId}`,
      stripePaymentStatus: 'succeeded',
    };
  }

  const user = await findUserById(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  const customerId = await ensureStripeCustomer(user);
  const paymentIntent = await createBookingPaymentIntent({
    customerId,
    amountMinor: totalMinor,
    currency,
    userId,
    bookingId,
  });

  return {
    stripePaymentIntentId: paymentIntent.id,
    stripePaymentStatus: paymentIntent.status,
  };
}
