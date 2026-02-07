import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export function TestimonialCard({
  name,
  role,
  content,
  rating,
  image,
}: TestimonialCardProps) {
  return (
    <div className="card-elevated p-6 md:p-8">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      <blockquote className="text-foreground mb-6 italic">
        "{content}"
      </blockquote>
      
      <div className="flex items-center gap-3">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <span className="font-semibold text-primary">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}
