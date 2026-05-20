# Mobile Full Parity Implementation Chain

**Date:** 2026-05-19  
**Purpose:** Track implementation batches for achieving full web-to-mobile parity

---

## Implementation Batches

| Batch ID | Scope | Security | Files Likely Touched | DoD | Verification Commands |
|----------|-------|----------|---------------------|-----|----------------------|
| P240 | Public CMS Foundation: content-api media URL normalization, optional precise populate helpers, no WebView | Low (public content) | `mobile/src/api/contentApi.ts`, `mobile/src/utils/imageUtils.ts`, `mobile/src/components/media/*` | All CMS images render with proper URL normalization; no silent fallbacks; media populated from backend | `cd mobile && npm run typecheck && cd mobile && npm run test:smoke` |
| P241 | Public Contact/FAQ/VirtualOffice Parity: render omitted backend/CMS fields, remove hardcoded feature/button copy where CMS has data | Low (public content) | `mobile/src/screens/ContactScreen.tsx`, `mobile/src/screens/FAQScreen.tsx`, `mobile/src/screens/VirtualOfficeScreen.tsx`, `mobile/src/api/contentApi.ts` | All CMS-driven fields render; hardcoded fallbacks removed; contact form submits to backend | `cd mobile && npm run typecheck && cd mobile && npm run test:smoke` |
| P242 | Public About/MeetingRooms/Pricing Parity: images, recommended badge, room images, read-more, plan type normalization | Low (public content) | `mobile/src/screens/AboutScreen.tsx`, `mobile/src/screens/MeetingRoomsScreen.tsx`, `mobile/src/screens/PricingScreen.tsx`, `mobile/src/api/contentApi.ts` | All images render; pricing badges match web; room filtering uses 'meeting-room' type; read-more behavior implemented | `cd mobile && npm run typecheck && cd mobile && npm run test:smoke` |
| P243 | Blog List/Detail Full Parity: categories/tags/search/pro-tip/images/related/contact form | Low (public content) | `mobile/src/screens/BlogListScreen.tsx`, `mobile/src/screens/BlogDetailScreen.tsx`, `mobile/src/api/blogApi.ts` | Full blog feature parity: categories, tags, search, pro-tip, images, related content, contact form | `cd mobile && npm run typecheck && cd mobile && npm run test:smoke` |
| P244 | Site Settings/Navigation/Footer Parity: backend-driven logo/nav/social/footer links where native-appropriate | Low (public content) | `mobile/src/components/navigation/*`, `mobile/src/screens/HomeScreen.tsx`, `mobile/src/components/layout/*`, `mobile/src/api/siteSettingsApi.ts` | Site settings drive all navigation/footer content; MENU_LINKS replaced with API data; logo/siteName from backend | `cd mobile && npm run typecheck && cd mobile && npm run test:smoke` |
| P245 | Member Dashboard/Profile/Invoices Parity: richer backend-rendered cards and fields | Medium (member data) | `mobile/src/screens/DashboardScreen.tsx`, `mobile/src/screens/ProfileScreen.tsx`, `mobile/src/screens/InvoicesScreen.tsx`, `mobile/src/api/memberApi.ts` | Member screens show full backend-driven data: membership details, account state, invoices table with PDF links | `cd mobile && npm run typecheck && cd mobile && npm run test:smoke` |
| P246 | Member Bookings/Edit Flow Parity: view details/edit booking/update payment adjustment/cancel adjustment | **Yes** (booking/payment) - LEAD second-pass required | `mobile/src/screens/BookingsScreen.tsx`, `mobile/src/screens/BookingDetailScreen.tsx`, `mobile/src/api/bookingApi.ts` | Full booking management: view details, edit booking, update payment, cancel with adjustment, status badges | `cd mobile && npm run typecheck && cd mobile && npm run test:smoke` |
| P247 | Member Booking Calendar UX Parity: member BookRoom web-like calendar/time slots/availability/VAT | **Yes** (Stripe booking) - LEAD second-pass required | `mobile/src/screens/BookRoomScreen.tsx`, `mobile/src/components/calendar/*`, `mobile/src/api/bookingApi.ts` | Calendar UX matches web: day-slot availability, consecutive-hour visual states, update flow, VAT details | `cd mobile && npm run typecheck && cd mobile && npm run test:smoke` |
| P248 | Membership/Payment Message Parity Finalization: website copy parity for membership flows | **Yes** (payment data) - LEAD second-pass required | `mobile/src/screens/MembershipScreen.tsx`, `mobile/src/components/payment/*`, `mobile/src/api/memberApi.ts` | All payment messages match web copy exactly; scheduled downgrade messaging implemented | `cd mobile && npm run typecheck && cd mobile && npm run test:smoke` |
| P249 | Settings/Auth Copy Parity: password min-length alignment, auth copy matching | **Yes** (authentication) - LEAD second-pass required | `mobile/src/screens/SettingsScreen.tsx`, `mobile/src/screens/auth/*`, `mobile/src/api/authApi.ts` | Password requirements match web (8 chars min); auth copy parity achieved | `cd mobile && npm run typecheck && cd mobile && npm run test:smoke` |
| P250 | Verification/Docs Status Update: final verification and documentation updates | N/A | `docs/mobile/*`, `README.md` | All parity verified; docs updated; status dashboard refreshed | `npm run lint && npm run check && npm run test && npm run test:e2e -- --reporter=line` |

---

## Batch Dependencies

```
P240 (Foundation)
    │
    ├── P241 (Contact/FAQ/VirtualOffice)
    ├── P242 (About/MeetingRooms/Pricing)
    ├── P243 (Blog)
    └── P244 (Site Settings)
            │
            ├── P245 (Member Dashboard/Profile/Invoices)
            │       │
            │       ├── P246 (Bookings Edit Flow)
            │       │       │
            │       │       └── P247 (Booking Calendar UX)
            │       │
            │       └── P248 (Membership/Payment Messages)
            │
            └── P249 (Settings/Auth Copy)
                    │
                    └── P250 (Verification)
```

---

## Security Classification

| Level | Description | Batches |
|-------|-------------|---------|
| Low | Public content, no authentication required | P240, P241, P242, P243, P244 |
| Medium | Member data, authenticated but not payment-related | P245 |
| High | Booking/payment data, Stripe integration, authentication | P246, P247, P248, P249 |
| N/A | Documentation/verification | P250 |

**Note:** Batches P246-P249 require LEAD second-pass review when touching booking/payment/auth code paths.

---

## Verification Commands Reference

```bash
# Mobile-specific type checking
cd mobile && npm run typecheck

# Mobile smoke tests
cd mobile && npm run test:smoke

# Root-level linting
npm run lint

# Root-level check (format/imports)
npm run check

# Root-level unit tests
npm run test

# E2E tests (when applicable)
npm run test:e2e -- --reporter=line
```

---

## Status Tracking

| Batch | Status | Notes |
|-------|--------|-------|
| P240 | Not Started | Foundation - must complete first |
| P241 | Not Started | Depends on P240 |
| P242 | Not Started | Depends on P240 |
| P243 | Not Started | Depends on P240 |
| P244 | Not Started | Depends on P240 |
| P245 | Not Started | Depends on P244 |
| P246 | Not Started | Depends on P245 - LEAD second-pass required |
| P247 | Not Started | Depends on P246 - LEAD second-pass required |
| P248 | Not Started | Depends on P245 - LEAD second-pass required |
| P249 | Not Started | Depends on P244 - LEAD second-pass required |
| P250 | Not Started | Final - depends on all others |

---

## Notes

- AccessStatus/Verkada integration remains out of scope until external gate clears
- Production release blocked until external release blockers cleared
- **mobile-reviewer is currently unavailable due to ProviderModelNotFound.** LEAD governance/fallback review may be needed until a valid reviewer model is configured.
- All member/auth flows require backend as source of truth
- SecureStore used only for refresh tokens and session material
- Batches P246-P249 are marked Security: yes and require LEAD second-pass review when touching booking/payment/auth code paths

(End of file - total 124 lines)