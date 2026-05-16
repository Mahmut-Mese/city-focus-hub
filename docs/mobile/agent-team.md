# Mobile Agent Team

## Purpose

Coordinate a mostly-free multi-agent workflow to build the native mobile app while protecting paid model budget and avoiding uncontrolled drift.

This project uses OpenCode plugin-managed model pools plus optional external browser agents. Free Codex, OpenRouter, and Antigravity accounts are configured in the OpenCode plugin, so provider/account rotation is automatic when a configured account hits a limit. OpenCode reviews and integrates complete outputs into the repo.

## Roles

| Role | Tool / Model | Responsibility | Writes Code |
|---|---|---|---|
| LEAD | Free ChatGPT 5.5 (`openai/gpt-5.5`) | Architecture, task spec refinement, complex logic, mandatory second-pass review for security-critical work, final arbiter on REVIEWER rejections, provides outlines for OPS spec writing | Yes |
| REVIEWER | OpenCode / Claude Opus via Copilot | Repo-aware review, rejects problematic drafts, escalates disputes to LEAD, integrates after clean review or LEAD approval | Yes, only during integration/fixes |
| NORMAL-CODER | OpenCode plugin pool: routerpool/openai/gpt-oss-120b with local OpenRouter key rotation | Normal/easy backend and mobile tasks | Yes, only files explicitly listed in task |
| RISKY-CODER | OpenCode plugin pool: `google/antigravity-gemini-3.1-pro` | Complex, risky, payment, auth, access-control drafts | Drafts only |
| RISKY-CODER-FALLBACK | `openai/gpt-5.3-codex` | Same as RISKY-CODER when Antigravity is unavailable | Drafts only |
| BACKEND-A | Routed through NORMAL-CODER or RISKY-CODER by task complexity | Backend service drafts | Drafts only |
| BACKEND-B | Routed through NORMAL-CODER or RISKY-CODER by task complexity | Backend API route and migration drafts | Drafts only |
| MOBILE-A | Routed through NORMAL-CODER or RISKY-CODER by task complexity | Mobile screens | Drafts only |
| MOBILE-B | Routed through NORMAL-CODER or RISKY-CODER by task complexity | Mobile infra: API client, auth provider, navigation, push, theme | Drafts only |
| OPS | OpenCode MiniMax free | Runs commands, writes Phase 0 specs from LEAD outlines, runs e2e/smoke tests | Docs/tests only, never code |

## Required Files

Every agent session receives:

- `docs/mobile/AGENT_RUNTIME.md`
- The relevant section of `docs/mobile/CONTRACTS.md`
- The relevant task row from `docs/mobile/CHAIN.md`
- The matching prompt from `docs/mobile/prompts/`

## Model Routing

Use complexity, not file type, to choose the drafting model:

| Task Type | OpenCode Agent | Model Pool | Notes |
|---|---|---|---|
| Architecture / security second-pass / final arbiter on rejections | `mobile-lead` | Free ChatGPT 5.5 (`openai/gpt-5.5`) | Lead decisions, Phase 0 outlines, security approval, dispute resolution |
| Normal/easy code | `mobile-normal-coder` | routerpool/openai/gpt-oss-120b with local OpenRouter key rotation | Simple screens, theme, API wrappers, CRUD routes, migrations, docs |
| Complex/risky code | `mobile-risky-coder` | `google/antigravity-gemini-3.1-pro` | Auth, Stripe, Verkada, access control, account deletion, race-prone jobs |
| Risky code fallback | `mobile-risky-coder-fallback` | `openai/gpt-5.3-codex` | Used when Antigravity is unavailable; LEAD second-pass still required |
| Command verification, spec writing, e2e/smoke | `mobile-ops` | MiniMax free | Commands, LEAD-outlined specs, e2e runs; never code |
| Repo-aware review/integration | `mobile-reviewer` | Copilot/Opus | Reviews, rejects, escalates to LEAD, integrates after sign-off |

Codex free accounts may remain in the plugin pool as fallback for normal/easy mobile tasks. OpenCode MiniMax free is available as OPS model or emergency fallback if OpenRouter pool is unavailable.

## Workflow

1. REVIEWER selects the next unblocked task from `CHAIN.md` and `PHASE_STATUS.md`.
2. REVIEWER dispatches or the user runs the task through the appropriate OpenCode plugin-managed role/model pool.
3. The plugin rotates configured accounts automatically when a provider/account hits a limit. If `mobile-risky-coder` (Antigravity) is exhausted, REVIEWER routes pending risky tasks to `mobile-risky-coder-fallback`.
4. Agent produces output: NORMAL-CODER writes directly when edit permission is available (REVIEWER still reviews afterward); other agents return framed output.
5. REVIEWER reviews. Clean output is integrated. Problematic, partial, contract-violating, or security-relevant rejections are escalated to LEAD; LEAD's verdict (integrate / redo / reroute) drives the next step.
6. LEAD reviews every task marked `Security: yes` before final integration regardless of REVIEWER opinion.
7. OPS runs the task's verification command, spec write, or e2e flow and reports.
8. At phase end, REVIEWER performs a repo-aware phase review and sends APPROVE_PHASE / APPROVE_WITH_BLOCKERS / REJECT_PHASE to LEAD. LEAD makes the final phase-completion decision.
9. REVIEWER updates `PHASE_STATUS.md`. `QUOTA_LEDGER.md` is informational/incident-only because routine rotation is plugin-managed.

## Integration Policy

- Integration is direct to the current branch/main as requested.
- Integrate one task at a time.
- Never integrate incomplete output.
- Do not integrate two tasks touching the same file concurrently.
- Use task IDs in commit messages if the user asks for commits: `task: T014 add mobile api client`.
- REVIEWER must run `git status` before integration and after verification.

## Quota Handling

Routine quota handling is automatic. The OpenCode plugin rotates across configured free Codex, OpenRouter, and Antigravity accounts when one account hits a limit.

Manual action is needed only if the plugin reports a hard failure after exhausting the configured pool:

1. REVIEWER records the hard limit event in `QUOTA_LEDGER.md`.
2. If the exhausted pool was risky-coder/Antigravity, REVIEWER routes pending risky tasks to `mobile-risky-coder-fallback` (`openai/gpt-5.3-codex`).
3. If all routes are exhausted, the user adds more accounts, waits for reset, or routes the task to LEAD/REVIEWER directly.
4. If the failed output was partial, do not integrate it. Re-run the task and require complete final files.

No audio alerts.

## Security-Critical Rule

Tasks marked `Security: yes` require two gates:

- LEAD reviews the architecture and security behavior.
- REVIEWER performs repo-aware integration review.

REVIEWER may reject. LEAD has final say on disputed integration and may direct: integrate as-is, request redo, or reroute (including to `mobile-risky-coder-fallback`).

Security-critical areas include auth middleware, token storage/rotation, Stripe payment state transitions, refund/account deletion flows, Verkada calls, access reconciliation, and webhook side effects.
