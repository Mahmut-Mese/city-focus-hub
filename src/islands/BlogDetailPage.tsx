import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import BlogDetailContent from './BlogDetailContent';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function BlogDetailPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BlogDetailContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
