import { ApiClient } from './client';
import { buildMemberQuery, type MemberBooking, type MemberResource } from './member-api';

export type BookingDraftInput = {
  resourceId: number;
  bookingType: string;
  startAt: string;
  endAt: string;
  purpose: string;
  notes: string;
};

export type BookingPaymentIntentDraft = {
  booking: MemberBooking | null;
  clientSecret: string | null;
  paymentIntentId: string | null;
};

export type BookingCheckoutSessionDraft = {
  booking: MemberBooking | null;
  sessionId: string | null;
  url: string | null;
};

export type BookingResourcesQuery = {
  type?: string;
  startAt?: string;
  endAt?: string;
};

export function fetchBookingResources(apiClient: ApiClient, query: BookingResourcesQuery = {}): Promise<MemberResource[]> {
  return apiClient.request<MemberResource[]>(`/api/member-portal/resources${buildMemberQuery(query)}`);
}

export function createMemberBooking(apiClient: ApiClient, input: BookingDraftInput): Promise<MemberBooking> {
  return apiClient.request<MemberBooking>('/api/member-portal/bookings', {
    method: 'POST',
    body: input,
  });
}

export function createMemberBookingPaymentIntent(
  apiClient: ApiClient,
  input: BookingDraftInput,
): Promise<BookingPaymentIntentDraft> {
  return apiClient.request<BookingPaymentIntentDraft>('/api/member-portal/bookings/payment-intent', {
    method: 'POST',
    body: input,
  });
}

export function createMemberBookingCheckoutSession(
  apiClient: ApiClient,
  input: BookingDraftInput & { successUrl: string; cancelUrl: string },
): Promise<BookingCheckoutSessionDraft> {
  return apiClient.request<BookingCheckoutSessionDraft>('/api/member-portal/bookings/checkout-session', {
    method: 'POST',
    body: input,
  });
}

export function syncMemberBookingCheckoutSession(apiClient: ApiClient, sessionId: string): Promise<MemberBooking> {
  return apiClient.request<MemberBooking>('/api/member-portal/bookings/sync-checkout-session', {
    method: 'POST',
    body: { sessionId },
  });
}
