# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> Frontend Pages — HTTP 200 & No Console Errors >> Blog: remote-work-best-practices-for-2026 → 200, no console errors
- Location: e2e/smoke.spec.ts:228:5

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8080/blog/remote-work-best-practices-for-2026
Call log:
  - navigating to "http://localhost:8080/blog/remote-work-best-practices-for-2026", waiting until "commit"

```

# Test source

```ts
  86  |   if (typeof value === 'number' && Number.isFinite(value)) {
  87  |     return String(value);
  88  |   }
  89  | 
  90  |   return null;
  91  | }
  92  | 
  93  | const BLOG_SLUGS = loadCmsCollection('blog-posts.json')
  94  |   .filter((post) => !post.featured)
  95  |   .map((post) => toSlug(post.slug) ?? toSlug(post.id))
  96  |   .filter((slug): slug is string => Boolean(slug));
  97  | 
  98  | // Room booking slugs: read from the built dist directory (populated from the resources DB at build time).
  99  | // Falls back to CMS snapshot if the dist directory doesn't have meeting room pages.
  100 | const ROOM_SLUGS = (() => {
  101 |   try {
  102 |     const meetingRoomsDir = path.join(process.cwd(), 'dist', 'meeting-rooms');
  103 |     const entries = readdirSync(meetingRoomsDir);
  104 |     const slugs = entries.filter((entry) => {
  105 |       if (entry === 'index.html' || entry.includes(' ')) return false;
  106 |       const entryPath = path.join(meetingRoomsDir, entry);
  107 |       return statSync(entryPath).isDirectory();
  108 |     });
  109 |     if (slugs.length > 0) return slugs;
  110 |   } catch {
  111 |     // dist not available — fall back to CMS snapshot
  112 |   }
  113 | 
  114 |   return loadCmsCollection('meeting-rooms.json')
  115 |     .map((room) => toSlug(room.slug) ?? toSlug(room.id))
  116 |     .filter((slug): slug is string => Boolean(slug));
  117 | })();
  118 | 
  119 | const PLAN_SLUGS = loadCmsCollection('pricing-plans.json')
  120 |   .map((plan) => toSlug(plan.slug) ?? toSlug(plan.id))
  121 |   .filter((slug): slug is string => Boolean(slug));
  122 | 
  123 | const DASHBOARD_SUBROUTES = [
  124 |   '/dashboard',
  125 |   '/dashboard/bookings',
  126 |   '/dashboard/billing',
  127 |   '/dashboard/invoices',
  128 |   '/dashboard/profile',
  129 |   '/dashboard/settings',
  130 | ];
  131 | 
  132 | // ---------------------------------------------------------------------------
  133 | // Helpers
  134 | // ---------------------------------------------------------------------------
  135 | 
  136 | /** Allowed console messages that are NOT real errors */
  137 | const IGNORED_CONSOLE_PATTERNS = [
  138 |   /favicon/i,
  139 |   /DevTools/i,
  140 |   /Download the React DevTools/i,
  141 |   /\[vite\]/i,
  142 |   /\[hmr\]/i,
  143 |   /astro/i,
  144 |   /fonts\.googleapis/i,
  145 |   /unsplash/i,
  146 |   /net::ERR/i,
  147 |   /hydrat/i,
  148 |   /\/uploads\//i,
  149 |   /Content Security Policy/i,
  150 |   /stripe/i,
  151 |   /401/i,
  152 |   /Unauthorized/i,
  153 |   /ERR_CONNECTION_REFUSED/i,
  154 |   /Failed to load resource/i,
  155 |   /React will try to recreate/i,
  156 |   /Suspense/i,
  157 |   /SameSite/i,
  158 |   /cookie/i,
  159 | ];
  160 | 
  161 | function isRealError(msg: ConsoleMessage): boolean {
  162 |   if (msg.type() !== 'error') return false;
  163 |   const text = msg.text();
  164 |   return !IGNORED_CONSOLE_PATTERNS.some((pattern) => pattern.test(text));
  165 | }
  166 | 
  167 | /**
  168 |  * Navigate to a page and collect console errors.
  169 |  * Uses 'commit' waitUntil because Astro 6 dev server streams HTML
  170 |  * in a way that can cause 'domcontentloaded' and 'networkidle' to hang.
  171 |  * After the initial response, we wait for the <body> to appear and then
  172 |  * give React islands time to hydrate.
  173 |  */
  174 | async function navigateAndCollectErrors(
  175 |   browserPage: import('@playwright/test').Page,
  176 |   url: string,
  177 | ): Promise<{ status: number; consoleErrors: string[] }> {
  178 |   const consoleErrors: string[] = [];
  179 | 
  180 |   browserPage.on('console', (msg) => {
  181 |     if (isRealError(msg)) {
  182 |       consoleErrors.push(`[${msg.type()}] ${msg.text()}`);
  183 |     }
  184 |   });
  185 | 
> 186 |   const response = await browserPage.goto(url, {
      |                                      ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:8080/blog/remote-work-best-practices-for-2026
  187 |     waitUntil: 'commit',
  188 |     timeout: 15_000,
  189 |   });
  190 | 
  191 |   // Wait for body to be present (page has loaded enough to have DOM)
  192 |   // Use state: 'attached' instead of default 'visible' because some pages
  193 |   // (like Dashboard with client:only="react") keep body hidden until JS runs
  194 |   await browserPage.waitForSelector('body', { timeout: 10_000, state: 'attached' });
  195 | 
  196 |   // Give React islands time to hydrate and async errors to surface
  197 |   await browserPage.waitForTimeout(POST_NAV_WAIT_MS);
  198 | 
  199 |   return {
  200 |     status: response?.status() ?? 0,
  201 |     consoleErrors,
  202 |   };
  203 | }
  204 | 
  205 | // ---------------------------------------------------------------------------
  206 | // Tests — Frontend pages: HTTP 200 + no console errors
  207 | // ---------------------------------------------------------------------------
  208 | 
  209 | test.describe('Frontend Pages — HTTP 200 & No Console Errors', () => {
  210 |   for (const page of STATIC_PAGES) {
  211 |     test(`${page.name} (${page.path}) → 200, no console errors`, async ({ page: browserPage }) => {
  212 |       const { status, consoleErrors } = await navigateAndCollectErrors(
  213 |         browserPage,
  214 |         `${FRONTEND_BASE}${page.path}`,
  215 |       );
  216 | 
  217 |       expect(status, `${page.path} returned ${status}`).toBe(200);
  218 |       expect(
  219 |         consoleErrors,
  220 |         `Console errors on ${page.path}:\n${consoleErrors.join('\n')}`,
  221 |       ).toHaveLength(0);
  222 |     });
  223 |   }
  224 | 
  225 |   // Blog detail pages
  226 |   for (const slug of BLOG_SLUGS) {
  227 |     const path = `/blog/${slug}`;
  228 |     test(`Blog: ${slug} → 200, no console errors`, async ({ page: browserPage }) => {
  229 |       const { status, consoleErrors } = await navigateAndCollectErrors(
  230 |         browserPage,
  231 |         `${FRONTEND_BASE}${path}`,
  232 |       );
  233 | 
  234 |       expect(status, `${path} returned ${status}`).toBe(200);
  235 |       expect(
  236 |         consoleErrors,
  237 |         `Console errors on ${path}:\n${consoleErrors.join('\n')}`,
  238 |       ).toHaveLength(0);
  239 |     });
  240 |   }
  241 | 
  242 |   // Meeting room booking pages
  243 |   for (const slug of ROOM_SLUGS) {
  244 |     const path = `/meeting-rooms/book?room=${encodeURIComponent(slug)}`;
  245 |     test(`Room booking: ${slug} → 200, no console errors`, async ({ page: browserPage }) => {
  246 |       const { status, consoleErrors } = await navigateAndCollectErrors(
  247 |         browserPage,
  248 |         `${FRONTEND_BASE}${path}`,
  249 |       );
  250 | 
  251 |       expect(status, `${path} returned ${status}`).toBe(200);
  252 |       expect(
  253 |         consoleErrors,
  254 |         `Console errors on ${path}:\n${consoleErrors.join('\n')}`,
  255 |       ).toHaveLength(0);
  256 |     });
  257 |   }
  258 | 
  259 |   // Pricing checkout pages — verify at least one real purchasable route per current plan
  260 |   for (const slug of PLAN_SLUGS) {
  261 |     const path = `/pricing/checkout?plan=${encodeURIComponent(slug)}`;
  262 |     test(`Pricing checkout: ${slug} → 200, no console errors`, async ({ page: browserPage }) => {
  263 |       const { status, consoleErrors } = await navigateAndCollectErrors(
  264 |         browserPage,
  265 |         `${FRONTEND_BASE}${path}`,
  266 |       );
  267 | 
  268 |       expect(status, `${path} returned ${status}`).toBe(200);
  269 |       expect(
  270 |         consoleErrors,
  271 |         `Console errors on ${path}:\n${consoleErrors.join('\n')}`,
  272 |       ).toHaveLength(0);
  273 |     });
  274 |   }
  275 | 
  276 |   // Dashboard static sub-routes generated by src/pages/dashboard/[...path].astro
  277 |   for (const path of DASHBOARD_SUBROUTES) {
  278 |     test(`Dashboard route ${path} → 200, no console errors`, async ({ page: browserPage }) => {
  279 |       const { status, consoleErrors } = await navigateAndCollectErrors(
  280 |         browserPage,
  281 |         `${FRONTEND_BASE}${path}`,
  282 |       );
  283 | 
  284 |       expect(status, `${path} returned ${status}`).toBe(200);
  285 |       expect(
  286 |         consoleErrors,
```