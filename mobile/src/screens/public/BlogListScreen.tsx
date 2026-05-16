import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import { type ContentCollectionItem, type ContentPage, fetchBlogPosts, fetchContentPage } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import type { PublicStackParamList } from '../../navigation/PublicStack';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

type BlogListScreenProps = NativeStackScreenProps<PublicStackParamList, 'BlogList'>;

function getString(source: ContentPage | ContentCollectionItem | null, key: string, fallback: string): string {
  const value = source?.[key];
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function getPostId(post: ContentCollectionItem, index: number): string {
  const slug = post.slug;
  if (typeof slug === 'string' && slug.trim()) return slug;
  const id = post.id ?? post.documentId;
  return id === undefined || id === null ? `post-${index}` : String(id);
}

export function BlogListScreen({ navigation }: BlogListScreenProps): JSX.Element {
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [page, setPage] = useState<ContentPage | null>(null);
  const [posts, setPosts] = useState<ContentCollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [pageContent, blogPosts] = await Promise.all([
        fetchContentPage(apiClient, 'blog-page'),
        fetchBlogPosts(apiClient),
      ]);
      setPage(pageContent);
      setPosts(blogPosts);
    } catch {
      setError('We could not load blog content.');
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    void loadContent();
  }, [loadContent]);

  if (isLoading) return <LoadingState message="Loading blog content…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(page, 'heroTitle', 'Insights from The Leadenhall Works');
  const heroSubtitle = getString(page, 'heroSubtitle', 'Workspace guidance, local updates, and practical tips.');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Blog</Text>
        <Text style={styles.title}>{heroTitle}</Text>
        <Text style={styles.subtitle}>{heroSubtitle}</Text>
      </View>

      {posts.length > 0 ? posts.map((post, index) => {
        const title = getString(post, 'title', `Post ${index + 1}`);
        const excerpt = getString(post, 'excerpt', 'Read the latest from The Leadenhall Works.');
        const category = getString(post, 'category', 'Workspace');
        const id = getPostId(post, index);
        return (
          <Pressable accessibilityRole="button" key={id} onPress={() => navigation.navigate('BlogDetail', { id })} style={styles.card}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.excerpt}>{excerpt}</Text>
            <Text style={styles.readMore}>Read more</Text>
          </Pressable>
        );
      }) : (
        <View style={styles.card}>
          <Text style={styles.postTitle}>Blog posts are coming soon</Text>
          <Text style={styles.excerpt}>Check back for workspace news and guidance.</Text>
        </View>
      )}
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
  card: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  category: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, letterSpacing: 0.3, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  postTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  excerpt: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  readMore: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700', lineHeight: typography.lineHeight.tight },
});
