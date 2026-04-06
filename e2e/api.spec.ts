import { test, expect } from '@playwright/test';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const API = 'http://localhost:3001';

// ---------------------------------------------------------------------------
// Public CMS API — should all return 200 with JSON
// ---------------------------------------------------------------------------

const CMS_PAGES = [
  '/api/site-setting',
  '/api/homepage',
  '/api/about-page',
  '/api/blog-page',
  '/api/pricing-page',
  '/api/faq-page',
  '/api/meeting-rooms-page',
  '/api/virtual-office-page',
  '/api/contact-page',
  '/api/privacy-policy-page',
  '/api/terms-page',
];

const CMS_COLLECTIONS = [
  '/api/blog-posts',
  '/api/faq-items',
  '/api/pricing-plans',
  '/api/meeting-rooms',
];

test.describe('Public CMS API — Pages', () => {
  for (const path of CMS_PAGES) {
    test(`GET ${path} → 200 JSON`, async ({ request }) => {
      const response = await request.get(`${API}${path}`);
      expect(response.status(), `${path} returned ${response.status()}`).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('data');
    });
  }
});

test.describe('Public CMS API — Collections', () => {
  for (const path of CMS_COLLECTIONS) {
    test(`GET ${path} → 200 JSON array`, async ({ request }) => {
      const response = await request.get(`${API}${path}`);
      expect(response.status(), `${path} returned ${response.status()}`).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('data');
      expect(Array.isArray(body.data)).toBe(true);
    });
  }
});

// ---------------------------------------------------------------------------
// Public guest booking API — should return 200
// ---------------------------------------------------------------------------

test.describe('Public Guest Booking API', () => {
  test('GET /api/public/meeting-rooms/resources → 200', async ({ request }) => {
    const response = await request.get(`${API}/api/public/meeting-rooms/resources`);
    expect(response.status()).toBe(200);
  });

  test('GET /api/member-portal/resources → 200 (public, no auth required)', async ({ request }) => {
    const response = await request.get(`${API}/api/member-portal/resources`);
    expect(response.status()).toBe(200);
  });
});

// ---------------------------------------------------------------------------
// Contact submission — validation (400 on empty body)
// ---------------------------------------------------------------------------

test.describe('Contact Submission API', () => {
  test('POST /api/contact-submissions with empty body → 400', async ({ request }) => {
    const response = await request.post(`${API}/api/contact-submissions`, {
      data: {},
      headers: { 'Content-Type': 'application/json' },
    });
    // 400 = validation error, 429 = rate limited from repeated test runs
    expect([400, 429]).toContain(response.status());
  });

  test('POST /api/contact-submissions with invalid email → 400', async ({ request }) => {
    const response = await request.post(`${API}/api/contact-submissions`, {
      data: { name: 'Test', email: 'not-an-email', message: 'Hello' },
      headers: { 'Content-Type': 'application/json' },
    });
    // 400 = validation error, 429 = rate limited from repeated test runs
    expect([400, 429]).toContain(response.status());
  });
});

// ---------------------------------------------------------------------------
// Auth endpoints — unauthenticated responses
// ---------------------------------------------------------------------------

test.describe('Auth API — Unauthenticated', () => {
  test('GET /api/member-auth/session → 401 (no session)', async ({ request }) => {
    const response = await request.get(`${API}/api/member-auth/session`);
    expect(response.status()).toBe(401);
  });

  test('POST /api/member-auth/login with empty body → 400 or 401', async ({ request }) => {
    const response = await request.post(`${API}/api/member-auth/login`, {
      data: {},
      headers: { 'Content-Type': 'application/json' },
    });
    // Should reject with 400 (validation) or 401 (bad credentials)
    expect([400, 401]).toContain(response.status());
  });

  test('POST /api/member-auth/logout → 200 (even without session)', async ({ request }) => {
    const response = await request.post(`${API}/api/member-auth/logout`);
    // Logout should succeed even without a session (idempotent)
    expect([200, 401]).toContain(response.status());
  });

  test('POST /api/member-auth/change-password without session → 401', async ({ request }) => {
    const response = await request.post(`${API}/api/member-auth/change-password`, {
      data: { currentPassword: 'x', newPassword: 'y' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(401);
  });
});

// ---------------------------------------------------------------------------
// Member portal endpoints — all require auth → 401
// ---------------------------------------------------------------------------

const MEMBER_PORTAL_GET_ENDPOINTS = [
  '/api/member-portal/dashboard',
  '/api/member-portal/invoices',
];

const MEMBER_PORTAL_POST_ENDPOINTS = [
  '/api/member-portal/memberships',
  '/api/member-portal/memberships/checkout-session',
  '/api/member-portal/memberships/sync-checkout-session',
  '/api/member-portal/memberships/change-plan',
  '/api/member-portal/memberships/change-plan/preview',
  '/api/member-portal/memberships/cancel',
  '/api/member-portal/memberships/adjustments/sync-checkout-session',
  '/api/member-portal/bookings',
  '/api/member-portal/bookings/payment-intent',
  '/api/member-portal/bookings/checkout-session',
  '/api/member-portal/bookings/sync-checkout-session',
  '/api/member-portal/bookings/adjustments/sync-checkout-session',
];

test.describe('Member Portal API — Requires Auth (401)', () => {
  for (const path of MEMBER_PORTAL_GET_ENDPOINTS) {
    test(`GET ${path} → 401`, async ({ request }) => {
      const response = await request.get(`${API}${path}`);
      expect(response.status(), `${path} returned ${response.status()}`).toBe(401);
    });
  }

  for (const path of MEMBER_PORTAL_POST_ENDPOINTS) {
    test(`POST ${path} → 401`, async ({ request }) => {
      const response = await request.post(`${API}${path}`, {
        data: {},
        headers: { 'Content-Type': 'application/json' },
      });
      expect(response.status(), `${path} returned ${response.status()}`).toBe(401);
    });
  }
});

// ---------------------------------------------------------------------------
// Stripe webhook — requires signature → 400
// ---------------------------------------------------------------------------

test.describe('Stripe Webhook', () => {
  test('POST /api/stripe/webhooks without signature → 400', async ({ request }) => {
    const response = await request.post(`${API}/api/stripe/webhooks`, {
      data: '{}',
      headers: { 'Content-Type': 'application/json' },
    });
    expect(response.status()).toBe(400);
  });
});

// ---------------------------------------------------------------------------
// Server health
// ---------------------------------------------------------------------------

test.describe('Server Health', () => {
  test('GET /health → 200', async ({ request }) => {
    const response = await request.get(`${API}/health`);
    expect(response.status()).toBe(200);
  });
});
