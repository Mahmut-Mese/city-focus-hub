import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createApiClient } from '../../api/client';
import { getApiBaseUrl } from '../../config/api';
import { type ContentCollectionItem, type ContentPage, fetchBlogPosts, fetchContentPage } from '../../api/content-api';
import { ErrorState } from '../../components/ErrorState';
import { LoadingState } from '../../components/LoadingState';
import type { PublicStackParamList } from '../../navigation/PublicStack';
import { colors, radius, spacing, typography } from '../../theme';
import { useScrollBottomPadding } from '../../utils/use-scroll-padding';


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
  const scrollBottomPadding = useScrollBottomPadding();
  const apiClient = useMemo(() => createApiClient({ baseUrl: getApiBaseUrl() }), []);
  const [page, setPage] = useState<ContentPage | null>(null);
  const [posts, setPosts] = useState<ContentCollectionItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
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

  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    posts.forEach((post) => {
      const category = post.category;
      if (typeof category === 'string' && category.trim()) {
        categorySet.add(category.trim());
      }
    });
    return ['All', ...Array.from(categorySet)];
  }, [posts]);

  const popularTags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      const tagsValue = post.tags;
      if (Array.isArray(tagsValue)) {
        tagsValue.forEach((tag) => {
          if (typeof tag === 'string' && tag.trim()) {
            tagSet.add(tag.trim());
          }
        });
        return;
      }
      if (typeof tagsValue === 'string' && tagsValue.trim()) {
        tagsValue
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
          .forEach((tag) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  }, [posts]);

  if (isLoading) return <LoadingState message="Loading blog content…" />;
  if (error) return <ErrorState message={error} onRetry={loadContent} />;

  const heroTitle = getString(page, 'heroTitle', 'Insights from The Leadenhall Works');
  const heroSubtitle = getString(page, 'heroSubtitle', 'Workspace guidance, local updates, and practical tips.');
  const searchPlaceholder = getString(page, 'searchPlaceholder', 'Search blog posts');
  const noResultsText = getString(page, 'noResultsText', 'No posts matched your search.');
  const recentPostsTitle = getString(page, 'recentPostsTitle', 'Recent posts');
  const popularTagsTitle = getString(page, 'popularTagsTitle', 'Popular tags');

  const selectedCategory = categories.includes(activeCategory) ? activeCategory : 'All';

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredPosts = posts.filter((post) => {
    const title = getString(post, 'title', '');
    const excerpt = getString(post, 'excerpt', '');
    const category = getString(post, 'category', '');
    const matchesSearch =
      normalizedQuery.length === 0
      || title.toLowerCase().includes(normalizedQuery)
      || excerpt.toLowerCase().includes(normalizedQuery);
    const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const recentPosts = posts.slice(0, 3);

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, scrollBottomPadding]}>
      <View style={styles.heroCard}>
        <Text style={styles.eyebrow}>Blog</Text>
        <Text style={styles.title}>{heroTitle}</Text>
        <Text style={styles.subtitle}>{heroSubtitle}</Text>

        <TextInput
          accessibilityLabel="Search blog posts"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setSearchQuery}
          placeholder={searchPlaceholder}
          placeholderTextColor={colors.mutedForeground}
          style={styles.searchInput}
          value={searchQuery}
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <Pressable
                accessibilityRole="button"
                key={category}
                onPress={() => setActiveCategory(category)}
                style={[styles.categoryChip, isActive ? styles.categoryChipActive : styles.categoryChipInactive]}
              >
                <Text style={[styles.categoryChipText, isActive ? styles.categoryChipTextActive : styles.categoryChipTextInactive]}>{category}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {filteredPosts.length > 0 ? filteredPosts.map((post, index) => {
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
          <Text style={styles.excerpt}>{noResultsText}</Text>
        </View>
      )}

      {recentPosts.length > 0 ? (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{recentPostsTitle}</Text>
          <View style={styles.sectionList}>
            {recentPosts.map((post, index) => {
              const id = getPostId(post, index);
              const title = getString(post, 'title', `Post ${index + 1}`);
              const readTime = getString(post, 'readTime', '');
              return (
                <Pressable key={id} onPress={() => navigation.navigate('BlogDetail', { id })} style={styles.recentItem}>
                  <Text numberOfLines={2} style={styles.recentTitle}>{title}</Text>
                  {readTime ? <Text style={styles.recentMeta}>{readTime}</Text> : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : null}

      {popularTags.length > 0 ? (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>{popularTagsTitle}</Text>
          <View style={styles.tagsWrap}>
            {popularTags.map((tag) => (
              <View key={tag} style={styles.tagChip}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}
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
  searchInput: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    color: colors.foreground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  categoryRow: { columnGap: spacing.sm, paddingRight: spacing.md },
  categoryChip: { borderRadius: 999, borderWidth: 1, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  categoryChipActive: { backgroundColor: colors.foreground, borderColor: colors.foreground },
  categoryChipInactive: { backgroundColor: colors.background, borderColor: colors.border },
  categoryChipText: { fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  categoryChipTextActive: { color: colors.background, fontWeight: '700' },
  categoryChipTextInactive: { color: colors.foreground, fontWeight: '500' },
  card: { borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, gap: spacing.sm, padding: spacing.lg },
  category: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xs, letterSpacing: 0.3, lineHeight: typography.lineHeight.tight, textTransform: 'uppercase' },
  postTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.lg, fontWeight: '700', lineHeight: typography.lineHeight.normal },
  excerpt: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, lineHeight: typography.lineHeight.normal },
  readMore: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, fontWeight: '700', lineHeight: typography.lineHeight.tight },
  sectionCard: { backgroundColor: colors.secondary, borderRadius: radius.lg, gap: spacing.md, padding: spacing.lg },
  sectionTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.xl, fontWeight: '700', lineHeight: typography.lineHeight.tight },
  sectionList: { gap: spacing.md },
  recentItem: { borderBottomColor: colors.border, borderBottomWidth: StyleSheet.hairlineWidth, gap: spacing.xs, paddingBottom: spacing.sm },
  recentTitle: { color: colors.foreground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.base, fontWeight: '600', lineHeight: typography.lineHeight.normal },
  recentMeta: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tagChip: { backgroundColor: colors.background, borderColor: colors.border, borderRadius: 999, borderWidth: 1, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  tagText: { color: colors.mutedForeground, fontFamily: typography.fontFamily.sans, fontSize: typography.fontSize.sm, lineHeight: typography.lineHeight.tight },
});
