import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter } from 'react-router-dom';
import BlogContent from './BlogContent';

const queryClient = createQueryClient();

export default function BlogPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BlogContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
