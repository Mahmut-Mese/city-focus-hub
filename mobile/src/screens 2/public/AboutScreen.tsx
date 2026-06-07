import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { createApiClient } from '../../api/client';
import { type ContentPage, fetchContentPage, getMediaUrl } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

function getString(source: ContentPage | null, key: string, fallback: string): string {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function getParagraphs(source: ContentPage | null): string[] {
  const value = source?.storyParagraphs;
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

type ListItem = {
  title: string;
  description: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function getFirstString(record: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === 'string' && value.trim()) {
      return value;
    }
  }
  return '';
}

function parseMixedItems(source: ContentPage | null, key: string): ListItem[] {
  const value = source?.[key];
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item): ListItem | null => {
      if (typeof item === 'string' && item.trim()) {
        return { title: item, description: '' };
      }

      const record = asRecord(item);
      if (!record) {
        return null;
      }

      const title = getFirstString(record, ['title', 'name', 'label']);
      const description = getFirstString(record, ['description', 'body', 'text']);
      if (!title && !description) {
        return null;
      }

      return { title, description };
    })
    .filter((item): item is ListItem => item !== null);
}

export function AboutScreen(): JSX.Element {
  const apiBaseUrl = getApiBaseUrl();
  const apiClient = useMemo(() => createApiClient({ baseUrl: apiBaseUrl }), [apiBaseUrl]);
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
  const storyParagraphs = getParagraphs(content);
  const whyChooseTitle = getString(content, 'whyChooseTitle', 'Why choose us');
  const whyChooseItems = parseMixedItems(content, 'whyChooseItems');
  const amenitiesTitle = getString(content, 'amenitiesTitle', 'What members can expect');
  const amenitiesBody = getString(content, 'amenitiesBody', 'Thoughtful workspace amenities, bookable rooms, and a central location that supports productive workdays.');
  const amenities = parseMixedItems(content, 'amenities');

  const heroBackgroundImage = content?.heroBackgroundImage ? getMediaUrl(content.heroBackgroundImage, apiBaseUrl) : undefined;
  const storyImage = content?.storyImage ? getMediaUrl(content.storyImage, apiBaseUrl) : undefined;
  const amenitiesImage = content?.amenitiesImage ? getMediaUrl(content.amenitiesImage, apiBaseUrl) : undefined;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {heroBackgroundImage ? (
        <ImageBackground
          source={{ uri: heroBackgroundImage }}
          style={styles.heroCard}
          imageStyle={{ borderRadius: radius.lg }}
          resizeMode="cover"
        >
          <View style={styles.heroOverlay} />
          <Text style={[styles.eyebrow, styles.heroText]}>About</Text>
          <Text style={[styles.title, styles.heroText]}>{heroTitle}</Text>
          <Text style={[styles.subtitle, styles.heroText]}>{heroSubtitle}</Text>
        </ImageBackground>
      ) : (
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>About</Text>
          <Text style={styles.title}>{heroTitle}</Text>
          <Text style={styles.subtitle}>{heroSubtitle}</Text>
        </View>
      )}

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{storyTitle}</Text>
        {storyImage ? <Image source={{ uri: storyImage }} style={styles.sectionImage} /> : null}
        {storyParagraphs.length > 0 ? (
          storyParagraphs.map((paragraph) => (
            <Text key={paragraph} style={styles.body}>
              {paragraph}
            </Text>
          ))
        ) : (
          <Text style={styles.body}>{storyBody}</Text>
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{whyChooseTitle}</Text>
        {whyChooseItems.length > 0 ? (
          <View style={styles.list}>
            {whyChooseItems.map((item, index) => (
              <View key={`${item.title}-${index}`} style={styles.listItem}>
                {item.title ? <Text style={styles.itemTitle}>{item.title}</Text> : null}
                {item.description ? <Text style={styles.itemDescription}>{item.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : null}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>{amenitiesTitle}</Text>
        {amenitiesImage ? <Image source={{ uri: amenitiesImage }} style={styles.sectionImage} /> : null}
        {amenities.length > 0 ? (
          <View style={styles.list}>
            {amenities.map((item, index) => (
              <View key={`${item.title}-${index}`} style={styles.listItem}>
                {item.title ? <Text style={styles.itemTitle}>{item.title}</Text> : null}
                {item.description ? <Text style={styles.itemDescription}>{item.description}</Text> : null}
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.body}>{amenitiesBody}</Text>
        )}
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
    overflow: 'hidden',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroText: {
    color: colors.background,
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
  sectionImage: {
    width: '100%',
    height: 200,
    borderRadius: radius.md,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  body: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
  },
  list: {
    gap: spacing.md,
  },
  listItem: {
    gap: spacing.xs,
  },
  itemTitle: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    lineHeight: typography.lineHeight.normal,
  },
  itemDescription: {
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
  },
});
