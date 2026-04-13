import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter } from 'react-router-dom';
import MeetingRoomsContent from './MeetingRoomsContent';

const queryClient = createQueryClient();

export default function MeetingRoomsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MeetingRoomsContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
