import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter } from 'react-router-dom';
import FAQContent from './FAQContent';

const queryClient = createQueryClient();

export default function FAQPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FAQContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
