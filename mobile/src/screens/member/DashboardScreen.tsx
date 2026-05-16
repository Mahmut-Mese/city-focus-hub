import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { fetchMemberDashboard, type MemberDashboardPayload } from '../../api/member-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

export function DashboardScreen(): JSX.Element {
  const { refreshSession } = useAuth();
  const [dashboard, setDashboard] = useState<MemberDashboardPayload | null>(null);
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

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setDashboard(await fetchMemberDashboard(apiClient));
    } catch {
      setError('We could not load your member dashboard.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  if (isLoading) return <LoadingState message="Loading dashboard…" />;
  if (error) return <ErrorState message={error} onRetry={loadDashboard} />;
  if (!dashboard) return <EmptyState title="No dashboard data" message="Your dashboard will appear here once member data is available." />;

  const planName = dashboard.membership?.planName || 'No active membership';
  const upcomingBookings = dashboard.bookings.filter((booking) => booking.status !== 'cancelled').slice(0, 3);
  const unpaidInvoices = dashboard.invoices.filter((invoice) => invoice.status !== 'paid');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Member dashboard</Text>
        <Text style={styles.title}>Welcome, {dashboard.user.name}</Text>
        <Text style={styles.subtitle}>{planName}</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}><Text style={styles.statValue}>{dashboard.bookings.length}</Text><Text style={styles.statLabel}>Bookings</Text></View>
        <View style={styles.statCard}><Text style={styles.statValue}>{dashboard.invoices.length}</Text><Text style={styles.statLabel}>Invoices</Text></View>
        <View style={styles.statCard}><Text style={styles.statValue}>{dashboard.resources.length}</Text><Text style={styles.statLabel}>Resources</Text></View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.body}>{unpaidInvoices.length} invoices need attention.</Text>
        <Text style={styles.body}>{upcomingBookings.length} upcoming bookings shown below.</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Upcoming bookings</Text>
        {upcomingBookings.length > 0 ? upcomingBookings.map((booking) => (
          <View key={String(booking.id)} style={styles.listItem}>
            <Text style={styles.itemTitle}>{booking.resourceName || 'Workspace booking'}</Text>
            <Text style={styles.itemMeta}>{booking.status} · {booking.startAt}</Text>
          </View>
        )) : <Text style={styles.body}>No upcoming bookings yet.</Text>}
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
  statsGrid: { flexDirection: 'row', gap: spacing.md },
  statCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flex: 1, gap: spacing.xs, padding: spacing.md },
  statValue: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['2xl'], fontWeight: '700', lineHeight: typography.lineHeight.relaxed },
  statLabel: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, lineHeight: typography.lineHeight.tight },
  sectionCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  listItem: { borderTopColor: colors.border, borderTopWidth: 1, gap: spacing.xs, paddingTop: spacing.md },
  itemTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  itemMeta: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
});
