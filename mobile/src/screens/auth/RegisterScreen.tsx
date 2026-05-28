import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../auth/AuthProvider';
import { colors, radius, spacing, typography } from '../../theme';

export function RegisterScreen(): JSX.Element {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const normalizedName = name.trim();
    const normalizedEmail = email.trim();

    if (!normalizedName || !normalizedEmail || !password) {
      setError('Enter your name, email, and password.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await register({ name: normalizedName, email: normalizedEmail, password });
    } catch {
      setError('We could not create your account. Check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Join The Leadenhall Works</Text>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Register to manage bookings, invoices, and membership access.</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            autoCapitalize="words"
            editable={!isSubmitting}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={colors.mutedForeground}
            style={styles.input}
            textContentType="name"
            value={name}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            editable={!isSubmitting}
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="you@example.com"
            placeholderTextColor={colors.mutedForeground}
            style={styles.input}
            textContentType="emailAddress"
            value={email}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            autoCapitalize="none"
            editable={!isSubmitting}
            onChangeText={setPassword}
            placeholder="At least 8 characters"
            placeholderTextColor={colors.mutedForeground}
            secureTextEntry
            style={styles.input}
            textContentType="newPassword"
            value={password}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          accessibilityRole="button"
          disabled={isSubmitting}
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.button,
            (pressed || isSubmitting) && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{isSubmitting ? 'Creating account…' : 'Create account'}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  card: {
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
    marginBottom: spacing.md,
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
  error: {
    color: colors.destructive,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.tight,
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
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: colors.primaryForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    fontWeight: '700',
    lineHeight: typography.lineHeight.normal,
  },
});
