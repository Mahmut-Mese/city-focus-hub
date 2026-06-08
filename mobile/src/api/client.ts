export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export type ApiClientOptions = {
  baseUrl: string;
  getAccessToken?: () => Promise<string | null>;
  refreshAccessToken?: () => Promise<string | null>;
  onAuthExpired?: () => void;
};

export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  idempotencyKey?: string;
  timeoutMs?: number;
  skipAuth?: boolean;
};

type ApiErrorResponse = {
  error?: string;
  details?: unknown;
};

type ApiDataEnvelope<T> = {
  data: T;
};

const DEFAULT_TIMEOUT_MS = 30_000;

function joinUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

function isDataEnvelope<T>(value: T | ApiDataEnvelope<T>): value is ApiDataEnvelope<T> {
  return (
    typeof value === 'object'
    && value !== null
    && 'data' in value
    && Object.keys(value as Record<string, unknown>).length === 1
  );
}

async function parseJsonResponse(response: Response): Promise<unknown> {
  if (response.status === 204) {
    return undefined;
  }

  const text = await response.text();
  if (!text) {
    return undefined;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new ApiError('Invalid JSON response from server.', response.status);
  }
}

function getErrorMessage(payload: unknown, fallback: string): string {
  if (typeof payload === 'object' && payload !== null && 'error' in payload) {
    const error = (payload as ApiErrorResponse).error;
    if (typeof error === 'string' && error.trim()) {
      return error;
    }
  }

  return fallback;
}

function getErrorDetails(payload: unknown): unknown {
  if (typeof payload === 'object' && payload !== null && 'details' in payload) {
    return (payload as ApiErrorResponse).details;
  }

  return undefined;
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly getAccessToken?: () => Promise<string | null>;
  private readonly refreshAccessToken?: () => Promise<string | null>;
  private readonly onAuthExpired?: () => void;

  constructor(options: ApiClientOptions) {
    this.baseUrl = options.baseUrl;
    this.getAccessToken = options.getAccessToken;
    this.refreshAccessToken = options.refreshAccessToken;
    this.onAuthExpired = options.onAuthExpired;
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    return this.requestOnce<T>(path, options, false);
  }

  private async requestOnce<T>(path: string, options: RequestOptions, hasRetriedAfterRefresh: boolean, forcedAccessToken?: string): Promise<T> {
    const controller = new AbortController();
    const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const headers = await this.buildHeaders(options, forcedAccessToken);
      const response = await fetch(joinUrl(this.baseUrl, path), {
        method: options.method ?? 'GET',
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        signal: controller.signal,
      });

      const payload = await parseJsonResponse(response);

      if (response.ok) {
        if (isDataEnvelope<T>(payload as T | ApiDataEnvelope<T>)) {
          return (payload as ApiDataEnvelope<T>).data;
        }

        return payload as T;
      }

      if (response.status === 401 && !options.skipAuth && !hasRetriedAfterRefresh) {
        const refreshedToken = await this.refreshAccessToken?.();
        if (refreshedToken) {
          return this.requestOnce<T>(path, options, true, refreshedToken);
        }

        this.onAuthExpired?.();
      }

      throw new ApiError(
        getErrorMessage(payload, `Request failed with status ${response.status}.`),
        response.status,
        getErrorDetails(payload),
      );
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new ApiError('Request timed out.', 0);
      }

      throw new ApiError(error instanceof Error ? error.message : 'Network request failed.', 0);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async buildHeaders(options: RequestOptions, forcedAccessToken?: string): Promise<Record<string, string>> {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...options.headers,
    };

    if (options.body !== undefined && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    if (options.idempotencyKey) {
      headers['Idempotency-Key'] = options.idempotencyKey;
    }

    if (!options.skipAuth) {
      const accessToken = forcedAccessToken ?? await this.getAccessToken?.();
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return headers;
  }
}

export function createApiClient(options: ApiClientOptions): ApiClient {
  return new ApiClient(options);
}
