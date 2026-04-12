/**
 * P1-66: Sentry error tracking — frontend initialisation.
 *
 * Initialised only when `PUBLIC_SENTRY_DSN` is set in the Astro build
 * environment (via `.env` or deploy config). When the DSN is empty the
 * init call is skipped and all Sentry API calls are no-ops.
 *
 * Import this module once at the top of your React entry points
 * (e.g. DashboardApp, AuthApp, MeetingRoomBookingApp) so Sentry is
 * ready before any component mounts.
 */
import * as Sentry from '@sentry/react';

const dsn = import.meta.env.PUBLIC_SENTRY_DSN || '';

let sentryInitialised = false;

export function initSentry() {
  if (sentryInitialised || !dsn) {
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.PUBLIC_SENTRY_ENVIRONMENT || import.meta.env.MODE || 'development',
    tracesSampleRate: import.meta.env.PROD ? 0.2 : 1.0,
    // Avoid capturing expected navigation / auth errors
    beforeSend(event) {
      const message = event?.exception?.values?.[0]?.value ?? '';
      if (/401|403|session expired/i.test(message)) {
        return null;
      }
      return event;
    },
  });

  sentryInitialised = true;
}

export { Sentry };
