import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter } from 'react-router-dom';
import PrivacyPolicyContent from './PrivacyPolicyContent';

const queryClient = createQueryClient();

export default function PrivacyPolicyPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PrivacyPolicyContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
