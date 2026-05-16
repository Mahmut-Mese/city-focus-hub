# Mobile App Plan

## Direction

Build a native mobile app for City Focus Hub. Do not use WebView.

The app should be app-store-grade from the start, with native screens, push notifications, Stripe payment support, and backend-managed Verkada door/access control.

## Core Architecture

- Mobile app: Expo React Native with TypeScript.
- Backend: existing Express/AdminJS/MySQL app.
- CMS/content: reuse existing public API endpoints.
- Payments: reuse existing Stripe backend flows, adapted to Stripe React Native where needed.
- Push notifications: native mobile push via Expo Notifications or direct FCM/APNs.
- Verkada: backend-only integration. The mobile app never calls Verkada directly.
- Access control: backend desired-state reconciliation. The backend decides what access a member should have, syncs that state to Verkada, and audits every change.

## Why No WebView

The app needs push notifications, door/access control, account utility, booking management, and App Store-grade UX. A WebView wrapper creates App Store review risk and would likely need to be replaced later.

Native screens avoid that risk and give the app real mobile functionality.

## Existing Website And Backend Summary

The current project already provides:

- Astro + React website.
- Express + AdminJS backend.
- MySQL data store.
- Member auth and member dashboard APIs.
- Meeting room booking APIs.
- Stripe payment and webhook handling.
- CMS content APIs.
- Transactional email support.
- AdminJS operational controls.

The mobile app should reuse backend business logic rather than duplicating it.

## Recommended Mobile Stack

- Expo React Native.
- TypeScript.
- React Navigation.
- TanStack Query.
- Expo SecureStore for mobile refresh/session storage.
- Expo Notifications or Firebase Cloud Messaging/APNs.
- Stripe React Native.
- Sentry React Native.
- Maestro or Detox for mobile smoke testing.

## V1 Product Boundaries

- No WebView.
- No direct mobile-to-Verkada API calls.
- No mobile door-unlock button in v1 unless Verkada explicitly supports the required mobile credential flow for this account. V1 manages access permissions, not live unlock control.
- Verkada access is members-only in v1. Guest access remains reception/manual.
- Public content screens are native and backed by CMS APIs.
- Logged-in member utility is native and app-specific.
- Backend remains the source of truth for auth, payments, bookings, memberships, access decisions, and audit logs.
- The mobile app may display access status, but it must not claim access is active until the backend has a confirmed successful Verkada sync.
- The mobile app may launch without door access if the Phase 0 feasibility spike fails. Access can ship in a later release. Mobile launch must not be blocked by access-control delivery.

## API Versioning And CORS

- Mobile-facing endpoints are introduced under `/api/v1/...` going forward. Existing website endpoints continue to work unchanged.
- Mobile traffic uses Bearer tokens, not cookies. CORS allow-list does not need to include the mobile app, but must continue to restrict cookie-authenticated origins (web) tightly.
- Bearer-authenticated routes must explicitly forbid cookie fallback, and cookie-authenticated routes must explicitly forbid Bearer fallback. This avoids token-confusion attacks where one auth path bypasses the other path's protections.

## Native Screens

### Public

- Home.
- Pricing.
- Meeting rooms.
- Virtual office.
- About.
- FAQ.
- Blog list.
- Blog detail.
- Contact.
- Privacy policy.
- Terms.

### Auth

- Login.
- Register.
- Forgot password.
- Reset password.
- Logout.

### Member

- Dashboard overview.
- My bookings.
- Book meeting room.
- Membership.
- Invoices.
- Profile.
- Settings.
- Notification preferences.
- Access status.
- Account deletion/request deletion.

## Backend API Reuse

Reuse existing public endpoints:

- `GET /api/site-setting`
- `GET /api/homepage`
- `GET /api/about-page`
- `GET /api/pricing-page`
- `GET /api/meeting-rooms-page`
- `GET /api/virtual-office-page`
- `GET /api/contact-page`
- `GET /api/faq-page`
- `GET /api/blog-page`
- `GET /api/privacy-policy-page`
- `GET /api/terms-page`
- `GET /api/blog-posts`
- `GET /api/faq-items`
- `GET /api/pricing-plans`
- `GET /api/meeting-rooms`
- `GET /api/public/plans`
- `POST /api/contact-submissions`

Reuse existing member endpoints where practical:

- `POST /api/member-auth/login`
- `POST /api/member-auth/register`
- `GET /api/member-auth/session`
- `POST /api/member-auth/logout`
- `POST /api/member-auth/forgot-password`
- `POST /api/member-auth/reset-password`
- `POST /api/member-auth/change-password`
- `GET /api/member-portal/dashboard`
- `GET /api/member-portal/resources`
- `PUT /api/member-portal/profile`
- `POST /api/member-portal/bookings/payment-intent`
- `POST /api/member-portal/bookings/:bookingId/confirm`
- `POST /api/member-portal/bookings/:bookingId/cancel`
- `POST /api/member-portal/bookings/:bookingId/cancel-and-refund`
- `PUT /api/member-portal/bookings/:bookingId`
- `POST /api/member-portal/memberships/payment-draft`
- `POST /api/member-portal/memberships/confirm-payment`
- `POST /api/member-portal/memberships/change-plan`
- `POST /api/member-portal/memberships/change-plan/preview`
- `POST /api/member-portal/memberships/confirm-upgrade-payment`
- `POST /api/member-portal/memberships/cancel`
- `POST /api/member-portal/memberships/cancel-scheduled-downgrade`
- `GET /api/member-portal/invoices`

## Mobile Auth Decision

The website currently uses HTTP-only session cookies and CSRF protection. For a native app, the best long-term option is to add mobile-specific token auth while reusing the existing user service logic.

Recommended mobile auth endpoints:

- `POST /api/mobile-auth/login`
- `POST /api/mobile-auth/register`
- `POST /api/mobile-auth/refresh`
- `POST /api/mobile-auth/logout`
- `GET /api/mobile-auth/session`

Store refresh/session material in SecureStore. Send access tokens with `Authorization: Bearer <token>`.

Protected member APIs must be updated to authenticate either the existing website cookie session or the new mobile Bearer token through shared middleware. Do not rely on native cookie behavior for the mobile app. CSRF remains required for cookie-authenticated website requests; Bearer-token mobile requests should use token validation, rate limits, and idempotency instead.

### Mobile Auth Requirements

- Prefer opaque refresh/session tokens stored hashed in MySQL over long-lived JWTs.
- Use short-lived access tokens.
- Rotate refresh tokens on every refresh.
- Detect refresh-token reuse: if an already-rotated refresh token is presented again, treat the entire session family as compromised, revoke all related sessions, and force re-login.
- Revoke mobile sessions on logout, password change, account suspension, account deletion, and suspicious activity.
- Track device/session metadata without collecting unnecessary personal data.
- Add rate limits to login, register, refresh, forgot-password, and reset-password endpoints.
- Never log access tokens, refresh tokens, reset tokens, or Verkada credentials.
- Provide a backend way to revoke all mobile sessions for a member.
- Auth middleware must select exactly one auth path per request: cookie session OR Bearer token. Cookie path requires CSRF; Bearer path forbids cookie fallback. No request may be authenticated by both at once.
- Optional biometric (Face ID/Touch ID/fingerprint) re-auth before sensitive actions: cancel-and-refund, plan change, profile email change, and account deletion request.

Recommended mobile auth tables:

- `mobile_sessions`
- `mobile_refresh_tokens`
- `mobile_auth_audit_events`

## Push Notifications

### Backend Additions

Add tables:

- `member_push_tokens`
- `member_notification_preferences`
- `notification_outbox`
- `notification_events`

Add services:

- `adminjs/src/services/push-service.js`
- `adminjs/src/services/notification-preferences-service.js`

Add member endpoints:

- `POST /api/member-portal/push-tokens`
- `DELETE /api/member-portal/push-tokens`
- `GET /api/member-portal/notification-preferences`
- `PUT /api/member-portal/notification-preferences`

### Notification Events

Send push notifications for:

- Booking confirmed.
- Booking reminder.
- Booking canceled.
- Refund requested or processed.
- Membership activated.
- Membership canceled.
- Payment failed.
- Past-due grace period warning.
- Door access granted.
- Door access revoked.
- Door access sync failed.
- Admin announcement.

### Push Delivery Requirements

- Store platform, token, member ID, device/session ID, token status, last seen time, and failure counts.
- Delete or deactivate push tokens on logout and account deletion.
- Use an outbox table so booking/payment/access transactions can enqueue notifications reliably after database state changes.
- Process notification sends asynchronously; do not send push notifications directly inside payment, booking, or access-control transactions.
- Deactivate invalid tokens after provider failure responses.
- Notification taps should deep-link into native screens, not website URLs.

### Notification Rules

- Push notifications must not be required for the app to function.
- Marketing pushes require explicit opt-in.
- Operational pushes should be controlled by notification preferences where appropriate.
- Do not send sensitive personal or payment details in push notification text.
- Default quiet hours apply to non-critical pushes (recommended 22:00 to 08:00 in the member's local time). Critical events (door access revoked, payment failure, security alerts) bypass quiet hours.
- Each outbox row carries an idempotency key so webhook retries cannot produce duplicate pushes.
- Provider decision for v1: Expo Push, with a thin provider abstraction so a future migration to direct FCM/APNs is one-file work.

### Deep Link Infrastructure

Deep links use Universal Links on iOS and App Links on Android, not just a custom scheme. The website must serve:

- `/.well-known/apple-app-site-association` (no extension, served as `application/json`).
- `/.well-known/assetlinks.json`.

These files are part of the mobile launch deliverables and must be deployed before App Store and Play Store submission.

## Verkada Door/Access Control

### Rule

The mobile app must never call Verkada directly. All Verkada API calls happen on the backend.

### Discovery Requirements

Before implementation, confirm with Verkada documentation/account access that the API can support the required v1 operations for this organization:

- Find or create a user.
- Update member identity fields.
- Assign and remove access groups or equivalent access levels.
- Map configured doors/rooms to access groups.
- Support temporary access windows, or support backend-managed scheduled grant/revoke jobs.
- Return enough status to verify sync success or failure.
- Use a test organization, test site, or test access group before production rollout.

If Verkada cannot support one of these operations through API for this account, adjust scope before building mobile screens that depend on it.

### Phase 0 Outcome Branches

The Phase 0 spike must produce a documented capability matrix and pick one branch:

- Go: all required operations are supported. Build Phases 10–13 as planned.
- Partial: identity and access-group operations work but temporary windows do not. Use backend scheduled grant/revoke jobs to simulate windows. Reduce booking-tied access scope if needed.
- No-go: required operations are not available. Defer the entire access feature. Mobile app launches without Phases 10–13. Plan B providers (for example Kisi or Brivo) are evaluated separately and not bundled with the v1 mobile launch.

### Identity And Credential Mechanism

- Match a CFH member to a Verkada user by verified email plus an internal mapping ID. Email-only matching must reject ambiguous records and require manual admin resolution.
- The credential mechanism that physically opens doors (mobile pass on the Verkada Pass app, badge/card, PIN, or BLE) must be confirmed during Phase 0. The mobile app does not present a door-unlock button in v1.
- Data sent to Verkada is minimized: full name, primary email, and phone only if required by the access mechanism. Do not send membership tier, payment data, or marketing fields.
- Privacy policy must disclose Verkada as a data processor and list the fields shared.

### Operational Rollout And SLA

- Verkada integration ships behind a staged rollout: dry-run mode (no real API calls) → one canary test member → small cohort → full rollout.
- A `VERKADA_DRY_RUN` flag simulates grant/revoke without calling the Verkada API and writes the same audit events.
- Revocation SLA target: confirmed in Verkada within 5 minutes of trigger under normal conditions. Repeated failures past 15 minutes alert admins.
- Grant SLA target: confirmed within 5 minutes; user-visible status remains pending until confirmation.
- Verkada outages must not silently leave revocations unprocessed. Failed revocation jobs are surfaced in AdminJS with high visibility.

### Backend Environment

Add backend environment variables:

```env
VERKADA_API_KEY=...
VERKADA_ORG_ID=...
VERKADA_DEFAULT_ACCESS_GROUP_ID=...
VERKADA_MEETING_ROOM_ACCESS_GROUP_ID=...
VERKADA_SYNC_ENABLED=true
```

### Backend Tables

Add tables:

- `verkada_users`
- `verkada_access_grants`
- `verkada_sync_events`
- `verkada_access_group_mappings`
- `access_entitlements`
- `access_reconciliation_jobs`

### Backend Services

Add services:

- `adminjs/src/services/verkada-service.js`
- `adminjs/src/services/access-control-service.js`

Responsibilities:

- Create or update Verkada users for members.
- Map member status to Verkada access groups.
- Maintain desired access state in the local database.
- Reconcile desired access state to Verkada idempotently.
- Grant access only after membership/payment/booking rules allow it.
- Revoke access when membership/payment/booking rules require it.
- Grant temporary booking access when room-specific access groups are configured.
- Expire temporary access through backend jobs, not the mobile client.
- Record every sync event for auditability.
- Retry failed sync events safely.
- Alert admins when revocation or critical sync fails repeatedly.

### Member Endpoints

Add endpoints:

- `GET /api/member-portal/access-status`
- `POST /api/member-portal/access-sync/request`

The access sync request endpoint should not blindly grant access. It should enqueue or trigger a backend reconciliation using membership/payment/booking state.

Rate-limit access sync requests per member/device and audit every request.

### Desired-State Model

Do not build access control as scattered one-off calls to Verkada. Build it as a desired-state system:

- Calculate what access the member should have from local source-of-truth data.
- Store desired access entitlements locally.
- Reconcile local desired state to Verkada.
- Store actual last-known Verkada sync state.
- Use idempotency keys for create/update/revoke operations.
- Use database locks or unique constraints to prevent duplicate grants.
- Treat revocations as high priority and retry until confirmed or manually resolved.
- For new grants, show `pending` until Verkada confirms success.
- If Verkada is unavailable, do not show newly requested access as active.

### AdminJS Controls

Add AdminJS visibility for:

- Verkada user mapping.
- Current access status.
- Last sync result.
- Failed sync events.
- Manual retry.
- Manual revoke.
- Manual temporary grant.
- Required admin reason for manual access changes.
- Audit trail for who changed access, when, and why.

## Access Control Rules

Use these v1 rules:

```txt
Member active + paid:
  Building access active all day.

Member payment_failed/past_due:
  Keep access for 48 hours.
  Send push/email reminders.
  Revoke access after grace period if unresolved.

Member canceled/expired:
  Revoke building access at the end of the paid period.

Member suspended/disputed:
  Revoke access immediately.

Member confirmed meeting room booking:
  Grant temporary room-specific access from 15 minutes before start to 15 minutes after end when a room-specific Verkada group exists.
  If no room-specific group exists, do not create a fake temporary access promise in the app.

Canceled/refunded booking:
  Revoke temporary access immediately.

Guests:
  No Verkada access in v1.
  Guest access remains manual/reception-managed.
```

## Access Safety Rules

- Access status shown in the app must be based on confirmed backend state, not optimistic UI.
- New grants fail closed: pending until confirmed by Verkada.
- Revocations fail loud: retry, alert admins, and show warning status if backend cannot confirm revocation.
- Never expose Verkada group IDs, API errors, or internal access rules directly to users.
- Keep access audit logs immutable enough for operational review.

## Access Status Screen

The mobile app should show:

- Access status: active, pending, grace period, suspended, expired, sync failed.
- Current membership access.
- Next booking access window.
- Last sync time.
- Support contact.
- Retry/request sync action when safe.

## Stripe Payments

Use Stripe React Native for native payment UI. The current business sells coworking memberships and meeting room services consumed outside the app, so Stripe remains correct under App Store Guideline 3.1.3(e) and is not subject to in-app purchase rules.

### Booking Payments

- Native PaymentSheet backed by the existing PaymentIntent flow.
- Reuse `POST /api/member-portal/bookings/payment-intent`, `POST /api/member-portal/bookings/:bookingId/confirm`, cancel, and cancel-and-refund endpoints.
- Stripe webhooks remain the source of truth for confirmation. The mobile app must refetch booking state after PaymentSheet completes and must not mark a booking confirmed from mobile-only state.

### Membership Payments

- Native PaymentSheet using SetupIntent to collect and save the payment method, then the backend creates or updates the Stripe Subscription server-side.
- Add mobile-specific endpoints for SetupIntent creation and post-setup subscription confirmation. Reuse existing membership plan-change, preview, cancel, and confirm-upgrade endpoints unchanged.
- 3DS/SCA is handled by PaymentSheet; backend confirms via webhooks.
- Avoid Stripe Checkout redirects on mobile in v1. Plan upgrades, downgrades, previews, and cancellations reuse existing member-portal endpoints; only the initial card collection differs from the website flow.
- Stripe webhooks remain the source of truth for membership activation, renewal, dunning, and cancellation.

### Payment Rules

- Do not add digital-only paid features unless App Store/Play Store payment rules are reviewed again.
- Refund and cancel-and-refund flows reuse existing endpoints; mobile only triggers them.
- Include App Review notes explaining payments are for coworking memberships and meeting rooms consumed outside the app.

## Privacy And Compliance Requirements

- Update the privacy policy before app submission to cover mobile sessions, push tokens, device metadata, payment processing, access-control audit logs, and Verkada data sharing.
- Provide an in-app account deletion request flow because the app supports account creation. The flow submits a request; the backend processes deletion or anonymization within 30 days. Status is visible to the user inside the app.
- Account deletion processing must revoke mobile sessions, deactivate push tokens, remove or anonymize eligible profile data, and trigger Verkada access revocation.
- Keep required financial, invoice, tax, fraud-prevention, and access audit records where legally or operationally required, and explain retention clearly.
- Ship an iOS Privacy Manifest (`PrivacyInfo.xcprivacy`) covering Stripe, Sentry, Expo, and any other SDK with required-reason API usage.
- Prepare App Store Privacy Labels and Play Store Data Safety form content as part of the release deliverables, not at submission time.
- A GDPR data-export request flow is acknowledged. V1 may handle this manually through admin tooling; a self-service export is a later enhancement.
- Provide App Review demo credentials with safe test data and no real door access.
- Do not request unnecessary permissions. V1 should need notifications only; avoid location, contacts, camera, microphone, Bluetooth, and background location unless a later feature has a clear need.

## Mobile App Quality Requirements

- Forced-update gate: the app calls `GET /api/mobile-app/version-policy` on launch to learn the minimum supported version and a recommended version. Below the minimum, the app blocks usage with an upgrade prompt.
- Accessibility: VoiceOver/TalkBack labels on all interactive elements, Dynamic Type support, and WCAG AA color contrast. Accessibility is a launch requirement, not a follow-up.
- Localization-ready architecture: all user-visible strings live in a translation layer from day one even if v1 ships only one language.
- Offline policy: TanStack Query caches enable read-only views (dashboard, bookings list, access status) when offline. Writes require connectivity and surface a clear offline state.
- Analytics: Sentry covers errors only. A product analytics tool may be added later; v1 ships without one to reduce review and privacy surface.

## Suggested Folder Structure

```txt
mobile/
  app.json
  package.json
  tsconfig.json
  src/
    api/
      client.ts
      content-api.ts
      member-api.ts
      mobile-auth-api.ts
    auth/
      AuthProvider.tsx
      secure-storage.ts
    navigation/
      RootNavigator.tsx
      PublicStack.tsx
      MemberTabs.tsx
    notifications/
      push-registration.ts
      notification-handlers.ts
    screens/
      public/
      auth/
      member/
      booking/
      payments/
      access/
    components/
    theme/
    utils/
```

## Implementation Phases

### Phase 0: Feasibility Lock

- Confirm Verkada API permissions, available endpoints, access group mapping, and test environment. Produce a capability matrix and pick Go / Partial / No-go.
- Confirm Stripe React Native PaymentSheet + SetupIntent + Subscription flow works for memberships against test mode end-to-end.
- Confirm Stripe PaymentSheet + PaymentIntent flow works for booking payments against test mode.
- Decide background job runtime: same Node process with `node-cron` plus DB row lease, separate Node worker on the same host, or external queue. The choice depends on Hostinger constraints and is locked here.
- Decide push provider. Recommend Expo Push for v1 with a provider abstraction.
- Confirm production API URL, staging API URL, iOS bundle ID, Android package name, and deep-link scheme.
- Confirm app store compliance position for Stripe real-world service payments.
- Define exact account deletion and data retention policy. v1 uses in-app deletion request processed within 30 days.
- Output artifacts: `docs/mobile/feasibility-report.md` and `docs/mobile/decisions.md`.

### Phase 1: Mobile Foundation

- Create `mobile/` Expo app.
- Configure TypeScript, navigation, app theme, environment config, app icon, and splash screen.
- Add Sentry React Native.

### Phase 2: API And Auth

- Add API client.
- Add mobile auth endpoints on the backend.
- Add native login/register/session/logout.
- Add reset-password deep link support.
- Add mobile session revocation and account deletion/request deletion flow.

### Phase 3: Public Native Screens

- Build public screens using existing CMS APIs.
- Add loading, empty, and error states.

### Phase 4: Member Native Screens

- Build dashboard, bookings, membership, invoices, profile, and settings.
- Reuse existing member APIs.

### Phase 5: Booking Flow

- Build native meeting room booking flow.
- Add date/time/resource selection.
- Add booking payment with Stripe React Native.
- Add booking confirmation and cancellation flows.

### Phase 6: Push Notifications

- Add push token registration in the app.
- Add backend push token tables and endpoints.
- Add notification preferences.
- Send operational booking/membership/payment notifications.

### Phase 7: Verkada Access Control

- Add Verkada config and backend service.
- Add access-control tables.
- Add access-control service.
- Implement desired-state reconciliation from membership/payment/booking state.
- Add mobile access status screen.
- Add AdminJS access visibility and retry tools.

### Phase 8: Automation Jobs

- Add scheduled access reconciliation.
- Expire temporary booking access.
- Process past-due 48-hour grace expiration.
- Retry failed Verkada sync events.
- Use DB locks or a single-worker lease so scheduled jobs do not process the same access change twice.

### Phase 9: Release Readiness

- Add app store metadata.
- Add privacy policy updates for push tokens, device data, payments, and access control.
- Add in-app account deletion or account deletion request flow.
- Add App Review notes explaining no WebView, real native utility, push notifications, door access, and Stripe real-world service payments.
- Add TestFlight and Play internal testing builds.
- Test Stripe test mode and Verkada test/sandbox organization if available.

## Testing Plan

- Unit test mobile API client and formatters.
- Unit test access-control decision logic.
- Unit test mobile auth refresh/revocation logic.
- Backend tests for push token registration.
- Backend tests for Verkada grant/revoke mapping.
- Backend tests for access reconciliation idempotency and duplicate prevention.
- Backend tests for account deletion side effects: session revocation, push token deactivation, and Verkada revocation.
- Smoke test mobile app on iOS simulator and Android emulator.
- Manual test push registration on real devices.
- Manual test booking and membership Stripe flows in test mode.
- Manual test Verkada sync with a test member before production rollout.
- Manual test suspended/disputed/past-due revocation flows before production rollout.

## Main Risks

- Verkada API capability and account permissions must be confirmed before implementation. If unsupported, the access feature is deferred and the mobile app launches without it rather than blocking on Verkada.
- Mobile token auth adds backend security work but is better than relying on website cookies. Token-confusion bugs between cookie and Bearer paths are a real risk and require explicit middleware design and tests.
- Membership payments via PaymentSheet + SetupIntent + Subscription on mobile have more moving parts than the existing website Checkout flow. PaymentSheet feasibility is part of Phase 0.
- Push notifications require careful privacy wording and opt-in handling. Provider lock-in to Expo Push is acceptable for v1 with an abstraction layer.
- Door access changes must be auditable and fail-safe. Access-control bugs can lock valid members out or leave invalid members with access, so reconciliation, dry-run mode, staged rollout, audit logs, and admin override tools are mandatory.
- Single-host job execution on Hostinger may contend with API traffic. Phase 0 picks a job runtime explicitly; if same-process scheduling is unsafe, a separate worker process or external queue is chosen.
- App review can reject vague wrapper-like positioning, so store metadata, screenshots, and review notes must emphasize native account management, booking, push notifications, and access-control utility.
- Physical-world door incidents from access bugs require an on-call runbook; AdminJS must allow fast manual revoke and audit lookup.

## Success Criteria

- App runs natively on iOS and Android without WebView.
- Members can log in, manage bookings, view membership, view invoices, and update profile.
- Push notifications work on real devices.
- Active paid members receive building access in Verkada.
- Suspended/disputed members lose access immediately.
- Past-due members lose access after the 48-hour grace period.
- Confirmed member bookings receive temporary access from 15 minutes before to 15 minutes after the booking.
- Admin can inspect and retry Verkada access sync events.
- Account deletion/request deletion is available in-app.
- No unnecessary mobile permissions are requested.
