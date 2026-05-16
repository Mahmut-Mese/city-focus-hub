import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { getApiBaseUrl } from '../../config/api';
import {
  fetchNotificationPreferences,
  updateNotificationPreferences,
  type NotificationPreferences,
} from '../../api/member-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';
import { useScrollBottomPadding } from '../../utils/use-scroll-padding';


type ToggleKey = 'booking' | 'payments' | 'membership' | 'access' | 'marketing';

type ToggleRow = {
  key: ToggleKey;
  label: string;
  description: string;
};

const TOGGLES: ToggleRow[] = [
  { key: 'booking', label: 'Booking updates', description: 'Confirmations, reminders, and changes for your bookings.' },
  { key: 'payments', label: 'Payments', description: 'Receipts, failed payments, and refund updates.' },
  { key: 'membership', label: 'Membership', description: 'Renewal reminders and plan changes.' },
  { key: 'access', label: 'Building access', description: 'Door codes, access grants, and visit confirmations.' },
  { key: 'marketing', label: 'News and offers', description: 'Occasional product news and partner offers.' },
];

export function NotificationPreferencesScreen(): JSX.Element {
  const scrollBottomPadding = useScrollBottomPadding();
  const { refreshSession } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [savingKey, setSavingKey] = useState<ToggleKey | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const apiClient = useMemo(() => createApiClient({
    baseUrl: getApiBaseUrl(),
    getAccessToken: async () => (await getStoredSession()).accessToken,
    refreshAccessToken: async () => {
      await refreshSession();
      return (await getStoredSession()).accessToken;
    },
  }), [refreshSession]);

  const loadPreferences = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    setSaveError(null);
    try {
      const result = await fetchNotificationPreferences(apiClient);
      setPreferences(result);
    } catch {
      setLoadError('We could not load your notification preferences.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadPreferences();
  }, [loadPreferences]);

  const handleToggle = useCallback(async (key: ToggleKey, value: boolean) => {
    if (!preferences || savingKey) return;
    const previous = preferences;
    const next: NotificationPreferences = { ...preferences, [key]: value };
    setPreferences(next);
    setSavingKey(key);
    setSaveError(null);
    try {
      const saved = await updateNotificationPreferences(apiClient, next);
      setPreferences(saved);
    } catch {
      setPreferences(previous);
      setSaveError('We could not save your preferences. Please try again.');
    } finally {
      setSavingKey(null);
    }
  }, [apiClient, preferences, savingKey]);

  if (isLoading) return <LoadingState message="Loading preferences…" />;
  if (loadError || !preferences) {
    return <ErrorState message={loadError ?? 'Preferences are unavailable.'} onRetry={loadPreferences} />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, scrollBottomPadding]}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Notifications</Text>
        <Text style={styles.title}>Notification preferences</Text>
        <Text style={styles.subtitle}>Choose which notifications you want to receive from The Leadenhall Works.</Text>
      </View>

      {saveError ? <Text style={styles.errorText}>{saveError}</Text> : null}

      <View style={styles.card}>
        {TOGGLES.map((toggle, index) => {
          const value = Boolean(preferences[toggle.key]);
          const isSaving = savingKey === toggle.key;
          return (
            <View
              key={toggle.key}
              style={[styles.row, index < TOGGLES.length - 1 ? styles.rowDivider : null]}
            >
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>{toggle.label}</Text>
                <Text style={styles.rowDescription}>{toggle.description}</Text>
                {isSaving ? <Text style={styles.savingText}>Saving…</Text> : null}
              </View>
              <Switch
                accessibilityLabel={toggle.label}
                value={value}
                onValueChange={(next) => void handleToggle(toggle.key, next)}
                disabled={savingKey !== null && savingKey !== toggle.key}
              />
            </View>
          );
        })}
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
  errorText: { color: colors.destructive, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  card: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, padding: spacing.lg },
  row: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, paddingVertical: spacing.md },
  rowDivider: { borderBottomColor: colors.border, borderBottomWidth: 1 },
  rowText: { flex: 1, gap: spacing.xs },
  rowLabel: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  rowDescription: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  savingText: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, lineHeight: typography.lineHeight.tight },
});
