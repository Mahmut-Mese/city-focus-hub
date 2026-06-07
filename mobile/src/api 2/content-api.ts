import { ApiClient } from './client';

export type ContentStatus = 'published' | 'draft';

export type ContentPageName =
  | 'homepage'
  | 'about-page'
  | 'blog-page'
  | 'pricing-page'
  | 'faq-page'
  | 'meeting-rooms-page'
  | 'virtual-office-page'
  | 'contact-page'
  | 'privacy-policy-page'
  | 'terms-page';

export type ContentCollectionName =
  | 'blog-posts'
  | 'faq-items'
  | 'pricing-plans'
  | 'meeting-rooms';

export type ContentPage = Record<string, unknown>;
export type ContentCollectionItem = Record<string, unknown>;

export type ContactSubmissionInput = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  sourcePage?: string;
};

export type ContactSubmissionResponse = {
  ok: boolean;
  id: number | string | null;
  message: string;
};

export type PublicPlan = {
  id?: number | string;
  name?: string;
  price?: number;
  [key: string]: unknown;
};

type QueryValue = string | number | boolean | undefined | null;

// Helper to resolve media URLs from various payload shapes.
/**
 * Resolve a single media URL from the provided value.
 * Returns an empty string if no valid URL can be extracted.
 */
export function getMediaUrl(media: unknown, apiBaseUrl?: string): string {
  const urls = getMediaUrls(media, apiBaseUrl);
  return urls[0] ?? '';
}

/**
 * Resolve all media URLs from the provided value.
 * Returns a de‑duplicated array of URLs (strings).
 */
export function getMediaUrls(media: unknown, apiBaseUrl?: string): string[] {
  const collected: string[] = [];
  const baseOrigin = (() => {
    const envBase = typeof process !== 'undefined' ? process.env?.EXPO_PUBLIC_API_URL : undefined;
    const raw = apiBaseUrl ?? envBase ?? '';
    if (!raw) return '';
    // Remove any trailing '/api' and possible trailing slash.
    let cleaned = raw.replace(/\/api\/?$/i, '');
    cleaned = cleaned.replace(/\/+$/,'');
    return cleaned;
  })();

  const add = (url: string) => {
    if (!url) return;
    // Absolute URLs pass through.
    if (/^https?:\/\//i.test(url)) {
      collected.push(url);
    } else if (/^\//.test(url) && baseOrigin) {
      // Relative path – prepend the origin.
      const prefix = baseOrigin.endsWith('/') ? baseOrigin.slice(0, -1) : baseOrigin;
      collected.push(`${prefix}${url}`);
    }
  };

  const recurse = (value: unknown) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value.forEach(recurse);
      return;
    }
    if (typeof value === 'string') {
      add(value);
      return;
    }
    if (typeof value === 'object' && value !== null) {
      const obj = value as Record<string, unknown>;
      // Direct url field.
      if (typeof obj.url === 'string') {
        add(obj.url);
      }
      // Known wrappers.
      const keys = ['data', 'attributes', 'image', 'media', 'file'];
      for (const k of keys) {
        if (obj[k] !== undefined) {
          recurse(obj[k]);
        }
      }
      // Fallback: recurse through all values.
      Object.values(obj).forEach(recurse);
    }
  };

  recurse(media);

  // Deduplicate while preserving order.
  const deduped: string[] = [];
  const seen = new Set<string>();
  for (const u of collected) {
    if (!seen.has(u)) {
      seen.add(u);
      deduped.push(u);
    }
  }
  return deduped;
}


export function buildQuery(params: Record<string, QueryValue>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

function withStatus(path: string, status: ContentStatus = 'published'): string {
  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}status=${encodeURIComponent(status)}`;
}

export function fetchSiteSetting(apiClient: ApiClient, status: ContentStatus = 'published'): Promise<ContentPage | null> {
  return apiClient.request<ContentPage | null>(withStatus('/api/site-setting', status), { skipAuth: true });
}

export function fetchContentPage(
  apiClient: ApiClient,
  pageName: ContentPageName,
  status: ContentStatus = 'published',
): Promise<ContentPage | null> {
  return apiClient.request<ContentPage | null>(withStatus(`/api/${pageName}?populate=*`, status), { skipAuth: true });
}

export function fetchContentCollection(
  apiClient: ApiClient,
  collectionName: ContentCollectionName,
  params: Record<string, QueryValue> = {},
): Promise<ContentCollectionItem[]> {
  return apiClient.request<ContentCollectionItem[]>(`/api/${collectionName}${buildQuery(params)}`, { skipAuth: true });
}

export function fetchBlogPosts(apiClient: ApiClient): Promise<ContentCollectionItem[]> {
  return fetchContentCollection(apiClient, 'blog-posts', {
    sort: 'publishedDate:desc',
    'pagination[pageSize]': 100,
    populate: '*',
    status: 'published',
  });
}

export async function fetchBlogPostBySlug(apiClient: ApiClient, slug: string): Promise<ContentCollectionItem | null> {
  const posts = await fetchContentCollection(apiClient, 'blog-posts', {
    'filters[$or][0][slug][$eq]': slug,
    'filters[$or][1][documentId][$eq]': slug,
    'pagination[pageSize]': 1,
    populate: '*',
    status: 'published',
  });

  return posts[0] ?? null;
}

export function fetchFaqItems(apiClient: ApiClient): Promise<ContentCollectionItem[]> {
  return fetchContentCollection(apiClient, 'faq-items', {
    sort: 'sortOrder:asc',
    'pagination[pageSize]': 200,
    status: 'published',
  });
}

export function fetchPricingPlans(apiClient: ApiClient, planType?: string): Promise<ContentCollectionItem[]> {
  return fetchContentCollection(apiClient, 'pricing-plans', {
    sort: 'sortOrder:asc',
    'pagination[pageSize]': 100,
    'filters[planType][$eq]': planType,
    populate: '*',
    status: 'published',
  });
}

export function fetchMeetingRooms(apiClient: ApiClient): Promise<ContentCollectionItem[]> {
  return fetchContentCollection(apiClient, 'meeting-rooms', {
    sort: 'sortOrder:asc',
    'pagination[pageSize]': 100,
    populate: '*',
    status: 'published',
  });
}

export function fetchPublicPlans(apiClient: ApiClient): Promise<PublicPlan[]> {
  return apiClient.request<PublicPlan[]>('/api/public/plans', { skipAuth: true });
}

export function submitContactSubmission(
  apiClient: ApiClient,
  input: ContactSubmissionInput,
): Promise<ContactSubmissionResponse> {
  return apiClient.request<ContactSubmissionResponse>('/api/contact-submissions', {
    method: 'POST',
    body: input,
    skipAuth: true,
  });
}
