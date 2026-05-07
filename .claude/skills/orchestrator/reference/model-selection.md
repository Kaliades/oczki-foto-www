# Model selection

Pass `model: "sonnet" | "opus" | "haiku"` when spawning an Agent. The orchestrator picks; the sub-agent uses it.

## Default: Sonnet

Sonnet is the default for almost everything. If you have to write down "why I picked Sonnet" you're overthinking it — pick Sonnet.

Examples:
- Build a Payload block from Figma (clear plan, mostly transcription).
- Refactor an existing collection.
- Add a new field with seeding.
- Migrate a piece of code from one util to another.
- Write a test for a known function.

## Escalate to Opus when…

…the task is **not predominantly a transcription** of a clear plan into code. Specifically:

- **Architectural design** — the shape of the solution isn't obvious; multiple plausible designs with cross-file trade-offs. *Example:* "design the publishing flow that lets editors schedule posts and revert without losing drafts."
- **Hard debug** — root cause unknown, the obvious checks have been tried, codebase unfamiliar, behaviour non-deterministic.
- **Meta-prompting** — building/refining another skill, agent, or system prompt. Models reason better about themselves at higher capability tiers.
- **High-blast-radius judgement** — changes that are expensive to reverse if done wrong (data migrations, public API contracts, security-relevant code paths).

## Drop to Haiku when…

…the work is **mechanical and verifiable**:

- "List all files importing `getPayload`."
- "Add `'use client'` to every file in `src/components/Forms/`."
- "Run the formatter on `src/blocks/`."
- Status reports — "is the dev server up?", "what's on the current branch?"

Haiku is meaningfully faster and cheaper. Don't waste Sonnet on grep-with-edits.

## Rough rule of thumb

| If a human would spend... | Use |
|---|---|
| < 5 minutes, mechanical | Haiku |
| ~30 min – a few hours | Sonnet |
| > a few hours, design-heavy | Opus |

In doubt → Sonnet. The cost difference between Sonnet and Opus is real but small relative to the cost of getting the wrong design and having to redo the work.

## Anti-patterns

- **Picking Opus to feel safe.** Opus on a transcription task often *over-engineers* — it's been observed to add abstractions and edge-case handling that weren't requested. Sonnet stays closer to the brief.
- **Picking Haiku to save tokens on real work.** If the task is non-mechanical, Haiku output will need a Sonnet pass to clean up — net more tokens.
- **Mixing models within a single strand.** If one Agent's output feeds another, keep them on the same tier so reasoning depth doesn't cliff between steps.
