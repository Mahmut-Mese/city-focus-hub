const DEFAULT_API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';
const API_BASE_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');
const API_URL = API_BASE_URL
  ? (API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`)
  : '/api';
const SNAPSHOT_BASE_URL = (import.meta.env.VITE_CMS_SNAPSHOT_BASE || '/cms').replace(/\/$/, '');

const STATIC_SNAPSHOT_PATHS = new Set([
  'site-setting',
  'homepage',
  'about-page',
  'blog-page',
  'pricing-page',
  'faq-page',
  'meeting-rooms-page',
  'virtual-office-page',
  'contact-page',
  'privacy-policy-page',
  'terms-page',
  'blog-posts',
  'faq-items',
  'pricing-plans',
  'meeting-rooms',
]);

function normalizeEntity<T>(entity: unknown): T {
  if (!entity || typeof entity !== 'object') {
    return entity as T;
  }

  const base = entity as Record<string, unknown>;
  const attributes = base.attributes as Record<string, unknown> | undefined;

  if (!attributes) {
    return base as T;
  }

  return {
    id: base.id,
    ...attributes,
  } as T;
}

export function unwrapCollection<T>(payload: unknown): T[] {
  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const root = payload as Record<string, unknown>;

  if (Array.isArray(root.data)) {
    return root.data.map((item) => normalizeEntity<T>(item));
  }

  if (Array.isArray(payload)) {
    return payload.map((item) => normalizeEntity<T>(item));
  }

  return [];
}

export function unwrapSingle<T>(payload: unknown): T | null {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const root = payload as Record<string, unknown>;

  if (root.data) {
    const data = root.data;
    if (Array.isArray(data)) {
      return data.length > 0 ? normalizeEntity<T>(data[0]) : null;
    }

    return normalizeEntity<T>(data);
  }

  return normalizeEntity<T>(payload);
}

export function getMediaUrl(media: unknown): string {
  if (!media) {
    return '';
  }

  if (typeof media === 'string') {
    if (media.startsWith('http://') || media.startsWith('https://')) {
      return media;
    }

    if (media.startsWith('/')) {
      return API_BASE_URL ? `${API_BASE_URL}${media}` : media;
    }

    return media;
  }

  const normalized = normalizeEntity<Record<string, unknown>>(media);
  const rawUrl = normalized?.url;

  if (typeof rawUrl !== 'string' || rawUrl.length === 0) {
    return '';
  }

  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl;
  }

  return API_BASE_URL ? `${API_BASE_URL}${rawUrl}` : rawUrl;
}

export function getMediaUrls(media: unknown): string[] {
  if (!Array.isArray(media)) {
    return [];
  }

  return media
    .map((item) => getMediaUrl(item))
    .filter((url) => typeof url === 'string' && url.length > 0);
}

function parseRequestPath(path: string) {
  const url = new URL(path.startsWith('/') ? path : `/${path}`, 'http://snapshot.local');
  return {
    pathname: url.pathname.replace(/^\/+/, ''),
    searchParams: url.searchParams,
  };
}

function shouldUseStaticSnapshot(path: string): boolean {
  if (!import.meta.env.PROD) {
    return false;
  }

  const { pathname, searchParams } = parseRequestPath(path);

  if (!STATIC_SNAPSHOT_PATHS.has(pathname)) {
    return false;
  }

  return searchParams.get('status') !== 'draft';
}

function compareValues(left: unknown, right: unknown, order: 'asc' | 'desc') {
  if (typeof left === 'number' || typeof right === 'number') {
    const numericLeft = Number(left ?? 0);
    const numericRight = Number(right ?? 0);
    return order === 'asc' ? numericLeft - numericRight : numericRight - numericLeft;
  }

  const stringLeft = String(left ?? '');
  const stringRight = String(right ?? '');
  return order === 'asc'
    ? stringLeft.localeCompare(stringRight)
    : stringRight.localeCompare(stringLeft);
}

function filterSnapshotCollection(
  items: Record<string, unknown>[],
  searchParams: URLSearchParams,
): Record<string, unknown>[] {
  const slug = searchParams.get('filters[$or][0][slug][$eq]');
  const documentId = searchParams.get('filters[$or][1][documentId][$eq]');
  const isFeatured = searchParams.get('filters[isFeatured][$eq]');
  const planType = searchParams.get('filters[planType][$eq]');
  const sort = searchParams.get('sort') || '';

  let filtered = items.filter((item) => {
    if (slug && String(item.slug ?? '') !== slug) {
      return false;
    }

    if (documentId && String(item.documentId ?? item.id ?? '') !== documentId) {
      return false;
    }

    if (isFeatured !== null && String(Boolean(item.isFeatured)) !== isFeatured) {
      return false;
    }

    if (planType && String(item.planType ?? '') !== planType) {
      return false;
    }

    return true;
  });

  if (sort.includes(':')) {
    const [field, rawOrder] = sort.split(':');
    const order = rawOrder === 'asc' ? 'asc' : 'desc';
    filtered = [...filtered].sort((left, right) => compareValues(left[field], right[field], order));
  }

  return filtered;
}

async function fetchStaticSnapshot<T>(path: string): Promise<T> {
  const { pathname, searchParams } = parseRequestPath(path);
  const response = await fetch(`${SNAPSHOT_BASE_URL}/${pathname}.json`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Static CMS snapshot request failed: ${response.status}`);
  }

  const payload = await response.json() as Record<string, unknown>;

  if (Array.isArray(payload.data)) {
    return {
      ...payload,
      data: filterSnapshotCollection(payload.data as Record<string, unknown>[], searchParams),
    } as T;
  }

  return payload as T;
}

export async function fetchApi<T>(path: string): Promise<T> {
  if (shouldUseStaticSnapshot(path)) {
    try {
      return await fetchStaticSnapshot<T>(path);
    } catch {
      // Fall back to the live API when static snapshots are not available locally.
    }
  }

  const url = `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function postApi<T>(path: string, body: unknown): Promise<T> {
  const url = `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = payload && typeof payload === 'object' && 'error' in payload
      ? String(payload.error)
      : `API request failed: ${response.status}`;
    throw new Error(errorMessage);
  }

  return payload as T;
}
