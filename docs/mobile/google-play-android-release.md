# Google Play Android Release Runbook

Last updated: 2026-06-02

Task: T-GPLAY-ANDROID-RELEASE-DOC

## 1. Current Repo Snapshot

| Field | Value |
|---|---|
| App display name | The Leadenhall Works |
| Platform | Expo React Native (TypeScript) |
| Mobile path | `mobile/` |
| Expo app config | `mobile/app.json` |
| EAS config | `mobile/eas.json` |
| Android package (application ID) | `com.leadenhallworks.mobile` |
| Expo slug | `the-leadenhall-works` |
| Current app version | `0.1.0` (in `app.json`) |
| Deep link scheme | `leadenhallworks://` |
| Dev API URL | `http://localhost:3001` (fallback in `app.json` `extra.apiUrl`) |
| Staging API URL | `https://staging-api.leadenhallworks.com` |
| Production API URL | **TODO** — pending Hostinger production URL (see `AGENT_RUNTIME.md`) |
| Android production build type | `app-bundle` (in `eas.json` `production.android.buildType`) |
| EAS autoIncrement | `true` for production profile |
| EAS projectId in `app.json` | **MISSING** — not yet configured (`extra.eas.projectId` absent) |
| Android assets | `mobile/assets/icon.png`, `mobile/assets/adaptive-icon.png`, `mobile/assets/splash.png` |
| Current release decision | **NO-GO** for production; **GO** for internal/non-production testing (per `final-signoff-summary.md`) |

Related docs in `docs/mobile/`:
- `release-readiness-preflight.md` — formal gates and QA baseline
- `app-store-review-notes.md` — reviewer explanation and metadata drafts
- `privacy-labels-data-safety.md` — data category drafts for Play Data Safety
- `final-signoff-summary.md` — final sign-off with blocker list

## 2. Step-by-Step Sequence

### 2a. Create a Clean Release Branch

Start from the current mobile working branch. Create a release branch for tracking:

```bash
git checkout -b release/android-v0.1.0
```

Tag after successful build if desired:

```bash
git tag android-v0.1.0-build1
```

### 2b. Resolve Production Blockers Before Production Submission

The following must be resolved before any production Play Store submission. These blockers are documented in `final-signoff-summary.md`.

- [ ] **Production API URL** — confirm with hosting provider (Hostinger); set as `EXPO_PUBLIC_API_URL` during EAS builds.
- [ ] **HTTPS-only auth** — ensure all mobile auth traffic uses HTTPS outside local dev.
- [ ] **Dedicated production `MOBILE_AUTH_ACCESS_TOKEN_SECRET`** — configure on backend; do not place in mobile code or EAS secrets under a name that would leak to mobile.
- [ ] **Backend rate-limit topology** — review for production multi-process deployment.
- [ ] **EAS projectId** — run `npx eas init` in `mobile/` and add `extra.eas.projectId` to `app.json`.
- [ ] **Stripe manual/test-mode validation** — complete end-to-end PaymentSheet test for booking and membership flows with webhook verification.
- [ ] **Real-device push delivery and notification-tap testing** — iOS and Android physical devices.
- [ ] **Privacy policy URL** and **support URL** — must be live, HTTPS, and linked in Play Console.
- [ ] **Operational contacts** — confirm escalation owners for access, payment, push, auth, and privacy runbooks.
- [ ] **Verkada gating** — no Phase 10-12 access-control scope released without external Verkada verification.

### 2c. Update / Confirm `mobile/app.json`

Edit `mobile/app.json` for each release:

```json
{
  "expo": {
    "version": "0.1.0",
    "android": {
      "versionCode": 1,
      "package": "com.leadenhallworks.mobile",
      "adaptiveIcon": {
        "backgroundColor": "#E7E3DA",
        "foregroundImage": "./assets/adaptive-icon.png"
      }
    },
    "extra": {
      "eas": {
        "projectId": "TODO-once-eas-init-complete"
      }
    }
  }
}
```

Rules:
- `version` — bump manually (e.g. `0.1.0` → `0.1.1`). The `autoIncrement: true` in `eas.json` production profile handles `versionCode` automatically, but if you need a specific `versionCode` for a given version, set it here.
- `android.versionCode` — only set explicitly if not relying on autoIncrement. EAS autoIncrement appends a build number; if you reset `version`, you may need to reset `versionCode` manually.
- `android.package` — must stay `com.leadenhallworks.mobile`. Do not change after first Play upload.
- `scheme` — `"leadenhallworks"` (already set).
- `extra.eas.projectId` — must be added once EAS project is initialized (see 2f).
- `icon`, `adaptiveIcon`, `splash` — confirm asset files exist before build.

### 2d. Set Production Environment Without Committing Secrets

Use environment variables for EAS builds — never commit secrets.

```bash
# Set before running EAS build
export EXPO_PUBLIC_API_URL=https://TODO-production-api.example
```

- `EXPO_PUBLIC_API_URL` is the **only** production env var needed at build time for the mobile app.
- Non-public secret build values (e.g. Sentry auth token) should use `eas secret:create` — **but** do not put backend secrets (`MOBILE_AUTH_ACCESS_TOKEN_SECRET`, Stripe secret keys, Verkada credentials) into EAS secrets scoped to mobile, as that would leak mobile-accessible secrets. Those belong on the backend only.
- Confirm that `EXPO_PUBLIC_API_URL` is consumed in the mobile codebase (e.g. via `process.env.EXPO_PUBLIC_API_URL` with a fallback to `extra.apiUrl` in `app.json`).

### 2e. Local QA Commands

Run from **repo root** (`city-focus-hub/`):

```bash
npm run lint
npm run check
npm run test
```

Run from **`mobile/`** directory:

```bash
npm run typecheck
npm run test:smoke
```

If backend, frontend, and e2e services are locally available:

```bash
# From repo root: start backend, MySQL, and root frontend if needed
# Then run Playwright e2e (see release-readiness-preflight.md for commands)
```

Refer to `docs/mobile/release-readiness-preflight.md` for the latest QA baseline and expected pass counts.

### 2f. Install / Login / Init EAS

Commands run from `mobile/`:

```bash
# Install dependencies if needed
npm install

# Login to Expo (interactive — prompts for credentials)
npx eas login

# Verify logged-in account
npx eas whoami

# Initialize EAS project (if projectId is missing from app.json)
# This creates the project on expo.dev and prints the projectId
npx eas init
```

After `eas init`, add the returned `projectId` to `app.json` under `expo.extra.eas.projectId`. Commit this change.

### 2g. Android Internal Build (APK Smoke Test)

```bash
export EXPO_PUBLIC_API_URL=https://staging-api.leadenhallworks.com
npx eas build --platform android --profile preview --non-interactive
```

- Profile `preview` builds an **APK** (per `eas.json`), installable directly on Android devices.
- Download the APK from the EAS build dashboard or via the printed QR/link.
- Sideload on a real Android device (enable "Install from unknown sources").

Test on the device:
- [ ] Login flow with a test member account
- [ ] Public screens (pricing, meeting rooms, blog, contact, legal)
- [ ] Booking PaymentSheet flow (Stripe test-mode keys)
- [ ] Membership PaymentSheet flow (Stripe test-mode keys)
- [ ] Push notification permission prompt and notification-tap navigation
- [ ] Deep links (`leadenhallworks://` scheme)
- [ ] Account deletion request/cancel flow
- [ ] Forced-update behavior (version-policy endpoint response)

### 2h. Production AAB Build

```bash
export EXPO_PUBLIC_API_URL=https://TODO-production-api.example
npx eas build --platform android --profile production --non-interactive
```

- Profile `production` builds an **Android App Bundle (AAB)** (per `eas.json` `buildType: "app-bundle"`).
- The AAB is for Play Console upload only — it cannot be sideloaded.
- Output: an `.aab` file downloadable from the EAS dashboard or printed URL.
- `autoIncrement: true` in the production profile auto-increments `versionCode` with each build.

### 2i. Google Play Console Setup

1. Go to [Google Play Console](https://play.google.com/console/).
2. Click **Create app**.
3. Fill in:
   - **App name**: The Leadenhall Works
   - **Default language**: English (United States) — or your primary locale
   - **App or game**: App
   - **Free or paid**: Free (the app is free; physical services are paid via Stripe)
4. Accept the declarations.
5. Once created, note the app's package name — must match `com.leadenhallworks.mobile`.

### 2j. Store Listing Checklist

Prepare in Google Play Console under **Store presence > Main store listing**:

| Field | Value / Guidance |
|---|---|
| Short description (80 char max) | TODO: Draft a concise tagline about The Leadenhall Works coworking |
| Full description | TODO: Write ~200-400 words describing features (public info, member dashboard, booking, membership, invoices, push notifications) |
| App icon | Upload `mobile/assets/icon.png` (512×512px, 32-bit PNG) |
| Feature graphic | TODO: Create 1024×500px PNG/JPG (no text overlay recommended by Play guidelines) |
| Phone screenshots | TODO: Capture screenshots of key screens — at least 2 on phone, 8 recommended. English text preferred. |
| Tablet screenshots | TODO: Capture if tablet support is desired (currently `supportsTablet: true` on iOS; similar Android support exists) |
| Category | Productivity (or Lifestyle) — TODO: Confirm best fit |
| Tags | Coworking, Meeting Rooms, Virtual Office — TODO: Add relevant tags |
| Contact email | TODO: Developer support email |
| Website | TODO: Production website URL |
| Phone | TODO: Optional; business phone |
| Privacy policy | TODO: Live HTTPS URL — must be linked before production |
| Review account details | Provide demo/review member credentials via Play Console **only**, never in this repository |

### 2k. App Content / Compliance Checklist

In Google Play Console under **App content**:

- **Privacy Policy**:
  - Must have a live HTTPS URL before production.
  - Content must match `docs/mobile/privacy-labels-data-safety.md` data-handling descriptions.
  - Include account deletion processing (30-day window), data categories (contact info, user IDs, purchase/payment references, push tokens, diagnostics).
  - Include third-party processors: Stripe, Expo (push), Sentry (if enabled), hosting provider.
  - State that personal data is not sold.

- **Data Safety**:
  - Fill the Play Console Data Safety form based on `docs/mobile/privacy-labels-data-safety.md`.
  - Likely collected: Name, Email address, Phone number (if collected), User IDs, Device IDs (push tokens), Purchase history, App interactions, Crash diagnostics (Sentry), Contact form messages.
  - Data shared: No user data shared (only with service processors for functional purposes — Stripe for payments, Expo for push).
  - Security: Data encrypted in transit; account deletion available.

- **App access**:
  - Declare any restricted permissions used. Current known scope: push notifications (`POST_NOTIFICATIONS` on Android 13+), internet. No SMS, camera, location, contacts, or photos.
  - If none, declare "No restricted permissions."

- **Ads**:
  - No ads unless added later. Select "No, my app does not contain ads" unless that changes.

- **Content rating**:
  - Complete the questionnaire. Expected: Everyone / General — no mature content.

- **Target audience**:
  - General audience (not exclusively children). No user data collection from children.

- **News apps**:
  - Not a news app.

- **COVID-19 / Health declarations**:
  - Not applicable.

- **Financial features**:
  - Only if the app provides financial services directly. Stripe is a payment processor for physical services, not a financial product; likely no special declaration needed. TODO: Confirm with legal.

- **Data deletion**:
  - Provide a data deletion URL or describe the in-app path: App Settings → Account Deletion request.
  - Ensure the Play Console Data Deletion section points to the in-app deletion flow or a web form URL.

### 2l. Payment Review Note

Stripe PaymentSheet is used for physical coworking services and meeting-room bookings. There are **no digital goods** unlocked by payments. The webhook/server remains the source of truth for payment status; the mobile client never optimistically marks items as paid/active.

If Google Play asks about in-app purchases / subscriptions during review, answer:
- The app does not offer in-app purchases through Google Play's billing system.
- Payments for physical services are processed by Stripe PaymentSheet, which is independent of Google Play.

### 2m. Testing Track Rollout

Upload the AAB to **Internal testing** first:

1. In Play Console: **Testing > Internal testing**.
2. Click **Create new release**.
3. Upload the `.aab` file from the production EAS build.
4. Fill in release name and release notes (e.g. "Initial internal test build").
5. Add testers (email addresses) under **Testers**.
6. Roll out and notify testers.
7. Test on real devices, fix issues, repeat with new builds.

After internal testing is stable:

1. Promote to **Closed testing** (optional, for broader feedback).
2. Then **Open testing** (optional, public beta).
3. Finally **Production** rollout — staged (e.g. 5% → 20% → 100%).

### 2n. Optional EAS Submit Path

If using EAS Submit for Play Console upload:

Configure service account authentication **outside** this repository — never commit service account JSON:

```bash
# Set EAS_SUBMIT_ANDROID_SERVICE_ACCOUNT_KEY as an EAS secret or local env var
# The value is the entire JSON key file content, base64-encoded

npx eas submit --platform android --profile production --latest
```

- `--latest` uses the most recent successful build.
- The submit profile in `eas.json` (`submit.production.android`) can be left as `{}` if the service account key is configured as an EAS secret; otherwise configure `serviceAccountKeyPath` but never commit that path to the repo.

### 2o. Post-Release Monitoring

After production release:

- [ ] **Crashes**: Monitor Sentry (if configured) for Android crash rates.
- [ ] **Backend logs**: Watch for auth, booking, membership, and push errors.
- [ ] **Stripe webhooks**: Verify payment confirmation, subscription renewal, and dispute events.
- [ ] **Push receipts**: Monitor Expo push receipt errors (invalid tokens, rate limits).
- [ ] **Play Vitals**: Check ANR rates, crash rates, and battery impact in Play Console.
- [ ] **Version-policy endpoint**: Confirm forced-update logic works with the live version.

## 3. Copy/Paste Command Block

Run these in order from the repo root, editing placeholders as needed:

```bash
# 1. Create release branch
git checkout -b release/android-v0.1.0

# 2. Install mobile dependencies
cd mobile && npm install && cd ..

# 3. Run QA from repo root
npm run lint
npm run check
npm run test

# 4. Run mobile QA
cd mobile && npm run typecheck && npm run test:smoke && cd ..

# 5. Login to EAS (interactive)
cd mobile && npx eas login && npx eas whoami && cd ..

# 6. Init EAS project if projectId missing (interactive)
cd mobile && npx eas init && cd ..

# Then add returned projectId to mobile/app.json under extra.eas.projectId

# 7. Internal APK smoke build
export EXPO_PUBLIC_API_URL=https://staging-api.leadenhallworks.com
cd mobile && npx eas build --platform android --profile preview --non-interactive && cd ..

# 8. Production AAB build
export EXPO_PUBLIC_API_URL=https://TODO-production-api.example
cd mobile && npx eas build --platform android --profile production --non-interactive && cd ..

# 9. EAS Submit (after service account configured outside repo)
cd mobile && npx eas submit --platform android --profile production --latest && cd ..
```

## 4. Google Play Console Form Answer Draft

| Section | Draft Answer | Status |
|---|---|---|
| App name | The Leadenhall Works | ✅ Confirmed |
| Default language | English (United States) | ✅ Confirmed |
| Type | App | ✅ Confirmed |
| Pricing | Free (physical coworking services paid separately via Stripe) | ✅ Confirmed |
| Package name | `com.leadenhallworks.mobile` | ✅ Confirmed |
| Category | Productivity (or Lifestyle — TODO: confirm) | ⚠️ TODO |
| Short description | TODO: Write one sentence (80 chars) | ❌ TODO |
| Full description | TODO: Write 200-400 word description | ❌ TODO |
| App icon | `mobile/assets/icon.png` | ✅ Asset ready |
| Feature graphic | TODO: Create 1024×500px graphic | ❌ TODO |
| Phone screenshots | TODO: Capture minimum 2 (8 recommended) | ❌ TODO |
| Privacy Policy URL | TODO: Live HTTPS URL | ❌ TODO |
| Support email / URL | TODO: Business/developer contact | ❌ TODO |
| Ads declaration | No ads | ✅ Confirmed |
| Content rating | Everyone / General | ⚠️ TODO: Confirm via questionnaire |
| Target audience | General / not exclusively children | ✅ Confirmed |
| Data Safety | Follow `docs/mobile/privacy-labels-data-safety.md` | ⚠️ Needs legal review |
| Data deletion | In-app: Settings > Account Deletion (processed within 30 days) | ✅ Documented |
| In-app purchases | None via Google Play billing. Stripe for physical services. | ⚠️ Note for review |
| Financial features declaration | Not a financial product — Stripe is payment processor. TODO: Confirm with legal. | ⚠️ TODO |

## 5. Release Checklist

### Pre-Build
- [ ] All QA commands pass (lint, check, test, typecheck, smoke).
- [ ] `mobile/app.json` version bumped and `android.versionCode` correct (or relying on autoIncrement).
- [ ] Production API URL confirmed and exportable as `EXPO_PUBLIC_API_URL`.
- [ ] EAS projectId added to `app.json` after `npx eas init`.
- [ ] Icon, adaptive-icon, splash assets confirmed present.

### Build
- [ ] Internal APK build succeeds (`eas build --profile preview --platform android`).
- [ ] Smoke-tested on real Android device (login, payments, push, deep links, account deletion, forced-update).
- [ ] Production AAB build succeeds (`eas build --profile production --platform android`).

### Play Console
- [ ] Google Play Console app created with package `com.leadenhallworks.mobile`.
- [ ] Store listing metadata complete (description, screenshots, feature graphic, icon).
- [ ] Privacy policy URL live and linked.
- [ ] Support email/URL entered.
- [ ] Data Safety form complete and matches app behavior.
- [ ] Content rating questionnaire complete.
- [ ] App access / permissions declared accurately.
- [ ] Ads set to "No".
- [ ] Data deletion path documented.

### Testing & Rollout
- [ ] AAB uploaded to Internal testing.
- [ ] Testers added and release rolled out.
- [ ] Issues found during internal testing fixed.
- [ ] Production rollout staged (5% → 20% → 100%).

### Production Blockers (External — from `final-signoff-summary.md`)
- [ ] Production API URL confirmed.
- [ ] Dedicated production `MOBILE_AUTH_ACCESS_TOKEN_SECRET` configured on backend.
- [ ] HTTPS-only mobile auth confirmed.
- [ ] Backend rate-limit topology reviewed for production.
- [ ] EAS projectId configured.
- [ ] Stripe manual/test-mode validation completed (booking + membership).
- [ ] Real-device push delivery and notification-tap tested.
- [ ] Operational contacts confirmed.
- [ ] Verkada gating enforced (no Phase 10-12 release without external verification).

## 6. Final Decision

**Production release: NO-GO** until all external blockers listed in §2b are resolved (see `docs/mobile/final-signoff-summary.md`).

**Internal Google Play testing (Internal track): GO** after local QA passes, internal APK build succeeds, and device smoke testing is complete. This is acceptable for non-production release-readiness validation.

**Important**: The Internal testing track does not require a full store listing, privacy policy URL, or production API URL. You can upload the AAB for internal testers once the EAS projectId is configured and the build succeeds. However, testers will need to use the staging API for testing purposes until the production API is ready.
