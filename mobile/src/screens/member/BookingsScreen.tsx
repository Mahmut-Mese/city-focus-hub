import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { cancelMemberBooking } from '../../api/booking-api';
import { fetchMemberBookings, type MemberBooking } from '../../api/member-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

function formatWhen(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
}

function getStatusLabel(status: string): string {
  return status.replace(/_/g, ' ');
}

function formatCurrency(minor: unknown, currency: unknown): string | null {
  if (typeof minor !== 'number' || !Number.isFinite(minor) || typeof currency !== 'string' || !currency) {
    return null;
  }
  try {
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currency.toUpperCase() }).format(minor / 100);
  } catch {
    return null;
  }
}

export function BookingsScreen(): JSX.Element {
  const { refreshSession } = useAuth();
  const [bookings, setBookings] = useState<MemberBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [cancelingBookingId, setCancelingBookingId] = useState<number | null>(null);

  const apiClient = useMemo(() => createApiClient({
    baseUrl: getApiBaseUrl(),
    getAccessToken: async () => (await getStoredSession()).accessToken,
    refreshAccessToken: async () => {
      await refreshSession();
      return (await getStoredSession()).accessToken;
    },
  }), [refreshSession]);

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setBookings(await fetchMemberBookings(apiClient));
    } catch {
      setError('We could not load your bookings.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadBookings();
  }, [loadBookings]);

  const handleCancelAndRefund = useCallback((booking: MemberBooking) => {
    Alert.alert(
      'Cancel booking?',
      'This will cancel the booking and send a refund request for admin review.',
      [
        { text: 'Keep booking', style: 'cancel' },
        {
          text: 'Cancel & request refund',
          style: 'destructive',
          onPress: () => {
            void (async () => {
              if (cancelingBookingId === booking.id) return;
              setCancelingBookingId(booking.id);
              setStatusMessage(null);
              try {
                await cancelMemberBooking(apiClient, { bookingId: booking.id });
                await loadBookings();
                setStatusMessage('Cancellation submitted. Refund request is now pending review.');
              } catch {
                setStatusMessage('We could not cancel this booking right now. Please try again.');
              } finally {
                setCancelingBookingId(null);
              }
            })();
          },
        },
      ],
    );
  }, [apiClient, cancelingBookingId, loadBookings]);

  if (isLoading) return <LoadingState message="Loading bookings…" />;
  if (error) return <ErrorState message={error} onRetry={loadBookings} />;
  if (bookings.length === 0) return <EmptyState title="No bookings yet" message="Your workspace and meeting room bookings will appear here." />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>My bookings</Text>
        <Text style={styles.title}>Bookings</Text>
        <Text style={styles.subtitle}>Review your upcoming and past workspace reservations.</Text>
      </View>

      {statusMessage ? <Text style={styles.info}>{statusMessage}</Text> : null}

      {bookings.map((booking) => (
        <View key={String(booking.id)} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.itemTitle}>{booking.resourceName || 'Workspace booking'}</Text>
            <Text style={styles.status}>{getStatusLabel(booking.status)}</Text>
          </View>
          <Text style={styles.meta}>Starts: {formatWhen(booking.startAt)}</Text>
          <Text style={styles.meta}>Ends: {formatWhen(booking.endAt)}</Text>
          {formatCurrency(booking.totalMinor, booking.currency) ? (
            <Text style={styles.meta}>Total: {formatCurrency(booking.totalMinor, booking.currency)}</Text>
          ) : null}
          {typeof booking.paymentStatus === 'string' && booking.paymentStatus ? (
            <Text style={styles.meta}>Payment: {getStatusLabel(booking.paymentStatus)}</Text>
          ) : null}
          {typeof booking.refundRequestStatus === 'string' && booking.refundRequestStatus ? (
            <Text style={styles.meta}>Refund: {getStatusLabel(booking.refundRequestStatus)}</Text>
          ) : null}
          {typeof booking.purpose === 'string' && booking.purpose ? <Text style={styles.body}>{booking.purpose}</Text> : null}
          {booking.status === 'confirmed' && !booking.refundRequestStatus ? (
            <Pressable
              accessibilityRole="button"
              disabled={cancelingBookingId === booking.id}
              onPress={() => handleCancelAndRefund(booking)}
              style={[styles.cancelButton, cancelingBookingId === booking.id && styles.cancelButtonDisabled]}
            >
              <Text style={styles.cancelButtonText}>{cancelingBookingId === booking.id ? 'Submitting…' : 'Cancel & request refund'}</Text>
            </Pressable>
          ) : null}
        </View>
      ))}
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
  info: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  card: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  row: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.md, justifyContent: 'space-between' },
  itemTitle: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  status: { backgroundColor: colors.secondary, borderRadius: radius.full, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, lineHeight: typography.lineHeight.tight, paddingHorizontal: spacing.md, paddingVertical: spacing.xs, textTransform: 'capitalize' },
  meta: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  cancelButton: { alignItems: 'center', alignSelf: 'flex-start', backgroundColor: colors.destructive, borderRadius: radius.md, minHeight: 40, justifyContent: 'center', paddingHorizontal: spacing.md },
  cancelButtonDisabled: { opacity: 0.6 },
  cancelButtonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700', lineHeight: typography.lineHeight.tight },
});
