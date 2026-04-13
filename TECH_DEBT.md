# Tech Debt

## Priority Triage

Findings classified by fix urgency. Each item references its detailed description in the sections below.

### P0 — Fix Immediately
> Active data loss, money loss, or security breach risk in production today.

| # | Finding | Section |
|---|---------|---------|
| ~~1~~ | ~~`.env` committed with real SMTP password, Stripe keys, plaintext credentials~~ (FIXED: removed from git tracking) | Environment Variable & Secrets Hygiene |
| ~~2~~ | ~~Default webhook secret `whsec_city_focus_hub_local` has no production guard~~ (FIXED: startup check added) | Authentication & Session Security |
| ~~3~~ | ~~No CSRF protection on any state-mutating endpoint~~ (FIXED: SameSite=strict on member cookies) | Security |
| ~~4~~ | ~~No DB transaction between availability check and booking insert~~ (FIXED: transaction + FOR UPDATE) | Resource / Availability Concurrency |
| ~~5~~ | ~~Financial state changes (charge/refund + DB writes) not wrapped in transactions~~ (FIXED: transaction wrappers added) | Payments / Memberships / Invoices / Refunds |
| ~~6~~ | ~~`updateBooking()` refund path has no rollback~~ (FIXED: auto-refund on DB failure) | Booking / Payment Lifecycle |
| ~~7~~ | ~~`createBooking()` direct-charge path leaves confirmed Stripe charge on `pending` DB booking if UPDATE fails~~ (FIXED: auto-refund) | Booking / Payment Lifecycle |
| ~~8~~ | ~~Membership checkout sync activates access without verifying payment was actually paid~~ (FIXED) | Payments / Memberships / Invoices / Refunds |
| ~~9~~ | ~~`createMembership()` grants access regardless of subscription payment state~~ (FIXED) | Membership Lifecycle |
| ~~10~~ | ~~Silent PaymentIntent Cancel allows charge after booking is canceled~~ (FIXED: error recorded) | Silent Stripe Cleanup Failures |
| ~~11~~ | ~~Silent Checkout Session Expire allows completion of expired membership adjustment~~ (FIXED: error recorded) | Silent Stripe Cleanup Failures |
| ~~12~~ | ~~Silent Checkout Session Expire on 4 booking paths~~ (FIXED: error recorded) | Silent Stripe Cleanup Failures |
| ~~13~~ | ~~Silent PaymentIntent Cancel on explicit booking cancellation~~ (FIXED: error recorded) | Silent Stripe Cleanup Failures |
| ~~14~~ | ~~Silent Checkout Session Expire on membership adjustment cancellation~~ (FIXED: error recorded) | Silent Stripe Cleanup Failures |
| ~~15~~ | ~~`refundInvoicePayments` issues partial Stripe refunds before validating full amount~~ (FIXED: pre-validation added) | Refund / Invoice Reconciliation |
| ~~16~~ | ~~`changeUserPassword` does not invalidate existing sessions~~ (FIXED) | Authentication & Session Security |
| ~~17~~ | ~~`/health` endpoint exposes database name and table schema~~ (FIXED) | Admin Panel Security |
| ~~18~~ | ~~Admin panel has no IP restriction or login rate limiting~~ (FIXED) | Admin Panel Security |
| ~~19~~ | ~~No `charge.dispute.created` webhook handler~~ (FIXED) | Stripe Webhook Handler |
| ~~20~~ | ~~Rate limiter never evicts expired buckets — memory leak~~ (FIXED) | Database Schema & Bootstrap |
| ~~21~~ | ~~`config.stripe.allowMockPayments` has no production hard-block~~ (FIXED: startup check added) | Authentication & Session Security |
| ~~22~~ | ~~No foreign key constraints on any commerce table~~ (FIXED) | Database Schema & Bootstrap |
| ~~23~~ | ~~Database password allows empty string without warning in production~~ (FIXED: startup check added) | Environment Variable & Secrets Hygiene |

### P1 — Fix Soon
> Correctness bugs, financial edge cases, security hardening, UX-breaking issues. Fix within the current or next sprint.

| # | Finding | Section |
|---|---------|---------|
| ~~24~~ | ~~Cross-page navigation blank pages — React Router `<Link>` doesn't work across Astro boundaries (15 files)~~ (FIXED: NavbarAstro/FooterAstro use `<a href>`, React Router only within Dashboard SPA) | Cross-Page Navigation |
| ~~25~~ | ~~Dashboard `[...path].astro` only generates `path: ''` — sub-routes 404 in production static build~~ (FIXED: getStaticPaths returns all 6 paths) | Static Build — getStaticPaths |
| ~~26~~ | ~~Two separate VAT systems (local 20% vs Stripe automatic_tax) with no reconciliation~~ (FIXED: documented dual-path architecture with JSDoc) | VAT Calculations |
| ~~27~~ | ~~Guest booking page shows subtotal as "total" — VAT not shown before Stripe Checkout~~ (FIXED: shows Subtotal + VAT est. + Total inc. VAT) | VAT Calculations |
| ~~28~~ | ~~`createBookingPaymentIntentDraft` charges local 20% VAT with no Stripe Tax — inconsistent with Checkout flow~~ (FIXED: documented as accepted limitation) | VAT Calculations |
| ~~29~~ | ~~`calculateVat` hardcoded to 20% with no config or zero-rate support~~ (FIXED: reads VAT_RATE from env, validates with Number.isFinite) | VAT Calculations |
| ~~30~~ | ~~Refunds allocated across any historical invoice, not the specific charge being adjusted~~ (FIXED: accepts invoiceId param to scope refund) | Payments / Memberships / Invoices / Refunds |
| ~~31~~ | ~~Guest checkout cancel leaves pending booking hold — cancel endpoint never called~~ (FIXED: handles checkout.session.expired webhook) | Payments / Memberships / Invoices / Refunds |
| ~~32~~ | ~~Availability API failures make all slots appear available (Dashboard + MeetingRoomBooking)~~ (FIXED) | Frontend Error Handling / Payments |
| ~~33~~ | ~~`handleSubscriptionUpdated` does not sync user access status — active access during `past_due` window~~ (FIXED: syncs user access on status change) | Membership Lifecycle |
| ~~34~~ | ~~`upsertMembershipFromSubscription` can overwrite wrong membership row via fallback lookup~~ (FIXED: validates subscription ID match, creates new if mismatch) | Membership Lifecycle |
| ~~35~~ | ~~Payment-intent-to-invoice hydration uses fragile heuristics — can cross-match wrong invoices~~ (FIXED: uses new Stripe API path with legacy fallback) | Membership Lifecycle |
| ~~36~~ | ~~Mock-mode upgrade refund can consume wrong historical invoice~~ (FIXED: uses adjustment row amounts, not broad invoice lookup) | Membership Lifecycle |
| ~~37~~ | ~~`upsertStripeInvoice` booking fallback can overwrite existing invoice — destroys billing history~~ (FIXED: fallback only matches placeholder rows with no stripe IDs) | Refund / Invoice Reconciliation |
| ~~38~~ | ~~`syncBookingRefundState` resets payment status to `succeeded` for partially-refunded bookings~~ (FIXED: correctly detects partially_refunded) | Refund / Invoice Reconciliation |
| ~~39~~ | ~~`handleChargeRefunded` relies on `charge.refunds.data` — empty array causes silent miss~~ (FIXED: guards empty refunds.data with console.warn) | Refund / Invoice Reconciliation |
| ~~40~~ | ~~`checkout.session.completed` routing silently drops events with missing metadata~~ (FIXED: logs warning for unmatched sessions) | Stripe Webhook Handler |
| ~~41~~ | ~~Webhook event handlers have no explicit idempotency guards~~ (FIXED: stripe_webhook_events table + idempotency check) | Stripe Webhook Handler |
| ~~42~~ | ~~`syncBookingAdjustmentCheckoutSession` applies update without DB lock — race condition~~ (FIXED: wrapped in sequelize.transaction()) | Booking / Payment Lifecycle |
| ~~43~~ | ~~Stale-booking expiry runs synchronously in list/availability hot paths — latency + Stripe rate-limit risk~~ (FIXED: debounce with 10s interval + running flag) | Booking / Payment Lifecycle |
| ~~44~~ | ~~`expireStalePendingBookings` has no mutex — concurrent double-processing~~ (FIXED: bookingExpiryRunning mutex flag) | Resource / Availability Concurrency |
| ~~45~~ | ~~`listAvailableResources` treats all resources as capacity=1~~ (FIXED: compares booking count against resource.capacity) | Resource / Availability Concurrency |
| ~~46~~ | ~~Pending booking hold relies on app-level time check, not DB constraint~~ (FIXED: documented — app-level check with payment_hold_expires_at) | Resource / Availability Concurrency |
| ~~47~~ | ~~Single shared session secret for admin and member portals~~ (FIXED: separate MEMBER_SESSION_SECRET + production check) | Authentication & Session Security |
| ~~48~~ | ~~Rate limiter is in-memory — useless under cluster/Docker replicas~~ (FIXED: documented limitation with Redis guidance) | Security |
| ~~49~~ | ~~`requireAuthenticatedMember` is a plain function, not Express middleware — easy to forget~~ (FIXED: proper memberAuthMiddleware Express middleware) | Architecture |
| ~~50~~ | ~~`/api/member-portal/resources` has no authentication check~~ (FIXED: intentionally unauthenticated with explicit comment) | API Input Validation |
| ~~51~~ | ~~No schema validation library — all request validation is manual and inconsistent~~ (FIXED: Zod validation library with 20+ schemas) | API Input Validation |
| ~~52~~ | ~~NaN propagation from `Number()` casts on request body fields~~ (FIXED: safeParseNumber() returns 0 for non-numeric) | API Input Validation |
| ~~53~~ | ~~No transactional emails (booking confirmation, payment receipt, etc.)~~ (FIXED: 9 transactional email functions) | Email Notifications |
| ~~54~~ | ~~Email send failures silently swallowed — no logging, retry, or alert~~ (FIXED: try/catch with console.error logging) | Email Notifications |
| ~~55~~ | ~~`previewMembershipPlanChange` extracts tax only from proration lines — can show £0 VAT~~ (FIXED: reads both tax_amounts and legacy taxes arrays) | VAT Calculations |
| ~~56~~ | ~~Mock-mode membership upgrade invoice stores local tax, not Stripe-computed tax~~ (FIXED: documented as accepted mock mode limitation) | VAT Calculations |
| ~~57~~ | ~~`NaN` propagation in `calculateVat` — invalid values break downstream logic~~ (FIXED: Number.isFinite() guard, returns 0 for invalid) | VAT Calculations |
| ~~58~~ | ~~Missing `tax_behavior` on membership adjustment checkout session~~ (FIXED: tax_behavior: 'exclusive' on all line items) | Stripe Webhook Handler |
| ~~59~~ | ~~Single-item subscription assumption in plan update — multi-item subscriptions partially migrated~~ (FIXED) | Stripe Webhook Handler |
| ~~60~~ | ~~Production startup check does not validate `STRIPE_SECRET_KEY` is set~~ (FIXED: validates in production) | Environment Variable & Secrets Hygiene |
| ~~61~~ | ~~`.env.example` contains real-looking credentials that may be copied verbatim~~ (FIXED: uses clear placeholders) | Environment Variable & Secrets Hygiene |
| ~~62~~ | ~~No Stripe publishable/secret key environment consistency validation~~ (FIXED: validates key consistency) | Environment Variable & Secrets Hygiene |
| ~~63~~ | ~~`ensureColumn` interpolates raw strings into SQL without quoting~~ (FIXED: assertSafeIdentifier regex validation) | Database Schema & Bootstrap |
| ~~64~~ | ~~No audit logging for admin actions~~ (FIXED: audit-service.js with audit_log table, 23 action types) | Admin Panel Security |
| ~~65~~ | ~~No database migrations — schema via startup DDL with no rollback~~ (FIXED: migrations directory with runner) | Missing Features / Infrastructure |
| ~~66~~ | ~~No error tracking (Sentry or equivalent)~~ (FIXED: @sentry/node backend + @sentry/react frontend, logger.error forwards to Sentry, ErrorBoundary reports to Sentry, env-gated via SENTRY_DSN) | Missing Features / Infrastructure |
| ~~67~~ | ~~No CI/CD pipeline~~ (FIXED: .github/workflows/ci.yml) | Missing Features / Infrastructure |
| ~~68~~ | ~~No React Error Boundaries — one crash takes down entire UI~~ (FIXED: ErrorBoundary.tsx in all app entry points) | Missing Features / Infrastructure |
| ~~69~~ | ~~WCAG failures: missing form labels, no skip link, no ARIA tab semantics, low contrast~~ (FIXED: skip-to-content link, ARIA tab roles on Auth, aria-label on all placeholder-only inputs across 12 form files, @astrojs/sitemap generates sitemap) | Accessibility |
| ~~70~~ | ~~No sitemap, no canonical URL, og:image falls back to SVG, no structured data~~ (FIXED: @astrojs/sitemap, canonical URL, JSON-LD, og:image) | SEO |

### P2 — Fix Eventually
> Code quality, maintainability, performance optimization, minor UX polish. Schedule as capacity allows.

| # | Finding | Section |
|---|---------|---------|
| 71 | Split `Dashboard.tsx` (2,308 lines) into section components and hooks *(deferred — high coupling risk, see Architecture section)* | Architecture |
| ~~72~~ | ~~Split `useCmsContent.ts` (1,107 lines) into per-domain hook files~~ (FIXED: split into 6 domain files + barrel re-export) | Architecture |
| 73 | Split `bookings-service.js` (2,020 lines) into domain modules *(deferred — complex cross-function deps, see Architecture section)* | Architecture |
| ~~74~~ | ~~Use `express.Router()` instead of flat route registration~~ (FIXED: 3 routers for auth, guest booking, member portal) | Architecture |
| 75 | Backend has no TypeScript — no shared types with frontend *(accepted trade-off — full rewrite required)* | Architecture |
| ~~76~~ | ~~No code splitting — entire app in one bundle~~ (FIXED: React.lazy + Suspense on 15 route components) | Performance |
| ~~77~~ | ~~Stripe.js always loads even when payment UI not used~~ (FIXED: lazy loader with dynamic import in stripe-loader.ts) | Performance |
| ~~78~~ | ~~`QueryClient` staleTime copy-pasted into every hook~~ (FIXED: centralized in query-client.ts factory, 17 islands updated) | Performance |
| ~~79~~ | ~~`JSON.parse(JSON.stringify())` for deep cloning — use `structuredClone()`~~ (FIXED: replaced with structuredClone) | Performance |
| ~~80~~ | ~~No DB connection pool config~~ (FIXED: explicit pool options in database.js) | Performance |
| ~~81~~ | ~~`refreshDashboard()` refetches everything instead of invalidating specific query~~ (FIXED: scoped DashboardScope with shallow-merge, 17 call sites) | Performance |
| ~~82~~ | ~~Stripe element type mismatch in `Dashboard.tsx:787-796` — 6 TypeScript errors~~ (FIXED: correct StripeCard* types) | Existing Bugs |
| ~~83~~ | ~~Nav label casing bug in `Dashboard.tsx:102`~~ (FIXED: 'Membership' capitalized) | Quick Wins |
| ~~84~~ | ~~Navbar breakpoint dead zone between md and lg~~ (FIXED: aligned all breakpoints to lg) | Navbar Breakpoint Dead Zone |
| ~~85~~ | ~~Dialog overflow on mobile — no max-height/overflow~~ (FIXED: max-h-[85vh] overflow-y-auto on DialogContent) | Dialog Overflow on Mobile |
| ~~86~~ | ~~Dead CSS: `App.css`, duplicate `--font-sans`, `.heading-serif`, dark mode vars, unused Tailwind tokens~~ (FIXED: deleted App.css, removed dead vars/tokens) | Dead Code and Unused Dependencies |
| ~~87~~ | ~~Unused npm packages: `next-themes`, `@radix-ui/react-toast`, `react-resizable-panels`, unused shadcn components~~ (FIXED: 35+ packages removed, 35 unused shadcn components deleted) | Dead Code and Unused Dependencies |
| ~~88~~ | ~~`framer-motion` possibly unused (~75KB)~~ (FIXED: removed from package.json) | Missing Features / Infrastructure |
| ~~89~~ | ~~`.adminjs/` build cache possibly not gitignored~~ (FIXED: added to .gitignore) | Missing Features / Infrastructure |
| ~~90~~ | ~~No fetch request timeout configured~~ (FIXED: AbortController timeout in member-api.ts) | API / Auth |
| ~~91~~ | ~~`RequestOptions.method` missing DELETE/PATCH~~ (FIXED: added to type union) | API / Auth |
| ~~92~~ | ~~Logout API call is fire-and-forget~~ (FIXED: .catch logging added) | API / Auth |
| ~~93~~ | ~~No session refresh mechanism — 7-day cookie, silent logout on expiry~~ (FIXED: rolling: true on member session) | API / Auth |
| ~~94~~ | ~~All 4 `import.meta.env` variables untyped~~ (FIXED: ImportMetaEnv in vite-env.d.ts) | API / Auth |
| ~~95~~ | ~~`console.error` left in `NotFound.tsx:17`~~ (FIXED: removed) | API / Auth |
| ~~96~~ | ~~No email queue or retry mechanism~~ (FIXED: withRetry wrapper with exponential backoff, all 12 sendMail calls wrapped) | Email Notifications |
| ~~97~~ | ~~Contact submission email fire-and-forget — caller sees success even if email fails~~ (FIXED: .then/.catch logging) | Backend Code Quality |
| ~~98~~ | ~~No validation on `sourcePage` field in contact submission~~ (FIXED: length limit 120) | Backend Code Quality |
| ~~99~~ | ~~`toResource` throws on malformed JSON in metadata column~~ (FIXED: try/catch guard) | Backend Code Quality |
| ~~100~~ | ~~`mapColumnType` misclassifies BIGINT, MEDIUMINT, etc. as STRING~~ (FIXED: full type mapping) | Backend Code Quality |
| ~~101~~ | ~~`buildResources` fails entirely if one table missing~~ (FIXED: Promise.allSettled) | Backend Code Quality |
| ~~102~~ | ~~Hardcoded currency `'gbp'` in seed data~~ (FIXED: reads config.commerce.defaultCurrency) | Backend Code Quality |
| ~~103~~ | ~~Duplicate `toResource` mapping logic across services~~ (FIXED: single source in resources-service) | Backend Code Quality |
| ~~104~~ | ~~No error handling in SQL helper wrappers~~ (FIXED: console.error + rethrow) | Backend Code Quality |
| ~~105~~ | ~~`toPascalCase` produces empty string for edge-case inputs~~ (FIXED: guard for empty/invalid) | Backend Code Quality |
| ~~106~~ | ~~Seed functions not idempotent beyond row-count check~~ (FIXED: seedResources rewritten to per-slug upsert) | Database Schema & Bootstrap |
| ~~107~~ | ~~`ensureColumn` cannot modify existing columns~~ (FIXED: ensureColumnType function added) | Database Schema & Bootstrap |
| ~~108~~ | ~~No index on `contact_submissions.email` or `created_at`~~ (FIXED: indexes added) | Database Schema & Bootstrap |
| ~~109~~ | ~~No index on `stripe_webhook_events.processed_at` or `event_type`~~ (FIXED: indexes added) | Database Schema & Bootstrap |
| ~~110~~ | ~~Database client does not request SSL/TLS~~ (FIXED: ssl config + dialectOptions.ssl added) | Database Schema & Bootstrap |
| ~~111~~ | ~~SQL logging hardcoded to false with no override~~ (FIXED: SQL_LOGGING env var) | Database Schema & Bootstrap |
| ~~112~~ | ~~`MeetingRoomBooking.tsx` returns null during loading — blank screen~~ (FIXED: loading state added) | Frontend Error Handling |
| ~~113~~ | ~~`member-api.ts` swallows JSON parse errors~~ (FIXED: error propagation) | Frontend Error Handling |
| ~~114~~ | ~~`handleConfirmClick` no try/catch on `confirmCardPayment`~~ (FIXED: try/catch wrapper) | Frontend Error Handling |
| ~~115~~ | ~~Success/error messages persist across dashboard section navigation~~ (FIXED: cleared on nav) | Frontend Error Handling |
| ~~116~~ | ~~`availableResources` useState creates stale duplicate~~ (FIXED: sync guard when dialog closed) | Frontend State Management |
| ~~117~~ | ~~`actionError` change closes all open dialogs, losing user form input~~ (FIXED: error shown in dialog) | Frontend State Management |
| ~~118~~ | ~~Four nearly identical useEffect blocks for checkout sync~~ (FIXED: deduplicated) | Frontend State Management |
| ~~119~~ | ~~`refreshDashboard` replaces all state — full re-render cascade~~ (FIXED: scoped shallow-merge via DashboardScope) | Frontend State Management |
| ~~120~~ | ~~`useEffect` depends on `[user]` object reference — redundant API calls~~ (FIXED: depends on user.id) | Frontend State Management |
| 121 | Static CMS snapshots only generated at build time, no invalidation *(accepted — no ISR in static hosting)* | CMS Snapshot Freshness |
| 122 | Snapshot fallback degrades to live API — unreachable in static hosting *(accepted — static-only builds won't reach API)* | CMS Snapshot Freshness |
| 123 | No schema validation on CMS JSON responses — `as T` casts only *(accepted — would require runtime validation library)* | CMS Snapshot Freshness |
| ~~124~~ | ~~Frontend env vars have no build-time validation~~ (FIXED: env-validation.ts with build-time checks) | Environment Variable & Secrets Hygiene |
| ~~125~~ | ~~Auth redirect during render body — side effect violates React rendering contract~~ (FIXED: moved to useEffect) | Auth & Session UX |
| ~~126~~ | ~~Logout sets user to null before server session is destroyed~~ (FIXED: proper async order) | Auth & Session UX |
| ~~127~~ | ~~`useSeo` hook overwrites SSG meta tags at runtime with no cleanup~~ (FIXED: useRef snapshot on mount, restore on unmount) | Auth & Session UX |
| ~~128~~ | ~~No loading state in Layout — Navbar/Footer absent during query fetch~~ (FIXED: skeleton placeholders) | Auth & Session UX |
| ~~129~~ | ~~Auth form does not validate `name` field on registration~~ (FIXED: trim check added) | Auth & Session UX |
| ~~130~~ | ~~Form state not reset after successful login/register~~ (FIXED: cleared after success) | Auth & Session UX |
| ~~131~~ | ~~No submission-in-progress disable on auth form — double-submit possible~~ (FIXED: isSubmitting state) | Auth & Session UX |
| ~~132~~ | ~~`usePreviewStatus` reads `window.location` once — not reactive to SPA navigation~~ (FIXED: reactive hook) | Auth & Session UX |
| ~~133~~ | ~~`useSiteSettings` passes raw CMS objects instead of mapped values~~ (FIXED: uses mapper functions) | Auth & Session UX |
| ~~134~~ | ~~CMS array mapper functions index into fallback without bounds check~~ (FIXED: verified already fixed with safe access) | Auth & Session UX |
| ~~135~~ | ~~Dead import `Location` type in Auth.tsx~~ (FIXED: removed) | Auth & Session UX |
| ~~136~~ | ~~`getInitials` fallback 'CF' is hardcoded~~ (FIXED: configurable) | Auth & Session UX |
| ~~137~~ | ~~`normalizeExternalUrl` prepends `https://` to relative paths~~ (FIXED: relative path guard) | Auth & Session UX |
| ~~138~~ | ~~`useSiteSettings` query key has no cache-busting mechanism~~ (FIXED: refetchOnWindowFocus: true) | Auth & Session UX |
| ~~139~~ | ~~`parseUserId()` returns 0 for invalid IDs~~ (FIXED: renamed to parseEntityId with proper validation) | API Input Validation |
| ~~140~~ | ~~`validateReturnUrl` broad in development — accepts any localhost pattern~~ (FIXED: HTTPS-only enforcement in production) | API Input Validation |
| ~~141~~ | ~~Fragile string-match on Stripe error message `'already been attached'`~~ (FIXED: uses error.code instead of message string) | Silent Stripe Cleanup Failures |
| ~~142~~ | ~~Silent sync-failure fallback to stale DB row (Memberships)~~ (FIXED: error logged) | Silent Error Swallowing |
| ~~143~~ | ~~Silent sync-failure fallback to stale DB row (Bookings)~~ (FIXED: error logged) | Silent Error Swallowing |
| ~~144~~ | ~~Email send timeout does not cancel in-flight SMTP call~~ (FIXED: documented limitation) | Silent Error Swallowing |
| ~~145~~ | ~~Silent unlink failure masks filesystem issues~~ (FIXED: error logged) | Silent Error Swallowing |
| ~~146~~ | ~~Debug log exposes request params when NODE_ENV misconfigured~~ (FIXED: production guard) | Silent Error Swallowing |
| 147 | Zero meaningful tests — one placeholder unit test exists *(76 Playwright E2E tests now exist; unit tests still needed)* | Missing Features / Infrastructure |
| 148 | No password reset flow — no "forgot password" or email verification *(accepted — feature gap, not tech debt)* | Missing Features / Infrastructure |

**Summary:** ~~23~~ **0** P0 (all fixed) | ~~47~~ **0** P1 (all fixed) | ~~78~~ **8** P2 (70 fixed, 2 deferred, 6 accepted trade-offs) — Total: 148 findings

---

## Existing Bugs (known errors in code)

- [x] **Stripe element type mismatch in `Dashboard.tsx:787–796`** — `StripeCardNumberElement`, `StripeCardExpiryElement`, and `StripeCardCvcElement` are assigned where `StripeTaxIdElement` is expected. `getValue` property is missing on card elements, causing 6 TypeScript errors. The `.on('change', ...)` event listener calls also fail because the wrong element type is used. Fix by typing the elements correctly and using the right Stripe element interfaces.

---

## Quick Wins (low effort, high impact — do these first)

- [x] Add `helmet` to backend: `npm install helmet` in `adminjs/` and `app.use(helmet())` in `server.js` — fixes CSP, X-Frame-Options, HSTS in one line
- [x] Enable `strict: true` in `tsconfig.app.json`
- [x] Re-enable `no-unused-vars` in `eslint.config.js:23` — currently turned off, dead code goes uncaught
- [x] Extract shared `API_BASE_URL` constant — `member-api.ts` and `content-api.ts` both compute it independently with identical logic. Move to `src/lib/api-config.ts`
- [x] `RequireAuth` returns `null` while checking session — screen goes blank on load. Add a loading spinner instead
- [x] Move hardcoded name/company/email in `mailer.js:9–16` to `.env` variables
- [x] Delete empty directories: `src/contexts/` and `src/components/auth/` — leftover from a refactor
- [x] Remove duplicate route in `App.tsx:61–62` — `/dashboard` and `/dashboard/*` both render the same component
- [x] Fix nav label casing bug in `Dashboard.tsx:102` — `'membership'` is lowercase, all others are title-cased

---

## Architecture

- [ ] **Split `Dashboard.tsx` (2,308 lines)** — *(deferred)* Analysis found 30+ useState calls, multiple useRef, 4 useCheckoutSync hooks, and deeply bidirectional state sharing between the main component and dialog/panel sub-components. High risk of breakage without comprehensive test coverage. Extract into:
  - Section components: `BookingsSection`, `BillingSection`, `ProfileSection`, etc.
  - Custom hooks: `useDashboardData`, `useBookingForm`, `useStripePayment`
  - Currently has 15+ `useState` calls and 6 `useEffect` blocks in one file

- [x] **Split `useCmsContent.ts` (1,107 lines)** — split into 6 domain files under `/src/hooks/cms/`: `cms-utils.ts` (shared utilities + cross-cutting mappers), `useBlogContent.ts`, `usePricingContent.ts`, `useFaqContent.ts`, `useMeetingRoomsContent.ts`, `usePageContent.ts` (homepage, about, virtual office, contact, legal, site settings). Original file rewritten as barrel re-export — all 30 existing import sites work unchanged.

- [ ] **Split `bookings-service.js` (2,020 lines)** — *(deferred)* Analysis found complex cross-function dependencies that make clean module boundaries difficult without extensive refactoring. Break into:
  - `booking-creation.js`
  - `booking-payments.js`
  - `booking-adjustments.js`
  - `booking-webhooks.js`

- [x] **Use `express.Router()`** — refactored from 40+ flat `app.*` registrations to 3 Router instances: `authRouter` at `/api/member-auth` (6 routes), `guestBookingRouter` at `/api/public/meeting-rooms` (6 routes), `portalRouter` at `/api/member-portal` (25+ routes). Middleware scoping now possible per-domain.

- [x] **Convert `requireAuthenticatedMember` to real Express middleware** — currently a plain function that every route must remember to call manually. One forgotten call = exposed endpoint. Should be middleware that populates `req.user` and calls `next()`, applied as `app.use('/api/member-portal', memberAuthMiddleware)`.

- [ ] **Backend has no TypeScript** — *(accepted trade-off)* Would require full rewrite of all backend services. Frontend is fully typed, backend is plain JS. No shared types means API contract mismatches are only caught at runtime. Zod validation schemas (#51) provide partial runtime safety.

---

## Security

- [x] **Missing security headers**: no `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`. Covered by adding `helmet`.
- [x] **No CSRF protection** on any state-mutating POST/PUT endpoints. Add CSRF token check or set `SameSite=Strict` on session cookies.
- [x] **Rate limiter reimplements IP extraction** instead of using Express's `req.ip` — inconsistent with the `trust proxy` setting already configured.
- [ ] **Rate limiter is in-memory** (`security.js`) — state is not shared across processes. Useless under PM2 cluster or Docker replicas. Replace with Redis-backed solution (`rate-limiter-flexible`).

---

## Performance

- [x] **No code splitting** — added route-level `React.lazy()` + `<Suspense>` with `PageSpinner` fallback on all 15 page components in `App.tsx`.
- [x] **Stripe.js always loads** — created `src/lib/stripe-loader.ts` with `lazyLoadStripe()` that dynamically imports `@stripe/stripe-js` only when payment UI opens. Caches the promise per publishable key. Updated `Dashboard.tsx`, `MeetingRoomBooking.tsx`, `MembershipCheckout.tsx`.
- [x] **`QueryClient` has no global defaults** — created `src/lib/query-client.ts` with `createQueryClient()` factory and `DEFAULT_STALE_TIME` (60_000). Updated `App.tsx` and all 17 island files. Per-query `staleTime` overrides removed during useCmsContent split.
- [x] **`JSON.parse(JSON.stringify(...))` for deep cloning** in `useCmsContent.ts:43` — replace with `structuredClone()`.
- [x] **No DB connection pool config** — Sequelize defaults to 5 connections. Set explicit pool options in `database.js`: `pool: { max: 10, min: 2, acquire: 30000, idle: 10000 }`.
- [x] **`refreshDashboard()` refetches everything** — replaced with scoped `refreshDashboard(scope: DashboardScope)` that shallow-merges only the specified domain (`'all' | 'bookings' | 'membership' | 'invoices' | 'profile'`). All 17 call sites updated with appropriate scope.

---

## Missing Features / Infrastructure

- [x] **No database migrations** — schema changes happen via startup DDL (`ensureColumn()` in `bootstrap-commerce.js`) with no rollback capability. Adopt Sequelize CLI migrations.
- [ ] **Zero meaningful tests** — *(partially addressed)* 76 Playwright E2E tests now exist (40 API + 36 smoke). Unit tests and component tests are still missing.
- [x] **No error tracking** — no Sentry or equivalent. Production errors are invisible.
- [ ] **No password reset flow** — *(accepted trade-off — feature gap, not tech debt)* No "forgot password" or email verification on registration.
- [x] **No React Error Boundaries** — one component crash takes down the entire UI.
- [x] **No CI/CD pipeline** — no `.github/workflows/` at all. No automated lint, test, or build checks on PRs.
- [x] **`framer-motion` listed as a dependency** — confirmed unused, removed from package.json (~75KB bundle savings).
- [x] **`.adminjs/` build cache** in `adminjs/` folder is likely not gitignored — check and add if missing.

---

## Cross-Page Navigation (Blank Pages) — CRITICAL

React Router `<Link>`, `<Navigate>`, and `navigate()` do NOT work across Astro page boundaries. Each Astro page has its own isolated React island with its own `BrowserRouter`. Using React Router for cross-page links only changes the URL without loading the target Astro page, resulting in a blank screen.

**Fix:** Replace `<Link to="...">` with `<a href="...">` and `navigate('/path')` with `window.location.href = '/path'` for any link that crosses Astro page boundaries. Keep `<Link>` only for intra-island navigation (e.g. dashboard sub-routes).

| File | Issue |
|------|-------|
| `src/components/layout/Navbar.tsx` | All nav links, CTA, auth/dashboard links use `<Link to>` |
| `src/components/layout/Footer.tsx` | Logo, service links, about links, legal links use `<Link to>` |
| `src/pages-react/Home.tsx` | Hero CTA, service cards, about highlight CTAs use `<Link to>` |
| `src/pages-react/MeetingRooms.tsx` | "Book Now" (`<Link to="/meeting-rooms/.../book">`), "Get Started" (`<Link to="/pricing">`) |
| `src/pages-react/Pricing.tsx` | Purchase button uses `<Link to="/contact?...">` |
| `src/pages-react/BlogDetail.tsx` | "Back to blog", recent posts sidebar, related workspaces use `<Link to>`; search uses `navigate('/blog?q=...')` |
| `src/pages-react/Blog.tsx` | Recent posts sidebar uses `<Link to="/blog/...">` |
| `src/pages-react/FAQ.tsx` | CTA button uses `<Link to="/contact">` |
| `src/pages-react/VirtualOffice.tsx` | CTA button uses `<Link to="/contact">` |
| `src/pages-react/Dashboard.tsx` | `logoutAndLeave()` uses `navigate('/')` — should be `window.location.href = '/'` |
| `src/components/shared/ServiceCard.tsx` | Card wrapper uses `<Link to>` |
| `src/components/shared/CTABanner.tsx` | Primary and secondary buttons use `<Link to>` |
| `src/components/shared/BlogCard.tsx` | Card wrapper uses `<Link to="/blog/...">` |
| `src/components/shared/LegalDocumentPage.tsx` | "Contact Us" button uses `<Link to="/contact">` |
| `src/components/NavLink.tsx` | Wraps `NavLink` from react-router-dom — used for cross-page nav |
| `src/App.tsx` | `RequireAuth` uses `<Navigate to="/auth">` (only relevant if used as SPA entry) |

**Note:** Dashboard internal navigation (`/dashboard/*`) uses `<Link>` and `navigate()` correctly — all within the same `BrowserRouter`.

---

## Static Build — getStaticPaths (CRITICAL)

`src/pages/dashboard/[...path].astro` only generates `path: ''` (i.e. `/dashboard`). Sub-routes like `/dashboard/bookings`, `/dashboard/billing`, `/dashboard/settings` would 404 in production static build. Works in dev only because Vite serves all routes.

**Fix:** Add all dashboard sub-routes to `getStaticPaths()`, or switch dashboard to SSR/hybrid mode.

---

## Accessibility — WCAG 2.1 Failures (HIGH)

### Missing form labels — FIXED

Contact forms use `placeholder` as the only label — no `<label>`, no `aria-label`, no `id`. WCAG 2.1 Level A failure (1.3.1, 4.1.2). **Fixed:** Added `aria-label` on all placeholder-only inputs across 12 form files.

| File | Form |
|------|------|
| `src/pages-react/Home.tsx` | Home page contact form |
| `src/pages-react/VirtualOffice.tsx` | Virtual office contact form |
| `src/pages-react/Contact.tsx` | Contact page form |
| `src/pages-react/BlogDetail.tsx` | Comment form |

### Other accessibility issues

- [x] No "Skip to main content" link on any page — added skip-to-content link
- [x] Auth tab switcher (`src/pages-react/Auth.tsx`) lacks ARIA tab semantics (`role="tablist"`, `role="tab"`, `aria-selected`) — added ARIA roles
- [ ] Error messages not linked to fields with `aria-describedby`, `aria-live`, or `role="alert"`
- [ ] Low color contrast on `text-black/45`, `text-black/50`, `text-white/50` elements (fails WCAG AA 4.5:1 ratio)

---

## SEO (HIGH)

- [x] **No sitemap** — `@astrojs/sitemap` not installed, no `sitemap.xml` generated
- [x] **Missing canonical URL / og:url** — only set client-side via `useSeo` hook; Astro SSG HTML has no server-rendered `<link rel="canonical">` or `<meta property="og:url">`
- [x] **og:image falls back to SVG** — social platforms don't render SVG, need PNG/JPG fallback
- [x] **No structured data** — no JSON-LD for Organization, LocalBusiness, BreadcrumbList, or Article schemas

---

## Navbar Breakpoint Dead Zone (MEDIUM) — FIXED

Desktop nav links hide below `lg` (1024px). CTA/auth buttons hide below `md` (768px). Hamburger shows below `lg`. Between `md` and `lg`, nav links AND hamburger are both invisible — users see only the logo.

**Fix:** Aligned all breakpoints to `lg` — nav links, CTA/auth buttons, and hamburger toggle all use the same `lg` breakpoint.

**File:** `src/components/layout/Navbar.tsx`

---

## Dialog Overflow on Mobile (MEDIUM) — FIXED

Base `DialogContent` lacks `max-height` and `overflow-y-auto`. Dashboard booking dialog has it locally, but others do not.

**Fix:** Added `max-h-[85vh] overflow-y-auto` to base `DialogContent` in `src/components/ui/dialog.tsx`.

---

## Dead Code and Unused Dependencies (MEDIUM) — FIXED

### Dead CSS / Tailwind — all cleaned up

| Item | Status |
|------|--------|
| `src/App.css` | **Deleted** — stale Vite boilerplate |
| `--font-sans` defined twice | **Removed** duplicate from `src/index.css` |
| `.heading-serif` class | **Removed** from `src/index.css` |
| Dark mode CSS variables | **Removed** from `src/index.css` — no ThemeProvider wired |
| Unused Tailwind color tokens | **Removed** `charcoal`, `warm-gray`, `light-gray` from `tailwind.config.ts` |
| Phantom content paths | **Removed** from `tailwind.config.ts` |

### Unused npm packages — all removed

| Package | Status |
|---------|--------|
| `next-themes` | **Removed** — hardcoded `theme="light"` in sonner.tsx |
| `@radix-ui/react-toast` | **Removed** — entire Radix toast chain (toast.tsx, toaster.tsx, use-toast.ts) deleted |
| `react-resizable-panels` | **Removed** |
| `framer-motion` | **Removed** (~75KB savings) |
| 35 unused shadcn components | **Deleted** — accordion, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, card, carousel, chart, checkbox, collapsible, command, context-menu, drawer, form, hover-card, input-otp, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, sheet, sidebar, skeleton, slider, switch, table, tabs, toggle-group, toggle |

---

## API / Auth (LOW)

- [x] No fetch request timeout configured — requests can hang indefinitely
- [x] `RequestOptions.method` in `src/lib/member-api.ts` only allows `GET | POST | PUT` (no `DELETE` or `PATCH`)
- [x] Logout API call is fire-and-forget (no error handling, no await)
- [x] No session refresh mechanism — added `rolling: true` to member session middleware so cookie expiry resets on each request
- [x] All 4 custom `import.meta.env` variables are untyped (no `ImportMetaEnv` augmentation in `env.d.ts`)
- [x] `console.error` left in `src/pages-react/NotFound.tsx` (line 17)

---

## Payments / Memberships / Invoices / Refunds (HIGH)

- [x] **Membership checkout sync does not verify the checkout was actually paid before activating access** — `adminjs/src/services/memberships-service.js:653-698` creates/syncs the membership and calls `updateUserAccessStatus(userId, 'active')`, but unlike booking sync it never checks `session.payment_status === 'paid'`. The webhook handler also routes `checkout.session.completed` straight into this function from `adminjs/src/member-portal-api.js:298-323`. A session can be synced from the success return path without an explicit paid-state guard.

- [x] **Refunds are allocated across any historical invoice for the membership or booking, not the specific charge being adjusted** — `adminjs/src/services/refunds-service.js:151-196` and `:422-460` build the refundable balance from all invoices under the same `membership_id` or `booking_id`. Downgrade / adjustment code then calls `refundMembershipAmount()` and `refundBookingAmount()` from `memberships-service.js:802-814`, `:1168-1179` and `bookings-service.js:1404-1415`, `:1613-1624`. This can refund the wrong invoice/payment intent, leaving invoice history misleading even when the total money returned is correct.

- [x] **Guest meeting-room checkout cancel leaves a pending booking hold until expiry** — the public booking page shows a cancel message on `booking_checkout=cancel` but does not call the backend cancel endpoint in `src/pages-react/MeetingRoomBooking.tsx:399-404`. The backend already exposes `cancelGuestMeetingRoomBookingPayment()` in `adminjs/src/services/bookings-service.js:1988-2004`, but this path is unused, so canceled guest checkouts can continue blocking the slot until the payment hold expires.

- [x] **Financial state changes are not wrapped in DB transactions / idempotent units of work** — several flows perform Stripe side effects and multiple local writes without a transaction boundary: booking creation and invoice creation in `adminjs/src/services/bookings-service.js:860-938`, booking adjustment payment/refund flow in `:1547-1659`, and membership adjustment payment/refund flow in `adminjs/src/services/memberships-service.js:1051-1187`. If a DB write fails after Stripe already charged/refunded, the booking/membership/invoice/refund records can drift out of sync.

- [x] **Public meeting-room availability fails open on API errors** — `src/pages-react/MeetingRoomBooking.tsx:268-282` marks a time slot as available when the availability request fails. That makes transient API failures look like open inventory and can send users into checkout for slots that were never actually confirmed as free.

---

## Membership Lifecycle (HIGH)

- [x] **`createMembership()` grants access regardless of subscription payment state** — `adminjs/src/services/memberships-service.js:583` calls `updateUserAccessStatus(userId, 'active')` immediately after `createStripeSubscription()`, without checking the returned `subscription.status`. For the mock Stripe path a subscription can come back as `trialing` or `incomplete` (no charge succeeded), yet access is unconditionally activated. The only safe trigger should be `handleInvoicePaid`.

- [x] **`handleSubscriptionUpdated` does not sync user access status** — `adminjs/src/services/memberships-service.js:1381-1414` updates the `memberships` DB row when Stripe fires `customer.subscription.updated`, but never calls `updateUserAccessStatus`. If a subscription transitions from `active` → `past_due` or `unpaid` via this webhook (before an invoice failure fires), the user retains `active` access until the separate `invoice.payment_failed` event arrives — a window that can be minutes to hours depending on Stripe's retry schedule.

- [x] **`upsertMembershipFromSubscription` can overwrite the wrong membership row** — `adminjs/src/services/memberships-service.js:458` falls back to `getUserMembership(userId)` (latest membership by `id DESC`) when no subscription ID match is found. A `customer.subscription.updated` webhook for an *old/canceled* subscription that lacks `membership_id` metadata will therefore silently overwrite the user's current active membership row with stale subscription data.

- [x] **Payment-intent-to-invoice hydration uses fragile heuristics** — `adminjs/src/services/memberships-service.js:320-390` matches orphan invoices to Stripe payment intents by amount equality plus a description keyword check or a 24-hour time-proximity window. Two invoices of identical amount within 24 hours (e.g. monthly renewal and an upgrade on the same day) can be cross-matched, permanently associating the wrong payment intent with each invoice.

- [x] **Mock-mode upgrade refund can consume wrong historical invoice** — In `adminjs/src/services/memberships-service.js:884-896`, if `updateStripeSubscriptionPlan` fails after a mock charge was already created, `refundMembershipAmount` is called with the full `membership.id`. `listRefundableMembershipPayments` returns ALL invoices for that membership ordered by date, so the refund may be taken from an older invoice rather than the one just charged for the upgrade — resulting in an incorrect refund trail.

---

## Booking / Payment Lifecycle (HIGH)

- [x] **`updateBooking()` refund path has no rollback if refund fails** — `adminjs/src/services/bookings-service.js:1392-1426` calls `applyBookingUpdate` (which permanently mutates the booking's resource, times, and financials in the DB) before calling `refundBookingAmount`. If the Stripe refund call throws, the booking is already updated but the customer receives no refund. There is no compensating write to restore the original booking state.

- [x] **Stale-booking expiry runs synchronously in list/availability hot paths** — `adminjs/src/services/bookings-service.js:103-104` and `:237-238` call `expireStalePendingBookings()` and `expireStalePendingBookingAdjustments()` on every `listUserBookings()` and `listAvailableResources()` request. Each stale booking triggers a `retrieveStripeCheckoutSession` Stripe API call. Under concurrent load or with many stale records, this adds unbounded latency and Stripe rate-limit risk to two of the most-called endpoints. Expiry should run as a background job (cron/queue), not inline.

- [x] **`createBooking()` direct-charge path leaves a confirmed Stripe charge on a `pending` DB booking if the UPDATE fails** — `adminjs/src/services/bookings-service.js:902-923` calls `chargeBooking()` then executes `UPDATE bookings SET status = 'confirmed'`. If the DB write fails after the charge succeeds, the booking stays `pending` and will eventually expire and be cleaned up — but money has already been taken and no auto-refund is triggered from this code path, since `autoRefundBookingPayment` is only called from `finalizeBookingAfterSuccessfulPayment`.

- [x] **`syncBookingAdjustmentCheckoutSession` applies booking update before re-checking availability atomically** — `adminjs/src/services/bookings-service.js:1597-1644`: availability is re-validated, and if it passes, `applyBookingUpdate` runs. However, another concurrent request could book the same slot between the validation query and the update — there is no DB-level lock or serializable transaction guarding this window.

---

## Refund / Invoice Reconciliation (HIGH)

- [x] **`upsertStripeInvoice` `bookingId` fallback can overwrite an existing invoice** — `adminjs/src/services/invoices-service.js:121-126` falls back to matching by `booking_id` when neither `stripe_invoice_id` nor `stripe_payment_intent_id` matches any row. For bookings that have both an initial invoice and an adjustment invoice, this fallback will find and **overwrite** the first invoice instead of inserting a new record, silently destroying the original billing history.

- [x] **`refundInvoicePayments` issues partial Stripe refunds before validating the full requested amount is available** — `adminjs/src/services/refunds-service.js:199-261` iterates invoices and calls `createStripeRefund` per invoice. If the total requested `amountMinor` exceeds the available refundable balance, partial refunds on earlier invoices are already committed to Stripe before the function throws `insufficientBalanceMessage`. The caller sees an error but money has already been returned — with no local record of the partial refund state.

- [x] **`syncBookingRefundState` resets `stripe_payment_status` to `'succeeded'` for partially-refunded confirmed bookings** — `adminjs/src/services/refunds-service.js:131-133`: the `else` branch unconditionally sets `nextPaymentStatus = 'succeeded'` for any booking that is not canceled, regardless of whether a partial refund exists. A booking with `refundedMinor > 0` but `netPaidMinor > 0` (partial refund, still active) will have its payment status shown as `succeeded` rather than `partially_refunded`, hiding the partial refund from any UI or reporting query that reads `stripe_payment_status`.

- [x] **`handleChargeRefunded` does not call `syncBookingRefundState` directly — relies on `upsertStripeRefund` chain** — `adminjs/src/services/refunds-service.js:372-395` iterates `charge.refunds.data` and calls `upsertStripeRefund` for each, which internally calls `syncRefundStateForPaymentIntent`. If the `charge` object arrives with an empty `refunds.data` array (e.g. Stripe sends the charge event before refund sub-objects are populated), no sync runs and the invoice/booking status is never updated — a silent miss that requires a subsequent `refund.updated` webhook to recover.

---

## VAT Calculations (HIGH)

- [x] **Two separate VAT systems operate in parallel with no reconciliation** — The local `calculateVat()` function (`adminjs/src/services/payments-service.js:4-6`) applies a flat 20% to the subtotal and stores the result in the DB (`bookings.tax_minor`, `bookings.total_minor`). Separately, all Stripe Checkout sessions (`createBookingCheckoutSession`, `createBookingAdjustmentCheckoutSession`, `createMembershipAdjustmentCheckoutSession`) have `automatic_tax: { enabled: true }`, meaning Stripe calculates its own tax figure based on customer address and registration. The `session.amount_total` returned by Stripe (stored in the invoice) will diverge from the locally computed `total_minor` whenever the customer's Stripe tax treatment differs from a flat 20% — producing a mismatch between the booking DB row and the invoice DB row for the same transaction.

- [x] **`createBookingPaymentIntentDraft` (embedded card flow) charges the locally computed 20% VAT with no Stripe Tax, inconsistent with the Checkout Session flow** — `adminjs/src/services/stripe-service.js:606-632` creates a PaymentIntent with `amount = subtotal + calculateVat(subtotal)` but no `automatic_tax` configuration. The Checkout Session flow delegates tax to Stripe. This means two users booking the same slot can be charged different effective tax amounts depending on which payment path they hit — one baked-in at 20%, one at Stripe's dynamic rate.

- [x] **`calculateVat` is hardcoded to 20% with no configuration or zero-rate support** — `adminjs/src/services/payments-service.js:5`: `Math.round(subtotalMinor * 0.2)`. There is no rate parameter, no environment-variable override, no per-product/service override, and no zero-rate path. UK VAT has changed historically and varies by product type (standard 20%, reduced 5%, zero 0%, exempt). Any future rate change or zero-rated service requires a code change rather than a config update.

- [x] **Guest booking page displays the subtotal as "total" — VAT is not shown before Stripe Checkout** — `src/pages-react/MeetingRoomBooking.tsx:226-229` computes `totalMinor = hourlyRateMinor * selectedHours.length` (no VAT added) and renders it as the total at lines 779 and 874. Because the Stripe Checkout session uses `automatic_tax: enabled`, Stripe then adds tax on the hosted payment page. The customer sees a lower price on the booking page than what Stripe charges, violating UK VAT display requirements (prices must be shown inclusive of VAT where applicable) and creating a surprise at checkout.

- [x] **`previewMembershipPlanChange` extracts tax only from proration lines, zeroing out VAT in some scenarios** — `adminjs/src/services/memberships-service.js:1004-1016` filters the upcoming invoice lines to only those flagged as proration items (`line.parent.subscription_item_details.proration`), then sums their `.taxes` arrays to get `prorationTaxMinor`. Non-proration lines (the new period's first charge, any remaining balance) are excluded. If the proration lines have no tax sub-items (possible when the customer has no tax address on file yet, or Stripe has not applied tax to the proration), `prorationTaxMinor` is 0 — making the plan-change preview UI show £0 VAT even when Stripe will actually charge tax at checkout.

- [x] **Mock-mode membership upgrade invoice stores locally computed tax, not Stripe-computed tax** — `adminjs/src/services/memberships-service.js:843-855`: in mock mode, `createLocalInvoice` is called with `taxMinor: settlement.taxMinor`. `settlement` is derived from `getMembershipChangeSettlement(preview)`, which uses the `previewStripeSubscriptionPlanChange` result. That Stripe preview includes `automatic_tax`, so the tax figure is correct — but the mock PaymentIntent created via `createImmediateMockPayment` (`stripe-service.js:452-481`) does not set `automatic_tax`, meaning Stripe does not add tax on top. The resulting charge and the locally stored invoice will have matching totals only by coincidence (the amount charged equals `settlement.paymentDueMinor` which already includes tax from the preview), but there is no Stripe Tax record associated with the payment — making the mock path untraceable from Stripe's tax reporting.

- [x] **NaN Propagation in calculateVat** — `adminjs/src/services/payments-service.js:4-5` `calculateVat` converts input with `Number(subtotalMinor || 0)` and rounds it without validating finiteness, so invalid values can become `NaN` and break downstream payment or persistence logic. Severity: MEDIUM

---

## Stripe Webhook Handler (HIGH)

- [x] **No `charge.dispute.created` webhook handler — disputes are silently ignored** — `adminjs/src/member-portal-api.js:379-404` handles `checkout.session.completed`, `invoice.paid`, `invoice.payment_failed`, `customer.subscription.updated`, `charge.refunded`, and `charge.refund.updated`, but there is no handler for `charge.dispute.created` or `charge.dispute.closed`. If a customer opens a chargeback, the platform receives no notification, takes no defensive action (suspend access, flag account), and has no audit trail. Stripe auto-debits the disputed amount from the connected account balance with no local record.

- [x] **`checkout.session.completed` routing silently drops events with missing metadata** — `adminjs/src/member-portal-api.js:298-324` routes checkout sessions based on the presence of metadata fields (`app_user_id`, `membership_adjustment_id`, `booking_id`, `booking_adjustment_id`). If a checkout session is created with incomplete or missing metadata (e.g. a Stripe Dashboard manual session, or a code path that forgets to attach metadata), the event falls through all conditions with no logging and no error — the webhook returns 200 OK but no business logic executes, leaving the payment received but the booking/membership not activated.

- [x] **`handleStripeEvent` error causes 400 response but the event is already recorded as unprocessed** — `adminjs/src/member-portal-api.js:397-404`: `recordWebhookEvent` inserts the event with `processedAt: null` before `handleStripeEvent` runs. If `handleStripeEvent` throws, the catch block returns HTTP 400 to Stripe, which will retry. On retry, `recordWebhookEvent` finds the existing event with `processedAt: null` and re-processes it — this is correct for recovery, but it means all individual event handlers (`syncMembershipCheckoutSession`, `syncBookingCheckoutSession`, etc.) must be fully idempotent. None of these handlers have explicit idempotency guards (e.g. checking if the action was already taken before applying it), relying only on the upsert behavior of their DB writes.

- [x] **Single-Item Subscription Assumption in Plan Update** — `adminjs/src/services/stripe-service.js:496-503` `updateStripeSubscriptionPlan` updates only `existingSubscription.items.data[0]`, so subscriptions with multiple items can be only partially migrated to the new price. Severity: MEDIUM

- [x] **Missing tax_behavior on Membership Adjustment Checkout** — `adminjs/src/services/stripe-service.js:408-417` `createMembershipAdjustmentCheckoutSession` builds `price_data` without `tax_behavior: 'exclusive'` even though similar checkout flows set it, which can produce inconsistent tax treatment for membership adjustments. Severity: MEDIUM

---

## Authentication & Session Security (HIGH)

- [x] **`changeUserPassword` does not invalidate existing sessions** — `adminjs/src/services/users-service.js:147-170` updates the password hash in the database but does not call `revokeMemberSessions(userId)`. After a password change, all previously authenticated sessions remain valid. Only `updateUserAccessStatus('suspended')` at `users-service.js:199` triggers session revocation. If an account is compromised and the user changes their password, the attacker's existing session continues to work indefinitely (up to cookie expiry).

- [x] **Default webhook secret `whsec_city_focus_hub_local` has no production guard** — `adminjs/src/config.js:120` sets `webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_city_focus_hub_local'`. The production startup check at lines 128-145 validates that the admin password is changed from the default and that `STRIPE_SECRET_KEY` is set, but it does NOT check whether `STRIPE_WEBHOOK_SECRET` is still the default. If the env var is missing in production, webhooks will use the hardcoded secret, allowing anyone who knows this public default to forge webhook events and trigger arbitrary membership activations, booking confirmations, or refund processing.

- [x] **Single shared session secret for admin and member portals** — `adminjs/src/config.js:80` sets `config.memberSession.secret` to fall back to the same `sessionSecret` used for the admin panel session. If the session secret is compromised from one surface (e.g. admin panel), the attacker can forge member session cookies as well. Admin and member session stores should use independent secrets.

- [x] **`config.stripe.allowMockPayments` has no production hard-block** — `adminjs/src/config.js:122-124` defaults `allowMockPayments` to `true` in non-production, but there is no explicit `if (isProduction && allowMockPayments) throw` guard. If someone accidentally sets `STRIPE_ALLOW_MOCK_PAYMENTS=true` in a production `.env` file, mock payments are silently enabled — allowing bookings and memberships to be "paid" without any real Stripe charge.

---

## API Input Validation (MEDIUM)

- [x] **No schema validation library — all request validation is manual** — `adminjs/src/member-portal-api.js` has 40+ route handlers with no Joi, Zod, Yup, or express-validator. Each handler manually checks `request.body` fields inline. This is inconsistent (some routes check, some don't), error-prone (easy to miss a field), and produces non-uniform error responses. A single validation middleware layer would catch malformed requests before they reach business logic.

- [x] **`parseUserId()` returns 0 for invalid IDs, propagating falsy-but-not-undefined values** — renamed to `parseEntityId` with proper validation across all 10 occurrences.

- [x] **NaN propagation from `Number()` casts on request body fields** — Multiple routes cast body fields directly with `Number(request.body?.resourceId)`, `Number(request.body?.hours)`, etc. (e.g. `member-portal-api.js:634`, `:688`, `:721`). If the field is undefined or a non-numeric string, `Number()` returns `NaN`, which propagates into SQL queries as `NaN`. Sequelize will pass `NaN` as a parameter, causing the query to match no rows (silent failure) or throw a DB error depending on the column type — neither of which produces a helpful error message to the client.

- [x] **`/api/member-portal/resources` endpoint has no authentication check** — `adminjs/src/member-portal-api.js:634` registers `app.get('/api/member-portal/resources', ...)` without calling `requireAuthenticatedMember` middleware. This endpoint returns the list of bookable resources with pricing information. While this may be semi-public by design (needed for guest booking), it is inconsistent with other member-portal endpoints and is not documented as intentionally public. If pricing should not be visible to unauthenticated users, this is an access control gap.

- [x] **`validateReturnUrl` accepts any URL matching `config.cors.allowedOrigins` — broad in development** — added HTTPS-only enforcement in production mode. Development accepts localhost patterns but production requires HTTPS origins.

---

## Resource / Availability Concurrency (HIGH)

- [x] **No DB transaction or row lock between availability check and booking insert** — `adminjs/src/services/bookings-service.js:296-348` (`validateAvailability`) performs a SELECT-based conflict check, then `createBooking()` at lines 877-899 does the INSERT with no transaction wrapping the pair. Two concurrent requests can both pass the availability check and both insert, causing a double-booking on the same resource and time slot.

- [x] **`listAvailableResources` treats all resources as capacity=1** — `adminjs/src/services/bookings-service.js:245-276` checks if ANY booking conflicts with a resource and marks the entire resource as unavailable. If a resource has capacity > 1 (e.g. a hot desk area with 5 seats), the first booking blocks the entire resource for that time slot, preventing all other users from booking.

- [x] **`expireStalePendingBookings` has no mutex — concurrent double-processing** — `adminjs/src/services/bookings-service.js:828-841` is called from hot paths (list and availability endpoints). Two concurrent requests can both SELECT the same stale rows and both process them. Each stale booking triggers a Stripe API call via `reconcilePendingBookingRow`, so double-processing wastes Stripe rate-limit budget and could cause double-refund attempts on the same payment.

- [x] **Pending booking hold relies on application-level time check, not DB constraint** — The `payment_hold_expires_at` column is checked via `WHERE payment_hold_expires_at > :now` in queries throughout `bookings-service.js`, but there is no DB-level CHECK constraint or trigger enforcing expiry. If the application server clock drifts, holds can be honored inconsistently across requests hitting different servers.

---

## Email Notifications (MEDIUM)

- [x] **No transactional emails exist** — `adminjs/src/mailer.js` contains only two email functions: `sendContactSubmissionEmail` (contact form → admin) and `sendContactReplyEmail` (admin reply → user). There are no booking confirmation, payment receipt, membership activation/cancellation, password change confirmation, or refund notification emails. Users receive zero email feedback for any financial transaction.

- [x] **Email send failures are silently swallowed** — `adminjs/src/mailer.js` `sendContactSubmissionEmail` returns `{ ok: false, reason }` on failure — it never throws. The caller in `public-api.js` likely does not check this return value, meaning failed emails are invisible to the system with no logging, retry, or alert.

- [x] **No email queue or retry mechanism** — added `withRetry()` wrapper with exponential backoff. All 12 `sendMail` calls wrapped with retry logic. Full background queue still not implemented (would require Redis/Bull), but transient SMTP failures are now retried.

---

## Admin Panel Security (HIGH)

- [x] **`/health` endpoint exposes database name and table schema without authentication** — `adminjs/src/server.js:244-251` responds to unauthenticated GET requests with `{ ok: true, database: config.database.name, rootPath: config.rootPath, resources: resourceDefinitions.map(r => r.table) }`. Any unauthenticated user can enumerate the database name and all AdminJS-managed table names, providing reconnaissance data for targeted attacks.

- [x] **Admin panel has no IP restriction or login rate limiting** — AdminJS is mounted at `/admin` on `adminjs/src/server.js` with only password-based authentication. There is no IP whitelist, no VPN requirement, and no rate limiting on admin login attempts. An attacker can brute-force the admin password from any IP address.

- [x] **No audit logging for admin actions** — AdminJS resource operations (create, update, delete on users, payments, bookings, memberships) have no audit trail. The `deleteContactSubmissionById` endpoint in the admin router at `adminjs/src/server.js:303` can permanently delete data with no record of who deleted it or when. There is no admin action log anywhere in the codebase.

---

## Frontend Error Handling (MEDIUM)

- [x] **`MeetingRoomBooking.tsx` returns `null` during CMS query loading — blank screen** — `src/pages-react/MeetingRoomBooking.tsx:496-498` returns `null` while CMS data is loading. The user sees a completely blank page with no loading indicator until the CMS query resolves, which can take several seconds on slow connections.

- [x] **Availability API failures make all slots appear available** — `src/pages-react/Dashboard.tsx:519` and `src/pages-react/MeetingRoomBooking.tsx:280` both have catch blocks that set `newAvailability.set(time, true)` on API failure. If the availability endpoint returns an error, all time slots are marked as available, letting users proceed to book slots that may already be taken.

- [x] **`member-api.ts` swallows JSON parse errors** — `src/lib/member-api.ts:22` uses `response.json().catch(() => null)`. If the server returns non-JSON (e.g. HTML error page, 502 gateway response), `payload` becomes `null` and the error message falls through to a generic `API request failed: ${status}` — hiding the actual server error from both the user and any error tracking.

- [x] **`handleConfirmClick` does not wrap `confirmCardPayment` in try/catch** — `src/pages-react/Dashboard.tsx:1198-1230` awaits `stripeRef.current.confirmCardPayment(...)` at line 1213. The `result.error` check only handles Stripe's structured error responses, not JS exceptions from network failures or unexpected Stripe SDK errors. An unhandled promise rejection could crash the payment flow with no user feedback.

- [x] **Success/error messages persist across dashboard section navigation** — `src/pages-react/Dashboard.tsx:1350-1351` — `actionError` and `successMessage` are never cleared when the user navigates between dashboard sections. A stale error from the bookings page will still be visible when the user switches to the billing or profile page.

---

## Frontend State Management (MEDIUM)

- [x] **`availableResources` useState creates a stale duplicate of `dashboardData.resources`** — `src/pages-react/Dashboard.tsx:1654-1658` copies `dashboardData.resources` into a separate `availableResources` state. But `availableResources` is also set independently by `refreshAvailableResources` (line 1402-1412). These two sources can desync: `dashboardData` refreshes the full dashboard, while `refreshAvailableResources` only fetches resources, leaving two different views of the same data.

- [x] **`actionError` change closes all open dialogs, losing user form input** — `src/pages-react/Dashboard.tsx:1660-1669` — a useEffect closes `isCreateBookingOpen`, `isEditBookingOpen`, `isDetailsOpen`, and `isPlanChangeOpen` whenever `actionError` changes. If a booking edit API call returns an error, the edit dialog is immediately closed and the user loses all unsaved form data. The error should be shown inside the dialog, not trigger dialog dismissal.

- [x] **Four nearly identical useEffect blocks for checkout sync** — `src/pages-react/Dashboard.tsx:1418-1646` contains separate ~40-line useEffect hooks for membership checkout sync, membership adjustment sync, booking adjustment sync, and booking checkout sync. All four follow the same pattern (check URL param → call sync API → clear param → refresh). This duplication means a bug fix in one block can easily be missed in the other three.

- [x] **`refreshDashboard` replaces all state at once, causing full re-render cascade** — replaced with scoped `refreshDashboard(scope: DashboardScope)` that shallow-merges only the specified domain. 17 call sites updated with appropriate scopes.

- [x] **`useEffect` at line 1416 depends on `[user]` object reference** — `src/pages-react/Dashboard.tsx:1416` triggers `refreshDashboard()` whenever `user` changes. If the `user` object reference changes on every context re-render (common with object values in React context that are not memoized), `refreshDashboard()` will fire unnecessarily on every parent render, causing redundant API calls and UI flicker.

---

## CMS Snapshot Freshness (MEDIUM)

- [ ] **Static CMS snapshots are only generated at build time with no invalidation** — *(accepted trade-off — no ISR available in static hosting)* `public/cms/_meta.json` shows `generatedAt: "2026-04-05T23:47:52.849Z"`. Between deploys, any content edits in the CMS (Strapi) are invisible to production users. There is no webhook, no ISR, no revalidation timer, and no manual purge mechanism. The site can serve stale content indefinitely until the next build.

- [ ] **Snapshot fallback silently degrades to live API, which may be unreachable in static hosting** — *(accepted trade-off — static-only builds won't reach backend API)* `src/lib/content-api.ts:220-224` — if `fetchStaticSnapshot` fails, `fetchApi` tries the live backend API. But if the site is deployed as a static build (e.g. Netlify, Vercel static, S3), the backend API URL may not be reachable from the client browser, causing the page to show empty content or error states with no indication that the CMS data is missing.

- [ ] **No schema validation on CMS JSON responses** — *(accepted trade-off — would require runtime validation library)* `src/lib/content-api.ts` casts all API responses with `as T` at lines 206, 215, 239, and 262 — no runtime validation. If the CMS schema changes (e.g. a field is renamed or removed in Strapi) or a snapshot file is corrupted, the app will silently use malformed data, causing undefined property access errors or rendering incorrect content.

---

## Environment Variable & Secrets Hygiene (HIGH)

- [x] **`adminjs/.env` is committed to git with real credentials** — `adminjs/.env` contains a real SMTP app password (`sjgmhgywrmhmcjfr`), Stripe test API keys (`pk_test_...`, `sk_test_...`), and a plaintext client login password (`Client123!`). This file is tracked in version control, meaning anyone with repo access (including forks, CI logs, or accidental public exposure) has working credentials for email and payment systems.

- [x] **Production startup check does not validate `STRIPE_SECRET_KEY` is set** — `adminjs/src/config.js:128-145` checks that the session secret and admin credentials are changed from defaults, but does NOT verify that `STRIPE_SECRET_KEY` is present. If the environment variable is missing, `config.stripe.secretKey` defaults to an empty string and all Stripe operations will fail at runtime with unhelpful errors rather than a clear startup failure.

- [x] **Database password allows empty string without warning** — `adminjs/src/config.js:92` uses `process.env.DATABASE_PASSWORD || ''`. In production, a passwordless root MySQL connection is a severe security risk, but the production startup check does not validate this. The server starts successfully with no database password, relying only on network-level access controls.

- [x] **Frontend env vars have no build-time validation** — created `src/lib/env-validation.ts` with build-time checks. Imported at app startup via `src/lib/api-config.ts`.

- [x] **`.env.example` files contain real-looking credentials that may be copied to production** — `adminjs/.env.example` line 8 has `ADMINJS_PASSWORD=Client123!` and line 27 has `STRIPE_WEBHOOK_SECRET=whsec_city_focus_hub_local`. Developers may copy these example files directly into `.env` without changing the values. The production startup check catches the admin password but does not catch the webhook secret (see Authentication & Session Security section above).

- [x] **No Validation That Publishable and Secret Keys Match Environments** — `adminjs/src/config.js:117-120` Stripe config accepts any publishable/secret key combination without checking test/live prefix consistency, so misconfigured environments fail later during payment flows instead of at startup. Severity: MEDIUM

---

## Database Schema & Bootstrap (HIGH)

- [x] **No foreign key constraints on any commerce table** — `adminjs/src/bootstrap-commerce.js:5-196` defines 10 commerce tables (`member_users`, `memberships`, `membership_plans`, `membership_adjustments`, `resources`, `bookings`, `invoices`, `refunds`, `booking_adjustments`, `stripe_webhook_events`) with zero `FOREIGN KEY` constraints. Orphaned rows can be created freely — e.g., a `bookings` row referencing a non-existent `user_id` or `resource_id`. Data integrity is entirely dependent on fragile application-layer checks.

- [x] **Rate limiter never evicts expired buckets — memory leak** — `adminjs/src/security.js` stores rate-limit state in a `Map` that grows unboundedly. Expired buckets are never removed — the code only checks `existingBucket.resetAt <= now` to decide whether to create a fresh bucket, but never deletes old entries. Every unique IP permanently consumes a Map entry, leading to unbounded memory growth that will eventually crash the process under production traffic.

- [x] **`ensureColumn` interpolates raw strings into SQL without quoting** — `adminjs/src/bootstrap-commerce.js:299` interpolates `tableName` and the raw `definition` string directly into an `ALTER TABLE` statement with no backtick-quoting or validation. All current callers pass hardcoded strings so this is not exploitable today, but any future caller deriving table/column names from configuration or user input would introduce a SQL injection vector.

- [x] **Seed functions are not idempotent beyond row-count check** — `seedResources` rewritten to per-slug upsert reconciliation. `seedPlans` still uses count-based skip but has been documented as acceptable for the limited plan set.

- [x] **`ensureColumn` cannot modify existing columns** — added `ensureColumnType()` function that can alter existing column types, nullability, and defaults.

- [x] **No index on `contact_submissions.email` or `created_at`** — `adminjs/src/bootstrap-content.js:290-300` creates the `contact_submissions` table with no indexes beyond the primary key. Admin queries filtering by email or sorting by date will perform full table scans, degrading as the table grows.

- [x] **No index on `stripe_webhook_events.processed_at` or `event_type`** — `adminjs/src/bootstrap-commerce.js:188-196` — the `stripe_webhook_events` table has only a unique key on `stripe_event_id`. Queries filtering by `event_type` or `processed_at IS NULL` (unprocessed events) will full-scan as webhook volume grows.

- [x] **Database Client Does Not Request SSL/TLS** — added `ssl` config field in `config.js` and `dialectOptions.ssl` in `database.js`. Reads from `DATABASE_SSL` env var.

- [x] **SQL Logging Hard Disabled With No Override** — `adminjs/src/database.js:12` Sequelize SQL logging is hardcoded to `false`, making query/debug and performance troubleshooting harder without a code change. Severity: LOW

---

## Backend Code Quality (MEDIUM)

- [x] **Contact submission email fired without awaiting — caller sees success even if email fails** — `adminjs/src/public-api.js:160-168` calls `sendContactSubmissionEmail` as fire-and-forget. The user receives a 201 response, but if SMTP is down the admin is never notified of the contact submission. No retry, no dead-letter, no admin-visible failure indicator.

- [x] **No validation on `sourcePage` field in contact submission** — `adminjs/src/public-api.js:64` — `normalizeSubmissionBody` accepts any string for `sourcePage` with no length limit or allowlist. While `name`, `phone`, `email`, and `message` are validated for length, `sourcePage` bypasses the size guard and can store arbitrarily large values in the database.

- [x] **`toResource` throws on malformed JSON in `metadata` column** — `adminjs/src/services/resources-service.js:13` calls `JSON.parse(row.metadata)` with no try/catch. If the `metadata` column contains invalid JSON (manual DB edit, migration bug), any endpoint that lists resources returns a 500 error.

- [x] **`mapColumnType` misclassifies `BIGINT`, `MEDIUMINT`, and other SQL types as `STRING`** — `adminjs/src/models.js:98-138` only handles a subset of MySQL types (`tinyint`, `int`, `double`, `decimal`, `datetime`, `date`, `json`, `text`). Any column using `BIGINT`, `MEDIUMINT`, `SMALLINT`, `FLOAT`, `TIME`, `TIMESTAMP`, `BLOB`, `ENUM`, or sized `VARCHAR` falls through to `DataTypes.STRING`, causing Sequelize to misrepresent column types in AdminJS.

- [x] **`buildResources` fails entirely if any single table does not exist** — `adminjs/src/models.js:188` — `defineModelForTable` calls `sequelize.getQueryInterface().describeTable(definition.table)`, which throws if the table is missing. Since `buildResources` uses `Promise.all`, one missing table prevents the entire admin panel from starting. No graceful degradation or per-resource error handling.

- [x] **Hardcoded currency `'gbp'` in seed data** — `adminjs/src/bootstrap-commerce.js:325` — `seedPlans` hardcodes `'gbp'` as the currency for all default plans instead of reading from config. Multi-currency or currency changes require a code change.

- [x] **Duplicate `toResource` mapping logic across services** — `adminjs/src/services/resources-service.js:3-15` contains a `toResource` row-to-object mapper that is duplicated in `bookings-service.js`. A shared utility would reduce duplication and ensure consistent field parsing.

- [x] **No error handling or logging in SQL helper wrappers** — `adminjs/src/services/sql.js:4-22` — `queryOne`, `queryAll`, and `execute` are thin wrappers around `sequelize.query` with no error handling, structured logging, or query duration tracking. Raw Sequelize errors propagate directly to callers with no observability.

- [x] **`toPascalCase` produces empty string for edge-case inputs** — `adminjs/src/models.js:54-60` returns an empty string if `value` is empty, underscores-only, or hyphens-only. This would cause `sequelize.define('', ...)` to fail with a cryptic error.

---

## Auth & Session UX (MEDIUM)

- [x] **Auth redirect during render body — side effect violates React rendering contract** — `src/pages-react/Auth.tsx:27-30` calls `window.location.href = redirectTarget` directly in the render body when `user` is truthy, not inside a `useEffect`. React 18 Strict Mode executes render functions twice in development, causing a double navigation. In production it fires once but violates React's purity contract and is fragile with concurrent features.

- [x] **Logout sets user to `null` before server session is destroyed** — `src/context/AuthContext.tsx:130-133` calls `setUser(null)` synchronously before the async `logoutMember()` API call completes. If the logout API fails (network error, server down), the UI shows the user as logged out while the server session remains active. A page refresh re-authenticates, creating a confusing inconsistent state.

- [x] **`useSeo` hook overwrites SSG meta tags at runtime with no cleanup** — added `useRef` to snapshot SSG meta tags on mount, restore on unmount. No more stale meta tags during SPA navigation.

- [x] **No loading state in Layout — Navbar/Footer absent during query fetch** — `src/components/layout/Layout.tsx:20-38` conditionally renders `<Navbar />` and `<Footer />` only when `siteSettings` is truthy. During the initial CMS query, both are absent from the DOM, causing a visible layout shift (CLS) when they suddenly appear.

- [x] **Auth form does not validate `name` field on registration** — `src/pages-react/Auth.tsx:36-44` — `handleSubmit` validates `email` and `password` for both login and register, but the `name` field is never checked. An empty name is sent to the backend, which may reject it with a generic error rather than a clear "Name is required" message.

- [x] **Form state not reset after successful login/register** — `src/pages-react/Auth.tsx:32-56` — after a successful auth call, `name`, `email`, `password`, and `error` states are not cleared before the redirect. If the redirect fails or the user navigates back, the form still contains the submitted credentials, including the password.

- [x] **No submission-in-progress disable on auth form** — `src/pages-react/Auth.tsx:32-56, 175` — the submit button has no `disabled` state during the async login/register API call. Rapid clicks fire multiple concurrent requests, which can cause duplicate account creation attempts or multiple session tokens.

- [x] **`usePreviewStatus` reads `window.location` once — not reactive to SPA navigation** — `src/hooks/useCmsContent.ts:149-163` reads `window.location.search` at call time but has no subscription to route changes. In a SPA with client-side navigation, toggling preview mode via URL parameter changes is not detected until a full page reload. All CMS query hooks depending on this will use stale preview status.

- [x] **`useSiteSettings` passes raw CMS objects instead of mapped values for page content** — `src/hooks/useCmsContent.ts:1089-1096` passes `homePage`, `aboutPage`, etc. as raw Strapi objects into `mergeContent` without using the dedicated mapper functions (`mapHomepageContent`, `mapAboutPageContent`, etc.). Consumers of `useSiteSettings().homePage` receive Strapi-flavored data with `id`, `documentId`, `createdAt` fields instead of the clean shape components expect.

- [x] **CMS array mapper functions index into fallback without bounds check** — verified already fixed with safe optional chaining access patterns.

- [x] **Dead import `Location` type in Auth.tsx** — `src/pages-react/Auth.tsx:3` imports `Location` from `react-router-dom` but never uses it. Line 21 uses an inline type literal instead.

- [x] **`getInitials` fallback 'CF' is hardcoded** — `src/context/AuthContext.tsx:41` falls back to `'CF'` for empty names. This should come from config or site settings since the site name is CMS-configurable.

- [x] **`normalizeExternalUrl` prepends `https://` to relative paths** — `src/hooks/useCmsContent.ts:74-86` prepends `https://` to any string not matching `https?:|mailto:|tel:|#`. A relative path like `/about` becomes `https:///about` (triple slash), an invalid URL. Currently only used for social links, but the logic is fragile.

- [x] **`useSiteSettings` query key has no cache-busting mechanism** — added `refetchOnWindowFocus: true` so stale navbar/footer data is refreshed when the user returns to the tab.

---

## Silent Stripe Cleanup Failures (HIGH)

- [x] **Silent PaymentIntent Cancel Allows Charge After Booking Canceled** — `adminjs/src/services/bookings-service.js:769` `cancelStripePaymentIntent(...).catch(() => {})` suppresses Stripe cancellation failures before the booking is marked canceled, so a canceled booking can still be charged. Severity: HIGH

- [x] **Silent PaymentIntent Cancel on Explicit Booking Cancellation** — `adminjs/src/services/bookings-service.js:1295` the explicit booking-cancel path swallows `cancelStripePaymentIntent()` failures, leaving a chargeable PaymentIntent behind with no surfaced error. Severity: HIGH

- [x] **Silent Checkout Session Expire Allows Completion of Expired Membership Adjustment** — `adminjs/src/services/memberships-service.js:412` `expireStripeCheckoutSession(...).catch(() => {})` hides expiry failures, so an adjustment already marked expired can still remain payable in Stripe. Severity: HIGH

- [x] **Silent Checkout Session Expire on Membership Adjustment Cancellation** — `adminjs/src/services/memberships-service.js:1204` membership-adjustment cancellation suppresses Stripe session expiry errors, leaving the canceled session open for payment. Severity: HIGH

- [x] **Silent Checkout Session Expire on 4 Booking Paths** — `adminjs/src/services/bookings-service.js:750,810,1291,1675` Four `.catch(() => {})` blocks suppress Stripe checkout session expiry failures. On expire paths (`:750`, `:810`), a booking marked expired locally may still have a payable Stripe session. On cancel paths (`:1291`, `:1675`), a canceled booking/adjustment can still be completed on Stripe, leading to unwanted charges. Severity: HIGH

- [x] **Fragile String-Match on Stripe Error Message** — `adminjs/src/services/stripe-service.js:145` removed fragile `.includes('already been attached')` check, now uses `error.code` for reliable error identification. Severity: MEDIUM

---

## Silent Error Swallowing (MEDIUM)

- [x] **Silent Sync-Failure Fallback to Stale DB Row (Memberships)** — `adminjs/src/services/memberships-service.js:407` `.catch(() => getMembershipAdjustmentRowById(...))` swallows failures from `syncMembershipAdjustmentCheckoutSession()` and returns the pre-sync DB row. No error is logged, so callers receive potentially stale state without knowing the sync failed. Severity: MEDIUM

- [x] **Silent Sync-Failure Fallback to Stale DB Row (Bookings)** — `adminjs/src/services/bookings-service.js:805` `.catch(() => getBookingAdjustmentRowById(...))` swallows failures from `syncBookingAdjustmentCheckoutSession()` and returns the pre-sync DB row with no error logged. Severity: MEDIUM

- [x] **Email Send Timeout Does Not Cancel In-Flight SMTP Call** — `adminjs/src/mailer.js:62` The timeout races `sendMail()` with a `setTimeout` rejection but does not abort the underlying SMTP call. Timed-out sends may continue executing in the background after the promise rejects. Severity: MEDIUM

- [x] **Silent unlink Failure Masks Filesystem Issues** — `adminjs/src/server.js:85` `unlink(file.path).catch(() => {})` suppresses failed cleanup when upload format validation fails, hiding filesystem problems behind a misleading invalid-format error. Severity: LOW

- [x] **Debug Log Exposes Request Params When NODE_ENV Misconfigured** — `adminjs/src/collection-pages.js:1393` `console.log` dumps `request.query`, `request.params`, and payload keys. The guard is `process.env.NODE_ENV !== 'production'`, so a misconfigured environment variable causes request metadata to appear in stdout. Severity: LOW
