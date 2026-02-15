import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  iconContainerClassName?: string;
  iconClassName?: string;
  align?: 'center' | 'left';
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  iconContainerClassName,
  iconClassName,
  align = 'center',
}: FeatureCardProps) {
  return (
    <div className={cn('card-elevated p-8 md:p-10', align === 'center' ? 'text-center' : 'text-left', className)}>
      {/* Icon circle — white background, subtle shadow, centered */}
      <div
        className={cn(
          'w-12 h-12 mb-6 rounded-full bg-white flex items-center justify-center shadow-sm',
          align === 'center' ? 'mx-auto' : 'mx-0',
          iconContainerClassName
        )}
      >
        <Icon className={cn('w-5 h-5 text-muted-foreground', iconClassName)} />
      </div>
      <h3 className={cn('font-sans text-2xl md:text-3xl font-semibold mb-3', titleClassName)}>{title}</h3>
      <p
        className={cn(
          'text-base text-muted-foreground leading-relaxed max-w-[36rem]',
          align === 'center' ? 'mx-auto' : 'mx-0',
          descriptionClassName
        )}
      >
        {description}
      </p>
    </div>
  );
}
