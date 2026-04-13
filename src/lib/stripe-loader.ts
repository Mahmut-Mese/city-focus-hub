/**
 * #77: Lazy Stripe.js loader — only downloads and initializes Stripe.js
 * when the payment UI is actually needed, not on every page load.
 *
 * Re-exports the same types so consumers don't need to import from @stripe/stripe-js directly.
 */

import type {
  Stripe,
  StripeElements,
  StripeCardNumberElement,
  StripeCardExpiryElement,
  StripeCardCvcElement,
} from '@stripe/stripe-js';

export type {
  Stripe,
  StripeElements,
  StripeCardNumberElement,
  StripeCardExpiryElement,
  StripeCardCvcElement,
};

/**
 * Dynamically imports @stripe/stripe-js and calls loadStripe().
 * The Stripe.js script is only fetched on the first call.
 * Subsequent calls with the same key return the cached promise.
 */
let stripePromise: Promise<Stripe | null> | null = null;
let cachedKey = '';

export async function lazyLoadStripe(publishableKey: string): Promise<Stripe | null> {
  if (stripePromise && cachedKey === publishableKey) {
    return stripePromise;
  }

  cachedKey = publishableKey;
  stripePromise = import('@stripe/stripe-js').then((mod) => mod.loadStripe(publishableKey));

  return stripePromise;
}
