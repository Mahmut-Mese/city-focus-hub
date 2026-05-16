# Mobile Release Readiness Preflight

Last updated: 2026-05-14

This is a LEAD-prepared preflight checklist. It does not complete Phase 17 tasks T170-T175. On 2026-05-14, the user explicitly accepted the LEAD substitute audit as the governance override for T164, so Phase 17 may start; production release remains gated by the items below.

## Current QA Baseline

- `npm run lint`: pass, 0 errors / 17 warnings.
- `npm run check`: pass.
- `npm run test`: pass, 8/8 across 3 files.
- Mobile typecheck: pass.
- Mobile smoke: pass, 11/11.
- Playwright e2e: pass, 74/74 on 2026-05-14 with MySQL/backend/root Astro frontend running locally.

## Security / Architecture Invariants

- Native Expo React Native app only; no WebView usage in mobile source.
- Mobile does not call Verkada directly.
- Phase 10-12 Verkada/access implementation remains gated and unstarted.
- Mobile refresh/session material uses SecureStore path.
- No token/secret/clientSecret logging was found in LEAD substitute audit.
- Stripe webhooks/server state remain payment source of truth; no mobile optimistic paid/active confirmation.

## Formal Gates Before Release

- T164 gate: satisfied by user-approved LEAD governance override on 2026-05-14 because official mobile-reviewer remained unavailable.
- Phase 17 tasks T170-T175 completed and reviewed.
- Stripe manual/test-mode validation for booking and membership PaymentSheet flows, including webhook-driven activation/status.
- Real-device push delivery and notification-tap testing on iOS and Android.
- Production API/base URL confirmed.
- Dedicated production `MOBILE_AUTH_ACCESS_TOKEN_SECRET` configured.
- HTTPS-only mobile auth traffic confirmed outside local development.
- Backend rate-limit deployment topology reviewed for production/multi-process use.
- Expo/EAS `projectId` configured for production builds.
- App Store / Play Store metadata, privacy labels, Data Safety, screenshots, support/contact URLs, and review notes prepared.
- Operational contacts/escalation owners confirmed for access/payment/push/auth/privacy runbooks.

## Store Review Notes Draft Inputs

- App name: The Leadenhall Works.
- App type: native Expo React Native mobile app for coworking members and public visitors.
- Payments: Stripe PaymentSheet is used for physical coworking services and meeting-room bookings; payment completion is verified server-side/webhook-side.
- Account deletion: in-app request/cancel flow with processing within 30 days.
- Push notifications: Expo push through backend/provider abstraction; user preferences available in app.
- Building access / Verkada: not directly called by mobile; any future access integration is backend-only and gated by external verification.

## Do Not Do Yet

- Do not submit production builds.
- Do not remove the audit-trail note that T164 was completed by governance override rather than official mobile-reviewer.
- Do not start Verkada/access implementation without external verification.
- Do not change payment confirmation semantics.
- Do not add WebView-based flows.