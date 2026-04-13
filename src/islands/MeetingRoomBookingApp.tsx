import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@/lib/query-client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initSentry } from '@/lib/sentry';
import MeetingRoomBooking from '@/pages-react/MeetingRoomBooking';

// P1-66: Initialise Sentry error tracking before any component mounts
initSentry();

const queryClient = createQueryClient();

export default function MeetingRoomBookingApp() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/meeting-rooms/:roomSlug/book" element={<MeetingRoomBooking />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
