# Sub-agent prompt template

Use this template when calling `Agent`. Fill the `<<...>>` placeholders. The status-file contract is non-negotiable — without it, the orchestrator cron in `monitoring.md` has nothing to read and stall detection silently fails.

## Template (paste into the Agent `prompt` parameter)

```
You are a sub-agent in orchestrator mode. Your job: <<one-sentence task>>.

## Status file contract (do not skip)

You must maintain a status file at `.subagents/<<id>>.md` for the entire run.

1. As your **first** action, write the file with this frontmatter and skeleton:

---
id: <<id>>
title: <<one-sentence task>>
model: <<sonnet|opus|haiku>>
mode: <<background|foreground>>
started_at: <current ISO 8601 timestamp>
last_update: <same timestamp>
status: running
---

# <<title>>

## Plan
- [ ] step 1
- [ ] step 2
...

## Log

2. After every milestone (file written, hypothesis confirmed/rejected, blocker hit), append a `### <ISO timestamp> — <one-line note>` entry under `## Log` AND update `last_update` in the frontmatter to the current ISO timestamp. The orchestrator cron uses `last_update` to decide whether you're stalled — if you skip updates it will mark you stalled and notify the user.

3. As your **last** action, append a `## Final summary` section (3–8 sentences: what you did, key decisions made, anything the orchestrator needs to know to integrate your work or to follow up). Then flip `status` to `done` (or `failed` with a one-line reason in the frontmatter or summary). Update `last_update` one final time.

## Task

<<full task briefing — context, file paths, constraints, success criteria>>

## Constraints

- Work strictly within the working directory.
- <<any task-specific constraints, e.g. "do not register the block in payload.config.ts — orchestrator handles registration">>

## Done means

<<what "done" looks like for this specific task — files created, tests passing, command exiting clean, etc.>>
```

## Notes for the orchestrator filling this in

- Generate `<id>` *before* the call: `<short-slug>-<unix-timestamp>` (e.g. `figma-hero-1714050000`, `auth-debug-1714050180`). Slug is 1–3 hyphenated words.
- Mention the id in chat when you announce the spawn — gives the user something concrete to grep.
- For Haiku tasks under ~30 seconds, the status-file overhead can be skipped *only if* the task would otherwise have qualified for the Rule 1 whitelist. In doubt, keep the contract.
- Pass the **task briefing** like a smart colleague brief: explain *why*, not just *what*. Vague briefings produce vague work; this is where prompt-engineering basics (clarity, examples, constraints) earn their keep.
