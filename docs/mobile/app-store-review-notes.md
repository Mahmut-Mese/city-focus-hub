# App Store / Play Review Notes Draft

Last updated: 2026-05-14

This draft supports Phase 17 task T172. It is not a production submission by itself; final store metadata must be reviewed before upload.

## App Identity

- App name: The Leadenhall Works
- Platform: Native Expo React Native mobile app for iOS and Android
- Purpose: Public information and member self-service for a physical coworking/meeting-room venue
- Website/backend: Existing City Focus Hub / The Leadenhall Works platform

## Reviewer Explanation

The app provides native mobile access to The Leadenhall Works coworking services. Public users can view content such as pricing, meeting rooms, virtual office information, blog/legal pages, and contact information. Authenticated members can view their dashboard, bookings, membership information, invoices, profile/settings, notification preferences, and account deletion request status.

## Stripe / Payments Explanation

The app uses Stripe PaymentSheet for payment flows related to physical coworking services and meeting-room bookings. These are not digital goods or in-app content purchases. Payments relate to real-world coworking memberships, meeting-room bookings, and associated venue services.

The app does not unlock digital content through in-app purchase. Payment status is verified server-side and webhook-side; the mobile client does not optimistically mark bookings, invoices, or memberships as paid/active.

## Account / Authentication Notes

- Member authentication uses mobile API Bearer tokens.
- Refresh/session material is stored using Expo SecureStore.
- Logout clears local session state and best-effort unregisters push tokens.
- The app includes an in-app account deletion request/cancel flow. Account deletion requests are processed within 30 days.

## Push Notifications

The app may use push notifications for member service updates such as booking, payment, invoice, and membership-related notices. Push tokens are sent to the backend only after successful member authentication. Users can manage notification preferences in the app.

## Building Access / Verkada

The mobile app does not call Verkada directly. Any future building-access integration is backend-only and remains gated until external Verkada org/API/test-group verification is complete. No direct mobile-to-Verkada credentials or API calls are included in the app.

## Privacy / Data Handling Summary

The app may process account identifiers, contact information, booking/membership/invoice data, payment-related Stripe status references, push notification tokens/preferences, and account deletion requests. The app must not log tokens, session material, Stripe secrets, or client secrets.

## Review Account

A test review account is required before store submission. Do not include credentials in this repository. Provide credentials only through the store review console or approved secret-sharing process.

## Known External Release Gates

- Production API URL must be confirmed.
- Dedicated production mobile auth secret must be configured on backend.
- Stripe manual/test-mode validation must be completed.
- Real-device push delivery/tap testing must be completed.
- Store screenshots, privacy labels, Data Safety, support URL, and contact details must be finalized.