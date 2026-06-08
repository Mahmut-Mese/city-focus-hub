import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform, Linking } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { AuthProvider } from './src/auth/AuthProvider';
import { RootNavigator, rootNavigationRef } from './src/navigation/RootNavigator';
import { addNotificationResponseHandler } from './src/notifications/notification-routing';
import { getApiBaseUrl } from './src/config/api';
import { createApiClient } from './src/api/client';
import { preloadPublicContent } from './src/api/content-api';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function compareVersions(v1: string, v2: string): number {
  const parse = (value: string): number[] => {
    const core = (value.split(/[+-]/)[0] ?? '0').trim();
    return core.split('.').map((segment) => {
      const parsed = Number.parseInt(segment, 10);
      return Number.isFinite(parsed) ? parsed : 0;
    });
  };

  const parts1 = parse(v1);
  const parts2 = parse(v2);
  const len = Math.max(parts1.length, parts2.length);

  for (let i = 0; i < len; i += 1) {
    const a = parts1[i] ?? 0;
    const b = parts2[i] ?? 0;
    if (a > b) return 1;
    if (a < b) return -1;
  }

  return 0;
}

const VERSION_POLICY_TIMEOUT_MS = 2500;

async function fetchVersionPolicy(url: string): Promise<VersionPolicy> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), VERSION_POLICY_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Failed to fetch version policy: ${response.status}`);
    }

    return response.json() as Promise<VersionPolicy>;
  } finally {
    clearTimeout(timeoutId);
  }
}

export default function App() {
  const [blockedPolicy, setBlockedPolicy] = useState<VersionPolicy | null>(null);

  // Fetch version policy on mount without blocking app startup.
  useEffect(() => {
    const fetchPolicy = async () => {
      const baseUrl = getApiBaseUrl();
      if (!baseUrl) return;

      const currentVersion = Constants.expoConfig?.version || '0.0.0';
      const url = `${baseUrl}/api/mobile-app/version-policy?platform=${Platform.OS}&version=${currentVersion}`;
      try {
        const policy = await fetchVersionPolicy(url);
        if (compareVersions(currentVersion, policy.minSupportedVersion) < 0) {
          setBlockedPolicy(policy);
        } else {
          setBlockedPolicy(null);
        }
      } catch {
        // On any error, allow app to open normally
        setBlockedPolicy(null);
      }
    };
    fetchPolicy();
  }, []);

  useEffect(() => {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) return;

    const apiClient = createApiClient({ baseUrl });
    preloadPublicContent(apiClient);
  }, []);

  // Notification response handler (kept unchanged)
  useEffect(() => {
    const subscription = addNotificationResponseHandler(rootNavigationRef);
    return () => {
      subscription.remove();
    };
  }, []);

  // Render blocked UI if policy requires update
  if (blockedPolicy) {
    const { storeUrl, message, minSupportedVersion } = blockedPolicy;
    const openStore = async () => {
      if (storeUrl) {
        const can = await Linking.canOpenURL(storeUrl);
        if (can) {
          Linking.openURL(storeUrl);
        }
      }
    };
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Update required</Text>
        {message ? <Text style={{ marginBottom: 10 }}>{message}</Text> : null}
        <Text>Current version: {Constants.expoConfig?.version || '0.0.0'}</Text>
        <Text>Minimum supported version: {minSupportedVersion}</Text>
        {storeUrl ? <Button title="Open app store" onPress={openStore} /> : null}
      </View>
    );
  }

  // Normal authenticated app flow
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

interface VersionPolicy {
  minSupportedVersion: string;
  storeUrl?: string;
  message?: string;
}
