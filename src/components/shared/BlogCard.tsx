import { Link } from 'react-router-dom';
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
    <Link to={`/blog/${id}`} className="group">
      <article className="card-elevated overflow-hidden h-full">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5 md:p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="chip text-xs">{category}</span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar size={12} />
              <span>{new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
          
          <h3 className="font-serif text-lg md:text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {excerpt}
          </p>

          <div className="flex items-center justify-between">
            {tags && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-xs text-muted-foreground">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={12} />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
