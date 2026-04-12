import { Clock, Calendar } from 'lucide-react';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  tags?: string[];
}

export function BlogCard({
  id,
  title,
  excerpt,
  image,
  category,
  date,
  readTime,
  tags,
}: BlogCardProps) {
  return (
    <a href={`/blog/${id}`} className="group">
      <article className="rounded-2xl border border-black/10 bg-white overflow-hidden h-full shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex h-7 items-center rounded-full bg-[#f1f1f1] px-3 text-xs font-medium text-black/70">{category}</span>
            <div className="flex items-center gap-1 text-xs text-black/45">
              <Calendar size={12} />
              <span>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          
          <h3 className="font-sans text-[2rem] leading-tight mb-2 line-clamp-2">
            {title}
          </h3>
          
          <p className="text-base text-black/60 mb-4 leading-relaxed line-clamp-3">
            {excerpt}
          </p>

          <div className="flex items-center justify-between text-sm">
            {tags && (
              <div className="flex flex-wrap gap-2 text-black/45">
                {tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-1 text-sm text-black/45">
              <Clock size={12} />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}
