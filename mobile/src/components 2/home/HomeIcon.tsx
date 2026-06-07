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

  if (name === 'User') {
    const strokeWidth = Math.max(2, Math.round(size / 9));
    const headSize = size * 0.48;
    const shoulderWidth = size * 0.9;
    const shoulderHeight = size * 0.44;

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
        <View style={[styles.userIcon, { width: size, height: size }]}>
          <View
            style={[
              styles.userHead,
              {
                borderColor: color,
                borderRadius: headSize / 2,
                borderWidth: strokeWidth,
                height: headSize,
                left: (size - headSize) / 2,
                top: 0,
                width: headSize,
              },
            ]}
          />
          <View
            style={[
              styles.userShoulders,
              {
                borderColor: color,
                borderTopLeftRadius: shoulderWidth / 2,
                borderTopRightRadius: shoulderWidth / 2,
                borderWidth: strokeWidth,
                height: shoulderHeight,
                left: (size - shoulderWidth) / 2,
                top: size * 0.56,
                width: shoulderWidth,
              },
            ]}
          />
        </View>
      </View>
    );
  }

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
  userIcon: {
    position: 'relative',
  },
  userHead: {
    position: 'absolute',
  },
  userShoulders: {
    borderBottomWidth: 0,
    position: 'absolute',
  },
});
