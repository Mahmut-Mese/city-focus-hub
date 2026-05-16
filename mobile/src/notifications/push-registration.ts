import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

import { ApiClient, createApiClient } from '../api/client';
import {
  deletePushToken,
  registerPushToken,
  type PushPlatform,
} from '../api/member-api';
import { getStoredSession } from '../auth/secure-storage';

export type PushRegistrationStatus =
  | 'registered'
  | 'permission_denied'
  | 'unsupported'
  | 'unavailable'
  | 'failed';

export type PushRegistrationResult = {
  status: PushRegistrationStatus;
  token?: string;
  platform?: PushPlatform;
  deviceId?: string;
  sessionId?: string | null;
  reason?: string;
};

export function getApiBaseUrl(): string {
  return process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';
}

export function createMemberApiClient(
  getAccessToken: () => Promise<string | null> = async () => (await getStoredSession()).accessToken,
  refreshAccessToken?: () => Promise<string | null>,
): ApiClient {
  return createApiClient({
    baseUrl: getApiBaseUrl(),
    getAccessToken,
    refreshAccessToken,
  });
}

export function getDeviceId(): string {
  const installationId =
    (Constants as unknown as { installationId?: string }).installationId;
  const sessionId = (Constants as unknown as { sessionId?: string }).sessionId;
  const deviceName = Constants.deviceName ?? '';
  const candidate = installationId || sessionId || deviceName;
  return candidate ? String(candidate) : 'unknown-device';
}

export function isNativePushSupported(): boolean {
  return Platform.OS === 'ios' || Platform.OS === 'android';
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNativePushSupported()) {
    return false;
  }

  try {
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) {
      return true;
    }

    if (
      current.status === 'denied'
      && current.canAskAgain === false
    ) {
      return false;
    }

    const next = await Notifications.requestPermissionsAsync();
    return Boolean(next.granted);
  } catch {
    return false;
  }
}

function resolveProjectId(): string | undefined {
  const expoConfigExtra =
    (Constants.expoConfig as { extra?: { eas?: { projectId?: string } } } | null | undefined)?.extra;
  const fromExpoConfig = expoConfigExtra?.eas?.projectId;
  if (fromExpoConfig) {
    return fromExpoConfig;
  }

  const easConfig = (Constants as unknown as { easConfig?: { projectId?: string } }).easConfig;
  if (easConfig?.projectId) {
    return easConfig.projectId;
  }

  return undefined;
}

async function fetchExpoPushToken(): Promise<string | null> {
  try {
    const projectId = resolveProjectId();
    const tokenResponse = projectId
      ? await Notifications.getExpoPushTokenAsync({ projectId })
      : await Notifications.getExpoPushTokenAsync();
    if (tokenResponse && typeof tokenResponse.data === 'string' && tokenResponse.data.length > 0) {
      return tokenResponse.data;
    }
    return null;
  } catch {
    return null;
  }
}

export type RegisterDeviceForPushOptions = {
  apiClient?: ApiClient;
  accessToken?: string | null;
};

export async function registerDeviceForPushNotifications(
  options: RegisterDeviceForPushOptions = {},
): Promise<PushRegistrationResult> {
  if (!isNativePushSupported()) {
    return { status: 'unsupported', reason: 'platform_not_supported' };
  }

  const platform = Platform.OS as PushPlatform;

  const granted = await requestNotificationPermission();
  if (!granted) {
    return { status: 'permission_denied', platform };
  }

  const token = await fetchExpoPushToken();
  if (!token) {
    return { status: 'unavailable', platform, reason: 'no_token' };
  }

  const deviceId = getDeviceId();

  let sessionId: string | null = null;
  try {
    const session = await getStoredSession();
    sessionId = session.sessionId ?? null;
  } catch {
    sessionId = null;
  }

  const apiClient = options.apiClient ?? createMemberApiClient();

  try {
    await registerPushToken(apiClient, {
      token,
      platform,
      deviceId,
      sessionId: sessionId ?? undefined,
    });
    return {
      status: 'registered',
      token,
      platform,
      deviceId,
      sessionId,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'register_failed';
    return {
      status: 'failed',
      platform,
      deviceId,
      sessionId,
      reason,
    };
  }
}

export type UnregisterDevicePushTokenOptions = {
  apiClient?: ApiClient;
  accessToken?: string | null;
  token?: string | null;
  sessionId?: string | null;
};

export async function unregisterDevicePushToken(
  options: UnregisterDevicePushTokenOptions = {},
): Promise<void> {
  let token = options.token ?? null;
  let sessionId = options.sessionId ?? null;

  if (!sessionId) {
    try {
      const session = await getStoredSession();
      sessionId = session.sessionId ?? null;
    } catch {
      sessionId = null;
    }
  }

  if (!token && isNativePushSupported()) {
    try {
      const current = await Notifications.getPermissionsAsync();
      if (current.granted) {
        token = await fetchExpoPushToken();
      }
    } catch {
      token = null;
    }
  }

  if (!token && !sessionId) {
    return;
  }

  const apiClient = options.apiClient ?? createMemberApiClient();

  try {
    await deletePushToken(apiClient, {
      token: token ?? undefined,
      sessionId: sessionId ?? undefined,
    });
  } catch {
    // Swallow errors so logout/cleanup flows are not blocked by a failed push unregister.
  }
}
