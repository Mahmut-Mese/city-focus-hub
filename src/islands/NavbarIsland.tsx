import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { NavbarAstro } from './NavbarAstro';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function NavbarIsland() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavbarAstro />
      </AuthProvider>
    </QueryClientProvider>
  );
}
