import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter } from 'react-router-dom';
import AboutContent from './AboutContent';

const queryClient = createQueryClient();

export default function AboutPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AboutContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
