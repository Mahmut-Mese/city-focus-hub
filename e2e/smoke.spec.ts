import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { test, expect, type ConsoleMessage } from '@playwright/test';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const FRONTEND_BASE = process.env.FRONTEND_URL || process.env.BASE_URL || 'http://127.0.0.1:8080';
const BACKEND_BASE = process.env.BACKEND_URL || 'http://127.0.0.1:3001';

function loadDotEnvValue(filePath: string, key: string): string | null {
  try {
    const content = readFileSync(filePath, 'utf-8');

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('#')) {
        continue;
      }

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex === -1) {
        continue;
      }

      const currentKey = trimmed.slice(0, separatorIndex).trim();
      if (currentKey !== key) {
        continue;
      }

      return trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');
    }
  } catch {
    return null;
  }

  return null;
}

const ADMIN_ENV_PATH = path.join(process.cwd(), 'adminjs', '.env');
const ADMIN_EMAIL = process.env.ADMINJS_EMAIL || loadDotEnvValue(ADMIN_ENV_PATH, 'ADMINJS_EMAIL') || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMINJS_PASSWORD || loadDotEnvValue(ADMIN_ENV_PATH, 'ADMINJS_PASSWORD') || 'admin123';
const ADMIN_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || loadDotEnvValue(ADMIN_ENV_PATH, 'SESSION_COOKIE_NAME') || 'adminjs';

/** Time to wait after navigation for React islands to hydrate + console errors to surface */
const POST_NAV_WAIT_MS = 3_000;

// ---------------------------------------------------------------------------
// Static pages (Astro SSG)
// ---------------------------------------------------------------------------
const STATIC_PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/about', name: 'About' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/contact', name: 'Contact' },
  { path: '/faq', name: 'FAQ' },
  { path: '/blog', name: 'Blog' },
  { path: '/meeting-rooms', name: 'Meeting Rooms' },
  { path: '/virtual-office', name: 'Virtual Office' },
  { path: '/terms', name: 'Terms' },
  { path: '/privacy', name: 'Privacy' },
  { path: '/auth', name: 'Auth' },
  { path: '/dashboard', name: 'Dashboard (SPA shell)' },
];

type CmsRecord = Record<string, unknown>;

function loadCmsCollection(fileName: string): CmsRecord[] {
  const filePath = path.join(process.cwd(), 'public', 'cms', fileName);
  const raw = readFileSync(filePath, 'utf-8');
  const payload = JSON.parse(raw) as { data?: unknown };

  if (!Array.isArray(payload.data)) {
    throw new Error(`Expected ${fileName} to contain a data array.`);
  }

  return payload.data.filter((entry): entry is CmsRecord => typeof entry === 'object' && entry !== null);
}

function toSlug(value: unknown): string | null {
  if (typeof value === 'string' && value.trim()) {
    return value.trim();
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }

  return null;
}

const BLOG_SLUGS = loadCmsCollection('blog-posts.json')
  .filter((post) => !post.featured)
  .map((post) => toSlug(post.slug) ?? toSlug(post.id))
  .filter((slug): slug is string => Boolean(slug));

// Room booking slugs: read from the built dist directory (populated from the resources DB at build time).
// Falls back to CMS snapshot if the dist directory doesn't have meeting room pages.
const ROOM_SLUGS = (() => {
  try {
    const meetingRoomsDir = path.join(process.cwd(), 'dist', 'meeting-rooms');
    const entries = readdirSync(meetingRoomsDir);
    const slugs = entries.filter((entry) => {
      if (entry === 'index.html' || entry.includes(' ')) return false;
      const entryPath = path.join(meetingRoomsDir, entry);
      return statSync(entryPath).isDirectory();
    });
    if (slugs.length > 0) return slugs;
  } catch {
    // dist not available — fall back to CMS snapshot
  }

  return loadCmsCollection('meeting-rooms.json')
    .map((room) => toSlug(room.slug) ?? toSlug(room.id))
    .filter((slug): slug is string => Boolean(slug));
})();

const PLAN_SLUGS = loadCmsCollection('pricing-plans.json')
  .map((plan) => toSlug(plan.slug) ?? toSlug(plan.id))
  .filter((slug): slug is string => Boolean(slug));

const DASHBOARD_SUBROUTES = [
  '/dashboard',
  '/dashboard/bookings',
  '/dashboard/billing',
  '/dashboard/invoices',
  '/dashboard/profile',
  '/dashboard/settings',
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Allowed console messages that are NOT real errors */
const IGNORED_CONSOLE_PATTERNS = [
  /favicon/i,
  /DevTools/i,
  /Download the React DevTools/i,
  /\[vite\]/i,
  /\[hmr\]/i,
  /astro/i,
  /fonts\.googleapis/i,
  /unsplash/i,
  /net::ERR/i,
  /hydrat/i,
  /\/uploads\//i,
  /Content Security Policy/i,
  /stripe/i,
  /401/i,
  /Unauthorized/i,
  /ERR_CONNECTION_REFUSED/i,
  /Failed to load resource/i,
  /React will try to recreate/i,
  /Suspense/i,
  /SameSite/i,
  /cookie/i,
];

function isRealError(msg: ConsoleMessage): boolean {
  if (msg.type() !== 'error') return false;
  const text = msg.text();
  return !IGNORED_CONSOLE_PATTERNS.some((pattern) => pattern.test(text));
}

/**
 * Navigate to a page and collect console errors.
 * Uses 'commit' waitUntil because Astro 6 dev server streams HTML
 * in a way that can cause 'domcontentloaded' and 'networkidle' to hang.
 * After the initial response, we wait for the <body> to appear and then
 * give React islands time to hydrate.
 */
async function navigateAndCollectErrors(
  browserPage: import('@playwright/test').Page,
  url: string,
): Promise<{ status: number; consoleErrors: string[] }> {
  const consoleErrors: string[] = [];

  browserPage.on('console', (msg) => {
    if (isRealError(msg)) {
      consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
    }
  });

  const response = await browserPage.goto(url, {
    waitUntil: 'commit',
    timeout: 15_000,
  });

  // Wait for body to be present (page has loaded enough to have DOM)
  // Use state: 'attached' instead of default 'visible' because some pages
  // (like Dashboard with client:only="react") keep body hidden until JS runs
  await browserPage.waitForSelector('body', { timeout: 10_000, state: 'attached' });

  // Give React islands time to hydrate and async errors to surface
  await browserPage.waitForTimeout(POST_NAV_WAIT_MS);

  return {
    status: response?.status() ?? 0,
    consoleErrors,
  };
}

// ---------------------------------------------------------------------------
// Tests — Frontend pages: HTTP 200 + no console errors
// ---------------------------------------------------------------------------

test.describe('Frontend Pages — HTTP 200 & No Console Errors', () => {
  for (const page of STATIC_PAGES) {
    test(`${page.name} (${page.path}) → 200, no console errors`, async ({ page: browserPage }) => {
      const { status, consoleErrors } = await navigateAndCollectErrors(
        browserPage,
        `${FRONTEND_BASE}${page.path}`,
      );

      expect(status, `${page.path} returned ${status}`).toBe(200);
      expect(
        consoleErrors,
        `Console errors on ${page.path}:\n${consoleErrors.join('\n')}`,
      ).toHaveLength(0);
    });
  }

  // Blog detail pages
  for (const slug of BLOG_SLUGS) {
    const path = `/blog/${slug}`;
    test(`Blog: ${slug} → 200, no console errors`, async ({ page: browserPage }) => {
      const { status, consoleErrors } = await navigateAndCollectErrors(
        browserPage,
        `${FRONTEND_BASE}${path}`,
      );

      expect(status, `${path} returned ${status}`).toBe(200);
      expect(
        consoleErrors,
        `Console errors on ${path}:\n${consoleErrors.join('\n')}`,
      ).toHaveLength(0);
    });
  }

  // Meeting room booking pages
  for (const slug of ROOM_SLUGS) {
    const path = `/meeting-rooms/book?room=${encodeURIComponent(slug)}`;
    test(`Room booking: ${slug} → 200, no console errors`, async ({ page: browserPage }) => {
      const { status, consoleErrors } = await navigateAndCollectErrors(
        browserPage,
        `${FRONTEND_BASE}${path}`,
      );

      expect(status, `${path} returned ${status}`).toBe(200);
      expect(
        consoleErrors,
        `Console errors on ${path}:\n${consoleErrors.join('\n')}`,
      ).toHaveLength(0);
    });
  }

  // Pricing checkout pages — verify at least one real purchasable route per current plan
  for (const slug of PLAN_SLUGS) {
    const path = `/pricing/checkout?plan=${encodeURIComponent(slug)}`;
    test(`Pricing checkout: ${slug} → 200, no console errors`, async ({ page: browserPage }) => {
      const { status, consoleErrors } = await navigateAndCollectErrors(
        browserPage,
        `${FRONTEND_BASE}${path}`,
      );

      expect(status, `${path} returned ${status}`).toBe(200);
      expect(
        consoleErrors,
        `Console errors on ${path}:\n${consoleErrors.join('\n')}`,
      ).toHaveLength(0);
    });
  }

  // Dashboard static sub-routes generated by src/pages/dashboard/[...path].astro
  for (const path of DASHBOARD_SUBROUTES) {
    test(`Dashboard route ${path} → 200, no console errors`, async ({ page: browserPage }) => {
      const { status, consoleErrors } = await navigateAndCollectErrors(
        browserPage,
        `${FRONTEND_BASE}${path}`,
      );

      expect(status, `${path} returned ${status}`).toBe(200);
      expect(
        consoleErrors,
        `Console errors on ${path}:\n${consoleErrors.join('\n')}`,
      ).toHaveLength(0);
    });
  }

  // 404 page should return 404
  test('404 page → returns 404 status', async ({ page: browserPage }) => {
    const response = await browserPage.goto(`${FRONTEND_BASE}/this-page-does-not-exist`, {
      waitUntil: 'commit',
      timeout: 15_000,
    });

    expect(response).not.toBeNull();
    expect(response!.status()).toBe(404);
  });
});

// ---------------------------------------------------------------------------
// Tests — Admin login page
// ---------------------------------------------------------------------------

test.describe('Admin Panel', () => {
  test('/admin → renders login page', async ({ page: browserPage }) => {
    const { status, consoleErrors } = await navigateAndCollectErrors(
      browserPage,
      `${BACKEND_BASE}/admin`,
    );

    expect(status, `/admin returned ${status}`).toBe(200);
    await expect(browserPage.locator('input[type="password"]')).toHaveCount(1);
    await expect(
      browserPage.locator('input[type="email"], input[name="email"], input[name="login"]')
        .first(),
    ).toBeVisible();
    expect(
      consoleErrors,
      `Console errors on /admin:\n${consoleErrors.join('\n')}`,
    ).toHaveLength(0);
  });

  test('/admin → login succeeds with configured admin credentials', async ({
    page: browserPage,
    context,
  }) => {
    const { status, consoleErrors } = await navigateAndCollectErrors(
      browserPage,
      `${BACKEND_BASE}/admin`,
    );

    expect(status, `/admin returned ${status}`).toBe(200);

    const emailInput = browserPage.locator('input[name="email"]').first();
    const passwordInput = browserPage.locator('input[name="password"]').first();
    const submitButton = browserPage.getByRole('button', { name: 'Log in' });

    await emailInput.fill(ADMIN_EMAIL);
    await passwordInput.fill(ADMIN_PASSWORD);
    await expect(emailInput).toHaveValue(ADMIN_EMAIL);
    await expect(passwordInput).toHaveValue(ADMIN_PASSWORD);

    await submitButton.click();

    await browserPage.waitForTimeout(1_000);

    const cookies = await context.cookies(BACKEND_BASE);
    expect(cookies.some((cookie) => cookie.name === ADMIN_COOKIE_NAME)).toBe(true);
    await expect(browserPage.locator('input[type="password"]')).toHaveCount(0);
    await expect(browserPage.getByRole('heading', { name: 'Content Manager' })).toBeVisible();
    expect(
      consoleErrors,
      `Console errors on authenticated /admin flow:\n${consoleErrors.join('\n')}`,
    ).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Tests — Backend server health
// ---------------------------------------------------------------------------

test.describe('Backend Server Health', () => {
  test('GET /health → 200', async ({ request }) => {
    const response = await request.get(`${BACKEND_BASE}/health`);
    expect(response.status()).toBe(200);
  });
});
