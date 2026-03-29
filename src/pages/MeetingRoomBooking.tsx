import { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowLeft, CalendarDays, Clock3, LoaderCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { meetingRooms as fallbackMeetingRooms } from '@/data/mockData';
import { useMeetingRooms } from '@/hooks/useCmsContent';
import {
  createGuestMeetingRoomBookingCheckoutSession,
  listPublicMeetingRoomResources,
  syncGuestMeetingRoomBookingCheckoutSession,
  type MemberResource,
} from '@/lib/member-api';

const GUEST_BOOKING_EMAIL_STORAGE_KEY = 'city-focus-hub.guest-booking-email';
const DURATION_OPTIONS = [
  { label: '30 minutes', value: '30' },
  { label: '1 hour', value: '60' },
  { label: '90 minutes', value: '90' },
  { label: '2 hours', value: '120' },
  { label: '3 hours', value: '180' },
  { label: '4 hours', value: '240' },
  { label: '6 hours', value: '360' },
  { label: '8 hours', value: '480' },
];

type GuestBookingPageFormState = {
  guestName: string;
  guestEmail: string;
  date: string;
  arrivalTime: string;
  durationMinutes: string;
  purpose: string;
  notes: string;
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

function buildDefaultBookingRange() {
  const start = new Date();
  start.setMinutes(start.getMinutes() >= 30 ? 30 : 0, 0, 0);

  if (start.getMinutes() === 0) {
    start.setHours(start.getHours() + 2);
  } else {
    start.setHours(start.getHours() + 1);
  }

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

function createArrivalTimeOptions() {
  const options: string[] = [];

  for (let hour = 7; hour <= 21; hour += 1) {
    for (const minute of [0, 30]) {
      if (hour === 21 && minute > 0) {
        continue;
      }

      options.push(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`);
    }
  }

  return options;
}

const ARRIVAL_TIME_OPTIONS = createArrivalTimeOptions();

export default function MeetingRoomBooking() {
  const { roomSlug = '' } = useParams();
  const meetingRoomsQuery = useMeetingRooms();
  const defaultRange = useMemo(() => buildDefaultBookingRange(), []);
  const [availabilityResources, setAvailabilityResources] = useState<MemberResource[]>([]);
  const [availabilityError, setAvailabilityError] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<GuestBookingPageFormState>({
    guestName: '',
    guestEmail: '',
    date: defaultRange.startAt.slice(0, 10),
    arrivalTime: defaultRange.startAt.slice(11, 16),
    durationMinutes: '60',
    purpose: '',
    notes: '',
  });

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
    if (!meetingRoomsQuery.data) {
      return null;
    }

    return meetingRoomsQuery.data.find((room) => (
      normalizeRoomKey(room.slug || room.id) === normalizeRoomKey(roomSlug)
      || normalizeRoomKey(room.name) === normalizeRoomKey(roomSlug)
    )) || null;
  }, [meetingRoomsQuery.data, roomSlug]);

  useEffect(() => {
    setSummaryImageSrc(selectedRoom?.image || fallbackImage);
  }, [fallbackImage, selectedRoom?.image]);

  const bookingStartAt = useMemo(() => `${formState.date}T${formState.arrivalTime}`, [formState.arrivalTime, formState.date]);
  const bookingEndAt = useMemo(() => {
    const startDate = new Date(bookingStartAt);

    if (Number.isNaN(startDate.getTime())) {
      return '';
    }

    const durationMinutes = Number(formState.durationMinutes || 0);
    return formatDateTimeInputValue(new Date(startDate.getTime() + (durationMinutes * 60 * 1000)));
  }, [bookingStartAt, formState.durationMinutes]);

  const selectedResource = useMemo(() => {
    if (!selectedRoom) {
      return null;
    }

    const exactMatch = availabilityResources.find((resource) => (
      normalizeRoomKey(resource.slug) === normalizeRoomKey(selectedRoom.slug || selectedRoom.id)
      || normalizeRoomKey(resource.name) === normalizeRoomKey(selectedRoom.name)
    ));

    if (exactMatch) {
      return exactMatch;
    }

    if (!availabilityResources.length) {
      return null;
    }

    const capacity = Number(selectedRoom.capacity || 0);

    if (!capacity) {
      return availabilityResources[0] || null;
    }

    return [...availabilityResources]
      .sort((left, right) => {
        const leftDiff = Math.abs(Number(left.capacity || 0) - capacity);
        const rightDiff = Math.abs(Number(right.capacity || 0) - capacity);

        if (leftDiff !== rightDiff) {
          return leftDiff - rightDiff;
        }

        return Number(right.capacity || 0) - Number(left.capacity || 0);
      })[0] || null;
  }, [availabilityResources, selectedRoom]);

  const bookingDurationLabel = useMemo(() => {
    const duration = DURATION_OPTIONS.find((option) => option.value === formState.durationMinutes);
    return duration?.label || 'Custom';
  }, [formState.durationMinutes]);

  const totalMinor = useMemo(() => {
    if (!selectedResource?.hourlyRateMinor) {
      return 0;
    }

    return Math.round((selectedResource.hourlyRateMinor * Number(formState.durationMinutes || 0)) / 60);
  }, [formState.durationMinutes, selectedResource?.hourlyRateMinor]);

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
        }
      })
      .catch((error) => {
        if (active) {
          setAvailabilityError(error instanceof Error ? error.message : 'Failed to load meeting room availability.');
        }
      })
      .finally(() => {
        if (active) {
          setIsAvailabilityLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [bookingEndAt, bookingStartAt]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const checkoutStatus = searchParams.get('booking_checkout');
    const sessionId = searchParams.get('session_id');
    const guestEmail = window.sessionStorage.getItem(GUEST_BOOKING_EMAIL_STORAGE_KEY) || '';

    if (!checkoutStatus) {
      return;
    }

    const clearCheckoutSearch = () => {
      window.history.replaceState({}, document.title, window.location.pathname);
    };

    if (checkoutStatus === 'cancel') {
      setBookingError('Stripe checkout was canceled before the booking was completed.');
      clearCheckoutSearch();
      window.sessionStorage.removeItem(GUEST_BOOKING_EMAIL_STORAGE_KEY);
      return;
    }

    if (checkoutStatus !== 'success' || !sessionId || !guestEmail) {
      clearCheckoutSearch();
      return;
    }

    let active = true;
    setIsSubmitting(true);
    setBookingError('');

    void syncGuestMeetingRoomBookingCheckoutSession({ guestEmail, sessionId })
      .then(() => {
        if (!active) {
          return;
        }

        setBookingSuccess('Meeting room booked and paid successfully.');
      })
      .catch((error) => {
        if (!active) {
          return;
        }

        setBookingError(error instanceof Error ? error.message : 'Failed to sync guest booking checkout session.');
      })
      .finally(() => {
        if (!active) {
          return;
        }

        setIsSubmitting(false);
        clearCheckoutSearch();
        window.sessionStorage.removeItem(GUEST_BOOKING_EMAIL_STORAGE_KEY);
      });

    return () => {
      active = false;
    };
  }, []);

  const isRoomUnavailable = selectedResource ? selectedResource.available === false : true;

  const handleFieldChange = (field: keyof GuestBookingPageFormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedRoom || !selectedResource) {
      setBookingError('This meeting room is not available for the selected time.');
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

      const session = await createGuestMeetingRoomBookingCheckoutSession({
        guestName: formState.guestName.trim(),
        guestEmail: formState.guestEmail.trim(),
        resourceId: selectedResource.id,
        startAt: new Date(bookingStartAt).toISOString(),
        endAt: new Date(bookingEndAt).toISOString(),
        purpose: formState.purpose.trim() || `Meeting room booking for ${selectedRoom.name}`,
        notes: formState.notes.trim(),
        successUrl: `${window.location.origin}/meeting-rooms/${encodeURIComponent(selectedRoom.slug || selectedRoom.id)}/book?booking_checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/meeting-rooms/${encodeURIComponent(selectedRoom.slug || selectedRoom.id)}/book?booking_checkout=cancel`,
      });

      if (!session.url) {
        setBookingSuccess('Meeting room booked successfully.');
        return;
      }

      window.sessionStorage.setItem(GUEST_BOOKING_EMAIL_STORAGE_KEY, formState.guestEmail.trim());
      window.location.assign(session.url);
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Failed to create guest booking.');
    } finally {
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
          <Link
            to="/meeting-rooms"
            className="inline-flex items-center gap-3 text-base font-semibold text-[#10153f] transition-opacity hover:opacity-70"
          >
            <ArrowLeft size={22} />
            <span>Back to listing</span>
          </Link>

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

                <div className="space-y-2.5">
                  <Label htmlFor="booking-date" className="text-base font-semibold text-[#10153f] sm:text-[1.05rem]">
                    Date you want to work here?
                  </Label>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#10153f]" />
                    <Input
                      id="booking-date"
                      type="date"
                      min={formatDateInputValue(new Date())}
                      value={formState.date}
                      onChange={(event) => handleFieldChange('date', event.target.value)}
                      className="h-14 rounded-2xl border-[#10153f]/30 bg-white pl-14 text-base text-[#10153f] sm:text-lg"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2.5">
                    <Label className="text-base font-semibold text-[#10153f] sm:text-[1.05rem]">Arrival time</Label>
                    <Select value={formState.arrivalTime} onValueChange={(value) => handleFieldChange('arrivalTime', value)}>
                      <SelectTrigger className="h-14 rounded-2xl border-[#10153f]/30 bg-white px-4 text-base text-[#10153f] sm:text-lg">
                        <SelectValue placeholder="Choose a time" />
                      </SelectTrigger>
                      <SelectContent>
                        {ARRIVAL_TIME_OPTIONS.map((timeOption) => (
                          <SelectItem key={timeOption} value={timeOption}>
                            {timeOption}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2.5">
                    <Label className="text-base font-semibold text-[#10153f] sm:text-[1.05rem]">Duration</Label>
                    <Select value={formState.durationMinutes} onValueChange={(value) => handleFieldChange('durationMinutes', value)}>
                      <SelectTrigger className="h-14 rounded-2xl border-[#10153f]/30 bg-white px-4 text-base text-[#10153f] sm:text-lg">
                        <SelectValue placeholder="Choose duration" />
                      </SelectTrigger>
                      <SelectContent>
                        {DURATION_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                    <Link to="/terms" className="text-[#ff3b7f] underline-offset-4 hover:underline">
                      cancellation and refund policy
                    </Link>
                    .
                  </p>
                </div>

                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || isAvailabilityLoading || isRoomUnavailable}
                  className="h-14 rounded-full bg-[#ff3b7f] px-10 text-base font-semibold text-white hover:bg-[#e63473] disabled:bg-[#ff3b7f]/45 disabled:text-white sm:text-lg"
                >
                  {isSubmitting ? <LoaderCircle className="animate-spin" /> : null}
                  Continue
                </Button>

                {isRoomUnavailable && !isAvailabilityLoading ? (
                  <p className="text-sm text-[#10153f]/70">
                    This room is currently unavailable for the selected date and time. Adjust the slot to continue.
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
                    if (summaryImageSrc !== fallbackImage) {
                      setSummaryImageSrc(fallbackImage);
                    }
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
                  <p className="text-[1.2rem] sm:text-[1.35rem]">{bookingStartAt ? formatLongDate(bookingStartAt) : '-'}</p>
                </div>

                <Separator className="bg-[#10153f]/15" />

                <div className="flex items-center justify-between gap-6">
                  <p className="text-[1.2rem] font-semibold sm:text-[1.35rem]">Duration</p>
                  <p className="inline-flex items-center gap-2 text-[1.2rem] sm:text-[1.35rem]">
                    <Clock3 size={18} />
                    {bookingDurationLabel}
                  </p>
                </div>

                <Separator className="bg-[#10153f]/15" />

                <div className="flex items-center justify-between gap-6">
                  <p className="text-[1.2rem] font-semibold sm:text-[1.35rem]">Total cost</p>
                  <p className="text-[1.4rem] font-semibold sm:text-[1.6rem]">{formatCurrency(totalMinor || 0)}</p>
                </div>

                <div className="rounded-2xl bg-[#10153f]/[0.04] p-3 text-sm text-[#10153f]/75">
                  {isAvailabilityLoading ? 'Checking availability for this time slot...' : selectedRoom.description}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
