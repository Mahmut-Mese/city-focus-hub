# Mobile App Implementation Plan

## Goal

Build a native, app-store-grade City Focus Hub mobile app without WebView.

The implementation must reuse the existing Express/AdminJS/MySQL backend, Stripe payment logic, CMS APIs, member portal APIs, and AdminJS operations. New work should add native mobile auth, push notifications, and backend-managed Verkada door/access control.

## Non-Negotiable Decisions

- No WebView.
- Mobile app is Expo React Native with TypeScript.
- Mobile app never calls Verkada directly.
- Backend is the source of truth for auth, membership, bookings, payments, access decisions, and audit logs.
- Use mobile token auth instead of relying on native cookie behavior.
- Use Stripe for coworking memberships and meeting room services because they are real-world services consumed outside the app.
- No mobile door-unlock button in v1 unless Verkada explicitly supports the required mobile credential flow for this account.
- V1 manages access permissions and access status, not live unlock control.
- Guests do not receive Verkada access in v1.

## Phase 0: Feasibility Spike

Timebox: 3 to 5 days. No production code from later phases is started until Phase 0 outputs are written down.

### Verkada Capability Matrix

Validate against the real organization, not just docs:

- Find or create a user.
- Update user identity fields.
- Assign access group.
- Remove access group.
- Read user/group state to verify sync.
- Native temporary access windows, or fall back to backend scheduled grant/revoke.
- Test organization or test access group available.

Branch decision recorded explicitly:

- Go: build Phases 10–13 as planned.
- Partial: build Phases 10–13 with scheduled-job-only temporary access. Reduce booking-tied scope if room groups are missing.
- No-go: skip Phases 10, 11, 12, 13 in v1. Mobile app ships without door access. Plan B providers are evaluated separately.

### Stripe Feasibility

- Validate Stripe React Native PaymentSheet + PaymentIntent for booking payments end-to-end in test mode.
- Validate Stripe React Native PaymentSheet + SetupIntent + Subscription for memberships end-to-end in test mode against the existing backend, including initial activation, plan change, and cancellation paths.
- Confirm webhook flow on the existing backend handles mobile-originated subscriptions identically to web-originated ones.

### Background Job Runtime Decision

Choose one and document:

- Same Node process using `node-cron` plus a DB row-lease pattern.
- Separate Node worker process on the same host with a process manager.
- External queue (BullMQ + Redis or similar).

The choice depends on Hostinger constraints, expected job volume, and isolation requirements.

### Other Locked Decisions

- Push provider: Expo Push for v1 with a provider abstraction (Expo Push is recommended; direct FCM/APNs is a later migration).
- Membership payments: Stripe PaymentSheet + SetupIntent + Subscription (locked).
- Account deletion: in-app request, processed within 30 days (locked).
- Confirm production API URL, staging API URL, iOS bundle ID, Android package name, and deep-link scheme.
- Confirm app-store compliance position for Stripe real-world service payments.

### Phase 0 Output Artifacts

- `docs/mobile/feasibility-report.md`: Verkada capability matrix, Stripe POC results, job runtime evaluation.
- `docs/mobile/decisions.md`: locked decisions list, dated and owned.

## Phase 1: Mobile App Scaffold

Create a new Expo app in `mobile/`.

Add dependencies:

- Expo React Native.
- TypeScript.
- React Navigation.
- TanStack Query.
- Expo SecureStore.
- Expo Notifications or direct FCM/APNs dependency.
- Stripe React Native.
- Sentry React Native.
- Maestro or Detox test tooling.

Create structure:

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

Implement:

- App shell.
- Public stack.
- Auth stack.
- Member tab navigation.
- Modal/payment stack.
- Theme tokens based on current website brand.
- Environment config for dev, staging, and production API URLs.
- Native loading, empty, offline, and error states.

## Phase 2: Backend Mobile Auth

Add backend database tables:

- `mobile_sessions`
- `mobile_refresh_tokens`
- `mobile_auth_audit_events`

Add backend service:

- `adminjs/src/services/mobile-auth-service.js`

Add backend API module:

- `adminjs/src/mobile-auth-api.js`

Add endpoints:

- `POST /api/mobile-auth/login`
- `POST /api/mobile-auth/register`
- `POST /api/mobile-auth/refresh`
- `POST /api/mobile-auth/logout`
- `GET /api/mobile-auth/session`

Security requirements:

- Prefer opaque refresh/session tokens stored hashed in MySQL.
- Use short-lived access tokens.
- Rotate refresh tokens on every refresh.
- Detect refresh-token reuse: presenting an already-rotated token revokes the entire session family and forces re-login. Audit the event.
- Revoke sessions on logout, password change, suspension, account deletion, and suspicious activity.
- Rate-limit login, register, refresh, forgot-password, and reset-password.
- Never log access tokens, refresh tokens, reset tokens, or Verkada credentials.
- Add backend method to revoke all mobile sessions for a member.

Auth middleware design:

- A shared `requireAuth` middleware accepts cookie session OR Bearer token. The chosen path is recorded on the request object.
- Cookie path: requires CSRF for state-changing methods. Bearer fallback is forbidden when a cookie session is present and valid.
- Bearer path: requires `Authorization: Bearer <token>`. Cookie fallback is forbidden. CSRF middleware is bypassed only on this path.
- Bearer requests must use idempotency keys for state-changing operations (booking confirm, refund trigger, plan change).
- Tests must verify token confusion is impossible: cookie endpoints reject Bearer-only auth, and Bearer endpoints reject cookie-only auth where the contract requires it.

Non-regression checklist (cross-reference `TECH_DEBT.md`):

- CSRF protection on cookie path is preserved.
- Booking and membership transactional integrity is preserved.
- Refund rollback paths still execute as documented.
- New mobile auth code does not bypass any existing rate limit, validation, or audit hook.

DB migration approach:

- Mobile auth tables and all later tables in this plan are added through SQL migration files under `adminjs/src/migrations/` (extending the existing `migrate.js` runner). Bootstrap files are not used for mobile-only schema.

Update member auth middleware:

- Existing website cookie sessions continue working.
- Mobile Bearer tokens authenticate protected member APIs through the shared `requireAuth` middleware described above.
- CSRF remains required for cookie-authenticated website requests.
- Bearer-token mobile requests use token validation, rate limits, and idempotency instead of CSRF.

## Phase 3: Mobile API Client

Add mobile API client files:

- `mobile/src/api/client.ts`
- `mobile/src/api/mobile-auth-api.ts`
- `mobile/src/api/member-api.ts`
- `mobile/src/api/content-api.ts`

Implement:

- Absolute API base URL handling.
- JSON request/response wrapper.
- Timeout handling.
- Error parsing compatible with current backend `{ error }` responses.
- Automatic access-token refresh.
- Auth-expired handling.
- TanStack Query defaults.
- Shared API types ported from `src/lib/member-api.ts` where useful.

## Phase 4: Native Auth Screens

Build screens:

- Login.
- Register.
- Forgot password.
- Reset password.
- Logout.

Implement:

- `AuthProvider`.
- SecureStore refresh/session persistence.
- Route guards for member-only screens.
- Reset-password deep links.
- Session restoration on app launch.
- Full logout that revokes backend session and removes local secure storage.

## Phase 5: Public Native CMS Screens

Build native public screens backed by existing CMS APIs:

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

Reuse public endpoints:

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

## Phase 6: Native Member Screens

Build native member screens:

- Dashboard overview.
- My bookings.
- Membership.
- Invoices.
- Profile.
- Settings.
- Notification preferences.
- Access status.
- Account deletion/request deletion.

Reuse member endpoints where practical:

- `GET /api/member-portal/dashboard`
- `GET /api/member-portal/resources`
- `PUT /api/member-portal/profile`
- `POST /api/member-auth/change-password`
- `GET /api/member-portal/invoices`

Implementation notes:

- Dashboard should use native cards and tabs, not copied web layouts.
- Invoices can open hosted invoice/PDF URLs in the system browser or native document viewer.
- Profile updates should refresh the auth context and dashboard cache.
- Settings must include logout and account deletion/request deletion.

## Phase 7: Native Booking Flow

Build booking screens:

- Room selection.
- Date selection.
- Time selection.
- Purpose/notes.
- Price review.
- Payment.
- Confirmation.

Use existing booking endpoints:

- `GET /api/member-portal/resources`
- `POST /api/member-portal/bookings/payment-intent`
- `POST /api/member-portal/bookings/:bookingId/confirm`
- `POST /api/member-portal/bookings/:bookingId/cancel`
- `POST /api/member-portal/bookings/:bookingId/cancel-and-refund`
- `PUT /api/member-portal/bookings/:bookingId`

Payment requirements:

- Prefer PaymentIntent + Stripe PaymentSheet.
- Keep Stripe webhooks as source of truth.
- Do not mark booking confirmed from mobile-only state.
- Sync/refetch booking state after payment completion.
- Add cancel/retry handling for failed or abandoned payment.

## Phase 7.5: Native Membership Payments

Memberships use Stripe PaymentSheet + SetupIntent + Subscription. The website's Checkout-based path is not reused on mobile in v1.

Add backend endpoints:

- `POST /api/v1/mobile/memberships/setup-intent`: returns a SetupIntent client secret for the chosen plan.
- `POST /api/v1/mobile/memberships/activate`: after SetupIntent succeeds, the backend creates or updates the Stripe Subscription using the saved payment method.

Reuse existing endpoints unchanged:

- `POST /api/member-portal/memberships/change-plan`
- `POST /api/member-portal/memberships/change-plan/preview`
- `POST /api/member-portal/memberships/confirm-upgrade-payment`
- `POST /api/member-portal/memberships/cancel`
- `POST /api/member-portal/memberships/cancel-scheduled-downgrade`

Mobile flow:

- Plan select → SetupIntent → PaymentSheet → activate → poll/refetch membership state.
- 3DS/SCA handled by PaymentSheet.
- Webhooks remain the source of truth for activation, dunning, renewal, and cancellation.
- Plan change uses the existing preview + confirm-upgrade endpoints with PaymentSheet for any required incremental charge.

Native screens:

- Plan selection.
- Plan review and price preview.
- PaymentSheet card collection.
- Activation pending.
- Confirmation.
- Plan change / upgrade / downgrade flows.
- Cancel and undo-scheduled-downgrade flows.

## Phase 8: Push Notifications Backend

Add backend tables:

- `member_push_tokens`
- `member_notification_preferences`
- `notification_outbox`
- `notification_events`

Add backend services:

- `adminjs/src/services/push-service.js`
- `adminjs/src/services/notification-preferences-service.js`
- `adminjs/src/services/notification-outbox-service.js`

Add endpoints:

- `POST /api/member-portal/push-tokens`
- `DELETE /api/member-portal/push-tokens`
- `GET /api/member-portal/notification-preferences`
- `PUT /api/member-portal/notification-preferences`

Delivery requirements:

- Store platform, token, member ID, device/session ID, status, last seen time, and failure count.
- Deactivate invalid tokens after provider failures.
- Delete or deactivate push tokens on logout and account deletion.
- Use `notification_outbox` so state changes enqueue notifications reliably.
- Each outbox row carries an idempotency key. Webhook retries must not produce duplicate pushes.
- Send pushes asynchronously outside payment, booking, or access-control transactions.
- Apply quiet hours (default 22:00 to 08:00 in the member's local time) to non-critical pushes. Critical events (door access revoked, payment failure, security alerts) bypass quiet hours.
- Notification taps deep-link to native screens.
- Do not put sensitive payment or access details in push text.
- Provider abstraction: implement push delivery behind a single `push-provider.js` interface with an Expo Push driver as the v1 implementation. A future FCM/APNs driver should be a drop-in replacement.

Deep link infrastructure:

- Serve `/.well-known/apple-app-site-association` (no extension, `application/json`) and `/.well-known/assetlinks.json` from the existing website.
- Configure Universal Links (iOS) and App Links (Android) in mobile app config so notification taps and email links open the native app when installed.
- Document the bundle ID, team ID, and Android package name in `docs/mobile/decisions.md`.

Notification events:

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

## Phase 9: Push Notifications Mobile

Add files:

- `mobile/src/notifications/push-registration.ts`
- `mobile/src/notifications/notification-handlers.ts`

Implement:

- Permission request after login or from notification settings.
- Push token registration with backend.
- Token deletion/deactivation on logout.
- Token refresh handling.
- Notification tap routing to native screens.
- Notification preferences UI.
- Safe fallback when notification permission is denied.

## Phase 10: Verkada Backend Integration

This phase only runs if Phase 0 selected the Go or Partial branch. If Phase 0 selected No-go, Phases 10–13 are skipped in v1 and the mobile app launches without door access.

Add backend environment variables:

```env
VERKADA_API_KEY=...
VERKADA_ORG_ID=...
VERKADA_DEFAULT_ACCESS_GROUP_ID=...
VERKADA_MEETING_ROOM_ACCESS_GROUP_ID=...
VERKADA_SYNC_ENABLED=true
VERKADA_DRY_RUN=true
```

`VERKADA_DRY_RUN=true` simulates grant/revoke without calling the Verkada API. Audit events are still written. Dry-run is the default during initial rollout and is flipped per-cohort during the staged rollout.

Add tables:

- `verkada_users`
- `verkada_access_group_mappings`
- `access_entitlements`
- `access_reconciliation_jobs`
- `verkada_access_grants`
- `verkada_sync_events`

Add services:

- `adminjs/src/services/verkada-service.js`
- `adminjs/src/services/access-control-service.js`

`verkada-service.js` responsibilities:

- Authenticate to Verkada with backend-only credentials.
- Find or create Verkada user mapping using verified email plus internal mapping ID. Reject ambiguous email matches and require admin resolution.
- Update Verkada user identity fields. Send only the minimum data required by the access mechanism (typically name, email, phone if needed).
- Assign access group.
- Remove access group.
- Read enough state to verify sync result.
- Normalize Verkada errors for internal use without exposing credentials or group IDs.
- Honor `VERKADA_DRY_RUN` by short-circuiting external calls while still emitting audit events.

`access-control-service.js` responsibilities:

- Calculate desired access from local source-of-truth data.
- Store desired access entitlements locally.
- Reconcile desired access to Verkada idempotently.
- Store last-known actual Verkada sync state.
- Use idempotency keys for grant/revoke operations.
- Use DB locks or unique constraints to prevent duplicate grants.
- Treat revocations as high-priority and retry until confirmed or manually resolved.
- Alert admins when revocation or critical sync repeatedly fails.
- Support staged rollout: dry-run mode → canary member → cohort → full.

## Phase 11: Access Control APIs

Add endpoints:

- `GET /api/member-portal/access-status`
- `POST /api/member-portal/access-sync/request`

Rules:

- `access-sync/request` must never blindly grant access.
- It only triggers backend reconciliation using membership/payment/booking state.
- Rate-limit per member/device.
- Audit every request.
- Show `pending` until Verkada sync confirms success.
- If Verkada is unavailable, do not show newly requested access as active.

## Phase 12: Access Control Rules

Implement v1 rules:

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
  If no room-specific group exists, do not show a fake temporary access promise in the app.

Canceled/refunded booking:
  Revoke temporary access immediately.

Guests:
  No Verkada access in v1.
  Guest access remains manual/reception-managed.
```

Safety rules:

- New grants fail closed: pending until confirmed by Verkada.
- Revocations fail loud: retry, alert admins, and show warning status internally.
- Never expose Verkada group IDs, raw API errors, or internal access rules to users.
- Keep access audit logs for operational review.

## Phase 13: AdminJS Access Tools

Add AdminJS visibility for:

- Verkada user mapping.
- Access group mappings.
- Current access status.
- Desired entitlements.
- Last sync result.
- Failed sync events.
- Manual retry.
- Manual revoke.
- Manual temporary grant.

Admin requirements:

- Require admin reason for manual access changes.
- Audit who changed access, when, and why.
- Warn before manual grants that bypass normal membership/payment rules.
- Allow manual retry of failed sync jobs.
- Surface repeated revoke failures prominently.

## Phase 14: Scheduled Jobs

Add backend jobs:

- Scheduled access reconciliation.
- Temporary booking access grant.
- Temporary booking access expiry.
- Past-due 48-hour grace expiration.
- Failed Verkada sync retry.
- Notification outbox delivery.

Job requirements:

- Use DB locks or a single-worker lease to avoid duplicate processing.
- Keep jobs idempotent.
- Record job attempts and errors.
- Prioritize revocation jobs above new grant jobs.

## Phase 14.5: Observability And Forced Update

Backend observability:

- Add Sentry to the backend (in addition to the mobile app).
- Emit metrics for push delivery success rate, queue depth, Verkada sync success rate, and revocation latency.
- Alert when Verkada revocations are unconfirmed past 15 minutes.
- Alert when push delivery failure rate exceeds a configured threshold.
- Alert when notification outbox depth grows beyond a configured threshold.

Forced update gate:

- Add `GET /api/mobile-app/version-policy` returning `{ minSupportedVersion, recommendedVersion, message }`.
- The mobile app calls this endpoint on launch and on resume.
- Below `minSupportedVersion`, the app blocks usage with an upgrade prompt and a store link.
- Below `recommendedVersion` but at or above `minSupportedVersion`, the app shows a non-blocking nudge.

Operational runbook:

- Document the door-access incident runbook in `docs/mobile/runbook.md`: on-call contact, AdminJS manual revoke steps, Verkada outage handling, and member communication template.

## Phase 15: Privacy And Account Deletion

Add an in-app account deletion request flow. v1 does not perform immediate self-service hard deletion.

Add backend table `account_deletion_requests` with at minimum:

- `id`
- `user_id`
- `status` (`requested`, `processing`, `completed`, `cancelled`, `failed`)
- `requested_at`
- `processed_at`
- `processed_by` (admin or `system`)
- `reason` (optional, member-supplied)
- `notes` (admin notes)

Add member endpoints:

- `POST /api/v1/mobile/account/deletion-request`
- `GET /api/v1/mobile/account/deletion-request` (returns current request status)
- `DELETE /api/v1/mobile/account/deletion-request` (cancel pending request before processing)

Processing rules:

- Backend processes deletion within 30 days of request, manually or automatically.
- Status is visible to the user inside the app at all times.
- On processing, the backend:
  - Revokes all mobile sessions.
  - Deactivates push tokens.
  - Triggers Verkada access revocation if applicable.
  - Removes or anonymizes eligible profile data per retention policy.
  - Preserves required invoice, tax, fraud-prevention, payment, and access-audit records.
- Sensitive actions (submitting deletion request) may require biometric re-auth.

AdminJS support:

- List pending deletion requests with age.
- Process or cancel a request.
- Audit who processed which deletion and when.
- Surface failed deletions for retry.

Update privacy policy to cover:

- Mobile sessions.
- Push tokens.
- Device metadata.
- Payment processing.
- Verkada data sharing and the fields shared.
- Access-control audit logs.
- Data retention and deletion (including the 30-day request SLA).

Privacy compliance deliverables:

- iOS Privacy Manifest (`PrivacyInfo.xcprivacy`) covering Stripe, Sentry, Expo, and any other SDK with required-reason API usage.
- Draft App Store Privacy Labels content.
- Draft Play Store Data Safety form content.
- GDPR data-export request flow (manual via admin in v1; document in privacy policy).

Permissions rule:

- V1 should only request notification permission.
- Do not request location, contacts, camera, microphone, Bluetooth, or background location unless a later feature has a clear approved need.

## Phase 16: Testing

Backend unit/integration tests:

- Mobile auth login/refresh/logout.
- Mobile session revocation.
- Refresh-token reuse detection: replaying a rotated refresh token revokes the session family.
- Token confusion: cookie-only endpoints reject Bearer-only auth where contract requires; Bearer-only endpoints reject cookie-only auth where contract requires.
- Password-change session revocation.
- Push token registration/deactivation.
- Notification preference updates.
- Notification outbox enqueue/send/deactivate invalid token.
- Notification idempotency: duplicate enqueue with the same idempotency key produces a single delivery.
- Quiet hours suppression for non-critical events; bypass for critical events.
- Access-control decision logic.
- Verkada grant/revoke mapping.
- Verkada dry-run mode emits audit events without external calls.
- Access reconciliation idempotency.
- Duplicate grant prevention.
- Account deletion request lifecycle: create, cancel, process, side effects.
- Suspended/disputed/past-due revocation flows.
- Forced-update gate: app version below minimum is blocked, between minimum and recommended is nudged, at or above recommended is allowed.

Mobile tests:

- Login/register/logout.
- Session restore.
- Dashboard load.
- Booking flow.
- Membership PaymentSheet + SetupIntent + Subscription flow.
- Payment error handling.
- Push permission and registration flow.
- Access status rendering.
- Notification tap routing via Universal Links / App Links.
- Forced-update prompt rendering.
- Accessibility smoke: VoiceOver/TalkBack labels exist on key interactive elements; Dynamic Type does not break primary screens.

Manual tests:

- Stripe test-mode membership payment.
- Stripe test-mode booking payment.
- Push notifications on real iOS device.
- Push notifications on real Android device.
- Verkada test member access grant.
- Verkada test member access revoke.
- Suspended account immediate revoke.
- Past-due 48-hour revoke.
- Admin retry of failed Verkada sync.

## Phase 17: Release

Configure:

- EAS builds.
- iOS bundle identifier.
- Android package name.
- App icons.
- Splash screens.
- Deep links.
- Production API URL.
- Sentry DSN.
- Stripe publishable key.
- Push credentials.

Prepare App Store / Play Store submission:

- Store metadata.
- Screenshots showing native app screens (auth, dashboard, booking, membership, push notification example, access status).
- Privacy policy URL.
- iOS Privacy Manifest committed in the app bundle.
- App Store Privacy Labels content prepared.
- Play Store Data Safety content prepared.
- Account deletion request flow accessible in-app and described in store metadata.
- Demo reviewer account with safe test data and no real door access.
- Review notes explaining native utility, push notifications, door/access control, Stripe real-world service payments, and that subscriptions are for physical coworking services consumed outside the app.
- Universal Links / App Links verified in production (`apple-app-site-association` and `assetlinks.json` are deployed).
- Forced-update endpoint live with sensible initial `minSupportedVersion`.

Staged access rollout:

- Verkada dry-run mode in production for a defined cooling-off period.
- One canary test member.
- Small cohort.
- Full rollout.

## Open Decisions

Locked decisions:

- No WebView. Native Expo React Native app.
- Mobile token auth with opaque hashed tokens, refresh rotation, reuse detection.
- Bookings: PaymentIntent + PaymentSheet.
- Memberships: SetupIntent + PaymentSheet + server-side Subscription creation.
- Push provider: Expo Push for v1 with provider abstraction.
- Account deletion: in-app request, processed within 30 days.
- Mobile-facing endpoints under `/api/v1/...`.
- DB schema changes via SQL migrations under `adminjs/src/migrations/`.

Decided in Phase 0:

- Verkada path: Go / Partial / No-go.
- Background job runtime: same-process cron+lease vs separate worker vs external queue.
- Production and staging API URLs.
- iOS bundle ID, Android package name, deep-link scheme.

Open follow-ups (post-v1):

- Direct FCM/APNs migration.
- Self-service GDPR data export.
- Mobile door-unlock action if Verkada credentials support it.
- Plan B access provider evaluation if Verkada is No-go.
- Product analytics tool selection.
- Multi-language support.

## Success Criteria

- App runs natively on iOS and Android without WebView.
- Members can log in, manage bookings, view membership, view invoices, update profile, and request/delete account.
- Mobile auth uses SecureStore and backend revocable sessions.
- Push notifications work on real devices.
- Active paid members receive confirmed building access in Verkada.
- Suspended/disputed members lose access immediately.
- Past-due members lose access after the 48-hour grace period.
- Confirmed member bookings receive temporary access only when room-specific Verkada groups are configured.
- Admin can inspect, retry, revoke, and audit Verkada sync events.
- No unnecessary mobile permissions are requested.
