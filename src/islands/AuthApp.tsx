import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { AuthProvider } from '@/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initSentry } from '@/lib/sentry';
import Auth from '@/pages-react/Auth';

// P1-66: Initialise Sentry error tracking before any component mounts
initSentry();

const queryClient = createQueryClient();

export default function AuthApp() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Auth />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
