import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter } from 'react-router-dom';
import BlogDetailContent from './BlogDetailContent';

const queryClient = createQueryClient();

export default function BlogDetailPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BlogDetailContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
