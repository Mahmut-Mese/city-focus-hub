# Mobile Feasibility Report

Owner: LEAD
Status: drafted - external verification required before Phase 1 production rollout

## Summary

- Verkada outcome: Partial / externally blocked. Backend-managed access is architecturally feasible, but real organization API capabilities, test group, and credential mechanism are not verified in this repo. Mobile-to-Verkada remains forbidden. V1 may proceed without door-unlock; access permissions/status remain conditional.
- Stripe booking outcome: Architecturally feasible / test-mode spike required. Existing backend has booking PaymentIntent and webhook-related logic; native app should use PaymentSheet with a backend-created PaymentIntent. Do not optimistically confirm; mobile refetches after webhook/backend state updates.
- Stripe membership outcome: Architecturally feasible / test-mode spike required. Use SetupIntent via PaymentSheet, then backend creates/updates Stripe Subscription server-side. Webhooks remain source of truth for membership activation, plan changes, and cancellation.
- Background job runtime: Separate Node worker on same host with DB lease, fallback to same-process node-cron only for low-volume/dev. This avoids API request contention and supports access reconciliation/outbox jobs without introducing Redis until volume requires it.
- Push provider: Expo Push v1 through provider abstraction; credentials/device testing still required.
- Overall recommendation: Proceed to Phase 1 scaffold and backend auth planning while tracking external blockers. Keep Verkada phases conditional. Do not start production access-control integration until Verkada API and test-group checks pass.

## Verkada Capability Matrix

| Capability | Required | Result | Evidence / Notes |
|---|---|---|---|
| API access for this organization | yes | blocked | No org credentials or API token evidence in repo; must verify with real Verkada org before T100. |
| Find user | yes | blocked | Required for identity matching and reconciliation; no real API test yet. |
| Create user | yes | blocked | Required only if business chooses backend-created identities; verify API permission scope. |
| Update identity fields | yes | blocked | Needed to keep member identity current; verify writable fields and audit behavior. |
| Assign access group | yes | blocked | Core capability for membership/booking entitlement; must test with non-production group. |
| Remove access group | yes | blocked | Core safety capability; revocation must be proven before any grant automation. |
| Read back state for verification | yes | blocked | Required to avoid blind grant behavior and support AdminJS/manual incident workflows. |
| Temporary access windows | preferred | unknown | Preferred. If unavailable, use scheduled grant/revoke jobs with conservative windows. |
| Test org / test group | yes | blocked | Must exist before integration tests or dry-run sync. |
| Credential mechanism confirmed | yes | blocked | Mobile pass/card/PIN/BLE mechanism must be confirmed; no mobile unlock button in v1 unless explicitly supported. |

## Verkada Branch Decision

Decision: Partial for planning, gated before implementation.

Build mobile scaffold/auth/payments independently. Keep Phases 10-12 conditional. For v1, prefer access status and backend-managed entitlement sync, not live mobile unlock. If any of API access, group assignment, revocation, or read-back verification fails, switch to No-go and defer T100-T124.

## Stripe Booking Spike

Goal: PaymentIntent + PaymentSheet confirms a meeting room booking in test mode, with webhook source of truth.

| Check | Result | Notes |
|---|---|---|
| Backend creates PaymentIntent | repo-supported / needs live test | Existing booking service includes PaymentIntent fields and creation/retrieval logic; endpoint shape for mobile still to be wrapped later. |
| Mobile PaymentSheet initializes | not run | Requires Expo app scaffold and Stripe publishable key/test backend endpoint. |
| 3DS/SCA path tested | not run | Required before release using Stripe test cards. |
| Webhook updates booking status | repo-supported / needs regression test | Existing webhook/source-of-truth behavior must be preserved; mobile must refetch rather than confirm optimistically. |
| Mobile refetch shows confirmed state | not run | Requires Phase 6 implementation and test-mode backend. |

Proceed with PaymentIntent + PaymentSheet; T063 must keep webhook-source-of-truth and no optimistic booking confirmation.

## Stripe Membership Spike

Goal: PaymentSheet collects a payment method through SetupIntent; backend creates/updates Subscription; webhook activates membership.

| Check | Result | Notes |
|---|---|---|
| Backend creates SetupIntent | not yet implemented for mobile | Existing Stripe service likely supports Stripe primitives but mobile-specific SetupIntent endpoint is T070. |
| Mobile PaymentSheet completes setup | not run | Requires Phase 7 endpoint and Expo Stripe SDK. |
| Backend creates Subscription | repo-supported / mobile path not implemented | Existing membership/subscription logic must be reused server-side; mobile never creates subscriptions directly. |
| 3DS/SCA path tested | not run | Required with Stripe test cards before release. |
| Webhook activates membership | repo-supported / needs regression test | Webhooks remain source of truth. |
| Plan change path verified | not run | Required before Phase 7 done. |
| Cancellation path verified | not run | Required before Phase 7 done. |

Proceed with SetupIntent + PaymentSheet + server-side Subscription; T070-T075 remain security-critical.

## Background Job Runtime Evaluation

| Option | Supported | Pros | Cons | Decision |
|---|---|---|---|---|
| Same Node process + node-cron + DB lease | yes for dev/low volume | minimal dependency, easiest Hostinger start | competes with API process, deploy/restart can pause jobs, weaker isolation | fallback/dev only |
| Separate Node worker on same host | preferred if Hostinger process manager allows | isolates job work, still no Redis, DB lease prevents duplicate workers | requires process manager/startup monitoring | selected for v1 |
| External queue with Redis/BullMQ | defer | strong retries, delayed jobs, horizontal scaling | extra Redis dependency and hosting complexity | defer until volume/reliability requires |

Selected runtime: Separate Node worker on same host using DB leases for reconciliation/outbox jobs; same-process node-cron allowed only as local/dev fallback.

## Push Notification Feasibility

- Decision: Expo Push v1 behind provider abstraction.
- Feasible because it fits Expo and reduces APNs/FCM setup in v1.
- Still required: Expo project credentials, real-device permission testing, token registration endpoint, preferences endpoint, outbox dedupe, quiet-hours handling.
- Sensitive payment/access details must not be sent in push payloads.

## External Verification Checklist Before Access/Payments Release

- [ ] Verkada org API token/scope confirmed.
- [ ] Non-production Verkada access group available.
- [ ] Assign/remove/read-back tested against real org.
- [ ] Credential mechanism confirmed.
- [ ] Stripe booking PaymentSheet PaymentIntent test succeeds, including 3DS/SCA.
- [ ] Stripe membership SetupIntent + Subscription test succeeds, including webhook activation.
- [ ] Worker process startup/monitoring confirmed on Hostinger.
- [ ] Expo Push credentials and device token lifecycle tested.

## Risks Found

- Physical access automation is unsafe until revocation and read-back are proven.
- Stripe mobile flows must not bypass existing webhook source-of-truth or create optimistic paid/active states.
- Hostinger/process constraints may force same-process jobs temporarily; access revocation jobs need monitoring.
- Push notification payloads could leak sensitive data if not constrained.
- Production API URL, bundle IDs, package name, and universal/app links are still pending.

## Final Phase 0 Recommendation

Proceed with Phase 1 scaffold and Phase 2 backend mobile auth after T002/T003 are filled. Treat Verkada as Partial/gated; do not implement T100-T124 until real org checks pass. Treat Stripe approach as architecturally approved but require test-mode spikes before completing payment phases. Select separate Node worker + DB lease for v1 jobs, with Redis/BullMQ deferred.
