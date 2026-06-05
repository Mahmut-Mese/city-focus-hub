import Constants from 'expo-constants';

type ExpoExtra = {
  apiUrl?: string;
};

function normalizeApiBaseUrl(url: string): string {
  return url.trim().replace(/\/api\/?$/i, '').replace(/\/+$/, '');
}

function getExpoExtraApiUrl(): string {
  const extra = Constants.expoConfig?.extra as ExpoExtra | undefined;
  return typeof extra?.apiUrl === 'string' ? extra.apiUrl : '';
}

export function getConfiguredApiBaseUrl(): string {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  const configuredUrl = typeof envUrl === 'string' && envUrl.trim() ? envUrl : getExpoExtraApiUrl();

  return configuredUrl ? normalizeApiBaseUrl(configuredUrl) : '';
}

export function getApiBaseUrl(): string {
  return getConfiguredApiBaseUrl();
}
