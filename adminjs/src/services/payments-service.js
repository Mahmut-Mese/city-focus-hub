import { createBookingPaymentIntent, ensureStripeCustomer, isStripeEnabled } from './stripe-service.js';
import { findUserById } from './users-service.js';

/**
 * VAT SYSTEM ARCHITECTURE (P1 #26, #28, #56)
 *
 * This codebase has TWO parallel VAT calculation paths:
 *
 * 1. LOCAL ESTIMATION (`calculateVat` below):
 *    - Applied to PaymentIntent-based flows (embedded card payments, mock payments)
 *    - Uses a flat rate from the `VAT_RATE` env var (default: 20%)
 *    - Stored in DB: `bookings.tax_minor`, `bookings.total_minor`
 *    - LIMITATION: PaymentIntents do not support Stripe's `automatic_tax`,
 *      so this local estimate is the best available for that payment path.
 *
 * 2. STRIPE AUTOMATIC TAX (`automatic_tax: { enabled: true }`):
 *    - Applied to Checkout Session flows (guest booking, membership, adjustments)
 *    - Stripe calculates tax based on customer address and tax registration
 *    - After checkout completes, sync functions (`getCheckoutSessionFinancials`,
 *      `getInvoiceFinancials`) update the DB with Stripe's actual figures
 *    - This path produces the authoritative tax record for Stripe Tax reporting
 *
 * RECONCILIATION: The two paths may produce different tax amounts for the same
 * price. The DB always stores the most recent sync result. For Checkout Sessions,
 * the Stripe-computed amount overwrites the local estimate after sync.
 * For PaymentIntents, the local estimate is the only available figure.
 *
 * MOCK MODE: Mock payments use the local `calculateVat` estimate. No Stripe Tax
 * record is created. This is an accepted limitation of mock mode — mock payments
 * are not suitable for tax reporting accuracy testing.
 */

const DEFAULT_VAT_RATE = Number(process.env.VAT_RATE ?? 0.2);
const vatRate = Number.isFinite(DEFAULT_VAT_RATE) ? DEFAULT_VAT_RATE : 0.2;

export function calculateVat(subtotalMinor) {
  const amount = Number(subtotalMinor || 0);
  if (!Number.isFinite(amount)) return 0;
  return Math.round(amount * vatRate);
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
