import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import PrivacyPolicyContent from './PrivacyPolicyContent';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function PrivacyPolicyPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <PrivacyPolicyContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
