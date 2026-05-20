import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';
import { HomeIcon } from './HomeIcon';

export type HomeChipProps = {
  icon?: string;
  label: string;
  inverted?: boolean;
};

export function HomeChip({ icon = 'Clock', label, inverted = false }: HomeChipProps): JSX.Element {
  return (
    <View style={[styles.container, inverted ? styles.inverted : styles.default]}>
      <HomeIcon name={icon} size={12} color={inverted ? colors.primaryForeground : colors.foreground} />
      <Text style={[styles.label, inverted ? styles.invertedLabel : styles.defaultLabel]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: radius.full,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  default: {
    backgroundColor: colors.background,
    borderColor: colors.border,
  },
  inverted: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderColor: 'rgba(255,255,255,0.25)',
  },
  label: {
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.tight,
  },
  defaultLabel: {
    color: colors.foreground,
  },
  invertedLabel: {
    color: colors.primaryForeground,
  },
});
