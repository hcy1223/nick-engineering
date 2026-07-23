# Implementation Tasks

Use this workflow after the user approves an Implementation Plan or explicitly asks to break an approved plan into small, test-first tasks. Produce an executable task list whose sequence grows behavior through Red–Green–Refactor.

## Check the Prerequisite

1. Require an Implementation Plan that the user has explicitly accepted as OK, approved, or ready to proceed.
2. A direct approval response to the plan just produced is sufficient authorization for Task Creation. Infer that plan's path from the current conversation; do not force the user to repeat it.
3. Otherwise require the user to provide the plan path and identify it as approved for task breakdown.
4. If the path is missing, ambiguous, or does not exist, stop and ask for a valid plan path.
5. If the plan is still under review, stop and ask the user to resolve or approve it.
6. If no plan exists, suggest creating one with the Implementation Planning workflow.
7. Do not invent plan content from a title or partial filename.

## Resolve the Output

1. Read the implementation plan and preserve its language and established technical terms.
2. Derive the plan slug from the implementation plan filename: remove the `.md` suffix, an optional leading `YYYY-MM-DD-`, and the `implementation-plan-` prefix.
3. Write to `tasks/YYYY-MM-DD-tasks-from-<plan-slug>.md`.
4. If `tasks/` does not exist, ask permission before creating it.

## Extract the Work

Read the entire plan, focusing on its Outcome & Plan Boundary, Current System, Detailed Design, TDD & Execution Strategy, Delivery & Learning, and Risks. Trace every task back to a planned behavior, change point, migration, risk control, or verification need.

Generate tasks only for the current plan boundary. Do not turn the parent User Story, out-of-scope behavior, or candidate follow-up plans into tasks.

Decompose work by vertical behavior, risk, or learning boundary rather than by technical layer. Use one milestone by default; add more only for real delivery, compatibility, or learning checkpoints. Create tasks that are:

- **Test-first**: The first action defines behavior with a failing automated test. For migrations or operations where automation is impractical, define a repeatable verification that fails before the change.
- **Independent**: Tasks in the same milestone avoid unnecessary ordering and shared incomplete states.
- **Small**: Each task has one focused outcome and ideally takes less than one day.
- **Grounded**: Expected files, modules, contracts, and commands come from the plan and repository evidence.
- **Verifiable**: Completion has observable evidence, not only a claim that code was written.

Introduce dependencies only when behavior, schema order, compatibility, or risk makes them real. If a task remains too large, split it by acceptance example, failure mode, boundary, migration stage, or production-learning checkpoint.

Use rolling-wave planning. Detail only work that is ready to execute now. When implementation reveals that a material plan assumption, boundary, or design decision is wrong, stop decomposing or executing affected tasks, update the plan, and regenerate the remaining task list.

## Apply Engineering Judgment

Task Creation is an engineering design activity, not a formatting conversion. Re-read the approved plan and inspect the relevant current code and behavioral tests before choosing task boundaries.

- Reconcile the desired behavior with existing architecture, domain language, reusable capabilities, constraints, and safe change points.
- Choose vertical behavior slices and order them by real dependency, uncertainty, and risk. Prefer an early task that disproves a dangerous assumption or establishes the thinnest end-to-end behavior.
- Use expertise in domain modeling, architecture, TDD, migrations, compatibility, observability, rollout, and rollback to add necessary executable detail that the approved plan intentionally leaves at planning level.
- Make each task useful to an implementer: identify the behavior to prove, likely code area, boundary interactions, completion evidence, and any genuine prerequisite.
- Do not mechanically create one task per plan heading, component, class, or architectural layer.
- Do not silently change the approved outcome, scope, or key design decision. If the plan contains a contradiction or a material gap that prevents responsible decomposition, surface the issue and stop instead of guessing.

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

- The current plan outcome and its important risks have sufficient task coverage.
- Each task begins with a concrete failing test or verification.
- Tasks are small, behavior-oriented, and independently executable within their milestone where possible.
- Test doubles remain at system boundaries.
- Implementation steps name the relevant code areas without becoming line-by-line coding instructions.
- Completion evidence includes the right tests and operational checks.

After writing:

1. Print the absolute output path.
2. Identify the first unblocked task.
3. Stop for task-list review. Do not edit implementation or test code. Suggest starting work through the Task Implementation workflow only after the user approves the task list, asks to execute a task, and the target repository has a clean Git worktree.
