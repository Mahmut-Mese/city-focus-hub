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
