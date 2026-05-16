import React from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import { useAuth } from '../../auth/AuthProvider';

export function SettingsScreen(): JSX.Element {
  const { logout } = useAuth();
  const confirmLogout = () => Alert.alert('Sign out?', 'You will need to sign in again.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Sign out', style: 'destructive', onPress: () => void logout() },
  ]);

  return (
    <View style={{ flex: 1, padding: 24, gap: 16 }}>
      <Text>Account settings</Text>
      <Text>Password changes and notification preferences will be connected later.</Text>
      <Pressable accessibilityRole="button" onPress={confirmLogout}>
        <Text>Sign out</Text>
      </Pressable>
    </View>
  );
}
