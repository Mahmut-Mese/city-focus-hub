import { API_URL } from './api-config';
export const MEMBER_AUTH_EXPIRED_EVENT = 'city-focus-hub.member-auth-expired';

// P0-3: CSRF token cache — fetched once per session, sent on every state-mutating request
let csrfToken: string | null = null;

async function fetchCsrfToken(): Promise<string | null> {
  if (csrfToken) return csrfToken;

  try {
    const response = await fetch(`${API_URL}/member-auth/csrf-token`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      csrfToken = data?.csrfToken || null;
    }
  } catch {
    // Token fetch failed — will be retried on next mutating request
  }

  return csrfToken;
}

export function clearCsrfToken() {
  csrfToken = null;
}

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  /** Request timeout in milliseconds. Defaults to 30 000 ms. */
  timeoutMs?: number;
};

const DEFAULT_TIMEOUT_MS = 30_000;

async function requestApi<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const hasBody = options.body !== undefined;
  const method = options.method || 'GET';
  const isMutating = method !== 'GET' && method !== 'HEAD';

  // P0-3: Attach CSRF token to state-mutating requests
  const headers: Record<string, string> = {};
  if (hasBody) {
    headers['Content-Type'] = 'application/json';
  }
  if (isMutating) {
    const token = await fetchCsrfToken();
    if (token) {
      headers['X-CSRF-Token'] = token;
    }
  }

  // #90: Enforce request timeout so hung requests don't block the UI indefinitely
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs ?? DEFAULT_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path.startsWith('/') ? path : `/${path}`}`, {
      method,
      credentials: 'include',
      headers: Object.keys(headers).length > 0 ? headers : undefined,
      body: hasBody ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }

  // #113: Surface non-JSON responses (e.g. 502 HTML error pages) instead of returning null
  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} (non-JSON response)`);
    }
  }

  if (!response.ok) {
    if (response.status === 401 && typeof window !== 'undefined') {
      window.dispatchEvent(new Event(MEMBER_AUTH_EXPIRED_EVENT));
    }

    // P0-3: If CSRF token was rejected, clear cache so it gets re-fetched
    if (response.status === 403 && typeof payload === 'object' && payload !== null && 'error' in payload && String((payload as Record<string, unknown>).error).includes('CSRF')) {
      clearCsrfToken();
    }

    const errorMessage = payload && typeof payload === 'object' && 'error' in payload
      ? String((payload as Record<string, unknown>).error)
      : `API request failed: ${response.status}`;
    throw new Error(errorMessage);
  }

  return payload as T;
}

export type MemberUser = {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  initials: string;
  accessStatus: string;
};

export type MembershipPlan = {
  id: number;
  slug: string;
  name: string;
  description: string;
  monthlyPriceMinor: number;
  currency: string;
  features: string[];
};

export type MemberMembership = {
  id: number;
  planId: number;
  planSlug: string;
  planName: string;
  monthlyPriceMinor: number;
  currency: string;
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  scheduledPlanId: number | null;
  scheduledPlanSlug: string | null;
  scheduledPlanName: string | null;
  scheduledPlanMonthlyPriceMinor: number | null;
};

export type MemberBooking = {
  id: number;
  resourceId: number;
  resourceName: string;
  resourceType: string;
  location: string;
  bookingType: string;
  status: string;
  startAt: string;
  endAt: string;
  purpose: string;
  notes: string;
  subtotalMinor: number;
  taxMinor: number;
  totalMinor: number;
  currency: string;
  capacity: string;
  attendees: string;
  refundRequestStatus: string | null;
  refundRequestedAt: string | null;
};

export type MemberInvoice = {
  id: number;
  stripeInvoiceId: string | null;
  stripePaymentIntentId: string | null;
  invoiceNumber: string | null;
  status: string;
  description: string;
  currency: string;
  subtotalMinor: number;
  taxMinor: number;
  totalMinor: number;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
  paidAt: string | null;
  createdAt: string | null;
};

export type MemberResource = {
  id: number;
  slug: string;
  type: string;
  name: string;
  description: string;
  capacity: number;
  hourlyRateMinor: number;
  active: boolean;
  available?: boolean;
  metadata: Record<string, unknown>;
};

export type PublicMeetingRoomAvailability = {
  resources: MemberResource[];
  stripe: {
    publishableKey: string;
    mode: string;
  };
};

export type MemberDashboardPayload = {
  user: MemberUser;
  membership: MemberMembership | null;
  plans: MembershipPlan[];
  bookings: MemberBooking[];
  invoices: MemberInvoice[];
  resources: MemberResource[];
  stats: {
    daysCheckedIn: number;
    meetingRoomBookings: number;
    currentMembership: string;
  };
  stripe: {
    publishableKey: string;
    mode: string;
  };
};

export type MembershipCheckoutSession = {
  sessionId: string;
  url: string | null;
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

export type BookingPaymentDraft = {
  booking: MemberBooking | null;
  clientSecret: string | null;
  paymentIntentId: string | null;
};

export type BookingCheckoutSession = {
  booking: MemberBooking | null;
  sessionId: string | null;
  url: string | null;
};

export type MemberBookingUpdateResult = {
  booking: MemberBooking | null;
  adjustmentId: number | null;
  action: string;
  paymentDueMinor: number;
  refundMinor: number;
  clientSecret?: string | null;
  paymentIntentId?: string | null;
  subtotalMinor?: number;
  taxMinor?: number;
  currency?: string;
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

export type MembershipPaymentDraft = {
  clientSecret: string;
  paymentIntentId: string;
  subscriptionId: string;
  membershipId: number;
  plan: {
    slug: string;
    name: string;
    monthlyPriceMinor: number;
    currency: string;
  };
  subtotalMinor: number;
  taxMinor: number;
  totalMinor: number;
  currency: string;
};

export async function registerMember(payload: { name: string; email: string; password: string }) {
  const response = await requestApi<{ data: MemberUser }>('/member-auth/register', {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function loginMember(payload: { email: string; password: string }) {
  const response = await requestApi<{ data: MemberUser }>('/member-auth/login', {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function getCurrentMemberSession() {
  const response = await requestApi<{ data: MemberUser }>('/member-auth/session');
  return response.data;
}

export async function logoutMember() {
  const response = await requestApi<{ ok: boolean }>('/member-auth/logout', {
    method: 'POST',
  });
  // P0-3: Clear cached CSRF token on logout
  clearCsrfToken();
  return response.ok;
}

export async function changeMemberPassword(payload: {
  currentPassword: string;
  newPassword: string;
}) {
  const response = await requestApi<{ ok: boolean }>('/member-auth/change-password', {
    method: 'POST',
    body: payload,
  });
  return response.ok;
}

export async function updateMemberProfile(payload: {
  name: string;
  email: string;
  phone: string;
}) {
  const response = await requestApi<{ data: MemberUser }>('/member-portal/profile', {
    method: 'PUT',
    body: payload,
  });
  return response.data;
}

export async function getMemberDashboard() {
  const response = await requestApi<{ data: MemberDashboardPayload }>('/member-portal/dashboard');
  return response.data;
}

export async function createMemberMembership(planSlug: string) {
  const response = await requestApi<{ data: MemberMembership }>('/member-portal/memberships', {
    method: 'POST',
    body: { planSlug },
  });
  return response.data;
}

export async function createMemberMembershipPaymentDraft(planSlug: string) {
  const response = await requestApi<{ data: MembershipPaymentDraft }>('/member-portal/memberships/payment-draft', {
    method: 'POST',
    body: { planSlug },
  });
  return response.data;
}

export async function confirmMemberMembershipPayment(paymentIntentId: string) {
  const response = await requestApi<{ data: MemberMembership }>('/member-portal/memberships/confirm-payment', {
    method: 'POST',
    body: { paymentIntentId },
  });
  return response.data;
}

export async function confirmMemberMembershipUpgradePayment(paymentIntentId: string, adjustmentId: number) {
  const response = await requestApi<{ data: MemberMembership }>('/member-portal/memberships/confirm-upgrade-payment', {
    method: 'POST',
    body: { paymentIntentId, adjustmentId },
  });
  return response.data;
}

export async function createMemberMembershipCheckoutSession(
  planSlug: string,
  successUrl: string,
  cancelUrl: string,
) {
  const response = await requestApi<{ data: MembershipCheckoutSession }>('/member-portal/memberships/checkout-session', {
    method: 'POST',
    body: { planSlug, successUrl, cancelUrl },
  });
  return response.data;
}

export async function syncMemberMembershipCheckoutSession(sessionId: string) {
  const response = await requestApi<{ data: MemberMembership | null }>('/member-portal/memberships/sync-checkout-session', {
    method: 'POST',
    body: { sessionId },
  });
  return response.data;
}

export async function changeMemberPlan(
  planSlug: string,
  options: { successUrl?: string; cancelUrl?: string } = {},
) {
  const response = await requestApi<{ data: MemberMembershipChangeResult }>('/member-portal/memberships/change-plan', {
    method: 'POST',
    body: {
      planSlug,
      successUrl: options.successUrl || '',
      cancelUrl: options.cancelUrl || '',
    },
  });
  return response.data;
}

export async function previewMemberPlanChange(planSlug: string) {
  const response = await requestApi<{ data: MembershipPlanChangePreview }>('/member-portal/memberships/change-plan/preview', {
    method: 'POST',
    body: { planSlug },
  });
  return response.data;
}

export async function cancelMemberMembership() {
  const response = await requestApi<{ data: MemberMembership }>('/member-portal/memberships/cancel', {
    method: 'POST',
  });
  return response.data;
}

export async function cancelMemberScheduledDowngrade() {
  const response = await requestApi<{ data: MemberMembership }>('/member-portal/memberships/cancel-scheduled-downgrade', {
    method: 'POST',
  });
  return response.data;
}

export async function syncMemberMembershipAdjustmentCheckoutSession({ sessionId }: { sessionId: string }) {
  const response = await requestApi<{ data: MemberMembership | null }>('/member-portal/memberships/adjustments/sync-checkout-session', {
    method: 'POST',
    body: { sessionId },
  });
  return response.data;
}

export async function cancelMemberMembershipAdjustment({ adjustmentId }: { adjustmentId: number }) {
  const response = await requestApi<{ ok: boolean }>(`/member-portal/memberships/adjustments/${adjustmentId}/cancel`, {
    method: 'POST',
  });
  return response.ok;
}

export async function listMemberResources(options: { type?: string; startAt?: string; endAt?: string } = {}) {
  const searchParams = new URLSearchParams();

  if (options.type) {
    searchParams.set('type', options.type);
  }

  if (options.startAt) {
    searchParams.set('startAt', options.startAt);
  }

  if (options.endAt) {
    searchParams.set('endAt', options.endAt);
  }

  const response = await requestApi<{ data: MemberResource[] }>(`/member-portal/resources?${searchParams.toString()}`);
  return response.data;
}

export async function listPublicMeetingRoomResources(options: { startAt?: string; endAt?: string } = {}) {
  const searchParams = new URLSearchParams();

  if (options.startAt) {
    searchParams.set('startAt', options.startAt);
  }

  if (options.endAt) {
    searchParams.set('endAt', options.endAt);
  }

  const response = await requestApi<{ data: PublicMeetingRoomAvailability }>(`/public/meeting-rooms/resources?${searchParams.toString()}`);
  return response.data;
}

export async function createMemberBooking(payload: {
  resourceId: number;
  bookingType: string;
  startAt: string;
  endAt: string;
  purpose: string;
  notes: string;
}) {
  const response = await requestApi<{ data: MemberBooking }>('/member-portal/bookings', {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function createMemberBookingPaymentIntent(payload: {
  resourceId: number;
  bookingType: string;
  startAt: string;
  endAt: string;
  purpose: string;
  notes: string;
}) {
  const response = await requestApi<{ data: BookingPaymentDraft }>('/member-portal/bookings/payment-intent', {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function createMemberBookingCheckoutSession(payload: {
  resourceId: number;
  bookingType: string;
  startAt: string;
  endAt: string;
  purpose: string;
  notes: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const response = await requestApi<{ data: BookingCheckoutSession }>('/member-portal/bookings/checkout-session', {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function syncMemberBookingCheckoutSession(payload: { sessionId: string }) {
  const response = await requestApi<{ data: MemberBooking }>('/member-portal/bookings/sync-checkout-session', {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function syncMemberBookingAdjustmentCheckoutSession(payload: { sessionId: string }) {
  const response = await requestApi<{ data: MemberBooking }>('/member-portal/bookings/adjustments/sync-checkout-session', {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function confirmMemberBookingPayment(payload: {
  bookingId: number;
  paymentIntentId: string;
}) {
  const response = await requestApi<{ data: MemberBooking }>(`/member-portal/bookings/${payload.bookingId}/confirm`, {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function cancelMemberBookingPayment(payload: {
  bookingId: number;
}) {
  const response = await requestApi<{ data: MemberBooking | null }>(`/member-portal/bookings/${payload.bookingId}/cancel`, {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function cancelMemberBooking(payload: {
  bookingId: number;
}) {
  const response = await requestApi<{ data: MemberBooking | null }>(`/member-portal/bookings/${payload.bookingId}/cancel-and-refund`, {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function cancelMemberBookingAdjustment(payload: {
  adjustmentId: number;
}) {
  const response = await requestApi<{ ok: boolean }>(`/member-portal/bookings/adjustments/${payload.adjustmentId}/cancel`, {
    method: 'POST',
    body: payload,
  });
  return response.ok;
}

export async function confirmMemberBookingAdjustmentPayment(paymentIntentId: string, adjustmentId: number) {
  const response = await requestApi<{ data: MemberBooking }>('/member-portal/bookings/adjustments/confirm-payment', {
    method: 'POST',
    body: { paymentIntentId, adjustmentId },
  });
  return response.data;
}

export async function createGuestMeetingRoomBookingPaymentIntent(payload: {
  guestName: string;
  guestEmail: string;
  resourceId: number;
  startAt: string;
  endAt: string;
  purpose: string;
  notes: string;
}) {
  const response = await requestApi<{ data: BookingPaymentDraft }>('/public/meeting-rooms/bookings/payment-intent', {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function createGuestMeetingRoomBookingCheckoutSession(payload: {
  guestName: string;
  guestEmail: string;
  resourceId: number;
  startAt: string;
  endAt: string;
  purpose: string;
  notes: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const response = await requestApi<{ data: BookingCheckoutSession }>('/public/meeting-rooms/bookings/checkout-session', {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function syncGuestMeetingRoomBookingCheckoutSession(payload: {
  guestEmail: string;
  sessionId: string;
}) {
  const response = await requestApi<{ data: MemberBooking }>('/public/meeting-rooms/bookings/sync-checkout-session', {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function confirmGuestMeetingRoomBookingPayment(payload: {
  bookingId: number;
  guestEmail: string;
  paymentIntentId: string;
}) {
  const response = await requestApi<{ data: MemberBooking }>(`/public/meeting-rooms/bookings/${payload.bookingId}/confirm`, {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function cancelGuestMeetingRoomBookingPayment(payload: {
  bookingId: number;
  guestEmail: string;
  paymentIntentId: string;
}) {
  const response = await requestApi<{ data: MemberBooking | null }>(`/public/meeting-rooms/bookings/${payload.bookingId}/cancel`, {
    method: 'POST',
    body: payload,
  });
  return response.data;
}

export async function updateMemberBooking(payload: {
  bookingId: number;
  resourceId: number;
  startAt: string;
  endAt: string;
  purpose: string;
  notes: string;
}) {
  const response = await requestApi<{ data: MemberBookingUpdateResult }>(`/member-portal/bookings/${payload.bookingId}`, {
    method: 'PUT',
    body: payload,
  });
  return response.data;
}
