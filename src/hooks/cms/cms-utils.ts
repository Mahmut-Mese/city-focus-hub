import { useState, useEffect } from 'react';
import { getMediaUrl } from '@/lib/content-api';
import type { SiteSettingsContent, LegalPageContent } from '@/data/siteContent';

export type PreviewStatus = 'draft' | 'published';

export function toStringArray(value: unknown): string[] {
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

export function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function cloneData<T>(value: T): T {
  return structuredClone(value);
}

export function mergeContent<T>(base: T, override: unknown): T {
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

export function getString(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.length > 0 ? value : fallback;
}

export function normalizeExternalUrl(value: string): string {
  const trimmed = value.trim();

  if (!trimmed || trimmed === '#') {
    return trimmed || '#';
  }

  if (/^(https?:|mailto:|tel:|#)/i.test(trimmed)) {
    return trimmed;
  }

  // Only prepend https:// for values that look like external hostnames (contain a dot).
  // Relative paths like /about must not be modified.
  if (trimmed.startsWith('/') || trimmed.startsWith('.')) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export function appendStatusParam(path: string, status?: PreviewStatus): string {
  if (!status) {
    return path;
  }

  return `${path}${path.includes('?') ? '&' : '?'}status=${status}`;
}

export function getBoolean(value: unknown, fallback = false): boolean {
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

export function getNumber(value: unknown, fallback: number): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value.trim());
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

export function formatReadTime(value: unknown): string {
  const raw = String(value ?? '').trim();

  if (!raw) {
    return '5 min read';
  }

  if (/\bread$/i.test(raw)) {
    return raw;
  }

  return `${raw} read`;
}

// #132: usePreviewStatus as a proper hook that reacts to SPA navigation.
// Listens to popstate and a custom 'locationchange' event so the preview
// query key updates whenever the URL changes (e.g. react-router navigation).
export function usePreviewStatus(): PreviewStatus | undefined {
  const [search, setSearch] = useState(() =>
    typeof window !== 'undefined' ? window.location.search : '',
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    function sync() {
      setSearch(window.location.search);
    }

    window.addEventListener('popstate', sync);
    // React Router v6 fires history events that don't trigger popstate — patch pushState/replaceState once.
    const orig = window.history.pushState.bind(window.history);
    window.history.pushState = (...args) => { orig(...args); sync(); };
    const origReplace = window.history.replaceState.bind(window.history);
    window.history.replaceState = (...args) => { origReplace(...args); sync(); };

    return () => {
      window.removeEventListener('popstate', sync);
    };
  }, []);

  if (typeof window === 'undefined') {
    return undefined;
  }

  const searchParams = new URLSearchParams(search);
  const isPreview = searchParams.get('preview') === '1';
  const status = searchParams.get('status');

  if (!isPreview) {
    return undefined;
  }

  return status === 'draft' || status === 'published' ? status : undefined;
}

// --- Cross-cutting mapper helpers used by multiple domains ---

export function toFeatureItems(
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

export function toAmenityItems(
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

export function mapContactFormContent(
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

export function toGalleryItems(
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

export function toLegalSections(
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

export function mapLegalPageContent(raw: Record<string, unknown>, fallback: LegalPageContent): LegalPageContent {
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
