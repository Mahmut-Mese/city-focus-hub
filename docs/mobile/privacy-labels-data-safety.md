# Privacy Labels / Data Safety Draft

Last updated: 2026-05-14

This draft supports Phase 17 task T173. It is a preparation document for App Store Privacy Nutrition Labels and Google Play Data Safety. Final answers must be reviewed against the production build, production privacy policy, analytics/crash tooling, and store-console wording before submission.

## Scope

App: The Leadenhall Works native Expo React Native app.

Backend: Existing Express/AdminJS/MySQL platform.

Payments: Stripe PaymentSheet for physical coworking services and meeting-room bookings. Stripe webhooks/server state remain payment source of truth.

Push: Expo push through backend/provider abstraction.

Verkada/building access: mobile app does not call Verkada directly; future access integration is backend-only and gated.

## Data Categories Likely Collected

### Contact Info

Examples:
- Name
- Email address
- Phone number if collected by account/profile/contact flows

Likely purposes:
- Account management
- Customer support/contact requests
- Booking and membership administration
- Account deletion request handling

### User Identifiers

Examples:
- Internal user/member ID
- Session ID references
- Push token/device registration records

Likely purposes:
- Authentication/session management
- Security/fraud prevention
- Push notification routing
- Account and membership operations

### Purchases / Payment-Related Information

Examples:
- Stripe customer/subscription/payment status references
- Invoice references and hosted invoice URLs
- Booking payment status references

Notes:
- The app should not store or log Stripe secret keys.
- Payment card details are handled by Stripe/PaymentSheet, not stored by the mobile app.
- Payment state is confirmed server-side/webhook-side.

Likely purposes:
- Payment processing
- Membership and booking administration
- Fraud/security and recordkeeping

### App Activity / Product Interaction

Examples:
- Dashboard, booking, membership, invoice, notification-preference, and account-deletion interactions if logged by backend/app telemetry
- Crash/error diagnostics if Sentry is enabled in production

Likely purposes:
- App functionality
- Diagnostics
- Product/service improvement

### User Content / Requests

Examples:
- Contact form messages
- Booking purpose/notes
- Account deletion request reason/notes if collected

Likely purposes:
- Customer support
- Booking fulfilment
- Legal/compliance and account deletion processing

### Device or Other IDs

Examples:
- Expo push token
- Device/platform name sent during mobile login/register
- Sentry/device diagnostic identifiers if enabled

Likely purposes:
- Push notifications
- Security/session management
- Diagnostics

## Sensitive Data / Location / Contacts / Photos

Current app scope does not intentionally collect:
- Precise location
- Contacts/address book
- Photos/videos from user library
- Health/fitness data
- Browsing history
- Direct government ID data

Confirm this again before store submission.

## Data Sharing / Third Parties

Likely processors/service providers:
- Stripe: payment processing for physical services
- Expo: push notification delivery infrastructure
- Sentry: crash/error diagnostics if enabled in production
- Hosting/database/email providers used by backend operations

The app should not sell personal data. Confirm final legal wording before store submission.

## Security Practices

- Mobile refresh/session material uses Expo SecureStore.
- Mobile uses Bearer tokens for API calls.
- Mobile must not log tokens, refresh tokens, session IDs, Stripe secrets, client secrets, or Verkada credentials.
- Backend cookie-authenticated web routes retain CSRF protections; mobile Bearer path bypasses CSRF only after token validation.
- Mobile does not call Verkada directly.

## Account Deletion

The app includes an in-app account deletion request/cancel flow. Requests are processed within 30 days. Backend deletion processing revokes mobile sessions, refresh tokens, member sessions, and push tokens.

## Store Form Draft Checklist

Before final submission, confirm:

- [ ] Production privacy policy URL is live and matches app behavior.
- [ ] Production support/contact URL is live.
- [ ] Stripe production/test-mode behavior has been validated.
- [ ] Push notification permission prompt and preferences match store disclosure.
- [ ] Sentry/diagnostics configuration is final and disclosed if enabled.
- [ ] No unexpected analytics SDKs are included.
- [ ] No WebView-based data collection is introduced.
- [ ] No direct mobile-to-Verkada calls or credentials are included.
- [ ] App Store and Play Store answers align with this draft and legal review.