import { useQuery } from '@tanstack/react-query';
import { fetchApi, getMediaUrl, unwrapSingle } from '@/lib/content-api';
import {
  defaultPrivacyPolicyContent,
  defaultSiteSettingsContent,
  defaultTermsContent,
  type LegalPageContent,
  type SiteSettingsContent,
} from '@/data/siteContent';
import {
  appendStatusParam,
  cloneData,
  getNumber,
  getString,
  isRecord,
  mapContactFormContent,
  mapLegalPageContent,
  mergeContent,
  normalizeExternalUrl,
  toAmenityItems,
  toFeatureItems,
  toGalleryItems,
  toStringArray,
  usePreviewStatus,
} from './cms-utils';
import { mapBlogPageContent } from './useBlogContent';
import { mapFaqPageContent } from './useFaqContent';
import { mapMeetingRoomsPageContent } from './useMeetingRoomsContent';
import { mapPricingPageContent } from './usePricingContent';

// --- Mapper helpers local to this module ---

function toIconTextItems(
  value: unknown,
  fallback: SiteSettingsContent['homePage']['featureChips'],
): SiteSettingsContent['homePage']['featureChips'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  // #134: If CMS returns more items than the fallback array contains, fallback[index]
  // will be undefined for the extra items. The ?. optional chaining and ?? hardcoded
  // defaults below ensure those extra items still render with safe empty/default values.
  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      icon: getString(source.icon, fallback[index]?.icon ?? 'Clock'),
      text: getString(source.text, fallback[index]?.text ?? ''),
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
      stars: Math.max(1, Math.min(5, getNumber(source.stars, fallback[index]?.stars ?? 5))),
    };
  });
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
    const label = getString(source.label, fallback[index]?.label ?? '');
    const href = normalizeExternalUrl(getString(source.href, fallback[index]?.href ?? '#'));
    const rawIcon = getString(source.icon, fallback[index]?.icon ?? '');

    return {
      label,
      href,
      icon: inferSocialIcon(rawIcon, label, href, fallback[index]?.icon ?? 'Facebook'),
    };
  });
}

function inferSocialIcon(rawIcon: string, label: string, href: string, fallbackIcon: string): string {
  if (rawIcon && ['Facebook', 'Instagram', 'Linkedin', 'Twitter'].includes(rawIcon)) {
    return rawIcon;
  }

  const haystack = `${label} ${href}`.toLowerCase();

  if (haystack.includes('instagram')) {
    return 'Instagram';
  }

  if (haystack.includes('linkedin')) {
    return 'Linkedin';
  }

  if (haystack.includes('twitter') || haystack.includes('x.com')) {
    return 'Twitter';
  }

  if (haystack.includes('facebook')) {
    return 'Facebook';
  }

  return fallbackIcon || 'Facebook';
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
      videoUrl: getString(hero.videoUrl, fallback.hero.videoUrl),
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
    mapUrl: getString(raw.mapUrl, fallback.mapUrl),
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

// --- Exported hooks ---

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
        // #133: Use mapper functions instead of passing raw CMS objects directly
        homePage: isRecord(raw.homePage) ? mapHomepageContent(raw.homePage) : undefined,
        aboutPage: isRecord(raw.aboutPage) ? mapAboutPageContent(raw.aboutPage) : undefined,
        blogPage: isRecord(raw.blogPage) ? mapBlogPageContent(raw.blogPage) : undefined,
        pricingPage: isRecord(raw.pricingPage) ? mapPricingPageContent(raw.pricingPage) : undefined,
        faqPage: isRecord(raw.faqPage) ? mapFaqPageContent(raw.faqPage) : undefined,
        meetingRoomsPage: isRecord(raw.meetingRoomsPage) ? mapMeetingRoomsPageContent(raw.meetingRoomsPage) : undefined,
        virtualOfficePage: isRecord(raw.virtualOfficePage) ? mapVirtualOfficePageContent(raw.virtualOfficePage) : undefined,
        contactPage: isRecord(raw.contactPage) ? mapContactPageContent(raw.contactPage) : undefined,
      });

      const logoUrl = getMediaUrl(raw.logo);

      if (logoUrl) {
        merged.navigation.logoUrl = logoUrl;
      }

      return merged;
    },
    // P2-138: Refetch site settings when the user returns to the tab, ensuring
    // cached data doesn't go stale beyond the default staleTime window.
    refetchOnWindowFocus: true,
  });
}
