# TXXX Task Template

## Agent

Role: `<LEAD | BACKEND-A | BACKEND-B | MOBILE-A | MOBILE-B | OPS>`

Prompt: use `docs/mobile/prompts/<ROLE>.md`

## Runtime Context

Read first:

- `docs/mobile/AGENT_RUNTIME.md`
- Relevant section of `docs/mobile/CONTRACTS.md`
- Task row from `docs/mobile/CHAIN.md`

## Objective

Produce exactly these files:

- `path/to/file`

## Constraints

- Do not modify files not listed above.
- Follow `CONTRACTS.md` exactly.
- Use the required output frame from `AGENT_RUNTIME.md`.

## Verification

OPS command:

```sh
<command>
```

## Review Checklist

- [ ] Output frame is complete.
- [ ] Only requested files are included.
- [ ] Exports match contracts.
- [ ] No secrets.
- [ ] Security-critical behavior reviewed if applicable.
