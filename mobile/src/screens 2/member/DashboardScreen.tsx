import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { createApiClient } from '../../api/client';
import { fetchMemberDashboard, type MemberDashboardPayload } from '../../api/member-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import type { MemberTabsParamList } from '../../navigation/MemberTabs';
import { colors, radius, spacing, typography } from '../../theme';

function getStringValue(source: unknown, key: string, fallback = ''): string {
  if (source && typeof source === 'object' && key in source) {
    const val = (source as Record<string, unknown>)[key];
    return typeof val === 'string' ? val : (val != null ? String(val) : fallback);
  }
  return fallback;
}

function getNumberValue(source: unknown, key: string): number | null {
  if (source && typeof source === 'object' && key in source) {
    const val = (source as Record<string, unknown>)[key];
    return typeof val === 'number' ? val : (typeof val === 'string' && !isNaN(Number(val)) ? Number(val) : null);
  }
  return null;
}

function formatMoney(minor: unknown, currency: unknown): string {
  const amount = typeof minor === 'number' ? minor : (typeof minor === 'string' && !isNaN(Number(minor)) ? Number(minor) : null);
  if (amount === null) return 'N/A';
  const curr = typeof currency === 'string' ? currency.toUpperCase() : 'GBP';
  return (amount / 100).toLocaleString('en-GB', { style: 'currency', currency: curr });
}

function formatDate(value: unknown): string {
  if (!value) return 'N/A';
  const d = new Date(String(value));
  return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString('en-GB');
}

function formatDateTime(value: unknown): string {
  if (!value) return 'N/A';
  const d = new Date(String(value));
  return isNaN(d.getTime()) ? 'N/A' : d.toLocaleString('en-GB');
}

function formatTimeRange(startAt: unknown, endAt: unknown): string {
  if (!startAt || !endAt) return 'N/A';
  const s = new Date(String(startAt));
  const e = new Date(String(endAt));
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return 'N/A';
  return `${s.toLocaleString('en-GB')} - ${e.toLocaleString('en-GB')}`;
}

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

type MemberNavigation = BottomTabNavigationProp<MemberTabsParamList>;

export function DashboardScreen(): JSX.Element {
  const navigation = useNavigation<MemberNavigation>();
  const { refreshSession, logout } = useAuth();
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

  const safeMembership = dashboard.membership as Record<string, unknown> | undefined;
  const membershipStatus = getStringValue(safeMembership, 'status', 'inactive');
  const planName = getStringValue(safeMembership, 'planName', 'No active membership');
  const planSlug = getStringValue(safeMembership, 'planSlug', '');
  
  const upcomingBookings = [...(dashboard.bookings || [])]
    .filter((booking) => {
      const status = getStringValue(booking, 'status');
      return status !== 'cancelled' && status !== 'canceled';
    })
    .filter((booking) => {
      const startAt = getStringValue(booking, 'startAt');
      if (!startAt) return false;
      const d = new Date(startAt);
      return !isNaN(d.getTime()) && d > new Date();
    })
    .sort((a, b) => new Date(getStringValue(a, 'startAt')).getTime() - new Date(getStringValue(b, 'startAt')).getTime())
    .slice(0, 3);
  const unpaidInvoices = (dashboard.invoices || []).filter((invoice) => getStringValue(invoice, 'status') !== 'paid');
  const safeStats = dashboard.stats as Record<string, unknown> || {};

  const userName = getStringValue(dashboard.user, 'name', 'Member').split(' ')[0];
  const userFullName = getStringValue(dashboard.user, 'name', 'Member');
  const userEmail = getStringValue(dashboard.user, 'email', '');
  const userPhone = getStringValue(dashboard.user, 'phone', '');
  const userAccessStatus = getStringValue(dashboard.user, 'accessStatus', 'inactive');

  // Extract features from plan
  const plans = (dashboard.plans as Array<Record<string, unknown>>) || [];
  const activePlan = plans.find((p) => getStringValue(p, 'slug') === planSlug);
  const features = activePlan && Array.isArray(activePlan.features) ? activePlan.features : [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Member dashboard</Text>
        <Text style={styles.titleSmall}>Welcome back, {userName}</Text>
        <Text style={styles.subtitleSmall}>Your membership, bookings, invoices, and Stripe status are synced from the backend.</Text>
      </View>

      <View style={styles.quickActionsCard}>
        <Text style={styles.sectionTitle}>Quick actions</Text>
        <View style={styles.actionsGrid}>
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('BookRoom')} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Book a room</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Membership')} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>View membership</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Bookings')} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>My Bookings</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Invoices')} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Invoices</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Profile')} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Profile</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Settings')} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Settings</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('NotificationPreferences')} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Notification preferences</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => navigation.navigate('AccountDeletion')} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Delete account</Text>
          </Pressable>
          <Pressable accessibilityRole="button" onPress={() => { void logout(); }} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Log out</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{String(safeStats.daysCheckedIn ?? 0)}</Text>
          <Text style={styles.statLabel}>Days checked in</Text>
          <Text style={styles.statMeta}>This month</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{String(safeStats.meetingRoomBookings ?? 0)}</Text>
          <Text style={styles.statLabel}>Meeting room bookings</Text>
          <Text style={styles.statMeta}>Confirmed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{String(safeStats.currentMembership ?? (safeMembership ? planName : 'No plan'))}</Text>
          <Text style={styles.statLabel}>Current membership</Text>
          <Text style={styles.statMeta}>{safeMembership ? membershipStatus : 'No plan'}</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Membership details</Text>
        {safeMembership ? (
          <>
            <View style={styles.pill}><Text style={styles.pillText}>{membershipStatus}</Text></View>
            <Text style={styles.bodyBold}>{planName}</Text>
            <Text style={styles.body}>Next billing date: {formatDate(getStringValue(safeMembership, 'currentPeriodEnd'))}</Text>
            <Text style={styles.body}>Monthly fee: {formatMoney(getNumberValue(safeMembership, 'monthlyPriceMinor'), getStringValue(safeMembership, 'currency'))}</Text>
            {features.length > 0 && (
              <View style={{ marginTop: spacing.sm }}>
                <Text style={styles.bodyBold}>Benefits:</Text>
                {features.map((feature, idx) => (
                  <Text key={idx} style={styles.body}>• {String(feature)}</Text>
                ))}
              </View>
            )}
          </>
        ) : (
          <>
            <Text style={styles.body}>You do not have an active membership.</Text>
            <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Membership')} style={styles.primaryButtonCompact}>
              <Text style={styles.primaryButtonText}>View plans</Text>
            </Pressable>
          </>
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Upcoming bookings</Text>
        {upcomingBookings.length > 0 ? (
          <>
            {upcomingBookings.map((booking) => {
              const id = getStringValue(booking, 'id');
              const resourceName = getStringValue(booking, 'resourceName', 'Workspace booking');
              const startAt = getStringValue(booking, 'startAt');
              const endAt = getStringValue(booking, 'endAt');
              const location = getStringValue(booking, 'location');
              const status = getStringValue(booking, 'status');
              const refundStatus = getStringValue(booking, 'refundStatus');
              const refundRequestStatus = getStringValue(booking, 'refundRequestStatus');
              const combinedRefundStatus = refundRequestStatus || refundStatus;

              return (
                <View key={id} style={styles.listItem}>
                  <Text style={styles.itemTitle}>{resourceName}</Text>
                  <Text style={styles.itemMeta}>{formatTimeRange(startAt, endAt)}</Text>
                  {location ? <Text style={styles.itemMeta}>{location}</Text> : null}
                  <Text style={styles.itemMeta}>Status: {status}{combinedRefundStatus ? ` · Refund: ${combinedRefundStatus}` : ''}</Text>
                </View>
              );
            })}
            <View style={styles.actionsRow}>
              <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Bookings')} style={styles.secondaryButtonCompact}>
                <Text style={styles.secondaryButtonText}>Manage</Text>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Bookings')} style={styles.secondaryButtonCompact}>
                <Text style={styles.secondaryButtonText}>View all</Text>
              </Pressable>
            </View>
          </>
        ) : <Text style={styles.body}>No upcoming bookings yet.</Text>}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Invoices</Text>
        <Text style={styles.body}>Total invoices: {(dashboard.invoices || []).length}</Text>
        <Text style={styles.body}>Needs attention: {unpaidInvoices.length}</Text>
        <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Invoices')} style={styles.primaryButtonCompact}>
          <Text style={styles.primaryButtonText}>View invoices</Text>
        </Pressable>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <Text style={styles.body}>Name: {userFullName}</Text>
        <Text style={styles.body}>Email: {userEmail}</Text>
        {userPhone ? <Text style={styles.body}>Phone: {userPhone}</Text> : null}
        <Text style={styles.body}>Access Status: {userAccessStatus}</Text>
        <Text style={styles.body}>Membership Status: {membershipStatus}</Text>
        <Pressable accessibilityRole="button" onPress={() => navigation.navigate('Profile')} style={styles.secondaryButtonCompact}>
          <Text style={styles.secondaryButtonText}>Go to Profile</Text>
        </Pressable>
      </View>

      <View style={styles.footerCard}>
        <Text style={styles.footerText}>Services</Text>
        <Text style={styles.footerText}>Company</Text>
        <Text style={styles.footerText}>Legal</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md },
  heroCard: { backgroundColor: colors.secondary, borderRadius: radius.md, gap: spacing.sm, padding: spacing.lg },
  eyebrow: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, letterSpacing: 0.4, textTransform: 'uppercase' },
  titleSmall: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700' },
  subtitleSmall: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  quickActionsCard: { borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  actionButton: { backgroundColor: colors.secondary, borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  actionButtonText: { color: colors.foreground, fontSize: typography.fontSize.sm, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', gap: spacing.sm },
  statCard: { borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, flex: 1, gap: spacing.xs, padding: spacing.sm },
  statValue: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700' },
  statLabel: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, fontWeight: '600' },
  statMeta: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs },
  sectionCard: { borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700' },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm },
  bodyBold: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700' },
  pill: { alignSelf: 'flex-start', backgroundColor: colors.primary, borderRadius: 99, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  pillText: { color: colors.primaryForeground, fontSize: typography.fontSize.xs, fontWeight: '700', textTransform: 'uppercase' },
  listItem: { borderTopColor: colors.border, borderTopWidth: 1, gap: spacing.xs, paddingTop: spacing.sm, marginTop: spacing.sm },
  itemTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700' },
  itemMeta: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs },
  actionsRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  primaryButtonCompact: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, marginTop: spacing.sm, alignSelf: 'flex-start' },
  primaryButtonText: { color: colors.primaryForeground, fontSize: typography.fontSize.sm, fontWeight: '700' },
  secondaryButtonCompact: { alignItems: 'center', backgroundColor: colors.background, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, paddingVertical: spacing.sm, paddingHorizontal: spacing.md, marginTop: spacing.sm, alignSelf: 'flex-start' },
  secondaryButtonText: { color: colors.foreground, fontSize: typography.fontSize.sm, fontWeight: '700' },
  footerCard: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  footerText: { color: colors.mutedForeground, fontSize: typography.fontSize.xs },
});