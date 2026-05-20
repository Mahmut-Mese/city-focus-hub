import { ApiClient } from './client';

export type MemberRecord = Record<string, unknown>;

export type MemberUser = MemberRecord & {
  id: number;
  name: string;
  email: string;
  phone?: string | null;
  accessStatus?: string;
};

export type MemberMembership = MemberRecord & {
  id: number;
  status: string;
  planName?: string;
  planSlug?: string;
};

export type MembershipPlan = MemberRecord & {
  id: number;
  slug: string;
  name: string;
};

export type MembershipPaymentPlanSummary = {
  slug: string;
  name: string;
  monthlyPriceMinor: number;
  currency: string;
};

export type MembershipSetupIntentDraft = {
  clientSecret: string;
  setupIntentId: string;
  customerId: string;
  plan: MembershipPaymentPlanSummary;
};

export type MembershipSubscriptionInput = {
  planSlug: string;
  setupIntentId: string;
};

export type MembershipSubscriptionResult = {
  membership: MemberMembership | null;
  subscriptionId: string;
  activationPending: true;
};

export type MembershipPlanChangePreview = {
  currentPlan: {
    slug: string;
    name: string;
    monthlyPriceMinor: number;
    currency: string;
  };
  nextPlan: {
    slug: string;
    name: string;
    monthlyPriceMinor: number;
    currency: string;
  };
  preview: {
    currency: string;
    subtotalMinor: number;
    taxMinor: number;
    totalMinor: number;
    amountDueMinor: number;
    amountRemainingMinor: number;
    nextPaymentAttemptAt: string | null;
    periodEnd: string | null;
    prorationDate: string | null;
  };
  settlement: {
    action: string;
    currency: string;
    subtotalMinor: number;
    taxMinor: number;
    totalMinor: number;
    paymentDueMinor: number;
    refundMinor: number;
  };
};

export type MemberMembershipChangeResult = {
  membership: MemberMembership | null;
  adjustmentId: number | null;
  action: string;
  paymentDueMinor: number;
  refundMinor: number;
  clientSecret?: string | null;
  paymentIntentId?: string | null;
  subtotalMinor?: number;
  taxMinor?: number;
  currency?: string;
  scheduledPlanName?: string;
  effectiveDate?: string | null;
};

export type MemberBooking = MemberRecord & {
  id: number;
  status: string;
  startAt: string;
  endAt: string;
  resourceName?: string;
};

export type MemberInvoice = MemberRecord & {
  id: number;
  status: string;
  invoiceNumber?: string | null;
  hostedInvoiceUrl?: string | null;
  invoicePdf?: string | null;
  totalMinor?: number;
  currency?: string;
  createdAt?: string | null;
};

export type MemberResource = MemberRecord & {
  id: number;
  type: string;
  name: string;
  capacity?: number;
  available?: boolean;
};

export type MemberDashboardPayload = {
  user: MemberUser;
  membership: MemberMembership | null;
  plans: MembershipPlan[];
  bookings: MemberBooking[];
  invoices: MemberInvoice[];
  resources: MemberResource[];
  stats?: Record<string, unknown>;
  stripe?: Record<string, unknown>;
};

export type MemberResourcesQuery = {
  type?: string;
  startAt?: string;
  endAt?: string;
};

export type UpdateMemberProfileInput = {
  name: string;
  email: string;
  phone: string;
};

export type PushPlatform = 'ios' | 'android';

export type RegisterPushTokenInput = {
  token: string;
  platform: PushPlatform;
  deviceId?: string;
  sessionId?: string;
};

export type NotificationPreferences = {
  booking: boolean;
  payments: boolean;
  membership: boolean;
  access: boolean;
  marketing: boolean;
  quietHoursStart?: string | null;
  quietHoursEnd?: string | null;
};

export type AccountDeletionStatus = {
  id: number;
  userId: number;
  status: string;
  reason?: string | null;
  requestedAt?: string | null;
  scheduledDeletionAt?: string | null;
  cancelledAt?: string | null;
  completedAt?: string | null;
  cancelledReason?: string | null;
  completedReason?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type QueryValue = string | number | boolean | undefined | null;

export function buildMemberQuery(params: Record<string, QueryValue>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export function fetchMemberDashboard(apiClient: ApiClient): Promise<MemberDashboardPayload> {
  return apiClient.request<MemberDashboardPayload>('/api/member-portal/dashboard');
}

export async function fetchMemberProfile(apiClient: ApiClient): Promise<MemberUser> {
  const dashboard = await fetchMemberDashboard(apiClient);
  return dashboard.user;
}

export function updateMemberProfile(apiClient: ApiClient, input: UpdateMemberProfileInput): Promise<MemberUser> {
  return apiClient.request<MemberUser>('/api/member-portal/profile', {
    method: 'PUT',
    body: input,
  });
}

export function fetchMemberResources(apiClient: ApiClient, query: MemberResourcesQuery = {}): Promise<MemberResource[]> {
  return apiClient.request<MemberResource[]>(`/api/member-portal/resources${buildMemberQuery(query)}`);
}

export function fetchMemberInvoices(apiClient: ApiClient): Promise<MemberInvoice[]> {
  return apiClient.request<MemberInvoice[]>('/api/member-portal/invoices');
}

export async function fetchMemberBookings(apiClient: ApiClient): Promise<MemberBooking[]> {
  const dashboard = await fetchMemberDashboard(apiClient);
  return dashboard.bookings;
}

export async function fetchMemberMembership(apiClient: ApiClient): Promise<MemberMembership | null> {
  const dashboard = await fetchMemberDashboard(apiClient);
  return dashboard.membership;
}

export function createMembershipSetupIntent(apiClient: ApiClient, planSlug: string): Promise<MembershipSetupIntentDraft> {
  return apiClient.request<MembershipSetupIntentDraft>('/api/member-portal/memberships/setup-intent', {
    method: 'POST',
    body: { planSlug },
  });
}

export function createMembershipSubscriptionFromSetupIntent(
  apiClient: ApiClient,
  input: MembershipSubscriptionInput,
): Promise<MembershipSubscriptionResult> {
  return apiClient.request<MembershipSubscriptionResult>('/api/member-portal/memberships/subscription', {
    method: 'POST',
    body: input,
  });
}

export function previewMemberPlanChange(apiClient: ApiClient, planSlug: string): Promise<MembershipPlanChangePreview> {
  return apiClient.request<MembershipPlanChangePreview>('/api/member-portal/memberships/change-plan/preview', {
    method: 'POST',
    body: { planSlug },
  });
}

export function changeMemberPlan(apiClient: ApiClient, planSlug: string): Promise<MemberMembershipChangeResult> {
  return apiClient.request<MemberMembershipChangeResult>('/api/member-portal/memberships/change-plan', {
    method: 'POST',
    body: { planSlug },
  });
}

export function confirmMemberMembershipUpgradePayment(
  apiClient: ApiClient,
  input: { paymentIntentId: string; adjustmentId: number },
): Promise<MemberMembership | null> {
  return apiClient.request<MemberMembership | null>('/api/member-portal/memberships/confirm-upgrade-payment', {
    method: 'POST',
    body: input,
  });
}

export function cancelMemberMembership(apiClient: ApiClient): Promise<MemberMembership | null> {
  return apiClient.request<MemberMembership | null>('/api/member-portal/memberships/cancel', {
    method: 'POST',
  });
}

export function cancelMemberScheduledDowngrade(apiClient: ApiClient): Promise<MemberMembership | null> {
  return apiClient.request<MemberMembership | null>('/api/member-portal/memberships/cancel-scheduled-downgrade', {
    method: 'POST',
  });
}

export async function cancelMemberMembershipAdjustment(
  apiClient: ApiClient,
  input: { adjustmentId: number },
): Promise<{ ok: boolean }> {
  return apiClient.request<{ ok: boolean }>(`/api/member-portal/memberships/adjustments/${input.adjustmentId}/cancel`, {
    method: 'POST',
  });
}

export function registerPushToken(apiClient: ApiClient, input: RegisterPushTokenInput): Promise<{ ok: true }> {
  return apiClient.request<{ ok: true }>('/api/member-portal/push-tokens', {
    method: 'POST',
    body: input,
  });
}

export async function deletePushToken(apiClient: ApiClient, input: { token?: string; deviceId?: string; sessionId?: string }): Promise<void> {
  await apiClient.request<void>('/api/member-portal/push-tokens', {
    method: 'DELETE',
    body: input,
  });
}

export function fetchNotificationPreferences(apiClient: ApiClient): Promise<NotificationPreferences> {
  return apiClient.request<NotificationPreferences>('/api/member-portal/notification-preferences');
}

export function updateNotificationPreferences(apiClient: ApiClient, input: NotificationPreferences): Promise<NotificationPreferences> {
  return apiClient.request<NotificationPreferences>('/api/member-portal/notification-preferences', {
    method: 'PUT',
    body: input,
  });
}

export function fetchAccountDeletionStatus(apiClient: ApiClient): Promise<AccountDeletionStatus | null> {
  return apiClient.request<AccountDeletionStatus | null>('/api/member-portal/account-deletion');
}

export function requestAccountDeletion(apiClient: ApiClient, reason: string): Promise<AccountDeletionStatus> {
  return apiClient.request<AccountDeletionStatus>('/api/member-portal/account-deletion/request', {
    method: 'POST',
    body: { reason },
  });
}

export function cancelAccountDeletion(apiClient: ApiClient, reason: string): Promise<AccountDeletionStatus> {
  return apiClient.request<AccountDeletionStatus>('/api/member-portal/account-deletion/cancel', {
    method: 'POST',
    body: { reason },
  });
}
