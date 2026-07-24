# Implementation Tasks

Break an explicitly approved Implementation Plan into small, executable TDD Tasks. Task Breakdown is engineering design, not a formatting conversion.

## Require an Approved Plan

- A direct approval of the Plan just produced is sufficient; infer its path from the conversation.
- Otherwise require an unambiguous path to an existing Plan and explicit approval.
- If the Plan is missing, unresolved, or still under review, stop instead of inventing content.

## Resolve the Output

1. Read the complete Plan and preserve its language and domain terms.
2. Derive the slug from its filename by removing `.md`, an optional date, and the `implementation-plan-` prefix.
3. Write `tasks/YYYY-MM-DD-tasks-from-<plan-slug>.md` from `assets/implementation-task-template.md`.
4. If `tasks/` does not exist, ask permission before creating it.

## Decompose the Current Plan

Generate Tasks only for the approved Plan boundary. Exclude the parent Story, out-of-scope behavior, and later Plan Map slices.

Prefer vertical behavior, risk, or learning boundaries over technical layers. Use one milestone by default; add another only for a real delivery, compatibility, migration, or learning checkpoint.

Every Task must be:

- **Test-first**: begin with a failing behavior or repeatable pre-change verification.
- **Focused**: deliver one outcome and ideally take less than one day.
- **Grounded**: name code areas, contracts, and commands supported by repository evidence.
- **Independent where possible**: introduce ordering only for real dependencies.
- **Verifiable**: finish with observable behavior, tests, or operational evidence.

Split an oversized Task by acceptance example, failure mode, boundary, migration stage, or learning checkpoint.

## Apply Engineering Judgment

Inspect the relevant code and behavioral tests before choosing Task boundaries. Reconcile the Plan with existing architecture, domain language, reusable capabilities, constraints, and safe change points.

- Order Tasks by dependency, uncertainty, and risk; establish the thinnest end-to-end behavior or retire a dangerous assumption early.
- Add executable detail for modeling, compatibility, migration, observability, rollout, and rollback only where the Plan requires it.
- Identify the behavior to prove, likely code area, boundary interactions, completion evidence, and genuine prerequisites.
- Do not create one Task per Plan heading, class, component, or layer.
- Do not change the approved outcome, scope, or key design decision. Surface a blocking contradiction and stop.

Use rolling-wave planning. If implementation later invalidates the Plan, update it before regenerating affected Tasks.

## Instantiate TDD, Do Not Re-explain It

Every Task must fill the template's concrete RED, GREEN, REFACTOR, and completion-evidence fields. Follow `references/testing.md` for test style: prefer real domain collaborators and substitute true boundaries only.

For migrations or operational work, RED may be a repeatable verification that fails before the change. Keep compatibility, rollout, rollback, telemetry, and accepted trade-offs proportional to risk.

## Stop After Task Breakdown

Print the absolute Task-list path and identify the first unblocked Task. Do not edit implementation or test code. Wait until the user approves a concrete Task, asks to execute it, and the target repository has a clean worktree.
