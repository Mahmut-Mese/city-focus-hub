import { useState } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Calendar, User, ArrowLeft, Search, ArrowUpRight } from 'lucide-react';
import { useBlogPageContent, useBlogPostBySlug, useBlogPosts } from '@/hooks/useCmsContent';
import { defaultSiteSettingsContent } from '@/data/siteContent';
import { getPopularTags } from '@/lib/blog';

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Recent';
  }

  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [detailSearchQuery, setDetailSearchQuery] = useState('');
  const previewStatus = searchParams.get('preview') === '1'
    && (searchParams.get('status') === 'draft' || searchParams.get('status') === 'published')
    ? (searchParams.get('status') as 'draft' | 'published')
    : undefined;
  const { data: cmsPost } = useBlogPostBySlug(id, previewStatus);
  const { data: cmsPosts = [] } = useBlogPosts();
  const { data: content = defaultSiteSettingsContent.blogPage } = useBlogPageContent();

  const allPosts = cmsPosts.map((post) => ({
    id: post.slug || post.id,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
    contentImages: post.contentImages,
    proTipTitle: post.proTipTitle,
    proTipText: post.proTipText,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    tags: post.tags,
    author: post.author,
    content: post.content,
  }));

  const post = cmsPost
    ? {
        id: cmsPost.slug || cmsPost.id,
        title: cmsPost.title,
        excerpt: cmsPost.excerpt,
        image: cmsPost.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
        contentImages: cmsPost.contentImages,
        proTipTitle: cmsPost.proTipTitle,
        proTipText: cmsPost.proTipText,
        category: cmsPost.category,
        date: cmsPost.date,
        readTime: cmsPost.readTime,
        tags: cmsPost.tags,
        author: cmsPost.author,
        content: cmsPost.content,
      }
    : allPosts.find((item) => item.id === id) || allPosts[0];

  const tagList = getPopularTags(allPosts);
  const recentPosts = allPosts.filter((item) => item.id !== post?.id).slice(0, 3);

  if (!post) {
    return null;
  }

  function handleDetailSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = detailSearchQuery.trim();
    navigate(query ? `/blog?q=${encodeURIComponent(query)}` : '/blog');
  }

  return (
    <Layout
      seo={{
        title: post.title,
        description: post.excerpt,
        image: post.image,
        type: 'article',
      }}
    >
      <section className="relative py-20 md:py-28 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="hero-overlay" />
        <div className="container-custom relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft size={18} />
            {content.detailBackLabel}
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-white mb-4 max-w-3xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-sm">{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="text-sm">{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="text-sm">{post.author}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#efefef]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <article className="lg:col-span-2">
              <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
                <div className="max-w-none">
                  <p className="text-lg text-black/60 mb-6">{post.excerpt}</p>
                  {post.content ? (
                    <div className="prose prose-neutral max-w-none text-black/70 prose-headings:font-sans prose-headings:text-black prose-p:text-black/70 prose-li:text-black/70 prose-strong:text-black prose-a:text-black">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-black/60 leading-relaxed">{post.excerpt}</p>
                  )}
                </div>

                {post.contentImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 my-8">
                    {post.contentImages.slice(0, 2).map((image) => (
                      <img
                        key={image}
                        src={image}
                        alt={post.title}
                        className="w-full h-40 md:h-48 rounded-xl object-cover"
                      />
                    ))}
                  </div>
                )}

                {post.proTipText && (
                  <div className="bg-black text-white p-6 rounded-xl my-8">
                    <h3 className="font-sans text-lg font-semibold mb-2">{post.proTipTitle || 'Pro tip'}</h3>
                    <p className="text-white/90">{post.proTipText}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-black/10">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="inline-flex h-7 items-center rounded-full bg-[#f1f1f1] px-3 text-xs text-black/70">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-black/10">
                  <h3 className="font-sans text-3xl leading-none mb-6">{content.detailCommentForm.title}</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder={content.detailCommentForm.namePlaceholder} className="h-11 border-black/15" />
                      <Input type="email" placeholder={content.detailCommentForm.emailPlaceholder} className="h-11 border-black/15" />
                    </div>
                    <Textarea placeholder={content.detailCommentForm.messagePlaceholder} className="min-h-[120px] border-black/15" />
                    <Button className="h-10 rounded-xl px-5 text-sm bg-black text-white hover:bg-black/90">
                      {content.detailCommentForm.submitLabel}
                    </Button>
                  </form>
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-4">{content.detailSearchTitle}</h3>
                <form className="flex gap-2" onSubmit={handleDetailSearchSubmit}>
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/45" size={16} />
                    <Input
                      placeholder={content.searchPlaceholder}
                      className="pl-9 border-black/15"
                      value={detailSearchQuery}
                      onChange={(event) => setDetailSearchQuery(event.target.value)}
                    />
                  </div>
                  <Button type="submit" className="h-11 w-11 rounded-full bg-black text-white hover:bg-black/90 p-0">
                    {content.detailSearchButtonLabel}
                  </Button>
                </form>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-4">{content.detailRecentPostsTitle}</h3>
                <div className="space-y-4">
                  {recentPosts.map((item) => (
                    <Link key={item.id} to={`/blog/${item.id}`} className="flex gap-3 group items-start rounded-xl border border-black/10 p-2.5">
                      <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium line-clamp-2">{item.title}</h4>
                        <div className="text-xs text-black/45 mt-1">
                          <span>{formatDate(item.date)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-4">{content.detailPopularTagsTitle}</h3>
                <div className="flex flex-wrap gap-2">
                  {tagList.map((tag) => (
                    <span key={tag} className="inline-flex h-7 items-center rounded-full bg-[#f1f1f1] px-3 text-xs text-black/70">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-4">{content.detailRelatedWorkspacesTitle}</h3>
                <div className="space-y-4">
                  {content.relatedWorkspaces.map((workspace) => (
                    <Link key={workspace.id} to={workspace.link} className="block rounded-xl border border-black/10 overflow-hidden">
                      <img src={workspace.image} alt={workspace.title} className="w-full h-32 object-cover" />
                      <div className="p-3 flex items-center justify-between">
                        <h4 className="text-base font-medium">{workspace.title}</h4>
                        <ArrowUpRight size={18} className="text-black/50" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
