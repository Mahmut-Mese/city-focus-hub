import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import {
  type ContentCollectionItem,
  type ContentPage,
  fetchBlogPostBySlug,
  fetchBlogPosts,
  fetchContentPage,
} from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import type { PublicStackParamList } from '../../navigation/PublicStack';
import { colors, radius, spacing, typography } from '../../theme';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

type BlogDetailScreenProps = NativeStackScreenProps<PublicStackParamList, 'BlogDetail'>;

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

function getStringArray(source: ContentCollectionItem | null, key: string): string[] {
  const value = source?.[key];
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0);
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function BlogDetailScreen({ navigation, route }: BlogDetailScreenProps): JSX.Element {
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [post, setPost] = useState<ContentCollectionItem | null>(null);
  const [page, setPage] = useState<ContentPage | null>(null);
  const [posts, setPosts] = useState<ContentCollectionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const id = route.params.id;

  const loadContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [blogPost, pageContent, allPosts] = await Promise.all([
        fetchBlogPostBySlug(apiClient, id),
        fetchContentPage(apiClient, 'blog-page'),
        fetchBlogPosts(apiClient),
      ]);
      setPost(blogPost);
      setPage(pageContent);
      setPosts(allPosts);
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
  const rawDate = getString(post, 'date', getString(post, 'publishedDate', ''));
  const date = rawDate ? formatDate(rawDate) : '';
  const readTime = getString(post, 'readTime', '');
  const author = getString(post, 'author', '');
  const excerpt = getString(post, 'excerpt', 'Read the latest from The Leadenhall Works.');
  const content = getString(post, 'content', 'This blog post content is being prepared. Please check back soon.');
  const tags = getStringArray(post, 'tags');
  const contentImages = getStringArray(post, 'contentImages');
  const backLabel = getString(page, 'detailBackLabel', 'Back to Blog');
  const recentPostsTitle = getString(page, 'detailRecentPostsTitle', 'Recent posts');

  const currentPostId = post ? getPostId(post, 0) : '';
  const recentPosts = posts
    .filter((item, index) => getPostId(item, index) !== currentPostId)
    .slice(0, 3);

  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate('BlogList');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Pressable accessibilityRole="button" onPress={handleBackPress} style={styles.backButton}>
          <Text style={styles.backButtonText}>{backLabel}</Text>
        </Pressable>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.metaRow}>
          {date ? <Text style={styles.meta}>{date}</Text> : null}
          {readTime ? <Text style={styles.meta}>{readTime}</Text> : null}
          {author ? <Text style={styles.meta}>{author}</Text> : null}
        </View>
        <Text style={styles.subtitle}>{excerpt}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.body}>{content}</Text>

        {contentImages.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Image URLs</Text>
            <View style={styles.chipWrap}>
              {contentImages.map((imageUrl) => (
                <View key={imageUrl} style={styles.chip}>
                  <Text style={styles.chipText}>{imageUrl}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {tags.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.chipWrap}>
              {tags.map((tag) => (
                <View key={tag} style={styles.tagChip}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>

      {recentPosts.length > 0 ? (
        <View style={styles.card}>
          <Text style={styles.sectionHeading}>{recentPostsTitle}</Text>
          <View style={styles.recentList}>
            {recentPosts.map((item, index) => {
              const recentId = getPostId(item, index);
              const recentTitle = getString(item, 'title', 'Blog post');
              const recentDateRaw = getString(item, 'date', getString(item, 'publishedDate', ''));
              const recentDate = recentDateRaw ? formatDate(recentDateRaw) : '';

              return (
                <Pressable
                  accessibilityRole="button"
                  key={recentId}
                  onPress={() => navigation.navigate('BlogDetail', { id: recentId })}
                  style={styles.recentItem}
                >
                  <Text style={styles.recentTitle}>{recentTitle}</Text>
                  {recentDate ? <Text style={styles.recentMeta}>{recentDate}</Text> : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : null}

      {!post ? (
        <View style={styles.card}>
          <Text style={styles.subtitle}>We could not find this blog post.</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.xl, gap: spacing.lg },
  heroCard: { backgroundColor: colors.secondary, borderRadius: radius.lg, gap: spacing.md, padding: spacing.xl },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  backButtonText: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    lineHeight: typography.lineHeight.tight,
  },
  category: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, letterSpacing: 0.3, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  title: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize['3xl'], fontWeight: '700', lineHeight: 38 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  meta: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  subtitle: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  card: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.md, padding: spacing.lg },
  body: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.relaxed },
  section: { gap: spacing.sm, paddingTop: spacing.md },
  sectionTitle: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    lineHeight: typography.lineHeight.tight,
  },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    backgroundColor: colors.secondary,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  chipText: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.tight,
  },
  tagChip: {
    backgroundColor: colors.secondary,
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  tagText: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.tight,
  },
  sectionHeading: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    lineHeight: typography.lineHeight.normal,
  },
  recentList: { gap: spacing.sm },
  recentItem: {
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.xs,
    padding: spacing.md,
  },
  recentTitle: {
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    lineHeight: typography.lineHeight.normal,
  },
  recentMeta: {
    color: colors.mutedForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.xs,
    lineHeight: typography.lineHeight.tight,
  },
});
