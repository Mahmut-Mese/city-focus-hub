import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { getApiBaseUrl } from '../../config/api';
import { fetchBookingResources } from '../../api/booking-api';
import type { BookingDraftInput } from '../../api/booking-api';
import type { MemberBooking, MemberResource } from '../../api/member-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { BookingPaymentVerificationError, useBookingPaymentSheet } from '../../payments/useBookingPaymentSheet';
import { colors, radius, spacing, typography } from '../../theme';
import { useScrollBottomPadding } from '../../utils/use-scroll-padding';


// Type safety helpers
function getResourceNumber(r: unknown, key: string): number | null {
  if (!r || typeof r !== 'object') return null;
  const val = (r as Record<string, unknown>)[key];
  return typeof val === 'number' ? val : null;
}

function getResourceString(r: unknown, key: string): string {
  if (!r || typeof r !== 'object') return '';
  const val = (r as Record<string, unknown>)[key];
  return typeof val === 'string' ? val : '';
}

function buildIso(date: string, time: string): string {
  return `${date.trim()}T${time.trim()}:00.000Z`;
}

function getHourlyRateMinor(resource: MemberResource | null): number | null {
  const value = getResourceNumber(resource, 'hourlyRateMinor');
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

function formatEstimate(rateMinor: number | null, startHour: string, endHour: string): { subtotal: string; vat: string; total: string; duration: number } | null {
  if (rateMinor === null || !startHour || !endHour) return null;
  const startIdx = HOURS.indexOf(startHour);
  const endIdx = HOURS.indexOf(endHour);
  if (startIdx < 0 || endIdx < 0 || endIdx <= startIdx) return null;
  
  const durationHours = endIdx - startIdx;
  const net = rateMinor * durationHours;
  const vat = net * 0.20;
  const total = net + vat;
  
  const fmt = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
  return {
    subtotal: fmt.format(net / 100),
    vat: fmt.format(vat / 100),
    total: fmt.format(total / 100),
    duration: durationHours,
  };
}

function isPastDate(dateStr: string): boolean {
  const today = new Date().toISOString().split('T')[0];
  return dateStr < today!;
}

export function BookRoomScreen(): JSX.Element {
  const scrollBottomPadding = useScrollBottomPadding();
  const { refreshSession } = useAuth();
  const [resources, setResources] = useState<MemberResource[]>([]);
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(null);
  
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    return today || '';
  });
  
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  
  const [purpose, setPurpose] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  
  const [unavailableHours, setUnavailableHours] = useState<string[]>([]);
  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { presentBookingPaymentSheet, isPresenting } = useBookingPaymentSheet();

  const apiClient = useMemo(() => createApiClient({
    baseUrl: getApiBaseUrl(),
    getAccessToken: async () => (await getStoredSession()).accessToken,
    refreshAccessToken: async () => {
      await refreshSession();
      return (await getStoredSession()).accessToken;
    },
  }), [refreshSession]);

  const loadResources = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const roomResources = await fetchBookingResources(apiClient, { type: 'meeting_room' });
      setResources(roomResources);
      if (roomResources.length > 0 && !selectedResourceId) {
        setSelectedResourceId(getResourceNumber(roomResources[0], 'id'));
      }
    } catch {
      setError('We could not load booking resources.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient, selectedResourceId]);

  useEffect(() => {
    void loadResources();
  }, [loadResources]);

  useEffect(() => {
    if (!selectedDate || !selectedResourceId || isPastDate(selectedDate)) {
      setUnavailableHours([]);
      return;
    }

    let isMounted = true;
    setIsAvailabilityLoading(true);
    setMessage(null);

    const checkAvailability = async () => {
      try {
        const promises = HOURS.slice(0, -1).map(async (hr, idx) => {
          const nextHr = HOURS[idx + 1];
          const startAt = buildIso(selectedDate, hr);
          const endAt = buildIso(selectedDate, nextHr!);
          try {
            const availRes = await fetchBookingResources(apiClient, { type: 'meeting_room', startAt, endAt });
            const r = availRes.find((x) => getResourceNumber(x, 'id') === selectedResourceId);
            
            // if absent or available explicitly false
            const isAvailableBool = !r || typeof r !== 'object' ? true : typeof (r as Record<string, unknown>).available === 'boolean' ? (r as Record<string, unknown>).available : true;
            if (!r || !isAvailableBool) {
              return hr;
            }
          } catch {
            return hr; // assume unavailable on fetch error
          }
          return null;
        });
        
        const results = await Promise.all(promises);
        if (isMounted) {
          setUnavailableHours(results.filter((x): x is string => x !== null));
        }
      } finally {
        if (isMounted) {
          setIsAvailabilityLoading(false);
        }
      }
    };
    
    void checkAvailability();
    
    return () => {
      isMounted = false;
    };
  }, [selectedDate, selectedResourceId, apiClient]);

  // Range validation effect
  useEffect(() => {
    if (startHour && endHour && unavailableHours.length > 0) {
      const startIdx = HOURS.indexOf(startHour);
      const endIdx = HOURS.indexOf(endHour);
      
      const overlap = unavailableHours.some((uh) => {
        const uIdx = HOURS.indexOf(uh);
        return uIdx >= startIdx && uIdx < endIdx;
      });
      
      if (overlap) {
        setStartHour('');
        setEndHour('');
        setMessage('Selected range includes unavailable hours. Selection cleared.');
      }
    }
  }, [unavailableHours, startHour, endHour]);

  const selectedResource = resources.find((resource) => getResourceNumber(resource, 'id') === selectedResourceId) ?? null;
  const canBuildInput = Boolean(selectedResource && selectedDate && startHour && endHour);
  const bookingInput = canBuildInput && selectedResource ? {
    resourceId: getResourceNumber(selectedResource, 'id')!,
    bookingType: 'meeting_room',
    startAt: buildIso(selectedDate, startHour),
    endAt: buildIso(selectedDate, endHour),
    purpose: purpose.trim(),
    notes: notes.trim(),
  } : null;
  
  const estimate = formatEstimate(getHourlyRateMinor(selectedResource), startHour, endHour);

  const validateInput = (): BookingDraftInput | null => {
    if (!bookingInput) {
      setMessage('Select a room, date, and consecutive hours to continue.');
      return null;
    }
    if (!purpose.trim()) {
      setMessage('Enter a purpose before continuing to payment.');
      return null;
    }
    setMessage(null);
    return bookingInput;
  };

  const handleSubmit = async () => {
    if (isSubmitting || isPresenting) return;
    const validInput = validateInput();
    if (!validInput) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await presentBookingPaymentSheet(validInput);
      const booking: MemberBooking = result.booking;
      const startsAt = new Date(booking.startAt);
      const endsAt = new Date(booking.endAt);
      const timeSummary = Number.isNaN(startsAt.getTime()) || Number.isNaN(endsAt.getTime())
        ? `${booking.startAt} - ${booking.endAt}`
        : `${startsAt.toLocaleDateString()} ${startsAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endsAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      setMessage(`Booking confirmed: ${getResourceString(booking, 'resourceName') || getResourceString(selectedResource, 'name') || 'Room'} • ${timeSummary} • Ref #${getResourceNumber(booking, 'id')}`);
      setStartHour('');
      setEndHour('');
    } catch (submitError) {
      if (submitError instanceof BookingPaymentVerificationError) {
        setMessage(submitError.message);
      } else {
        setMessage('We could not complete this booking. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calendar logic
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayIndex = (new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() + 6) % 7; // Monday start
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayIndex }, (_, i) => i);

  if (isLoading) return <LoadingState message="Loading rooms…" />;
  if (error) return <ErrorState message={error} onRetry={loadResources} />;
  if (resources.length === 0) return <EmptyState title="No rooms available" message="Bookable meeting rooms will appear here once available." />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, scrollBottomPadding]}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Book a room</Text>
        <Text style={styles.title}>Choose room and time</Text>
        <Text style={styles.subtitle}>Select a date and consecutive available slots.</Text>
      </View>
      
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Room</Text>
        {resources.map((resource) => (
          <Pressable accessibilityRole="button" key={String(getResourceNumber(resource, 'id'))} onPress={() => setSelectedResourceId(getResourceNumber(resource, 'id'))} style={[styles.optionCard, selectedResourceId === getResourceNumber(resource, 'id') && styles.optionCardSelected]}>
            <Text style={styles.optionTitle}>{getResourceString(resource, 'name')}</Text>
            <Text style={styles.optionMeta}>{getResourceNumber(resource, 'capacity') ? `Up to ${getResourceNumber(resource, 'capacity')} people` : 'Capacity not listed'} • £{(getResourceNumber(resource, 'hourlyRateMinor') || 0) / 100}/hr</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Date</Text>
        <View style={styles.calendarHeader}>
          <Pressable onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}>
            <Text style={styles.calendarNav}>{'<'}</Text>
          </Pressable>
          <Text style={styles.calendarMonth}>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</Text>
          <Pressable onPress={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}>
            <Text style={styles.calendarNav}>{'>'}</Text>
          </Pressable>
        </View>
        <View style={styles.calendarGrid}>
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <Text key={i} style={styles.calendarDayHeader}>{d}</Text>)}
          {blanks.map((_, i) => <View key={`blank-${i}`} style={styles.calendarCell} />)}
          {days.map((day) => {
            const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isSelected = selectedDate === dateStr;
            const past = isPastDate(dateStr);
            
            return (
              <Pressable 
                key={day} 
                style={[styles.calendarCell, isSelected && styles.calendarCellSelected, past && styles.calendarCellDisabled]} 
                onPress={() => !past && setSelectedDate(dateStr)}
                disabled={past}
              >
                <Text style={[styles.calendarDayText, isSelected && styles.calendarDayTextSelected, past && styles.calendarDayTextDisabled]}>{day}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.hoursHeaderRow}>
          <Text style={styles.sectionTitle}>Hours</Text>
          {isAvailabilityLoading && <Text style={styles.loadingText}>Checking availability...</Text>}
        </View>
        
        <View style={styles.timeGrid}>
          {HOURS.slice(0, -1).map((hr, idx) => {
            const nextHr = HOURS[idx + 1];
            const isUnavailable = unavailableHours.includes(hr);
            const isStart = startHour === hr;
            const inRange = startHour && endHour && hr >= startHour && hr < endHour;
            const isSelected = isStart || inRange;
            
            return (
              <Pressable
                key={hr}
                disabled={isUnavailable}
                style={[
                  styles.timeSlot, 
                  isSelected && styles.timeSlotSelected,
                  isUnavailable && styles.timeSlotUnavailable
                ]}
                onPress={() => {
                  if (isUnavailable) return;
                  
                  if (!startHour || (startHour && endHour)) {
                    setStartHour(hr);
                    setEndHour(nextHr!);
                  } else {
                    if (hr >= startHour) {
                      // Check for unavailable slots in between
                      const startIdx = HOURS.indexOf(startHour);
                      const currentIdx = HOURS.indexOf(hr);
                      const overlap = unavailableHours.some((uh) => {
                        const uIdx = HOURS.indexOf(uh);
                        return uIdx >= startIdx && uIdx <= currentIdx;
                      });
                      
                      if (overlap) {
                        setStartHour(hr);
                        setEndHour(nextHr!);
                        setMessage('Selection skipped unavailable hours. Adjusting start time.');
                      } else {
                        setEndHour(nextHr!);
                      }
                    } else {
                      setStartHour(hr);
                      setEndHour(nextHr!);
                    }
                  }
                }}
              >
                <Text style={[
                  styles.timeSlotText, 
                  isSelected && styles.timeSlotTextSelected,
                  isUnavailable && styles.timeSlotTextUnavailable
                ]}>{hr}</Text>
              </Pressable>
            );
          })}
        </View>
        {startHour && endHour ? (
          <Text style={styles.timeSummary}>Selected: {startHour} to {endHour}</Text>
        ) : null}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Details</Text>
        <TextInput onChangeText={setPurpose} placeholder="Purpose" placeholderTextColor={colors.mutedForeground} style={styles.input} value={purpose} />
        <TextInput multiline onChangeText={setNotes} placeholder="Notes" placeholderTextColor={colors.mutedForeground} style={[styles.input, styles.notesInput]} textAlignVertical="top" value={notes} />
        
        <View style={styles.reviewCard}>
          <Text style={styles.optionTitle}>Price estimate</Text>
          {estimate ? (
            <>
              <Text style={styles.optionMeta}>Subtotal: {estimate.subtotal}</Text>
              <Text style={styles.optionMeta}>VAT (20%): {estimate.vat}</Text>
              <Text style={[styles.optionMeta, { fontWeight: 'bold', color: colors.foreground, marginTop: spacing.xs }]}>Total: {estimate.total}</Text>
            </>
          ) : (
            <Text style={styles.optionMeta}>Select date and hours to see estimate.</Text>
          )}
        </View>
        
        {message ? <Text style={styles.message}>{message}</Text> : null}
        
        <Pressable accessibilityRole="button" disabled={isSubmitting || isPresenting} onPress={() => void handleSubmit()} style={[styles.button, (isSubmitting || isPresenting) && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>{isSubmitting || isPresenting ? 'Processing…' : 'Pay & confirm booking'}</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.lg },
  heroCard: { backgroundColor: colors.secondary, borderRadius: radius.lg, gap: spacing.md, padding: spacing.xl },
  eyebrow: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, letterSpacing: 0.4, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  sectionCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal, marginTop: spacing.sm },
  optionCard: { borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, gap: spacing.xs, padding: spacing.md },
  optionCardSelected: { borderColor: colors.primary, backgroundColor: colors.secondary },
  optionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  optionMeta: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  calendarNav: { fontSize: typography.fontSize.xl, padding: spacing.sm, color: colors.primary },
  calendarMonth: { fontSize: typography.fontSize.base, fontWeight: '600' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calendarDayHeader: { width: '14.28%', textAlign: 'center', color: colors.mutedForeground, fontSize: typography.fontSize.xs, marginBottom: spacing.sm },
  calendarCell: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', borderRadius: radius.full },
  calendarCellSelected: { backgroundColor: colors.primary },
  calendarCellDisabled: { opacity: 0.3 },
  calendarDayText: { fontSize: typography.fontSize.sm, color: colors.foreground },
  calendarDayTextSelected: { color: colors.primaryForeground, fontWeight: 'bold' },
  calendarDayTextDisabled: { color: colors.mutedForeground },
  
  hoursHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  loadingText: { color: colors.primary, fontSize: typography.fontSize.sm, fontStyle: 'italic', marginTop: spacing.sm },
  
  input: { borderColor: colors.input, borderRadius: radius.md, borderWidth: 1, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, minHeight: 48, paddingHorizontal: spacing.md },
  notesInput: { minHeight: 96, paddingTop: spacing.md },
  
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  timeSlot: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.sm, minWidth: 64, alignItems: 'center' },
  timeSlotSelected: { borderColor: colors.primary, backgroundColor: colors.primary },
  timeSlotUnavailable: { borderColor: colors.destructive, backgroundColor: colors.secondary, opacity: 0.6 },
  timeSlotText: { color: colors.foreground, fontSize: typography.fontSize.sm },
  timeSlotTextSelected: { color: colors.primaryForeground, fontWeight: '700' },
  timeSlotTextUnavailable: { color: colors.destructive, textDecorationLine: 'line-through' },
  timeSummary: { color: colors.mutedForeground, fontSize: typography.fontSize.sm, marginTop: spacing.xs },
  
  reviewCard: { backgroundColor: colors.secondary, borderRadius: radius.md, gap: spacing.xs, padding: spacing.md },
  message: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  button: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, minHeight: 48, justifyContent: 'center', paddingHorizontal: spacing.lg },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
});
