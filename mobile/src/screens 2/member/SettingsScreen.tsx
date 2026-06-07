import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { changeMobilePassword } from '../../api/mobile-auth-api';
import { useAuth } from '../../auth/AuthProvider';
import { getStoredSession } from '../../auth/secure-storage';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

export function SettingsScreen(): JSX.Element {
  const { logout, refreshSession } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const apiClient = useMemo(() => createApiClient({
    baseUrl: getApiBaseUrl(),
    getAccessToken: async () => (await getStoredSession()).accessToken,
    refreshAccessToken: async () => {
      await refreshSession();
      return (await getStoredSession()).accessToken;
    },
  }), [refreshSession]);

  const confirmLogout = () => Alert.alert('Sign out?', 'You will need to sign in again.', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Sign out', style: 'destructive', onPress: () => void logout() },
  ]);

  const submitChangePassword = async () => {
    const current = currentPassword.trim();
    const next = newPassword.trim();
    const confirmed = confirmPassword.trim();

    if (!current || !next || !confirmed) {
      setMessage('All password fields are required.');
      return;
    }

    if (next.length < 8) {
      setMessage('New password must be at least 8 characters.');
      return;
    }

    if (next !== confirmed) {
      setMessage('New password and confirmation do not match.');
      return;
    }

    setIsSaving(true);
    setMessage(null);
    try {
      await changeMobilePassword(apiClient, {
        currentPassword: current,
        newPassword: next,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage('Password updated successfully.');
    } catch {
      setMessage('Unable to change password. Please check your current password and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmChangePassword = () => {
    Alert.alert(
      'Update password?',
      'You may need to sign in again on other devices after updating your password.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Update password', style: 'default', onPress: () => void submitChangePassword() },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Account settings</Text>
        <Text style={styles.subtitle}>Update your password securely.</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Current password</Text>
          <TextInput
            autoCapitalize="none"
            editable={!isSaving}
            onChangeText={setCurrentPassword}
            placeholder="Enter current password"
            placeholderTextColor={colors.mutedForeground}
            secureTextEntry
            style={styles.input}
            textContentType="password"
            value={currentPassword}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>New password</Text>
          <TextInput
            autoCapitalize="none"
            editable={!isSaving}
            onChangeText={setNewPassword}
            placeholder="At least 8 characters"
            placeholderTextColor={colors.mutedForeground}
            secureTextEntry
            style={styles.input}
            textContentType="newPassword"
            value={newPassword}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Confirm new password</Text>
          <TextInput
            autoCapitalize="none"
            editable={!isSaving}
            onChangeText={setConfirmPassword}
            placeholder="Re-enter new password"
            placeholderTextColor={colors.mutedForeground}
            secureTextEntry
            style={styles.input}
            textContentType="newPassword"
            value={confirmPassword}
          />
        </View>

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <Pressable
          accessibilityRole="button"
          disabled={isSaving}
          onPress={confirmChangePassword}
          style={[styles.button, isSaving && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>{isSaving ? 'Updating…' : 'Update password'}</Text>
        </Pressable>

        <Pressable accessibilityRole="button" onPress={confirmLogout} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl },
  card: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['2xl'], fontWeight: '700', lineHeight: 32 },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  fieldGroup: { gap: spacing.xs },
  label: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '600', lineHeight: typography.lineHeight.tight },
  input: { borderColor: colors.input, borderRadius: radius.md, borderWidth: 1, color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, minHeight: 48, paddingHorizontal: spacing.md },
  message: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.normal },
  button: { alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, justifyContent: 'center', minHeight: 48, paddingHorizontal: spacing.lg },
  buttonDisabled: { opacity: 0.65 },
  buttonText: { color: colors.primaryForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  signOutButton: { alignItems: 'center', borderColor: colors.border, borderRadius: radius.md, borderWidth: 1, justifyContent: 'center', minHeight: 48, paddingHorizontal: spacing.lg },
  signOutText: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '600', lineHeight: typography.lineHeight.normal },
});
