import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import ContactContent from './ContactContent';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function ContactPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ContactContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
