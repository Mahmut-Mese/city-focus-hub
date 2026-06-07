# Native Home Web-Parity Chain

**Plan ID:** PLAN_HOME_PARITY_CHAIN
**Created:** 2026-05-15
**Status:** SPEC_WRITE - Pending LEAD Approval

## Context And Constraints

This plan defines a phased implementation to bring the native mobile app Home screen to parity with the current web app landing page. The following constraints are explicit and non-negotiable:

- **Native React Native only; no WebView.** All UI must be native React Native components. No WebView-based content rendering.
- **Keep payment source-of-truth unchanged.** Stripe webhook remains the source of truth for all payment state. Mobile does not mutate payment state directly.
- **Mobile must not call Verkada directly.** All Verkada integration remains backend-only. Mobile never makes direct API calls to Verkada.
- **T164 was satisfied by user-approved LEAD governance override.** Phase 17 completed with production release blockers via user-accepted LEAD substitute audit on 2026-05-14.
- **This new plan is post-Phase-17 UI/content parity work and does not remove production blockers.** The production release gates (production API/secret, Stripe manual validation, real-device push testing, store metadata/privacy forms, operational contacts, Verkada external verification) remain in place.
- **Use same agent system:** LEAD plans/reviews, `mobile-normal-coder` implements simple/medium non-security tasks, `mobile-risky-coder`/`mobile-risky-coder-fallback` only for security/risky changes, `mobile-ops` verifies, reviewer/LEAD gates recorded.

## Implementation Order Recommendation

Execute phases in this order:

1. **Phase 18** (H180-H184): Discovery and content contract
2. **Phase 19** (H190-H193): Shared native parity primitives
3. **Phase 20** (H200-H208): Native home landing page sections
4. **Phase 21** (H210-H213): Public navigation and interactions
5. **Phase 22** (H220-H223): QA, polish, and release blocker preservation

---

## Phase 18: Home Parity Discovery And Content Contract

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| H180 | LEAD | medium | no | Phase 17 complete | Exact section inventory comparing web Home.tsx/siteContent to mobile HomeScreen | Section-by-section mapping document created |
| H181 | LEAD | medium | no | H180 | Native content mapping and fallback rules for homepage + site settings | Content contract defined with fallback hierarchy |
| H182 | OPS | simple | no | H180 | CMS/API endpoint shape verification for homepage/site-setting locally | Endpoint shape matches contract or blocker recorded |
| H183 | LEAD | medium | no | H180 | Native image/video handling decision | Explicit: images via React Native Image/ImageBackground; video CTA opens only external safe URL or remains disabled; no iframe/WebView |
| H184 | REVIEW/LEAD | medium | no | H181-H183 | Implementation slices and risk classification approval | Approved slices and risk classification recorded |

**Phase 18 DoD:** Section inventory complete, content contract defined, endpoint shape verified, image/video handling decision documented, and implementation slices approved by REVIEW/LEAD.

---

## Phase 19: Shared Native Parity Primitives

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| H190 | MOBILE-B | medium | no | H184 | Mobile homepage content types and parser helpers | TypeScript types and parsing utilities for homepage content |
| H191 | MOBILE-B | medium | no | H190 | Native image/card/chip/section/header primitives | Reusable UI primitives matching web component patterns |
| H192 | MOBILE-B | simple | no | H191 | Native icon abstraction using existing RN/text/simple symbols | Icon set using React Native built-ins; no new icon dependency unless LEAD approves |
| H193 | OPS | simple | no | H190-H192 | Typecheck/smoke verification | TypeScript passes, Expo starts without errors |

**Phase 19 DoD:** Content types and parsers implemented, reusable UI primitives created, icon abstraction defined, and typecheck/smoke verification passed.

---

## Phase 20: Native Home Landing Page Sections

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| H200 | MOBILE-A | medium | no | H193 | Header/logo/account/menu visual parity | Native header matching web layout and branding |
| H201 | MOBILE-A | medium | no | H200 | Hero image background overlay, CTA buttons, feature chips | Hero section with background image, overlay text, CTA buttons, and feature chips |
| H202 | MOBILE-A | medium | no | H200 | Services cards section matching web cards | Services cards with title, description, icon, and CTA |
| H203 | MOBILE-A | medium | no | H200 | About highlight section with benefits/buttons/image | About section with benefits list, buttons, and image |
| H204 | MOBILE-A | medium | no | H200 | Why-choose feature cards | Feature cards with icon, title, and description |
| H205 | MOBILE-A | medium | no | H200 | Testimonials cards with star display | Testimonials with name, text, star rating, and optional image |
| H206 | MOBILE-A | medium | no | H200 | Gallery section | Image gallery with horizontal scroll or grid layout |
| H207 | MOBILE-A | medium | no | H200 | Contact/visit/footer visual sections; contact submit display-first | Contact section, visit info, and footer; contact submit may be display-first unless wired safely through existing content-api submitContactSubmission |
| H208 | OPS | simple | no | H200-H207 | Mobile typecheck, smoke, simulator visual pass | TypeScript passes, Expo starts, simulator renders without crash |

**Phase 20 DoD:** All homepage sections implemented in native React Native, typecheck passes, and simulator smoke verification successful.

---

## Phase 21: Public Navigation And Interactions

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| H210 | MOBILE-B | medium | no | H208 | Menu/account buttons behavior; route to existing public/auth/member screens | Menu and account buttons navigate to existing screens without new auth logic |
| H211 | MOBILE-B | medium | no | H210 | CTA navigation parity for pricing/meeting rooms/virtual office/contact | CTA buttons navigate to existing public screens |
| H212 | MOBILE-A | medium | no | H211 | Optional contact form submission wiring using existing public endpoint | Contact form wired to existing submitContactSubmission; no secrets/logging |
| H213 | OPS | simple | no | H210-H212 | Navigation/contact smoke and regression checks | All navigation paths work, contact form submits without error |

**Phase 21 DoD:** Navigation behavior matches web, CTA routing works, optional contact form wired, and smoke checks pass.

---

## Phase 22: QA, Polish, And Release Blocker Preservation

| Task | Role | Complexity | Sec | Deps | Outputs | DoD |
|---|---|---|---|---|---|---|
| H220 | OPS | medium | no | H213 | Local backend + simulator run, screenshots/visual checklist against web reference | Visual comparison report with discrepancies documented |
| H221 | OPS | medium | no | H220 | Lint/check/root tests/mobile typecheck/mobile smoke/e2e as applicable | All static checks pass or blockers recorded |
| H222 | LEAD | medium | no | H221 | Final parity review with explicit production blockers unchanged | Parity review confirms UI/content parity; production blockers preserved |
| H223 | REVIEW/LEAD | medium | no | H222 | Phase acceptance decision | APPROVE_PHASE, APPROVE_WITH_BLOCKERS, or REJECT_PHASE recorded |

**Phase 22 DoD:** Visual checklist complete, all static checks pass, final parity review confirms UI/content parity, and phase acceptance decision recorded.

---

## Acceptance Criteria Summary

1. **Visual Parity:** Mobile home screen matches web landing page layout and content sections
2. **Native Only:** No WebView; all UI rendered via React Native components
3. **Content Contract:** Homepage content loaded from CMS with defined fallback rules
4. **Navigation Parity:** CTA buttons and menu navigate to existing public/auth/member screens
5. **Contact Form:** Optional submission wired to existing safe endpoint without secrets
6. **Static QA:** Lint, typecheck, smoke tests pass
7. **Production Blockers Preserved:** Release gates remain unchanged

---

## Non-Goals

- **No WebView:** WebView-based rendering is explicitly out of scope
- **No exact pixel-perfect CSS match:** Native components use React Native styling; visual parity is approximate
- **No payment/auth rewrites:** Payment source-of-truth and auth flow remain unchanged
- **No Verkada work:** Mobile does not call Verkada directly
- **No production submission:** This plan delivers UI/content parity only; production release blockers remain

---

## Risks And Blockers

| Risk/Blocker | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Image remote loading performance | Medium | Medium | Use React Native Image with caching; consider lazy loading for gallery |
| Simulator/device visual testing | High | Medium | Manual visual checklist; simulator smoke pass minimum |
| CMS shape mismatch | Low | High | H182 verifies endpoint shape; fallback rules in H181 |
| Contact submission validation | Low | Medium | Use existing submitContactSubmission with validation; no custom validation logic |
| Store production blockers still present | High | High | This plan does not remove Phase 17 production blockers; they remain in place |

---

## Agent Routing

| Task Complexity | Security | Agent | Model Pool |
|---|---|---|---|
| Simple | no | `mobile-normal-coder` | routerpool/openai/gpt-oss-120b |
| Medium | no | `mobile-normal-coder` | routerpool/openai/gpt-oss-120b |
| Hard or Security: yes | yes | `mobile-risky-coder` | google/antigravity-gemini-3.1-pro |
| Fallback (risky unavailable) | yes | `mobile-risky-coder-fallback` | openai/gpt-5.3-codex |
| Command-only verification | - | `mobile-ops` | MiniMax free |
| Final review/integration | - | `mobile-reviewer` | Copilot/Opus |

---

## Integration Notes

- This plan adds new tasks H180-H223. No existing Phase 17 tasks are modified.
- Production release remains NO-GO until external gates (production API/secret, Stripe validation, push testing, store forms, Verkada verification) are resolved.
- All tasks in this plan follow the same governance model: LEAD plans/reviews, normal coder implements, risky coder for security, OPS verifies, reviewer/LEAD gates.