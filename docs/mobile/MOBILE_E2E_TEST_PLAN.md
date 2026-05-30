# Mobile E2E Test Plan — The Leadenhall Works

**Date:** 2026-05-28  
**App Bundle ID:** `com.leadenhallworks.mobile`  
**Scheme:** `leadenhallworks://`  
**Purpose:** Comprehensive native mobile end-to-end test plan covering every app screen, route, flow, and reliability concern. This is a **plan** — implementation details live in Maestro YAML files referenced in the mapping section.

---

## Automation Type Key

| Label | Meaning |
|-------|---------|
| **Maestro** | Fully automated via Maestro YAML flow |
| **API-assisted** | Needs an API call (e.g. create test user, seed data) before/after Maestro steps |
| **Manual** | Must be run manually (external blocker, destructive, payment, or Stripe-dependent) |

---

## Test Cases

### A. Public CMS Screens — Home

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-001 | App Launch / Dev Client | Clean simulator, no cached state | Launch app via Expo dev-client URL | App opens to Home screen without RedBox or crash | Maestro |
| TC-002 | App Launch — Splash | Clean simulator | Launch app, observe splash screen | Splash image displays briefly, then Home renders | Manual |
| TC-003 | Home — Hero Content | App running on Home | Verify hero title, subtitle, background image area are visible | Hero section renders with CMS-driven copy and image placeholder | Maestro |
| TC-004 | Home — Header Logo | App running on Home | Verify header displays app logo / site name | "THE LEADENHALL WORKS" or backend logo text visible | Maestro |
| TC-005 | Home — Header Account Button | App running on Home | Tap header "Account" button | Navigates to Login screen (unauthenticated) or Profile (authenticated) | Maestro |
| TC-006 | Home — Header Menu Button | App running on Home | Tap header menu / hamburger icon | Public menu links drawer/overlay opens | Maestro |
| TC-007 | Home — Public Menu Links | App running on Home, menu open | Verify menu contains: About, Meeting Rooms, Pricing, Virtual Office, FAQ, Blog, Contact | All expected menu items visible | Maestro |
| TC-008 | Home — Public Menu Navigation (About) | Menu open | Tap "About" menu link | Navigates to About screen | Maestro |
| TC-009 | Home — Public Menu Navigation (Meeting Rooms) | Menu open | Tap "Meeting Rooms" menu link | Navigates to MeetingRooms screen | Maestro |
| TC-010 | Home — Public Menu Navigation (Pricing) | Menu open | Tap "Pricing" or "Membership" menu link | Navigates to Pricing screen | Maestro |
| TC-011 | Home — Public Menu Navigation (Virtual Office) | Menu open | Tap "Virtual Office" menu link | Navigates to VirtualOffice screen | Maestro |
| TC-012 | Home — Public Menu Navigation (FAQ) | Menu open | Tap "FAQ" menu link | Navigates to FAQ screen | Maestro |
| TC-013 | Home — Public Menu Navigation (Blog) | Menu open | Tap "Blog" menu link | Navigates to BlogList screen | Maestro |
| TC-014 | Home — Public Menu Navigation (Contact) | Menu open | Tap "Contact" menu link | Navigates to Contact screen | Maestro |
| TC-015 | Home — Hero Primary CTA | App running on Home | Tap hero primary CTA button (e.g. "Get Started") | Navigates to Pricing screen or target route | Maestro |
| TC-016 | Home — Hero Secondary CTA | App running on Home | Tap hero secondary CTA (e.g. "Learn More") | Navigates to About or specified route | Maestro |
| TC-017 | Home — Services Cards | App running on Home, services section loaded | Scroll down to "Services" section | Services cards render with title, description, icon from CMS | Maestro |
| TC-018 | Home — Services Card Tap | App running on Home | Tap a services card | Navigates to the related screen (e.g., MeetingRooms, VirtualOffice) | Maestro |
| TC-019 | Home — About Highlight Section | App running on Home | Scroll past services to "About" highlight | About highlight card renders with CMS-driven text and image | Maestro |
| TC-020 | Home — About Highlight CTA | App running on Home | Tap about highlight "Learn More" / CTA | Navigates to About screen | Maestro |
| TC-021 | Home — Testimonials | App running on Home | Scroll to testimonials carousel/section | Testimonial cards render with quote, author, role from CMS | Maestro |
| TC-022 | Home — Testimonials Scroll | App running on Home | Swipe left/right on testimonials carousel | Carousel advances to next/previous testimonial | Maestro |
| TC-023 | Home — Gallery Section | App running on Home | Scroll to gallery images section | Gallery image thumbnails render from CMS | Maestro |
| TC-024 | Home — Gallery Image Tap | App running on Home | Tap a gallery image | Image expands to full-screen lightbox / viewer | Maestro |
| TC-025 | Home — Contact Form Section | App running on Home | Scroll to contact form | Name, email, phone, message fields visible with submit button | Maestro |
| TC-026 | Home — Contact Form Validation (Empty) | App running on Home | Tap "Submit" with all fields empty | Inline validation errors shown for required fields | Maestro |
| TC-027 | Home — Contact Form Validation (Invalid Email) | App running on Home | Enter invalid email, tap Submit | Email format validation error shown | Maestro |
| TC-028 | Home — Contact Form Success | App running on Home | Fill valid data, tap Submit | Success message displayed; form resets | Maestro |
| TC-029 | Home — Contact Form Failure Affordance | App running on Home, mock API failure | Submit form with valid data while backend returns 500 | Error message / retry affordance displayed | API-assisted |
| TC-030 | Home — Footer Privacy Link | App running on Home, scrolled to footer | Tap "Privacy Policy" footer link | Navigates to Privacy screen | Maestro |
| TC-031 | Home — Footer Terms Link | App running on Home, scrolled to footer | Tap "Terms of Service" footer link | Navigates to Terms screen | Maestro |
| TC-032 | Home — Footer Contact Link | App running on Home, scrolled to footer | Tap "Contact Us" footer link | Navigates to Contact screen | Maestro |
| TC-033 | Home — Footer Social Links | App running on Home, scrolled to footer | Verify social media icon links present | Social icons render (Instagram, LinkedIn, etc.) | Maestro |

### B. Public CMS Screens — Pricing / Membership

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-034 | Pricing — Public Plan Rendering | App running on Pricing screen | Verify all pricing plans rendered from CMS | Plan cards show name, price, period, feature list | Maestro |
| TC-035 | Pricing — Plan Comparison | App running on Pricing screen | Scroll to comparison table section | Comparison table renders columns and rows from CMS | Maestro |
| TC-036 | Pricing — Recommended / Popular Badge | App running on Pricing screen | Identify plan marked "popular" / "recommended" in CMS | Badge rendered on corresponding plan card | Maestro |
| TC-037 | Pricing — FAQ Section | App running on Pricing screen | Scroll to FAQ section | FAQ accordion items render from CMS | Maestro |
| TC-038 | Pricing — FAQ Accordion Expand | App running on Pricing screen | Tap a FAQ question | Answer text expands below the question | Maestro |
| TC-039 | Pricing — Authenticated Join Entry | Authenticated member with no membership | Navigate to Pricing screen | "Join" / "Select Plan" CTA routes to membership join flow | API-assisted |
| TC-040 | Pricing — Authenticated Change Entry | Authenticated member with active membership | Navigate to Pricing screen | "Change Plan" CTA routes to plan change flow | API-assisted |

### C. Public CMS Screens — Meeting Rooms

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-041 | MeetingRooms — Listing | App running on MeetingRooms screen | Verify meeting room cards list rendered | Room cards show name, capacity, description, features, image | Maestro |
| TC-042 | MeetingRooms — Resource Card Features | App running on MeetingRooms screen | Tap a room's features/badges section | Room feature chips/badges displayed from CMS | Maestro |
| TC-043 | MeetingRooms — Read More / Expand | App running on MeetingRooms screen | Tap "Read More" on a room card | Expanded description text shown | Maestro |
| TC-044 | MeetingRooms — Book Now CTA (Unauthenticated) | App running on MeetingRooms screen, not logged in | Tap "Book Now" on a room | Navigates to MeetingRoomBooking with room pre-selected | Maestro |
| TC-045 | MeetingRooms — Book Now CTA (Authenticated) | Authenticated member | Tap "Book Now" on a room | Navigates to BookRoom member flow with room pre-selected | API-assisted |

### D. Public CMS Screens — Guest Booking Flow

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-046 | Guest Booking — Navigate without Room | Deep link `meeting-rooms/book` without params | Navigate to booking screen | Room selection step shown first | Maestro |
| TC-047 | Guest Booking — Navigate with Room Slug | Deep link `meeting-rooms/book?room=boardroom` | Navigate to booking with room param | Room pre-selected, calendar/time step shown | Maestro |
| TC-048 | Guest Booking — Calendar Month Nav | Booking screen with room selected | Swipe left/right on calendar month header | Calendar advances to next/previous month | Maestro |
| TC-049 | Guest Booking — Room Selection | Booking screen at room step | Select a meeting room from list | Room confirmed, calendar/time step appears | Maestro |
| TC-050 | Guest Booking — Date Selection | Calendar step visible | Tap an available date | Date highlighted; time slot selection appears | Maestro |
| TC-051 | Guest Booking — Time Slot Selection | Date selected | Tap an available time slot (e.g. 10:00–11:00) | Time slot highlighted and selected | Maestro |
| TC-052 | Guest Booking — Details Form Validation | Time selected, tap next | Leave required fields (name, email) empty, tap Continue | Inline validation errors shown | Maestro |
| TC-053 | Guest Booking — Details Form Valid | Time selected | Fill name, email, phone, purpose; tap Continue | Navigates to price review step | Maestro |
| TC-054 | Guest Booking — Price Review | Details form submitted | Verify price breakdown shown (rate × hours + VAT) | Price, hours, VAT line items displayed | Maestro |
| TC-055 | Guest Booking — Payment Preconditions | Price review step | Tap "Proceed to Payment" | Payment screen with amount shown; Stripe elements render | Manual |
| TC-056 | Guest Booking — Cancel / Back Navigation | Any step in booking flow | Tap back / cancel button | Returns to previous step or MeetingRooms screen | Maestro |

### E. Public CMS Screens — Other Public Screens

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-057 | VirtualOffice — CMS Media | App running on VirtualOffice screen | Verify hero image, featured image, gallery images load | All CMS images render | Maestro |
| TC-058 | VirtualOffice — Feature List | App running on VirtualOffice screen | Scroll through feature/stats cards | Feature cards from CMS render with icons and text | Maestro |
| TC-059 | VirtualOffice — CTA | App running on VirtualOffice screen | Tap "Get Started" or primary CTA | Navigates to Pricing or Contact screen | Maestro |
| TC-060 | About — CMS Media | App running on About screen | Verify hero image, story image, amenities images render | All CMS images render | Maestro |
| TC-061 | About — Story Section | App running on About screen | Scroll to story section | Story title and paragraphs from CMS visible | Maestro |
| TC-062 | About — Amenities Section | App running on About screen | Scroll to amenities section | Amenity items with icons from CMS visible | Maestro |
| TC-063 | FAQ — CMS Items | App running on FAQ screen | Verify FAQ items list loaded | FAQ question-answer pairs rendered from CMS | Maestro |
| TC-064 | FAQ — Accordion Behavior | App running on FAQ screen | Tap a question to expand, tap again to collapse | Accordion expands/collapses correctly | Maestro |
| TC-065 | FAQ — Search / Filter | App running on FAQ screen | Type search term into search bar | FAQ list filters to matching questions | Maestro |
| TC-066 | FAQ — No Results | App running on FAQ screen | Type a search term that matches no questions | "No results" message displayed | Maestro |
| TC-067 | BlogList — Post Cards | App running on BlogList screen | Verify blog post cards render | Cards show title, excerpt, date, cover image from CMS | Maestro |
| TC-068 | BlogList — Post Tap | App running on BlogList screen | Tap a blog post card | Navigates to BlogDetail screen with that post | Maestro |
| TC-069 | BlogList — Categories | App running on BlogList screen | Verify category filter chips present | Category chips render from CMS data | Maestro |
| TC-070 | BlogList — Category Filter | App running on BlogList screen | Tap a category chip | Blog list filters to posts in that category | Maestro |
| TC-071 | BlogList — Search CTA | App running on BlogList screen | Verify search bar / button present | Search field visible | Maestro |
| TC-072 | BlogDetail — Content Render | App running on BlogDetail screen | Verify post title, body content, author, date visible | Full CMS blog content displayed | Maestro |
| TC-073 | BlogDetail — Content Images | App running on BlogDetail screen | Scroll through post body | CMS content images render inline | Maestro |
| TC-074 | BlogDetail — Pro-Tip Section | App running on BlogDetail screen | Scroll to pro-tip section (if post has one) | Pro-tip callout card with text rendered | Maestro |
| TC-075 | BlogDetail — Related Posts | App running on BlogDetail screen | Scroll to related posts section | Related post cards render | Maestro |
| TC-076 | BlogDetail — Search CTA | App running on BlogDetail screen | Tap search icon / "Search Blog" | Navigates to BlogList | Maestro |
| TC-077 | Contact — Form Fields | App running on Contact screen | Verify form renders: name, email, phone, message, submit | All fields visible with labels from CMS | Maestro |
| TC-078 | Contact — Form Validation | App running on Contact screen | Submit empty form | Validation errors shown | Maestro |
| TC-079 | Contact — Form Success | App running on Contact screen | Fill valid data and submit | Success message displayed | Maestro |
| TC-080 | Contact — Form Failure | App running on Contact screen, mock API failure | Submit valid data with backend returning 500 | Error affordance / retry shown | API-assisted |
| TC-081 | Privacy — Content Render | App running on Privacy screen | Verify policy title, effective date, sections visible | CMS privacy content fully displayed | Maestro |
| TC-082 | Terms — Content Render | App running on Terms screen | Verify terms title, effective date, sections visible | CMS terms content fully displayed | Maestro |

### F. Deep Links

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-083 | Deep Link — Pricing | App not running | Open URL `leadenhallworks://pricing` | App opens to Pricing screen | Maestro |
| TC-084 | Deep Link — Guest Booking | App not running | Open URL `leadenhallworks://meeting-rooms/book` | App opens to MeetingRoomBooking screen | Maestro |
| TC-085 | Deep Link — Guest Booking with Room | App not running | Open URL `leadenhallworks://meeting-rooms/book?room=boardroom` | App opens to booking with room param | Maestro |
| TC-086 | Deep Link — Reset Password | App not running | Open URL `leadenhallworks://reset-password?token=abc123` | App opens to ResetPassword screen with token | Maestro |
| TC-087 | Deep Link — Dashboard (Unauthenticated) | App not running, no session | Open URL `leadenhallworks://dashboard` | App opens; redirects to Login screen | Maestro |
| TC-088 | Deep Link — Dashboard (Authenticated) | Authenticated session stored | Open URL `leadenhallworks://dashboard` | App opens to member Dashboard | Maestro |
| TC-089 | Deep Link — Member BookRoom | Authenticated session stored | Open URL `leadenhallworks://book-room` | App opens to member BookRoom screen | Maestro |
| TC-090 | Deep Link — Member Bookings | Authenticated session stored | Open URL `leadenhallworks://bookings` | App opens to member Bookings list | Maestro |
| TC-091 | Deep Link — Member Membership | Authenticated session stored | Open URL `leadenhallworks://membership` | App opens to membership management screen | Maestro |
| TC-092 | Deep Link — Member Invoices | Authenticated session stored | Open URL `leadenhallworks://invoices` | App opens to invoices list | Maestro |

### G. Auth / Session

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-093 | Auth — Login Screen Entry | App running, tap "Account" | Tap Account header button | Login screen displayed with email, password fields, sign-in button | Maestro |
| TC-094 | Auth — Login Validation (Empty Fields) | Login screen displayed | Tap "Sign In" with empty fields | Validation error messages shown for email and password | Maestro |
| TC-095 | Auth — Login Validation (Invalid Email) | Login screen displayed | Enter invalid email format, valid password, tap Sign In | Email format validation error | Maestro |
| TC-096 | Auth — Valid Login | Login screen displayed | Enter valid credentials, tap Sign In | Navigates to member Dashboard | Maestro |
| TC-097 | Auth — Failed Login | Login screen displayed | Enter invalid credentials, tap Sign In | Error message: "Invalid email or password" displayed | Maestro |
| TC-098 | Auth — Forgot Password Navigation | Login screen displayed | Tap "Forgot Password?" link | Navigates to ForgotPassword screen | Maestro |
| TC-099 | Auth — Forgot Password Validation (Empty) | ForgotPassword screen | Tap "Send Reset Link" with empty email | Validation error shown for email field | Maestro |
| TC-100 | Auth — Forgot Password Validation (Invalid Email) | ForgotPassword screen | Enter invalid email format, tap Send Reset Link | Email format validation error | Maestro |
| TC-101 | Auth — Forgot Password Success | ForgotPassword screen | Enter valid registered email, tap Send Reset Link | Success message: "Reset link sent to your email" | Maestro |
| TC-102 | Auth — Register Navigation | Login screen displayed | Tap "Create Account" / "Register" link | Navigates to Register screen | Maestro |
| TC-103 | Auth — Register Validation (Short Password) | Register screen | Enter valid email, password < 8 chars, tap Sign Up | Password minimum length error (8 chars) | Maestro |
| TC-104 | Auth — Register Validation (Mismatch Confirm) | Register screen | Enter password, different confirm password, tap Sign Up | "Passwords do not match" error | Maestro |
| TC-105 | Auth — Reset Password Validation (Empty) | ResetPassword screen with valid token | Tap "Reset Password" with empty fields | Validation errors for password fields | Maestro |
| TC-106 | Auth — Reset Password Validation (Short) | ResetPassword screen with valid token | Enter new password < 8 chars, tap Reset | Minimum length validation error | Maestro |
| TC-107 | Auth — Reset Password Success | ResetPassword screen with valid token | Enter valid matching passwords, tap Reset | Success message; redirects to Login | Maestro |
| TC-108 | Auth — Logout | Authenticated, Dashboard visible | Tap Profile tab, tap "Log Out" | Confirmation prompt shown; confirm logs out; returns to Home | Maestro |
| TC-109 | Auth — Session Persistence | Authenticated, relaunch app | Kill app, relaunch via dev-client | App restores session; Dashboard renders without re-login | Maestro |
| TC-110 | Auth — Session Expiry / Restore Failure | Stale refresh token in SecureStore | Launch app with expired token | Session restore fails; app shows Login screen | API-assisted |
| TC-111 | Auth — SecureStore Behavior (Relaunch) | Authenticated session | Relaunch app, verify session restored | No tokens visible in UI; session restored from SecureStore silently | Maestro |
| TC-112 | Auth — Notification Permission Prompt | First launch or reset permissions | App requests notification permission on first auth flow | System prompt appears; dismissal continues without crash | Manual |

### H. Member — Dashboard

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-113 | Dashboard — Screen Render | Authenticated member | Navigate to Dashboard | "Home Dashboard" title, quick actions visible | Maestro |
| TC-114 | Dashboard — Quick Actions | Dashboard visible | Verify "Book a Room", "View Membership", "My Bookings" buttons | Quick action cards render | Maestro |
| TC-115 | Dashboard — Stats / Summary Cards | Dashboard visible | Verify membership status, upcoming booking count, invoice summary cards | Stats cards render with data from backend | Maestro |
| TC-116 | Dashboard — Upcoming Bookings | Dashboard visible, member has bookings | Scroll to upcoming bookings section | Upcoming booking cards shown | API-assisted |
| TC-117 | Dashboard — Membership Details Card | Dashboard visible, member has membership | View membership details card | Membership type, status, renewal date displayed | API-assisted |
| TC-118 | Dashboard — Invoices Summary | Dashboard visible, member has invoices | View invoices summary section | Invoice count or recent invoice shown | API-assisted |
| TC-119 | Dashboard — Profile / Account State | Dashboard visible | Tap "Profile" tab | Profile screen loads with member data | Maestro |
| TC-120 | Dashboard — Logout Button | Dashboard visible | Tap "Profile" tab, then "Log Out" | Confirmation dialog; confirm logs out | Maestro |
| TC-121 | Dashboard — Quick Action: Book a Room | Dashboard visible | Tap "Book a Room" | Navigates to BookRoom screen | Maestro |
| TC-122 | Dashboard — Quick Action: View Membership | Dashboard visible | Tap "View Membership" | Navigates to Membership screen | Maestro |
| TC-123 | Dashboard — Quick Action: My Bookings | Dashboard visible | Tap "My Bookings" | Navigates to Bookings list | Maestro |

### I. Member — Bookings

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-124 | Bookings — List (Non-Empty) | Authenticated member with bookings | Navigate to Bookings | Booking cards list rendered with date, room, status | API-assisted |
| TC-125 | Bookings — List (Empty) | Authenticated member with no bookings | Navigate to Bookings | "No bookings yet" empty state message shown | API-assisted |
| TC-126 | Bookings — Details Modal | Booking list with items | Tap a booking card | Booking details modal/expanded view opens | Maestro |
| TC-127 | Bookings — Details: Room, Date, Time, Status | Details modal open | Verify room name, date, time slot, status text | All fields displayed from backend | Maestro |
| TC-128 | Bookings — Edit Form Visibility | Details modal open, booking is editable | Tap "Edit" / "Modify" | Edit booking form opens with current values | Maestro |
| TC-129 | Bookings — Cancel / Refund Confirmation (Non-destructive) | Details modal open, booking is cancellable | Tap "Cancel Booking" | Confirmation dialog: "Are you sure?" with Cancel / Confirm buttons | Maestro |
| TC-130 | Bookings — Cancel Dismiss | Cancellation confirmation visible | Tap "Cancel" (dismiss) on confirmation dialog | Dialog dismissed; no cancellation occurs | Maestro |
| TC-131 | Bookings — Adjust Payment Entry Preconditions | Edit flow with price change | Reach payment adjustment step | Payment amount displayed; precondition met before Stripe | Manual |

### J. Member — Book Room

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-132 | BookRoom — Screen Render | Authenticated member | Navigate to BookRoom | "Choose room and time" header, room selector, date, time fields visible | Maestro |
| TC-133 | BookRoom — Room Selection | BookRoom screen | Select a room from dropdown/list | Room confirmed and displayed | Maestro |
| TC-134 | BookRoom — Date Selection | Room selected | Tap date field / calendar | Calendar picker opens; tap a date; date selected | Maestro |
| TC-135 | BookRoom — Hour / Time Selection | Date selected | Tap start time and end time | Time slot selected; duration shown | Maestro |
| TC-136 | BookRoom — Availability Indicator | Room and date selected | Verify available slots highlighted vs. booked slots greyed | Visual availability states shown | Maestro |
| TC-137 | BookRoom — Purpose Validation | Time selected | Leave purpose empty, tap "Get Estimate" | Validation error for purpose field | Maestro |
| TC-138 | BookRoom — Estimate Review | Room, date, time, purpose filled | Tap "Get Estimate" | Price estimate breakdown shown (rate, hours, VAT) | Maestro |
| TC-139 | BookRoom — Payment Entry Preconditions | Estimate reviewed, tap "Book Now" | Verify non-Stripe preconditions met before payment entry | Amount displayed; proceed to payment button visible | Manual |

### K. Member — Membership

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-140 | Membership — Current Plan (Active) | Authenticated member with active plan | Navigate to Membership | Current plan name, price, features, status displayed | API-assisted |
| TC-141 | Membership — No Membership State | Authenticated member without plan | Navigate to Membership | "No active membership" message; list of available plans shown | API-assisted |
| TC-142 | Membership — Available Plans | On Membership screen | Scroll through plan options | Plan cards with name, price, feature list rendered | Maestro |
| TC-143 | Membership — Plan Change Preview | Active membership exists | Tap "Change Plan" / select a different plan | Plan comparison / change preview screen with current vs new pricing | Maestro |
| TC-144 | Membership — Cancel Confirmation (Non-destructive) | Active membership exists | Tap "Cancel Membership" | Confirmation dialog: "Are you sure?" with Cancel / Confirm buttons | Maestro |
| TC-145 | Membership — Cancel Dismiss | Cancel confirmation visible | Tap "Cancel" (dismiss) on dialog | Dialog dismissed; membership unchanged | Maestro |
| TC-146 | Membership — FAQ | Membership screen | Scroll to FAQ section | FAQ items rendered; accordion expand/collapse works | Maestro |

### L. Member — Invoices

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-147 | Invoices — List (Non-Empty) | Authenticated member with invoices | Navigate to Invoices | Invoice list rendered with date, amount, status | API-assisted |
| TC-148 | Invoices — List (Empty) | Authenticated member with no invoices | Navigate to Invoices | "No invoices yet" empty state | API-assisted |
| TC-149 | Invoices — PDF Link / Hosted Link Safety | Invoice list with items | Tap an invoice row | Opens hosted invoice URL or PDF link (system browser, never in-app webview) | Maestro |
| TC-150 | Invoices — No-URL Message | Invoice without PDF/hosted URL | Tap invoice row | "Invoice link unavailable" message displayed | API-assisted |

### M. Member — Profile

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-151 | Profile — Fields / State | Authenticated member | Navigate to Profile | Name, email, phone, member since fields loaded from backend | Maestro |
| TC-152 | Profile — Edit Fields | Profile screen | Tap "Edit" / modify name field | Field becomes editable | Maestro |
| TC-153 | Profile — Save Confirmation | Edited a field | Tap "Save" | Changes saved; success confirmation message shown | Maestro |
| TC-154 | Profile — Member Access State | Profile screen | View "Member Access" / status card | Access status card shows current state | Maestro |
| TC-155 | Profile — Logout | Profile screen | Tap "Log Out" | Confirmation dialog; confirm; logs out to Home | Maestro |

### N. Member — Settings

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-156 | Settings — Password Change Validation (Empty) | Authenticated, Settings screen | Tap "Change Password", leave fields empty, submit | Validation errors for all password fields | Maestro |
| TC-157 | Settings — Password Change Validation (Short) | Settings screen | Enter new password < 8 chars | Minimum 8 characters validation error | Maestro |
| TC-158 | Settings — Password Change Validation (Mismatch) | Settings screen | Enter new and confirm passwords that differ | "Passwords do not match" error | Maestro |
| TC-159 | Settings — Notification Preferences Link | Settings screen | Tap "Notifications" | Navigates to NotificationPreferences screen | Maestro |
| TC-160 | NotificationPreferences — Toggle Rendering | Authenticated member | Navigate to NotificationPreferences | Toggle switches for email/push notification types visible | Maestro |
| TC-161 | NotificationPreferences — Toggle Change | NotificationPreferences screen | Toggle a notification setting on/off | Setting changes; confirmation or visual feedback | API-assisted |
| TC-162 | Settings — Account Deletion Link | Settings screen | Tap "Delete Account" | Navigates to AccountDeletion screen | Maestro |
| TC-163 | AccountDeletion — Request | AccountDeletion screen | Tap "Request Account Deletion" | Confirmation dialog: "Are you sure?" with Cancel / Confirm | Maestro |
| TC-164 | AccountDeletion — Cancel | AccountDeletion confirmation dialog | Tap "Cancel" (dismiss) | Dialog dismissed; no deletion occurs | Maestro |
| TC-165 | AccountDeletion — Confirm (Non-destructive Affordance) | AccountDeletion confirmation dialog | Tap "Confirm" | Deletion request submitted; success message; logout | API-assisted |

### O. Reliability / Security / Platform

| ID | Area | Preconditions | Steps Summary | Expected Result | Automation Type |
|----|------|---------------|---------------|-----------------|----------------|
| TC-166 | Reliability — No RedBox on Launch | Clean simulator | Launch app via dev-client | No RedBox / crash screen appears after any navigation | Maestro |
| TC-167 | Reliability — API Fallback State | App running, disconnect network | Navigate between public screens | Graceful error / offline message displayed; no crash | Maestro |
| TC-168 | Reliability — Backend-Down Error | App running, backend unreachable | Attempt any screen that fetches data | Error state / "Unable to load" message; retry button visible | API-assisted |
| TC-169 | Security — No Secrets Visible in UI | App running on any screen | Inspect all visible text labels and fields | No API keys, tokens, or secrets displayed | Maestro |
| TC-170 | Security — No Direct Verkada Calls | App running, network monitored | Navigate through app; observe network calls | No direct calls to Verkada API from mobile client | Manual |
| TC-171 | Security — No Payment Secret Visible | Guest booking or member book-room payment step | Inspect UI and network for Stripe secret | No Stripe secret key or paymentIntent client_secret in visible UI | Manual |
| TC-172 | Accessibility — Key Controls Labeled | App running on Home, Login, Dashboard | Inspect accessibility labels on primary buttons | "Account", "Sign in", "Book a room" etc. have accessibilityRole / label | Maestro |
| TC-173 | Platform — iOS Simulator App Icon | iOS simulator home screen | Check simulator home screen | App icon renders correctly with proper name "The Leadenhall Works" | Manual |
| TC-174 | Platform — Splash Screen | Clean launch | Observe splash on cold start | Splash image displays with correct branding before Home renders | Manual |
| TC-175 | Security — SecureStore No Token Leak | Authenticated session | Inspect app state / logs for tokens | No auth tokens / refresh tokens appear in logs or console output | Manual |
| TC-176 | Reliability — Notification Prompt Dismissal | First auth success | Dismiss system notification permission prompt | App continues without crash; Dashboard renders | Manual |
| TC-177 | Reliability — Guest Booking Backend Timeout | Mock slow API for booking calendar | Attempt to load available time slots | Loading spinner shown; timeout error after threshold | API-assisted |
| TC-178 | Security — Logout Clears SecureStore | After logout, relanch | Kill app, relaunch | App shows Login screen; no automatic session restore | Maestro |
| TC-179 | Accessibility — Screen Reader Support | VoiceOver / TalkBack enabled | Navigate Home screen, verify elements readable | Key content elements have accessible labels | Manual |
| TC-180 | Platform — Orientation Lock | App running | Rotate device | App stays in portrait orientation; no layout breakage | Manual |
| TC-181 | Reliability — Rapid Navigation | App running | Rapidly tap between multiple public screens | No crashes; each screen loads correctly | Manual |
| TC-182 | Security — No Stripe PII in Logs | Guest booking payment entry | Check device logs during payment flow | No credit card numbers, CVC, or PII in logs | Manual |
| TC-183 | Reliability — Home Pull-to-Refresh | Home screen loaded | Pull down to refresh | Home content refreshes; loading indicator appears | Maestro |
| TC-184 | Platform — Android Intent Filter | Android device/emulator | Open `leadenhallworks://pricing` from browser | App opens to Pricing screen | Manual |
| TC-185 | Security — Session Token Rotation | Authenticated session, perform refresh | Verify old token invalidated after refresh cycle | Refresh token rotates; old token cannot be reused | API-assisted |

---

## Implementation Mapping — Maestro YAML Files

The following Maestro YAML files should be implemented in this pass, targeting stable non-destructive coverage first. Each file maps to a subset of test cases above.

### Phase 1 — Public CMS Foundation (TC-001 through TC-082 stable subset)

| YAML File | Test Cases Covered | Notes |
|-----------|-------------------|-------|
| `e2e/maestro/public/01-home-hero.yaml` | TC-001, TC-003, TC-004, TC-005, TC-015, TC-016 | Home hero content, CTAs, header |
| `e2e/maestro/public/02-home-menu.yaml` | TC-006, TC-007, TC-008, TC-009, TC-010, TC-011, TC-012, TC-013, TC-014 | Public menu links and navigation |
| `e2e/maestro/public/03-home-services-about.yaml` | TC-017, TC-018, TC-019, TC-020 | Services cards and about highlight |
| `e2e/maestro/public/04-home-testimonials-gallery.yaml` | TC-021, TC-022, TC-023, TC-024 | Testimonials and gallery |
| `e2e/maestro/public/05-home-contact-form.yaml` | TC-025, TC-026, TC-027, TC-028 | Contact form validation and success |
| `e2e/maestro/public/06-home-footer.yaml` | TC-030, TC-031, TC-032, TC-033 | Footer links |
| `e2e/maestro/public/07-pricing.yaml` | TC-034, TC-035, TC-036, TC-037, TC-038 | Pricing plans, comparison, FAQ |
| `e2e/maestro/public/08-meeting-rooms.yaml` | TC-041, TC-042, TC-043, TC-044 | Meeting rooms listing and book CTA |
| `e2e/maestro/public/09-guest-booking-flow.yaml` | TC-046, TC-047, TC-048, TC-049, TC-050, TC-051, TC-052, TC-053, TC-054, TC-056 | Guest booking flow (pre-payment) |
| `e2e/maestro/public/10-virtual-office.yaml` | TC-057, TC-058, TC-059 | Virtual office screen |
| `e2e/maestro/public/11-about.yaml` | TC-060, TC-061, TC-062 | About screen |
| `e2e/maestro/public/12-faq.yaml` | TC-063, TC-064, TC-065, TC-066 | FAQ accordion and search |
| `e2e/maestro/public/13-blog-list.yaml` | TC-067, TC-068, TC-069, TC-070, TC-071 | Blog list, categories, filter |
| `e2e/maestro/public/14-blog-detail.yaml` | TC-072, TC-073, TC-074, TC-075, TC-076 | Blog detail content and features |
| `e2e/maestro/public/15-contact.yaml` | TC-077, TC-078, TC-079 | Contact form |
| `e2e/maestro/public/16-privacy-terms.yaml` | TC-081, TC-082 | Privacy and Terms screens |

### Phase 2 — Deep Links (TC-083 through TC-092)

| YAML File | Test Cases Covered | Notes |
|-----------|-------------------|-------|
| `e2e/maestro/deeplinks/01-public-links.yaml` | TC-083, TC-084, TC-085 | Public deep links: pricing, guest booking |
| `e2e/maestro/deeplinks/02-auth-links.yaml` | TC-086 | Reset password deep link |
| `e2e/maestro/deeplinks/03-member-links.yaml` | TC-087, TC-088, TC-089, TC-090, TC-091, TC-092 | Member deep links (requires prior auth flow) |

### Phase 3 — Auth Flows (TC-093 through TC-112)

| YAML File | Test Cases Covered | Notes |
|-----------|-------------------|-------|
| `e2e/maestro/auth/01-login-screen.yaml` | TC-093, TC-094, TC-095 | Login screen appearance and validation |
| `e2e/maestro/auth/02-login-valid.yaml` | TC-096 | Valid login (uses env vars for credentials) |
| `e2e/maestro/auth/03-login-invalid.yaml` | TC-097 | Failed login |
| `e2e/maestro/auth/04-forgot-password.yaml` | TC-098, TC-099, TC-100, TC-101 | Forgot password flow |
| `e2e/maestro/auth/05-register.yaml` | TC-102, TC-103, TC-104 | Registration navigation and validation |
| `e2e/maestro/auth/06-reset-password.yaml` | TC-105, TC-106, TC-107 | Reset password flow |
| `e2e/maestro/auth/07-logout.yaml` | TC-108 | Logout flow |
| `e2e/maestro/auth/08-session-persistence.yaml` | TC-109, TC-111 | Session restore after relaunch |

### Phase 4 — Member Surfaces (TC-113 through TC-165)

| YAML File | Test Cases Covered | Notes |
|-----------|-------------------|-------|
| `e2e/maestro/member/01-dashboard.yaml` | TC-113, TC-114, TC-115, TC-121, TC-122, TC-123 | Dashboard render and quick actions |
| `e2e/maestro/member/02-dashboard-cards.yaml` | TC-116, TC-117, TC-118 | Dashboard data cards (API-dependent) |
| `e2e/maestro/member/03-bookings-list.yaml` | TC-124, TC-125, TC-126, TC-127 | Bookings list and details modal |
| `e2e/maestro/member/04-bookings-cancel.yaml` | TC-129, TC-130 | Booking cancel affordance (non-destructive) |
| `e2e/maestro/member/05-book-room.yaml` | TC-132, TC-133, TC-134, TC-135, TC-136, TC-137, TC-138 | Book room flow (pre-payment) |
| `e2e/maestro/member/06-membership.yaml` | TC-140, TC-141, TC-142, TC-143, TC-144, TC-145, TC-146 | Membership screens and affordances |
| `e2e/maestro/member/07-invoices.yaml` | TC-147, TC-148, TC-149, TC-150 | Invoices list and link safety |
| `e2e/maestro/member/08-profile.yaml` | TC-151, TC-152, TC-153, TC-154, TC-155 | Profile view, edit, save, logout |
| `e2e/maestro/member/09-settings.yaml` | TC-156, TC-157, TC-158, TC-159 | Settings password validation |
| `e2e/maestro/member/10-notifications.yaml` | TC-160, TC-161 | Notification preferences |
| `e2e/maestro/member/11-account-deletion.yaml` | TC-162, TC-163, TC-164 | Account deletion affordance (non-destructive) |

### Phase 5 — Reliability / Security (TC-166 through TC-185)

| YAML File | Test Cases Covered | Notes |
|-----------|-------------------|-------|
| `e2e/maestro/reliability/01-no-redbox.yaml` | TC-166 | Launch and navigate; assert no RedBox |
| `e2e/maestro/reliability/02-offline-error.yaml` | TC-167 | Offline/network error handling |
| `e2e/maestro/reliability/03-no-secrets-visible.yaml` | TC-169 | Screen text inspection for secret patterns |
| `e2e/maestro/reliability/04-accessibility-labels.yaml` | TC-172 | Verify key controls have accessibility labels |
| `e2e/maestro/reliability/05-refresh.yaml` | TC-183 | Pull-to-refresh on Home |

### Files Unchanged (Reuse Existing)

| Existing File | Test Cases |
|---------------|------------|
| `e2e/maestro/login-smoke.yaml` | Replaced by Phase 3 more granular files; kept for backward compat |
| `e2e/maestro/dashboard-smoke.yaml` | TC-113, TC-114 subset |
| `e2e/maestro/booking-smoke.yaml` | TC-132 subset |
| `e2e/maestro/comprehensive-public-smoke.yaml` | TC-001, TC-083, TC-084 superset |
| `e2e/maestro/comprehensive-auth-validation-smoke.yaml` | TC-093, TC-098, TC-102 superset |
| `e2e/maestro/comprehensive-member-surfaces-smoke.yaml` | TC-113, TC-124, TC-132, TC-140, TC-147, TC-151 superset |
| `e2e/maestro/comprehensive-member-booking-smoke.yaml` | TC-132, TC-133, TC-134 subset |

---

## Implementation Principles

1. **No secrets in YAML files.** Use Maestro environment variables (`${E2E_EMAIL}`, `${E2E_PASSWORD}`, etc.) for credentials.
2. **No destructive actions without confirmation affordance checks.** Cancel, delete, and refund tests only verify the confirmation dialog appears, not the destructive action itself.
3. **Payment / Stripe tests are marked `Manual`** and skipped in automated CI runs.
4. **Verkada / AccessStatus tests are `Manual`** and deferred until external gate clears.
5. **Push notification permission tests are `Manual`** since they require system UI interaction.
6. **API-assisted tests** require a setup script (e.g. `e2e/scripts/setup-test-data.sh`) to create fixtures before the Maestro flow runs.
7. **All Maestro files use `com.leadenhallworks.mobile`** as `appId`.
8. **Dev-client URL** pattern: `leadenhallworks://expo-development-client/?url=http%3A%2F%2F127.0.0.1%3A8081`

---

## Notes

- **Total test cases:** 185 (exceeds 100 minimum requirement)
- **Maestro-automated:** ~135 cases
- **API-assisted:** ~15 cases
- **Manual / external-blocker:** ~35 cases (payment, push permissions, Verkada, platform manual checks)
- **Destructive actions** (booking cancellation, account deletion, membership cancellation) are only tested for **confirmation affordance** — the dialog appearance — not the actual destructive execution.
- Payment precondition steps verify the **UI state before Stripe** (price display, amount breakdown) but do not submit payment.
- This plan covers **all routes and screens** identified in the navigation config: 12 public screens, 4 auth screens, 10 member screens = 26 screens total.
- Deep link coverage includes 10 link patterns across public, auth, and member routes.
