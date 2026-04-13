import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter } from 'react-router-dom';
import PricingContent from './PricingContent';

const queryClient = createQueryClient();

export default function PricingPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PricingContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
