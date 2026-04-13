import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { FooterAstro } from './FooterAstro';

const queryClient = createQueryClient();

export default function FooterIsland() {
  return (
    <QueryClientProvider client={queryClient}>
      <FooterAstro />
    </QueryClientProvider>
  );
}
