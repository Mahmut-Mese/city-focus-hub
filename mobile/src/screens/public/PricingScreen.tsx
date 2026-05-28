import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import { type ContentPage, fetchContentPage, fetchPublicPlans, type PublicPlan } from '../../api/content-api';
import { useAuth } from '../../auth/AuthProvider';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import type { PublicStackParamList } from '../../navigation/PublicStack';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { useMembershipPaymentSheet } from '../../payments/useMembershipPaymentSheet';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

type PlanLike = PublicPlan;
type PublicNavigation = NativeStackNavigationProp<PublicStackParamList>;
type RootNavigation = NativeStackNavigationProp<RootStackParamList>;
type UnknownRecord = Record<string, unknown>;

type ComparisonCell = {
  valueType?: string;
  booleanValue?: boolean;
  textValue?: string;
};

type ComparisonRow = {
  feature: string;
  values: ComparisonCell[];
};

type FaqItem = {
  question: string;
  answer: string;
};

function getString(source: ContentPage | PlanLike | null, key: string, fallback: string): string {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function getPrice(source: PlanLike): number | null {
  const value = source.price;
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function getMonthlyPriceMinor(source: PlanLike): number | null {
  const value = source.monthlyPriceMinor;
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function getCurrency(source: PlanLike): string {
  const value = source.currency;
  return typeof value === 'string' && value.trim().length > 0 ? value.toUpperCase() : 'GBP';
}

function getStringArray(source: PlanLike, key: string): string[] {
  const value = source[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

function getPageStringArray(source: ContentPage | null, key: string): string[] {
  const value = source?.[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

function asRecord(value: unknown): UnknownRecord | null {
  return value !== null && typeof value === 'object' ? (value as UnknownRecord) : null;
}

function getComparisonRows(source: ContentPage | null): ComparisonRow[] {
  const value = source?.comparisonRows;
  if (!Array.isArray(value)) return [];

  return value
    .map((row): ComparisonRow | null => {
      const rowRecord = asRecord(row);
      if (!rowRecord) return null;
      const feature = typeof rowRecord.feature === 'string' && rowRecord.feature.trim()
        ? rowRecord.feature
        : '';
      if (!feature) return null;

      const rowValues = Array.isArray(rowRecord.values)
        ? rowRecord.values
          .map((cell): ComparisonCell | null => {
            const cellRecord = asRecord(cell);
            if (!cellRecord) return null;
            return {
              valueType: typeof cellRecord.valueType === 'string' ? cellRecord.valueType : undefined,
              booleanValue: typeof cellRecord.booleanValue === 'boolean' ? cellRecord.booleanValue : undefined,
              textValue: typeof cellRecord.textValue === 'string' ? cellRecord.textValue : undefined,
            };
          })
          .filter((cell): cell is ComparisonCell => cell !== null)
        : [];

      return { feature, values: rowValues };
    })
    .filter((row): row is ComparisonRow => row !== null);
}

function getFaqItems(source: ContentPage | null): FaqItem[] {
  const value = source?.faqItems;
  if (!Array.isArray(value)) return [];

  return value
    .map((faq): FaqItem | null => {
      const faqRecord = asRecord(faq);
      if (!faqRecord) return null;

      const question = typeof faqRecord.question === 'string' && faqRecord.question.trim()
        ? faqRecord.question
        : '';
      const answer = typeof faqRecord.answer === 'string' && faqRecord.answer.trim()
        ? faqRecord.answer
        : '';

      if (!question || !answer) return null;
      return { question, answer };
    })
    .filter((faq): faq is FaqItem => faq !== null);
}

function formatPrice(source: PlanLike): string {
  const monthlyPriceMinor = getMonthlyPriceMinor(source);
  const currency = getCurrency(source);

  if (monthlyPriceMinor !== null) {
    if (monthlyPriceMinor === 0) return 'Included';
    return new Intl.NumberFormat('en-GB', { style: 'currency', currency }).format(monthlyPriceMinor / 100);
  }

  const legacyPrice = getPrice(source);
  if (legacyPrice === null) return 'Contact us';
  if (legacyPrice === 0) return 'Included';
  return `£${legacyPrice}`;
}

function getPlanSlug(source: PlanLike): string | null {
  const slug = source.slug;
  if (typeof slug === 'string' && slug.trim()) return slug.trim();

  const planSlug = source.planSlug;
  if (typeof planSlug === 'string' && planSlug.trim()) return planSlug.trim();

  const id = source.id;
  if (typeof id === 'string' && id.trim()) return id.trim();

  return null;
}

export function PricingScreen(): JSX.Element {
  const navigation = useNavigation<PublicNavigation>();
  const { isAuthenticated } = useAuth();
  const { presentMembershipPaymentSheet, isPresenting } = useMembershipPaymentSheet();
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [page, setPage] = useState<ContentPage | null>(null);
  const [plans, setPlans] = useState<PlanLike[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [selectedPlanSlug, setSelectedPlanSlug] = useState<string | null>(null);
  const isLaunchingPaymentRef = useRef(false);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [pageContent, publicPlans] = await Promise.all([
        fetchContentPage(apiClient, 'pricing-page'),
        fetchPublicPlans(apiClient),
      ]);
      setPage(pageContent);
      setPlans(publicPlans);
    } catch {
      setError('We could not load membership content.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  const handlePurchasePress = useCallback(async (plan: PlanLike) => {
    if (isLaunchingPaymentRef.current || isPresenting) return;

    const rootNavigation = navigation.getParent<RootNavigation>();
    if (!isAuthenticated) {
      rootNavigation?.navigate('Auth', { screen: 'Login' });
      return;
    }

    const planSlug = getPlanSlug(plan);
    if (!planSlug) {
      setStatusMessage('This membership plan is unavailable right now. Please choose a different plan or contact the team.');
      return;
    }

    isLaunchingPaymentRef.current = true;
    setSelectedPlanSlug(planSlug);
    setStatusMessage(null);
    setError(null);

    try {
      const result = await presentMembershipPaymentSheet(planSlug);
      if (result.activationPending) {
        setStatusMessage('Payment method saved. Membership activation is pending while Stripe confirms your subscription.');
      }
    } catch {
      setStatusMessage('Membership payment was not completed. Please try again.');
    } finally {
      setSelectedPlanSlug(null);
      isLaunchingPaymentRef.current = false;
    }
  }, [isAuthenticated, isPresenting, navigation, presentMembershipPaymentSheet]);

  if (isLoading) return <LoadingState message="Loading membership content…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(page, 'heroTitle', 'Flexible membership plans');
  const heroSubtitle = getString(page, 'heroSubtitle', 'Choose coworking, office, and meeting room options that fit the way you work.');
  const comparisonTitle = getString(page, 'comparisonTitle', 'Membership plans and services');
  const purchaseButtonLabel = getString(page, 'purchaseButtonLabel', 'Choose plan');
  const recommendedLabel = getString(page, 'recommendedLabel', 'Recommended');
  const featureListTitle = getString(page, 'featureListTitle', 'Included features');
  const featureListSubtitle = getString(page, 'featureListSubtitle', 'What you can expect with this plan.');
  const comparisonColumns = getPageStringArray(page, 'comparisonColumns');
  const comparisonRows = getComparisonRows(page);
  const faqTitle = getString(page, 'faqTitle', 'Frequently asked questions');
  const faqSubtitle = getString(page, 'faqSubtitle', 'Helpful details before you choose your membership.');
  const faqItems = getFaqItems(page);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Membership</Text>
        <Text style={styles.title}>{heroTitle}</Text>
        <Text style={styles.subtitle}>{heroSubtitle}</Text>
      </View>
      {statusMessage ? <Text style={styles.statusMessage}>{statusMessage}</Text> : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{comparisonTitle}</Text>
        {plans.length > 0 ? plans.map((plan, index) => {
          const name = getString(plan, 'name', `Workspace plan ${index + 1}`);
          const price = formatPrice(plan);
          const period = getString(plan, 'period', 'month');
          const description = getString(plan, 'description', 'Contact the team for current availability and details.');
          const features = getStringArray(plan, 'features');
          const isPopular = plan.isPopular || plan.recommended || plan.popular;
          const planSlug = getPlanSlug(plan);
          const isSelected = planSlug !== null && selectedPlanSlug === planSlug;
          const isDisabled = isPresenting || isSelected || isLaunchingPaymentRef.current;

          return (
            <View key={`${name}-${index}`} style={styles.planCard}>
              <View style={styles.planHeader}>
                <View style={{ flex: 1, alignItems: 'flex-start', gap: spacing.xs }}>
                  <Text style={styles.planName}>{name}</Text>
                  {isPopular ? (
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{recommendedLabel}</Text>
                    </View>
                  ) : null}
                </View>
                <Text style={styles.price}>{price}</Text>
              </View>
              <Text style={styles.period}>{price === 'Contact us' ? 'Tailored pricing' : `per ${period}`}</Text>
              <Text style={styles.body}>{description}</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ disabled: isDisabled || !planSlug }}
                disabled={isDisabled || !planSlug}
                onPress={() => { void handlePurchasePress(plan); }}
                style={[styles.primaryButton, (isDisabled || !planSlug) ? styles.disabledButton : null]}
              >
                <Text style={styles.primaryButtonText}>{isSelected ? 'Preparing…' : purchaseButtonLabel}</Text>
              </Pressable>
              {!planSlug ? <Text style={styles.inlineHint}>Plan checkout is unavailable for this option.</Text> : null}
              {featureListTitle ? <Text style={styles.featureListTitle}>{featureListTitle}</Text> : null}
              {featureListSubtitle ? <Text style={styles.featureListSubtitle}>{featureListSubtitle}</Text> : null}
              {features.slice(0, 4).map((feature) => (
                <View key={feature} style={styles.bulletRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          );
        }) : (
          <View style={styles.planCard}>
            <Text style={styles.planName}>Membership options</Text>
            <Text style={styles.body}>Membership content is being prepared. Contact the team for current plans and meeting room rates.</Text>
          </View>
        )}
      </View>

      {comparisonTitle && comparisonRows.length > 0 && comparisonColumns.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{comparisonTitle}</Text>
          {comparisonRows.map((row) => (
            <View key={row.feature} style={styles.comparisonCard}>
              <Text style={styles.comparisonFeature}>{row.feature}</Text>
              {comparisonColumns.map((column, index) => {
                const cell = row.values[index];
                let valueText = '—';
                if (cell?.valueType === 'boolean') {
                  valueText = cell.booleanValue ? 'Included' : 'Not included';
                } else if (typeof cell?.textValue === 'string' && cell.textValue.trim()) {
                  valueText = cell.textValue;
                }

                return (
                  <View key={`${row.feature}-${column}-${index}`} style={styles.comparisonRow}>
                    <Text style={styles.comparisonColumn}>{column}</Text>
                    <Text style={styles.comparisonValue}>{valueText}</Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      ) : null}

      {faqTitle && faqItems.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{faqTitle}</Text>
          {faqSubtitle ? <Text style={styles.subtitle}>{faqSubtitle}</Text> : null}
          {faqItems.map((faq) => (
            <View key={faq.question} style={styles.faqCard}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </View>
      ) : null}
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
  section: { gap: spacing.md },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  planCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  planHeader: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  planName: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  badgeContainer: { backgroundColor: colors.primary, borderRadius: radius.full, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  badgeText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, fontWeight: '700', textTransform: 'uppercase' },
  price: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  period: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  bulletRow: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.sm },
  bullet: { backgroundColor: colors.primary, borderRadius: radius.full, height: 8, marginTop: 8, width: 8 },
  featureText: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  featureListTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, fontWeight: '700', letterSpacing: 0.4, lineHeight: typography.lineHeight.tight, marginTop: spacing.sm, textTransform: 'uppercase' },
  featureListSubtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, lineHeight: typography.lineHeight.tight },
  primaryButton: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, marginVertical: spacing.sm, minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.lg },
  disabledButton: { opacity: 0.6 },
  primaryButtonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700', lineHeight: typography.lineHeight.tight },
  statusMessage: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  inlineHint: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  comparisonCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  comparisonFeature: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  comparisonRow: { alignItems: 'center', borderTopColor: colors.border, borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: spacing.sm },
  comparisonColumn: { color: colors.mutedForeground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  comparisonValue: { color: colors.foreground, flexShrink: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '600', lineHeight: typography.lineHeight.tight, textAlign: 'right' },
  faqCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  faqQuestion: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  faqAnswer: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
});
