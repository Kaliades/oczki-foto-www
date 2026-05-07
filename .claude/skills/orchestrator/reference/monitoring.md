# Stall-detection cron

The cron has one job: notice when a sub-agent has stopped reporting and the user might want to look. Runtime already handles *completion* notifications; this fills the gap for stalls.

## When to install

The first time in a session you spawn a *background* Agent:

1. Call `CronList`.
2. If any existing job's `prompt` contains the marker `[orchestrator-monitor]`, skip — already running.
3. Otherwise call `CronCreate` with the prompt below, `cron: "*/5 * * * *"`, `recurring: true`, `durable: false`.

`durable: false` is correct — the cron should live exactly as long as this Claude session. If the user starts a new session and there are still status files on disk from old sub-agents, those are historical records, not running work.

## Cron prompt

Paste this verbatim into the `prompt` field of `CronCreate`:

```
[orchestrator-monitor] Stall sweep for sub-agent status files. Be terse, use tools directly, no narration.

1. Run bash: `ls -1 .subagents/*.md 2>/dev/null`. If nothing matches, run CronList, find the job whose prompt starts with "[orchestrator-monitor]", call CronDelete on it, and stop.

2. For each file from step 1, read its YAML frontmatter. If `status: running` AND `last_update` is more than 10 minutes before the current ISO timestamp, use Edit to change `status: running` to `status: stalled` in that file (in the frontmatter only — leave the body alone).

3. If you marked at least one file as stalled this run, send one PushNotification with message: "<count> sub-agent(s) stalled: <comma-separated ids, max 5>". Send no notification otherwise.

4. Recount: how many files now have `status: running` or `status: stalled`? If zero, run CronList, find this job ([orchestrator-monitor]), call CronDelete on it. Done.

Do not summarise back to the user beyond the PushNotification in step 3. No analysis, no progress updates.
```

## Why this prompt is small

Each cron firing is a real Claude turn — make it cheap. The prompt is deterministic (no judgement calls), uses tools directly, and exits without a summary. If a firing turns out wasteful in transcripts, shorten further.

## Failure modes and how they're handled

- **Cron fires while an agent is mid-write to its own status file.** Harmless — the agent's next milestone update overwrites `status` back to `running` along with bumping `last_update`. The user gets one possibly-spurious notification; not the end of the world.
- **Multiple `[orchestrator-monitor]` jobs accidentally created.** The `CronList` check at install time is the primary defence. If a duplicate slips through, the second instance will run, see no `running`/`stalled` files (since the first instance handled them), and self-delete in its step 4.
- **Frontmatter parse fails on a malformed file.** The cron should skip that file silently — better than spurious alerts. A malformed status file is a sub-agent bug, not a cron bug.
- **Clock skew between sub-agent timestamps and cron `now`.** All timestamps come from the same machine; ignore.

## Tuning

The 5-minute cycle and 10-minute stall threshold are defaults. If a particular project tends to run very long Opus sub-agents (research, multi-file rewrites), bump both — e.g. `*/10 * * * *` with a 30-minute threshold — by passing the same prompt with adjusted numbers and a different cron expression. Don't go shorter than 2 min cycles; cron jitter (~10% of period) plus the cost of each firing makes it pointless.

## Why a cron at all (vs. polling)

Polling burns tokens on every coordination decision in the main session. The runtime *already* notifies you when a background Agent completes — you just don't get told about silence. Stalls are exactly that: silence. A periodic external check is the cheapest way to surface them, and it works whether you're in the middle of another tool call or idle.
