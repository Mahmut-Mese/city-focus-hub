import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { colors, radius, typography } from '@/theme';

const iconMap: Record<string, string> = {
  Wifi: '⌁',
  Users: '☷',
  Clock: '◷',
  LayoutGrid: '▦',
  CalendarDays: '◴',
  HeadphonesIcon: '◉',
  MapPin: '⌖',
  Mail: '✉',
  Phone: '☎',
  Star: '★',
  Check: '✓',
  Menu: '☰',
  User: '⌾',
  ArrowRight: '→',
  Play: '▷',
};

export type HomeIconProps = {
  name: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  style?: ViewStyle;
};

export function HomeIcon({
  name,
  size = 16,
  color = colors.foreground,
  backgroundColor,
  style,
}: HomeIconProps): JSX.Element {
  const symbol = iconMap[name] ?? '•';
  const boxSize = Math.max(24, size + 14);

  return (
    <View
      style={[
        styles.container,
        { width: boxSize, height: boxSize, borderRadius: radius.md, backgroundColor: backgroundColor ?? 'transparent' },
        style,
      ]}
      accessibilityElementsHidden
      importantForAccessibility="no"
    >
      <Text style={[styles.symbol, { color, fontSize: size }]}>{symbol}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    lineHeight: 22,
    textAlign: 'center',
  },
});
