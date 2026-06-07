import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { createApiClient } from '../../api/client';
import {
  cancelMemberMembership,
  cancelMemberScheduledDowngrade,
  fetchMemberDashboard,
  previewMemberPlanChange,
  type MemberDashboardPayload,
  type MembershipPlan,
} from '../../api/member-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { useMembershipPaymentSheet } from '../../payments/useMembershipPaymentSheet';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

function formatMoney(minor?: number, currency = 'GBP'): string {
  if (typeof minor !== 'number') return 'Price unavailable';
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(minor / 100);
}

function formatDate(value?: string | null): string {
  if (!value) return 'Not set';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString();
}

function getPlanFeatures(plan?: MembershipPlan): string[] {
  const rawFeatures = plan?.features;
  return Array.isArray(rawFeatures) ? rawFeatures.filter((feature): feature is string => typeof feature === 'string' && feature.length > 0) : [];
}

export function MembershipScreen(): JSX.Element {
  const { refreshSession } = useAuth();
  const { presentMembershipPaymentSheet, presentMembershipPlanChangeSheet, isPresenting } = useMembershipPaymentSheet();
  const [dashboard, setDashboard] = useState<MemberDashboardPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [selectedPlanSlug, setSelectedPlanSlug] = useState<string | null>(null);
  const [isMutatingMembership, setIsMutatingMembership] = useState(false);

  const apiClient = useMemo(() => createApiClient({
    baseUrl: getApiBaseUrl(),
    getAccessToken: async () => (await getStoredSession()).accessToken,
    refreshAccessToken: async () => {
      await refreshSession();
      return (await getStoredSession()).accessToken;
    },
  }), [refreshSession]);

  const loadMembership = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setDashboard(await fetchMemberDashboard(apiClient));
    } catch {
      setError('We could not load your membership.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadMembership();
  }, [loadMembership]);

  const handleJoinPlan = useCallback(async (planSlug: string) => {
    setSelectedPlanSlug(planSlug);
    setPaymentMessage(null);
    setError(null);

    try {
      const result = await presentMembershipPaymentSheet(planSlug);
      if (result.activationPending) {
        setPaymentMessage('Payment method saved. Your membership is pending activation while Stripe confirms the subscription.');
      }
      await loadMembership();
    } catch {
      setError('Membership payment was not completed. Please try again.');
    } finally {
      setSelectedPlanSlug(null);
    }
  }, [loadMembership, presentMembershipPaymentSheet]);

  const handleChangePlan = useCallback(async (plan: MembershipPlan) => {
    if (isPresenting || isMutatingMembership || selectedPlanSlug) return;

    setSelectedPlanSlug(plan.slug);
    setPaymentMessage(null);
    setError(null);

    try {
      const preview = await previewMemberPlanChange(apiClient, plan.slug);
      const dueToday = formatMoney(preview.settlement.paymentDueMinor, preview.settlement.currency);
      const recurring = formatMoney(preview.nextPlan.monthlyPriceMinor, preview.nextPlan.currency);
      const actionLabel = preview.settlement.action === 'schedule_downgrade' ? 'schedule this change' : 'change now';

      Alert.alert(
        `Change to ${preview.nextPlan.name}?`,
        `Today: ${dueToday}\nNew recurring amount: ${recurring} / month\n\nDo you want to ${actionLabel}?`,
        [
          { text: 'Not now', style: 'cancel', onPress: () => setSelectedPlanSlug(null) },
          {
            text: 'Confirm',
            onPress: () => {
              void (async () => {
                setIsMutatingMembership(true);
                try {
                  const result = await presentMembershipPlanChangeSheet(plan.slug);
                  if (result.status === 'scheduled') {
                    setPaymentMessage(result.message || 'Your plan change has been scheduled.');
                  } else if (result.status === 'activation_pending') {
                    setPaymentMessage(result.message || 'Your plan change is pending while Stripe confirms payment.');
                  } else {
                    setPaymentMessage('Your membership plan has been changed.');
                  }
                  await loadMembership();
                } catch {
                  setError('We could not complete your plan change. Please try again.');
                } finally {
                  setIsMutatingMembership(false);
                  setSelectedPlanSlug(null);
                }
              })();
            },
          },
        ],
      );
    } catch {
      setError('We could not prepare your plan change. Please try again.');
      setSelectedPlanSlug(null);
    }
  }, [apiClient, isMutatingMembership, isPresenting, loadMembership, presentMembershipPlanChangeSheet, selectedPlanSlug]);

  const handleCancelSubscription = useCallback(() => {
    if (isPresenting || isMutatingMembership) return;

    Alert.alert(
      'Cancel subscription?',
      'Your membership will stay active until the end of the current billing period.',
      [
        { text: 'Keep subscription', style: 'cancel' },
        {
          text: 'Cancel subscription',
          style: 'destructive',
          onPress: () => {
            void (async () => {
              setIsMutatingMembership(true);
              setError(null);
              setPaymentMessage(null);
              try {
                await cancelMemberMembership(apiClient);
                await loadMembership();
                setPaymentMessage('Your membership is set to cancel at period end.');
              } catch {
                setError('We could not cancel your subscription. Please try again.');
              } finally {
                setIsMutatingMembership(false);
              }
            })();
          },
        },
      ],
    );
  }, [apiClient, isMutatingMembership, isPresenting, loadMembership]);

  const handleCancelScheduledPlanChange = useCallback(async () => {
    if (isPresenting || isMutatingMembership) return;

    setIsMutatingMembership(true);
    setError(null);
    setPaymentMessage(null);
    try {
      await cancelMemberScheduledDowngrade(apiClient);
      await loadMembership();
      setPaymentMessage('Your scheduled plan change has been cancelled.');
    } catch {
      setError('We could not cancel the scheduled plan change. Please try again.');
    } finally {
      setIsMutatingMembership(false);
    }
  }, [apiClient, isMutatingMembership, isPresenting, loadMembership]);

  if (isLoading) return <LoadingState message="Loading membership…" />;
  if (error) return <ErrorState message={error} onRetry={loadMembership} />;
  if (!dashboard) return <EmptyState title="No membership data" message="Your membership details will appear here once available." />;

  const membership = dashboard.membership;
  const status = typeof membership?.status === 'string' && membership.status ? membership.status : '';
  const isActivationPending = ['pending', 'incomplete', 'past_due'].includes(status);

  if (!membership) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Membership</Text>
          <Text style={styles.title}>Choose your plan</Text>
          <Text style={styles.subtitle}>Payments are confirmed by Stripe webhooks before membership access is activated.</Text>
        </View>
        {paymentMessage ? <Text style={styles.pendingText}>{paymentMessage}</Text> : null}
        {dashboard.plans.length > 0 ? dashboard.plans.map((plan) => {
          const isSelected = selectedPlanSlug === plan.slug;
          const monthlyPriceMinor = typeof plan.monthlyPriceMinor === 'number' ? plan.monthlyPriceMinor : undefined;
          const currency = typeof plan.currency === 'string' ? plan.currency : 'GBP';
          const features = getPlanFeatures(plan);
          return (
            <View key={plan.slug} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{plan.name}</Text>
              <Text style={styles.body}>{formatMoney(monthlyPriceMinor, currency)} per month</Text>
              {features.map((feature) => (
                <View key={feature} style={styles.bulletRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.body}>{feature}</Text>
                </View>
              ))}
              <Pressable
                accessibilityRole="button"
                disabled={isPresenting || isSelected}
                onPress={() => { void handleJoinPlan(plan.slug); }}
                style={({ pressed }) => [styles.primaryButton, (pressed || isSelected) && styles.primaryButtonPressed, (isPresenting || isSelected) && styles.disabledButton]}
              >
                <Text style={styles.primaryButtonText}>{isSelected ? 'Preparing…' : 'Join with PaymentSheet'}</Text>
              </Pressable>
            </View>
          );
        }) : <EmptyState title="No plans available" message="Membership plans are not available yet." />}
      </ScrollView>
    );
  }

  const planName = typeof membership.planName === 'string' && membership.planName ? membership.planName : 'Current plan';
  const currency = typeof membership.currency === 'string' ? membership.currency : 'GBP';
  const monthlyPriceMinor = typeof membership.monthlyPriceMinor === 'number' ? membership.monthlyPriceMinor : undefined;
  const currentPeriodEnd = typeof membership.currentPeriodEnd === 'string' ? membership.currentPeriodEnd : null;
  const cancelAtPeriodEnd = membership.cancelAtPeriodEnd === true;
  const scheduledPlanSlug = typeof membership.scheduledPlanSlug === 'string' ? membership.scheduledPlanSlug : null;
  const currentPlan = dashboard.plans.find((plan) => plan.slug === membership.planSlug);
  const features = getPlanFeatures(currentPlan);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Membership</Text>
        <Text style={styles.title}>{planName}</Text>
        <Text style={styles.subtitle}>Status: {status.replace(/_/g, ' ')}</Text>
      </View>
      {isActivationPending ? (
        <View style={styles.pendingCard}>
          <Text style={styles.sectionTitle}>Activation pending</Text>
          <Text style={styles.body}>Stripe is confirming your subscription. Your membership access will update automatically after the backend receives the webhook.</Text>
        </View>
      ) : null}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Current plan</Text>
        <Text style={styles.body}>{formatMoney(monthlyPriceMinor, currency)} per month</Text>
        <Text style={styles.body}>Current period ends: {formatDate(currentPeriodEnd)}</Text>
        {cancelAtPeriodEnd ? <Text style={styles.warning}>Cancellation scheduled at period end.</Text> : null}
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Plan features</Text>
        {features.length > 0 ? features.map((feature) => (
          <View key={feature} style={styles.bulletRow}>
            <View style={styles.bullet} />
            <Text style={styles.body}>{feature}</Text>
          </View>
        )) : <Text style={styles.body}>Plan feature details are not available yet.</Text>}
      </View>
      {paymentMessage ? <Text style={styles.pendingText}>{paymentMessage}</Text> : null}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Change plan</Text>
        {dashboard.plans.map((plan) => {
          const isSelected = selectedPlanSlug === plan.slug;
          const isCurrentPlan = membership.planSlug === plan.slug;
          const isScheduledPlan = scheduledPlanSlug === plan.slug;
          const isDisabled = isPresenting || isMutatingMembership || isSelected || isCurrentPlan || isScheduledPlan;

          return (
            <View key={plan.slug} style={styles.planRow}>
              <View style={styles.planMeta}>
                <Text style={styles.planTitle}>{plan.name}</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                disabled={isDisabled}
                onPress={() => { void handleChangePlan(plan); }}
                style={({ pressed }) => [styles.primaryButton, styles.planButton, (pressed || isSelected) && styles.primaryButtonPressed, isDisabled && styles.disabledButton]}
              >
                <Text style={styles.primaryButtonText}>{isCurrentPlan ? 'Current plan' : isScheduledPlan ? 'Switching soon' : isSelected ? 'Preparing…' : 'Change plan'}</Text>
              </Pressable>
            </View>
          );
        })}
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Subscription actions</Text>
        {!cancelAtPeriodEnd ? (
          <Pressable
            accessibilityRole="button"
            disabled={isPresenting || isMutatingMembership}
            onPress={handleCancelSubscription}
            style={({ pressed }) => [styles.secondaryButton, (pressed || isMutatingMembership) && styles.primaryButtonPressed, (isPresenting || isMutatingMembership) && styles.disabledButton]}
          >
            <Text style={styles.secondaryButtonText}>Cancel subscription</Text>
          </Pressable>
        ) : null}
        {scheduledPlanSlug ? (
          <Pressable
            accessibilityRole="button"
            disabled={isPresenting || isMutatingMembership}
            onPress={() => { void handleCancelScheduledPlanChange(); }}
            style={({ pressed }) => [styles.secondaryButton, (pressed || isMutatingMembership) && styles.primaryButtonPressed, (isPresenting || isMutatingMembership) && styles.disabledButton]}
          >
            <Text style={styles.secondaryButtonText}>Cancel scheduled plan change</Text>
          </Pressable>
        ) : null}
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
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal, textTransform: 'capitalize' },
  sectionCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  pendingCard: { backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  body: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  pendingText: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  warning: { color: colors.destructive, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  bulletRow: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.sm },
  bullet: { backgroundColor: colors.primary, borderRadius: radius.full, height: 8, marginTop: 8, width: 8 },
  primaryButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, marginTop: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  primaryButtonPressed: { opacity: 0.85 },
  disabledButton: { opacity: 0.6 },
  primaryButtonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  secondaryButton: { alignItems: 'center', backgroundColor: colors.secondary, borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, marginTop: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md },
  secondaryButtonText: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  planRow: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  planMeta: { flex: 1, paddingRight: spacing.md },
  planTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  planButton: { marginTop: 0 },
});
