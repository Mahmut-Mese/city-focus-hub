import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export function ServiceCard({
  title,
  description,
  image,
  link,
}: ServiceCardProps) {
  return (
    <Link to={link} className="group">
      <article className="card-elevated overflow-hidden h-full">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-5 md:p-6">
          <h3 className="font-serif text-xl font-semibold mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
            Learn more
            <ArrowRight size={16} />
          </span>
        </div>
      </article>
    </Link>
  );
}
