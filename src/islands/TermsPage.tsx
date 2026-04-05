import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import TermsContent from './TermsContent';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function TermsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TermsContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
