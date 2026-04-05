import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import AboutContent from './AboutContent';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function AboutPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AboutContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
