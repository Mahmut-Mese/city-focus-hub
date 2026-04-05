import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MeetingRoomBooking from '@/pages-react/MeetingRoomBooking';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60_000 } },
});

export default function MeetingRoomBookingApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/meeting-rooms/:roomSlug/book" element={<MeetingRoomBooking />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
