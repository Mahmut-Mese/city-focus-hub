import { defineConfig, devices } from '@playwright/test';

/**
 * City Focus Hub — E2E Smoke Test Configuration
 *
 * Expects:
 *   - MySQL running on 127.0.0.1:3306
 *   - Backend running on 127.0.0.1:3001  (cd adminjs && node src/start.js)
 *   - Frontend running on 127.0.0.1:8080 (npm run dev)
 *
 * Run: npm run test:e2e
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  timeout: 30_000,

  use: {
    baseURL: process.env.FRONTEND_URL || process.env.BASE_URL || 'http://127.0.0.1:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* DO NOT use webServer — we start servers manually so we can see their logs */
});
