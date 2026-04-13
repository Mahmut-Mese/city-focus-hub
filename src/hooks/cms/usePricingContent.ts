import { useQuery } from '@tanstack/react-query';
import type { CmsPricingPlan, PlanType } from '@/types/cms';
import { fetchApi, getMediaUrl, unwrapCollection, unwrapSingle } from '@/lib/content-api';
import { defaultSiteSettingsContent, type SiteSettingsContent } from '@/data/siteContent';
import {
  appendStatusParam,
  getString,
  isRecord,
  toStringArray,
  usePreviewStatus,
} from './cms-utils';
import { listPublicPlans, type MembershipPlan } from '@/lib/member-api';

function toComparisonRows(
  value: unknown,
  fallback: SiteSettingsContent['pricingPage']['comparisonRows'],
): SiteSettingsContent['pricingPage']['comparisonRows'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      feature: getString(source.feature, fallback[index]?.feature ?? ''),
      values: Array.isArray(source.values) && source.values.length > 0
        ? source.values.map((entry, entryIndex) => {
            if (typeof entry === 'string') {
              const normalized = entry.toLowerCase();
              if (normalized === 'true' || normalized === 'false') {
                return {
                  valueType: 'boolean' as const,
                  booleanValue: normalized === 'true',
                };
              }

              return {
                valueType: 'text' as const,
                textValue: entry,
              };
            }

            const fallbackValue = fallback[index]?.values?.[entryIndex];
            const sourceEntry = isRecord(entry) ? entry : {};
            const valueType = getString(sourceEntry.valueType, fallbackValue?.valueType ?? 'text');

            return valueType === 'boolean'
              ? {
                  valueType: 'boolean' as const,
                  booleanValue: typeof sourceEntry.booleanValue === 'boolean'
                    ? sourceEntry.booleanValue
                    : (fallbackValue?.booleanValue ?? false),
                }
              : {
                  valueType: 'text' as const,
                  textValue: getString(sourceEntry.textValue, fallbackValue?.textValue ?? ''),
                };
          })
        : (fallback[index]?.values ?? []),
    };
  });
}

function toFaqEntries(
  value: unknown,
  fallback: SiteSettingsContent['pricingPage']['faqItems'],
): SiteSettingsContent['pricingPage']['faqItems'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      question: getString(source.question, fallback[index]?.question ?? ''),
      answer: getString(source.answer, fallback[index]?.answer ?? ''),
    };
  });
}

function mapPricingPageContent(raw: Record<string, unknown>): SiteSettingsContent['pricingPage'] {
  const fallback = defaultSiteSettingsContent.pricingPage;

  return {
    heroTitle: getString(raw.heroTitle, fallback.heroTitle),
    heroSubtitle: getString(raw.heroSubtitle, fallback.heroSubtitle),
    heroBackgroundImage: getMediaUrl(raw.heroBackgroundImage) || fallback.heroBackgroundImage,
    comparisonTitle: getString(raw.comparisonTitle, fallback.comparisonTitle),
    comparisonColumns: toStringArray(raw.comparisonColumns).length > 0
      ? toStringArray(raw.comparisonColumns)
      : fallback.comparisonColumns,
    comparisonRows: toComparisonRows(raw.comparisonRows, fallback.comparisonRows),
    faqTitle: getString(raw.faqTitle, fallback.faqTitle),
    faqSubtitle: getString(raw.faqSubtitle, fallback.faqSubtitle),
    faqItems: toFaqEntries(raw.faqItems, fallback.faqItems),
    purchaseButtonLabel: getString(raw.purchaseButtonLabel, fallback.purchaseButtonLabel),
    recommendedLabel: getString(raw.recommendedLabel, fallback.recommendedLabel),
    featureListTitle: getString(raw.featureListTitle, fallback.featureListTitle),
    featureListSubtitle: getString(raw.featureListSubtitle, fallback.featureListSubtitle),
  };
}

export { mapPricingPageContent };

export function usePricingPlans(planType?: PlanType) {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'pricing-plans', planType ?? 'all', previewStatus ?? 'published'],
    queryFn: async (): Promise<CmsPricingPlan[]> => {
      const typeFilter = planType ? `&filters[planType][$eq]=${encodeURIComponent(planType)}` : '';
      const payload = await fetchApi<unknown>(
        appendStatusParam(`/pricing-plans?sort=sortOrder:asc&pagination[pageSize]=100${typeFilter}&populate=*`, previewStatus),
      );
      const plans = unwrapCollection<Record<string, unknown>>(payload);

      return plans.map((plan) => ({
        id: String(plan.id ?? plan.documentId ?? ''),
        name: String(plan.name ?? ''),
        slug: String(plan.slug ?? ''),
        planType: (plan.planType === 'meeting-room' ? 'meeting-room' : 'coworking') as PlanType,
        price: Number(plan.price ?? 0),
        period: String(plan.period ?? 'month'),
        description: typeof plan.description === 'string' ? plan.description : undefined,
        features: toStringArray(plan.features),
        isPopular: Boolean(plan.isPopular),
        sortOrder: Number(plan.sortOrder ?? 1),
      }))
        .sort((left, right) => {
          const diff = left.sortOrder - right.sortOrder;
          if (diff !== 0) {
            return diff;
          }

          return left.name.localeCompare(right.name);
        });
    },
  });
}

/**
 * useDbPlans — fetches membership plans directly from the DB via /api/public/plans.
 * This is the authoritative source for plan data on pricing, checkout, and dashboard pages.
 * Returns plans in sort_order ASC.
 */
export function useDbPlans() {
  return useQuery({
    queryKey: ['db', 'plans'],
    queryFn: (): Promise<MembershipPlan[]> => listPublicPlans(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePricingPageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'pricing-page', previewStatus ?? 'published'],
    queryFn: async (): Promise<SiteSettingsContent['pricingPage'] | null> => {
      const payload = await fetchApi<unknown>(
        appendStatusParam(
          '/pricing-page?populate[heroBackgroundImage][fields][0]=url&populate[comparisonColumns]=*&populate[comparisonRows][populate][values]=*&populate[faqItems]=*',
          previewStatus,
        ),
      );
      const raw = unwrapSingle<Record<string, unknown>>(payload);
      return raw ? mapPricingPageContent(raw) : null;
    },
  });
}
