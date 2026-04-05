import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { FooterAstro } from './FooterAstro';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function FooterIsland() {
  return (
    <QueryClientProvider client={queryClient}>
      <FooterAstro />
    </QueryClientProvider>
  );
}
