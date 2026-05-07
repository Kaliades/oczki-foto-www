# Status file format

Each sub-agent owns exactly one file: `.subagents/<id>.md`. The id in the filename matches the `id` field in frontmatter.

## Frontmatter (YAML)

| Field | Type | Required | Notes |
|---|---|:-:|---|
| `id` | string | yes | Same as filename stem. Format `<slug>-<unix-ts>`. |
| `title` | string | yes | One sentence — what this sub-agent is doing. |
| `model` | enum | yes | `sonnet` / `opus` / `haiku`. |
| `mode` | enum | yes | `background` / `foreground`. |
| `started_at` | ISO 8601 | yes | Set once at start. |
| `last_update` | ISO 8601 | yes | **Updated at every milestone.** The cron reads this for stall detection. |
| `status` | enum | yes | `running` / `done` / `failed` / `stalled`. |
| `parent_session` | string | no | Free-form id of the orchestrating session, if useful. |

## Body conventions

After the frontmatter:

1. `# <title>` — top heading (mirror the frontmatter title).
2. `## Plan` — initial checklist; tick boxes as work progresses.
3. `## Log` — dated milestone notes, one sub-heading per milestone (`### 2026-05-07T14:32 — found root cause`).
4. `## Final summary` — appended at the end, 3–8 sentences for the orchestrator. The orchestrator reads this back to the user.

## Worked example

```markdown
---
id: figma-hero-1714050000
title: Build Hero block from Figma node 12:42
model: sonnet
mode: background
started_at: 2026-05-07T14:30:00Z
last_update: 2026-05-07T14:47:12Z
status: done
---

# Build Hero block from Figma node 12:42

## Plan
- [x] Fetch Figma metadata
- [x] Generate Component.tsx
- [x] Generate config.ts
- [x] Generate seed.ts
- [x] Verify import paths

## Log

### 2026-05-07T14:30 — start
Pulled metadata via Figma MCP. Node has 3 children: image, headline, CTA.

### 2026-05-07T14:38 — components written
Wrote three files under `src/blocks/Hero/`. Reused existing Image and Button from `src/components`.

### 2026-05-07T14:46 — verified
`tsc --noEmit` clean; no new dependencies.

## Final summary

Generated `Hero` block files in `src/blocks/Hero/` from Figma node 12:42. Reused existing Image/Button components — no new deps. Block is **not yet registered** in Pages config or RenderBlocks; orchestrator owns that step per project convention.
```

## Why update `last_update` so often

The cron checks every 5 minutes; a file untouched for over 10 min is presumed stalled. A long single tool call (a thorough Explore subagent of your own, a Bash that's hanging) can easily exceed that window without anything actually being wrong. To avoid spurious alerts, bump `last_update` whenever you complete a chunk of work — not only at major milestones. A one-line `## Log` entry plus the timestamp is enough.

## When the contract can be relaxed

Only when both apply:
- the task is in the orchestrator's "do it directly" whitelist (see `SKILL.md` Rule 1) — i.e. you wouldn't normally have spawned an Agent at all, but did anyway because reasons,
- the task will provably finish in under ~30 seconds on Haiku.

Otherwise: keep the contract. The cost is one extra Write per milestone; the benefit is the user can pick up the thread cold from the file alone.
