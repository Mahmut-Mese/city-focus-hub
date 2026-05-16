# Mobile Build Chain

This is the pre-written task chain. Tasks may be executed when all dependencies are complete in `PHASE_STATUS.md`.

Legend:

- `Sec`: security-critical. Requires LEAD second-pass review and REVIEWER repo-aware review.
- `DoD`: definition of done.
- Roles: LEAD, REVIEWER, BACKEND-A, BACKEND-B, MOBILE-A, MOBILE-B, OPS.

## Model Routing Override

Task role describes domain ownership. Actual drafting model is chosen by complexity and security risk:

| Condition | OpenCode Agent | Model Pool |
|---|---|---|
| `Complexity: simple` and `Sec: no` | `mobile-normal-coder` | routerpool/openai/gpt-oss-120b (local OpenRouter key rotation) |
| `Complexity: medium` and `Sec: no` | `mobile-normal-coder` | routerpool/openai/gpt-oss-120b (local OpenRouter key rotation) |
| `Complexity: hard` or `Sec: yes` | `mobile-risky-coder` | `google/antigravity-gemini-3.1-pro` |
| Any command-only verification | `mobile-ops` | MiniMax free |
| Final review/integration | `mobile-reviewer` | Copilot/Opus |

If a task touches auth tokens, Stripe payment state, refunds, account deletion, Verkada, access control, or scheduled jobs, route it to `mobile-risky-coder` even if the table says medium.

## Phase Completion Review Gate

Before any phase is marked complete:

1. OPS runs the local post-phase QA gate: start required backend/app services with the local DB, run lint/typecheck/build commands available for the changed surfaces, run the native app locally, check browser/app/server logs for errors, and run any available e2e/smoke tests.
2. Any lint errors, browser/app errors, server errors, failing smoke checks, or failing e2e tests must be fixed or recorded as blockers before phase closure.
3. `mobile-reviewer` performs a repo-aware review of all files changed in that phase.
4. `mobile-reviewer` checks contracts, security rules, local QA/e2e results, blockers, and phase DoD.
5. `mobile-reviewer` reports one of: `APPROVE_PHASE`, `APPROVE_WITH_BLOCKERS`, or `REJECT_PHASE` to `mobile-lead`.
6. `mobile-lead` records the final phase decision and next action.

For tasks marked `Sec: yes`, this phase review does not replace mandatory LEAD second-pass security review; both gates are required.

## Phase 0: Feasibility And Decisions

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T000 | REVIEWER | simple | no | none | `docs/mobile/*` coordination docs | Docs package exists |
| T001 | LEAD | hard | no | T000 | `docs/mobile/feasibility-report.md` | Verkada, Stripe, jobs, push decisions documented |
| T002 | LEAD | medium | no | T001 | `docs/mobile/decisions.md` | Go/Partial/No-go decisions recorded |
| T003 | LEAD | medium | no | T001 | `docs/mobile/runbook.md` | Door/access incident runbook complete |
| T004 | OPS | simple | no | T000 | report only | Backend local start command outcome reported |
| T005 | OPS | simple | no | T000 | report only | Root tests/build baseline reported |

## Phase 1: Mobile Scaffold

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T010 | MOBILE-B | simple | no | T002 | `mobile/package.json`, `mobile/app.json`, `mobile/tsconfig.json` | `npm install` succeeds in `mobile/` |
| T011 | MOBILE-B | simple | no | T010 | `mobile/src/theme/index.ts`, `mobile/src/theme/tokens.ts` | Exports brand tokens from runtime |
| T012 | MOBILE-B | medium | no | T010 | `mobile/src/navigation/RootNavigator.tsx`, `PublicStack.tsx`, `MemberTabs.tsx` | TypeScript parses |
| T013 | MOBILE-B | medium | no | T010 | `mobile/src/api/client.ts` | Matches `CONTRACTS.md` client contract |
| T014 | MOBILE-A | medium | yes | T013 | `mobile/src/auth/AuthProvider.tsx`, `secure-storage.ts` | LEAD + REVIEWER approve auth flow |
| T015 | MOBILE-B | simple | no | T010 | `mobile/src/components/LoadingState.tsx`, `ErrorState.tsx`, `EmptyState.tsx` | Screens can import shared states |
| T016 | OPS | simple | no | T010-T015 | report only | `npx expo start --no-dev --non-interactive` starts or blocker recorded |

## Phase 2: Backend Mobile Auth

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T020 | BACKEND-B | medium | yes | T002 | migration for mobile auth tables | Migration applies locally |
| T021 | BACKEND-A | hard | yes | T020 | `adminjs/src/services/mobile-auth-service.js` | Refresh rotation and reuse detection reviewed |
| T022 | BACKEND-B | hard | yes | T021 | `adminjs/src/mobile-auth-api.js` | Endpoints match contract |
| T023 | LEAD | hard | yes | T022 | shared auth middleware changes | Cookie vs Bearer path tested |
| T024 | BACKEND-B | medium | yes | T023 | server route registration | `/api/v1/mobile-auth/session` reachable |
| T025 | BACKEND-B | medium | yes | T023 | backend auth tests | Login/refresh/logout/reuse tests pass |
| T026 | OPS | simple | no | T020-T025 | report only | Backend tests pass or blockers recorded |

## Phase 3: Mobile API And Auth Screens

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T030 | MOBILE-B | medium | yes | T014,T024 | `mobile/src/api/mobile-auth-api.ts` | Uses contract endpoints only |
| T031 | MOBILE-A | simple | no | T030 | login screen | Calls `useAuth().login` |
| T032 | MOBILE-A | simple | no | T030 | register screen | Calls `useAuth().register` |
| T033 | MOBILE-A | simple | no | T030 | forgot/reset password screens | Deep-link placeholders included |
| T034 | MOBILE-B | medium | yes | T030 | session restore wiring | SecureStore restore works |
| T035 | OPS | simple | no | T030-T034 | report only | Expo start and typecheck pass |

## Phase 4: Public Native CMS Screens

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T040 | MOBILE-B | medium | no | T013 | `mobile/src/api/content-api.ts` | Existing CMS endpoints wrapped |
| T041 | MOBILE-A | simple | no | T040 | Home, About screens | CMS loading/error states |
| T042 | MOBILE-A | simple | no | T040 | Pricing, MeetingRooms screens | CMS loading/error states |
| T043 | MOBILE-A | simple | no | T040 | VirtualOffice, Contact screens | Contact submit wired |
| T044 | MOBILE-A | simple | no | T040 | FAQ, BlogList, BlogDetail screens | Lists/detail render |
| T045 | MOBILE-A | simple | no | T040 | Privacy, Terms screens | Legal text renders |
| T046 | OPS | simple | no | T041-T045 | report only | Public nav smoke passes |

## Phase 5: Native Member Screens

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T050 | MOBILE-B | medium | no | T013,T034 | `mobile/src/api/member-api.ts` | Dashboard/resources/profile/invoices methods exported |
| T051 | MOBILE-A | medium | no | T050 | Dashboard overview screen | Handles loading/empty/error |
| T052 | MOBILE-A | medium | no | T050 | My bookings screen | Lists and status display |
| T053 | MOBILE-A | medium | no | T050 | Membership screen | Shows current plan/status |
| T054 | MOBILE-A | simple | no | T050 | Invoices screen | Opens invoice URLs externally |
| T055 | MOBILE-A | medium | yes | T050 | Profile/settings screens | Sensitive actions gated |
| T056 | OPS | simple | no | T051-T055 | report only | Member tab navigation smoke passes |

## Phase 6: Native Booking Flow

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T060 | MOBILE-B | medium | no | T050 | booking API client methods | PaymentIntent endpoint wrapped |
| T061 | MOBILE-A | medium | no | T060 | room/date/time selection screens | Can build valid booking input |
| T062 | MOBILE-A | medium | no | T060 | purpose/notes/review screens | Price review shown |
| T063 | LEAD | hard | yes | T060 | PaymentSheet booking integration spec/code | Webhook-source-of-truth preserved |
| T064 | MOBILE-A | medium | yes | T063 | confirmation/cancel screens | No optimistic confirmation |
| T065 | OPS | simple | no | T061-T064 | report only | Booking flow smoke in test mode or blocker recorded |

## Phase 7: Native Membership Payments

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T070 | BACKEND-B | hard | yes | T025 | mobile membership SetupIntent endpoints | Test-mode SetupIntent works |
| T071 | BACKEND-A | hard | yes | T070 | server-side subscription activation logic | Webhooks remain source of truth |
| T072 | MOBILE-B | hard | yes | T070 | mobile membership payment API methods | Matches backend contract |
| T073 | LEAD | hard | yes | T072 | PaymentSheet membership integration | SetupIntent + Subscription path reviewed |
| T074 | MOBILE-A | medium | yes | T073 | membership payment screens | Activation pending state included |
| T075 | OPS | simple | no | T070-T074 | report only | Stripe test-mode membership flow outcome reported |

## Phase 8: Push Notifications Backend

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T080 | BACKEND-B | medium | no | T002 | push/notification migration | Tables apply locally |
| T081 | BACKEND-A | medium | no | T080 | `push-service.js`, provider interface | Expo driver isolated |
| T082 | BACKEND-A | medium | no | T080 | notification outbox service | Idempotency key enforced |
| T083 | BACKEND-B | medium | yes | T081,T082 | push token + preferences endpoints | Auth required |
| T084 | BACKEND-A | medium | no | T082 | notification enqueue hooks | Booking/payment events enqueue only once |
| T085 | OPS | simple | no | T080-T084 | report only | Backend notification tests pass or blockers recorded |

## Phase 9: Push Notifications Mobile

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T090 | MOBILE-B | medium | no | T083 | push registration module | Permission denial handled |
| T091 | MOBILE-B | medium | no | T090 | notification tap handlers | Deep links to route names |
| T092 | MOBILE-A | simple | no | T083 | notification preferences screen | Preferences update |
| T093 | MOBILE-B | medium | no | T091 | app config for links/notifications | Scheme configured |
| T094 | OPS | simple | no | T090-T093 | report only | Device/simulator push readiness reported |

## Phase 10: Verkada Backend Integration

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T100 | LEAD | hard | yes | T001 | Verkada implementation scope update | Go/Partial/No-go branch applied |
| T101 | BACKEND-B | medium | yes | T100 | Verkada/access migrations | Tables apply locally |
| T102 | BACKEND-A | hard | yes | T101 | `verkada-service.js` | Dry-run mode and identity matching reviewed |
| T103 | BACKEND-A | hard | yes | T101,T102 | `access-control-service.js` | Desired-state reconciliation reviewed |
| T104 | BACKEND-B | medium | yes | T103 | access status/sync endpoints | No blind grant behavior |
| T105 | OPS | simple | no | T101-T104 | report only | Dry-run tests pass or blocker recorded |

## Phase 11: Access Rules And Jobs

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T110 | LEAD | hard | yes | T103 | access decision rule tests/spec | Active/past_due/suspended/canceled covered |
| T111 | BACKEND-A | hard | yes | T110 | access reconciliation jobs | Revocations prioritized |
| T112 | BACKEND-A | medium | yes | T111 | booking temporary access jobs | 15-minute windows handled |
| T113 | BACKEND-A | medium | no | T111 | notification outbox delivery job | Quiet hours respected |
| T114 | OPS | simple | no | T111-T113 | report only | Job tests pass or blockers recorded |

## Phase 12: Access Mobile And AdminJS Tools

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T120 | MOBILE-B | medium | no | T104 | access API methods | Contract matched |
| T121 | MOBILE-A | medium | no | T120 | access status screen | No optimistic active access |
| T122 | BACKEND-B | medium | yes | T103 | AdminJS access resources/views | Manual changes require reason |
| T123 | BACKEND-B | medium | yes | T122 | AdminJS retry/revoke actions | Audit records written |
| T124 | OPS | simple | no | T121-T123 | report only | Access UI/admin smoke reported |

## Phase 13: Deep Links And Public Infrastructure

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T130 | BACKEND-B | simple | no | T093 | `.well-known/apple-app-site-association` route/static file | Served as JSON |
| T131 | BACKEND-B | simple | no | T093 | `.well-known/assetlinks.json` route/static file | Served as JSON |
| T132 | MOBILE-B | medium | no | T130,T131 | reset-password and notification link handling | Links route in app |
| T133 | OPS | simple | no | T130-T132 | report only | Link files reachable, app link config reported |

## Phase 14: Observability And Version Policy

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T140 | BACKEND-B | medium | no | T025 | version-policy endpoint | Returns min/recommended versions |
| T141 | MOBILE-B | medium | no | T140 | forced-update gate | Blocks below min version |
| T142 | BACKEND-A | medium | no | T111 | backend Sentry/job metrics hooks | Errors captured |
| T143 | BACKEND-A | medium | yes | T111 | access revocation alert thresholds | 15-minute alert path implemented |
| T144 | OPS | simple | no | T140-T143 | report only | Observability/version policy smoke reported |

## Phase 15: Account Deletion And Privacy

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T150 | BACKEND-B | medium | yes | T025 | account deletion request migration | Table applies locally |
| T151 | BACKEND-A | hard | yes | T150 | deletion request service | Sessions/push/access side effects reviewed |
| T152 | BACKEND-B | medium | yes | T151 | deletion request endpoints | 30-day status visible |
| T153 | MOBILE-A | medium | yes | T152 | account deletion screen | Clear request/cancel UX |
| T154 | LEAD | medium | no | T152 | privacy policy update text | Mobile/push/Verkada/delete covered |
| T155 | OPS | simple | no | T150-T154 | report only | Deletion tests pass or blocker recorded |

## Phase 16: Testing And QA

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T160 | BACKEND-B | medium | yes | T155 | backend integration tests | Auth/token/access/deletion tests pass |
| T161 | MOBILE-B | medium | no | T155 | mobile unit/smoke tests | Auth/API/navigation tests pass |
| T162 | MOBILE-A | medium | no | T155 | Maestro/Detox basic flows | Login/dashboard/booking smoke defined |
| T163 | OPS | simple | no | T160-T162 | report only | Full local verification report |
| T164 | REVIEWER | hard | yes | T163 | final code audit notes | Remaining risks documented |

## Phase 17: Release Readiness

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| T170 | MOBILE-B | medium | no | T164 | EAS build config | iOS/Android build settings present |
| T171 | MOBILE-B | simple | no | T170 | icons/splash placeholders | App assets configured |
| T172 | LEAD | medium | no | T164 | App Store review notes | Stripe physical services explained |
| T173 | LEAD | medium | no | T164 | Privacy labels/Data Safety draft | Store forms ready |
| T174 | OPS | simple | no | T170-T173 | report only | Release checklist report |
| T175 | REVIEWER | hard | yes | T174 | final sign-off summary | Go/no-go recommendation |

## Conditional Rules

- If Phase 0 Verkada is `No-go`, skip T100-T124 for v1 and mark them deferred.
- If Phase 0 job runtime is external queue, add Redis/queue dependency tasks before T111.
- If PaymentSheet + Subscription spike fails, LEAD must update T070-T075 before execution.
