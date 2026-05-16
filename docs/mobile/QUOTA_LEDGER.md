# Mobile Agent Quota Ledger

Routine account rotation is handled automatically by the OpenCode plugin. This file is not the primary source of rotation truth.

Update this file only for hard limit events, provider pool outages, blocked accounts, or manual notes about configured accounts.

Statuses: `PLUGIN_MANAGED`, `ACTIVE`, `HARD_EXHAUSTED`, `BLOCKED`, `UNKNOWN`.

## Paid / High-Value Accounts

| Account | Role | Provider / Model | Limit | Status | Last Used | Notes |
|---|---|---|---|---|---|---|
| chatgpt-free-5.5 | LEAD | Free ChatGPT 5.5 (`openai/gpt-5.5`) | plugin/free quota | PLUGIN_MANAGED | plugin | Strongest lead for architecture and security second-pass |
| copilot-opus-1 | REVIEWER | GitHub Copilot / Opus | 1500 monthly requests | ACTIVE | 2026-05-03 | Repo-aware reviewer/integrator |

## OpenRouter GPT OSS 120B Accounts

Normal-coder traffic goes through the local `routerpool` provider, which fronts the OpenRouter `openai/gpt-oss-120b` model and rotates across the configured key files automatically.

Canonical use: normal/easy code through `mobile-normal-coder` via `routerpool/openai/gpt-oss-120b`.

| Account | Role Pool | Limit | Status | Requests Used Today | Last Used | Notes |
|---|---|---|---|---:|---|---|
| openrouter-1 | NORMAL-CODER | 50/day | PLUGIN_MANAGED | unknown | plugin | `gpt-oss-120b` normal/easy code |
| openrouter-2 | NORMAL-CODER | 50/day | PLUGIN_MANAGED | unknown | plugin | `gpt-oss-120b` normal/easy code |
| openrouter-3 | NORMAL-CODER | 50/day | PLUGIN_MANAGED | unknown | plugin | `gpt-oss-120b` normal/easy code |
| openrouter-4 | NORMAL-CODER | 50/day | PLUGIN_MANAGED | unknown | plugin | `gpt-oss-120b` normal/easy code |
| openrouter-5 | NORMAL-CODER | 50/day | PLUGIN_MANAGED | unknown | plugin | `gpt-oss-120b` normal/easy code |
| openrouter-6 | NORMAL-CODER | 50/day | PLUGIN_MANAGED | unknown | plugin | `gpt-oss-120b` normal/easy code |
| openrouter-7 | NORMAL-CODER | 50/day | PLUGIN_MANAGED | unknown | plugin | overflow |
| openrouter-8 | NORMAL-CODER | 50/day | PLUGIN_MANAGED | unknown | plugin | overflow |
| openrouter-9 | NORMAL-CODER | 50/day | PLUGIN_MANAGED | unknown | plugin | overflow |
| openrouter-10 | NORMAL-CODER | 50/day | PLUGIN_MANAGED | unknown | plugin | overflow |

## Codex Free Accounts

| Account | Role Pool | Status | Last Used | Notes |
|---|---|---|---|---|
| codex-1 | MOBILE-A | PLUGIN_MANAGED | plugin | screens |
| codex-2 | MOBILE-A | PLUGIN_MANAGED | plugin | screens |
| codex-3 | MOBILE-A | PLUGIN_MANAGED | plugin | screens |
| codex-4 | MOBILE-A | PLUGIN_MANAGED | plugin | screens |
| codex-5 | MOBILE-A | PLUGIN_MANAGED | plugin | screens |
| codex-6 | MOBILE-B | PLUGIN_MANAGED | plugin | infra |
| codex-7 | MOBILE-B | PLUGIN_MANAGED | plugin | infra |
| codex-8 | MOBILE-B | PLUGIN_MANAGED | plugin | infra |
| codex-9 | MOBILE-B | PLUGIN_MANAGED | plugin | infra |
| codex-10 | MOBILE-B | PLUGIN_MANAGED | plugin | infra |

## Antigravity Accounts

Canonical use: complex/risky code through `mobile-risky-coder`.

| Account | Role Pool | Status | Last Used | Notes |
|---|---|---|---|---|
| antigravity-1 | RISKY-CODER | PLUGIN_MANAGED | plugin | Google/Gemini Pro 3.1 complex/risky code |
| antigravity-2 | RISKY-CODER | PLUGIN_MANAGED | plugin | add rows as needed |

## OpenCode Free Accounts / Models

| Account | Role | Model | Status | Last Used | Notes |
|---|---|---|---|---|---|
| opencode-minimax | OPS | minimax free | PLUGIN_MANAGED | plugin | run commands only |
| opencode-qwen | fallback | qwen free | PLUGIN_MANAGED | plugin | docs/simple tasks |

## Limit Event Log

Use this format:

```txt
- YYYY-MM-DD HH:mm: provider_pool=<pool> task=TXXX status=HARD_EXHAUSTED reset=<if known> plugin_message=<message>
```
