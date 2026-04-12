# City Focus Hub — Coworking Space Platform

## Tech Stack

- **Frontend:** Astro 6 + React 18 (SSG), TypeScript, Tailwind CSS, shadcn-ui
- **Backend:** Express.js + AdminJS, plain JS, MySQL
- **Payments:** Stripe (PaymentIntent, Checkout Session, Subscriptions)
- **Auth:** Session-based via `express-session` with MySQL store

## Local Development

### Prerequisites

- Node.js 20+ & npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- MySQL 8+ running locally

### 1. Clone & install

```sh
git clone <YOUR_GIT_URL>
cd city-focus-hub
npm install
cd adminjs && npm install && cd ..
```

### 2. Start MySQL

```sh
brew services start mysql
```

### 3. Create the database (one-time)

```sh
mysql -u root -e "CREATE DATABASE IF NOT EXISTS city_focus_hub_admin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 4. Configure environment

```sh
# Backend
cp adminjs/.env.example adminjs/.env
# Edit adminjs/.env with your DB credentials, Stripe keys, etc.

# Frontend
cp .env.example .env.local
# Edit .env.local if needed
```

### 5. Run backend (port 3001)

```sh
npm run adminjs:dev
```

- Admin panel: http://localhost:3001/admin
- API: http://localhost:3001/api/

### 6. Run frontend (port 8080)

```sh
npm run dev
```

- Frontend: http://localhost:8080

> The Astro dev server is configured to run on port **8080** (see `astro.config.mjs`).
> The Vite proxy forwards `/api`, `/uploads`, `/admin`, and `/admin-assets` to the backend at `:3001`.

## Running Tests

### Unit tests (Vitest)

```sh
npm test
```

### E2E tests (Playwright)

E2E tests require **all three services running** before you start:

1. MySQL on `localhost:3306`
2. Backend on `localhost:3001` (`npm run adminjs:dev`)
3. Frontend on `localhost:8080` (`npm run dev`)

Then run:

```sh
# Install Playwright browsers (one-time)
npx playwright install chromium

# Run all e2e tests
npm run test:e2e
```

**What the E2E tests cover:**

| File | What it tests |
|------|---------------|
| `e2e/smoke.spec.ts` | Every frontend page returns **HTTP 200** with **no console errors** (12 static pages, 5 blog posts, 3 meeting room booking pages, plus 404 handling) |
| `e2e/api.spec.ts` | All backend API endpoints return expected status codes (CMS pages, collections, auth, member portal, Stripe webhook, health check) |

## Project Structure

```
city-focus-hub/
  adminjs/              # Backend — Express + AdminJS + MySQL
    src/
      services/         # Business logic (bookings, memberships, payments, etc.)
      server.js         # Express app setup
      config.js         # Environment config
      bootstrap-*.js    # DB schema + seed data
      member-portal-api.js  # Member-facing API routes
      public-api.js     # Public API routes (CMS, contact, guest booking)
  src/                  # Frontend — Astro + React
    pages/              # Astro SSG pages
    pages-react/        # React SPA pages (Dashboard, Auth, MeetingRoomBooking)
    components/         # Shared React components
    lib/                # API client, utilities
    context/            # React context (Auth)
    hooks/              # Custom hooks (CMS content)
  e2e/                  # Playwright E2E tests
  public/cms/           # Static CMS JSON snapshots
```

## Deployment

Run a production build:

```sh
npx astro build
```

The static output goes to `dist/`. Deploy using your preferred static hosting (Netlify, Vercel, S3, etc.). The backend must be deployed separately as a Node.js server.
