import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Calendar, User, ArrowLeft, Search, ArrowUpRight } from 'lucide-react';
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
      <section className="py-16 md:py-20 bg-[#efefef]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Main Content */}
            <article className="lg:col-span-2">
              <div className="rounded-2xl border border-black/10 bg-white p-6 md:p-8">
                <div className="max-w-none">
                  <p className="text-lg text-black/60 mb-6">
                    Flexible work isn't just a trend, it's a system. From layout to community, the right space turns intention into output.
                  </p>

                  <h2 className="font-serif text-5xl leading-none mt-8 mb-4">A workspace that matches your day</h2>
                  <p className="text-black/60 mb-4 leading-relaxed">
                    Some days you need deep focus. Others you need a room for a client call, a quick coffee, or a place
                    to reset between meetings. Flexible spaces are powerful because they let you choose your environment
                    without changing your routine.
                  </p>

                  {/* Image Row */}
                  <div className="grid grid-cols-2 gap-4 my-8">
                    <img
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900"
                      alt="Workspace"
                      className="rounded-xl w-full h-48 object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900"
                      alt="Meeting room"
                      className="rounded-xl w-full h-48 object-cover"
                    />
                  </div>

                  <h2 className="font-serif text-5xl leading-none mt-8 mb-4">The habits that make work feel effortless</h2>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-2" />
                      <span className="text-black/65">Start with a 15-minute planning ritual</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-2" />
                      <span className="text-black/65">Protect 90-minute focus blocks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-2" />
                      <span className="text-black/65">Use meeting rooms for context switching</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-2" />
                      <span className="text-black/65">End the day with a quick reset</span>
                    </li>
                  </ul>

                  {/* Pro Tip Callout */}
                  <div className="bg-black text-white p-6 rounded-xl my-8">
                    <h3 className="font-serif text-lg font-semibold mb-2">Pro tip</h3>
                    <p className="text-white/90">
                      Pick one “default” seat for deep work. The consistency makes it easier to enter flow even on busy days.
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-black/10">
                  {post.tags?.map((tag) => (
                    <span key={tag} className="inline-flex h-7 items-center rounded-full bg-[#f1f1f1] px-3 text-xs text-black/70">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Comment Form */}
                <div className="mt-8 pt-6 border-t border-black/10">
                  <h3 className="font-serif text-3xl leading-none mb-6">Post a comment</h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input placeholder="Name" className="h-11 border-black/15" />
                      <Input type="email" placeholder="Email" className="h-11 border-black/15" />
                    </div>
                    <Textarea placeholder="Comment" className="min-h-[120px] border-black/15" />
                    <Button className="h-10 rounded-xl px-5 text-sm bg-black text-white hover:bg-black/90">Post Comment</Button>
                  </form>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Search */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-serif text-3xl leading-none mb-4">Search</h3>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black/45" size={16} />
                    <Input placeholder="Search..." className="pl-9 border-black/15" />
                  </div>
                  <Button className="h-11 w-11 rounded-full bg-black text-white hover:bg-black/90 p-0">Go</Button>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-serif text-3xl leading-none mb-4">Recent posts</h3>
                <div className="space-y-4">
                  {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map((p) => (
                    <Link key={p.id} to={`/blog/${p.id}`} className="flex gap-3 group items-start rounded-xl border border-black/10 p-2.5">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <h4 className="text-sm font-medium line-clamp-2">
                          {p.title}
                        </h4>
                        <div className="text-xs text-black/45 mt-1">
                          <span>{new Date(p.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-serif text-3xl leading-none mb-4">Popular tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <span key={tag} className="inline-flex h-7 items-center rounded-full bg-[#f1f1f1] px-3 text-xs text-black/70">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Workspaces */}
              <div className="rounded-2xl border border-black/10 bg-white p-5">
                <h3 className="font-serif text-3xl leading-none mb-4">Related workspaces</h3>
                <div className="space-y-4">
                  {relatedWorkspaces.map((workspace) => (
                    <Link key={workspace.id} to="/virtual-office" className="block rounded-xl border border-black/10 overflow-hidden">
                      <img
                        src={workspace.image}
                        alt={workspace.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3 flex items-center justify-between">
                        <h4 className="text-base font-medium">
                          {workspace.title}
                        </h4>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/15">
                          <ArrowUpRight size={14} />
                        </span>
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
