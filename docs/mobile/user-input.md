# Mobile User Input / External Dependencies

Last updated: 2026-05-14

This file tracks non-urgent inputs and external verification needed before release. LEAD may continue safe, non-gated hygiene without these values, but release/sign-off cannot complete until the relevant items are resolved.

## Required Before Production Release

- Confirm the production API/base URL for Hostinger deployment. Current production URL is pending; development uses `http://localhost:3001` and staging placeholder is `https://staging-api.leadenhallworks.com`.
- Provide/configure a dedicated production `MOBILE_AUTH_ACCESS_TOKEN_SECRET` distinct from any development fallback.
- Confirm mobile auth traffic is HTTPS-only outside local development.
- Decide/confirm deployment topology for backend rate limiting; current in-memory limiter must be revisited before multi-process production deployment.
- Configure Expo/EAS `projectId` for reliable Expo push token retrieval in production builds.
- Complete real-device push notification delivery and notification-tap testing on iOS and Android.
- Complete Stripe manual/test-mode validation for booking and membership PaymentSheet flows, including webhook-driven membership activation and booking payment status. Stripe webhooks remain source of truth.
- Provide App Store / Play Store account metadata needed for final release notes, privacy labels, Data Safety, support/contact URLs, screenshots, and review submission.
- Confirm operational contacts/escalation owners for the access/payment/push/auth/privacy runbooks.

## Gated / Do Not Implement Until Verified

- Verkada remains gated for v1 implementation. Do not implement, fake, or stub T101-T124 until all of the following are verified:
  - Real Verkada org API access.
  - Non-production/test access group.
  - Assign/remove/read-back behavior.
  - Credential mechanism suitable for backend-only integration.
- Mobile must never call Verkada directly.

## Tooling / Environment Needed For Remaining QA

- T164 was completed by user-approved LEAD governance override on 2026-05-14 because official `mobile-reviewer` remained unavailable/empty. Keep this audit-trail note; do not treat it as an official mobile-reviewer verdict.
- Local MySQL must be running for root Vitest suites that touch DB-backed mobile auth/account deletion services.
- Backend server must be running on `localhost:3001` and frontend on `localhost:8080` for Playwright e2e (`npm run test:e2e`).
- Maestro CLI and an iOS Simulator, Android emulator, or real device are needed to execute the defined native smoke flows.

## Current Status Snapshot

- Safe lint hygiene is complete: lint passes with 0 errors and remaining warnings are only `react-refresh`/`react-hooks` hints.
- Static checks pass: `npm run check`, mobile typecheck, and mobile smoke tests pass.
- Phase 17 may start after the 2026-05-14 T164 governance override; production release remains blocked by external release gates.