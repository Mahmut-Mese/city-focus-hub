import { useMemo, useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { createApiClient } from '../api/client';
import { type BookingDraftInput, createMemberBookingPaymentIntent } from '../api/booking-api';
import { useAuth } from '../auth/AuthProvider';
import { getStoredSession } from '../auth/secure-storage';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

export type BookingPaymentSheetResult = {
  status: 'payment_sheet_completed';
  bookingId: number | null;
  paymentIntentId: string | null;
};

export function useBookingPaymentSheet(): {
  presentBookingPaymentSheet(input: BookingDraftInput): Promise<BookingPaymentSheetResult>;
  isPresenting: boolean;
} {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { refreshSession } = useAuth();
  const [isPresenting, setIsPresenting] = useState(false);

  const apiClient = useMemo(() => createApiClient({
    baseUrl: getApiBaseUrl(),
    getAccessToken: async () => (await getStoredSession()).accessToken,
    refreshAccessToken: async () => {
      await refreshSession();
      return (await getStoredSession()).accessToken;
    },
  }), [refreshSession]);

  const presentBookingPaymentSheet = async (input: BookingDraftInput): Promise<BookingPaymentSheetResult> => {
    setIsPresenting(true);

    try {
      const draft = await createMemberBookingPaymentIntent(apiClient, input);

      if (!draft.clientSecret) {
        throw new Error('Payment could not be prepared.');
      }

      const initResult = await initPaymentSheet({
        merchantDisplayName: 'The Leadenhall Works',
        paymentIntentClientSecret: draft.clientSecret,
      });

      if (initResult.error) {
        throw new Error('Payment could not be prepared.');
      }

      const presentResult = await presentPaymentSheet();

      if (presentResult.error) {
        throw new Error('Payment was not completed.');
      }

      return {
        status: 'payment_sheet_completed',
        bookingId: typeof draft.booking?.id === 'number' ? draft.booking.id : null,
        paymentIntentId: draft.paymentIntentId,
      };
    } finally {
      setIsPresenting(false);
    }
  };

  return { presentBookingPaymentSheet, isPresenting };
}
