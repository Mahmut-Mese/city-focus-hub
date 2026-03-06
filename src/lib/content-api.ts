const DEFAULT_API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';
const API_BASE_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');
const API_URL = API_BASE_URL
  ? (API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`)
  : '/api';

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

export async function fetchApi<T>(path: string): Promise<T> {
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
