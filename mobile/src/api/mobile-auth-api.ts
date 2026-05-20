import { ApiClient } from './client';

export type MobileMember = {
  id: number;
  email: string;
  name: string;
  role?: string;
  membershipStatus?: string;
};

export type MobileAuthSessionResponse = {
  user: MobileMember;
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  expiresIn: number;
};

export type MobileRefreshResponse = {
  accessToken: string;
  refreshToken: string;
  sessionId: string;
  expiresIn: number;
};

export type MobileSessionResponse = {
  user: MobileMember;
  sessionId: string;
};

export type MobileLoginInput = {
  email: string;
  password: string;
  deviceName?: string;
  platform?: 'ios' | 'android';
};

export type MobileRegisterInput = {
  name: string;
  email: string;
  password: string;
  deviceName?: string;
  platform?: 'ios' | 'android';
};

export type MobileRefreshInput = {
  refreshToken: string;
  sessionId: string;
};

export type MobileLogoutInput = {
  refreshToken?: string;
  sessionId?: string;
};

export type MobileForgotPasswordInput = {
  email: string;
};

export type MobileResetPasswordInput = {
  token: string;
  newPassword: string;
};

export type MobileForgotResetResponse = {
  ok: true;
};

export type MobileChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
};

export function loginMobile(apiClient: ApiClient, input: MobileLoginInput): Promise<MobileAuthSessionResponse> {
  return apiClient.request<MobileAuthSessionResponse>('/api/v1/mobile-auth/login', {
    method: 'POST',
    body: input,
    skipAuth: true,
  });
}

export function registerMobile(apiClient: ApiClient, input: MobileRegisterInput): Promise<MobileAuthSessionResponse> {
  return apiClient.request<MobileAuthSessionResponse>('/api/v1/mobile-auth/register', {
    method: 'POST',
    body: input,
    skipAuth: true,
  });
}

export function refreshMobileSession(apiClient: ApiClient, input: MobileRefreshInput): Promise<MobileRefreshResponse> {
  return apiClient.request<MobileRefreshResponse>('/api/v1/mobile-auth/refresh', {
    method: 'POST',
    body: input,
    skipAuth: true,
  });
}

export async function logoutMobile(apiClient: ApiClient, input: MobileLogoutInput = {}): Promise<void> {
  await apiClient.request<void>('/api/v1/mobile-auth/logout', {
    method: 'POST',
    body: input,
    skipAuth: true,
  });
}

export function getMobileSession(apiClient: ApiClient): Promise<MobileSessionResponse> {
  return apiClient.request<MobileSessionResponse>('/api/v1/mobile-auth/session');
}

export function forgotMobilePassword(
  apiClient: ApiClient,
  input: MobileForgotPasswordInput,
): Promise<MobileForgotResetResponse> {
  return apiClient.request<MobileForgotResetResponse>('/api/v1/mobile-auth/forgot-password', {
    method: 'POST',
    body: input,
    skipAuth: true,
  });
}

export function resetMobilePassword(
  apiClient: ApiClient,
  input: MobileResetPasswordInput,
): Promise<MobileForgotResetResponse> {
  return apiClient.request<MobileForgotResetResponse>('/api/v1/mobile-auth/reset-password', {
    method: 'POST',
    body: input,
    skipAuth: true,
  });
}

export function changeMobilePassword(
  apiClient: ApiClient,
  input: MobileChangePasswordInput,
): Promise<MobileForgotResetResponse> {
  return apiClient.request<MobileForgotResetResponse>('/api/v1/mobile-auth/change-password', {
    method: 'POST',
    body: input,
  });
}
