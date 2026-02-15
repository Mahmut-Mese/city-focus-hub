import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  name: string;
  price: number;
  period: string;
  description?: string;
  features: string[];
  isPopular?: boolean;
  className?: string;
}

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  isPopular = false,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'card-elevated p-6 md:p-8 relative',
        isPopular && 'ring-2 ring-primary',
        className
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="chip-dark text-xs">Recommended</span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl font-semibold mb-2">{name}</h3>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <div className="text-center mb-6">
        <span className="text-4xl md:text-5xl font-bold">£{price}</span>
        <span className="text-muted-foreground">/{period}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <Button className={cn('w-full', isPopular ? 'btn-pill-primary' : 'btn-pill-secondary')}>
        Purchase Now
      </Button>
    </div>
  );
}
