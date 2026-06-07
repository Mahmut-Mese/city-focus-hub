import { Image, StyleSheet, View, type ImageStyle, type ViewStyle } from 'react-native';
import { colors, radius } from '@/theme';

function isValidRemoteUri(uri: string | undefined): uri is string {
  return typeof uri === 'string' && (uri.startsWith('http://') || uri.startsWith('https://'));
}

export type HomeImageProps = {
  uri?: string;
  accessibilityLabel: string;
  style?: ImageStyle;
  containerStyle?: ViewStyle;
  resizeMode?: 'cover' | 'contain';
};

export function HomeImage({
  uri,
  accessibilityLabel,
  style,
  containerStyle,
  resizeMode = 'cover',
}: HomeImageProps): JSX.Element {
  return (
    <View style={[styles.container, containerStyle]}>
      {isValidRemoteUri(uri) ? (
        <Image source={{ uri }} accessibilityLabel={accessibilityLabel} resizeMode={resizeMode} style={[styles.image, style]} />
      ) : (
        <View accessibilityLabel={accessibilityLabel} style={[styles.fallback, style]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  fallback: {
    backgroundColor: colors.secondary,
    height: '100%',
    width: '100%',
  },
});
