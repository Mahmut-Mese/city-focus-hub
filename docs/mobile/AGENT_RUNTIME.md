# Mobile Agent Runtime

## Read This First

Every mobile-app agent must read this file before working. It is the shared runtime context for external agents and OpenCode agents.

## Project

- Existing app: City Focus Hub coworking platform.
- Mobile app display name for now: `The Leadenhall Works`.
- Native mobile app only. No WebView.
- Mobile stack: Expo React Native + TypeScript.
- Backend: existing Express/AdminJS/MySQL app in `adminjs/`.
- Payments: Stripe for physical coworking and meeting room services.
- Verkada: backend-only integration. Mobile never calls Verkada directly.

## Locked Decisions

- Deep link scheme: `leadenhallworks://`.
- Dev API URL: `http://localhost:3001`.
- Staging API URL placeholder: `https://staging-api.leadenhallworks.com`.
- Production API URL: pending Hostinger production URL.
- Push provider for v1: Expo Push through a provider abstraction.
- Membership payments: Stripe PaymentSheet + SetupIntent + server-side Subscription creation.
- Booking payments: Stripe PaymentSheet + PaymentIntent.
- Account deletion: in-app request, processed within 30 days.
- Job runtime: decided in Phase 0.
- Verkada path: Go / Partial / No-go decided in Phase 0.
- Integration mode: direct to current branch/main, one task at a time.
- Model/account rotation: OpenCode plugin-managed for configured free Codex, OpenRouter, and Antigravity accounts. Do not manually rotate accounts during normal work.
- Normal/easy code route: `routerpool/openai/gpt-oss-120b` via `mobile-normal-coder`. The local routerpool proxy rotates across configured OpenRouter keys automatically. OpenCode MiniMax free is available as OPS model or emergency fallback if the OpenRouter pool is unavailable.
- Complex/risky code route: `google/antigravity-gemini-3.1-pro` through `mobile-risky-coder`.
- Risky-coder fallback: `openai/gpt-5.3-codex` (OpenAI GPT-5.3 Codex) through `mobile-risky-coder-fallback` when Antigravity is unavailable. LEAD second-pass review still required.

## Brand Tokens

Extracted from the website Tailwind/CSS:

- Primary: `#141414` from `hsl(0 0% 8%)`.
- Primary foreground: `#FFFFFF`.
- Background: `#FFFFFF`.
- Foreground: `#141414`.
- Secondary / muted / accent: `#F5F5F5` from `hsl(0 0% 96%)`.
- Border / input: `#E5E5E5` from `hsl(0 0% 90%)`.
- Muted foreground: `#737373` from `hsl(0 0% 45%)`.
- Destructive: `#F03D3D` from `hsl(0 84% 60%)`.
- Radius: `12px`.
- Fonts: Inter/system sans; Playfair Display/Georgia available for editorial accents only.

## Output Frame Required

Every external agent response must use exactly this frame:

```txt
=== TASK_ID: TXXX ===
=== STATUS: COMPLETE | NEEDS_INPUT | SELF_CHECK_FAILED | RATE_LIMITED ===
=== FILES ===
--- BEGIN FILE: path/to/file.ext ---
<complete file content>
--- END FILE ---
=== NOTES ===
<short notes for REVIEWER, or "none">
=== SELF_CHECK ===
[x] Output includes only requested files
[x] File paths match the task
[x] Exports match CONTRACTS.md
[x] No secrets or credentials included
[x] No direct mobile-to-Verkada calls
=== END ===
```

If output is partial, set `STATUS: SELF_CHECK_FAILED` or `STATUS: RATE_LIMITED`. REVIEWER will not integrate partial output.

## Limit Detection

Routine provider/account limits are handled by the OpenCode plugin. The plugin should automatically rotate to the next configured account/model in the pool.

REVIEWER only treats quota text as an alert when the plugin cannot continue, all configured fallbacks are exhausted, or the output is pasted back from an external browser session.

The following case-insensitive strings are treated as hard-limit signals and logged to `QUOTA_LEDGER.md`. No audio alerts.

- `rate limit`
- `quota exceeded`
- `usage limit reached`
- `you've reached`
- `try again later`
- `429`
- `RATE_LIMIT_REACHED`
- `daily limit`

On hard-limit detection REVIEWER updates `QUOTA_LEDGER.md` as an incident log and, if the failed pool was risky-coder/Antigravity, routes pending risky tasks to `mobile-risky-coder-fallback` (`openai/gpt-5.3-codex`). Do not tell the user to manually rotate unless the plugin reports that no fallback remains.

## Agent Rules

- Do not add files not listed in the task.
- Do not change contracts unless the task explicitly says to update `CONTRACTS.md`.
- Do not use WebView.
- Do not put Stripe secret keys, Verkada credentials, refresh tokens, or session tokens in code or logs.
- Mobile code stores refresh/session material in SecureStore only.
- Mobile code uses Bearer tokens, not cookies.
- Backend cookie-authenticated web routes keep CSRF.
- Bearer-token mobile requests bypass CSRF only after token validation and must not fall back to cookie auth.
- OPS agents never edit files.

## Model Routing Rules

- Use `mobile-normal-coder` for simple/medium non-security tasks: screens, theme files, API wrappers, migrations, basic routes, docs.
- Use `mobile-risky-coder` for hard tasks or any task marked `Security: yes`: auth, token rotation, Stripe payment state, refund/account deletion side effects, Verkada, access-control reconciliation, scheduled jobs with race risk.
- If `mobile-risky-coder` is unavailable, route to `mobile-risky-coder-fallback` (`openai/gpt-5.3-codex`). LEAD second-pass review is still mandatory.
- If a normal task becomes risky during implementation, stop and return `STATUS: NEEDS_INPUT`; REVIEWER reroutes it to `mobile-risky-coder` (or fallback) or LEAD.
- RISKY-CODER and the fallback variant may write task-explicit files directly when edit permission is available, but Security: yes is not done until LEAD second-pass and REVIEWER approval. LEAD and REVIEWER must approve before integration.
- `mobile-ops` operates in `COMMAND_RUN`, `SPEC_WRITE`, or `E2E_RUN` modes. OPS may edit only files explicitly listed in the task; OPS never edits code files and never edits docs without a LEAD-provided outline.

## Done Means

A task is done only when:

- Output frame is complete.
- REVIEWER accepts it.
- LEAD has approved it if `Security: yes`.
- At the end of every phase, mobile-reviewer must run a repo-aware phase review and report findings to LEAD before the phase is marked complete.
- OPS verification passes or the failure is recorded as a blocker in `PHASE_STATUS.md`.
