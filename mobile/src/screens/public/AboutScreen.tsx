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

export function AboutScreen(): JSX.Element {
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [content, setContent] = useState<ContentPage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const page = await fetchContentPage(apiClient, 'about-page');
      setContent(page);
    } catch {
      setError('We could not load the about page content.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  if (isLoading) {
    return <LoadingState message="Loading about content…" />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadContent} />;
  }

  const heroTitle = getString(content, 'heroTitle', 'About The Leadenhall Works');
  const heroSubtitle = getString(content, 'heroSubtitle', 'A professional workspace designed around flexibility, focus, and service.');
  const storyTitle = getString(content, 'storyTitle', 'Our story');
  const storyBody = getString(content, 'storyBody', 'The Leadenhall Works brings together coworking, private offices, and meeting rooms for teams and professionals in the City of London.');
  const amenitiesTitle = getString(content, 'amenitiesTitle', 'What members can expect');
  const amenitiesBody = getString(content, 'amenitiesBody', 'Thoughtful workspace amenities, bookable rooms, and a central location that supports productive workdays.');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>About</Text>
        <Text style={styles.title}>{heroTitle}</Text>
        <Text style={styles.subtitle}>{heroSubtitle}</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{storyTitle}</Text>
        <Text style={styles.body}>{storyBody}</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{amenitiesTitle}</Text>
        <Text style={styles.body}>{amenitiesBody}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  heroCard: {
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    gap: spacing.md,
    padding: spacing.xl,
  },
  eyebrow: {
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    letterSpacing: 0.4,
    lineHeight: typography.lineHeight.tight,
    textTransform: 'uppercase',
  },
  title: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize['3xl'],
    fontWeight: '700',
    lineHeight: 38,
  },
  subtitle: {
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
  },
  sectionCard: {
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg,
  },
  sectionTitle: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    lineHeight: typography.lineHeight.normal,
  },
  body: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
  },
});
