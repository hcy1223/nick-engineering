# Implementation Tasks

Use this workflow when asked to break a reviewed implementation plan into small, test-first tasks. Produce an executable task list whose sequence grows behavior through Red–Green–Refactor.

## Check the Prerequisite

1. Require a path to an implementation plan.
2. If the path is missing or the file does not exist, stop and ask for a valid plan path.
3. If no plan exists, suggest creating one with the Implementation Planning workflow.
4. Do not invent plan content from a title or partial filename.

## Resolve the Output

1. Read the implementation plan and preserve its language and established technical terms.
2. Derive the plan slug from the implementation plan filename: remove the `.md` suffix, an optional leading `YYYY-MM-DD-`, and the `implementation-plan-` prefix.
3. Write to `tasks/YYYY-MM-DD-tasks-from-<plan-slug>.md`.
4. If `tasks/` does not exist, ask permission before creating it.

## Extract the Work

Focus on the plan's Detailed Design, Testing & Implementation Strategy, Migration/Rollout/Operations, Risks, and Milestones. Trace every task back to a planned behavior, change point, migration, risk control, or verification need.

Decompose work by vertical behavior, risk, or learning boundary rather than by technical layer. Keep high-level phases as milestones, then create tasks that are:

- **Test-first**: The first action defines behavior with a failing automated test. For migrations or operations where automation is impractical, define a repeatable verification that fails before the change.
- **Independent**: Tasks in the same milestone avoid unnecessary ordering and shared incomplete states.
- **Small**: Each task has one focused outcome and ideally takes less than one day.
- **Grounded**: Expected files, modules, contracts, and commands come from the plan and repository evidence.
- **Verifiable**: Completion has observable evidence, not only a claim that code was written.

Introduce dependencies only when behavior, schema order, compatibility, or risk makes them real. If a task remains too large, split it by acceptance example, failure mode, boundary, migration stage, or production-learning checkpoint.

## Define Every Task Through TDD

### RED — Define Failing Behavior

- Name the exact behavior and test level.
- Prefer real domain objects and observable state or behavior.
- Use substitutes only at true external boundaries.
- Require running the focused test and confirming that it fails for the expected reason, not because of broken setup.

### GREEN — Implement to Pass

- Make the smallest coherent production change that satisfies the behavior.
- Reuse, compose, or adapt existing code when semantics match.
- Re-run tests after meaningful increments.
- Preserve existing behavior with the broader relevant suite.

### REFACTOR — Improve the Design

- Improve domain language, names, responsibilities, duplication, and boundaries exposed by the change.
- Identify code smells and accidental coupling.
- Preserve only credible extension points; do not add speculative abstractions.
- Keep all relevant tests green.

For migration or operational tasks, retain the same intent: define observable pre-change and post-change evidence first, perform the smallest safe change, then simplify and document the resulting operational design.

## Include Delivery Evidence

Add compatibility, migration, rollout, rollback, telemetry, or production checks only where the plan makes them relevant. Record deferred work and accepted trade-offs explicitly rather than hiding them inside task prose.

## Create the Task List

Copy and adapt `assets/implementation-task-template.md`. Use numbered milestone and task headings. Repeat the complete Red–Green–Refactor structure for every implementation task; do not use vague placeholders such as “add tests” or “implement service.”

Before finishing, verify that:

- Every planned milestone and important risk has sufficient task coverage.
- Each task begins with a concrete failing test or verification.
- Tasks are small, behavior-oriented, and independently executable within their milestone where possible.
- Test doubles remain at system boundaries.
- Implementation steps name the relevant code areas without becoming line-by-line coding instructions.
- Completion evidence includes the right tests and operational checks.

After writing:

1. Print the absolute output path.
2. Identify the first unblocked task.
3. Suggest starting work on that task through the Task Implementation workflow.
