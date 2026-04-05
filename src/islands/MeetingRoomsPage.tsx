import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import MeetingRoomsContent from './MeetingRoomsContent';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function MeetingRoomsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MeetingRoomsContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
