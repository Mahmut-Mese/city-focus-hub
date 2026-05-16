import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform, Linking } from 'react-native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { AuthProvider } from './src/auth/AuthProvider';
import { RootNavigator, rootNavigationRef } from './src/navigation/RootNavigator';
import { addNotificationResponseHandler } from './src/notifications/notification-routing';

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

export default function App() {
  // State to manage version checking and possible block
  const [isCheckingVersion, setIsCheckingVersion] = useState(true);
  const [blockedPolicy, setBlockedPolicy] = useState<VersionPolicy | null>(null);

  // Fetch version policy on mount
  useEffect(() => {
    const fetchPolicy = async () => {
      const baseUrl = process.env.EXPO_PUBLIC_API_URL || Constants.expoConfig?.extra?.apiUrl || 'http://localhost:3001';
      const currentVersion = Constants.expoConfig?.version || '0.0.0';
      const url = `${baseUrl}/api/mobile-app/version-policy?platform=${Platform.OS}&version=${currentVersion}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch version policy: ${response.status}`);
        }
        const policy: VersionPolicy = await response.json();
        if (compareVersions(currentVersion, policy.minSupportedVersion) < 0) {
          setBlockedPolicy(policy);
        } else {
          setBlockedPolicy(null);
        }
      } catch {
        // On any error, allow app to open normally
        setBlockedPolicy(null);
      } finally {
        setIsCheckingVersion(false);
      }
    };
    fetchPolicy();
  }, []);

  // Notification response handler (kept unchanged)
  useEffect(() => {
    const subscription = addNotificationResponseHandler(rootNavigationRef);
    return () => {
      subscription.remove();
    };
  }, []);

  // Render while checking version
  if (isCheckingVersion) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Checking app version...</Text>
      </View>
    );
  }

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
