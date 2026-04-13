import { useQuery } from '@tanstack/react-query';
import type { CmsBlogPost } from '@/types/cms';
import { fetchApi, getMediaUrl, getMediaUrls, unwrapCollection, unwrapSingle } from '@/lib/content-api';
import { defaultSiteSettingsContent, type SiteSettingsContent } from '@/data/siteContent';
import {
  appendStatusParam,
  formatReadTime,
  getString,
  isRecord,
  mapContactFormContent,
  toStringArray,
  usePreviewStatus,
} from './cms-utils';

function toWorkspaceItems(
  value: unknown,
  fallback: SiteSettingsContent['blogPage']['relatedWorkspaces'],
): SiteSettingsContent['blogPage']['relatedWorkspaces'] {
  if (!Array.isArray(value) || value.length === 0) {
    return fallback;
  }

  return value.map((item, index) => {
    const source = isRecord(item) ? item : {};
    return {
      id: `${getString(source.title, fallback[index]?.title ?? `workspace-${index}`)}-${index}`,
      title: getString(source.title, fallback[index]?.title ?? ''),
      image: getMediaUrl(source.image) || fallback[index]?.image || '',
      category: getString(source.category, fallback[index]?.category ?? ''),
      link: getString(source.link, fallback[index]?.link ?? '/'),
    };
  });
}

function mapBlogPageContent(raw: Record<string, unknown>): SiteSettingsContent['blogPage'] {
  const fallback = defaultSiteSettingsContent.blogPage;

  return {
    heroTitle: getString(raw.heroTitle, fallback.heroTitle),
    heroSubtitle: getString(raw.heroSubtitle, fallback.heroSubtitle),
    heroBackgroundImage: getMediaUrl(raw.heroBackgroundImage) || fallback.heroBackgroundImage,
    searchPlaceholder: getString(raw.searchPlaceholder, fallback.searchPlaceholder),
    quickSearchTitle: getString(raw.quickSearchTitle, fallback.quickSearchTitle),
    recentPostsTitle: getString(raw.recentPostsTitle, fallback.recentPostsTitle),
    categoriesTitle: getString(raw.categoriesTitle, fallback.categoriesTitle),
    popularTagsTitle: getString(raw.popularTagsTitle, fallback.popularTagsTitle),
    noResultsText: getString(raw.noResultsText, fallback.noResultsText),
    detailBackLabel: getString(raw.detailBackLabel, fallback.detailBackLabel),
    detailSearchTitle: getString(raw.detailSearchTitle, fallback.detailSearchTitle),
    detailSearchButtonLabel: getString(raw.detailSearchButtonLabel, fallback.detailSearchButtonLabel),
    detailRecentPostsTitle: getString(raw.detailRecentPostsTitle, fallback.detailRecentPostsTitle),
    detailPopularTagsTitle: getString(raw.detailPopularTagsTitle, fallback.detailPopularTagsTitle),
    detailRelatedWorkspacesTitle: getString(raw.detailRelatedWorkspacesTitle, fallback.detailRelatedWorkspacesTitle),
    detailCommentForm: mapContactFormContent(raw.detailCommentForm, fallback.detailCommentForm),
    relatedWorkspaces: toWorkspaceItems(raw.relatedWorkspaces, fallback.relatedWorkspaces),
  };
}

export { mapBlogPageContent };

export function useBlogPosts() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'blog-posts', previewStatus ?? 'published'],
    queryFn: async (): Promise<CmsBlogPost[]> => {
      const payload = await fetchApi<unknown>(
        appendStatusParam('/blog-posts?sort=publishedDate:desc&pagination[pageSize]=100&populate=*', previewStatus),
      );
      const posts = unwrapCollection<Record<string, unknown>>(payload);

      return posts.map((post) => {
        const fallbackId = String(post.id ?? post.documentId ?? '');
        const slug = String(post.slug ?? fallbackId);
        const mediaUrl = getMediaUrl(post.coverImage);
        const directUrl = typeof post.coverImageUrl === 'string' ? post.coverImageUrl : '';
        const contentImages = [
          ...getMediaUrls(post.contentImages),
          ...toStringArray(post.contentImageUrls).map((item) => getMediaUrl(item)).filter(Boolean),
        ];
        return {
          id: fallbackId,
          title: String(post.title ?? ''),
          slug,
          excerpt: String(post.excerpt ?? ''),
          content: typeof post.content === 'string' ? post.content : undefined,
          contentImages,
          proTipTitle: typeof post.proTipTitle === 'string' ? post.proTipTitle : undefined,
          proTipText: typeof post.proTipText === 'string' ? post.proTipText : undefined,
          category: String(post.category ?? 'General'),
          date: String(post.publishedDate ?? ''),
          readTime: formatReadTime(post.readTime),
          author: String(post.author ?? 'CoworkingHub Team'),
          tags: toStringArray(post.tags),
          featured: Boolean(post.featured),
          image: mediaUrl || directUrl,
        };
      });
    },
  });
}

export function useBlogPostBySlug(slug?: string, status?: 'draft' | 'published') {
  const previewStatus = usePreviewStatus();
  const resolvedStatus = status ?? previewStatus;

  return useQuery({
    queryKey: ['cms', 'blog-post', slug, resolvedStatus ?? 'published'],
    enabled: Boolean(slug),
    queryFn: async (): Promise<CmsBlogPost | null> => {
      const payload = await fetchApi<unknown>(
        appendStatusParam(
          `/blog-posts?filters[$or][0][slug][$eq]=${encodeURIComponent(String(slug))}&filters[$or][1][documentId][$eq]=${encodeURIComponent(String(slug))}&pagination[pageSize]=1&populate=*`,
          resolvedStatus,
        ),
      );
      const post = unwrapSingle<Record<string, unknown>>(payload);

      if (!post) {
        return null;
      }

      const fallbackId = String(post.id ?? post.documentId ?? slug ?? '');
      const mediaUrl = getMediaUrl(post.coverImage);
      const directUrl = typeof post.coverImageUrl === 'string' ? post.coverImageUrl : '';
      const contentImages = [
        ...getMediaUrls(post.contentImages),
        ...toStringArray(post.contentImageUrls).map((item) => getMediaUrl(item)).filter(Boolean),
      ];
      return {
        id: fallbackId,
        title: String(post.title ?? ''),
        slug: String(post.slug ?? slug ?? fallbackId),
        excerpt: String(post.excerpt ?? ''),
        content: typeof post.content === 'string' ? post.content : undefined,
        contentImages,
        proTipTitle: typeof post.proTipTitle === 'string' ? post.proTipTitle : undefined,
        proTipText: typeof post.proTipText === 'string' ? post.proTipText : undefined,
        category: String(post.category ?? 'General'),
        date: String(post.publishedDate ?? ''),
        readTime: formatReadTime(post.readTime),
        author: String(post.author ?? 'CoworkingHub Team'),
        tags: toStringArray(post.tags),
        featured: Boolean(post.featured),
        image: mediaUrl || directUrl,
      };
    },
  });
}

export function useBlogPageContent() {
  const previewStatus = usePreviewStatus();

  return useQuery({
    queryKey: ['cms', 'blog-page', previewStatus ?? 'published'],
    queryFn: async (): Promise<SiteSettingsContent['blogPage'] | null> => {
      const payload = await fetchApi<unknown>(appendStatusParam('/blog-page?populate=*', previewStatus));
      const raw = unwrapSingle<Record<string, unknown>>(payload);
      return raw ? mapBlogPageContent(raw) : null;
    },
  });
}
