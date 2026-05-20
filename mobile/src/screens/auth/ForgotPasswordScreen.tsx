import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import { forgotMobilePassword } from '../../api/mobile-auth-api';
import type { AuthStackParamList } from '../../navigation/RootNavigator';
import { colors, radius, spacing, typography } from '../../theme';

type AuthNavigation = NativeStackNavigationProp<AuthStackParamList>;

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordScreen(): JSX.Element {
  const navigation = useNavigation<AuthNavigation>();
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setMessage('Enter your email address.');
      return;
    }

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setMessage('Enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await forgotMobilePassword(apiClient, { email: normalizedEmail });
      setMessage("If an account exists with that email, we've sent a password reset link.");
    } catch {
      setMessage("If an account exists with that email, we've sent a password reset link.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Account help</Text>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.subtitle}>Enter your email and we'll send a reset link if an account exists.</Text>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="you@example.com"
          placeholderTextColor={colors.mutedForeground}
          style={styles.input}
          textContentType="emailAddress"
          value={email}
        />
      </View>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Pressable accessibilityRole="button" disabled={isSubmitting} onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>{isSubmitting ? 'Sending…' : 'Send reset link'}</Text>
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
    color: colors.mutedForeground,
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
