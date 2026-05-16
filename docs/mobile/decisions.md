# Mobile Decisions

This file records locked decisions and Phase 0 outcomes.

## Locked Before Phase 0

| Decision | Value |
|---|---|
| App display name | The Leadenhall Works |
| Native direction | Expo React Native, no WebView |
| Deep link scheme | `leadenhallworks://` |
| Brand palette | Monochrome from current website |
| Dev API URL | `http://localhost:3001` |
| Staging API URL | `https://staging-api.leadenhallworks.com` placeholder |
| Push provider | Expo Push for v1 |
| Booking payments | PaymentIntent + PaymentSheet |
| Membership payments | SetupIntent + PaymentSheet + server-side Subscription |
| Account deletion | In-app request, processed within 30 days |
| Mobile auth | Bearer access tokens + rotating opaque refresh tokens in SecureStore |
| Mobile Verkada calls | Forbidden |
| Guests and Verkada | No guest access in v1 |

## Phase 0 Outcomes

Recorded from T001 feasibility. Items marked pending require external project/account details and remain blockers for their dependent later phases.

| Area | Outcome | Evidence | Decision Date |
|---|---|---|---|
| Verkada capability | Partial / gated | `docs/mobile/feasibility-report.md`: API access, group assign/remove, read-back, test group, and credential mechanism remain externally blocked; mobile-to-Verkada remains forbidden. | 2026-05-04 |
| Job runtime | Separate Node worker on same host + DB lease for v1; same-process node-cron only as dev/fallback | T001 selected worker isolation without Redis; Redis/BullMQ deferred until volume/reliability requires it. | 2026-05-04 |
| Stripe booking PaymentSheet | Approved architecture; test-mode spike required before payment phase completion | T001 confirms PaymentIntent + PaymentSheet with webhook-source-of-truth and no optimistic mobile confirmation. | 2026-05-04 |
| Stripe membership SetupIntent + Subscription | Approved architecture; test-mode spike required before payment phase completion | T001 confirms SetupIntent + PaymentSheet, server-side Subscription creation/update, and webhook-source-of-truth. | 2026-05-04 |
| Push provider | Expo Push v1 behind provider abstraction; credentials/device testing pending | T001 push feasibility decision; token lifecycle, preferences, outbox dedupe, and quiet-hours remain later-phase work. | 2026-05-04 |
| Production API URL | pending | Hostinger production URL not provided yet. | pending |
| Staging API URL | placeholder retained | `https://staging-api.leadenhallworks.com` remains placeholder until environment is provisioned. | 2026-05-04 |
| iOS bundle ID | pending | Requires Apple developer/account decision. | pending |
| Android package name | pending | Requires Google Play/package naming decision. | pending |
| Universal Links domain | pending | Requires production domain and `.well-known` link files in Phase 13. | pending |

## Conditional Phase Gates

- Do not start T100-T124 Verkada/access-control implementation until real Verkada org API access, non-production access group, assign/remove/read-back behavior, and credential mechanism are verified.
- If Verkada API access, group assignment, revocation, or read-back verification fails, switch the Verkada outcome from `Partial / gated` to `No-go` and defer T100-T124 for v1.
- Do not mark T063/T070-T075 complete until Stripe test-mode PaymentSheet flows pass, including 3DS/SCA and webhook-based backend state updates.
- Do not rely on same-process jobs for production access revocation unless Hostinger cannot run a separate worker; if forced, add monitoring and conservative retry behavior before T111.
- Do not send sensitive payment, membership, or access details in push notification payloads.

## Decision Change Log

```txt
- 2026-05-04: Set Verkada capability from pending to Partial / gated. Reason: T001 found architecture feasible but real org API/test group/credential checks externally blocked. Owner: LEAD.
- 2026-05-04: Set job runtime from pending to separate Node worker + DB lease. Reason: isolates reconciliation/outbox jobs without adding Redis for v1. Owner: LEAD.
- 2026-05-04: Confirmed Stripe booking architecture as PaymentIntent + PaymentSheet with webhook-source-of-truth. Reason: aligns native mobile payments with existing backend payment state model; test-mode spike still required. Owner: LEAD.
- 2026-05-04: Confirmed Stripe membership architecture as SetupIntent + PaymentSheet + server-side Subscription. Reason: mobile collects payment method only; backend/webhooks control membership state. Owner: LEAD.
- 2026-05-04: Confirmed Expo Push v1 behind provider abstraction. Reason: lowest-complexity native push route for Expo v1 while keeping future FCM/APNs migration possible. Owner: LEAD.
```
