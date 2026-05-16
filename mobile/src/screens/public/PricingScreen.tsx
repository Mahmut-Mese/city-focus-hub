import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { type ContentCollectionItem, type ContentPage, fetchContentPage, fetchPricingPlans, fetchPublicPlans, type PublicPlan } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

type PlanLike = ContentCollectionItem | PublicPlan;

function getString(source: ContentPage | PlanLike | null, key: string, fallback: string): string {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function getPrice(source: PlanLike): number | null {
  const value = source.price;
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function getStringArray(source: PlanLike, key: string): string[] {
  const value = source[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

function formatPrice(value: number | null): string {
  if (value === null) return 'Contact us';
  if (value === 0) return 'Included';
  return `£${value}`;
}

export function PricingScreen(): JSX.Element {
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [page, setPage] = useState<ContentPage | null>(null);
  const [plans, setPlans] = useState<PlanLike[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [pageContent, cmsPlans, publicPlans] = await Promise.all([
        fetchContentPage(apiClient, 'pricing-page'),
        fetchPricingPlans(apiClient),
        fetchPublicPlans(apiClient),
      ]);
      setPage(pageContent);
      setPlans(cmsPlans.length > 0 ? cmsPlans : publicPlans);
    } catch {
      setError('We could not load pricing content.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  if (isLoading) return <LoadingState message="Loading pricing content…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(page, 'heroTitle', 'Flexible workspace pricing');
  const heroSubtitle = getString(page, 'heroSubtitle', 'Choose coworking, office, and meeting room options that fit the way you work.');
  const comparisonTitle = getString(page, 'comparisonTitle', 'Plans and services');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Pricing</Text>
        <Text style={styles.title}>{heroTitle}</Text>
        <Text style={styles.subtitle}>{heroSubtitle}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{comparisonTitle}</Text>
        {plans.length > 0 ? plans.map((plan, index) => {
          const name = getString(plan, 'name', `Workspace plan ${index + 1}`);
          const price = formatPrice(getPrice(plan));
          const period = getString(plan, 'period', 'month');
          const description = getString(plan, 'description', 'Contact the team for current availability and details.');
          const features = getStringArray(plan, 'features');

          return (
            <View key={`${name}-${index}`} style={styles.planCard}>
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{name}</Text>
                <Text style={styles.price}>{price}</Text>
              </View>
              <Text style={styles.period}>{price === 'Contact us' ? 'Tailored pricing' : `per ${period}`}</Text>
              <Text style={styles.body}>{description}</Text>
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
            <Text style={styles.planName}>Workspace options</Text>
            <Text style={styles.body}>Pricing content is being prepared. Contact the team for current plans and meeting room rates.</Text>
          </View>
        )}
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
  section: { gap: spacing.md },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  planCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  planHeader: { alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-between', gap: spacing.md },
  planName: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  price: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  period: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  bulletRow: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.sm },
  bullet: { backgroundColor: colors.primary, borderRadius: radius.full, height: 8, marginTop: 8, width: 8 },
  featureText: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
});