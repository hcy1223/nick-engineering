# Engineering Workflows

## Feature Planning

Start with the decision, not the requested mechanism.

1. State the user or business outcome and who benefits.
2. Separate known facts, assumptions, and open questions.
3. Define observable success and guardrail signals.
4. Map the current behavior and the smallest useful change.
5. Identify domain rules, exceptional cases, dependencies, data changes, compatibility, and operational risks.
6. Slice vertically so each increment exercises a meaningful behavior end to end.
7. Decide how production evidence will confirm or challenge the plan.

Reject feature plans that are only component inventories or implementation checklists. Use `assets/feature-plan-template.md` when a persistent artifact is useful.

## Task Creation

Create tasks that produce a verifiable outcome and can be reviewed independently.

Each task should include:

- Context and intended outcome.
- In-scope behavior and explicit non-goals.
- Acceptance examples or observable completion criteria.
- Relevant domain language and invariants.
- Dependencies and sequencing only where truly required.
- Testing, migration, telemetry, rollout, and rollback expectations proportional to risk.

Prefer vertical tasks over separate layer tasks such as “add repository,” “add service,” and “add controller.” Split by behavior, risk, or learning boundary. Use `assets/engineering-task-template.md` as a starting point.

## Implementation Planning

Create an implementation plan after the outcome and scope are understood, when the next vertical slice needs an explicit technical path. Keep each plan small and independently verifiable. One User Story may produce several plans; detail only the next worthwhile slice and let feedback shape later plans. Read `references/implementation-planning.md` for the generation workflow, then copy `assets/implementation-plan-template.md` as the output skeleton.

Feature Plans and User Stories describe broader value and intent. Each Implementation Plan describes how one accepted vertical slice will be changed and verified; its Implementation Tasks describe the immediate Red–Green–Refactor work. Keep artifacts separate when that improves review, and combine lightweight artifacts for very small, low-risk changes.

## Task Implementation

1. Reconstruct intent from the task, current code, behavioral tests, and production evidence.
2. Resolve ambiguity that could change the outcome; otherwise make a small, explicit assumption.
3. Choose the thinnest behavioral slice and write the next failing test.
4. Implement the simplest coherent design that makes it pass.
5. Refactor names, responsibilities, duplication, and boundaries while tests remain green.
6. Repeat until acceptance behavior and important failure modes are covered.
7. Run focused checks first, then the broader relevant suite.
8. Review the diff for accidental scope, compatibility, security, operability, and documentation drift.
9. Record remaining risk and define how the change will be observed in production.

Do not preserve a poor design merely because it works. Do not introduce abstractions for hypothetical reuse. Prefer code that makes the domain decision obvious.

To create a persistent task list from an implementation plan, read `references/implementation-tasks.md`, then copy `assets/implementation-task-template.md`. Record a concrete Red–Green–Refactor path, expected code impact, verification evidence, and any deliberately deferred smell or extension for every task.

## Git Workflow

Keep history reviewable and delivery intentional.

1. Inspect repository instructions, branch state, and existing changes before editing.
2. Preserve unrelated user work; never discard or rewrite it without explicit authorization.
3. Work in small coherent increments and keep generated or formatting noise out of behavioral changes.
4. Review the complete diff and run relevant verification before committing.
5. Write an imperative commit subject that states the outcome; use the body for rationale, constraints, and migration notes when needed.
6. Rebase or merge according to repository policy. Do not rewrite shared history casually.
7. Open a review with outcome, design choices, evidence, risks, rollout, rollback, and production signals.
8. Treat merge as the beginning of operational verification, not the end of ownership.

Prefer one coherent commit when the change is small. Use multiple commits when each is independently understandable and helps review, bisecting, or rollback. Never manufacture noisy “checkpoint” history.
