# Mobile Full Backend-Driven Web Parity Audit

**Date:** 2026-05-19  
**Purpose:** Ensure mobile app achieves full feature, content, and UX parity with web application using backend/CMS as source of truth, with native implementation only (no WebView).

---

## 1. Executive Summary

This audit identifies gaps between the Leadenhall Works web application and mobile app, focusing on:
- **Content parity:** All text, labels, and copy sourced from backend/CMS APIs
- **Feature parity:** All web routes and functionality available in mobile
- **UX parity:** Calendar, booking, and member flows match web behavior
- **Security:** Stripe/backend state remains source of truth; only refresh/session material in SecureStore

**Key Constraints:**
- Native implementation only; no WebView
- Mobile never calls Verkada directly
- AccessStatus/Verkada integration remains deferred
- Production release blocked until external release blockers cleared

---

## 2. Web Routes Reference

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/pricing` | Membership/Pricing |
| `/pricing/checkout` | Membership checkout |
| `/meeting-rooms` | Meeting room listing |
| `/meeting-rooms/book` | Guest booking/payment/confirmation |
| `/virtual-office` | Virtual office information |
| `/about` | About page |
| `/contact` | Contact page |
| `/faq` | FAQ page |
| `/blog` | Blog list |
| `/blog/:id` | Blog detail |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/auth` | Authentication |
| `/reset-password` | Password reset |
| `/dashboard/*` | Member dashboard (overview, bookings, billing, invoices, profile, settings) |

---

## 3. Mobile Routes Reference

### 3.1 Public Screens
- Home
- Pricing (visible as Membership)
- MeetingRooms
- MeetingRoomBooking
- VirtualOffice
- About
- FAQ
- BlogList
- BlogDetail
- Contact
- Privacy
- Terms

### 3.2 Auth Screens
- Login
- Register
- ForgotPassword
- ResetPassword

### 3.3 Member Screens
- Dashboard
- Bookings
- BookRoom
- Membership
- Invoices
- Profile
- Settings
- NotificationPreferences
- AccessStatus (placeholder - intentionally gated by Verkada)
- AccountDeletion

---

## 4. Backend/CMS Endpoints Currently Used by Mobile

### 4.1 Content-API Endpoints
| Endpoint | Purpose |
|----------|---------|
| `/api/site-setting` | Site configuration |
| `/api/homepage` | Home page content |
| `/api/about-page` | About page content |
| `/api/blog-page` | Blog listing page metadata |
| `/api/pricing-page` | Pricing page content |
| `/api/faq-page` | FAQ page content |
| `/api/meeting-rooms-page` | Meeting rooms page content |
| `/api/virtual-office-page` | Virtual office page content |
| `/api/contact-page` | Contact page content |
| `/api/privacy-policy-page` | Privacy policy content |
| `/api/terms-page` | Terms of service content |
| `/api/blog-posts` | Blog posts list |
| `/api/faq-items` | FAQ items |
| `/api/pricing-plans` | Pricing plans |
| `/api/meeting-rooms` | Meeting room resources |
| `/api/public/plans` | Public pricing plans |
| `/api/contact-submissions` | Contact form submissions |

### 4.2 Auth Endpoints
| Endpoint | Purpose |
|----------|---------|
| `/api/v1/mobile-auth/login` | User login |
| `/api/v1/mobile-auth/register` | User registration |
| `/api/v1/mobile-auth/refresh` | Token refresh |
| `/api/v1/mobile-auth/logout` | User logout |
| `/api/v1/mobile-auth/session` | Session validation |
| `/api/v1/mobile-auth/forgot-password` | Password reset request |
| `/api/v1/mobile-auth/reset-password` | Password reset execution |
| `/api/v1/mobile-auth/change-password` | Password change |

### 4.3 Member Endpoints
| Endpoint | Purpose |
|----------|---------|
| `/api/member-portal/dashboard` | Dashboard data |
| `/api/member-portal/profile` | Member profile |
| `/api/member-portal/resources` | Member resources |
| `/api/member-portal/invoices` | Invoice list |
| `/api/member-portal/memberships` | Membership details |
| `/api/member-portal/setup` | Subscription setup |
| `/api/member-portal/subscription` | Subscription management |
| `/api/member-portal/change` | Plan change |
| `/api/member-portal/cancel` | Subscription cancellation |
| `/api/member-portal/bookings` | Booking management |
| `/api/member-portal/push` | Push notification settings |
| `/api/member-portal/preferences` | User preferences |
| `/api/member-portal/account-deletion` | Account deletion |

### 4.4 Public Booking Endpoints
| Endpoint | Purpose |
|----------|---------|
| `/api/public/meeting-rooms/resources` | Public meeting room resources |
| `/api/public/meeting-rooms/booking` | Public booking creation |
| `/api/public/meeting-rooms/payment` | Payment processing |
| `/api/public/meeting-rooms/confirm` | Booking confirmation |
| `/api/public/meeting-rooms/cancel` | Booking cancellation |

---

## 5. Gap Analysis

### 5.1 Public/CMS Content Gaps

#### 5.1.1 Home Screen
| Gap | Description |
|-----|-------------|
| Media URL normalization | Mobile content-api lacks web-equivalent media URL normalization and deep populate mappings. Images/media can silently fall back or be absent. |
| Navigation data | Home menu uses hardcoded `MENU_LINKS` instead of site-setting navigation |
| Logo/site name | Hardcoded logo text instead of site-setting `logo`/`siteName` |
| Footer content | Home omits footer/navigation/social/footer links from site settings; web Layout has them |

#### 5.1.2 About Screen
| Gap | Description |
|-----|-------------|
| Hero image | Mobile omits hero image from CMS |
| Story images | Uses simpler layout; should render CMS images |
| Amenities icons | Icons/items from backend not rendered |

#### 5.1.3 MeetingRooms Screen
| Gap | Description |
|-----|-------------|
| Room images | Mobile omits room images |
| Expanded behavior | Missing read-more behavior |
| Plan type filtering | Should align with web ('meeting-room' vs current mixed 'meeting_room' workaround) |
| Resource data | DB resource data not used where authoritative |

#### 5.1.4 VirtualOffice Screen
| Gap | Description |
|-----|-------------|
| Featured image | Mobile omits featured image |
| Gallery images | Gallery images not rendered |
| Project info card | Missing from mobile |
| Phone CTA | Phone CTA from site settings omitted |
| Contact form | Contact form not implemented |
| Feature list | Uses hardcoded feature list fallback instead of CMS data |

#### 5.1.5 Contact Screen
| Gap | Description |
|-----|-------------|
| Social links | Mobile omits social links |
| Intro eyebrow | Missing eyebrow from content |
| Form placeholders | Content.form placeholders/labels not used |
| Enquiry banner | Search params behavior missing |
| Map button copy | Hardcoded instead of CMS-driven |

#### 5.1.6 FAQ Screen
| Gap | Description |
|-----|-------------|
| Search/filter | Mobile omits search/filter functionality |
| Accordion behavior | Missing expand/collapse states |
| Content section | Eyebrow/title/description content section not rendered |
| No-results text | Missing from mobile |
| CTA card | CTA card not implemented |

#### 5.1.7 BlogList Screen
| Gap | Description |
|-----|-------------|
| Quick search | Lacks quick search side card |
| Categories | Categories from blog-page not shown |
| Popular tags | Popular tags missing |
| Featured filtering | No parity with web filtering |
| Layout metadata | Full web layout metadata not implemented |

#### 5.1.8 BlogDetail Screen
| Gap | Description |
|-----|-------------|
| Pro-tip | Missing pro-tip section |
| Content images | Content images not rendered |
| Related workspaces | Related workspaces not shown |
| Detail search | Search form/button missing |
| Popular tags | Not displayed |
| Comment/contact form | Behavior not implemented |

#### 5.1.9 Pricing Screen
| Gap | Description |
|-----|-------------|
| Recommended badge | Lacks recommended badge parity |
| Payment messages | Technical payment messages need website-like copy |
| Backend data | Mostly fetches pricing-page and /api/public/plans but copy needs parity |

#### 5.1.10 Privacy/Terms Screens
| Gap | Description |
|-----|-------------|
| Field verification | Fetch body/content but should verify all legal fields |
| Formatting parity | Legal formatting not verified for parity |

### 5.2 Auth Gaps

| Gap | Description |
|-----|-------------|
| Copy parity | Login/register/forgot/reset copy is local; acceptable but should match web copy where possible |
| Password requirements | Min length may differ from web (web requires 8 chars) |

### 5.3 Member Gaps

#### 5.3.1 Dashboard
| Gap | Description |
|-----|-------------|
| Membership details | Missing membership details card richness |
| Date cards | Date cards not implemented |
| Account state | Account state card missing |
| Navigation | Dashboard nav/sidebar equivalents not present |
| Booking links | Booking manage/details links missing |

#### 5.3.2 Bookings
| Gap | Description |
|-----|-------------|
| View details | Web supports view details; mobile does not |
| Edit booking | Edit booking functionality missing |
| Payment adjustment | Update booking payment adjustment not implemented |
| Status badges | Status badges with exact copy not rendered |

#### 5.3.3 BookRoom (Member Booking)
| Gap | Description |
|-----|-------------|
| Calendar UX | Lacks calendar/day-slot availability UX parity |
| Visual states | Consecutive-hour visual states missing |
| Update flow | Update flow not implemented |
| VAT detail | VAT detail parity not achieved |
| Edit flow | Edit booking flow not implemented |

#### 5.3.4 Membership
| Gap | Description |
|-----|-------------|
| Plan change/cancel | Has basic functionality but needs copy parity |
| Scheduled downgrade | Exact messaging not implemented |

#### 5.3.5 Invoices
| Gap | Description |
|-----|-------------|
| Table view | Web has invoice table and PDF download helper; mobile opens hosted/PDF links only |
| Invoice details | Should expose description/paid date/PDF/hosted invoice parity |

#### 5.3.6 Profile
| Gap | Description |
|----|-------------|
| Account state | Missing account state card |
| Member since | Member since date not displayed |
| Access status | Access/subscription cards missing |
| Initials display | Initials display parity not achieved |

#### 5.3.7 Settings
| Gap | Description |
|-----|-------------|
| Password requirements | Min length may differ from web (web requires 8 chars) |

#### 5.3.8 NotificationPreferences
| Gap | Description |
|-----|-------------|
| Labels | Backend API exists but labels are hardcoded; acceptable unless backend adds labels |

#### 5.3.9 AccountDeletion
| Gap | Description |
|-----|-------------|
| Copy | Uses backend; copy local, acceptable |

#### 5.3.10 AccessStatus
| Gap | Description |
|-----|-------------|
| Placeholder | Intentionally gated by Verkada external verification |
| Implementation | Do not implement/fake access until gate clears |

---

## 6. Prioritized Implementation Batches

### P240: Public CMS Foundation
- **Scope:** content-api media normalization, optional precise populate helpers
- **Security:** Low (public content)
- **Files:** Content API services, image handling utilities
- **DoD:** All CMS images render with proper URL normalization; no silent fallbacks

### P241: Public Contact/FAQ/VirtualOffice Parity
- **Scope:** Render omitted backend/CMS fields, remove hardcoded feature/button copy where CMS has data
- **Security:** Low (public content)
- **Files:** ContactScreen, FAQScreen, VirtualOfficeScreen
- **DoD:** All CMS-driven fields render; hardcoded fallbacks removed

### P242: Public About/MeetingRooms/Pricing Parity
- **Scope:** Images, recommended badge, room images, read-more, plan type normalization
- **Security:** Low (public content)
- **Files:** AboutScreen, MeetingRoomsScreen, PricingScreen
- **DoD:** All images render; pricing badges match web; room filtering normalized

### P243: Blog List/Detail Full Parity
- **Scope:** Categories/tags/search/pro-tip/images/related/contact form
- **Security:** Low (public content)
- **Files:** BlogListScreen, BlogDetailScreen
- **DoD:** Full blog feature parity with web

### P244: Site Settings/Navigation/Footer Parity
- **Scope:** Backend-driven logo/nav/social/footer links where native-appropriate
- **Security:** Low (public content)
- **Files:** Navigation components, HomeScreen, Layout components
- **DoD:** Site settings drive all navigation/footer content

### P245: Member Dashboard/Profile/Invoices Parity
- **Scope:** Richer backend-rendered cards and fields
- **Security:** Medium (member data)
- **Files:** DashboardScreen, ProfileScreen, InvoicesScreen
- **DoD:** Member screens show full backend-driven data

### P246: Member Bookings/Edit Flow Parity
- **Scope:** View details/edit booking/update payment adjustment/cancel adjustment
- **Security:** High (booking/payment data)
- **Files:** BookingsScreen, BookingDetailScreen
- **DoD:** Full booking management parity with web

### P247: Member Booking Calendar UX Parity
- **Scope:** Member BookRoom web-like calendar/time slots/availability/VAT
- **Security:** High (Stripe booking flow)
- **Files:** BookRoomScreen, Calendar components
- **DoD:** Calendar UX matches web booking flow

### P248: Membership/Payment Message Parity Finalization
- **Scope:** Finalize website copy parity for membership flows
- **Security:** High (payment data)
- **Files:** MembershipScreen, Payment components
- **DoD:** All payment messages match web copy exactly

### P249: Settings/Auth Copy Parity
- **Scope:** Password min-length alignment, auth copy matching
- **Security:** High (authentication)
- **Files:** SettingsScreen, Auth screens
- **DoD:** Password requirements match web (8 chars); copy parity achieved

### P250: Verification/Docs Status Update
- **Scope:** Final verification and documentation updates
- **Security:** N/A
- **Files:** Documentation files
- **DoD:** All parity verified; docs updated

---

## 7. Blockers and Non-Goals

### 7.1 Deferred Items
| Item | Reason |
|------|--------|
| AccessStatus/Verkada | Remains deferred; do not fake until external gate clears |
| Production release | NO-GO until existing external release blockers cleared |
| Mobile-reviewer model | Governance may be needed until valid reviewer model works |

### 7.2 Non-Goals
- No WebView implementation
- No direct Verkada calls from mobile
- No hardcoded content except safe UX validation labels, local loading/error strings, platform chrome

---

## 8. Security Requirements

1. **Stripe/Backend State:** Remains source of truth for all payment/booking data
2. **SecureStore:** Only refresh tokens and session material stored locally
3. **No Direct API Calls:** Mobile never calls Verkada directly
4. **Auth Security:** Password requirements must match web (8 char minimum)
5. **Booking Security:** All booking flows go through backend; no local-only state

---

## 9. Verification Approach

Each batch requires:
1. Manual testing against web equivalent
2. API response validation against web data source
3. Visual parity comparison
4. Security review for member/auth flows

---

## 10. Dependencies

- Backend CMS endpoints must remain stable
- Auth API must continue supporting mobile flows
- Stripe integration must remain backend-driven
- Verkada integration remains out of scope until external gate clears