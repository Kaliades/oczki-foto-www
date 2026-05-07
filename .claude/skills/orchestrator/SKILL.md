---
name: orchestrator
description: Forces orchestrator mode - delegate every non-trivial unit of work to background sub-agents via the Agent tool, choose the right model per task (Sonnet default, Opus for hard reasoning, Haiku for trivial), require sub-agents to write progress reports into .subagents/<id>.md, and install a 5-minute cron that flags stalled sub-agents. Activate only when the user explicitly invokes /orchestrator or asks to switch to orchestrator mode.
---

# Orchestrator mode

When this skill activates, the main session stops doing work directly and starts coordinating sub-agents instead. Three goals at once: (1) keep the main context lean so coordination stays sharp across long sessions, (2) parallelize independent work, (3) give the user persistent on-disk visibility into what every sub-agent is doing.

Reference files cover the mechanics; this file covers the behaviour. Rules trade some friction for a much better long-horizon experience — read them carefully and apply them with judgement, not as MUSTs.

## Pre-flight (once per session, on activation)

1. If `.subagents/` does not exist in the project root, create it.
2. If `.subagents/` is not in `.gitignore`, append it. The directory holds session state; committing it would pollute the repo.
3. Acknowledge in chat: "Orchestrator mode active." Do not start delegating until the user has stated their task — orchestrator is a *mode*, not a kickoff.

## Rule 1: delegate by default

Default = spawn an `Agent`. The whitelist of things you do *directly* in the main session is short:

- conversation with the user (`AskUserQuestion`, decisions, proposals)
- a single `Read` of a known file path
- a single-line `Edit` in a file already in context
- status `Bash` (`git status`, `pwd`, `ls`)
- one-shot tool calls so quick that spawning an Agent would cost more than running it directly

Everything else — exploration spanning multiple files, implementation of any component, refactor, debug, generation from a Figma node, writing a test suite, calling external services, even drafting a long plan — goes to a sub-agent.

**Why:** main-session context is your most expensive resource. Every paragraph you read here is a paragraph the next decision has to compete with. Sub-agents read what they need into *their* context and hand back a summary.

## Rule 2: background by default

When you spawn an Agent, set `run_in_background: true` unless **both** of these are true:

1. the result blocks every other useful decision in the session, AND
2. there is genuinely no other useful work to dispatch in parallel.

If you have multiple independent strands, send all the Agent calls **in a single message** so they fan out concurrently.

**Why:** background lets you keep coordinating; foreground means you sit and wait. The runtime notifies you on completion automatically — you do not need to poll.

## Rule 3: pick the model

Default: **Sonnet** (`model: "sonnet"`). Most coding, exploration, edits, generation.

Escalate to **Opus** (`model: "opus"`) when the task involves any of:

- architectural / cross-file *design* decisions (not just edits)
- hard debug — cause unknown, codebase unfamiliar, behaviour non-deterministic
- meta-prompting — building or refining other skills, agents, system prompts
- judgement calls with high downstream impact (data migrations, public APIs)

Drop to **Haiku** (`model: "haiku"`) for: status checks, simple lookups ("which files import X"), refactor-by-grep, formatting.

In doubt → Sonnet. See `reference/model-selection.md` for examples.

## Rule 4: every sub-agent reports to disk

Before spawning, generate an ID: `<short-slug>-<unix-ts>` (e.g. `figma-hero-1714050000`). The slug is 1–3 hyphenated words describing the task.

The Agent's `prompt` parameter MUST include the status-file contract from `reference/subagent-prompt-template.md`:

- the agent writes `.subagents/<id>.md` at start (frontmatter + initial plan)
- updates `last_update` after each milestone
- closes with `## Final summary` and sets `status: done` (or `failed`)

Schema and examples live in `reference/status-file-spec.md`.

**Why:** persistent, structured progress per-agent means you (and the user) can pick up the thread cold, stalls become detectable, and the report survives session restarts. Without this contract the cron in Rule 5 has nothing to read.

## Rule 5: install the monitor cron

The first time in a session you launch a *background* Agent:

1. Call `CronList`. If a job whose `prompt` contains the marker `[orchestrator-monitor]` already exists, skip.
2. Otherwise call `CronCreate` with the prompt from `reference/monitoring.md`, `cron: "*/5 * * * *"`, `recurring: true`, `durable: false`.

The cron scans `.subagents/*.md` every 5 min, marks any sub-agent whose `last_update` is older than 10 min as `stalled`, and pushes a single notification listing the affected ids. When no `running`/`stalled` agents remain, the cron self-deletes.

**Why:** the runtime already notifies you on Agent *completion*. The cron exists for *stall detection* — to surface sub-agents that have gone quiet without crashing.

## Rule 6: don't fight the runtime

- Do not poll sub-agents. The runtime notifies on completion; the cron handles stalls.
- Do not auto-delete `.subagents/*.md` files — they are session history, useful for the user post-mortem.
- Do not wrap a foreground Agent around something you could call as a tool directly. The whitelist exists for a reason.

## Reporting back to the user

When all sub-agents have reported `done`, summarise their `## Final summary` sections back to the user yourself — one paragraph per agent, max. Do not paste full reports; the user can open them on disk if they want details.

If a sub-agent reports `failed` or is flagged `stalled`, treat that as a decision point: surface it to the user, decide whether to retry (new id, possibly larger model), abandon, or take it over directly. Do not silently respawn.

## References

- `reference/subagent-prompt-template.md` — exactly what to put in the Agent `prompt` parameter
- `reference/status-file-spec.md` — frontmatter schema + body conventions + worked example
- `reference/model-selection.md` — Sonnet/Opus/Haiku heuristics with examples
- `reference/monitoring.md` — the cron prompt, install rules, failure modes
