import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { getApiBaseUrl } from '../../config/api';
import { cancelMemberBooking, updateMemberBooking, fetchBookingResources } from '../../api/booking-api';
import type { MemberResource } from '../../api/member-api';
import { fetchMemberBookings, type MemberBooking } from '../../api/member-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { BookingPaymentVerificationError, useBookingPaymentSheet } from '../../payments/useBookingPaymentSheet';
import { colors, radius, spacing, typography } from '../../theme';


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

// Type safety helpers
function getBookingString(b: unknown, key: string): string {
  if (!b || typeof b !== 'object') return '';
  const val = (b as Record<string, unknown>)[key];
  return typeof val === 'string' ? val : '';
}

function getBookingNumber(b: unknown, key: string): number | null {
  if (!b || typeof b !== 'object') return null;
  const val = (b as Record<string, unknown>)[key];
  return typeof val === 'number' ? val : null;
}

export function BookingsScreen(): JSX.Element {
  const { refreshSession } = useAuth();
  const [bookings, setBookings] = useState<MemberBooking[]>([]);
  const [resources, setResources] = useState<MemberResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [cancelingBookingId, setCancelingBookingId] = useState<number | null>(null);
  
  // Details view state
  const [viewingBooking, setViewingBooking] = useState<MemberBooking | null>(null);
  
  // Edit flow state
  const [editingBooking, setEditingBooking] = useState<MemberBooking | null>(null);
  const [editDate, setEditDate] = useState('');
  const [editStartTime, setEditStartTime] = useState('');
  const [editEndTime, setEditEndTime] = useState('');
  const [editResourceId, setEditResourceId] = useState<number | null>(null);
  const [editPurpose, setEditPurpose] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  
  const { presentAdjustmentPaymentSheet, isPresenting } = useBookingPaymentSheet();

  const apiClient = useMemo(() => createApiClient({
    baseUrl: getApiBaseUrl(),
    getAccessToken: async () => (await getStoredSession()).accessToken,
    refreshAccessToken: async () => {
      await refreshSession();
      return (await getStoredSession()).accessToken;
    },
  }), [refreshSession]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fetchedBookings, fetchedResources] = await Promise.all([
        fetchMemberBookings(apiClient),
        fetchBookingResources(apiClient, { type: 'meeting_room' }).catch(() => [])
      ]);
      setBookings(fetchedBookings);
      setResources(fetchedResources);
    } catch {
      setError('We could not load your bookings.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

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
              setViewingBooking(null); // close details if open
              try {
                await cancelMemberBooking(apiClient, { bookingId: booking.id });
                await loadData();
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
  }, [apiClient, cancelingBookingId, loadData]);

  const startEditBooking = (booking: MemberBooking) => {
    setViewingBooking(null);
    setEditingBooking(booking);
    setEditResourceId(getBookingNumber(booking, 'resourceId'));
    setEditPurpose(getBookingString(booking, 'purpose'));
    setEditNotes(getBookingString(booking, 'notes'));
    
    try {
      const start = new Date(booking.startAt);
      const end = new Date(booking.endAt);
      if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime())) {
        setEditDate(start.toISOString().split('T')[0] || '');
        setEditStartTime(start.toISOString().split('T')[1]?.substring(0, 5) || '');
        setEditEndTime(end.toISOString().split('T')[1]?.substring(0, 5) || '');
      }
    } catch {
      setEditDate('');
      setEditStartTime('');
      setEditEndTime('');
    }
  };

  const handleUpdateBooking = async () => {
    if (!editingBooking) return;
    setIsUpdating(true);
    setStatusMessage(null);
    
    try {
      const startAt = `${editDate.trim()}T${editStartTime.trim()}:00.000Z`;
      const endAt = `${editDate.trim()}T${editEndTime.trim()}:00.000Z`;
      
      const updateResult = await updateMemberBooking(apiClient, {
        bookingId: editingBooking.id,
        resourceId: editResourceId ?? undefined,
        startAt,
        endAt,
        purpose: editPurpose,
        notes: editNotes,
      });

      if (updateResult.action === 'payment_required') {
        try {
          await presentAdjustmentPaymentSheet(updateResult);
          setStatusMessage('Booking updated and additional payment verified.');
          await loadData();
          setEditingBooking(null);
        } catch (paymentErr) {
          if (paymentErr instanceof BookingPaymentVerificationError) {
            setStatusMessage(paymentErr.message);
            await loadData();
            setEditingBooking(null);
          } else {
            setStatusMessage('Payment failed or cancelled. Booking was not updated.');
          }
        }
      } else if (updateResult.action === 'refund_required') {
        setStatusMessage(`Booking updated. A refund of ${formatCurrency(updateResult.refundMinor, updateResult.currency || 'GBP')} has been requested.`);
        await loadData();
        setEditingBooking(null);
      } else {
        setStatusMessage('Booking updated successfully.');
        await loadData();
        setEditingBooking(null);
      }
    } catch {
      setStatusMessage('Failed to update booking. Please check your inputs and try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <LoadingState message="Loading bookings…" />;
  if (error) return <ErrorState message={error} onRetry={loadData} />;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>My bookings</Text>
        <Text style={styles.title}>Bookings</Text>
        <Text style={styles.subtitle}>Review your upcoming and past workspace reservations.</Text>
      </View>

      {statusMessage ? <Text style={styles.info}>{statusMessage}</Text> : null}

      {bookings.length === 0 ? (
        <EmptyState title="No bookings yet" message="Your workspace and meeting room bookings will appear here." />
      ) : (
        bookings.map((booking) => (
          <Pressable key={String(booking.id)} style={styles.card} onPress={() => setViewingBooking(booking)}>
            <View style={styles.row}>
              <Text style={styles.itemTitle}>{getBookingString(booking, 'resourceName') || 'Workspace booking'}</Text>
              <Text style={styles.status}>{getStatusLabel(booking.status)}</Text>
            </View>
            <Text style={styles.meta}>Starts: {formatWhen(booking.startAt)}</Text>
            <Text style={styles.meta}>Ends: {formatWhen(booking.endAt)}</Text>
            <Text style={styles.metaLink}>Tap to view details</Text>
          </Pressable>
        ))
      )}

      {/* Details Modal */}
      {viewingBooking && (
        <Modal visible={!!viewingBooking} animationType="fade" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Booking Details</Text>
              <ScrollView style={styles.modalScroll}>
                <Text style={styles.metaLabel}>Resource:</Text>
                <Text style={styles.metaValue}>{getBookingString(viewingBooking, 'resourceName') || 'Workspace'}</Text>
                
                <Text style={styles.metaLabel}>Type:</Text>
                <Text style={styles.metaValue}>{getStatusLabel(getBookingString(viewingBooking, 'bookingType')) || 'N/A'}</Text>

                <Text style={styles.metaLabel}>Location:</Text>
                <Text style={styles.metaValue}>{getBookingString(viewingBooking, 'locationName') || 'N/A'}</Text>

                <Text style={styles.metaLabel}>Starts:</Text>
                <Text style={styles.metaValue}>{formatWhen(viewingBooking.startAt)}</Text>

                <Text style={styles.metaLabel}>Ends:</Text>
                <Text style={styles.metaValue}>{formatWhen(viewingBooking.endAt)}</Text>

                <Text style={styles.metaLabel}>Total:</Text>
                <Text style={styles.metaValue}>{formatCurrency(getBookingNumber(viewingBooking, 'totalMinor'), getBookingString(viewingBooking, 'currency')) || 'Free'}</Text>

                <Text style={styles.metaLabel}>Status:</Text>
                <Text style={styles.metaValue}>{getStatusLabel(viewingBooking.status)}</Text>

                {getBookingString(viewingBooking, 'paymentStatus') ? (
                  <>
                    <Text style={styles.metaLabel}>Payment:</Text>
                    <Text style={styles.metaValue}>{getStatusLabel(getBookingString(viewingBooking, 'paymentStatus'))}</Text>
                  </>
                ) : null}

                {getBookingString(viewingBooking, 'refundRequestStatus') ? (
                  <>
                    <Text style={styles.metaLabel}>Refund:</Text>
                    <Text style={styles.metaValue}>{getStatusLabel(getBookingString(viewingBooking, 'refundRequestStatus'))}</Text>
                  </>
                ) : null}

                {getBookingString(viewingBooking, 'purpose') ? (
                  <>
                    <Text style={styles.metaLabel}>Purpose:</Text>
                    <Text style={styles.metaValue}>{getBookingString(viewingBooking, 'purpose')}</Text>
                  </>
                ) : null}

                {getBookingString(viewingBooking, 'notes') ? (
                  <>
                    <Text style={styles.metaLabel}>Notes:</Text>
                    <Text style={styles.metaValue}>{getBookingString(viewingBooking, 'notes')}</Text>
                  </>
                ) : null}
              </ScrollView>
              
              <View style={styles.actionsRow}>
                {viewingBooking.status === 'confirmed' && !getBookingString(viewingBooking, 'refundRequestStatus') && getBookingString(viewingBooking, 'bookingType') !== 'desk' ? (
                  <Pressable accessibilityRole="button" onPress={() => startEditBooking(viewingBooking)} style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                  </Pressable>
                ) : null}

                {viewingBooking.status === 'confirmed' && !getBookingString(viewingBooking, 'refundRequestStatus') ? (
                  <Pressable
                    accessibilityRole="button"
                    disabled={cancelingBookingId === viewingBooking.id}
                    onPress={() => handleCancelAndRefund(viewingBooking)}
                    style={[styles.cancelButton, cancelingBookingId === viewingBooking.id && styles.cancelButtonDisabled]}
                  >
                    <Text style={styles.cancelButtonText}>{cancelingBookingId === viewingBooking.id ? 'Submitting…' : 'Cancel & refund'}</Text>
                  </Pressable>
                ) : null}
              </View>
              
              <Pressable style={[styles.modalCancelBtn, { marginTop: spacing.md }]} onPress={() => setViewingBooking(null)}>
                <Text style={[styles.modalCancelText, { textAlign: 'center' }]}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

      {/* Edit Modal */}
      {editingBooking && (
        <Modal visible={!!editingBooking} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Booking</Text>
              <ScrollView style={styles.modalScroll}>
                <Text style={styles.modalLabel}>Resource</Text>
                <View style={styles.resourceList}>
                  {resources.map((r) => (
                    <Pressable
                      key={r.id}
                      style={[styles.resourceOption, editResourceId === r.id && styles.resourceOptionSelected]}
                      onPress={() => setEditResourceId(r.id)}
                    >
                      <Text style={styles.resourceOptionText}>{r.name}</Text>
                    </Pressable>
                  ))}
                </View>
                
                <Text style={styles.modalLabel}>Date (YYYY-MM-DD)</Text>
                <TextInput style={styles.input} value={editDate} onChangeText={setEditDate} />
                
                <Text style={styles.modalLabel}>Start Time (HH:mm)</Text>
                <TextInput style={styles.input} value={editStartTime} onChangeText={setEditStartTime} />
                
                <Text style={styles.modalLabel}>End Time (HH:mm)</Text>
                <TextInput style={styles.input} value={editEndTime} onChangeText={setEditEndTime} />
                
                <Text style={styles.modalLabel}>Purpose</Text>
                <TextInput style={styles.input} value={editPurpose} onChangeText={setEditPurpose} />
                
                <Text style={styles.modalLabel}>Notes</Text>
                <TextInput style={[styles.input, styles.notesInput]} multiline value={editNotes} onChangeText={setEditNotes} textAlignVertical="top" />
              </ScrollView>
              
              <View style={styles.modalActions}>
                <Pressable style={styles.modalCancelBtn} onPress={() => setEditingBooking(null)} disabled={isUpdating || isPresenting}>
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.modalSaveBtn} onPress={handleUpdateBooking} disabled={isUpdating || isPresenting}>
                  <Text style={styles.modalSaveText}>{isUpdating || isPresenting ? 'Updating...' : 'Save & Update'}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      )}
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
  metaLink: { color: colors.primary, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, marginTop: spacing.xs, fontWeight: '600' },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  actionsRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md, justifyContent: 'center' },
  cancelButton: { alignItems: 'center', backgroundColor: colors.destructive, borderRadius: radius.md, minHeight: 40, justifyContent: 'center', paddingHorizontal: spacing.md, flex: 1 },
  cancelButtonDisabled: { opacity: 0.6 },
  cancelButtonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700', lineHeight: typography.lineHeight.tight },
  editButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, minHeight: 40, justifyContent: 'center', paddingHorizontal: spacing.md, flex: 1 },
  editButtonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700', lineHeight: typography.lineHeight.tight },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: spacing.xl },
  modalContent: { backgroundColor: colors.background, borderRadius: radius.lg, padding: spacing.xl, maxHeight: '80%' },
  modalTitle: { fontSize: typography.fontSize.xl, fontWeight: '700', marginBottom: spacing.md },
  modalScroll: { marginBottom: spacing.lg },
  modalLabel: { fontSize: typography.fontSize.sm, fontWeight: '600', marginTop: spacing.md, marginBottom: spacing.xs },
  
  metaLabel: { fontSize: typography.fontSize.sm, fontWeight: '700', color: colors.mutedForeground, marginTop: spacing.sm },
  metaValue: { fontSize: typography.fontSize.base, color: colors.foreground, marginBottom: spacing.xs },

  input: { borderColor: colors.border, borderWidth: 1, borderRadius: radius.md, padding: spacing.md, fontSize: typography.fontSize.base },
  notesInput: { minHeight: 80 },
  resourceList: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  resourceOption: { padding: spacing.sm, borderWidth: 1, borderColor: colors.border, borderRadius: radius.md },
  resourceOptionSelected: { borderColor: colors.primary, backgroundColor: colors.secondary },
  resourceOptionText: { fontSize: typography.fontSize.sm },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.md },
  modalCancelBtn: { padding: spacing.md },
  modalCancelText: { color: colors.mutedForeground, fontWeight: '600' },
  modalSaveBtn: { backgroundColor: colors.primary, padding: spacing.md, borderRadius: radius.md },
  modalSaveText: { color: colors.primaryForeground, fontWeight: '600' },
});
