import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/RootNavigator';
import { colors, radius, spacing, typography } from '../../theme';

type ResetPasswordScreenProps = NativeStackScreenProps<AuthStackParamList, 'ResetPassword'>;

export function ResetPasswordScreen({ route }: ResetPasswordScreenProps): JSX.Element {
  const token = route.params?.token ?? '';
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!token) {
      setMessage('Open this screen from a reset link such as leadenhallworks://reset-password?token=...');
      return;
    }

    if (!password) {
      setMessage('Enter a new password to prepare the reset request.');
      return;
    }

    setMessage('Password reset submission will be connected when mobile reset endpoints are added.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>Secure reset</Text>
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>Deep links should open this screen with leadenhallworks://reset-password?token=...</Text>

      <View style={styles.tokenBox}>
        <Text style={styles.tokenLabel}>Reset token</Text>
        <Text style={styles.tokenValue}>{token ? 'Token received from deep link.' : 'No token detected yet.'}</Text>
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>New password</Text>
        <TextInput
          autoCapitalize="none"
          onChangeText={setPassword}
          placeholder="New password"
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry
          style={styles.input}
          textContentType="newPassword"
          value={password}
        />
      </View>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <Pressable accessibilityRole="button" onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Prepare password reset</Text>
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
