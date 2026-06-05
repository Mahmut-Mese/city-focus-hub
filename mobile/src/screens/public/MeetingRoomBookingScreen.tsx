import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { initPaymentSheet, initStripe, presentPaymentSheet } from '@stripe/stripe-react-native';
import { createApiClient } from '../../api/client';
import { getApiBaseUrl } from '../../config/api';
import {
  cancelGuestMeetingRoomBookingPayment,
  confirmGuestMeetingRoomBookingPayment,
  createGuestMeetingRoomBookingPaymentIntent,
  listPublicMeetingRoomResources,
} from '../../api/booking-api';
import type { MemberResource } from '../../api/member-api';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import type { PublicStackParamList } from '../../navigation/PublicStack';
import { colors, radius, spacing, typography } from '../../theme';

const HOURS = Array.from({ length: 15 }, (_, index) => `${String(index + 7).padStart(2, '0')}:00`);
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const VAT_RATE = 0.2;

type BookingRoute = RouteProp<PublicStackParamList, 'MeetingRoomBooking'>;

type GuestFormState = {
  guestName: string;
  guestEmail: string;
  purpose: string;
  notes: string;
};

type CalendarDay = {
  key: string;
  date: string;
  label: string;
  inMonth: boolean;
  isPast: boolean;
};

type ConfirmedBookingSummary = {
  id: number | null;
  roomName: string;
  startAt: string;
  endAt: string;
  guestEmail: string;
  subtotalMinor: number;
  taxMinor: number;
  totalMinor: number;
  currency: string;
};

const EMPTY_FORM: GuestFormState = { guestName: '', guestEmail: '', purpose: '', notes: '' };

function normalizeKey(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function asRecord(resource: MemberResource): Record<string, unknown> {
  return resource as Record<string, unknown>;
}

function getResourceString(resource: MemberResource | null, key: string, fallback = ''): string {
  if (!resource) return fallback;
  const value = asRecord(resource)[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function getResourceNumber(resource: MemberResource | null, key: string): number | null {
  if (!resource) return null;
  const value = asRecord(resource)[key];
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function getResourceKey(resource: MemberResource): string {
  const slug = getResourceString(resource, 'slug');
  return slug || resource.name || String(resource.id);
}

function formatDateValue(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function parseDateValue(value: string): Date {
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return new Date();
  return new Date(year, month - 1, day);
}

function startOfMonth(value: Date): Date {
  return new Date(value.getFullYear(), value.getMonth(), 1);
}

function addMonths(value: Date, amount: number): Date {
  return new Date(value.getFullYear(), value.getMonth() + amount, 1);
}

function isBeforeToday(value: Date): boolean {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const valueStart = new Date(value.getFullYear(), value.getMonth(), value.getDate()).getTime();
  return valueStart < todayStart;
}

function buildCalendarDays(monthDate: Date): CalendarDay[] {
  const monthStart = startOfMonth(monthDate);
  const mondayOffset = (monthStart.getDay() + 6) % 7;
  const gridStart = new Date(monthStart);
  gridStart.setDate(monthStart.getDate() - mondayOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    const dateValue = formatDateValue(date);
    return {
      key: `${dateValue}-${index}`,
      date: dateValue,
      label: String(date.getDate()),
      inMonth: date.getMonth() === monthStart.getMonth(),
      isPast: isBeforeToday(date),
    };
  });
}

function formatMonthLabel(value: Date): string {
  return value.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

function formatDateLabel(value: string): string {
  const date = parseDateValue(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatHourLabel(value: string): string {
  const hour = Number(value.slice(0, 2));
  if (!Number.isFinite(hour)) return value;
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${period}`;
}

function buildIso(date: string, time: string): string {
  return new Date(`${date}T${time}:00`).toISOString();
}

function getEndTime(selectedHours: string[]): string | null {
  if (selectedHours.length === 0) return null;
  const sorted = [...selectedHours].sort();
  const lastHourStr = sorted[sorted.length - 1];
  if (!lastHourStr) return null;
  const lastHour = Number(lastHourStr.slice(0, 2));
  if (!Number.isFinite(lastHour)) return null;
  return `${String(lastHour + 1).padStart(2, '0')}:00`;
}

function formatMoney(minor: number, currency = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(minor / 100);
}

function formatDateTimeRange(startAt: string, endAt: string): string {
  const start = new Date(startAt);
  const end = new Date(endAt);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return `${startAt} - ${endAt}`;
  const date = start.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const startTime = start.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  const endTimeValue = end.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  return `${date} · ${startTime}-${endTimeValue}`;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function updateConsecutiveHours(current: string[], nextHour: string): string[] {
  if (current.includes(nextHour)) return current.filter((hour) => hour !== nextHour).sort();
  if (current.length === 0) return [nextHour];
  const next = Number(nextHour.slice(0, 2));
  const sorted = [...current].sort();
  const firstStr = sorted[0];
  const lastStr = sorted[sorted.length - 1];
  if (!firstStr || !lastStr) return [nextHour];
  const first = Number(firstStr.slice(0, 2));
  const last = Number(lastStr.slice(0, 2));
  return next === first - 1 || next === last + 1 ? [...current, nextHour].sort() : [nextHour];
}

export function MeetingRoomBookingScreen(): JSX.Element {
  const route = useRoute<BookingRoute>();
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const todayValue = useMemo(() => formatDateValue(new Date()), []);
  const [resources, setResources] = useState<MemberResource[]>([]);
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(todayValue);
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => startOfMonth(parseDateValue(todayValue)));
  const [selectedHours, setSelectedHours] = useState<string[]>([]);
  const [unavailableHours, setUnavailableHours] = useState<Set<string>>(new Set());
  const [formState, setFormState] = useState<GuestFormState>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  const [stripePublishableKey, setStripePublishableKey] = useState<string | null>(null);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const paymentInFlightRef = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBookingSummary | null>(null);

  const calendarDays = useMemo(() => buildCalendarDays(calendarMonth), [calendarMonth]);

  // Split days into rows of 7 for proper grid layout
  const calendarRows = useMemo(() => {
    const rows: CalendarDay[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      rows.push(calendarDays.slice(i, i + 7));
    }
    return rows;
  }, [calendarDays]);

  const selectInitialResource = useCallback((items: MemberResource[]) => {
    const params = route.params as Record<string, unknown> | undefined;
    const rawRoomId = params?.roomId ?? params?.room;
    const roomId = typeof rawRoomId === 'string' || typeof rawRoomId === 'number' ? String(rawRoomId) : null;
    if (!roomId) {
      setSelectedResourceId(items[0]?.id ?? null);
      return;
    }

    const normalizedRoomId = normalizeKey(roomId);
    const match = items.find((resource) => (
      normalizeKey(getResourceKey(resource)) === normalizedRoomId
      || normalizeKey(resource.name) === normalizedRoomId
      || String(resource.id) === roomId
    ));
    setSelectedResourceId(match?.id ?? null);
  }, [route.params]);

  const loadResources = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await listPublicMeetingRoomResources(apiClient);
      const meetingRooms = result.resources.filter((resource) => resource.type === 'meeting_room');
      setStripePublishableKey(typeof result.stripe?.publishableKey === 'string' && result.stripe.publishableKey.trim()
        ? result.stripe.publishableKey
        : null);
      setResources(meetingRooms);
      selectInitialResource(meetingRooms);
    } catch {
      setError('We could not load meeting rooms.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient, selectInitialResource]);

  useEffect(() => { void loadResources(); }, [loadResources]);

  const selectedResource = resources.find((resource) => resource.id === selectedResourceId) ?? null;
  const endTime = getEndTime(selectedHours);
  const selectedStartAt = selectedHours.length > 0 ? (() => {
    const first = [...selectedHours].sort()[0];
    return first ? buildIso(selectedDate, first) : null;
  })() : null;
  const selectedEndAt = endTime ? buildIso(selectedDate, endTime) : null;
  const durationHours = selectedHours.length;
  const hourlyRateMinor = getResourceNumber(selectedResource, 'hourlyRateMinor') ?? 0;
  const subtotalMinor = hourlyRateMinor * durationHours;
  const vatMinor = Math.round(subtotalMinor * VAT_RATE);
  const totalMinor = subtotalMinor + vatMinor;
  const currency = getResourceString(selectedResource, 'currency', 'GBP');
  const isSelectedRoomUnavailable = selectedResource?.available === false;

useEffect(() => {
      // Refresh availability for each hour slot when date or resource changes
      if (!selectedDate || selectedResourceId === null) return;
      let active = true;
      setIsAvailabilityLoading(true);
      // Reset unavailable hours while loading
      setUnavailableHours(new Set());
      const fetchPromises = HOURS.map(async (hour) => {
        const startAt = buildIso(selectedDate, hour);
        const nextHour = getEndTime([hour]);
        const endAt = nextHour ? buildIso(selectedDate, nextHour) : null;
        if (!endAt) return { hour, unavailable: true };
        try {
          const result = await listPublicMeetingRoomResources(apiClient, { startAt, endAt });
          const meetingRooms = result.resources.filter((r) => r.type === 'meeting_room');
          const room = meetingRooms.find((r) => r.id === selectedResourceId);
          const unavailable = !room || room.available === false;
          return { hour, unavailable };
        } catch {
          // On error treat as unavailable for safety
          return { hour, unavailable: true };
        }
      });
      Promise.all(fetchPromises).then((results) => {
        if (!active) return;
        const newUnavailable = new Set<string>();
        results.forEach(({ hour, unavailable }) => {
          if (unavailable) newUnavailable.add(hour);
        });
        setUnavailableHours(newUnavailable);
        // Remove now-unavailable selected hours
        setSelectedHours((current) => {
          const filtered = current.filter((h) => !newUnavailable.has(h));
          if (filtered.length !== current.length) {
            setMessage('One or more selected time slots are no longer available.');
          }
          return filtered;
        });
      })
        .catch(() => {
          if (active) setMessage('Availability could not be refreshed. Please try another time or continue once the team confirms availability.');
        })
        .finally(() => {
          if (active) setIsAvailabilityLoading(false);
        });
      return () => { active = false; };
    }, [apiClient, selectedDate, selectedResourceId]);

  const handleCalendarDatePress = (day: CalendarDay) => {
    if (day.isPast) return;
    setSelectedDate(day.date);
    setCalendarMonth(startOfMonth(parseDateValue(day.date)));
    setSelectedHours([]);
    setMessage(null);
  };

  const handleFieldChange = (field: keyof GuestFormState, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setMessage(null);
  };

  const handleContinue = async () => {
    if (paymentInFlightRef.current) return;
    if (!selectedResource) return setMessage('Choose a meeting room.');
    if (isSelectedRoomUnavailable) return setMessage('This room is not available for the selected time. Choose another room or time.');
    if (!selectedStartAt || !selectedEndAt) return setMessage('Choose a date and at least one hour.');
    if (!formState.guestName.trim()) return setMessage('Enter your name.');
    if (!isValidEmail(formState.guestEmail)) return setMessage('Enter a valid email address.');
    if (!formState.purpose.trim()) return setMessage('Enter a booking purpose.');

    if (!stripePublishableKey) {
      setMessage('Payment is temporarily unavailable. Please try again shortly.');
      return;
    }

    paymentInFlightRef.current = true;
    setIsSubmittingPayment(true);
    setMessage(null);

    let draftBookingId: number | null = null;
    let draftPaymentIntentId: string | null = null;
    let paymentSheetCompleted = false;
    const guestEmail = formState.guestEmail.trim();

    try {
      const draft = await createGuestMeetingRoomBookingPaymentIntent(apiClient, {
        resourceId: selectedResource.id,
        startAt: selectedStartAt,
        endAt: selectedEndAt,
        purpose: formState.purpose.trim(),
        notes: formState.notes.trim(),
        guestName: formState.guestName.trim(),
        guestEmail,
      });

      draftBookingId = typeof draft.booking?.id === 'number' ? draft.booking.id : null;
      draftPaymentIntentId = draft.paymentIntentId;

      if (!draft.clientSecret || !draftPaymentIntentId || !draftBookingId) {
        setMessage('Payment could not be prepared. Please try again.');
        return;
      }

      await initStripe({
        publishableKey: stripePublishableKey,
        urlScheme: 'leadenhallworks',
      });

      const paymentSheetInit = await initPaymentSheet({
        merchantDisplayName: 'The Leadenhall Works',
        paymentIntentClientSecret: draft.clientSecret,
      });

      if (paymentSheetInit.error) {
        if (draftBookingId && draftPaymentIntentId) {
          await cancelGuestMeetingRoomBookingPayment(apiClient, {
            bookingId: draftBookingId,
            guestEmail,
            paymentIntentId: draftPaymentIntentId,
          }).catch(() => undefined);
        }
        setMessage('Payment could not be prepared. Please try again.');
        return;
      }

      const paymentSheetResult = await presentPaymentSheet();

      if (paymentSheetResult.error) {
        if (draftBookingId && draftPaymentIntentId) {
          await cancelGuestMeetingRoomBookingPayment(apiClient, {
            bookingId: draftBookingId,
            guestEmail,
            paymentIntentId: draftPaymentIntentId,
          }).catch(() => undefined);
        }
        setMessage('Payment was not completed. You can try again.');
        return;
      }

      paymentSheetCompleted = true;

      try {
        const confirmed = await confirmGuestMeetingRoomBookingPayment(apiClient, {
          bookingId: draftBookingId,
          guestEmail,
          paymentIntentId: draftPaymentIntentId,
        });
        const confirmedRecord = confirmed as Record<string, unknown>;
        const confirmedCurrency = typeof confirmedRecord.currency === 'string' && confirmedRecord.currency.trim()
          ? confirmedRecord.currency
          : currency;
        const confirmedSubtotalMinor = typeof confirmedRecord.subtotalMinor === 'number' && Number.isFinite(confirmedRecord.subtotalMinor)
          ? confirmedRecord.subtotalMinor
          : subtotalMinor;
        const confirmedTaxMinor = typeof confirmedRecord.taxMinor === 'number' && Number.isFinite(confirmedRecord.taxMinor)
          ? confirmedRecord.taxMinor
          : typeof confirmedRecord.vatMinor === 'number' && Number.isFinite(confirmedRecord.vatMinor)
            ? confirmedRecord.vatMinor
            : vatMinor;
        const confirmedTotalMinor = typeof confirmedRecord.totalMinor === 'number' && Number.isFinite(confirmedRecord.totalMinor)
          ? confirmedRecord.totalMinor
          : confirmedSubtotalMinor + confirmedTaxMinor;

        setConfirmedBooking({
          id: typeof confirmed.id === 'number' ? confirmed.id : draftBookingId,
          roomName: typeof confirmed.resourceName === 'string' && confirmed.resourceName.trim()
            ? confirmed.resourceName
            : selectedResource.name,
          startAt: typeof confirmed.startAt === 'string' && confirmed.startAt.trim()
            ? confirmed.startAt
            : selectedStartAt,
          endAt: typeof confirmed.endAt === 'string' && confirmed.endAt.trim()
            ? confirmed.endAt
            : selectedEndAt,
          guestEmail,
          subtotalMinor: confirmedSubtotalMinor,
          taxMinor: confirmedTaxMinor,
          totalMinor: confirmedTotalMinor,
          currency: confirmedCurrency,
        });
        setMessage(null);
        setSelectedHours([]);
        setFormState(EMPTY_FORM);
      } catch {
        setMessage('Your payment was submitted and is being verified. If confirmation does not arrive shortly, please contact support.');
      }
    } catch {
      if (!paymentSheetCompleted && draftBookingId && draftPaymentIntentId) {
        await cancelGuestMeetingRoomBookingPayment(apiClient, {
          bookingId: draftBookingId,
          guestEmail,
          paymentIntentId: draftPaymentIntentId,
        }).catch(() => undefined);
      }
      setMessage('We could not start payment right now. Please try again.');
    } finally {
      paymentInFlightRef.current = false;
      setIsSubmittingPayment(false);
    }
  };

  if (isLoading) return <LoadingState message="Loading booking calendar…" />;
  if (error) return <ErrorState message={error} onRetry={loadResources} />;
  if (resources.length === 0) return <EmptyState title="No meeting rooms" message="Meeting room booking options are not available yet." />;

  const params = route.params as Record<string, unknown> | undefined;
  const rawRoomId = params?.roomId ?? params?.room;
  const isRoomIdPresent = Boolean(rawRoomId);

  if (isRoomIdPresent && !selectedResource) {
    return <EmptyState title="Room not found" message="The selected meeting room could not be found." />;
  }

  if (confirmedBooking) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.confirmedCard}>
          <Text style={styles.title}>Booking confirmed</Text>
          <Text style={styles.subtitle}>We have emailed your confirmation.</Text>

          <View style={styles.confirmedDetailsWrap}>
            <Text style={styles.body}>Room: {confirmedBooking.roomName}</Text>
            <Text style={styles.body}>When: {formatDateTimeRange(confirmedBooking.startAt, confirmedBooking.endAt)}</Text>
            <Text style={styles.body}>Guest email: {confirmedBooking.guestEmail}</Text>
            <Text style={styles.body}>Subtotal: {formatMoney(confirmedBooking.subtotalMinor, confirmedBooking.currency)}</Text>
            <Text style={styles.body}>Tax: {formatMoney(confirmedBooking.taxMinor, confirmedBooking.currency)}</Text>
            <Text style={styles.total}>Total paid: {formatMoney(confirmedBooking.totalMinor, confirmedBooking.currency)}</Text>
            {confirmedBooking.id ? <Text style={styles.body}>Booking reference: #{confirmedBooking.id}</Text> : null}
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setConfirmedBooking(null);
              setMessage(null);
              setSelectedHours([]);
              setFormState(EMPTY_FORM);
            }}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Book another room</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>BOOKING</Text>
        <Text style={styles.title}>Book this room</Text>
        <Text style={styles.subtitle}>Choose date and time, then add your details.</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Room</Text>
        {isRoomIdPresent && selectedResource ? (
          <View style={styles.optionCard}>
            <Text style={styles.optionTitle}>{selectedResource.name}</Text>
            <Text style={styles.optionMeta}>{selectedResource.capacity ? `Up to ${selectedResource.capacity} people` : 'Capacity not listed'}</Text>
            <Text style={styles.optionMeta}>{getResourceNumber(selectedResource, 'hourlyRateMinor') ? `${formatMoney(getResourceNumber(selectedResource, 'hourlyRateMinor') ?? 0, currency)} / hour` : 'Price unavailable'}</Text>
            {isSelectedRoomUnavailable ? <Text style={styles.warning}>Unavailable for selected time</Text> : null}
          </View>
        ) : null}
        {!isRoomIdPresent ? (
          <View style={{ gap: spacing.sm }}>
            {resources.map((resource) => {
              const selected = resource.id === selectedResourceId;
              const resCurrency = getResourceString(resource, 'currency', 'GBP');
              return (
                <Pressable
                  key={resource.id}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  onPress={() => { setSelectedResourceId(resource.id); setMessage(null); }}
                  style={[styles.optionCard, selected ? styles.optionCardSelected : null]}
                >
                  <Text style={styles.optionTitle}>{resource.name}</Text>
                  <Text style={styles.optionMeta}>{resource.capacity ? `Up to ${resource.capacity} people` : 'Capacity not listed'}</Text>
                  <Text style={styles.optionMeta}>{getResourceNumber(resource, 'hourlyRateMinor') ? `${formatMoney(getResourceNumber(resource, 'hourlyRateMinor') ?? 0, resCurrency)} / hour` : 'Price unavailable'}</Text>
                  {selected && isSelectedRoomUnavailable ? <Text style={styles.warning}>Unavailable for selected time</Text> : null}
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.calendarHeader}>
          <Pressable accessibilityRole="button" onPress={() => setCalendarMonth((current) => addMonths(current, -1))} style={styles.monthButton}><Text style={styles.monthButtonText}>‹</Text></Pressable>
          <View style={styles.monthTitleWrap}><Text style={styles.sectionTitle}>Date</Text><Text style={styles.monthTitle}>{formatMonthLabel(calendarMonth)}</Text></View>
          <Pressable accessibilityRole="button" onPress={() => setCalendarMonth((current) => addMonths(current, 1))} style={styles.monthButton}><Text style={styles.monthButtonText}>›</Text></Pressable>
        </View>
        <View style={styles.weekdayRow}>{WEEKDAYS.map((weekday) => <Text key={weekday} style={styles.weekdayText}>{weekday}</Text>)}</View>
        <View style={styles.calendarGrid}>
          {calendarRows.map((row, rowIndex) => (
            <View key={`calendar-row-${rowIndex}`} style={styles.calendarRow}>
              {row.map((day) => {
                const selected = selectedDate === day.date;
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected, disabled: day.isPast }}
                    disabled={day.isPast}
                    key={day.key}
                    onPress={() => handleCalendarDatePress(day)}
                    style={[
                      styles.calendarDay,
                      !day.inMonth ? styles.calendarDayMuted : null,
                      day.isPast ? styles.calendarDayDisabled : null,
                      selected ? styles.calendarDaySelected : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.calendarDayText,
                        !day.inMonth ? styles.calendarDayTextMuted : null,
                        day.isPast ? styles.calendarDayTextDisabled : null,
                        selected ? styles.calendarDayTextSelected : null,
                      ]}
                    >
                      {day.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
        <Text style={styles.helperText}>Selected: {formatDateLabel(selectedDate)}</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Time</Text>
        <Text style={styles.helperText}>Select consecutive hour slots.</Text>
<View style={styles.hourGrid}>
            {HOURS.map((hour) => {
              const selected = selectedHours.includes(hour);
              const unavailable = unavailableHours.has(hour);
              const disabled = unavailable;
              return (
                <Pressable
                  accessibilityRole="button"
                  accessibilityState={{ selected, disabled }}
                  disabled={disabled}
                  key={hour}
                  onPress={() => { if (!disabled) { setSelectedHours((current) => updateConsecutiveHours(current, hour)); setMessage(null); } }}
                  style={[styles.hourButton, selected ? styles.hourButtonSelected : null, unavailable ? styles.hourButtonUnavailable : null]}
                >
                  <Text style={[styles.hourButtonText, selected ? styles.hourButtonTextSelected : null, unavailable ? styles.hourButtonTextUnavailable : null]}>{formatHourLabel(hour)}</Text>
                  {unavailable ? <Text style={styles.unavailableLabel}>Unavailable</Text> : null}
                </Pressable>
              );
            })}
          </View>
        {isAvailabilityLoading ? <Text style={styles.helperText}>Refreshing availability…</Text> : null}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Your details</Text>
        <TextInput placeholder="Full name" placeholderTextColor={colors.mutedForeground} style={styles.input} value={formState.guestName} onChangeText={(value) => handleFieldChange('guestName', value)} />
        <TextInput autoCapitalize="none" keyboardType="email-address" placeholder="Email address" placeholderTextColor={colors.mutedForeground} style={styles.input} value={formState.guestEmail} onChangeText={(value) => handleFieldChange('guestEmail', value)} />
        <TextInput placeholder="Purpose" placeholderTextColor={colors.mutedForeground} style={styles.input} value={formState.purpose} onChangeText={(value) => handleFieldChange('purpose', value)} />
        <TextInput multiline placeholder="Notes" placeholderTextColor={colors.mutedForeground} style={[styles.input, styles.notesInput]} textAlignVertical="top" value={formState.notes} onChangeText={(value) => handleFieldChange('notes', value)} />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.sectionTitle}>Review</Text>
        <Text style={styles.body}>{selectedResource?.name ?? 'No room selected'}</Text>
        <Text style={styles.body}>{formatDateLabel(selectedDate)}{selectedHours.length > 0 && endTime ? ` · ${[...selectedHours].sort()[0]}-${endTime}` : ''}</Text>
        <Text style={styles.body}>Subtotal: {formatMoney(subtotalMinor, currency)}</Text>
        <Text style={styles.body}>VAT estimate: {formatMoney(vatMinor, currency)}</Text>
        <Text style={styles.total}>Total estimate: {formatMoney(totalMinor, currency)}</Text>
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <Pressable accessibilityRole="button" disabled={isSubmittingPayment} onPress={() => { void handleContinue(); }} style={[styles.primaryButton, isSubmittingPayment ? styles.primaryButtonDisabled : null]}><Text style={styles.primaryButtonText}>{isSubmittingPayment ? 'Processing payment…' : 'Continue to payment'}</Text></Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.lg },
  heroCard: { backgroundColor: colors.secondary, borderRadius: radius.lg, gap: spacing.sm, padding: spacing.lg },
  eyebrow: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, letterSpacing: 0.4, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: 28 },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  sectionCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  summaryCard: { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  confirmedCard: { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.xl },
  confirmedDetailsWrap: { gap: spacing.xs },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  optionCard: { borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, gap: spacing.xs, padding: spacing.md },
  optionCardSelected: { borderColor: colors.primary, backgroundColor: colors.secondary },
  optionCardDisabled: { opacity: 0.48 },
  optionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  optionMeta: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  calendarHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  monthTitleWrap: { alignItems: 'center', flex: 1, gap: spacing.xs },
  monthTitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '600', lineHeight: typography.lineHeight.tight },
  monthButton: { alignItems: 'center', borderColor: colors.border, borderRadius: radius.full, borderWidth: 1, height: 40, justifyContent: 'center', width: 40 },
  monthButtonText: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['2xl'], fontWeight: '700', lineHeight: 28 },
  weekdayRow: { flexDirection: 'row' },
  weekdayText: { color: colors.mutedForeground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, fontWeight: '700', textAlign: 'center' },
  calendarGrid: { gap: spacing.xs },
  calendarRow: { flexDirection: 'row', gap: spacing.xs },
  calendarDay: { flex: 1, alignItems: 'center', borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', height: 42 },
  calendarDayMuted: { backgroundColor: colors.secondary },
  calendarDayDisabled: { opacity: 0.34 },
  calendarDaySelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  calendarDayText: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700' },
  calendarDayTextMuted: { color: colors.mutedForeground },
  calendarDayTextDisabled: { color: colors.mutedForeground },
  calendarDayTextSelected: { color: colors.primaryForeground },
  helperText: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  hourGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  hourButton: { borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  hourButtonSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  hourButtonText: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '600' },
  hourButtonTextSelected: { color: colors.primaryForeground },
  hourButtonUnavailable: { borderColor: colors.destructive, backgroundColor: colors.destructive + '20' },
  hourButtonTextUnavailable: { color: colors.destructive },
  unavailableLabel: { color: colors.destructive, fontSize: typography.fontSize.xs, textAlign: 'center' },
  input: { borderColor: colors.input, borderRadius: radius.md, borderWidth: 1, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, minHeight: 48, paddingHorizontal: spacing.md },
  notesInput: { minHeight: 96, paddingTop: spacing.md },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  total: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  warning: { color: colors.destructive, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  message: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  primaryButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, marginTop: spacing.sm, minHeight: 48, justifyContent: 'center', paddingHorizontal: spacing.lg },
  primaryButtonDisabled: { opacity: 0.64 },
  primaryButtonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
});
