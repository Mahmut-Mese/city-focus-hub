import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Calendar, User, ArrowLeft, Search } from 'lucide-react';
import { blogPosts, popularTags, relatedWorkspaces } from '@/data/mockData';

export default function BlogDetail() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id) || blogPosts[0];

  return (
    <Layout>
      {/* Hero Section */}
      <section 
        className="relative py-20 md:py-28 bg-cover bg-center"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="hero-overlay" />
        <div className="container-custom relative z-10">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={18} />
            Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4 max-w-3xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span className="text-sm">
                {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
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

      {/* Content Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <div className="card-elevated p-6 md:p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg text-muted-foreground mb-6">
                    {post.excerpt}
                  </p>

                  <h2 className="font-serif text-2xl font-bold mt-8 mb-4">The Modern Workplace Revolution</h2>
                  <p className="text-muted-foreground mb-4">
                    The way we work has fundamentally changed. Gone are the days when productivity was measured 
                    by hours spent at a desk in a traditional office. Today's professionals understand that the 
                    right environment can dramatically impact creativity, focus, and overall output.
                  </p>

                  {/* Image Row */}
                  <div className="grid grid-cols-2 gap-4 my-8">
                    <img
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=500"
                      alt="Workspace"
                      className="rounded-xl w-full h-48 object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=500"
                      alt="Meeting room"
                      className="rounded-xl w-full h-48 object-cover"
                    />
                  </div>

                  <h2 className="font-serif text-2xl font-bold mt-8 mb-4">Key Benefits of Flexible Workspaces</h2>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Reduced overhead costs compared to traditional office leases</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Access to professional meeting rooms and amenities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Networking opportunities with like-minded professionals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <span className="text-muted-foreground">Flexibility to scale up or down as your needs change</span>
                    </li>
                  </ul>

                  {/* Pro Tip Callout */}
                  <div className="bg-primary text-primary-foreground p-6 rounded-xl my-8">
                    <h3 className="font-serif text-lg font-semibold mb-2">💡 Pro Tip</h3>
                    <p className="text-primary-foreground/90">
                      Start with a flexible day pass or weekly membership to test if a coworking space fits your 
                      work style before committing to a longer-term plan.
                    </p>
                  </div>

                  <p className="text-muted-foreground">
                    Whether you're a solo freelancer looking for a professional environment or a growing team 
                    seeking flexible office solutions, modern coworking spaces offer the perfect blend of 
                    community, convenience, and cost-effectiveness.
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="chip text-xs">#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Comment Form */}
              <div className="card-elevated p-6 md:p-8 mt-8">
                <h3 className="font-serif text-xl font-semibold mb-6">Leave a Comment</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input placeholder="Your Name" className="h-11" />
                    <Input type="email" placeholder="Email Address" className="h-11" />
                  </div>
                  <Textarea placeholder="Your Comment" className="min-h-[120px]" />
                  <Button className="btn-pill-primary">Post Comment</Button>
                </form>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Search */}
              <div className="card-elevated p-5">
                <h3 className="font-serif text-lg font-semibold mb-4">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input placeholder="Search articles..." className="pl-9" />
                </div>
              </div>

              {/* Recent Posts */}
              <div className="card-elevated p-5">
                <h3 className="font-serif text-lg font-semibold mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map((p) => (
                    <Link key={p.id} to={`/blog/${p.id}`} className="flex gap-3 group">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {p.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Clock size={12} />
                          <span>{p.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="card-elevated p-5">
                <h3 className="font-serif text-lg font-semibold mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <span key={tag} className="chip text-xs">#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Related Workspaces */}
              <div className="card-elevated p-5">
                <h3 className="font-serif text-lg font-semibold mb-4">Related Workspaces</h3>
                <div className="space-y-4">
                  {relatedWorkspaces.map((workspace) => (
                    <Link key={workspace.id} to="/virtual-office" className="flex gap-3 group">
                      <img
                        src={workspace.image}
                        alt={workspace.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <span className="text-xs text-muted-foreground">{workspace.category}</span>
                        <h4 className="text-sm font-medium group-hover:text-primary transition-colors">
                          {workspace.title}
                        </h4>
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
