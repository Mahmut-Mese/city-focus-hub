import { createBookingPaymentIntent, ensureStripeCustomer, isStripeEnabled } from './stripe-service.js';
import { findUserById } from './users-service.js';

export function calculateVat(subtotalMinor) {
  return Math.round(Number(subtotalMinor || 0) * 0.2);
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
