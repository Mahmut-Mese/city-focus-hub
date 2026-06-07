import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing, typography } from '@/theme';

export type HomeSectionHeaderProps = {
  eyebrow?: string;
  kicker?: string;
  title?: string;
  centeredTitle?: boolean;
};

export function HomeSectionHeader({ eyebrow, kicker, title, centeredTitle = false }: HomeSectionHeaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      {(eyebrow || kicker) ? (
        <View style={styles.metaRow}>
          {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : <View />}
          {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}
        </View>
      ) : null}
      {title ? <Text style={[styles.title, centeredTitle ? styles.centered : null]}>{title}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  metaRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eyebrow: {
    borderColor: colors.border,
    borderRadius: radius.full,
    borderWidth: 1,
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    letterSpacing: 2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    textTransform: 'uppercase',
  },
  kicker: {
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    maxWidth: '100%',
    flexShrink: 1,
  },
  centered: {
    textAlign: 'center',
  },
});