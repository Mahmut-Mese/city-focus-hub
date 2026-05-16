import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { getApiBaseUrl } from '../../config/api';
import {
  cancelAccountDeletion,
  fetchAccountDeletionStatus,
  requestAccountDeletion,
  type AccountDeletionStatus,
} from '../../api/member-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';
import { useScrollBottomPadding } from '../../utils/use-scroll-padding';


export function AccountDeletionScreen(): JSX.Element {
  const scrollBottomPadding = useScrollBottomPadding();
  const { refreshSession } = useAuth();
  const [status, setStatus] = useState<AccountDeletionStatus | null>(null);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiClient = useMemo(() => createApiClient({
    baseUrl: getApiBaseUrl(),
    getAccessToken: async () => (await getStoredSession()).accessToken,
    refreshAccessToken: async () => {
      await refreshSession();
      return (await getStoredSession()).accessToken;
    },
  }), [refreshSession]);

  const loadStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setStatus(await fetchAccountDeletionStatus(apiClient));
    } catch {
      setError('We could not load your account deletion status.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  const submitRequest = useCallback(() => {
    Alert.alert(
      'Request account deletion?',
      'Your request will be reviewed and processed within 30 days. You can cancel while it is still pending.',
      [
        { text: 'Keep account', style: 'cancel' },
        {
          text: 'Request deletion',
          style: 'destructive',
          onPress: async () => {
            setIsSubmitting(true);
            setError(null);
            try {
              setStatus(await requestAccountDeletion(apiClient, reason));
            } catch {
              setError('We could not submit your deletion request.');
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ],
    );
  }, [apiClient, reason]);

  const submitCancel = useCallback(() => {
    Alert.alert('Cancel deletion request?', 'Your account will remain active.', [
      { text: 'Keep request', style: 'cancel' },
      {
        text: 'Cancel request',
        onPress: async () => {
          setIsSubmitting(true);
          setError(null);
          try {
            setStatus(await cancelAccountDeletion(apiClient, reason));
          } catch {
            setError('We could not cancel your deletion request.');
          } finally {
            setIsSubmitting(false);
          }
        },
      },
    ]);
  }, [apiClient, reason]);

  if (isLoading) return <LoadingState message="Loading account deletion status…" />;
  if (error && !status) return <ErrorState message={error} onRetry={loadStatus} />;

  const canCancel = status?.status === 'requested';

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, scrollBottomPadding]}>
      <Text style={styles.eyebrow}>Privacy</Text>
      <Text style={styles.title}>Account deletion</Text>
      <Text style={styles.subtitle}>Request deletion of your account data. Requests are processed within 30 days.</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.card}>
        <Text style={styles.label}>Current status</Text>
        <Text style={styles.value}>{status ? status.status : 'No deletion request'}</Text>
        {status?.scheduledDeletionAt ? <Text style={styles.muted}>Scheduled: {String(status.scheduledDeletionAt)}</Text> : null}
      </View>

      <Text style={styles.label}>Reason (optional)</Text>
      <TextInput
        multiline
        onChangeText={setReason}
        placeholder="Tell us why you are leaving"
        placeholderTextColor={colors.mutedForeground}
        style={styles.input}
        value={reason}
      />

      <Pressable disabled={isSubmitting} onPress={submitRequest} style={[styles.button, styles.destructive]}>
        <Text style={styles.buttonText}>{isSubmitting ? 'Submitting…' : 'Request account deletion'}</Text>
      </Pressable>

      {canCancel ? (
        <Pressable disabled={isSubmitting} onPress={submitCancel} style={styles.button}>
          <Text style={styles.buttonText}>Cancel deletion request</Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md },
  eyebrow: { color: colors.mutedForeground, fontSize: typography.fontSize.sm, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontSize: typography.fontSize['3xl'], fontWeight: '700' },
  subtitle: { color: colors.mutedForeground, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  card: { backgroundColor: colors.muted, borderRadius: radius.md, padding: spacing.md, gap: spacing.xs },
  label: { color: colors.foreground, fontSize: typography.fontSize.sm, fontWeight: '600' },
  value: { color: colors.foreground, fontSize: typography.fontSize.lg, fontWeight: '600' },
  muted: { color: colors.mutedForeground, fontSize: typography.fontSize.sm },
  error: { color: colors.destructive, fontSize: typography.fontSize.sm },
  input: { borderColor: colors.input, borderRadius: radius.md, borderWidth: 1, color: colors.foreground, minHeight: 96, padding: spacing.md, textAlignVertical: 'top' },
  button: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, minHeight: 48, justifyContent: 'center', padding: spacing.md },
  destructive: { backgroundColor: colors.destructive },
  buttonText: { color: colors.primaryForeground, fontSize: typography.fontSize.base, fontWeight: '700' },
});
