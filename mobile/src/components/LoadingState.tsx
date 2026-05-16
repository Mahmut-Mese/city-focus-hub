import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

export function LoadingState({ message = 'Loading…' }: { message?: string }): JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.xl,
  },
  message: {
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.tight,
    textAlign: 'center',
  },
});
