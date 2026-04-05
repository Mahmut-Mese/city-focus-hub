import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import BlogContent from './BlogContent';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function BlogPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BlogContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
