# Phase 18 Home Parity Decision

**Last updated:** 2026-05-15
**Verdict:** APPROVE_PHASE_18_WITH_NOTES

---

## Task Completion Status

| Task | Status | Notes |
|------|--------|-------|
| H180 | COMPLETE | Section inventory created via HOME_PARITY_SPEC.md |
| H181 | COMPLETE | Content mapping and fallback rules defined in HOME_PARITY_SPEC.md |
| H182 | COMPLETE | Endpoint verification passed - see H182 result summary below |
| H183 | COMPLETE | Native image/video handling decision documented in HOME_PARITY_SPEC.md |

---

## H182 Verification Result Summary

**Endpoints verified locally:**

- **Homepage endpoint:** `GET /api/homepage?populate=*&status=published`
  - Status: 200 OK
  - Top-level key: `data`
  - Fields present: hero, featureChips, servicesEyebrow, servicesKicker, services, aboutHighlight, whyChoose fields/items, testimonials fields/items, gallery fields/images, contactForm, visit labels/hours/map label

- **Site-setting endpoint:** `GET /api/site-setting?status=published`
  - Status: 200 OK
  - Top-level key: `data`
  - Fields present: siteName, tagline, contactEmail, contactPhone, address, navigation, footer, socialLinks

**Notes:**
- Local CMS content includes test artifacts (e.g., strings with `2` prefixes/suffixes)
- `videoUrl` may be an iframe embed string; mobile must normalize/extract safe URL or disable CTA per H183

---

## Implementation Slices Approved

All slices from HOME_PARITY_SPEC.md are approved for implementation:

| Slice | Description | Risk Level | Security |
|-------|-------------|------------|----------|
| A | Types / Parser / Defaults | Low | None |
| B | Presentational Primitives | Low | None |
| C | Hero / Header | Medium | None |
| D | Services / About / Features / Testimonials / Gallery | Medium | None |
| E | Contact / Visit / Footer + Optional Contact Submit | Medium | None (uses existing safe endpoint) |
| F | Navigation / Menu / CTA Interactions | Medium | None |
| G | QA / Visual Checklist | Low | None |

---

## Risk Classification

### Security: No (Route to mobile-normal-coder)

The following tasks are classified as non-security and should route to `mobile-normal-coder` unless code implementation introduces auth/payment/session/Verkada behavior changes:

- H190-H213 (all Phase 19-21 tasks)

### Security: No (Contact Submission Specific)

Task H212 (contact form submission) is classified as Security: No ONLY if:
- Uses existing `submitContactSubmission` public endpoint
- Does not log secrets/tokens
- Does not introduce new auth/session logic

### Security: Yes (Stop and Reroute)

Any implementation that introduces the following must STOP immediately and reroute to `mobile-risky-coder` (or fallback) + LEAD review:
- Changes to authentication logic
- Changes to payment flow
- Changes to session management
- Changes to Verkada integration
- New access-control logic

---

## Explicit Decisions

### 1. Fallback Defaults
Use fallback defaults for all missing/invalid content per H181 fallback rules. Invalid or missing content must fall back to siteContent.ts-equivalent defaults, NOT blank screens.

### 2. Preserve Local CMS Values
Preserve local CMS values even if test-ish (e.g., strings with `2` prefixes/suffixes). Parity should reflect backend content. Content cleanup is a CMS/editorial responsibility, not an app code blocker.

### 3. Video URL Handling
Normalize iframe video strings to external URL when safe. If URL cannot be extracted or is unsafe, disable video CTA. No WebView or iframe embedding.

### 4. Existing Routes Only
Use existing routes only. Do not implement new auth logic.

---

## Phase 19 Authorization

**Authorized to start:** H190-H193

These tasks may proceed with routing to `mobile-normal-coder`:
- H190: Mobile homepage content types and parser helpers
- H191: Native image/card/chip/section/header primitives
- H192: Native icon abstraction
- H193: OPS typecheck/smoke verification

---

## Production Blockers

**Unchanged.** The following production release gates remain in place:
- Production API URL and secret
- Stripe manual validation
- Real-device push testing
- Store metadata/privacy forms
- Operational contacts
- Verkada external verification

This Phase 18 approval delivers UI/content parity only and does not remove production blockers.

---

## Notes

- Content with test artifacts (e.g., `2` prefixes/suffixes) is acceptable for parity; CMS/editorial will clean up separately
- Contact form submission is optional wiring per H207 - display-first acceptable
- All navigation must use existing routes; no new auth logic