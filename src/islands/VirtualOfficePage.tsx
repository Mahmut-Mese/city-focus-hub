import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import VirtualOfficeContent from './VirtualOfficeContent';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function VirtualOfficePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <VirtualOfficeContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
