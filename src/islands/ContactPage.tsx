import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter } from 'react-router-dom';
import ContactContent from './ContactContent';

const queryClient = createQueryClient();

export default function ContactPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ContactContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
