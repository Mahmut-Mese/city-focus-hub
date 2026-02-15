import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { BlogCard } from '@/components/shared/BlogCard';
import { Input } from '@/components/ui/input';
import { Search, Clock } from 'lucide-react';
import { blogPosts, blogCategories, popularTags } from '@/data/mockData';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-28 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920)' }}
      >
        <div className="hero-overlay" />
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4">
            News, guides & workspace insights
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            Stay updated with the latest trends in coworking and remote work
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-white"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
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

      {/* Blog Grid Section */}
      <section className="py-20 md:py-24 bg-[#efefef]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Main Content - Blog Grid */}
            <div className="lg:col-span-2">
              {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} {...post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found matching your criteria.</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Quick Search */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-3">Quick Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/45" size={16} />
                  <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-black/15"
                  />
                </div>
              </div>

              {/* Recent Posts */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="flex gap-3 group items-start">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-medium leading-snug line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-black/45 mt-1">
                          <Clock size={12} />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {blogCategories.filter(c => c !== 'All').map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`inline-flex h-7 items-center rounded-full px-3 text-xs transition-colors ${
                        activeCategory === category ? 'bg-black text-white' : 'bg-[#f1f1f1] text-black/70'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-sans text-3xl leading-none mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
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
