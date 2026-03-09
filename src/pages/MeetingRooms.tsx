import { useEffect, useMemo, useRef, useState } from 'react';
import type { Stripe, StripeElements } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp, LoaderCircle, Wifi } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/shared/HeroSection';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useMeetingRooms, useMeetingRoomsPageContent, usePricingPlans } from '@/hooks/useCmsContent';
import { contentIconMap } from '@/lib/site-icons';
import {
  cancelGuestMeetingRoomBookingPayment,
  confirmGuestMeetingRoomBookingPayment,
  createGuestMeetingRoomBookingPaymentIntent,
  listPublicMeetingRoomResources,
  type BookingPaymentDraft,
  type MemberResource,
} from '@/lib/member-api';

type GuestBookingFormState = {
  guestName: string;
  guestEmail: string;
  startAt: string;
  endAt: string;
  purpose: string;
  notes: string;
};

function truncateDescription(value: string, maxLength = 180) {
  const normalized = value.trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}...`;
}

function formatCurrency(amountMinor: number, currency = 'gbp') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format((Number(amountMinor || 0)) / 100);
}

function formatDate(isoDate: string | null, options?: Intl.DateTimeFormatOptions) {
  if (!isoDate) {
    return '-';
  }

  return new Date(isoDate).toLocaleDateString('en-GB', options || {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime(isoDate: string | null) {
  if (!isoDate) {
    return '-';
  }

  return new Date(isoDate).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatDateTimeInputValue(value: Date) {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = `${value.getDate()}`.padStart(2, '0');
  const hours = `${value.getHours()}`.padStart(2, '0');
  const minutes = `${value.getMinutes()}`.padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatDurationLabel(startAt: string, endAt: string) {
  const durationMs = new Date(endAt).getTime() - new Date(startAt).getTime();
  const totalMinutes = Math.max(0, Math.round(durationMs / (60 * 1000)));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (!hours) {
    return `${minutes} min`;
  }

  if (!minutes) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

function buildDefaultBookingRange() {
  const start = new Date();
  start.setMinutes(0, 0, 0);
  start.setHours(start.getHours() + 2);

  const end = new Date(start);
  end.setHours(end.getHours() + 1);

  return {
    startAt: formatDateTimeInputValue(start),
    endAt: formatDateTimeInputValue(end),
  };
}

function validateBookingWindow(startAt: string, endAt: string) {
  if (!startAt || !endAt) {
    throw new Error('Start and end time are required.');
  }

  const startDate = new Date(startAt);
  const endDate = new Date(endAt);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    throw new Error('Start and end time are invalid.');
  }

  if (endDate.getTime() <= startDate.getTime()) {
    throw new Error('End time must be after the start time.');
  }

  if (endDate.getTime() - startDate.getTime() > 24 * 60 * 60 * 1000) {
    throw new Error('Bookings cannot be longer than 24 hours.');
  }
}

function GuestPaymentPanel({
  publishableKey,
  paymentDraft,
  isSubmitting,
  onConfirmPayment,
  onCancelPayment,
}: {
  publishableKey: string;
  paymentDraft: BookingPaymentDraft | null;
  isSubmitting: boolean;
  onConfirmPayment: (paymentIntentId: string) => Promise<void>;
  onCancelPayment: () => Promise<void> | void;
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
      || !paymentDraft?.clientSecret
      || !cardNumberContainerRef.current
      || !cardExpiryContainerRef.current
      || !cardCvcContainerRef.current
    ) {
      return;
    }

    let active = true;
    let mountedCardNumber: ReturnType<StripeElements['create']> | null = null;
    let mountedCardExpiry: ReturnType<StripeElements['create']> | null = null;
    let mountedCardCvc: ReturnType<StripeElements['create']> | null = null;

    setReadyCount(0);
    setElementError('');

    void loadStripe(publishableKey)
      .then((stripe) => {
        if (!active) {
          return;
        }

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
              color: '#111111',
              fontFamily: 'inherit',
              fontSize: '16px',
              '::placeholder': {
                color: 'rgba(17, 17, 17, 0.4)',
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
  }, [paymentDraft?.clientSecret, publishableKey]);

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

    const result = await stripeRef.current.confirmCardPayment(paymentDraft?.clientSecret || '', {
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

  if (!paymentDraft?.booking) {
    return null;
  }

  return (
    <div className="rounded-[28px] border border-black bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-7">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-sm text-black/45">Payment required</p>
          <h3 className="mt-2 font-sans text-4xl leading-none">Complete your meeting room booking</h3>
          <p className="mt-3 max-w-2xl text-base text-black/55">
            Pay below to confirm your room without creating an account.
          </p>
        </div>
        <div className="rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
          {formatCurrency(paymentDraft.booking.totalMinor, paymentDraft.booking.currency)}
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-black/10 bg-[#f9f7f3] p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-xl font-semibold tracking-tight text-black">{paymentDraft.booking.resourceName}</p>
            <p className="mt-2 text-sm text-black/50">
              {formatDate(paymentDraft.booking.startAt, {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
            <p className="mt-1 text-sm text-black/50">
              {formatTime(paymentDraft.booking.startAt)} - {formatTime(paymentDraft.booking.endAt)} • {formatDurationLabel(paymentDraft.booking.startAt, paymentDraft.booking.endAt)}
            </p>
            <p className="mt-1 text-sm text-black/50">{paymentDraft.booking.location}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">Subtotal</p>
              <p className="mt-2 text-lg font-semibold text-black">{formatCurrency(paymentDraft.booking.subtotalMinor, paymentDraft.booking.currency)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">VAT</p>
              <p className="mt-2 text-lg font-semibold text-black">{formatCurrency(paymentDraft.booking.taxMinor, paymentDraft.booking.currency)}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/40">Total</p>
              <p className="mt-2 text-lg font-semibold text-black">{formatCurrency(paymentDraft.booking.totalMinor, paymentDraft.booking.currency)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-[24px] border border-black/10 bg-white p-5">
        <p className="text-sm font-medium text-black/55">Card details</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label className="mb-2 block text-sm text-black/55">Card number</Label>
            <div className="rounded-[20px] border border-black/10 bg-[#fcfcfb] px-4 py-4">
              <div ref={cardNumberContainerRef} />
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm text-black/55">Expiry</Label>
            <div className="rounded-[20px] border border-black/10 bg-[#fcfcfb] px-4 py-4">
              <div ref={cardExpiryContainerRef} />
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-sm text-black/55">CVC</Label>
            <div className="rounded-[20px] border border-black/10 bg-[#fcfcfb] px-4 py-4">
              <div ref={cardCvcContainerRef} />
            </div>
          </div>
        </div>

        {!isElementReady && !elementError ? (
          <p className="mt-4 text-sm text-black/45">Loading Stripe card form...</p>
        ) : null}
        {elementError ? (
          <p className="mt-4 text-sm text-red-600">{elementError}</p>
        ) : null}

        <div className="mt-6 flex flex-wrap justify-end gap-3">
          <Button
            variant="secondary"
            onClick={() => void onCancelPayment()}
            disabled={isSubmitting}
            className="h-11 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-[#f3f2ef]"
          >
            Cancel payment
          </Button>
          <Button
            onClick={() => void handleConfirmClick()}
            disabled={isSubmitting || !isElementReady}
            className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
          >
            {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
            Pay and book
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function MeetingRooms() {
  const meetingRoomsQuery = useMeetingRooms();
  const meetingPlansQuery = usePricingPlans('meeting-room');
  const meetingRoomsPageQuery = useMeetingRoomsPageContent();
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const defaultRange = useMemo(() => buildDefaultBookingRange(), []);
  const [availabilityWindow, setAvailabilityWindow] = useState(defaultRange);
  const [availabilityResources, setAvailabilityResources] = useState<MemberResource[]>([]);
  const [stripePublishableKey, setStripePublishableKey] = useState('');
  const [availabilityError, setAvailabilityError] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedResource, setSelectedResource] = useState<MemberResource | null>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [paymentDraft, setPaymentDraft] = useState<BookingPaymentDraft | null>(null);
  const [guestBookingForm, setGuestBookingForm] = useState<GuestBookingFormState>({
    guestName: '',
    guestEmail: '',
    startAt: defaultRange.startAt,
    endAt: defaultRange.endAt,
    purpose: '',
    notes: '',
  });

  useEffect(() => {
    let active = true;
    setIsAvailabilityLoading(true);
    setAvailabilityError('');

    void listPublicMeetingRoomResources({
      startAt: new Date(availabilityWindow.startAt).toISOString(),
      endAt: new Date(availabilityWindow.endAt).toISOString(),
    })
      .then((payload) => {
        if (!active) {
          return;
        }

        setAvailabilityResources(payload.resources);
        setStripePublishableKey(payload.stripe.publishableKey || '');
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setAvailabilityError(error instanceof Error ? error.message : 'Failed to load meeting room availability.');
      })
      .finally(() => {
        if (active) {
          setIsAvailabilityLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [availabilityWindow.endAt, availabilityWindow.startAt]);

  const handleAvailabilityWindowChange = (field: 'startAt' | 'endAt', value: string) => {
    setAvailabilityWindow((current) => ({ ...current, [field]: value }));
  };

  const openGuestBookingDialog = (resource: MemberResource) => {
    setSelectedResource(resource);
    setBookingError('');
    setBookingSuccess('');
    setGuestBookingForm((current) => ({
      ...current,
      startAt: availabilityWindow.startAt,
      endAt: availabilityWindow.endAt,
      purpose: '',
      notes: '',
    }));
    setIsBookingDialogOpen(true);
  };

  const handleGuestBookingFormChange = (field: keyof GuestBookingFormState, value: string) => {
    setGuestBookingForm((current) => ({ ...current, [field]: value }));
  };

  const handleCreateGuestBooking = async () => {
    if (!selectedResource) {
      return;
    }

    setIsSubmitting(true);
    setBookingError('');
    setBookingSuccess('');

    try {
      validateBookingWindow(guestBookingForm.startAt, guestBookingForm.endAt);

      const draft = await createGuestMeetingRoomBookingPaymentIntent({
        guestName: guestBookingForm.guestName,
        guestEmail: guestBookingForm.guestEmail,
        resourceId: selectedResource.id,
        startAt: new Date(guestBookingForm.startAt).toISOString(),
        endAt: new Date(guestBookingForm.endAt).toISOString(),
        purpose: guestBookingForm.purpose,
        notes: guestBookingForm.notes,
      });

      if (!draft.booking) {
        throw new Error('Booking draft could not be created.');
      }

      if (!draft.clientSecret) {
        setIsBookingDialogOpen(false);
        setBookingSuccess('Meeting room booked successfully.');
        return;
      }

      if (!stripePublishableKey) {
        await cancelGuestMeetingRoomBookingPayment({
          bookingId: draft.booking.id,
          guestEmail: guestBookingForm.guestEmail,
        });
        throw new Error('Stripe publishable key is missing.');
      }

      setPaymentDraft(draft);
      setIsBookingDialogOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Failed to create guest booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmGuestBookingPayment = async (paymentIntentId: string) => {
    if (!paymentDraft?.booking?.id || !guestBookingForm.guestEmail) {
      return;
    }

    setIsSubmitting(true);
    setBookingError('');
    setBookingSuccess('');

    try {
      await confirmGuestMeetingRoomBookingPayment({
        bookingId: paymentDraft.booking.id,
        guestEmail: guestBookingForm.guestEmail,
        paymentIntentId,
      });

      setPaymentDraft(null);
      setBookingSuccess('Meeting room booked and paid successfully.');

      const payload = await listPublicMeetingRoomResources({
        startAt: new Date(availabilityWindow.startAt).toISOString(),
        endAt: new Date(availabilityWindow.endAt).toISOString(),
      });
      setAvailabilityResources(payload.resources);
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Failed to finalize guest booking payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelGuestBookingPayment = async () => {
    if (!paymentDraft?.booking?.id || !guestBookingForm.guestEmail) {
      setPaymentDraft(null);
      return;
    }

    try {
      await cancelGuestMeetingRoomBookingPayment({
        bookingId: paymentDraft.booking.id,
        guestEmail: guestBookingForm.guestEmail,
      });
    } catch {
      // Ignore cancellation failures so the guest can still continue browsing.
    }

    setPaymentDraft(null);
    const payload = await listPublicMeetingRoomResources({
      startAt: new Date(availabilityWindow.startAt).toISOString(),
      endAt: new Date(availabilityWindow.endAt).toISOString(),
    });
    setAvailabilityResources(payload.resources);
  };

  if (meetingRoomsQuery.isLoading || meetingPlansQuery.isLoading || meetingRoomsPageQuery.isLoading) {
    return null;
  }

  if (
    meetingRoomsQuery.isError
    || meetingPlansQuery.isError
    || meetingRoomsPageQuery.isError
    || !meetingRoomsPageQuery.data
    || !meetingRoomsQuery.data
    || !meetingPlansQuery.data
    || meetingRoomsQuery.data.length === 0
    || meetingPlansQuery.data.length === 0
  ) {
    return (
      <Layout>
        <CmsNoData />
      </Layout>
    );
  }

  const cmsRooms = meetingRoomsQuery.data;
  const cmsMeetingPlans = meetingPlansQuery.data;
  const content = meetingRoomsPageQuery.data;

  const rooms = cmsRooms.map((room) => ({
    id: room.slug || room.id,
    name: room.name,
    description: room.description || '',
    features: room.features,
    image: room.image || '',
    badges: room.badges,
  }));

  const roomPlans = cmsMeetingPlans.map((plan) => ({
    id: plan.slug || plan.id,
    name: plan.name,
    price: plan.price,
    period: plan.period,
    isPopular: plan.isPopular,
  }));

  return (
    <Layout
      seo={{
        title: content.heroTitle,
        description: content.heroSubtitle || content.roomsSubtitle,
        image: content.heroBackgroundImage || rooms[0]?.image,
      }}
    >
      <HeroSection
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        backgroundImage={content.heroBackgroundImage}
        size="sm"
      />

      {/* Live availability kutusu istek uzerine gecici olarak yorumlandi. */}

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="font-sans text-5xl md:text-6xl leading-tight mb-4">{content.roomsTitle}</h2>
            <p className="text-lg text-black/55">{content.roomsSubtitle}</p>
          </div>
          <div className="space-y-12">
            {rooms.map((room) => {
              const isExpanded = expandedRoomId === room.id;
              const visibleFeatures = isExpanded ? room.features : room.features.slice(0, 3);

              return (
                <div key={room.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="relative lg:order-1">
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {room.badges.map((badge) => (
                        <span key={badge} className="inline-flex h-7 items-center rounded-full bg-black px-3 text-xs text-white">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-black/10 bg-white p-7 md:p-9 lg:order-2 transition-all duration-300">
                    <h3 className="font-sans text-5xl leading-none mb-4">{room.name}</h3>
                    <p className="text-black/60 mb-6 leading-relaxed">
                      {isExpanded ? room.description : truncateDescription(room.description)}
                    </p>
                    <ul className="space-y-2 mb-7">
                      {visibleFeatures.map((feature) => (
                        <li key={feature} className="flex items-center gap-2.5 text-sm text-black/85">
                          <span className="w-1.5 h-1.5 rounded-full bg-black" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        onClick={() => setExpandedRoomId(isExpanded ? null : room.id)}
                        className="h-9 rounded-lg px-4 text-sm bg-black text-white hover:bg-black/90"
                      >
                        {isExpanded ? content.readMoreLabel.replace(/more/i, 'less') : content.readMoreLabel}
                        {isExpanded ? <ChevronUp /> : <ChevronDown />}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#efefef]">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="font-sans text-5xl md:text-6xl leading-tight mb-4">{content.amenitiesTitle}</h2>
            <p className="text-lg text-black/55">{content.amenitiesSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.amenities.map((amenity) => {
              const Icon = contentIconMap[amenity.icon] || Wifi;
              return (
                <article key={amenity.title} className="rounded-2xl border border-black/10 bg-white p-8 text-center">
                  <div className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center mx-auto mb-5">
                    <Icon size={18} className="text-black/70" />
                  </div>
                  <h3 className="font-sans text-4xl leading-none mb-3">{amenity.title}</h3>
                  <p className="text-black/55">{amenity.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="font-sans text-5xl md:text-6xl leading-tight mb-4">{content.plansTitle}</h2>
            <p className="text-lg text-black/55">{content.plansSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {roomPlans.map((plan) => (
              <div
                key={plan.id}
                className={`rounded-2xl border p-6 text-center relative bg-white ${
                  plan.isPopular ? 'border-black shadow-[0_0_0_1px_#000]' : 'border-black/10'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex h-6 items-center rounded-full bg-black px-3 text-xs text-white">{content.popularLabel}</span>
                  </div>
                )}
                <h3 className="font-sans text-4xl leading-none mb-3">{plan.name}</h3>
                <div className="mb-5">
                  <span className="text-5xl font-bold leading-none">£{plan.price}</span>
                  <span className="text-black/45">/{plan.period}</span>
                </div>
                <Button asChild className="h-10 rounded-lg px-5 text-sm w-full bg-black text-white hover:bg-black/90">
                  <Link to="/pricing">{content.getStartedLabel}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="max-w-2xl rounded-[28px] border-black/10 bg-[#fbfaf8] p-0">
          <div className="p-6 sm:p-7">
            <DialogHeader className="space-y-3 text-left">
              <DialogTitle className="text-[2rem] font-semibold tracking-tight text-black">
                Book {selectedResource?.name || 'meeting room'}
              </DialogTitle>
              <DialogDescription className="text-base text-black/50">
                Enter your details to reserve the room and continue to payment on this page.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="guest-booking-name">Full name</Label>
                <Input
                  id="guest-booking-name"
                  value={guestBookingForm.guestName}
                  onChange={(event) => handleGuestBookingFormChange('guestName', event.target.value)}
                  className="h-11 rounded-2xl border-black/10 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guest-booking-email">Email</Label>
                <Input
                  id="guest-booking-email"
                  type="email"
                  value={guestBookingForm.guestEmail}
                  onChange={(event) => handleGuestBookingFormChange('guestEmail', event.target.value)}
                  className="h-11 rounded-2xl border-black/10 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guest-booking-start">Start</Label>
                <Input
                  id="guest-booking-start"
                  type="datetime-local"
                  value={guestBookingForm.startAt}
                  onChange={(event) => handleGuestBookingFormChange('startAt', event.target.value)}
                  className="h-11 rounded-2xl border-black/10 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guest-booking-end">End</Label>
                <Input
                  id="guest-booking-end"
                  type="datetime-local"
                  value={guestBookingForm.endAt}
                  onChange={(event) => handleGuestBookingFormChange('endAt', event.target.value)}
                  className="h-11 rounded-2xl border-black/10 bg-white"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="guest-booking-purpose">Purpose</Label>
                <Input
                  id="guest-booking-purpose"
                  value={guestBookingForm.purpose}
                  onChange={(event) => handleGuestBookingFormChange('purpose', event.target.value)}
                  className="h-11 rounded-2xl border-black/10 bg-white"
                  placeholder="Client presentation"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="guest-booking-notes">Notes</Label>
                <Textarea
                  id="guest-booking-notes"
                  value={guestBookingForm.notes}
                  onChange={(event) => handleGuestBookingFormChange('notes', event.target.value)}
                  className="min-h-[120px] rounded-2xl border-black/10 bg-white"
                  placeholder="Any setup requirements"
                />
              </div>
            </div>

            <DialogFooter className="mt-6 gap-3 sm:justify-end">
              <Button
                variant="secondary"
                onClick={() => setIsBookingDialogOpen(false)}
                className="h-11 rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black hover:bg-[#f3f2ef]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateGuestBooking}
                disabled={isSubmitting}
                className="h-11 rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
              >
                {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
                Continue to payment
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
