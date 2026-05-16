# Mobile And Access Incident Runbook

Owner: LEAD
Status: drafted - contacts and external access procedures pending

## Purpose

Operational guide for native mobile app, payment, push notification, backend worker, and door/access incidents.

## Contacts

| Role | Contact | Backup | Notes |
|---|---|---|---|
| Business owner | pending | pending | Required before release |
| Backend owner | pending | pending | Required before Phase 2 production rollout |
| Verkada admin | pending | pending | Required before T100-T124 |
| Stripe admin | pending | pending | Required before payment test-mode spikes |
| Hostinger admin | pending | pending | Required before worker runtime verification |

## Severity Levels

| Severity | Definition | Response Target |
|---|---|---|
| SEV1 | Invalid member may have physical access; valid members broadly locked out; payment system creates duplicate/incorrect charges; mobile auth token compromise suspected. | immediate |
| SEV2 | Payment/booking/membership/push flow broken for many users; access sync delayed but manual workaround exists. | same business day |
| SEV3 | Isolated mobile UI/deep-link/push preference issue with workaround. | next planned fix |

## General Incident Rules

- Never include Stripe secret keys, Verkada credentials, access tokens, refresh tokens, session tokens, reset tokens, or raw push tokens in incident notes or screenshots.
- Mobile must never call Verkada directly; all Verkada checks/actions go through backend/AdminJS or the Verkada dashboard.
- Stripe dashboard/webhooks remain source of truth for payment state.
- Do not manually mark a booking paid or membership active unless Stripe confirms the payment/subscription state.
- For access incidents, prefer safe revocation/under-grant over blind granting when state cannot be verified.
- Record incident timeline, affected member IDs/emails, operator, reason, and resolution evidence.

## Door Access Revocation Failure

1. Treat as SEV1 if an ineligible member may retain physical access.
2. Open AdminJS access sync dashboard when available; otherwise use the manual operations record.
3. Find member by email and internal user ID.
4. Check desired entitlement from backend membership/booking state.
5. Check last access sync event and worker logs.
6. Trigger backend/AdminJS manual revoke with an admin reason when implemented.
7. Verify state by read-back from Verkada API or directly in Verkada dashboard.
8. If API revoke/read-back fails, revoke manually in Verkada dashboard.
9. Record whether access was over-granted, under-granted, or unknown, and attach non-secret evidence.
10. Do not close until revocation is verified or business owner accepts documented manual mitigation.

## Member Locked Out

1. Verify member identity using normal support process; do not ask for passwords/tokens.
2. Check membership/payment/booking entitlement in backend/AdminJS.
3. Check access status endpoint/AdminJS sync events when available.
4. If entitlement should be active, request access reconciliation or manual grant with reason.
5. Verify read-back from Verkada/API/dashboard before telling the member access is active.
6. If Verkada is unavailable, use manual reception/Verkada admin path.
7. Record workaround and follow-up sync task.

## Access Worker / Job Failure

1. Check whether separate Node worker is running on Hostinger/process manager.
2. Check DB lease table/state when implemented; ensure no duplicate active worker owns the same job.
3. Pause non-critical notification/outbox jobs if they interfere with access revocation.
4. Prioritize revocation jobs over grant jobs.
5. If worker cannot run separately, switch to documented same-process fallback only after LEAD/REVIEWER approval and add monitoring.
6. Record missed job windows and affected members/bookings.

## Stripe Payment Incident

1. Check Stripe dashboard event/payment/subscription state.
2. Check backend webhook logs and `stripe_webhook_events` or equivalent table when available.
3. Check whether mobile showed pending/failed/confirmed based on backend state, not PaymentSheet completion alone.
4. Do not manually mark paid/active unless Stripe confirms payment/subscription state.
5. If duplicate charge suspected, stop retry jobs and investigate before refund/cancel actions.
6. For refunds/cancellations, follow backend service path and preserve audit trail.
7. Record Stripe object IDs only; never record secret keys or full card/payment method data.

## Mobile Auth / Token Incident

1. Treat suspected token leakage/reuse as security incident.
2. Revoke affected mobile session or all user sessions using backend/AdminJS path when available.
3. Confirm refresh-token family reuse detection/audit event if applicable.
4. Preserve cookie-session CSRF behavior for web routes; do not bypass CSRF except validated Bearer mobile path.
5. Ask user to re-login; do not request token screenshots.
6. Record affected user/session IDs but not token values.

## Push Notification Incident

1. Check notification outbox depth and failed-provider responses.
2. Check provider abstraction/Expo Push delivery errors.
3. Disable non-critical notification sends if duplicate/incorrect pushes occur.
4. Confirm no sensitive payment, membership, access, token, or credential data was included in payloads.
5. For wrong-recipient push, treat as privacy incident and identify affected users.
6. Verify preferences/quiet-hours logic before re-enabling sends.

## Mobile Forced Update Incident

1. If old app version is unsafe, raise `minSupportedVersion` in version policy.
2. Confirm iOS and Android store URLs are valid before enforcing.
3. Monitor support channels for blocked users.
4. Provide manual workaround or rollback plan if version policy blocks valid users.

## Account Deletion / Privacy Incident

1. Check deletion request status and 30-day processing timeline.
2. Revoke mobile sessions and push tokens through backend path when implemented.
3. Confirm access entitlements are revoked or manually mitigated.
4. Do not delete records required for legal/accounting/audit retention without policy approval.
5. Record user-facing response and remaining retention obligations.

## Post-Incident Review

- What happened and when?
- Which members/users/bookings/payments/access groups were affected?
- Was physical access over-granted, under-granted, or unknown?
- Was payment state incorrect, duplicated, delayed, or only displayed incorrectly?
- Which logs/events/dashboard evidence prove resolution?
- Was any sensitive data exposed in logs, push payloads, screenshots, or support messages?
- What test, alert, runbook update, or product change would have prevented it?
- Which follow-up task/owner/date is assigned?
