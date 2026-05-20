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

export type GuestMeetingRoomBookingPaymentInput = {
  resourceId: number;
  startAt: string;
  endAt: string;
  purpose: string;
  notes: string;
  guestName: string;
  guestEmail: string;
};

export type BookingResourcesQuery = {
  type?: string;
  startAt?: string;
  endAt?: string;
};

export type PublicMeetingRoomAvailability = {
  resources: MemberResource[];
  stripe?: {
    publishableKey?: string;
    mode?: string;
  };
};

export function fetchBookingResources(apiClient: ApiClient, query: BookingResourcesQuery = {}): Promise<MemberResource[]> {
  return apiClient.request<MemberResource[]>(`/api/member-portal/resources${buildMemberQuery(query)}`);
}

export function listPublicMeetingRoomResources(apiClient: ApiClient, query: BookingResourcesQuery = {}): Promise<PublicMeetingRoomAvailability> {
  return apiClient.request<PublicMeetingRoomAvailability>(`/api/public/meeting-rooms/resources${buildMemberQuery(query)}`, { skipAuth: true });
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

export function confirmMemberBookingPayment(
  apiClient: ApiClient,
  input: { bookingId: number; paymentIntentId: string },
): Promise<MemberBooking> {
  return apiClient.request<MemberBooking>(`/api/member-portal/bookings/${input.bookingId}/confirm`, {
    method: 'POST',
    body: {
      bookingId: input.bookingId,
      paymentIntentId: input.paymentIntentId,
    },
  });
}

export function cancelMemberBookingPayment(
  apiClient: ApiClient,
  input: { bookingId: number },
): Promise<MemberBooking | null> {
  return apiClient.request<MemberBooking | null>(`/api/member-portal/bookings/${input.bookingId}/cancel`, {
    method: 'POST',
    body: {
      bookingId: input.bookingId,
    },
  });
}

export function cancelMemberBooking(
  apiClient: ApiClient,
  input: { bookingId: number },
): Promise<MemberBooking | null> {
  return apiClient.request<MemberBooking | null>(`/api/member-portal/bookings/${input.bookingId}/cancel-and-refund`, {
    method: 'POST',
    body: {
      bookingId: input.bookingId,
    },
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

export function createGuestMeetingRoomBookingPaymentIntent(
  apiClient: ApiClient,
  input: GuestMeetingRoomBookingPaymentInput,
): Promise<BookingPaymentIntentDraft> {
  return apiClient.request<BookingPaymentIntentDraft>('/api/public/meeting-rooms/bookings/payment-intent', {
    method: 'POST',
    body: input,
    skipAuth: true,
  });
}

export function confirmGuestMeetingRoomBookingPayment(
  apiClient: ApiClient,
  input: { bookingId: number; guestEmail: string; paymentIntentId: string },
): Promise<MemberBooking> {
  return apiClient.request<MemberBooking>(`/api/public/meeting-rooms/bookings/${input.bookingId}/confirm`, {
    method: 'POST',
    body: {
      guestEmail: input.guestEmail,
      paymentIntentId: input.paymentIntentId,
    },
    skipAuth: true,
  });
}

export function cancelGuestMeetingRoomBookingPayment(
  apiClient: ApiClient,
  input: { bookingId: number; guestEmail: string; paymentIntentId: string },
): Promise<MemberBooking | null> {
  return apiClient.request<MemberBooking | null>(`/api/public/meeting-rooms/bookings/${input.bookingId}/cancel`, {
    method: 'POST',
    body: {
      guestEmail: input.guestEmail,
      paymentIntentId: input.paymentIntentId,
    },
    skipAuth: true,
  });
}
