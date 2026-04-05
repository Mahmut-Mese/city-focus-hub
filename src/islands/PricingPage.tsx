import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import PricingContent from './PricingContent';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function PricingPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PricingContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
