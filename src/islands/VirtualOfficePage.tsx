import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter } from 'react-router-dom';
import VirtualOfficeContent from './VirtualOfficeContent';

const queryClient = createQueryClient();

export default function VirtualOfficePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <VirtualOfficeContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
