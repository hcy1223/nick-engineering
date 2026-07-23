# Engineering Workflows

## Requirement Understanding

Treat a one-line request, issue, Story document, change request, or “implement this” prompt as authorization to analyze the requirement. Read `references/requirements-analysis.md` and inspect the relevant repository behavior. An existing Story is input, not automatic approval. If material ambiguity remains, ask focused questions and stop; repeat across multiple rounds as needed.

When the requirement is sufficiently clear to select the next vertical slice without guessing, proceed to Implementation Planning. For a broad Story, output a lightweight Plan Map and only the first detailed Implementation Plan. For a single-slice request, output only that detailed plan. Then stop; do not create tasks or code.

## Feature Planning

Start with the decision, not the requested mechanism.

1. State the user or business outcome and who benefits.
2. Separate known facts, assumptions, and open questions.
3. Define observable success and guardrail signals.
4. Map the current behavior and the smallest useful change.
5. Identify domain rules, exceptional cases, dependencies, data changes, compatibility, and operational risks.
6. Slice vertically so each increment exercises a meaningful behavior end to end.
7. Decide how production evidence will confirm or challenge the plan.

Reject feature plans that are only component inventories or implementation checklists. For a multi-slice Story, use `assets/feature-plan-template.md` as the Plan Map: order vertical slices, mark one as `Next`, and leave later slices lightweight.

## Task Creation

Create tasks only from an Implementation Plan the user has explicitly accepted as OK, approved, or ready to proceed. A direct approval response to the plan just produced authorizes Task Creation; the user does not need to issue a separate command or repeat the plan path. Tasks must produce a verifiable outcome and be reviewable independently.

Use professional engineering judgment rather than translating plan headings into a checklist. Inspect the relevant code and tests, reconcile top-down behavior with bottom-up change points, and choose task boundaries and ordering based on behavior, dependencies, uncertainty, and risk. Preserve the approved plan's outcome and scope; surface a blocking contradiction instead of silently redesigning it.

Each task should include:

- Context and intended outcome.
- In-scope behavior and explicit non-goals.
- Acceptance examples or observable completion criteria.
- Relevant domain language and invariants.
- Dependencies and sequencing only where truly required.
- Testing, migration, telemetry, rollout, and rollback expectations proportional to risk.

Prefer vertical tasks over separate layer tasks such as “add repository,” “add service,” and “add controller.” Split by behavior, risk, or learning boundary. Use `assets/engineering-task-template.md` as a starting point.

After producing the task list, stop. Task review and approval, an explicit request to execute a task, and a clean Git worktree are required before implementation begins.

## Implementation Planning

Create planning artifacts only after the Requirement Ready Gate is satisfied. A broad User Story produces one lightweight Plan Map and may produce several Implementation Plans over time, but detail only the next worthwhile slice now. Let feedback shape later plans. Read `references/implementation-planning.md` for the generation workflow, use `assets/feature-plan-template.md` for the map when needed, and use `assets/implementation-plan-template.md` for the current slice.

Feature Plans and User Stories describe broader value and intent. Each Implementation Plan describes how one accepted vertical slice will be changed and verified; its Implementation Tasks describe the immediate Red–Green–Refactor work. Keep artifacts separate when that improves review, and combine lightweight artifacts for very small, low-risk changes.

## Task Implementation

Enter this stage only when the user has reviewed and approved a concrete task and explicitly asks to execute it. A raw feature request, Requirement Ready state, reviewed plan, or unapproved task list is not implementation authorization.

Before beginning each approved task and writing or modifying any source, test, configuration, schema, migration, or generated implementation file:

1. Run `git status --porcelain` in the target repository.
2. Continue only when it produces no output.
3. If it reports staged, unstaged, or untracked files, show the relevant status and stop. Ask the user to resolve the worktree or explicitly direct a separate commit, stash, or cleanup action.
4. If the target is not a Git repository, stop and ask how the user wants to establish a safe baseline.
5. Do not automatically commit, stash, reset, discard, delete, or hide changes to manufacture a clean state.

Read-only inspection is allowed while the gate is closed. Writing the first failing test is implementation work, so the clean-worktree check must happen before RED begins.

1. Reconstruct intent from the approved task, current code, behavioral tests, and production evidence.
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

Keep history reviewable and delivery intentional. Read `references/git-workflow.md` before staging or committing changes.

1. Inspect repository instructions, branch state, and existing changes before editing. Task implementation requires `git status --porcelain` to be empty.
2. Preserve unrelated user work; never discard or rewrite it without explicit authorization.
3. Work in small coherent increments and keep generated or formatting noise out of behavioral changes.
4. Review the complete diff and run relevant verification before committing.
5. Write an English Conventional Commit message that states the outcome.
6. Rebase or merge according to repository policy. Do not rewrite shared history casually.
7. Open a review with outcome, design choices, evidence, risks, rollout, rollback, and production signals.
8. Treat merge as the beginning of operational verification, not the end of ownership.

Use the detailed rules in `references/git-workflow.md` for commit types, scopes, breaking changes, message quality, commit boundaries, and repository-policy conflicts.
