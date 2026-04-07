import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { loadStripe, type Stripe, type StripeCardCvcElement, type StripeCardExpiryElement, type StripeCardNumberElement, type StripeElements } from '@stripe/stripe-js';
import { AlertCircle, ArrowLeft, Check, Clock3, LoaderCircle, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { meetingRooms as fallbackMeetingRooms } from '@/data/mockData';
import { useMeetingRooms } from '@/hooks/useCmsContent';
import {
  cancelGuestMeetingRoomBookingPayment,
  confirmGuestMeetingRoomBookingPayment,
  createGuestMeetingRoomBookingPaymentIntent,
  listPublicMeetingRoomResources,
  type BookingPaymentDraft,
  type MemberResource,
} from '@/lib/member-api';

/** Full-hour time options from 07:00 to 21:00 */
const HOUR_OPTIONS: string[] = [];
for (let hour = 7; hour <= 21; hour += 1) {
  HOUR_OPTIONS.push(`${String(hour).padStart(2, '0')}:00`);
}

type GuestBookingPageFormState = {
  guestName: string;
  guestEmail: string;
  date: string;
  purpose: string;
  notes: string;
};

type HourSlotInfo = {
  time: string;
  label: string;
  available: boolean;
  isPast: boolean;
};

function normalizeRoomKey(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function normalizeFallbackRoomKey(value: string) {
  return normalizeRoomKey(value).replace(/-?\d+$/, '');
}

function formatDateTimeInputValue(value: Date) {
  const year = value.getFullYear();
  const month = `${value.getMonth() + 1}`.padStart(2, '0');
  const day = `${value.getDate()}`.padStart(2, '0');
  const hours = `${value.getHours()}`.padStart(2, '0');
  const minutes = `${value.getMinutes()}`.padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function formatDateInputValue(value: Date) {
  return formatDateTimeInputValue(value).slice(0, 10);
}

function buildDefaultDate() {
  const now = new Date();
  return formatDateInputValue(now);
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

function formatCurrency(amountMinor: number, currency = 'gbp') {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format((Number(amountMinor || 0)) / 100);
}

function formatLongDate(value: string) {
  return new Date(value).toLocaleDateString('en-GB', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTimeLabel(time: string) {
  const [hourStr] = time.split(':');
  const hour = Number(hourStr);
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${period}`;
}

function formatTimeRange(startTime: string, endHour: number) {
  const startLabel = formatTimeLabel(startTime);
  const endPeriod = endHour >= 12 ? 'PM' : 'AM';
  const endDisplay = endHour === 0 ? 12 : endHour > 12 ? endHour - 12 : endHour;
  return `${startLabel} - ${endDisplay}:00 ${endPeriod}`;
}

function GuestBookingPaymentCard({
  publishableKey,
  paymentDraft,
  isSubmitting,
  onConfirmPayment,
  onCancelPayment,
}: {
  publishableKey: string;
  paymentDraft: BookingPaymentDraft;
  isSubmitting: boolean;
  onConfirmPayment: (paymentIntentId: string) => Promise<void>;
  onCancelPayment: () => Promise<void>;
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
    <div className="rounded-[2rem] border border-[#10153f]/15 bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#10153f]/60">Payment</p>
          <h2 className="mt-1 text-[1.7rem] font-semibold tracking-tight text-[#10153f] sm:text-[2rem]">Complete payment on this page</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#10153f]/65 sm:text-base">
            Enter your card details below to finish the booking without leaving this page.
          </p>
        </div>
        <div className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          {formatCurrency(paymentDraft.booking?.totalMinor || 0, paymentDraft.booking?.currency || 'gbp')}
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-[#10153f]/10 bg-[#fbfaf8] p-4 sm:p-5">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-lg font-semibold text-[#10153f]">{paymentDraft.booking?.resourceName}</p>
            <p className="mt-2 text-sm text-[#10153f]/60">
              {paymentDraft.booking?.startAt ? formatLongDate(paymentDraft.booking.startAt) : ''}
            </p>
            <p className="mt-1 text-sm text-[#10153f]/60">
              {paymentDraft.booking?.startAt ? formatTimeLabel(paymentDraft.booking.startAt.slice(11, 16)) : ''}
              {' - '}
              {paymentDraft.booking?.endAt ? formatTimeLabel(paymentDraft.booking.endAt.slice(11, 16)) : ''}
            </p>
            <p className="mt-1 text-sm text-[#10153f]/60">{paymentDraft.booking?.location}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#10153f]/45">Subtotal</p>
              <p className="mt-2 text-lg font-semibold text-[#10153f]">{formatCurrency(paymentDraft.booking?.subtotalMinor || 0, paymentDraft.booking?.currency || 'gbp')}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#10153f]/45">VAT</p>
              <p className="mt-2 text-lg font-semibold text-[#10153f]">{formatCurrency(paymentDraft.booking?.taxMinor || 0, paymentDraft.booking?.currency || 'gbp')}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#10153f]/45">Total</p>
              <p className="mt-2 text-lg font-semibold text-[#10153f]">{formatCurrency(paymentDraft.booking?.totalMinor || 0, paymentDraft.booking?.currency || 'gbp')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-[1.5rem] border border-[#10153f]/10 bg-white p-4 sm:p-5">
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
            onClick={() => void onCancelPayment()}
            disabled={isSubmitting}
            className="h-11 rounded-full border border-[#10153f]/15 bg-white px-5 text-sm font-medium text-[#10153f] hover:bg-[#fbfaf8]"
          >
            Cancel payment
          </Button>
          <Button
            type="button"
            onClick={() => void handleConfirmClick()}
            disabled={isSubmitting || !isElementReady}
            className="h-11 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
            Pay now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function MeetingRoomBooking() {
  const { roomSlug = '' } = useParams();
  const navigate = useNavigate();
  const meetingRoomsQuery = useMeetingRooms();
  const [availabilityResources, setAvailabilityResources] = useState<MemberResource[]>([]);
  const [stripePublishableKey, setStripePublishableKey] = useState('');
  const [availabilityError, setAvailabilityError] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentDraft, setPaymentDraft] = useState<BookingPaymentDraft | null>(null);

  // Day slot availability
  const [daySlotAvailability, setDaySlotAvailability] = useState<Map<string, boolean>>(new Map());
  const [isDaySlotsLoading, setIsDaySlotsLoading] = useState(false);

  // Selected hours (multi-select consecutive)
  const [selectedHours, setSelectedHours] = useState<string[]>([]);

  const [formState, setFormState] = useState<GuestBookingPageFormState>({
    guestName: '',
    guestEmail: '',
    date: buildDefaultDate(),
    purpose: '',
    notes: '',
  });

  // Derived: arrival time is the first selected hour, duration from count
  const arrivalTime = useMemo(() => {
    if (selectedHours.length === 0) return '';
    const sorted = [...selectedHours].sort();
    return sorted[0];
  }, [selectedHours]);

  const durationMinutes = useMemo(() => selectedHours.length * 60, [selectedHours]);

  const bookingStartAt = useMemo(() => {
    if (!formState.date || !arrivalTime) return '';
    return `${formState.date}T${arrivalTime}`;
  }, [arrivalTime, formState.date]);

  const bookingEndAt = useMemo(() => {
    if (!bookingStartAt || durationMinutes === 0) return '';
    const startDate = new Date(bookingStartAt);
    if (Number.isNaN(startDate.getTime())) return '';
    return formatDateTimeInputValue(new Date(startDate.getTime() + durationMinutes * 60 * 1000));
  }, [bookingStartAt, durationMinutes]);

  // Calendar selected date as Date object
  const selectedCalendarDate = useMemo(() => {
    if (!formState.date) return undefined;
    const [year, month, day] = formState.date.split('-').map(Number);
    return new Date(year, month - 1, day);
  }, [formState.date]);

  const fallbackImage = useMemo(() => {
    const roomKey = normalizeFallbackRoomKey(roomSlug);
    const matchingFallback = fallbackMeetingRooms.find((room) => (
      normalizeFallbackRoomKey(room.id) === roomKey
      || normalizeFallbackRoomKey(room.name) === roomKey
    ));
    return matchingFallback?.image || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200';
  }, [roomSlug]);

  const [summaryImageSrc, setSummaryImageSrc] = useState(fallbackImage);

  const selectedRoom = useMemo(() => {
    if (!meetingRoomsQuery.data) return null;
    return meetingRoomsQuery.data.find((room) => (
      normalizeRoomKey(room.slug || room.id) === normalizeRoomKey(roomSlug)
      || normalizeRoomKey(room.name) === normalizeRoomKey(roomSlug)
    )) || null;
  }, [meetingRoomsQuery.data, roomSlug]);

  useEffect(() => {
    setSummaryImageSrc(selectedRoom?.image || fallbackImage);
  }, [fallbackImage, selectedRoom?.image]);

  const selectedResource = useMemo(() => {
    if (!selectedRoom) return null;

    const exactMatch = availabilityResources.find((resource) => (
      normalizeRoomKey(resource.slug) === normalizeRoomKey(selectedRoom.slug || selectedRoom.id)
      || normalizeRoomKey(resource.name) === normalizeRoomKey(selectedRoom.name)
    ));
    if (exactMatch) return exactMatch;
    if (!availabilityResources.length) return null;

    const capacity = Number(selectedRoom.capacity || 0);
    if (!capacity) return availabilityResources[0] || null;

    return [...availabilityResources]
      .sort((left, right) => {
        const leftDiff = Math.abs(Number(left.capacity || 0) - capacity);
        const rightDiff = Math.abs(Number(right.capacity || 0) - capacity);
        if (leftDiff !== rightDiff) return leftDiff - rightDiff;
        return Number(right.capacity || 0) - Number(left.capacity || 0);
      })[0] || null;
  }, [availabilityResources, selectedRoom]);

  const durationLabel = useMemo(() => {
    if (selectedHours.length === 0) return 'No hours selected';
    if (selectedHours.length === 1) return '1 hour';
    return `${selectedHours.length} hours`;
  }, [selectedHours]);

  const totalMinor = useMemo(() => {
    if (!selectedResource?.hourlyRateMinor || selectedHours.length === 0) return 0;
    return Math.round(selectedResource.hourlyRateMinor * selectedHours.length);
  }, [selectedHours.length, selectedResource?.hourlyRateMinor]);

  // Fetch availability for the selected booking window (for submit validation)
  useEffect(() => {
    if (!bookingStartAt || !bookingEndAt) {
      return;
    }

    let active = true;
    setIsAvailabilityLoading(true);
    setAvailabilityError('');

    void listPublicMeetingRoomResources({
      startAt: new Date(bookingStartAt).toISOString(),
      endAt: new Date(bookingEndAt).toISOString(),
    })
      .then((payload) => {
        if (active) {
          setAvailabilityResources(payload.resources);
          setStripePublishableKey(payload.stripe.publishableKey || '');
        }
      })
      .catch((error) => {
        if (active) setAvailabilityError(error instanceof Error ? error.message : 'Failed to load meeting room availability.');
      })
      .finally(() => {
        if (active) setIsAvailabilityLoading(false);
      });

    return () => { active = false; };
  }, [bookingEndAt, bookingStartAt]);

  // Fetch availability for ALL hour slots of the selected day
  const fetchDaySlotAvailability = useCallback(async (dateStr: string) => {
    setIsDaySlotsLoading(true);
    const newAvailability = new Map<string, boolean>();

    try {
      const checks = HOUR_OPTIONS.map(async (time) => {
        const slotStart = new Date(`${dateStr}T${time}`);
        const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000);

        try {
          const payload = await listPublicMeetingRoomResources({
            startAt: slotStart.toISOString(),
            endAt: slotEnd.toISOString(),
          });

          if (payload.stripe.publishableKey) {
            setStripePublishableKey(payload.stripe.publishableKey);
          }

          const resource = payload.resources.find((r) =>
            normalizeRoomKey(r.slug) === normalizeRoomKey(roomSlug)
            || normalizeRoomKey(r.name) === normalizeRoomKey(roomSlug)
          ) || payload.resources[0];

          newAvailability.set(time, resource ? resource.available !== false : false);
        } catch {
          newAvailability.set(time, true);
        }
      });

      await Promise.all(checks);
    } catch {
      // If all fail, assume all available
    }

    setDaySlotAvailability(newAvailability);
    setIsDaySlotsLoading(false);
  }, [roomSlug]);

  // Fetch day slots when date changes; also clear selection
  useEffect(() => {
    setSelectedHours([]);
    if (formState.date) {
      void fetchDaySlotAvailability(formState.date);
    }
  }, [formState.date, fetchDaySlotAvailability]);

  // Build hour slot list with availability
  const hourSlots = useMemo((): HourSlotInfo[] => {
    const now = new Date();
    const todayStr = formatDateInputValue(now);
    const isToday = formState.date === todayStr;

    return HOUR_OPTIONS.map((time) => {
      const hour = Number(time.split(':')[0]);
      const isPast = isToday && hour <= now.getHours();
      const available = daySlotAvailability.get(time) ?? true;

      return {
        time,
        label: formatTimeLabel(time),
        available: !isPast && available,
        isPast,
      };
    });
  }, [formState.date, daySlotAvailability]);

  // Handle clicking an hour slot: toggle, and ensure selection stays consecutive
  const handleHourClick = useCallback((clickedTime: string, slotAvailable: boolean) => {
    if (!slotAvailable) return;

    setSelectedHours((prev) => {
      const isAlreadySelected = prev.includes(clickedTime);

      if (isAlreadySelected) {
        // Deselecting: remove this hour. If it breaks the chain, keep only the
        // contiguous block that includes the earliest selected hour.
        const remaining = prev.filter((t) => t !== clickedTime).sort();
        if (remaining.length === 0) return [];

        // Find the contiguous block from the start
        const contiguous: string[] = [remaining[0]];
        for (let i = 1; i < remaining.length; i++) {
          const prevHour = Number(remaining[i - 1].split(':')[0]);
          const currHour = Number(remaining[i].split(':')[0]);
          if (currHour === prevHour + 1) {
            contiguous.push(remaining[i]);
          } else {
            break;
          }
        }
        return contiguous;
      }

      // Selecting a new hour
      if (prev.length === 0) {
        return [clickedTime];
      }

      // Add to selection and keep only the contiguous block that includes the clicked hour
      const allHours = [...prev, clickedTime].sort();
      const clickedIndex = allHours.indexOf(clickedTime);

      // Expand from clicked hour in both directions to find the full contiguous block
      let start = clickedIndex;
      let end = clickedIndex;

      while (start > 0) {
        const prevHour = Number(allHours[start - 1].split(':')[0]);
        const currHour = Number(allHours[start].split(':')[0]);
        if (currHour === prevHour + 1) {
          start--;
        } else {
          break;
        }
      }

      while (end < allHours.length - 1) {
        const currHour = Number(allHours[end].split(':')[0]);
        const nextHour = Number(allHours[end + 1].split(':')[0]);
        if (nextHour === currHour + 1) {
          end++;
        } else {
          break;
        }
      }

      return allHours.slice(start, end + 1);
    });
  }, []);

  const isRoomUnavailable = selectedResource ? selectedResource.available === false : true;
  const hasSelection = selectedHours.length > 0;

  const handleFieldChange = (field: keyof GuestBookingPageFormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    handleFieldChange('date', formatDateInputValue(date));
  };

  const handleSubmit = async () => {
    if (!selectedRoom || !selectedResource) {
      setBookingError('This meeting room is not available for the selected time.');
      return;
    }

    if (!hasSelection) {
      setBookingError('Please select at least one hour.');
      return;
    }

    setIsSubmitting(true);
    setBookingError('');
    setBookingSuccess('');

    try {
      validateBookingWindow(bookingStartAt, bookingEndAt);

      if (!formState.guestName.trim()) {
        throw new Error('Full name is required.');
      }

      if (!formState.guestEmail.trim()) {
        throw new Error('Email is required.');
      }

      const draft = await createGuestMeetingRoomBookingPaymentIntent({
        guestName: formState.guestName.trim(),
        guestEmail: formState.guestEmail.trim(),
        resourceId: selectedResource.id,
        startAt: new Date(bookingStartAt).toISOString(),
        endAt: new Date(bookingEndAt).toISOString(),
        purpose: formState.purpose.trim() || `Meeting room booking for ${selectedRoom.name}`,
        notes: formState.notes.trim(),
      });

      if (!draft.booking || !draft.clientSecret) {
        setBookingSuccess('Meeting room booked successfully.');
        return;
      }

      setPaymentDraft(draft);
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Failed to create guest booking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmPayment = async (paymentIntentId: string) => {
    if (!paymentDraft?.booking?.id) {
      return;
    }

    setIsSubmitting(true);
    setBookingError('');
    setBookingSuccess('');

    try {
      await confirmGuestMeetingRoomBookingPayment({
        bookingId: paymentDraft.booking.id,
        guestEmail: formState.guestEmail.trim(),
        paymentIntentId,
      });
      setPaymentDraft(null);
      setSelectedHours([]);
      navigate('/');
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Failed to finalize booking payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelPayment = async () => {
    if (!paymentDraft?.booking?.id) {
      setPaymentDraft(null);
      return;
    }

    setIsSubmitting(true);

    try {
      await cancelGuestMeetingRoomBookingPayment({
        bookingId: paymentDraft.booking.id,
        guestEmail: formState.guestEmail.trim(),
        paymentIntentId: paymentDraft.paymentIntentId || '',
      });
    } catch {
      // Ignore cancellation failures so the payment form can still be dismissed.
    } finally {
      setPaymentDraft(null);
      setIsSubmitting(false);
    }
  };

  if (meetingRoomsQuery.isLoading) {
    return null;
  }

  if (meetingRoomsQuery.isError || !meetingRoomsQuery.data || meetingRoomsQuery.data.length === 0 || !selectedRoom) {
    return (
      <Layout>
        <CmsNoData />
      </Layout>
    );
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Compute the end hour label for the summary
  const sortedSelection = [...selectedHours].sort();
  const lastSelectedHour = sortedSelection.length > 0 ? Number(sortedSelection[sortedSelection.length - 1].split(':')[0]) + 1 : 0;

  return (
    <Layout
      hideNavigation
      hideFooter
      seo={{
        title: `Book ${selectedRoom.name}`,
        description: selectedRoom.description || `Reserve ${selectedRoom.name} online.`,
        image: selectedRoom.image,
      }}
    >
      <section className="min-h-screen bg-[#fbfaf8] py-6 sm:py-8">
        <div className="container-custom">
          <a
            href="/meeting-rooms"
            className="inline-flex items-center gap-3 text-base font-semibold text-[#10153f] transition-opacity hover:opacity-70"
          >
            <ArrowLeft size={22} />
            <span>Back to listing</span>
          </a>

          <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(400px,0.84fr)] xl:items-start">
            <div>
              <h1 className="font-sans text-[3.25rem] font-semibold tracking-tight leading-[0.94] text-[#10153f] sm:text-[4.5rem]">
                Book a meeting room
              </h1>

              <div className="mt-5 space-y-5">
                {bookingError ? (
                  <Alert variant="destructive" className="border-red-200 bg-red-50 px-4 py-3 text-red-700 [&>svg]:text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{bookingError}</AlertDescription>
                  </Alert>
                ) : null}

                {bookingSuccess ? (
                  <Alert className="border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 [&>svg]:text-emerald-700">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{bookingSuccess}</AlertDescription>
                  </Alert>
                ) : null}

                {availabilityError ? (
                  <Alert variant="destructive" className="border-red-200 bg-red-50 px-4 py-3 text-red-700 [&>svg]:text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{availabilityError}</AlertDescription>
                  </Alert>
                ) : null}

                {/* Calendar Section */}
                <div className="space-y-3">
                  <Label className="text-base font-semibold text-[#10153f] sm:text-[1.05rem]">
                    Select a date
                  </Label>
                  <div className="rounded-2xl border border-[#10153f]/15 bg-white p-2 sm:p-4">
                    <Calendar
                      mode="single"
                      size="large"
                      selected={selectedCalendarDate}
                      onSelect={handleDateSelect}
                      disabled={{ before: today }}
                      fromMonth={today}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Time Slots - Vertical list, multi-select consecutive hours */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold text-[#10153f] sm:text-[1.05rem]">
                      Select your hours
                    </Label>
                    {isDaySlotsLoading ? (
                      <span className="flex items-center gap-2 text-sm text-[#10153f]/60">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Checking availability...
                      </span>
                    ) : (
                      <div className="flex items-center gap-4 text-sm text-[#10153f]/70">
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block h-3 w-3 rounded-full bg-emerald-100 border border-emerald-300" />
                          Available
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block h-3 w-3 rounded-full bg-red-100 border border-red-300" />
                          Booked
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-[#10153f]/60">
                    Click hours to select them. You can pick multiple consecutive hours.
                  </p>

                  <div className="flex flex-col gap-1.5 rounded-2xl border border-[#10153f]/15 bg-white p-3 sm:p-4">
                    {hourSlots.map((slot, index) => {
                      const isSelected = selectedHours.includes(slot.time);
                      const isUnavailable = !slot.available;

                      // Determine if this slot is first/middle/last in selection for rounded corners
                      const sortedSel = [...selectedHours].sort();
                      const selIndex = sortedSel.indexOf(slot.time);
                      const isFirst = selIndex === 0;
                      const isLast = selIndex === sortedSel.length - 1;
                      const isOnly = sortedSel.length === 1 && isSelected;

                      let roundedClass = 'rounded-xl';
                      if (isSelected && !isOnly) {
                        if (isFirst) roundedClass = 'rounded-t-xl rounded-b-none';
                        else if (isLast) roundedClass = 'rounded-b-xl rounded-t-none';
                        else roundedClass = 'rounded-none';
                      }

                      // End time for this slot
                      const slotHour = Number(slot.time.split(':')[0]);
                      const endHour = slotHour + 1;
                      const endPeriod = endHour >= 12 ? 'PM' : 'AM';
                      const endDisplay = endHour === 0 ? 12 : endHour > 12 ? endHour - 12 : endHour;

                      return (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => handleHourClick(slot.time, slot.available)}
                          disabled={isUnavailable}
                          className={[
                            'group flex items-center justify-between px-4 py-3.5 text-left transition-all',
                            roundedClass,
                            isSelected
                              ? 'bg-[#10153f] text-white shadow-sm'
                              : isUnavailable
                                ? 'cursor-not-allowed bg-red-50/60 text-red-300'
                                : 'bg-[#fbfaf8] text-[#10153f] hover:bg-[#10153f]/[0.06]',
                            // Remove gap between consecutive selected slots
                            isSelected && !isOnly && !isLast ? '-mb-1.5' : '',
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-3">
                            {/* Selection indicator */}
                            <div
                              className={[
                                'flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all',
                                isSelected
                                  ? 'border-white bg-white/20'
                                  : isUnavailable
                                    ? 'border-red-200 bg-red-50'
                                    : 'border-[#10153f]/20 group-hover:border-[#10153f]/40',
                              ].join(' ')}
                            >
                              {isSelected ? (
                                <Check className="h-4 w-4 text-white" />
                              ) : isUnavailable ? (
                                <X className="h-3.5 w-3.5 text-red-300" />
                              ) : null}
                            </div>

                            <div>
                              <span className="text-[0.95rem] font-semibold sm:text-base">
                                {slot.label}
                              </span>
                              <span className={[
                                'ml-2 text-sm',
                                isSelected ? 'text-white/60' : isUnavailable ? 'text-red-200' : 'text-[#10153f]/40',
                              ].join(' ')}>
                                - {endDisplay}:00 {endPeriod}
                              </span>
                            </div>
                          </div>

                          <div>
                            {isUnavailable && !slot.isPast ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-500">
                                Booked
                              </span>
                            ) : isUnavailable && slot.isPast ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-300">
                                Past
                              </span>
                            ) : isSelected ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white/80">
                                Selected
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
                                Available
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {hasSelection ? (
                    <div className="flex items-center justify-between rounded-xl bg-[#10153f]/[0.04] px-4 py-3">
                      <span className="text-sm font-medium text-[#10153f]/80">
                        {formatTimeRange(sortedSelection[0], lastSelectedHour)} ({durationLabel})
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedHours([])}
                        className="text-sm font-medium text-primary hover:text-primary/80 hover:underline"
                      >
                        Clear selection
                      </button>
                    </div>
                  ) : null}
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2.5">
                    <Label htmlFor="booking-name" className="text-base font-semibold text-[#10153f] sm:text-[1.05rem]">
                      Full name
                    </Label>
                    <Input
                      id="booking-name"
                      value={formState.guestName}
                      onChange={(event) => handleFieldChange('guestName', event.target.value)}
                      className="h-12 rounded-2xl border-[#10153f]/30 bg-white px-4 text-base text-[#10153f] sm:text-lg"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="booking-email" className="text-base font-semibold text-[#10153f] sm:text-[1.05rem]">
                      Email
                    </Label>
                    <Input
                      id="booking-email"
                      type="email"
                      value={formState.guestEmail}
                      onChange={(event) => handleFieldChange('guestEmail', event.target.value)}
                      className="h-12 rounded-2xl border-[#10153f]/30 bg-white px-4 text-base text-[#10153f] sm:text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="booking-purpose" className="text-base font-semibold text-[#10153f] sm:text-[1.05rem]">
                    Meeting purpose
                  </Label>
                  <Input
                    id="booking-purpose"
                    value={formState.purpose}
                    onChange={(event) => handleFieldChange('purpose', event.target.value)}
                    placeholder="Client presentation, workshop, team sync..."
                    className="h-12 rounded-2xl border-[#10153f]/30 bg-white px-4 text-base text-[#10153f] sm:text-lg"
                  />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="booking-notes" className="text-base font-semibold text-[#10153f] sm:text-[1.05rem]">
                    Required facilities / requests
                  </Label>
                  <Textarea
                    id="booking-notes"
                    value={formState.notes}
                    onChange={(event) => handleFieldChange('notes', event.target.value)}
                    placeholder="E.g. We need a whiteboard and TV"
                    className="min-h-[96px] rounded-2xl border-[#10153f]/30 bg-white px-4 py-3 text-base text-[#10153f] sm:text-lg"
                  />
                </div>

                <div className="space-y-2 pt-1 text-[#10153f]">
                  <p className="text-[1.7rem] font-semibold leading-none sm:text-[1.95rem]">{formatCurrency(totalMinor || 0)} total</p>
                  <p className="text-base text-[#10153f]/80 sm:text-lg">
                    Please read our{' '}
                    <a href="/terms" className="text-primary underline-offset-4 hover:underline">
                      cancellation and refund policy
                    </a>
                    .
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || isAvailabilityLoading || isRoomUnavailable || !hasSelection || !!paymentDraft}
                  className="h-14 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground hover:bg-primary/90 disabled:bg-primary/45 disabled:text-primary-foreground sm:text-lg"
                >
                  {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
                  Pay on this page
                </Button>

                {paymentDraft && stripePublishableKey ? (
                  <GuestBookingPaymentCard
                    publishableKey={stripePublishableKey}
                    paymentDraft={paymentDraft}
                    isSubmitting={isSubmitting}
                    onConfirmPayment={handleConfirmPayment}
                    onCancelPayment={handleCancelPayment}
                  />
                ) : null}

                {!hasSelection && !isAvailabilityLoading ? (
                  <p className="text-sm text-[#10153f]/70">
                    Select at least one hour to continue.
                  </p>
                ) : isRoomUnavailable && !isAvailabilityLoading && hasSelection ? (
                  <p className="text-sm text-[#10153f]/70">
                    This room is currently unavailable for the selected hours. Adjust your selection to continue.
                  </p>
                ) : paymentDraft && !stripePublishableKey ? (
                  <p className="text-sm text-[#10153f]/70">
                    Stripe is not configured yet, so the card form cannot be shown on this page.
                  </p>
                ) : null}
              </div>
            </div>

            <aside className="rounded-[2rem] border border-[#10153f]/30 bg-white p-5 sm:p-6 xl:sticky xl:top-6">
              <h2 className="font-sans text-[2.6rem] font-semibold tracking-tight leading-none text-[#10153f]">
                {selectedRoom.name}
              </h2>

              <div className="mt-5 overflow-hidden rounded-[1.75rem]">
                <img
                  src={summaryImageSrc}
                  alt={selectedRoom.name}
                  className="aspect-[16/7] w-full object-cover"
                  onError={() => {
                    if (summaryImageSrc !== fallbackImage) setSummaryImageSrc(fallbackImage);
                  }}
                />
              </div>

              <div className="mt-6 space-y-4 text-[#10153f]">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[1.2rem] font-semibold sm:text-[1.35rem]">Workspace</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[1.2rem] font-medium sm:text-[1.35rem]">
                      {selectedResource?.capacity || selectedRoom.capacity || 0} person meeting room
                    </p>
                    <p className="mt-1 text-[1.2rem] sm:text-[1.35rem]">
                      {selectedResource?.hourlyRateMinor ? `${formatCurrency(selectedResource.hourlyRateMinor)} per hour` : 'Rate on request'}
                    </p>
                  </div>
                </div>

                <Separator className="bg-[#10153f]/15" />

                <div className="flex items-center justify-between gap-6">
                  <p className="text-[1.2rem] font-semibold sm:text-[1.35rem]">Date</p>
                  <p className="text-[1.2rem] sm:text-[1.35rem]">{formState.date ? formatLongDate(`${formState.date}T00:00`) : '-'}</p>
                </div>

                <Separator className="bg-[#10153f]/15" />

                <div className="flex items-center justify-between gap-6">
                  <p className="text-[1.2rem] font-semibold sm:text-[1.35rem]">Time</p>
                  <p className="text-[1.2rem] sm:text-[1.35rem]">
                    {hasSelection
                      ? formatTimeRange(sortedSelection[0], lastSelectedHour)
                      : '-'}
                  </p>
                </div>

                <Separator className="bg-[#10153f]/15" />

                <div className="flex items-center justify-between gap-6">
                  <p className="text-[1.2rem] font-semibold sm:text-[1.35rem]">Duration</p>
                  <p className="inline-flex items-center gap-2 text-[1.2rem] sm:text-[1.35rem]">
                    <Clock3 size={18} />
                    {durationLabel}
                  </p>
                </div>

                <Separator className="bg-[#10153f]/15" />

                <div className="flex items-center justify-between gap-6">
                  <p className="text-[1.2rem] font-semibold sm:text-[1.35rem]">Total cost</p>
                  <p className="text-[1.4rem] font-semibold sm:text-[1.6rem]">{formatCurrency(totalMinor || 0)}</p>
                </div>

                <div className="rounded-2xl bg-[#10153f]/[0.04] p-3 text-sm text-[#10153f]/75">
                  {isAvailabilityLoading && hasSelection ? 'Checking availability for selected hours...' : selectedRoom.description}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
