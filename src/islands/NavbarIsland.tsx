import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { AuthProvider } from '@/context/AuthContext';
import { NavbarAstro } from './NavbarAstro';

const queryClient = createQueryClient();

export default function NavbarIsland() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavbarAstro />
      </AuthProvider>
    </QueryClientProvider>
  );
}
