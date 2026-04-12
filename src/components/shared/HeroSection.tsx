import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlay?: boolean;
  className?: string;
  children?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  overlay = true,
  className,
  children,
  size = 'md',
}: HeroSectionProps) {
  const sizeClasses = {
    sm: 'py-16 md:py-24',
    md: 'py-24 md:py-32',
    lg: 'py-32 md:py-48',
  };

  return (
    <section
      className={cn(
        'relative bg-primary text-primary-foreground',
        sizeClasses[size],
        className
      )}
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined
      }
    >
      {backgroundImage && overlay && <div className="hero-overlay" />}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-4 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
