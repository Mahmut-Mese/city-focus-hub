import { useEffect, useRef, useState } from 'react';
import { loadStripe, type Stripe, type StripeCardCvcElement, type StripeCardExpiryElement, type StripeCardNumberElement, type StripeElements } from '@stripe/stripe-js';
import { AlertCircle, ArrowLeft, Check, LoaderCircle, ShieldCheck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { usePricingPlans } from '@/hooks/useCmsContent';
import {
  changeMemberPlan,
  confirmMemberMembershipPayment,
  confirmMemberMembershipUpgradePayment,
  createMemberMembershipPaymentDraft,
  getMemberDashboard,
  type MemberDashboardPayload,
  type MembershipPaymentDraft,
} from '@/lib/member-api';

function formatCurrencyMinor(amountMinor: number, currency = 'gbp') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(Number(amountMinor || 0) / 100);
}

function formatCurrencyWhole(amount: number, currency = 'GBP') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/* ---------- Stripe card form ---------- */

function MembershipPaymentCard({
  publishableKey,
  paymentDraft,
  isSubmitting,
  onConfirmPayment,
  onCancel,
}: {
  publishableKey: string;
  paymentDraft: MembershipPaymentDraft;
  isSubmitting: boolean;
  onConfirmPayment: (paymentIntentId: string) => Promise<void>;
  onCancel: () => void;
}) {
  const cardNumberContainerRef = useRef<HTMLDivElement | null>(null);
  const cardExpiryContainerRef = useRef<HTMLDivElement | null>(null);
  const cardCvcContainerRef = useRef<HTMLDivElement | null>(null);
  const stripeRef = useRef<Stripe | null>(null);
  const elementsRef = useRef<StripeElements | null>(null);
  const [readyCount, setReadyCount] = useState(0);
  const [elementError, setElementError] = useState('');
  const isElementReady = readyCount === 3;

  useEffect(() => {
    if (
      !publishableKey
      || !paymentDraft.clientSecret
      || !cardNumberContainerRef.current
      || !cardExpiryContainerRef.current
      || !cardCvcContainerRef.current
    ) {
      return;
    }

    let active = true;
    let mountedCardNumber: StripeCardNumberElement | null = null;
    let mountedCardExpiry: StripeCardExpiryElement | null = null;
    let mountedCardCvc: StripeCardCvcElement | null = null;

    setReadyCount(0);
    setElementError('');

    void loadStripe(publishableKey)
      .then((stripe) => {
        if (!active) return;

        if (!stripe) {
          setElementError('Stripe could not be initialized.');
          return;
        }

        if (!cardNumberContainerRef.current || !cardExpiryContainerRef.current || !cardCvcContainerRef.current) {
          return;
        }

        stripeRef.current = stripe;
        const elements = stripe.elements();
        elementsRef.current = elements;

        const elementStyle = {
          style: {
            base: {
              color: '#10153f',
              fontFamily: 'inherit',
              fontSize: '16px',
              '::placeholder': {
                color: 'rgba(16, 21, 63, 0.4)',
              },
            },
            invalid: {
              color: '#dc2626',
            },
          },
        };

        const handleReady = () => {
          if (active) {
            setReadyCount((count) => count + 1);
          }
        };

        const handleChange = (event: { error?: { message?: string } }) => {
          if (active && event.error?.message) {
            setElementError(event.error.message);
            return;
          }

          if (active) {
            setElementError('');
          }
        };

        mountedCardNumber = elements.create('cardNumber', elementStyle);
        mountedCardExpiry = elements.create('cardExpiry', elementStyle);
        mountedCardCvc = elements.create('cardCvc', elementStyle);

        mountedCardNumber.on('ready', handleReady);
        mountedCardExpiry.on('ready', handleReady);
        mountedCardCvc.on('ready', handleReady);
        mountedCardNumber.on('change', handleChange);
        mountedCardExpiry.on('change', handleChange);
        mountedCardCvc.on('change', handleChange);

        mountedCardNumber.mount(cardNumberContainerRef.current);
        mountedCardExpiry.mount(cardExpiryContainerRef.current);
        mountedCardCvc.mount(cardCvcContainerRef.current);
      })
      .catch((error: unknown) => {
        if (active) {
          setElementError(error instanceof Error ? error.message : 'Failed to load Stripe payment form.');
        }
      });

    return () => {
      active = false;
      setReadyCount(0);
      mountedCardNumber?.destroy();
      mountedCardExpiry?.destroy();
      mountedCardCvc?.destroy();
      elementsRef.current = null;
      stripeRef.current = null;
    };
  }, [paymentDraft.clientSecret, publishableKey]);

  const handleConfirmClick = async () => {
    setElementError('');

    if (!stripeRef.current || !elementsRef.current) {
      setElementError('Payment form is still loading.');
      return;
    }

    const cardElement = elementsRef.current.getElement('cardNumber');

    if (!cardElement) {
      setElementError('Card field is not ready yet.');
      return;
    }

    const result = await stripeRef.current.confirmCardPayment(paymentDraft.clientSecret || '', {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setElementError(result.error.message || 'Payment could not be completed.');
      return;
    }

    if (!result.paymentIntent?.id) {
      setElementError('Stripe did not return a payment result.');
      return;
    }

    await onConfirmPayment(result.paymentIntent.id);
  };

  return (
    <div className="rounded-[1.5rem] border border-[#10153f]/10 bg-white p-4 sm:p-5">
      <p className="text-sm font-medium text-[#10153f]/60">Card details</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Label className="mb-2 block text-sm text-[#10153f]/60">Card number</Label>
          <div className="rounded-[20px] border border-[#10153f]/15 bg-[#fbfaf8] px-4 py-4">
            <div ref={cardNumberContainerRef} />
          </div>
        </div>

        <div>
          <Label className="mb-2 block text-sm text-[#10153f]/60">Expiry</Label>
          <div className="rounded-[20px] border border-[#10153f]/15 bg-[#fbfaf8] px-4 py-4">
            <div ref={cardExpiryContainerRef} />
          </div>
        </div>

        <div>
          <Label className="mb-2 block text-sm text-[#10153f]/60">CVC</Label>
          <div className="rounded-[20px] border border-[#10153f]/15 bg-[#fbfaf8] px-4 py-4">
            <div ref={cardCvcContainerRef} />
          </div>
        </div>
      </div>

      {!isElementReady && !elementError ? (
        <p className="mt-4 text-sm text-[#10153f]/50">Loading Stripe card form...</p>
      ) : null}
      {elementError ? (
        <p className="mt-4 text-sm text-red-600">{elementError}</p>
      ) : null}

      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          className="h-11 rounded-full border border-[#10153f]/15 bg-white px-5 text-sm font-medium text-[#10153f] hover:bg-[#fbfaf8]"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => void handleConfirmClick()}
          disabled={isSubmitting || !isElementReady}
          className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
        >
          {isSubmitting ? <LoaderCircle className="animate-spin mr-2" /> : null}
          Pay now
        </Button>
      </div>
    </div>
  );
}

/* ---------- Main checkout page ---------- */

export default function MembershipCheckout() {
  const { planSlug = '' } = useParams();
  const { user, isReady, isAuthenticated } = useAuth();
  const pricingPlansQuery = usePricingPlans();

  const [dashboardData, setDashboardData] = useState<MemberDashboardPayload | null>(null);
  const [paymentDraft, setPaymentDraft] = useState<MembershipPaymentDraft | null>(null);
  const [pendingUpgradeAdjustmentId, setPendingUpgradeAdjustmentId] = useState<number | null>(null);
  const [isDashboardLoading, setIsDashboardLoading] = useState(false);
  const [isCreatingDraft, setIsCreatingDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect to auth if not logged in
  useEffect(() => {
    if (isReady && !isAuthenticated) {
      const returnUrl = window.location.pathname;
      window.location.href = `/auth?returnTo=${encodeURIComponent(returnUrl)}`;
    }
  }, [isReady, isAuthenticated]);

  // Fetch dashboard data when authenticated (for Stripe key + membership status)
  useEffect(() => {
    if (!isReady || !isAuthenticated) return;

    let active = true;
    setIsDashboardLoading(true);

    void getMemberDashboard()
      .then((data) => {
        if (active) {
          setDashboardData(data);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load account information.');
        }
      })
      .finally(() => {
        if (active) setIsDashboardLoading(false);
      });

    return () => { active = false; };
  }, [isReady, isAuthenticated]);

  // Find plan from CMS data (works without auth), or fall back to backend plan from dashboard
  const cmsPlanRaw = pricingPlansQuery.data?.find(
    (plan) => plan.slug === planSlug,
  ) || null;

  // If the plan doesn't exist in CMS (e.g. virtual-office), build a compatible object from backend plans
  const backendPlan = !cmsPlanRaw && dashboardData
    ? dashboardData.plans.find((p) => p.slug === planSlug) || null
    : null;

  const cmsPlan: { slug: string; name: string; price: number; period: string; description: string; features: string[]; isPopular: boolean } | null =
    cmsPlanRaw
      ? cmsPlanRaw
      : backendPlan
        ? {
            slug: backendPlan.slug,
            name: backendPlan.name,
            price: backendPlan.monthlyPriceMinor / 100,
            period: 'month',
            description: backendPlan.description,
            features: backendPlan.features,
            isPopular: false,
          }
        : null;

  // Still loading if CMS query is pending, or if CMS has no match and dashboard hasn't loaded yet
  const isPlanLoading = pricingPlansQuery.isLoading || (!cmsPlanRaw && !dashboardData && isAuthenticated && !error);

  const stripePublishableKey = dashboardData?.stripe.publishableKey || '';
  const existingMembership = dashboardData?.membership;

  const handleStartPayment = async () => {
    if (!cmsPlan) return;

    setIsCreatingDraft(true);
    setError('');

    try {
      if (existingMembership && existingMembership.status === 'active') {
        // Plan change flow — use changeMemberPlan which handles upgrade/downgrade
        const result = await changeMemberPlan(planSlug);

        if (result.action === 'payment_required' && result.clientSecret && result.paymentIntentId) {
          // Upgrade: show card form
          setPendingUpgradeAdjustmentId(result.adjustmentId);
          setPaymentDraft({
            clientSecret: result.clientSecret,
            paymentIntentId: result.paymentIntentId,
            subscriptionId: '',
            membershipId: existingMembership.id,
            plan: {
              slug: cmsPlan.slug,
              name: cmsPlan.name,
              monthlyPriceMinor: cmsPlan.price * 100,
              currency: result.currency || 'gbp',
            },
            subtotalMinor: result.subtotalMinor || 0,
            taxMinor: result.taxMinor || 0,
            totalMinor: result.paymentDueMinor,
            currency: result.currency || 'gbp',
          });
        } else if (result.action === 'scheduled') {
          // Downgrade scheduled
          setSuccess(
            `Your plan will change to ${cmsPlan.name} at the end of your billing period. Redirecting to dashboard...`,
          );
          setTimeout(() => { window.location.href = '/dashboard/billing'; }, 2500);
        } else {
          // Immediate no-cost switch
          setSuccess('Plan changed successfully! Redirecting to your dashboard...');
          setTimeout(() => { window.location.href = '/dashboard/billing'; }, 2000);
        }
      } else {
        // New membership — create payment draft
        const draft = await createMemberMembershipPaymentDraft(planSlug);
        setPaymentDraft(draft);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize payment.');
    } finally {
      setIsCreatingDraft(false);
    }
  };

  const handleConfirmPayment = async (paymentIntentId: string) => {
    setIsSubmitting(true);
    setError('');

    try {
      if (pendingUpgradeAdjustmentId) {
        // Upgrade confirmation
        await confirmMemberMembershipUpgradePayment(paymentIntentId, pendingUpgradeAdjustmentId);
        setSuccess('Plan upgraded successfully! Redirecting to your dashboard...');
      } else {
        // New membership confirmation
        await confirmMemberMembershipPayment(paymentIntentId);
        setSuccess('Membership activated successfully! Redirecting to your dashboard...');
      }
      setPaymentDraft(null);
      setTimeout(() => {
        window.location.href = '/dashboard/billing';
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to confirm payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelPayment = () => {
    setPaymentDraft(null);
    setError('');
  };

  // Loading states
  if (!isReady || isPlanLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfaf8]">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfaf8]">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!cmsPlan) {
    return (
      <section className="min-h-screen bg-[#fbfaf8] py-6 sm:py-8">
        <div className="container-custom">
          <a
            href="/pricing"
            className="inline-flex items-center gap-3 text-base font-semibold text-[#10153f] transition-opacity hover:opacity-70"
          >
            <ArrowLeft size={22} />
            <span>Back to pricing</span>
          </a>
          <div className="mt-12 text-center">
            <h1 className="text-3xl font-semibold text-[#10153f]">Plan not found</h1>
            <p className="mt-3 text-base text-[#10153f]/60">
              The membership plan you are looking for does not exist or is no longer available.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#fbfaf8] py-6 sm:py-8">
      <div className="container-custom">
        <a
          href="/pricing"
          className="inline-flex items-center gap-3 text-base font-semibold text-[#10153f] transition-opacity hover:opacity-70"
        >
          <ArrowLeft size={22} />
          <span>Back to pricing</span>
        </a>

        <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(380px,0.8fr)] xl:items-start">
          {/* Left column: Payment */}
          <div>
            <h1 className="font-sans text-[3.25rem] font-semibold tracking-tight leading-[0.94] text-[#10153f] sm:text-[4.5rem]">
              Checkout
            </h1>

            <div className="mt-5 space-y-5">
              {error ? (
                <Alert variant="destructive" className="border-red-200 bg-red-50 px-4 py-3 text-red-700 [&>svg]:text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}

              {success ? (
                <Alert className="border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 [&>svg]:text-emerald-700">
                  <Check className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              ) : null}

              {existingMembership && existingMembership.status === 'active' ? (
                <Alert className="border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 [&>svg]:text-amber-700">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    You already have an active <strong>{existingMembership.planName}</strong> membership.
                    Completing this purchase will change your plan to <strong>{cmsPlan.name}</strong>.
                  </AlertDescription>
                </Alert>
              ) : null}

              {/* Payment card form or start payment button */}
              {paymentDraft ? (
                <div className="space-y-5">
                  <div className="rounded-[2rem] border border-[#10153f]/15 bg-white p-5 sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#10153f]/60">Payment</p>
                        <h2 className="mt-1 text-[1.7rem] font-semibold tracking-tight text-[#10153f] sm:text-[2rem]">
                          Complete your payment
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm text-[#10153f]/65 sm:text-base">
                          Enter your card details below to activate your membership.
                        </p>
                      </div>
                      <div className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
                        {formatCurrencyMinor(paymentDraft.totalMinor, paymentDraft.currency)}
                      </div>
                    </div>

                    {/* Payment summary */}
                    <div className="mt-5 rounded-[1.5rem] border border-[#10153f]/10 bg-[#fbfaf8] p-4 sm:p-5">
                      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                          <p className="text-lg font-semibold text-[#10153f]">{paymentDraft.plan.name} Membership</p>
                          <p className="mt-2 text-sm text-[#10153f]/60">
                            {formatCurrencyMinor(paymentDraft.plan.monthlyPriceMinor, paymentDraft.plan.currency)} / month
                          </p>
                          {user ? (
                            <p className="mt-1 text-sm text-[#10153f]/60">{user.email}</p>
                          ) : null}
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#10153f]/45">Subtotal</p>
                            <p className="mt-2 text-lg font-semibold text-[#10153f]">
                              {formatCurrencyMinor(paymentDraft.subtotalMinor, paymentDraft.currency)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#10153f]/45">VAT</p>
                            <p className="mt-2 text-lg font-semibold text-[#10153f]">
                              {formatCurrencyMinor(paymentDraft.taxMinor, paymentDraft.currency)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#10153f]/45">Total</p>
                            <p className="mt-2 text-lg font-semibold text-[#10153f]">
                              {formatCurrencyMinor(paymentDraft.totalMinor, paymentDraft.currency)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stripe card elements */}
                    <div className="mt-5">
                      <MembershipPaymentCard
                        publishableKey={stripePublishableKey}
                        paymentDraft={paymentDraft}
                        isSubmitting={isSubmitting}
                        onConfirmPayment={handleConfirmPayment}
                        onCancel={handleCancelPayment}
                      />
                    </div>
                  </div>
                </div>
              ) : !success ? (
                <div className="rounded-[2rem] border border-[#10153f]/15 bg-white p-5 sm:p-6">
                  <div>
                    <p className="text-sm font-medium text-[#10153f]/60">Membership</p>
                    <h2 className="mt-1 text-[1.7rem] font-semibold tracking-tight text-[#10153f] sm:text-[2rem]">
                      Ready to get started?
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-[#10153f]/65 sm:text-base">
                      Click the button below to set up your payment and activate your <strong>{cmsPlan.name}</strong> membership.
                    </p>
                  </div>

                  <div className="mt-6">
                    <Button
                      onClick={() => void handleStartPayment()}
                      disabled={isCreatingDraft}
                      className="h-12 rounded-full bg-black px-8 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-60"
                    >
                      {isCreatingDraft ? (
                        <>
                          <LoaderCircle className="animate-spin mr-2" />
                          Setting up payment...
                        </>
                      ) : existingMembership && existingMembership.status === 'active' ? (
                        `Change to ${cmsPlan.name}`
                      ) : (
                        `Pay ${formatCurrencyWhole(cmsPlan.price)} / ${cmsPlan.period}`
                      )}
                    </Button>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-[#10153f]/45">
                    <ShieldCheck size={14} />
                    <span>Secure payment powered by Stripe</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Right column: Plan summary sidebar */}
          <div className="xl:sticky xl:top-6">
            <div className="rounded-[2rem] border border-[#10153f]/15 bg-white p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#10153f]/45">
                Plan summary
              </p>
              <h2 className="mt-3 font-sans text-[2.5rem] font-semibold tracking-tight leading-[0.94] text-[#10153f]">
                {cmsPlan.name}
              </h2>

              <div className="mt-4">
                <span className="text-4xl font-bold text-[#10153f]">
                  {formatCurrencyWhole(cmsPlan.price)}
                </span>
                <span className="text-sm text-[#10153f]/50"> / {cmsPlan.period}</span>
              </div>

              {cmsPlan.description ? (
                <p className="mt-3 text-sm leading-relaxed text-[#10153f]/65">{cmsPlan.description}</p>
              ) : null}

              {cmsPlan.features.length > 0 ? (
                <div className="mt-5 border-t border-[#10153f]/10 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#10153f]/45 mb-3">
                    What's included
                  </p>
                  <ul className="space-y-2.5">
                    {cmsPlan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5 text-sm text-[#10153f]">
                        <Check className="w-4 h-4 text-[#10153f]/70 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {user ? (
                <div className="mt-5 border-t border-[#10153f]/10 pt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#10153f]/45 mb-2">
                    Account
                  </p>
                  <p className="text-sm font-medium text-[#10153f]">{user.name}</p>
                  <p className="text-sm text-[#10153f]/60">{user.email}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
