import { useMemo, useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { createApiClient } from '../api/client';
import {
  createMembershipSetupIntent,
  createMembershipSubscriptionFromSetupIntent,
  type MembershipSubscriptionResult,
} from '../api/member-api';
import { useAuth } from '../auth/AuthProvider';
import { getStoredSession } from '../auth/secure-storage';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

export type MembershipPaymentSheetResult = {
  status: 'activation_pending';
  membership: MembershipSubscriptionResult['membership'];
  activationPending: true;
};

export function useMembershipPaymentSheet(): {
  presentMembershipPaymentSheet(planSlug: string): Promise<MembershipPaymentSheetResult>;
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

  const presentMembershipPaymentSheet = async (planSlug: string): Promise<MembershipPaymentSheetResult> => {
    setIsPresenting(true);

    try {
      const setupDraft = await createMembershipSetupIntent(apiClient, planSlug);

      if (!setupDraft.clientSecret) {
        throw new Error('Membership payment could not be prepared.');
      }

      const initResult = await initPaymentSheet({
        merchantDisplayName: 'The Leadenhall Works',
        setupIntentClientSecret: setupDraft.clientSecret,
        customerId: setupDraft.customerId,
      });

      if (initResult.error) {
        throw new Error('Membership payment could not be prepared.');
      }

      const presentResult = await presentPaymentSheet();

      if (presentResult.error) {
        throw new Error('Membership payment was not completed.');
      }

      const subscriptionResult = await createMembershipSubscriptionFromSetupIntent(apiClient, {
        planSlug,
        setupIntentId: setupDraft.setupIntentId,
      });

      return {
        status: 'activation_pending',
        membership: subscriptionResult.membership,
        activationPending: true,
      };
    } finally {
      setIsPresenting(false);
    }
  };

  return { presentMembershipPaymentSheet, isPresenting };
}
