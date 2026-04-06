import { test, expect, type ConsoleMessage } from '@playwright/test';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const FRONTEND_BASE = 'http://localhost:4321';
const BACKEND_BASE = 'http://localhost:3001';

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

// Dynamic blog pages — slugs from public/cms/blog-posts.json
const BLOG_SLUGS = [
  'building-community-in-your-workspace23',
  'the-future-of-coworking-in-2026-and-beyond',
  'choosing-the-right-membership-for-your-needs',
  'remote-work-best-practices-for-2026',
  'how-flexible-workspaces-help-you-stay-productive',
];

// Dynamic meeting room booking pages — slugs from public/cms/meeting-rooms.json
const ROOM_SLUGS = [
  'meeting-suite',
  'open-lounge1',
  'focus-room',
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
    const path = `/meeting-rooms/${slug}/book`;
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
// Tests — Backend server health
// ---------------------------------------------------------------------------

test.describe('Backend Server Health', () => {
  test('GET /health → 200', async ({ request }) => {
    const response = await request.get(`${BACKEND_BASE}/health`);
    expect(response.status()).toBe(200);
  });
});
