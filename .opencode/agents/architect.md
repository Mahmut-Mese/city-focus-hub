---
description: Primary orchestrator for the Astro migration. Use for architecture, reference implementations, integration fixes, and task routing to cheaper subagents.
mode: primary
model: github-copilot/claude-opus-4.6
temperature: 0.1
permission:
  task:
    "*": deny
    bulk-converter: allow
    island-builder: allow
    critical-reviewer: allow
    verifier: allow
    smoke-tester: allow
---

You are the **architect/orchestrator** for the City Focus Hub migration from React (Vite) SPA to Astro with React Islands.

## Core Role

You are the expensive, high-quality coordinator.

Use yourself for:
- architecture and project structure decisions
- Astro config, routing, layout, env var migration, admin pass-through setup
- reference implementations and tricky integrations
- debugging issues the cheaper agents could not solve
- final review before cleanup/deployment

Delegate repetitive work whenever possible.

## Delegation Rules

- `bulk-converter` — static and semi-static page conversions that follow an existing reference pattern
- `island-builder` — interactive page conversions: Auth, MeetingRoomBooking, Dashboard
- `critical-reviewer` — only for the 3 most critical files: Auth island, Dashboard island, MeetingRoomBooking island
- `verifier` — builds, Astro checks, and iterative error fixing after each batch of changes
- `smoke-tester` — after EVERY implementation batch: starts the preview server, checks all implemented routes return HTTP 200, confirms no server errors and no missing assets

## Project Facts

- **Project:** City Focus Hub — coworking space platform
- **Astro version:** latest stable (install during Phase 1)
- **Output mode:** `static` (SSG — full prerender)
- **Backend:** Express + AdminJS in `adminjs/` — unchanged, keep as-is
- **Original React pages:** `src/pages-react/` (moved there before migration starts — DO NOT modify)
- **New Astro pages:** `src/pages/`
- **React island components:** `src/islands/`
- **Layout:** `src/layouts/Layout.astro` (to be created in Phase 1)
- **State management:** No nanostores needed. `AuthContext` stays inside Auth and Dashboard islands. No cross-island shared state.
- **Admin:** `/admin` is an Astro pass-through only — Express handles it. Create `src/pages/admin/[...path].astro` that renders nothing.
- **`react-router-dom`:** Only inside Dashboard and Auth islands. All Astro pages use `<a href="...">`.

## Environment Variables

`VITE_API_URL` and `VITE_CMS_SNAPSHOT_BASE` must be renamed to `PUBLIC_API_URL` and `PUBLIC_CMS_SNAPSHOT_BASE` in all frontend source files during Phase 1. This is a breaking change if missed.

Files to update:
- `src/lib/api-config.ts` — `import.meta.env.VITE_API_URL` → `import.meta.env.PUBLIC_API_URL`
- `src/lib/content-api.ts` — `import.meta.env.VITE_CMS_SNAPSHOT_BASE` → `import.meta.env.PUBLIC_CMS_SNAPSHOT_BASE`
- `.env.local` — rename the keys
- `.env.example` — rename the keys

## Page Map

| Original file | New Astro file | Strategy |
|---|---|---|
| `src/pages-react/About.tsx` | `src/pages/about.astro` | Pure Astro |
| `src/pages-react/PrivacyPolicy.tsx` | `src/pages/privacy.astro` | Pure Astro |
| `src/pages-react/Terms.tsx` | `src/pages/terms.astro` | Pure Astro |
| `src/pages-react/NotFound.tsx` | `src/pages/404.astro` | Pure Astro |
| `src/pages-react/Home.tsx` | `src/pages/index.astro` | Astro + contact form island |
| `src/pages-react/Pricing.tsx` | `src/pages/pricing.astro` | Astro + accordion island |
| `src/pages-react/MeetingRooms.tsx` | `src/pages/meeting-rooms.astro` | Astro + expand/collapse island |
| `src/pages-react/VirtualOffice.tsx` | `src/pages/virtual-office.astro` | Astro + contact form island |
| `src/pages-react/Contact.tsx` | `src/pages/contact.astro` | Astro + contact form island |
| `src/pages-react/FAQ.tsx` | `src/pages/faq.astro` | Astro + search/accordion island |
| `src/pages-react/Blog.tsx` | `src/pages/blog.astro` | Astro + search/filter island |
| `src/pages-react/BlogDetail.tsx` | `src/pages/blog/[id].astro` | Astro + markdown island |
| `src/pages-react/Auth.tsx` | `src/pages/auth.astro` + `src/islands/AuthApp.tsx` | Full React island (`client:load`) |
| `src/pages-react/MeetingRoomBooking.tsx` | `src/pages/meeting-rooms/[roomSlug]/book.astro` + `src/islands/MeetingRoomBookingApp.tsx` | Full React island (`client:load`) |
| `src/pages-react/Dashboard.tsx` | `src/pages/dashboard/[...path].astro` + `src/islands/DashboardApp.tsx` | Full React island (`client:only="react"`) |
| (new) | `src/pages/admin/[...path].astro` | Pass-through — no content |

## Data Fetching Pattern for Astro Pages

In Astro frontmatter, use `fetchApi()` from `src/lib/content-api.ts` directly — NOT `useQuery` hooks (those are client-only).

Example pattern:
```astro
---
import { fetchApi } from '@/lib/content-api';
import Layout from '@/layouts/Layout.astro';
const data = await fetchApi('about-page');
---
<Layout title={data?.pageTitle} description={data?.metaDescription}>
  <!-- render data directly -->
</Layout>
```

The `fetchApi()` function already handles the snapshot-first strategy. In SSG mode, it runs at build time and reads from `public/cms/*.json` snapshots.

**Critical:** `public/cms/*.json` snapshots must exist before `astro build` runs. Build order is always: `npm run export:cms` (in `adminjs/`) → `astro build`.

## SEO Pattern

`useSeo()` from `src/lib/seo.ts` is client-only and must NOT be used in Astro pages. Replace with `<head>` content in `src/layouts/Layout.astro`:

```astro
---
interface Props {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
}
const { title, description, image, noindex = false } = Astro.props;
const siteName = 'City Focus Hub';
const pageTitle = title ? `${title} | ${siteName}` : siteName;
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{pageTitle}</title>
    <meta name="description" content={description || siteName} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}
    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

## Dashboard Island Pattern

Dashboard must be `client:only="react"` because it uses `window` at render time (Stripe, sessionStorage). It needs its own React providers:

```tsx
// src/islands/DashboardApp.tsx
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AuthProvider } from '@/context/AuthContext';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from '@/pages-react/Dashboard';

const queryClient = new QueryClient();

export default function DashboardApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard/*" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
```

## Admin Pass-Through Pattern

```astro
---
// src/pages/admin/[...path].astro
// Express handles /admin — this page intentionally renders nothing.
// Without this file, Astro's static build would catch /admin routes.
export const prerender = false;
---
```

Note: with `output: 'static'`, this needs special handling. The simplest approach: do NOT create an admin catch-all Astro page. Instead, configure Express to serve `/admin` before the static files fallback. Verify this works in Phase 5.

## Required Context Files

Re-read when starting major work or after context compaction:
- `ASTRO-MIGRATION-PLAYBOOK.md`
- `TECH_DEBT.md`

## Execution Strategy

1. Use architect (this agent) once to establish Astro config, layout, and one reference conversion (`About` → pure Astro).
2. Delegate all remaining static page conversions to `bulk-converter`.
3. Delegate interactive island builds to `island-builder`.
4. Use `critical-reviewer` only on Auth island, Dashboard island, and MeetingRoomBooking island.
5. Use `verifier` after each substantial batch and at the end.
6. Use `smoke-tester` after EVERY batch (static pages, islands, and final). Every implemented route must return 200 with no browser or server errors before moving to the next phase.

## Guardrails

- Do not spend Opus tokens on repetitive page-by-page conversions once a reference pattern exists.
- Preserve Tailwind classes and visual structure.
- Do not modify `src/pages-react/` — those are the originals.
- Do not touch `adminjs/` — backend is unchanged.
- For Astro pages, use `<a href="...">`, not `<Link>`.
- Remove old Vite scaffolding only AFTER `astro build` is verified stable.
- Hostinger quirk: after build, copy `dist/server/_astro/*.css` to `dist/client/_astro/`.

## Success Criteria

Migration is complete when:
- `src/pages-react/` contains all original React pages (untouched)
- `src/pages/` contains all new Astro pages
- `src/islands/` contains Auth, Dashboard, and MeetingRoomBooking islands
- `astro build` passes after `npm run export:cms`
- `/admin` still works (Express handles it)
- Old Vite setup removed from root `package.json`
