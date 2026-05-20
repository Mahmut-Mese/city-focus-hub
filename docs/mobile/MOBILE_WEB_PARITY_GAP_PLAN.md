# Mobile Web-Parity Gap Fix Plan

**Date:** 2026-05-16
**Status:** LEAD discovery plan / pending implementation

---

## Context

- User wants whatever is in the web app to be present in native mobile as well.
- User found example: no booking button in mobile.
- Native only; no WebView. Mobile never calls Verkada directly. Stripe webhooks/server state stay payment source of truth. Production release blockers unchanged.

---

## Feature Matrix

| Feature | Status | Notes |
|---------|--------|-------|
| Home | Done | Done after H180-H223; native sections/contact/menu implemented. |
| Public Pricing | Partial | Mobile has hero + plan cards; missing purchase/checkout CTA routing, comparison table, pricing FAQ/recommended visual parity. |
| Public Meeting Rooms | Partial | Mobile has list/cards; missing Book Now buttons, resource-price matching, expand/collapse details, amenities section, meeting-room plan cards. |
| Public Guest Meeting Room Booking | Missing | Web has `/meeting-rooms/book` and `/meeting-rooms/:roomSlug/book` with guest name/email/date/hour-slot/payment; mobile has no public guest booking screen. |
| Member BookRoom | Partial | Mobile has room selection/text date-time inputs/price estimate/validation only; existing `useBookingPaymentSheet` exists but is not integrated. Missing native date/hour-slot picker, availability filtering, create/payment flow, confirmation/pending state. |
| Public Virtual Office | Partial | Mobile has hero + basic features; missing featured image, overview/challenge/result/gallery/project info, pricing/contact CTAs, virtual-office-specific contact form submission. |
| Member Dashboard | Partial | Mobile has stats/upcoming list; missing quick actions and richer parity sections. |
| Member Bookings | Partial | Mobile lists bookings; missing detail view, edit flow, cancel/refund request flow, payment adjustment flows. |
| Membership | Partial | Mobile supports join with PaymentSheet when no membership and pending message; missing public pricing checkout path, upgrade/downgrade/cancel scheduled changes parity and richer confirmation UI. |
| Invoices | Partial | Mobile opens hosted/pdf URLs externally; missing native detail and clearer download/share states. |
| Profile/Settings/Auth | Partial/Mostly done | Login/register/forgot/reset/profile/settings/account deletion/notifications exist; missing password change if backend supports it; auth Home return fixed. |
| AccessStatus | Blocked/gated | Mobile has placeholder; do not implement until Verkada external verification passes. |
| Blog/FAQ/About/Contact/Privacy/Terms | Mostly done | Lower priority visual parity polish remains. |

---

## Prioritized Fix Phases

### Phase 23: Public conversion CTA parity

**Risk:** Low/medium risk, normal coder

**Scope:** Pricing purchase buttons route to Auth/Login or Member/Membership; MeetingRooms Book Now buttons route to public guest booking when implemented or Auth/BookRoom as interim; Dashboard quick Book Room CTA; VirtualOffice pricing/contact CTAs.

**Files likely:** PublicStack, MeetingRoomsScreen, PricingScreen, VirtualOfficeScreen, DashboardScreen, RootNavigator as needed.

**Verification:** mobile typecheck/smoke/manual nav.

---

### Phase 24: Public guest meeting-room booking

**Risk:** Payment/security risk, risky coder + LEAD review

**Scope:** Add public guest booking screen, API wrappers for guest booking payment intent using existing backend endpoints if available, native date/hour-slot picker, guest details, PaymentSheet, confirmation pending server/webhook truth.

**Files likely:** PublicStack, new public booking screen, booking-api, payment hook.

**Security:** Must not log client secrets; server/webhook source of truth.

---

### Phase 25: Member BookRoom real booking/payment completion

**Risk:** Payment/security risk

**Scope:** Integrate existing `useBookingPaymentSheet` into BookRoomScreen, replace raw text time inputs with date/hour-slot UI, use resource availability query, create/payment flow, confirmation pending. Verify no optimistic paid/confirmed state.

---

### Phase 26: Public page content parity polish

**Risk:** Normal coder

**Scope:** Pricing comparison/FAQ/recommended badge; meeting rooms amenities/plans/expand; virtual office full content/gallery/contact form.

**Verification:** endpoint/content shape, typecheck/smoke, simulator visual checklist.

---

### Phase 27: Member dashboard/bookings parity

**Risk:** Mixed risk

**Scope:** Quick actions, booking detail, edit, cancel/refund request, payment adjustment flows. Anything mutating booking/refund/payment is risky coder + LEAD security review.

---

### Phase 28: Membership lifecycle parity

**Risk:** Payment/security risk

**Scope:** Upgrade/downgrade/cancel scheduled changes, richer confirmation/pending states; preserve webhooks source of truth.

---

### Phase 29: Account/profile/invoice polish

**Risk:** Normal/risky depending endpoint

**Scope:** Invoice detail/download/share UX; password change only if existing safe backend endpoint; settings nav polish.

---

### Phase 30: Full parity QA/review

**Risk:** OPS/LEAD

**Scope:** lint/check/test/e2e/mobile typecheck/mobile smoke/simulator visual pass; preserve production blockers.

---

## Immediate Recommended First Implementation Slice

1. **Add visible Book Now buttons** to mobile MeetingRooms cards and a Dashboard quick Book Room action.

2. **Interim behavior for public guest booking:** Because public guest booking screen is missing, interim behavior should navigate unauthenticated users to Auth/Login and authenticated users to Member/BookRoom, unless LEAD chooses to implement public guest booking first.

3. **Add Pricing purchase buttons** similarly to login/member membership as interim.

4. **Then build public guest booking** properly in Phase 24.

---

## Risk Routing

| Risk Level | Coder | Examples |
|------------|-------|----------|
| Normal | `mobile-normal-coder` | Visual sections, navigation CTAs, non-mutating UI |
| Risky | `mobile-risky-coder` + LEAD second-pass | Stripe PaymentSheet changes, booking creation/payment state, refund/cancel/payment adjustment, password/security |
| OPS | `mobile-ops` | Verification only |

---

## Acceptance Criteria

- All web-visible conversion actions have mobile equivalents.
- Booking and membership payment flows are native and preserve server/webhook source of truth.
- No WebView, no direct Verkada, no secret logging.
- `npm run lint`, `npm run check`, `npm run test`, `npm run test:e2e -- --reporter=line`, `mobile npm run typecheck`, `mobile npm run test:smoke`, simulator visual pass.

---

## Notes

- This plan is a LEAD discovery plan pending implementation approval.
- Production release blockers remain unchanged.
- All payment flows must use Stripe PaymentSheet with server/webhook as source of truth.
- Mobile must never call Verkada directly.