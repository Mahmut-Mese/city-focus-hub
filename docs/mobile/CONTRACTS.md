# Mobile Contracts

These contracts are the source of truth for agent tasks. Agents implement against these names and shapes unless LEAD updates this file.

## API Response Shape

Successful responses use one of these shapes:

```ts
type ApiSuccess<T> = T | { data: T };
```

Errors follow the existing backend style:

```ts
type ApiErrorResponse = {
  error: string;
  details?: unknown;
};
```

Mobile API client normalizes errors to:

```ts
class ApiError extends Error {
  status: number;
  details?: unknown;
}
```

## Mobile App Routes

Navigation route names:

```ts
type PublicRouteName =
  | 'Home'
  | 'Pricing'
  | 'MeetingRooms'
  | 'VirtualOffice'
  | 'About'
  | 'FAQ'
  | 'BlogList'
  | 'BlogDetail'
  | 'Contact'
  | 'Privacy'
  | 'Terms';

type AuthRouteName =
  | 'Login'
  | 'Register'
  | 'ForgotPassword'
  | 'ResetPassword';

type MemberRouteName =
  | 'Dashboard'
  | 'Bookings'
  | 'BookRoom'
  | 'Membership'
  | 'Invoices'
  | 'Profile'
  | 'Settings'
  | 'NotificationPreferences'
  | 'AccessStatus'
  | 'AccountDeletion';
```

## Mobile API Client

File: `mobile/src/api/client.ts`

Exports:

```ts
export class ApiError extends Error {
  status: number;
  details?: unknown;
}

export type ApiClientOptions = {
  baseUrl: string;
  getAccessToken?: () => Promise<string | null>;
  refreshAccessToken?: () => Promise<string | null>;
  onAuthExpired?: () => void;
};

export type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  idempotencyKey?: string;
  timeoutMs?: number;
  skipAuth?: boolean;
};

export class ApiClient {
  constructor(options: ApiClientOptions);
  request<T>(path: string, options?: RequestOptions): Promise<T>;
}

export function createApiClient(options: ApiClientOptions): ApiClient;
```

## Secure Storage

File: `mobile/src/auth/secure-storage.ts`

Exports:

```ts
export type StoredMobileSession = {
  accessToken: string | null;
  refreshToken: string | null;
  sessionId: string | null;
};

export function getStoredSession(): Promise<StoredMobileSession>;
export function storeSession(session: StoredMobileSession): Promise<void>;
export function clearStoredSession(): Promise<void>;
```

## Auth Provider

File: `mobile/src/auth/AuthProvider.tsx`

Exports:

```ts
export type MobileMember = {
  id: number;
  email: string;
  name: string;
  role?: string;
  membershipStatus?: string;
};

export type AuthContextValue = {
  user: MobileMember | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login(email: string, password: string): Promise<void>;
  register(input: RegisterInput): Promise<void>;
  logout(): Promise<void>;
  refreshSession(): Promise<void>;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export function AuthProvider(props: { children: React.ReactNode }): JSX.Element;
export function useAuth(): AuthContextValue;
```

## Backend Mobile Auth Endpoints

Base path: `/api/v1/mobile-auth`

```txt
POST /login
Body: { email: string, password: string, deviceName?: string, platform?: 'ios' | 'android' }
200: { user: MobileMember, accessToken: string, refreshToken: string, sessionId: string, expiresIn: number }

POST /register
Body: { name: string, email: string, password: string, deviceName?: string, platform?: 'ios' | 'android' }
201: { user: MobileMember, accessToken: string, refreshToken: string, sessionId: string, expiresIn: number }

POST /refresh
Body: { refreshToken: string, sessionId: string }
200: { accessToken: string, refreshToken: string, sessionId: string, expiresIn: number }

POST /logout
Body: { refreshToken?: string, sessionId?: string }
204: empty

GET /session
Auth: Bearer access token
200: { user: MobileMember, sessionId: string }
```

## Backend Mobile Auth Service

File: `adminjs/src/services/mobile-auth-service.js`

Exports:

```js
export async function loginMobileUser({ email, password, deviceName, platform, ipAddress, userAgent });
export async function registerMobileUser({ name, email, password, deviceName, platform, ipAddress, userAgent });
export async function refreshMobileSession({ refreshToken, sessionId, ipAddress, userAgent });
export async function revokeMobileSession({ sessionId, refreshToken, reason });
export async function revokeAllMobileSessionsForUser({ userId, reason });
export async function verifyMobileAccessToken(accessToken);
```

Security requirements:

- Refresh tokens are opaque random strings, stored hashed.
- Refresh token rotation is mandatory.
- Reuse of a rotated token revokes the session family.
- Access tokens are short-lived.
- Token values are never logged.

## Mobile Auth Tables

```sql
mobile_sessions(
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  session_id CHAR(36) NOT NULL UNIQUE,
  device_name VARCHAR(255),
  platform VARCHAR(32),
  user_agent TEXT,
  ip_address VARCHAR(64),
  status VARCHAR(32) NOT NULL DEFAULT 'active',
  compromised_at DATETIME NULL,
  revoked_at DATETIME NULL,
  revoked_reason VARCHAR(255) NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  last_seen_at DATETIME NULL
);

mobile_refresh_tokens(
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  session_id CHAR(36) NOT NULL,
  token_hash CHAR(64) NOT NULL UNIQUE,
  family_id CHAR(36) NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'active',
  expires_at DATETIME NOT NULL,
  rotated_at DATETIME NULL,
  revoked_at DATETIME NULL,
  created_at DATETIME NOT NULL
);

mobile_auth_audit_events(
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NULL,
  session_id CHAR(36) NULL,
  event_type VARCHAR(64) NOT NULL,
  ip_address VARCHAR(64),
  user_agent TEXT,
  details_json JSON NULL,
  created_at DATETIME NOT NULL
);
```

## Push Endpoints

Base path: `/api/member-portal`

```txt
POST /push-tokens
Body: { token: string, platform: 'ios' | 'android', deviceId?: string, sessionId?: string }
200: { ok: true }

DELETE /push-tokens
Body: { token?: string, deviceId?: string, sessionId?: string }
204: empty

GET /notification-preferences
200: { booking: boolean, payments: boolean, membership: boolean, access: boolean, marketing: boolean, quietHoursStart?: string, quietHoursEnd?: string }

PUT /notification-preferences
Body: same shape as GET response
200: same shape as GET response
```

## Access Status Endpoints

```txt
GET /api/member-portal/access-status
200: { status: 'active' | 'pending' | 'grace_period' | 'suspended' | 'expired' | 'sync_failed' | 'unavailable', lastSyncAt?: string, nextBookingWindow?: { startsAt: string, endsAt: string, roomName?: string }, supportMessage?: string }

POST /api/member-portal/access-sync/request
Body: { reason?: string }
202: { status: 'queued' | 'pending', message: string }
```

## Version Policy Endpoint

```txt
GET /api/mobile-app/version-policy?platform=ios&version=1.0.0
200: { minSupportedVersion: string, recommendedVersion: string, message?: string, storeUrl?: string }
```
