import type { ContentPage } from '../api/content-api';
import { DEFAULT_HOME_CONTENT, DEFAULT_SITE_SETTINGS } from '../constants/home-defaults';
import type {
  NativeAboutHighlight,
  NativeContactFormContent,
  NativeFeatureItem,
  NativeFooterContent,
  NativeGalleryImageItem,
  NativeHeroContent,
  NativeHomeContent,
  NativeIconTextItem,
  NativeLinkItem,
  NativeNavigationContent,
  NativeServiceItem,
  NativeSiteSettings,
  NativeTestimonialItem,
  NativeVisitContent,
} from '../types/home-content';

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function unwrapData(value: ContentPage | null | undefined): UnknownRecord {
  if (!isRecord(value)) return {};
  const data = value.data;
  return isRecord(data) ? data : value;
}

function getString(source: UnknownRecord, key: string, fallback: string): string {
  const value = source[key];
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : fallback;
}

function getRecord(source: UnknownRecord, key: string): UnknownRecord {
  const value = source[key];
  return isRecord(value) ? value : {};
}

function getArray(source: UnknownRecord, key: string): unknown[] {
  const value = source[key];
  return Array.isArray(value) ? value : [];
}

function isLikelyUrl(value: string): boolean {
  if (!value.trim()) return false;
  try {
    const parsed = new URL(value.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function getImageUrl(source: UnknownRecord, key: string, fallback: string): string {
  const value = getString(source, key, '');
  return isLikelyUrl(value) ? value : fallback;
}

function getPath(source: UnknownRecord, key: string, fallback: string): string {
  const value = getString(source, key, fallback);
  if (value.startsWith('/') || isLikelyUrl(value)) return value;
  return fallback;
}

function clampStars(value: unknown, fallback: number): number {
  const numeric = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(5, Math.max(1, Math.round(numeric)));
}

function parseLinks(value: unknown, fallback: NativeLinkItem[]): NativeLinkItem[] {
  // Generic link parser for navigation/footer links
  if (!Array.isArray(value)) return fallback;
  const parsed = value
    .filter(isRecord)
    .map((item) => ({
      label: getString(item, 'label', getString(item, 'name', '')),
      path: getPath(item, 'path', '/'),
    }))
    .filter((item) => item.label.length > 0);
  return parsed.length > 0 ? parsed : fallback;
}

function parseFeatureChips(source: UnknownRecord): NativeIconTextItem[] {
  const parsed = getArray(source, 'featureChips')
    .filter(isRecord)
    .map((item) => ({
      icon: getString(item, 'icon', 'Clock'),
      text: getString(item, 'text', ''),
    }))
    .filter((item) => item.text.length > 0);
  return parsed.length > 0 ? parsed : DEFAULT_HOME_CONTENT.featureChips;
}

function parseServices(source: UnknownRecord): NativeServiceItem[] {
  const parsed = getArray(source, 'services')
    .filter(isRecord)
    .map((item) => ({
      title: getString(item, 'title', ''),
      description: getString(item, 'description', ''),
      image: getImageUrl(item, 'image', DEFAULT_HOME_CONTENT.services[0]?.image ?? ''),
      link: getPath(item, 'link', '/'),
    }))
    .filter((item) => item.title.length > 0);
  return parsed.length > 0 ? parsed : DEFAULT_HOME_CONTENT.services;
}

function parseHero(source: UnknownRecord): NativeHeroContent {
  const hero = getRecord(source, 'hero');
  return {
    title: getString(hero, 'title', DEFAULT_HOME_CONTENT.hero.title),
    subtitle: getString(hero, 'subtitle', DEFAULT_HOME_CONTENT.hero.subtitle),
    backgroundImage: getImageUrl(hero, 'backgroundImage', DEFAULT_HOME_CONTENT.hero.backgroundImage),
    primaryCtaLabel: getString(hero, 'primaryCtaLabel', DEFAULT_HOME_CONTENT.hero.primaryCtaLabel),
    primaryCtaPath: getPath(hero, 'primaryCtaPath', DEFAULT_HOME_CONTENT.hero.primaryCtaPath),
    secondaryCtaLabel: getString(hero, 'secondaryCtaLabel', DEFAULT_HOME_CONTENT.hero.secondaryCtaLabel),
    videoUrl: normalizeExternalVideoUrl(getString(hero, 'videoUrl', DEFAULT_HOME_CONTENT.hero.videoUrl)),
  };
}

function parseAboutHighlight(source: UnknownRecord): NativeAboutHighlight {
  const about = getRecord(source, 'aboutHighlight');
  const benefits = getArray(about, 'benefits').filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  return {
    eyebrow: getString(about, 'eyebrow', DEFAULT_HOME_CONTENT.aboutHighlight.eyebrow),
    title: getString(about, 'title', DEFAULT_HOME_CONTENT.aboutHighlight.title),
    description: getString(about, 'description', DEFAULT_HOME_CONTENT.aboutHighlight.description),
    benefits: benefits.length > 0 ? benefits : DEFAULT_HOME_CONTENT.aboutHighlight.benefits,
    image: getImageUrl(about, 'image', DEFAULT_HOME_CONTENT.aboutHighlight.image),
    primaryCtaLabel: getString(about, 'primaryCtaLabel', DEFAULT_HOME_CONTENT.aboutHighlight.primaryCtaLabel),
    primaryCtaPath: getPath(about, 'primaryCtaPath', DEFAULT_HOME_CONTENT.aboutHighlight.primaryCtaPath),
    secondaryCtaLabel: getString(about, 'secondaryCtaLabel', DEFAULT_HOME_CONTENT.aboutHighlight.secondaryCtaLabel),
    secondaryCtaPath: getPath(about, 'secondaryCtaPath', DEFAULT_HOME_CONTENT.aboutHighlight.secondaryCtaPath),
  };
}

function parseFeatureItems(source: UnknownRecord): NativeFeatureItem[] {
  const parsed = getArray(source, 'whyChooseItems')
    .filter(isRecord)
    .map((item) => ({
      icon: getString(item, 'icon', 'Clock'),
      title: getString(item, 'title', ''),
      description: getString(item, 'description', ''),
    }))
    .filter((item) => item.title.length > 0);
  return parsed.length > 0 ? parsed : DEFAULT_HOME_CONTENT.whyChooseItems;
}

function parseTestimonials(source: UnknownRecord): NativeTestimonialItem[] {
  const parsed = getArray(source, 'testimonials')
    .filter(isRecord)
    .map((item) => ({
      name: getString(item, 'name', ''),
      role: getString(item, 'role', ''),
      content: getString(item, 'content', ''),
      stars: clampStars(item.stars, 5),
    }))
    .filter((item) => item.name.length > 0 && item.content.length > 0);
  return parsed.length > 0 ? parsed : DEFAULT_HOME_CONTENT.testimonials;
}

function parseGalleryImages(source: UnknownRecord): NativeGalleryImageItem[] {
  const parsed = getArray(source, 'galleryImages')
    .filter(isRecord)
    .map((item) => ({
      image: getImageUrl(item, 'image', DEFAULT_HOME_CONTENT.galleryImages[0]?.image ?? ''),
      alt: getString(item, 'alt', 'Workspace image'),
    }))
    .filter((item) => item.image.length > 0);
  return parsed.length > 0 ? parsed : DEFAULT_HOME_CONTENT.galleryImages;
}

function parseContactForm(source: UnknownRecord): NativeContactFormContent {
  const contactForm = getRecord(source, 'contactForm');
  return {
    title: getString(contactForm, 'title', DEFAULT_HOME_CONTENT.contactForm.title),
    description: getString(contactForm, 'description', DEFAULT_HOME_CONTENT.contactForm.description),
    submitLabel: getString(contactForm, 'submitLabel', DEFAULT_HOME_CONTENT.contactForm.submitLabel),
    namePlaceholder: getString(contactForm, 'namePlaceholder', DEFAULT_HOME_CONTENT.contactForm.namePlaceholder),
    emailPlaceholder: getString(contactForm, 'emailPlaceholder', DEFAULT_HOME_CONTENT.contactForm.emailPlaceholder),
    subjectPlaceholder: getString(contactForm, 'subjectPlaceholder', DEFAULT_HOME_CONTENT.contactForm.subjectPlaceholder),
    messagePlaceholder: getString(contactForm, 'messagePlaceholder', DEFAULT_HOME_CONTENT.contactForm.messagePlaceholder),
  };
}

function parseVisit(source: UnknownRecord): NativeVisitContent {
  return {
    title: getString(source, 'visitUsTitle', DEFAULT_HOME_CONTENT.visit.title),
    addressLabel: getString(source, 'addressLabel', DEFAULT_HOME_CONTENT.visit.addressLabel),
    emailLabel: getString(source, 'emailLabel', DEFAULT_HOME_CONTENT.visit.emailLabel),
    phoneLabel: getString(source, 'phoneLabel', DEFAULT_HOME_CONTENT.visit.phoneLabel),
    openHoursLabel: getString(source, 'openHoursLabel', DEFAULT_HOME_CONTENT.visit.openHoursLabel),
    weekdayHours: getString(source, 'weekdayHours', DEFAULT_HOME_CONTENT.visit.weekdayHours),
    weekendHours: getString(source, 'weekendHours', DEFAULT_HOME_CONTENT.visit.weekendHours),
    mapButtonLabel: getString(source, 'mapButtonLabel', DEFAULT_HOME_CONTENT.visit.mapButtonLabel),
    mapUrl: getString(source, 'mapUrl', DEFAULT_HOME_CONTENT.visit.mapUrl),
  };
}

function parseNavigation(source: UnknownRecord): NativeNavigationContent {
  const navigation = getRecord(source, 'navigation');
  return {
    logoUrl: getString(navigation, 'logoUrl', DEFAULT_SITE_SETTINGS.navigation.logoUrl),
    ctaLabel: getString(navigation, 'ctaLabel', DEFAULT_SITE_SETTINGS.navigation.ctaLabel),
    ctaPath: getPath(navigation, 'ctaPath', DEFAULT_SITE_SETTINGS.navigation.ctaPath),
    links: parseLinks(navigation.links, DEFAULT_SITE_SETTINGS.navigation.links),
  };
}

function parseSocialLinks(value: unknown): NativeLinkItem[] {
  if (!Array.isArray(value)) return [];
  const parsed = value
    .filter(isRecord)
    .map((item) => {
      const label = getString(item, 'label', getString(item, 'name', getString(item, 'title', getString(item, 'href', ''))));
      const href = getString(item, 'href', getString(item, 'url', getPath(item, 'path', '/')));
      return { label, href };
    })
    .filter((link) => link.label.length > 0 && isLikelyUrl(link.href))
    .map((link) => ({ label: link.label, path: link.href }));
  return parsed;
}

function parseFooter(source: UnknownRecord): NativeFooterContent {
  const footer = getRecord(source, 'footer');
  return {
    logoUrl: getString(footer, 'logoUrl', DEFAULT_SITE_SETTINGS.footer.logoUrl),
    description: getString(footer, 'description', DEFAULT_SITE_SETTINGS.footer.description),
    serviceLinks: parseLinks(footer.serviceLinks, DEFAULT_SITE_SETTINGS.footer.serviceLinks),
    aboutLinks: parseLinks(footer.aboutLinks, DEFAULT_SITE_SETTINGS.footer.aboutLinks),
    contactTitle: getString(footer, 'contactTitle', DEFAULT_SITE_SETTINGS.footer.contactTitle),
    copyright: getString(footer, 'copyright', DEFAULT_SITE_SETTINGS.footer.copyright),
    legalLinks: parseLinks(footer.legalLinks, DEFAULT_SITE_SETTINGS.footer.legalLinks),
    socialLinks: parseSocialLinks(source.socialLinks),
  };
}

export function normalizeExternalVideoUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return '';

  const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
  const rawUrl = iframeMatch?.[1] ?? trimmed;

  try {
    const url = new URL(rawUrl);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';

    if (url.hostname.includes('youtube.com') && url.pathname === '/watch') {
      const videoId = url.searchParams.get('v');
      return videoId ? `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}` : '';
    }

    if (url.hostname.includes('youtube.com') && url.pathname.startsWith('/embed/')) {
      const videoId = url.pathname.split('/').filter(Boolean)[1];
      return videoId ? `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}` : '';
    }

    if (url.hostname === 'youtu.be') {
      const videoId = url.pathname.replace(/^\/+/, '');
      return videoId ? `https://youtu.be/${encodeURIComponent(videoId)}` : '';
    }

    if (url.hostname.includes('vimeo.com')) {
      return url.toString();
    }

    return url.toString();
  } catch {
    return '';
  }
}

export function parseHomeContent(source: ContentPage | null | undefined): NativeHomeContent {
  const data = unwrapData(source);
  return {
    hero: parseHero(data),
    featureChips: parseFeatureChips(data),
    servicesEyebrow: getString(data, 'servicesEyebrow', DEFAULT_HOME_CONTENT.servicesEyebrow),
    servicesKicker: getString(data, 'servicesKicker', DEFAULT_HOME_CONTENT.servicesKicker),
    services: parseServices(data),
    aboutHighlight: parseAboutHighlight(data),
    whyChooseEyebrow: getString(data, 'whyChooseEyebrow', DEFAULT_HOME_CONTENT.whyChooseEyebrow),
    whyChooseKicker: getString(data, 'whyChooseKicker', DEFAULT_HOME_CONTENT.whyChooseKicker),
    whyChooseTitle: getString(data, 'whyChooseTitle', DEFAULT_HOME_CONTENT.whyChooseTitle),
    whyChooseItems: parseFeatureItems(data),
    testimonialsEyebrow: getString(data, 'testimonialsEyebrow', DEFAULT_HOME_CONTENT.testimonialsEyebrow),
    testimonialsKicker: getString(data, 'testimonialsKicker', DEFAULT_HOME_CONTENT.testimonialsKicker),
    testimonialsTitle: getString(data, 'testimonialsTitle', DEFAULT_HOME_CONTENT.testimonialsTitle),
    testimonials: parseTestimonials(data),
    galleryEyebrow: getString(data, 'galleryEyebrow', DEFAULT_HOME_CONTENT.galleryEyebrow),
    galleryKicker: getString(data, 'galleryKicker', DEFAULT_HOME_CONTENT.galleryKicker),
    galleryTitle: getString(data, 'galleryTitle', DEFAULT_HOME_CONTENT.galleryTitle),
    galleryImages: parseGalleryImages(data),
    contactForm: parseContactForm(data),
    visit: parseVisit(data),
  };
}

export function parseSiteSettings(source: ContentPage | null | undefined): NativeSiteSettings {
  const data = unwrapData(source);
  return {
    siteName: getString(data, 'siteName', DEFAULT_SITE_SETTINGS.siteName),
    tagline: getString(data, 'tagline', DEFAULT_SITE_SETTINGS.tagline),
    contactEmail: getString(data, 'contactEmail', DEFAULT_SITE_SETTINGS.contactEmail),
    contactPhone: getString(data, 'contactPhone', DEFAULT_SITE_SETTINGS.contactPhone),
    address: getString(data, 'address', DEFAULT_SITE_SETTINGS.address),
    navigation: parseNavigation(data),
    footer: parseFooter(data),
  };
}
