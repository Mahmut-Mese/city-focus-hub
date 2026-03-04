const DEFAULT_STRAPI_URL = 'http://localhost:3001';
const STRAPI_BASE_URL = (import.meta.env.VITE_STRAPI_URL || DEFAULT_STRAPI_URL).replace(/\/$/, '');
const STRAPI_API_URL = STRAPI_BASE_URL.endsWith('/api') ? STRAPI_BASE_URL : `${STRAPI_BASE_URL}/api`;

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
      return `${STRAPI_BASE_URL}${media}`;
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

  return `${STRAPI_BASE_URL}${rawUrl}`;
}

export function getMediaUrls(media: unknown): string[] {
  if (!Array.isArray(media)) {
    return [];
  }

  return media
    .map((item) => getMediaUrl(item))
    .filter((url) => typeof url === 'string' && url.length > 0);
}

export async function fetchStrapi<T>(path: string): Promise<T> {
  const token = import.meta.env.VITE_STRAPI_TOKEN as string | undefined;
  const url = `${STRAPI_API_URL}${path.startsWith('/') ? path : `/${path}`}`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
