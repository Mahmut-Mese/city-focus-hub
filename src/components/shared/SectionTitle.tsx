import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionTitle({
  title,
  subtitle,
  centered = true,
  className,
  titleClassName,
  subtitleClassName,
}: SectionTitleProps) {
  return (
    <div className={cn(centered && 'text-center', 'mb-10 md:mb-14', className)}>
      <h2 className={cn('text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4', titleClassName)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-muted-foreground text-lg max-w-2xl mx-auto', subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
