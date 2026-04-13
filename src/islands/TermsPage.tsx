import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter } from 'react-router-dom';
import TermsContent from './TermsContent';

const queryClient = createQueryClient();

export default function TermsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TermsContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
