import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import { type ContentCollectionItem, fetchBlogPostBySlug } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import type { PublicStackParamList } from '../../navigation/PublicStack';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

type BlogDetailScreenProps = NativeStackScreenProps<PublicStackParamList, 'BlogDetail'>;

function getString(source: ContentCollectionItem | null, key: string, fallback: string): string {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

export function BlogDetailScreen({ route }: BlogDetailScreenProps): JSX.Element {
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [post, setPost] = useState<ContentCollectionItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const id = route.params.id;

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const blogPost = await fetchBlogPostBySlug(apiClient, id);
      setPost(blogPost);
    } catch {
      setError('We could not load this blog post.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient, id]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  if (isLoading) return <LoadingState message="Loading blog post…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const title = getString(post, 'title', 'Blog post');
  const category = getString(post, 'category', 'Workspace');
  const date = getString(post, 'date', getString(post, 'publishedDate', ''));
  const excerpt = getString(post, 'excerpt', 'Read the latest from The Leadenhall Works.');
  const content = getString(post, 'content', 'This blog post content is being prepared. Please check back soon.');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
        {date ? <Text style={styles.meta}>{date}</Text> : null}
        <Text style={styles.subtitle}>{excerpt}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.body}>{content}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.lg },
  heroCard: { backgroundColor: colors.secondary, borderRadius: radius.lg, gap: spacing.md, padding: spacing.xl },
  category: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, letterSpacing: 0.3, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  meta: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  card: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, padding: spacing.lg },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.relaxed },
});
