import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { BlogCard } from '@/components/shared/BlogCard';
import { Input } from '@/components/ui/input';
import { CmsNoData } from '@/components/shared/CmsNoData';
import { Search, Clock } from 'lucide-react';
import { useBlogPageContent, useBlogPosts } from '@/hooks/useCmsContent';
import { getPopularTags } from '@/lib/blog';

export default function Blog() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [activeCategory, setActiveCategory] = useState('All');
  const blogPostsQuery = useBlogPosts();
  const blogPageQuery = useBlogPageContent();

  useEffect(() => {
    setSearchQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  if (blogPostsQuery.isLoading || blogPageQuery.isLoading) {
    return null;
  }

  if (
    blogPostsQuery.isError
    || blogPageQuery.isError
    || !blogPageQuery.data
    || !blogPostsQuery.data
    || blogPostsQuery.data.length === 0
  ) {
    return (
      <Layout>
        <CmsNoData />
      </Layout>
    );
  }

  const cmsPosts = blogPostsQuery.data.filter((post) => !post.featured);
  const content = blogPageQuery.data;

  const allPosts = cmsPosts.map((post) => ({
    id: post.slug || post.id,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image || '',
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    tags: post.tags,
    author: post.author,
    featured: post.featured,
  }));

  const hasSearchQuery = searchQuery.trim().length > 0;
  const categorySourcePosts = allPosts;
  const categories = ['All', ...Array.from(new Set(categorySourcePosts.map((post) => post.category)))];
  const tags = getPopularTags(allPosts);
  const selectedCategory = categories.includes(activeCategory) ? activeCategory : 'All';

  const visiblePosts = allPosts;

  const filteredPosts = visiblePosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
      || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout
      seo={{
        title: searchQuery ? `${content.heroTitle} - Search: ${searchQuery}` : content.heroTitle,
        description: content.heroSubtitle,
        image: content.heroBackgroundImage,
        noindex: Boolean(searchQuery.trim()),
      }}
    >
      <section
        className="relative py-20 md:py-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${content.heroBackgroundImage})` }}
      >
        <div className="hero-overlay" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">{content.heroTitle}</h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">{content.heroSubtitle}</p>

          <div className="max-w-md mx-auto relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder={content.searchPlaceholder}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="pl-11 h-12 bg-white"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-white text-foreground'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#efefef]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            <div className="lg:col-span-2">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} {...post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">{content.noResultsText}</p>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-3">{content.quickSearchTitle}</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/45" size={16} />
                  <Input
                    placeholder={content.searchPlaceholder}
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="pl-9 border-black/15"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-4">{content.recentPostsTitle}</h3>
                <div className="space-y-4">
                  {allPosts.slice(0, 3).map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-3 group items-start">
                      <img src={post.image} alt={post.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium leading-snug line-clamp-2">{post.title}</h4>
                        <div className="flex items-center gap-1 text-xs text-black/45 mt-1">
                          <Clock size={12} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-4">{content.categoriesTitle}</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.filter((category) => category !== 'All').map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`inline-flex h-7 items-center rounded-full px-3 text-xs transition-colors ${
                        selectedCategory === category ? 'bg-black text-white' : 'bg-[#f1f1f1] text-black/70'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-4">{content.popularTagsTitle}</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="text-sm text-black/45">
                      #{tag}
                    </span>
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
