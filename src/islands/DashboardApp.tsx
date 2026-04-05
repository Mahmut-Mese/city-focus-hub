import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '@/pages-react/Dashboard';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isReady } = useAuth();

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/auth';
    return null;
  }

  return <>{children}</>;
}

export default function DashboardApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
