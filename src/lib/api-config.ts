// P2-124: Validate frontend env vars at build/import time
import './env-validation';

// In dev mode, use relative URLs so requests go through the Vite proxy (see
// astro.config.mjs) and avoid cross-origin / CORS issues.  In production the
// env vars are typically empty so we also end up with the relative '/api' path.
const envBaseUrl = (import.meta.env.PUBLIC_API_URL || import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const DEFAULT_API_URL = import.meta.env.PROD ? envBaseUrl : '';
export const API_BASE_URL = DEFAULT_API_URL;
export const API_URL = API_BASE_URL
  ? (API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`)
  : '/api';
