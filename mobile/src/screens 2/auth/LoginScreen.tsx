import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../auth/AuthProvider';
import type { AuthStackParamList } from '../../navigation/RootNavigator';
import { colors, radius, spacing, typography } from '../../theme';

type AuthNavigation = NativeStackNavigationProp<AuthStackParamList>;

const E2E_AUTO_LOGIN_ENABLED = process.env.EXPO_PUBLIC_E2E_AUTO_LOGIN === '1';

export function LoginScreen(): JSX.Element {
  const navigation = useNavigation<AuthNavigation>();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockRef = useRef(false);
  const autoLoginTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoLoginTriggeredRef = useRef(false);

  const handleSubmit = async () => {
    if (submitLockRef.current) {
      return;
    }

    const normalizedEmail = email.trim();

    if (!normalizedEmail || !password) {
      setError('Enter your email and password.');
      return;
    }

    submitLockRef.current = true;
    setIsSubmitting(true);
    setError(null);

    try {
      await login(normalizedEmail, password);
      setTimeout(() => {
        navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: 'Member' }],
        });
      }, 100);
    } catch {
      setError('We could not sign you in. Check your details and try again.');
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!E2E_AUTO_LOGIN_ENABLED) {
      return;
    }

    if (autoLoginTimerRef.current) {
      clearTimeout(autoLoginTimerRef.current);
      autoLoginTimerRef.current = null;
    }

    const normalizedEmail = email.trim();
    if (!normalizedEmail || !password || autoLoginTriggeredRef.current || isSubmitting) {
      return () => {
        if (autoLoginTimerRef.current) {
          clearTimeout(autoLoginTimerRef.current);
          autoLoginTimerRef.current = null;
        }
      };
    }

    autoLoginTimerRef.current = setTimeout(() => {
      if (autoLoginTriggeredRef.current) {
        return;
      }

      autoLoginTriggeredRef.current = true;
      void handleSubmit();
    }, 2500);

    return () => {
      if (autoLoginTimerRef.current) {
        clearTimeout(autoLoginTimerRef.current);
        autoLoginTimerRef.current = null;
      }
    };
  }, [email, password, isSubmitting]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.eyebrow}>Member access</Text>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Access bookings, invoices, and your membership.</Text>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            autoComplete="email"
            editable={!isSubmitting}
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="you@example.com" accessibilityLabel="Login email"
            placeholderTextColor={colors.mutedForeground}
            style={styles.input}
            textContentType="emailAddress"
            value={email}
            testID="login-email"
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            autoCapitalize="none"
            editable={!isSubmitting}
            onChangeText={setPassword}
            placeholder="Password" accessibilityLabel="Login password"
            placeholderTextColor={colors.mutedForeground}
            secureTextEntry
            returnKeyType="go"
            onSubmitEditing={() => void handleSubmit()}
            style={styles.input}
            textContentType="password"
            value={password}
            testID="login-password"
          />
        </View>

<Pressable
  accessibilityRole="button"
  accessibilityLabel="Forgot password"
  testID="forgot-password-link"
  accessible={true}
  disabled={isSubmitting}
  onPress={() => navigation.navigate('ForgotPassword')}
  style={styles.textLinkButton}
        >
          <Text style={styles.textLink}>Forgot password?</Text>
        </Pressable>

        {error ? <Text style={styles.error}>{error}</Text> : null}

<Pressable
            accessibilityRole="button"
            disabled={isSubmitting}
            onPress={() => void handleSubmit()} accessibilityLabel="Submit login"
            testID="submit-login" accessible={true}
            style={({ pressed }) => [
              styles.button,
              (pressed || isSubmitting) && styles.buttonPressed,
            ]}
          >
          <Text style={styles.buttonText}>{isSubmitting ? 'Signing in…' : 'Sign in'}</Text>
        </Pressable>

        <View style={styles.registerRow}>
          <Text style={styles.registerPrompt}>No account yet?</Text>
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Create account"
  testID="create-account-link"
  accessible={true}
  disabled={isSubmitting}
  onPress={() => navigation.navigate('Register')}
  style={styles.registerLinkButton}
          >
            <Text style={styles.registerLink}>Create account</Text>
          </Pressable>
        </View>
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
  textLinkButton: {
    alignSelf: 'flex-start',
  },
  textLink: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    lineHeight: typography.lineHeight.tight,
    textDecorationLine: 'underline',
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
  registerRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  registerPrompt: {
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.tight,
  },
  registerLinkButton: {
    paddingVertical: spacing.xs,
  },
  registerLink: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    lineHeight: typography.lineHeight.tight,
    textDecorationLine: 'underline',
  },
});