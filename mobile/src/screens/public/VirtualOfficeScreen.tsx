import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { type ContentPage, fetchContentPage } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

function getString(source: ContentPage | null, key: string, fallback: string): string {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function getStringArray(source: ContentPage | null, key: string, fallback: string[]): string[] {
  const value = source?.[key];
  if (!Array.isArray(value)) return fallback;
  const items = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
  return items.length > 0 ? items : fallback;
}

export function VirtualOfficeScreen(): JSX.Element {
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [content, setContent] = useState<ContentPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const page = await fetchContentPage(apiClient, 'virtual-office-page');
      setContent(page);
    } catch {
      setError('We could not load virtual office content.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  if (isLoading) return <LoadingState message="Loading virtual office content…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(content, 'heroTitle', 'Virtual office services');
  const heroSubtitle = getString(content, 'heroSubtitle', 'A professional City of London business presence with practical workspace support.');
  const sectionTitle = getString(content, 'featuresTitle', 'What is included');
  const features = getStringArray(content, 'features', [
    'Professional business address support',
    'Mail handling options',
    'Access to meeting room booking support',
  ]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Virtual office</Text>
        <Text style={styles.title}>{heroTitle}</Text>
        <Text style={styles.subtitle}>{heroSubtitle}</Text>
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{sectionTitle}</Text>
        {features.map((feature) => (
          <View key={feature} style={styles.bulletRow}>
            <View style={styles.bullet} />
            <Text style={styles.body}>{feature}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.lg },
  heroCard: { backgroundColor: colors.secondary, borderRadius: radius.lg, gap: spacing.md, padding: spacing.xl },
  eyebrow: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, letterSpacing: 0.4, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  sectionCard: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  bulletRow: { alignItems: 'flex-start', flexDirection: 'row', gap: spacing.sm },
  bullet: { backgroundColor: colors.primary, borderRadius: radius.full, height: 8, marginTop: 8, width: 8 },
  body: { color: colors.foreground, flex: 1, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
});