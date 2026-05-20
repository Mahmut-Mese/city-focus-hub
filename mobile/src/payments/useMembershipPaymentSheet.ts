import { useMemo, useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { createApiClient } from '../api/client';
import {
  cancelMemberMembershipAdjustment,
  changeMemberPlan,
  confirmMemberMembershipUpgradePayment,
  createMembershipSetupIntent,
  createMembershipSubscriptionFromSetupIntent,
  type MemberMembership,
  type MembershipSubscriptionResult,
} from '../api/member-api';
import { useAuth } from '../auth/AuthProvider';
import { getStoredSession } from '../auth/secure-storage';

const getApiBaseUrl = () => process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

const NON_ACTIVE_MEMBERSHIP_STATUSES = new Set([
  'pending',
  'incomplete',
  'past_due',
  'payment_failed',
  'canceled',
  'cancelled',
]);

function normaliseStatus(value: unknown): string {
  return typeof value === 'string' ? value.trim().toLowerCase() : '';
}

function isMembershipActivationPending(status: unknown): boolean {
  const normalised = normaliseStatus(status);
  return normalised.length === 0 || NON_ACTIVE_MEMBERSHIP_STATUSES.has(normalised);
}

export type MembershipPaymentSheetResult = {
  status: 'active' | 'activation_pending';
  membership: MembershipSubscriptionResult['membership'];
  activationPending: boolean;
};

export type MembershipPlanChangeSheetResult = {
  status: 'changed' | 'scheduled' | 'activation_pending';
  membership: MemberMembership | null;
  message?: string;
  scheduledPlanName?: string;
  effectiveDate?: string | null;
  paymentDueMinor?: number;
  currency?: string;
};

export function useMembershipPaymentSheet(): {
  presentMembershipPaymentSheet(planSlug: string): Promise<MembershipPaymentSheetResult>;
  presentMembershipPlanChangeSheet(planSlug: string): Promise<MembershipPlanChangeSheetResult>;
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

      const activationPending = isMembershipActivationPending(subscriptionResult.membership?.status);

      return {
        status: activationPending ? 'activation_pending' : 'active',
        membership: subscriptionResult.membership,
        activationPending,
      };
    } finally {
      setIsPresenting(false);
    }
  };

  const presentMembershipPlanChangeSheet = async (planSlug: string): Promise<MembershipPlanChangeSheetResult> => {
    setIsPresenting(true);

    try {
      const result = await changeMemberPlan(apiClient, planSlug);

      if (result.action === 'payment_required' && result.clientSecret && result.paymentIntentId && result.adjustmentId) {
        const initResult = await initPaymentSheet({
          merchantDisplayName: 'The Leadenhall Works',
          paymentIntentClientSecret: result.clientSecret,
        });

        if (initResult.error) {
          await cancelMemberMembershipAdjustment(apiClient, { adjustmentId: result.adjustmentId }).catch(() => undefined);
          throw new Error('Plan change payment could not be prepared.');
        }

        const presentResult = await presentPaymentSheet();

        if (presentResult.error) {
          await cancelMemberMembershipAdjustment(apiClient, { adjustmentId: result.adjustmentId }).catch(() => undefined);
          throw new Error('Plan change payment was not completed.');
        }

        try {
          const confirmedMembership = await confirmMemberMembershipUpgradePayment(apiClient, {
            paymentIntentId: result.paymentIntentId,
            adjustmentId: result.adjustmentId,
          });

          if (isMembershipActivationPending(confirmedMembership?.status)) {
            return {
              status: 'activation_pending',
              membership: confirmedMembership,
              message: 'Plan change is being finalised.',
              paymentDueMinor: result.paymentDueMinor,
              currency: result.currency,
            };
          }

          return {
            status: 'changed',
            membership: confirmedMembership,
            paymentDueMinor: result.paymentDueMinor,
            currency: result.currency,
          };
        } catch {
          throw new Error('Payment succeeded, but we could not verify your plan change yet. Please refresh in a moment.');
        }
      }

      if (result.action === 'scheduled') {
        return {
          status: 'scheduled',
          membership: result.membership,
          scheduledPlanName: result.scheduledPlanName,
          effectiveDate: result.effectiveDate,
        };
      }

      if (isMembershipActivationPending(result.membership?.status)) {
        return {
          status: 'activation_pending',
          membership: result.membership,
          message: 'Plan change is being finalised.',
          paymentDueMinor: result.paymentDueMinor,
          currency: result.currency,
        };
      }

      return {
        status: 'changed',
        membership: result.membership,
        paymentDueMinor: result.paymentDueMinor,
        currency: result.currency,
      };
    } finally {
      setIsPresenting(false);
    }
  };

  return { presentMembershipPaymentSheet, presentMembershipPlanChangeSheet, isPresenting };
}
