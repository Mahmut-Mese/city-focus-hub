import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import { getApiBaseUrl } from '../../config/api';
import { resetMobilePassword } from '../../api/mobile-auth-api';
import type { AuthStackParamList } from '../../navigation/RootNavigator';
import { colors, radius, spacing, typography } from '../../theme';

type ResetPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;
type AuthNavigation = NativeStackNavigationProp<AuthStackParamList>;


export function ResetPasswordScreen({ route }: ResetPasswordScreenProps): JSX.Element {
  const navigation = useNavigation<AuthNavigation>();
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const token = route.params?.token ?? '';
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!token) {
      setMessage('No reset token detected. Request a new password reset link.');
      return;
    }

    if (!newPassword) {
      setMessage('Enter a new password.');
      return;
    }

    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await resetMobilePassword(apiClient, {
        token,
        newPassword,
      });
      setIsSuccess(true);
      setNewPassword('');
      setConfirmPassword('');
      setMessage('Password reset successful.');
    } catch (error) {
      const fallbackMessage = 'Unable to reset password. The link may be invalid or expired.';
      if (error instanceof Error && error.message) {
        setMessage(error.message);
      } else {
        setMessage(fallbackMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Secure reset</Text>
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>Set a new password for your account.</Text>

      <View style={styles.tokenBox}>
        <Text style={styles.tokenLabel}>Reset link</Text>
        <Text style={styles.tokenValue}>{token ? 'Reset link received.' : 'No reset token detected.'}</Text>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>New password</Text>
        <TextInput
          autoCapitalize="none"
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
          onChangeText={setConfirmPassword}
          placeholder="Confirm new password"
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry
          style={styles.input}
          textContentType="newPassword"
          value={confirmPassword}
        />
      </View>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Pressable accessibilityRole="button" disabled={isSubmitting || isSuccess} onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{isSubmitting ? 'Resetting…' : 'Reset password'}</Text>
      </Pressable>

      <Pressable accessibilityRole="button" disabled={isSubmitting} onPress={() => navigation.navigate('Login')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.md,
  },
  eyebrow: {
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    letterSpacing: 0.4,
    lineHeight: typography.lineHeight.tight,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize['3xl'],
    fontWeight: '700',
    lineHeight: 38,
  },
  subtitle: {
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
  },
  tokenBox: {
    backgroundColor: colors.muted,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  tokenLabel: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    lineHeight: typography.lineHeight.tight,
  },
  tokenValue: {
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.tight,
  },
  fieldGroup: {
    gap: spacing.xs,
  },
  label: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    lineHeight: typography.lineHeight.tight,
  },
  input: {
    borderColor: colors.input,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    minHeight: 48,
    paddingHorizontal: spacing.md,
  },
  message: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.normal,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    minHeight: 48,
    justifyContent: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  buttonText: {
    color: colors.primaryForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    fontWeight: '700',
    lineHeight: typography.lineHeight.normal,
  },
  backButton: {
    alignItems: 'center',
    minHeight: 40,
    justifyContent: 'center',
  },
  backButtonText: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    lineHeight: typography.lineHeight.tight,
    textDecorationLine: 'underline',
  },
});
