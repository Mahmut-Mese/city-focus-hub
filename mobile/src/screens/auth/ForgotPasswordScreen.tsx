import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

export function ForgotPasswordScreen(): JSX.Element {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setMessage('Enter your email address to prepare a reset request.');
      return;
    }

    setMessage('Password reset email support will be connected in a later auth task. Reset links should open leadenhallworks://reset-password?token=...');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Account help</Text>
      <Text style={styles.title}>Forgot password</Text>
      <Text style={styles.subtitle}>Enter your email to request a reset link when backend reset endpoints are connected.</Text>

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

      <Pressable accessibilityRole="button" onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Prepare reset</Text>
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
});
