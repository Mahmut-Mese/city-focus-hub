import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import FAQContent from './FAQContent';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function FAQPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FAQContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
