import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter } from 'react-router-dom';
import HomeContent from './HomeContent';

const queryClient = createQueryClient();

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HomeContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
