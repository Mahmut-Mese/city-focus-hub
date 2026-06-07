export const colors = {
  primary: '#141414',
  primaryForeground: '#FFFFFF',
  background: '#FFFFFF',
  foreground: '#141414',
  secondary: '#F5F5F5',
  muted: '#F5F5F5',
  accent: '#F5F5F5',
  border: '#E5E5E5',
  input: '#E5E5E5',
  mutedForeground: '#737373',
  destructive: '#F03D3D',
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
} as const;

export const typography = {
  fontFamily: {
    sans: 'System',
    editorial: 'Georgia',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
  lineHeight: {
    tight: 20,
    normal: 24,
    relaxed: 28,
  },
} as const;

export const theme = {
  colors,
  radius,
  spacing,
  typography,
} as const;

export type AppTheme = typeof theme;
export type AppColors = typeof colors;