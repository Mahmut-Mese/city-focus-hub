import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { colors, radius, spacing } from '@/theme';

export type HomeCardProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padded?: boolean;
  accessibilityLabel?: string;
};

export function HomeCard({ children, onPress, style, padded = true, accessibilityLabel }: HomeCardProps): JSX.Element {
  const content = <View style={[styles.card, padded ? styles.padded : null, style]}>{children}</View>;

  if (!onPress) {
    return content;
  }

  return (
    <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress}>
      {({ pressed }) => <View style={pressed ? styles.pressed : null}>{content}</View>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  padded: {
    padding: spacing.lg,
  },
  pressed: {
    opacity: 0.82,
  },
});
