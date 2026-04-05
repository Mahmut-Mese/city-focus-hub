import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import HomeContent from './HomeContent';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HomeContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
