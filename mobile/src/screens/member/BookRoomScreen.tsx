import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { fetchBookingResources } from '../../api/booking-api';
import type { MemberResource } from '../../api/member-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

function buildIso(date: string, time: string): string {
  return `${date.trim()}T${time.trim()}:00.000Z`;
}

function getHourlyRateMinor(resource: MemberResource | null): number | null {
  const value = resource?.hourlyRateMinor;
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function getDurationHours(start: string, end: string): number | null {
  const startParts = start.split(':').map(Number);
  const endParts = end.split(':').map(Number);
  const startHour = startParts[0];
  const startMinute = startParts[1];
  const endHour = endParts[0];
  const endMinute = endParts[1];
  if (startHour === undefined || startMinute === undefined || endHour === undefined || endMinute === undefined) return null;
  if (!Number.isFinite(startHour) || !Number.isFinite(startMinute) || !Number.isFinite(endHour) || !Number.isFinite(endMinute)) return null;
  const minutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
  return minutes > 0 ? minutes / 60 : null;
}

function formatEstimate(rateMinor: number | null, durationHours: number | null): string {
  if (rateMinor === null || durationHours === null) return 'Price estimate unavailable until review.';
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format((rateMinor * durationHours) / 100);
}

export function BookRoomScreen(): JSX.Element {
  const { refreshSession } = useAuth();
  const [resources, setResources] = useState<MemberResource[]>([]);
  const [selectedResourceId, setSelectedResourceId] = useState<number | null>(null);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [purpose, setPurpose] = useState('');
  const [notes, setNotes] = useState('');
  const [validation, setValidation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setSelectedResourceId(roomResources[0]?.id ?? null);
    } catch {
      setError('We could not load booking resources.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadResources();
  }, [loadResources]);

  const selectedResource = resources.find((resource) => resource.id === selectedResourceId) ?? null;
  const canBuildInput = Boolean(selectedResource && date.trim() && startTime.trim() && endTime.trim());
  const bookingInput = canBuildInput && selectedResource ? {
    resourceId: selectedResource.id,
    bookingType: 'meeting_room',
    startAt: buildIso(date, startTime),
    endAt: buildIso(date, endTime),
    purpose: purpose.trim(),
    notes: notes.trim(),
  } : null;
  const priceEstimate = formatEstimate(getHourlyRateMinor(selectedResource), getDurationHours(startTime, endTime));

  const validateInput = () => {
    if (!bookingInput) {
      setValidation('Select a room, date, start time, and end time to continue.');
      return;
    }
    if (!purpose.trim()) {
      setValidation('Enter a purpose before reviewing the booking.');
      return;
    }
    setValidation(`Ready for review: ${selectedResource?.name ?? 'Room'} from ${bookingInput.startAt} to ${bookingInput.endAt}.`);
  };

  if (isLoading) return <LoadingState message="Loading rooms…" />;
  if (error) return <ErrorState message={error} onRetry={loadResources} />;
  if (resources.length === 0) return <EmptyState title="No rooms available" message="Bookable meeting rooms will appear here once available." />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Book a room</Text>
        <Text style={styles.title}>Choose room and time</Text>
        <Text style={styles.subtitle}>Build a valid booking request before final payment review.</Text>
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Room</Text>
        {resources.map((resource) => (
          <Pressable accessibilityRole="button" key={String(resource.id)} onPress={() => setSelectedResourceId(resource.id)} style={[styles.optionCard, selectedResourceId === resource.id && styles.optionCardSelected]}>
            <Text style={styles.optionTitle}>{resource.name}</Text>
            <Text style={styles.optionMeta}>{resource.capacity ? `Up to ${resource.capacity} people` : 'Capacity not listed'}</Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Date, time, and details</Text>
        <TextInput onChangeText={setDate} placeholder="YYYY-MM-DD" placeholderTextColor={colors.mutedForeground} style={styles.input} value={date} />
        <TextInput onChangeText={setStartTime} placeholder="Start HH:mm" placeholderTextColor={colors.mutedForeground} style={styles.input} value={startTime} />
        <TextInput onChangeText={setEndTime} placeholder="End HH:mm" placeholderTextColor={colors.mutedForeground} style={styles.input} value={endTime} />
        <TextInput onChangeText={setPurpose} placeholder="Purpose" placeholderTextColor={colors.mutedForeground} style={styles.input} value={purpose} />
        <TextInput multiline onChangeText={setNotes} placeholder="Notes" placeholderTextColor={colors.mutedForeground} style={[styles.input, styles.notesInput]} textAlignVertical="top" value={notes} />
        <View style={styles.reviewCard}>
          <Text style={styles.optionTitle}>Price review</Text>
          <Text style={styles.optionMeta}>{priceEstimate}</Text>
        </View>
        {validation ? <Text style={styles.message}>{validation}</Text> : null}
        <Pressable accessibilityRole="button" onPress={validateInput} style={styles.button}>
          <Text style={styles.buttonText}>Validate booking input</Text>
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
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  optionCard: { borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, gap: spacing.xs, padding: spacing.md },
  optionCardSelected: { borderColor: colors.primary, backgroundColor: colors.secondary },
  optionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  optionMeta: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  input: { borderColor: colors.input, borderRadius: radius.md, borderWidth: 1, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, minHeight: 48, paddingHorizontal: spacing.md },
  notesInput: { minHeight: 96, paddingTop: spacing.md },
  reviewCard: { backgroundColor: colors.secondary, borderRadius: radius.md, gap: spacing.xs, padding: spacing.md },
  message: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  button: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, minHeight: 48, justifyContent: 'center', paddingHorizontal: spacing.lg },
  buttonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
});
