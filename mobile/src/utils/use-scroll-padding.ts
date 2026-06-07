import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../theme';

export function useScrollBottomPadding(extraPadding: number = spacing['3xl']): { paddingBottom: number } {
  const insets = useSafeAreaInsets();

  return useMemo(
    () => ({ paddingBottom: Math.max(spacing['3xl'], insets.bottom + extraPadding) }),
    [extraPadding, insets.bottom],
  );
}
