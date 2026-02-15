import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CTABannerProps {
  title: string;
  subtitle?: string;
  primaryButton?: {
    text: string;
    link: string;
  };
  secondaryButton?: {
    text: string;
    link: string;
  };
}

export function CTABanner({
  title,
  subtitle,
  primaryButton,
  secondaryButton,
}: CTABannerProps) {
  return (
    <section className="bg-primary text-primary-foreground section-padding">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryButton && (
            <Link to={primaryButton.link}>
              <Button className="btn-pill-white">{primaryButton.text}</Button>
            </Link>
          )}
          {secondaryButton && (
            <Link to={secondaryButton.link}>
              <Button variant="outline" className="btn-pill border-white text-white hover:bg-white hover:text-primary">
                {secondaryButton.text}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
