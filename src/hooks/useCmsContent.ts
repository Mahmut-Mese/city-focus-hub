import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import type { CmsBlogPost, CmsFaqItem, CmsMeetingRoom, CmsPricingPlan, PlanType } from '@/types/cms';
import { fetchApi, getMediaUrl, getMediaUrls, unwrapCollection, unwrapSingle } from '@/lib/content-api';
import {
  defaultPrivacyPolicyContent,
  defaultSiteSettingsContent,
  defaultTermsContent,
  type LegalPageContent,
  type SiteSettingsContent,
} from '@/data/siteContent';

type PreviewStatus = 'draft' | 'published';

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        }

        if (isRecord(item)) {
          const textValue = item.text;
          if (typeof textValue === 'string') {
            return textValue;
          }
        }

        return null;
      })
      .filter((item): item is string => typeof item === 'string');
  }

  return [];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function cloneData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function mergeContent<T>(base: T, override: unknown): T {
  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  if (isRecord(base)) {
    const source = isRecord(override) ? override : {};
    const result: Record<string, unknown> = {};

    Object.keys(base).forEach((key) => {
      result[key] = mergeContent((base as Record<string, unknown>)[key], source[key]);
    });

    Object.keys(source).forEach((key) => {
      if (!(key in result)) {
        result[key] = source[key];
      }
    });

    return result as T;
  }

  return (override === undefined || override === null ? base : override) as T;
}

function getString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.length > 0 ? value : fallback;
}

function normalizeExternalUrl(value: string): string {
  const trimmed = value.trim();

  if (!trimmed || trimmed === '#') {
    return trimmed || '#';
  }

  if (/^(https?:|mailto:|tel:|#)/i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function appendStatusParam(path: string, status?: PreviewStatus): string {
  if (!status) {
    return path;
  }

  return `${path}${path.includes('?') ? '&' : '?'}status=${status}`;
}

function getBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();

    if (normalized === 'true') {
      return true;
    }

    if (normalized === 'false') {
      return false;
    }
  }

  if (typeof value === 'number') {
    return value !== 0;
  }

  return fallback;
}

function usePreviewStatus(): PreviewStatus | undefined {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isPreview = searchParams.get('preview') === '1';
  const status = searchParams.get('status');

  if (!isPreview) {
    return undefined;
  }

  return status === 'draft' || status === 'published' ? status : undefined;
}

function toIconTextItems(
  value: unknown,
  fallback: SiteSettingsContent['homePage']['featureChips'],
): SiteSettingsContent['homePage']['featureChips'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      icon: getString(source.icon, fallback[index]?.icon ?? 'Clock'),
      text: getString(source.text, fallback[index]?.text ?? ''),
    };
  });
}

function toFeatureItems(
  value: unknown,
  fallback: SiteSettingsContent['homePage']['whyChooseItems'],
): SiteSettingsContent['homePage']['whyChooseItems'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      icon: getString(source.icon, fallback[index]?.icon ?? 'LayoutGrid'),
      title: getString(source.title, fallback[index]?.title ?? ''),
      description: getString(source.description, fallback[index]?.description ?? ''),
    };
  });
}

function toServiceItems(
  value: unknown,
  fallback: SiteSettingsContent['homePage']['services'],
): SiteSettingsContent['homePage']['services'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      title: getString(source.title, fallback[index]?.title ?? ''),
      description: getString(source.description, fallback[index]?.description ?? ''),
      image: getMediaUrl(source.image) || fallback[index]?.image || '',
      link: getString(source.link, fallback[index]?.link ?? '/'),
    };
  });
}

function toTestimonialItems(
  value: unknown,
  fallback: SiteSettingsContent['homePage']['testimonials'],
): SiteSettingsContent['homePage']['testimonials'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      name: getString(source.name, fallback[index]?.name ?? ''),
      role: getString(source.role, fallback[index]?.role ?? ''),
      content: getString(source.content, fallback[index]?.content ?? ''),
    };
  });
}

function toGalleryItems(
  value: unknown,
  fallback: SiteSettingsContent['homePage']['galleryImages'],
): SiteSettingsContent['homePage']['galleryImages'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      image: getMediaUrl(source.image) || fallback[index]?.image || '',
      alt: getString(source.alt, fallback[index]?.alt ?? ''),
    };
  });
}

function mapHomepageContent(raw: Record<string, unknown>): SiteSettingsContent['homePage'] {
  const fallback = defaultSiteSettingsContent.homePage;
  const hero = isRecord(raw.hero) ? raw.hero : {};
  const aboutHighlight = isRecord(raw.aboutHighlight) ? raw.aboutHighlight : {};
  const contactForm = isRecord(raw.contactForm) ? raw.contactForm : {};

  return {
    hero: {
      title: getString(hero.title, fallback.hero.title),
      subtitle: getString(hero.subtitle, fallback.hero.subtitle),
      backgroundImage: getMediaUrl(hero.backgroundImage) || fallback.hero.backgroundImage,
      primaryCtaLabel: getString(hero.primaryCtaLabel, fallback.hero.primaryCtaLabel),
      primaryCtaPath: getString(hero.primaryCtaPath, fallback.hero.primaryCtaPath),
      secondaryCtaLabel: getString(hero.secondaryCtaLabel, fallback.hero.secondaryCtaLabel),
    },
    featureChips: toIconTextItems(raw.featureChips, fallback.featureChips),
    servicesEyebrow: getString(raw.servicesEyebrow, fallback.servicesEyebrow),
    servicesKicker: getString(raw.servicesKicker, fallback.servicesKicker),
    services: toServiceItems(raw.services, fallback.services),
    aboutHighlight: {
      eyebrow: getString(aboutHighlight.eyebrow, fallback.aboutHighlight.eyebrow),
      title: getString(aboutHighlight.title, fallback.aboutHighlight.title),
      description: getString(aboutHighlight.description, fallback.aboutHighlight.description),
      benefits: toStringArray(aboutHighlight.benefits).length > 0
        ? toStringArray(aboutHighlight.benefits)
        : fallback.aboutHighlight.benefits,
      image: getMediaUrl(aboutHighlight.image) || fallback.aboutHighlight.image,
      primaryCtaLabel: getString(aboutHighlight.primaryCtaLabel, fallback.aboutHighlight.primaryCtaLabel),
      primaryCtaPath: getString(aboutHighlight.primaryCtaPath, fallback.aboutHighlight.primaryCtaPath),
      secondaryCtaLabel: getString(aboutHighlight.secondaryCtaLabel, fallback.aboutHighlight.secondaryCtaLabel),
      secondaryCtaPath: getString(aboutHighlight.secondaryCtaPath, fallback.aboutHighlight.secondaryCtaPath),
    },
    whyChooseEyebrow: getString(raw.whyChooseEyebrow, fallback.whyChooseEyebrow),
    whyChooseKicker: getString(raw.whyChooseKicker, fallback.whyChooseKicker),
    whyChooseTitle: getString(raw.whyChooseTitle, fallback.whyChooseTitle),
    whyChooseItems: toFeatureItems(raw.whyChooseItems, fallback.whyChooseItems),
    testimonialsEyebrow: getString(raw.testimonialsEyebrow, fallback.testimonialsEyebrow),
    testimonialsKicker: getString(raw.testimonialsKicker, fallback.testimonialsKicker),
    testimonialsTitle: getString(raw.testimonialsTitle, fallback.testimonialsTitle),
    testimonials: toTestimonialItems(raw.testimonials, fallback.testimonials),
    galleryEyebrow: getString(raw.galleryEyebrow, fallback.galleryEyebrow),
    galleryKicker: getString(raw.galleryKicker, fallback.galleryKicker),
    galleryTitle: getString(raw.galleryTitle, fallback.galleryTitle),
    galleryImages: toGalleryItems(raw.galleryImages, fallback.galleryImages),
    contactForm: {
      title: getString(contactForm.title, fallback.contactForm.title),
      description: getString(contactForm.description, fallback.contactForm.description || ''),
      submitLabel: getString(contactForm.submitLabel, fallback.contactForm.submitLabel),
      namePlaceholder: getString(contactForm.namePlaceholder, fallback.contactForm.namePlaceholder),
      emailPlaceholder: getString(contactForm.emailPlaceholder, fallback.contactForm.emailPlaceholder || ''),
      subjectPlaceholder: getString(contactForm.subjectPlaceholder, fallback.contactForm.subjectPlaceholder || ''),
      messagePlaceholder: getString(contactForm.messagePlaceholder, fallback.contactForm.messagePlaceholder),
    },
    visitUsTitle: getString(raw.visitUsTitle, fallback.visitUsTitle),
    addressLabel: getString(raw.addressLabel, fallback.addressLabel),
    emailLabel: getString(raw.emailLabel, fallback.emailLabel),
    phoneLabel: getString(raw.phoneLabel, fallback.phoneLabel),
    openHoursLabel: getString(raw.openHoursLabel, fallback.openHoursLabel),
    weekdayHours: getString(raw.weekdayHours, fallback.weekdayHours),
    weekendHours: getString(raw.weekendHours, fallback.weekendHours),
    mapButtonLabel: getString(raw.mapButtonLabel, fallback.mapButtonLabel),
  };
}

function mapContactFormContent(
  value: unknown,
  fallback: SiteSettingsContent['homePage']['contactForm'],
): SiteSettingsContent['homePage']['contactForm'] {
  const source = isRecord(value) ? value : {};

  return {
    title: getString(source.title, fallback.title),
    description: getString(source.description, fallback.description || ''),
    submitLabel: getString(source.submitLabel, fallback.submitLabel),
    namePlaceholder: getString(source.namePlaceholder, fallback.namePlaceholder),
    emailPlaceholder: getString(source.emailPlaceholder, fallback.emailPlaceholder || ''),
    phonePlaceholder: getString(source.phonePlaceholder, fallback.phonePlaceholder || ''),
    subjectPlaceholder: getString(source.subjectPlaceholder, fallback.subjectPlaceholder || ''),
    messagePlaceholder: getString(source.messagePlaceholder, fallback.messagePlaceholder),
  };
}

function mapAboutPageContent(raw: Record<string, unknown>): SiteSettingsContent['aboutPage'] {
  const fallback = defaultSiteSettingsContent.aboutPage;

  return {
    heroTitle: getString(raw.heroTitle, fallback.heroTitle),
    heroSubtitle: getString(raw.heroSubtitle, fallback.heroSubtitle),
    heroBackgroundImage: getMediaUrl(raw.heroBackgroundImage) || fallback.heroBackgroundImage,
    storyTitle: getString(raw.storyTitle, fallback.storyTitle),
    storyParagraphs: toStringArray(raw.storyParagraphs).length > 0
      ? toStringArray(raw.storyParagraphs)
      : fallback.storyParagraphs,
    storyImage: getMediaUrl(raw.storyImage) || fallback.storyImage,
    whyChooseTitle: getString(raw.whyChooseTitle, fallback.whyChooseTitle),
    whyChooseItems: toFeatureItems(raw.whyChooseItems, fallback.whyChooseItems),
    amenitiesTitle: getString(raw.amenitiesTitle, fallback.amenitiesTitle),
    amenitiesImage: getMediaUrl(raw.amenitiesImage) || fallback.amenitiesImage,
    amenities: toAmenityItems(raw.amenities, fallback.amenities),
  };
}

function toAmenityItems(
  value: unknown,
  fallback: SiteSettingsContent['meetingRoomsPage']['amenities'],
): SiteSettingsContent['meetingRoomsPage']['amenities'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      icon: getString(source.icon, fallback[index]?.icon ?? 'Wifi'),
      title: getString(source.title, fallback[index]?.title ?? ''),
      description: getString(source.description, fallback[index]?.description ?? ''),
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

function toWorkspaceItems(
  value: unknown,
  fallback: SiteSettingsContent['blogPage']['relatedWorkspaces'],
): SiteSettingsContent['blogPage']['relatedWorkspaces'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      id: `${getString(source.title, fallback[index]?.title ?? `workspace-${index}`)}-${index}`,
      title: getString(source.title, fallback[index]?.title ?? ''),
      image: getMediaUrl(source.image) || fallback[index]?.image || '',
      category: getString(source.category, fallback[index]?.category ?? ''),
      link: getString(source.link, fallback[index]?.link ?? '/'),
    };
  });
}

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

function mapBlogPageContent(raw: Record<string, unknown>): SiteSettingsContent['blogPage'] {
  const fallback = defaultSiteSettingsContent.blogPage;

  return {
    heroTitle: getString(raw.heroTitle, fallback.heroTitle),
    heroSubtitle: getString(raw.heroSubtitle, fallback.heroSubtitle),
    heroBackgroundImage: getMediaUrl(raw.heroBackgroundImage) || fallback.heroBackgroundImage,
    searchPlaceholder: getString(raw.searchPlaceholder, fallback.searchPlaceholder),
    quickSearchTitle: getString(raw.quickSearchTitle, fallback.quickSearchTitle),
    recentPostsTitle: getString(raw.recentPostsTitle, fallback.recentPostsTitle),
    categoriesTitle: getString(raw.categoriesTitle, fallback.categoriesTitle),
    popularTagsTitle: getString(raw.popularTagsTitle, fallback.popularTagsTitle),
    noResultsText: getString(raw.noResultsText, fallback.noResultsText),
    detailBackLabel: getString(raw.detailBackLabel, fallback.detailBackLabel),
    detailSearchTitle: getString(raw.detailSearchTitle, fallback.detailSearchTitle),
    detailSearchButtonLabel: getString(raw.detailSearchButtonLabel, fallback.detailSearchButtonLabel),
    detailRecentPostsTitle: getString(raw.detailRecentPostsTitle, fallback.detailRecentPostsTitle),
    detailPopularTagsTitle: getString(raw.detailPopularTagsTitle, fallback.detailPopularTagsTitle),
    detailRelatedWorkspacesTitle: getString(raw.detailRelatedWorkspacesTitle, fallback.detailRelatedWorkspacesTitle),
    detailCommentForm: mapContactFormContent(raw.detailCommentForm, fallback.detailCommentForm),
    relatedWorkspaces: toWorkspaceItems(raw.relatedWorkspaces, fallback.relatedWorkspaces),
  };
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

function mapMeetingRoomsPageContent(raw: Record<string, unknown>): SiteSettingsContent['meetingRoomsPage'] {
  const fallback = defaultSiteSettingsContent.meetingRoomsPage;

  return {
    heroTitle: getString(raw.heroTitle, fallback.heroTitle),
    heroSubtitle: getString(raw.heroSubtitle, fallback.heroSubtitle),
    heroBackgroundImage: getMediaUrl(raw.heroBackgroundImage) || fallback.heroBackgroundImage,
    roomsTitle: getString(raw.roomsTitle, fallback.roomsTitle),
    roomsSubtitle: getString(raw.roomsSubtitle, fallback.roomsSubtitle),
    amenitiesTitle: getString(raw.amenitiesTitle, fallback.amenitiesTitle),
    amenitiesSubtitle: getString(raw.amenitiesSubtitle, fallback.amenitiesSubtitle),
    amenities: toAmenityItems(raw.amenities, fallback.amenities),
    plansTitle: getString(raw.plansTitle, fallback.plansTitle),
    plansSubtitle: getString(raw.plansSubtitle, fallback.plansSubtitle),
    readMoreLabel: getString(raw.readMoreLabel, fallback.readMoreLabel),
    bookNowLabel: getString(raw.bookNowLabel, fallback.bookNowLabel),
    getStartedLabel: getString(raw.getStartedLabel, fallback.getStartedLabel),
    popularLabel: getString(raw.popularLabel, fallback.popularLabel),
  };
}

function mapVirtualOfficePageContent(raw: Record<string, unknown>): SiteSettingsContent['virtualOfficePage'] {
  const fallback = defaultSiteSettingsContent.virtualOfficePage;

  return {
    heroTitle: getString(raw.heroTitle, fallback.heroTitle),
    heroSubtitle: getString(raw.heroSubtitle, fallback.heroSubtitle),
    heroBackgroundImage: getMediaUrl(raw.heroBackgroundImage) || fallback.heroBackgroundImage,
    featuredImage: getMediaUrl(raw.featuredImage) || fallback.featuredImage,
    overviewTitle: getString(raw.overviewTitle, fallback.overviewTitle),
    overviewText: getString(raw.overviewText, fallback.overviewText),
    challengeTitle: getString(raw.challengeTitle, fallback.challengeTitle),
    challengeIntro: getString(raw.challengeIntro, fallback.challengeIntro),
    challengeItems: toStringArray(raw.challengeItems).length > 0
      ? toStringArray(raw.challengeItems)
      : fallback.challengeItems,
    resultTitle: getString(raw.resultTitle, fallback.resultTitle),
    resultText: getString(raw.resultText, fallback.resultText),
    galleryImages: toGalleryItems(raw.galleryImages, fallback.galleryImages),
    projectInfoTitle: getString(raw.projectInfoTitle, fallback.projectInfoTitle),
    projectDateLabel: getString(raw.projectDateLabel, fallback.projectDateLabel),
    projectDateValue: getString(raw.projectDateValue, fallback.projectDateValue),
    projectCategoryLabel: getString(raw.projectCategoryLabel, fallback.projectCategoryLabel),
    projectCategoryValue: getString(raw.projectCategoryValue, fallback.projectCategoryValue),
    projectWebsiteLabel: getString(raw.projectWebsiteLabel, fallback.projectWebsiteLabel),
    projectWebsiteValue: getString(raw.projectWebsiteValue, fallback.projectWebsiteValue),
    ctaTitle: getString(raw.ctaTitle, fallback.ctaTitle),
    ctaDescription: getString(raw.ctaDescription, fallback.ctaDescription),
    ctaButtonLabel: getString(raw.ctaButtonLabel, fallback.ctaButtonLabel),
    contactForm: mapContactFormContent(raw.contactForm, fallback.contactForm),
  };
}

function mapContactPageContent(raw: Record<string, unknown>): SiteSettingsContent['contactPage'] {
  const fallback = defaultSiteSettingsContent.contactPage;

  return {
    heroTitle: getString(raw.heroTitle, fallback.heroTitle),
    heroSubtitle: getString(raw.heroSubtitle, fallback.heroSubtitle),
    heroBackgroundImage: getMediaUrl(raw.heroBackgroundImage) || fallback.heroBackgroundImage,
    introEyebrow: getString(raw.introEyebrow, fallback.introEyebrow),
    introTitle: getString(raw.introTitle, fallback.introTitle),
    addressCardTitle: getString(raw.addressCardTitle, fallback.addressCardTitle),
    emailCardTitle: getString(raw.emailCardTitle, fallback.emailCardTitle),
    phoneCardTitle: getString(raw.phoneCardTitle, fallback.phoneCardTitle),
    form: mapContactFormContent(raw.form, fallback.form),
    mapTitle: getString(raw.mapTitle, fallback.mapTitle),
    mapDescription: getString(raw.mapDescription, fallback.mapDescription),
  };
}

function toSiteLinks(
  value: unknown,
  fallback: SiteSettingsContent['navigation']['links'],
): SiteSettingsContent['navigation']['links'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      name: getString(source.name, fallback[index]?.name ?? ''),
      path: getString(source.path, fallback[index]?.path ?? '/'),
    };
  });
}

function toSocialLinks(
  value: unknown,
  fallback: SiteSettingsContent['socialLinks'],
): SiteSettingsContent['socialLinks'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      label: getString(source.label, fallback[index]?.label ?? ''),
      href: normalizeExternalUrl(getString(source.href, fallback[index]?.href ?? '#')),
      icon: getString(source.icon, fallback[index]?.icon ?? 'Facebook'),
    };
  });
}

function mapNavigationContent(
  value: unknown,
  fallback: SiteSettingsContent['navigation'],
): SiteSettingsContent['navigation'] {
  const source = isRecord(value) ? value : {};

  return {
    logoUrl: fallback.logoUrl,
    links: toSiteLinks(source.links, fallback.links),
    ctaLabel: getString(source.ctaLabel, fallback.ctaLabel),
    ctaPath: getString(source.ctaPath, fallback.ctaPath),
  };
}

function mapFooterContent(
  value: unknown,
  fallback: SiteSettingsContent['footer'],
): SiteSettingsContent['footer'] {
  const source = isRecord(value) ? value : {};

  return {
    logoUrl: getMediaUrl(source.logo) || fallback.logoUrl,
    description: getString(source.description, fallback.description),
    serviceLinks: toSiteLinks(source.serviceLinks, fallback.serviceLinks),
    aboutLinks: toSiteLinks(source.aboutLinks, fallback.aboutLinks),
    contactTitle: getString(source.contactTitle, fallback.contactTitle),
    copyright: getString(source.copyright, fallback.copyright),
    legalLinks: toSiteLinks(source.legalLinks, fallback.legalLinks),
  };
}

function toLegalSections(
  value: unknown,
  fallback: LegalPageContent['sections'],
): LegalPageContent['sections'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      title: getString(source.title, fallback[index]?.title ?? ''),
      body: getString(source.body, fallback[index]?.body ?? ''),
    };
  });
}

function mapLegalPageContent(raw: Record<string, unknown>, fallback: LegalPageContent): LegalPageContent {
  return {
    heroTitle: getString(raw.heroTitle, fallback.heroTitle),
    heroSubtitle: getString(raw.heroSubtitle, fallback.heroSubtitle),
    effectiveDateLabel: getString(raw.effectiveDateLabel, fallback.effectiveDateLabel),
    effectiveDateValue: getString(raw.effectiveDateValue, fallback.effectiveDateValue),
    introText: getString(raw.introText, fallback.introText),
    sections: toLegalSections(raw.sections, fallback.sections),
    contactTitle: getString(raw.contactTitle, fallback.contactTitle),
    contactBody: getString(raw.contactBody, fallback.contactBody),
    contactButtonLabel: getString(raw.contactButtonLabel, fallback.contactButtonLabel),
  };
}

export function useBlogPosts() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'blog-posts', previewStatus ?? 'published'],
    queryFn: async (): Promise<CmsBlogPost[]> => {
      const payload = await fetchApi<unknown>(
        appendStatusParam('/blog-posts?sort=publishedDate:desc&pagination[pageSize]=100&populate=*', previewStatus),
      );
      const posts = unwrapCollection<Record<string, unknown>>(payload);

      return posts.map((post) => {
        const fallbackId = String(post.id ?? post.documentId ?? '');
        const slug = String(post.slug ?? fallbackId);
        const mediaUrl = getMediaUrl(post.coverImage);
        const directUrl = typeof post.coverImageUrl === 'string' ? post.coverImageUrl : '';
        const contentImages = [
          ...getMediaUrls(post.contentImages),
          ...toStringArray(post.contentImageUrls),
        ];
        return {
          id: fallbackId,
          title: String(post.title ?? ''),
          slug,
          excerpt: String(post.excerpt ?? ''),
          content: typeof post.content === 'string' ? post.content : undefined,
          contentImages,
          proTipTitle: typeof post.proTipTitle === 'string' ? post.proTipTitle : undefined,
          proTipText: typeof post.proTipText === 'string' ? post.proTipText : undefined,
          category: String(post.category ?? 'General'),
          date: String(post.publishedDate ?? ''),
          readTime: String(post.readTime ?? '5 min read'),
          author: String(post.author ?? 'CoworkingHub Team'),
          tags: toStringArray(post.tags),
          featured: Boolean(post.featured),
          image: mediaUrl || directUrl,
        };
      });
    },
    staleTime: 60_000,
  });
}

export function useBlogPostBySlug(slug?: string, status?: 'draft' | 'published') {
  const previewStatus = usePreviewStatus();
  const resolvedStatus = status ?? previewStatus;

  return useQuery({
    queryKey: ['cms', 'blog-post', slug, resolvedStatus ?? 'published'],
    enabled: Boolean(slug),
    queryFn: async (): Promise<CmsBlogPost | null> => {
      const payload = await fetchApi<unknown>(
        appendStatusParam(
          `/blog-posts?filters[$or][0][slug][$eq]=${encodeURIComponent(String(slug))}&filters[$or][1][documentId][$eq]=${encodeURIComponent(String(slug))}&pagination[pageSize]=1&populate=*`,
          resolvedStatus,
        ),
      );
      const post = unwrapSingle<Record<string, unknown>>(payload);

      if (!post) {
        return null;
      }

      const fallbackId = String(post.id ?? post.documentId ?? slug ?? '');
      const mediaUrl = getMediaUrl(post.coverImage);
      const directUrl = typeof post.coverImageUrl === 'string' ? post.coverImageUrl : '';
      const contentImages = [
        ...getMediaUrls(post.contentImages),
        ...toStringArray(post.contentImageUrls),
      ];
      return {
        id: fallbackId,
        title: String(post.title ?? ''),
        slug: String(post.slug ?? slug ?? fallbackId),
        excerpt: String(post.excerpt ?? ''),
        content: typeof post.content === 'string' ? post.content : undefined,
        contentImages,
        proTipTitle: typeof post.proTipTitle === 'string' ? post.proTipTitle : undefined,
        proTipText: typeof post.proTipText === 'string' ? post.proTipText : undefined,
        category: String(post.category ?? 'General'),
        date: String(post.publishedDate ?? ''),
        readTime: String(post.readTime ?? '5 min read'),
        author: String(post.author ?? 'CoworkingHub Team'),
        tags: toStringArray(post.tags),
        featured: Boolean(post.featured),
        image: mediaUrl || directUrl,
      };
    },
    staleTime: 60_000,
  });
}

export function useFaqItems() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'faq-items', previewStatus ?? 'published'],
    queryFn: async (): Promise<CmsFaqItem[]> => {
      const payload = await fetchApi<unknown>(
        appendStatusParam('/faq-items?filters[isFeatured][$eq]=true&sort=sortOrder:asc&pagination[pageSize]=200', previewStatus),
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
        .filter((item) => item.isFeatured)
        .sort((left, right) => left.sortOrder - right.sortOrder);
    },
    staleTime: 60_000,
  });
}

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
      }));
    },
    staleTime: 60_000,
  });
}

export function useMeetingRooms() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'meeting-rooms', previewStatus ?? 'published'],
    queryFn: async (): Promise<CmsMeetingRoom[]> => {
      const payload = await fetchApi<unknown>(
        appendStatusParam('/meeting-rooms?filters[isFeatured][$eq]=true&sort=sortOrder:asc&pagination[pageSize]=100&populate=*', previewStatus),
      );
      const rooms = unwrapCollection<Record<string, unknown>>(payload);

      return rooms
        .map((room) => ({
          id: String(room.id ?? room.documentId ?? ''),
          name: String(room.name ?? ''),
          slug: String(room.slug ?? room.id ?? room.documentId ?? ''),
          description: typeof room.description === 'string' ? room.description : undefined,
          capacity: typeof room.capacity === 'number' ? room.capacity : undefined,
          image: getMediaUrl(room.image) || (typeof room.imageUrl === 'string' ? room.imageUrl : ''),
          features: toStringArray(room.features),
          badges: toStringArray(room.badges),
          isFeatured: getBoolean(room.isFeatured),
          sortOrder: Number(room.sortOrder ?? 1),
        }))
        .filter((room) => room.isFeatured)
        .sort((left, right) => left.sortOrder - right.sortOrder);
    },
    staleTime: 60_000,
  });
}

export function useHomepageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'homepage', previewStatus ?? 'published'],
    queryFn: async (): Promise<SiteSettingsContent['homePage'] | null> => {
      const payload = await fetchApi<unknown>(
        appendStatusParam(
          '/homepage?populate[hero][populate][backgroundImage][fields][0]=url&populate[featureChips]=*&populate[services][populate][image][fields][0]=url&populate[aboutHighlight][populate][benefits]=*&populate[aboutHighlight][populate][image][fields][0]=url&populate[whyChooseItems]=*&populate[testimonials]=*&populate[galleryImages][populate][image][fields][0]=url&populate[contactForm]=*',
          previewStatus,
        ),
      );
      const raw = unwrapSingle<Record<string, unknown>>(payload);

      return raw ? mapHomepageContent(raw) : null;
    },
    staleTime: 60_000,
  });
}

export function useAboutPageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'about-page', previewStatus ?? 'published'],
    queryFn: async (): Promise<SiteSettingsContent['aboutPage'] | null> => {
      const payload = await fetchApi<unknown>(appendStatusParam('/about-page?populate=*', previewStatus));
      const raw = unwrapSingle<Record<string, unknown>>(payload);
      return raw ? mapAboutPageContent(raw) : null;
    },
    staleTime: 60_000,
  });
}

export function useBlogPageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'blog-page', previewStatus ?? 'published'],
    queryFn: async (): Promise<SiteSettingsContent['blogPage'] | null> => {
      const payload = await fetchApi<unknown>(appendStatusParam('/blog-page?populate=*', previewStatus));
      const raw = unwrapSingle<Record<string, unknown>>(payload);
      return raw ? mapBlogPageContent(raw) : null;
    },
    staleTime: 60_000,
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
    staleTime: 60_000,
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
    staleTime: 60_000,
  });
}

export function useMeetingRoomsPageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'meeting-rooms-page', previewStatus ?? 'published'],
    queryFn: async (): Promise<SiteSettingsContent['meetingRoomsPage'] | null> => {
      const payload = await fetchApi<unknown>(appendStatusParam('/meeting-rooms-page?populate=*', previewStatus));
      const raw = unwrapSingle<Record<string, unknown>>(payload);
      return raw ? mapMeetingRoomsPageContent(raw) : null;
    },
    staleTime: 60_000,
  });
}

export function useVirtualOfficePageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'virtual-office-page', previewStatus ?? 'published'],
    queryFn: async (): Promise<SiteSettingsContent['virtualOfficePage'] | null> => {
      const payload = await fetchApi<unknown>(appendStatusParam('/virtual-office-page?populate=*', previewStatus));
      const raw = unwrapSingle<Record<string, unknown>>(payload);
      return raw ? mapVirtualOfficePageContent(raw) : null;
    },
    staleTime: 60_000,
  });
}

export function useContactPageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'contact-page', previewStatus ?? 'published'],
    queryFn: async (): Promise<SiteSettingsContent['contactPage'] | null> => {
      const payload = await fetchApi<unknown>(appendStatusParam('/contact-page?populate=*', previewStatus));
      const raw = unwrapSingle<Record<string, unknown>>(payload);
      return raw ? mapContactPageContent(raw) : null;
    },
    staleTime: 60_000,
  });
}

export function usePrivacyPolicyPageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'privacy-policy-page', previewStatus ?? 'published'],
    queryFn: async (): Promise<LegalPageContent | null> => {
      const payload = await fetchApi<unknown>(appendStatusParam('/privacy-policy-page?populate=*', previewStatus));
      const raw = unwrapSingle<Record<string, unknown>>(payload);
      return raw ? mapLegalPageContent(raw, defaultPrivacyPolicyContent) : null;
    },
    staleTime: 60_000,
  });
}

export function useTermsPageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'terms-page', previewStatus ?? 'published'],
    queryFn: async (): Promise<LegalPageContent | null> => {
      const payload = await fetchApi<unknown>(appendStatusParam('/terms-page?populate=*', previewStatus));
      const raw = unwrapSingle<Record<string, unknown>>(payload);
      return raw ? mapLegalPageContent(raw, defaultTermsContent) : null;
    },
    staleTime: 60_000,
  });
}

export function useSiteSettings() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'site-settings', previewStatus ?? 'published'],
    queryFn: async (): Promise<SiteSettingsContent | null> => {
      const payload = await fetchApi<unknown>(
        appendStatusParam(
          '/site-setting?populate[socialLinks]=*&populate[navigation][populate][links]=*&populate[footer][populate][logo][fields][0]=url&populate[footer][populate][serviceLinks]=*&populate[footer][populate][aboutLinks]=*&populate[footer][populate][legalLinks]=*&populate[logo][fields][0]=url',
          previewStatus,
        ),
      );
      const raw = unwrapSingle<Record<string, unknown>>(payload);

      if (!raw) {
        return null;
      }

      const merged = mergeContent<SiteSettingsContent>(cloneData(defaultSiteSettingsContent), {
        siteName: typeof raw.siteName === 'string' ? raw.siteName : undefined,
        tagline: typeof raw.tagline === 'string' ? raw.tagline : undefined,
        contactEmail: typeof raw.contactEmail === 'string' ? raw.contactEmail : undefined,
        contactPhone: typeof raw.contactPhone === 'string' ? raw.contactPhone : undefined,
        address: typeof raw.address === 'string' ? raw.address : undefined,
        socialLinks: toSocialLinks(raw.socialLinks, defaultSiteSettingsContent.socialLinks),
        navigation: mapNavigationContent(raw.navigation, defaultSiteSettingsContent.navigation),
        footer: mapFooterContent(raw.footer, defaultSiteSettingsContent.footer),
        homePage: isRecord(raw.homePage) ? raw.homePage : undefined,
        aboutPage: isRecord(raw.aboutPage) ? raw.aboutPage : undefined,
        blogPage: isRecord(raw.blogPage) ? raw.blogPage : undefined,
        pricingPage: isRecord(raw.pricingPage) ? raw.pricingPage : undefined,
        faqPage: isRecord(raw.faqPage) ? raw.faqPage : undefined,
        meetingRoomsPage: isRecord(raw.meetingRoomsPage) ? raw.meetingRoomsPage : undefined,
        virtualOfficePage: isRecord(raw.virtualOfficePage) ? raw.virtualOfficePage : undefined,
        contactPage: isRecord(raw.contactPage) ? raw.contactPage : undefined,
      });

      const logoUrl = getMediaUrl(raw.logo);

      if (logoUrl) {
        merged.navigation.logoUrl = logoUrl;
      }

      return merged;
    },
    staleTime: 60_000,
  });
}
