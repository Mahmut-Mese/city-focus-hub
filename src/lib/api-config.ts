const DEFAULT_API_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';
export const API_BASE_URL = (import.meta.env.PUBLIC_API_URL || import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/$/, '');
export const API_URL = API_BASE_URL
  ? (API_BASE_URL.endsWith('/api') ? API_BASE_URL : `${API_BASE_URL}/api`)
  : '/api';
