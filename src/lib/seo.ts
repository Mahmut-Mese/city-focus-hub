import { useEffect, useRef } from 'react';

interface UseSeoOptions {
  siteName: string;
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

function normalizeText(value?: string) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1).trim()}…`;
}

function buildTitle(pageTitle: string | undefined, siteName: string) {
  const cleanPageTitle = normalizeText(pageTitle);
  const cleanSiteName = normalizeText(siteName);

  if (!cleanPageTitle) {
    return cleanSiteName;
  }

  if (cleanPageTitle.toLowerCase().includes(cleanSiteName.toLowerCase())) {
    return truncate(cleanPageTitle, 68);
  }

  return truncate(`${cleanPageTitle} | ${cleanSiteName}`, 68);
}

function buildDescription(description: string | undefined, siteName: string) {
  const cleanDescription = normalizeText(description);

  if (cleanDescription) {
    return truncate(cleanDescription, 160);
  }

  return truncate(`Explore ${siteName}.`, 160);
}

function absoluteUrl(path: string) {
  if (!path) {
    return window.location.href;
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return new URL(path, window.location.origin).toString();
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

export function useSeo({
  siteName,
  title,
  description,
  image,
  type = 'website',
  noindex = false,
}: UseSeoOptions) {
  // Capture original SSG values on first mount so we can restore them on unmount.
  const originals = useRef<{ title: string; metas: Map<string, string>; canonical: string } | null>(null);

  useEffect(() => {
    // Snapshot originals once
    if (!originals.current) {
      const metaSelectors = [
        'meta[name="description"]',
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:type"]',
        'meta[property="og:image"]',
        'meta[property="og:url"]',
        'meta[property="og:site_name"]',
        'meta[name="twitter:card"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:description"]',
        'meta[name="twitter:image"]',
        'meta[name="robots"]',
      ] as const;

      const metas = new Map<string, string>();
      metaSelectors.forEach((sel) => {
        const el = document.head.querySelector(sel);
        if (el) {
          metas.set(sel, el.getAttribute('content') ?? '');
        }
      });

      const canonicalEl = document.head.querySelector('link[rel="canonical"]');
      originals.current = {
        title: document.title,
        metas,
        canonical: canonicalEl?.getAttribute('href') ?? '',
      };
    }

    const nextTitle = buildTitle(title, siteName);
    const nextDescription = buildDescription(description, siteName);
    const nextImage = absoluteUrl(image || '/logo.svg');
    const nextUrl = window.location.href;

    document.title = nextTitle;

    upsertMeta('meta[name="description"]', { name: 'description', content: nextDescription });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: nextTitle });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: nextDescription });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: type });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: nextImage });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: nextUrl });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: nextTitle });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: nextDescription });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: nextImage });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' });
    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: nextUrl });

    // Cleanup: restore SSG originals when the component that called useSeo unmounts
    return () => {
      const orig = originals.current;
      if (!orig) return;
      document.title = orig.title;
      orig.metas.forEach((content, sel) => {
        const el = document.head.querySelector(sel);
        if (el) el.setAttribute('content', content);
      });
      const canonicalEl = document.head.querySelector('link[rel="canonical"]');
      if (canonicalEl && orig.canonical) {
        canonicalEl.setAttribute('href', orig.canonical);
      }
    };
  }, [description, image, noindex, siteName, title, type]);
}
