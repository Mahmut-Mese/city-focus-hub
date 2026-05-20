import { useMemo, useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { createApiClient } from '../api/client';
import {
  cancelMemberBookingPayment,
  confirmMemberBookingPayment,
  createMemberBookingPaymentIntent,
  type BookingDraftInput,
} from '../api/booking-api';
import type { MemberBooking } from '../api/member-api';
import { useAuth } from '../auth/AuthProvider';
import { getStoredSession } from '../auth/secure-storage';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

export type BookingPaymentSheetResult = {
  status: 'payment_sheet_completed';
  booking: MemberBooking;
};

const PAYMENT_VERIFICATION_MESSAGE = 'Your payment was submitted and is being verified. We will update your booking status shortly.';

export class BookingPaymentVerificationError extends Error {
  constructor() {
    super(PAYMENT_VERIFICATION_MESSAGE);
    this.name = 'BookingPaymentVerificationError';
  }
}

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
      const draftBookingId = typeof draft.booking?.id === 'number' ? draft.booking.id : null;

      if (!draft.clientSecret || !draft.paymentIntentId || !draftBookingId) {
        if (draftBookingId) {
          await cancelMemberBookingPayment(apiClient, { bookingId: draftBookingId }).catch(() => null);
        }
        throw new Error('Payment could not be prepared.');
      }

      const initResult = await initPaymentSheet({
        merchantDisplayName: 'The Leadenhall Works',
        paymentIntentClientSecret: draft.clientSecret,
      });

      if (initResult.error) {
        await cancelMemberBookingPayment(apiClient, { bookingId: draftBookingId }).catch(() => null);
        throw new Error('Payment could not be prepared.');
      }

      const presentResult = await presentPaymentSheet();

      if (presentResult.error) {
        await cancelMemberBookingPayment(apiClient, { bookingId: draftBookingId }).catch(() => null);
        throw new Error('Payment was not completed.');
      }

      let confirmedBooking: MemberBooking;

      try {
        confirmedBooking = await confirmMemberBookingPayment(apiClient, {
          bookingId: draftBookingId,
          paymentIntentId: draft.paymentIntentId,
        });
      } catch {
        throw new BookingPaymentVerificationError();
      }

      return {
        status: 'payment_sheet_completed',
        booking: confirmedBooking,
      };
    } finally {
      setIsPresenting(false);
    }
  };

  return { presentBookingPaymentSheet, isPresenting };
}
