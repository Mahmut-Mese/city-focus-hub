# Tech Debt

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

- [ ] **Split `Dashboard.tsx` (2,308 lines)** — the biggest single improvement. Extract into:
  - Section components: `BookingsSection`, `BillingSection`, `ProfileSection`, etc.
  - Custom hooks: `useDashboardData`, `useBookingForm`, `useStripePayment`
  - Currently has 15+ `useState` calls and 6 `useEffect` blocks in one file

- [ ] **Split `useCmsContent.ts` (1,107 lines)** — contains 14 query hooks + hundreds of lines of mappers. Move to:
  - `/src/hooks/cms/` — one file per page/domain
  - `/src/lib/cms-mappers.ts` — normalization utilities

- [ ] **Split `bookings-service.js` (2,020 lines)** — largest backend file. Break into:
  - `booking-creation.js`
  - `booking-payments.js`
  - `booking-adjustments.js`
  - `booking-webhooks.js`

- [ ] **Use `express.Router()`** — all 40+ API routes are registered flat on the `app` object inside `registerMemberPortalApi`. Prevents middleware scoping and makes testing impossible. Refactor to one Router per domain.

- [ ] **Convert `requireAuthenticatedMember` to real Express middleware** — currently a plain function that every route must remember to call manually. One forgotten call = exposed endpoint. Should be middleware that populates `req.user` and calls `next()`, applied as `app.use('/api/member-portal', memberAuthMiddleware)`.

- [ ] **Backend has no TypeScript** — frontend is fully typed, backend is plain JS. No shared types means API contract mismatches are only caught at runtime. Consider TypeScript for backend or at least OpenAPI/zod schema sharing.

---

## Security

- [x] **Missing security headers**: no `Content-Security-Policy`, `X-Frame-Options`, `Strict-Transport-Security`. Covered by adding `helmet`.
- [ ] **No CSRF protection** on any state-mutating POST/PUT endpoints. Add CSRF token check or set `SameSite=Strict` on session cookies.
- [x] **Rate limiter reimplements IP extraction** instead of using Express's `req.ip` — inconsistent with the `trust proxy` setting already configured.
- [ ] **Rate limiter is in-memory** (`security.js`) — state is not shared across processes. Useless under PM2 cluster or Docker replicas. Replace with Redis-backed solution (`rate-limiter-flexible`).

---

## Performance

- [ ] **No code splitting** — entire app is one bundle including `Dashboard.tsx`. Add route-level `React.lazy()` + `<Suspense>` to cut initial load.
- [ ] **Stripe.js always loads** — imported at top level in `Dashboard.tsx:4`, loads for every dashboard visitor even if they never touch payments. Lazy-import only when the payment UI opens.
- [ ] **`QueryClient` has no global defaults** — `staleTime: 60_000` is copy-pasted into every single query hook. Set once in `QueryClient` constructor via `defaultOptions`.
- [ ] **`JSON.parse(JSON.stringify(...))` for deep cloning** in `useCmsContent.ts:43` — replace with `structuredClone()`.
- [ ] **No DB connection pool config** — Sequelize defaults to 5 connections. Set explicit pool options in `database.js`: `pool: { max: 10, min: 2, acquire: 30000, idle: 10000 }`.
- [ ] **`refreshDashboard()` refetches everything** after every action. Should invalidate only the relevant query instead of reloading the entire dashboard payload.

---

## Missing Features / Infrastructure

- [ ] **No database migrations** — schema changes happen via startup DDL (`ensureColumn()` in `bootstrap-commerce.js`) with no rollback capability. Adopt Sequelize CLI migrations.
- [ ] **Zero meaningful tests** — one placeholder unit test exists (`expect(true).toBe(true)`). No API tests, no component tests, no E2E implementations.
- [ ] **No error tracking** — no Sentry or equivalent. Production errors are invisible.
- [ ] **No password reset flow** — no "forgot password" or email verification on registration.
- [ ] **No React Error Boundaries** — one component crash takes down the entire UI.
- [ ] **No CI/CD pipeline** — no `.github/workflows/` at all. No automated lint, test, or build checks on PRs.
- [ ] **`framer-motion` listed as a dependency** but no usage was found. If unused, remove it (~75KB bundle savings).
- [ ] **`.adminjs/` build cache** in `adminjs/` folder is likely not gitignored — check and add if missing.
