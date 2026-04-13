import { useQuery } from '@tanstack/react-query';
import type { CmsFaqItem } from '@/types/cms';
import { fetchApi, getMediaUrl, unwrapCollection, unwrapSingle } from '@/lib/content-api';
import { defaultSiteSettingsContent, type SiteSettingsContent } from '@/data/siteContent';
import {
  appendStatusParam,
  getBoolean,
  getString,
  usePreviewStatus,
} from './cms-utils';

function mapFaqPageContent(raw: Record<string, unknown>): SiteSettingsContent['faqPage'] {
  const fallback = defaultSiteSettingsContent.faqPage;

  return {
    heroTitle: getString(raw.heroTitle, fallback.heroTitle),
    heroSubtitle: getString(raw.heroSubtitle, fallback.heroSubtitle),
    heroBackgroundImage: getMediaUrl(raw.heroBackgroundImage) || fallback.heroBackgroundImage,
    eyebrow: getString(raw.eyebrow, fallback.eyebrow),
    title: getString(raw.title, fallback.title),
    description: getString(raw.description, fallback.description),
    searchPlaceholder: getString(raw.searchPlaceholder, fallback.searchPlaceholder),
    noResultsText: getString(raw.noResultsText, fallback.noResultsText),
    ctaTitle: getString(raw.ctaTitle, fallback.ctaTitle),
    ctaDescription: getString(raw.ctaDescription, fallback.ctaDescription),
    ctaButtonLabel: getString(raw.ctaButtonLabel, fallback.ctaButtonLabel),
  };
}

export { mapFaqPageContent };

export function useFaqItems() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'faq-items', previewStatus ?? 'published'],
    queryFn: async (): Promise<CmsFaqItem[]> => {
      const payload = await fetchApi<unknown>(
        appendStatusParam('/faq-items?sort=sortOrder:asc&pagination[pageSize]=200', previewStatus),
      );
      const items = unwrapCollection<Record<string, unknown>>(payload);

      return items
        .map((item) => ({
          id: String(item.id ?? item.documentId ?? ''),
          question: String(item.question ?? ''),
          answer: String(item.answer ?? ''),
          isFeatured: getBoolean(item.isFeatured),
          sortOrder: Number(item.sortOrder ?? 1),
        }))
        .filter((item) => !item.isFeatured)
        .sort((left, right) => left.sortOrder - right.sortOrder);
    },
  });
}

export function useFaqPageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'faq-page', previewStatus ?? 'published'],
    queryFn: async (): Promise<SiteSettingsContent['faqPage'] | null> => {
      const payload = await fetchApi<unknown>(appendStatusParam('/faq-page?populate=*', previewStatus));
      const raw = unwrapSingle<Record<string, unknown>>(payload);
      return raw ? mapFaqPageContent(raw) : null;
    },
  });
}
