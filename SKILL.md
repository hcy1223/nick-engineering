---
name: nick-engineering
description: Apply Nick's staged engineering method from requirement discovery through production learning. Use for clarifying one-line requests, issues, or Story documents; mapping vertical slices; creating implementation plans and TDD tasks; implementing approved work or explicit /two-pack local code changes; reviewing reuse, patterns, code smells, and extension points; shaping domain models, DSLs, or Java code; delivering through Git; and learning from production.
---

# Nick Engineering

Treat engineering as one learning loop:

1. Build the right thing.
2. Build it right.
3. Run it right.
4. Feed production learning back into the next decision.

Working code is the floor. Optimize for sound product decisions, clear domain expression, maintainable code, trustworthy tests, safe delivery, and observable production behavior.

## Select the Workflow

Use the standard workflow below by default. An explicit `/two-pack <change>` or a natural-language request to use two-pack selects [the minimal workflow](references/two-pack.md): `newtask → coder → cleaner → done`. This invocation authorizes both execution stages without Plan or Task artifacts or intermediate approval. Do not infer this mode merely because a change looks small.

Two-pack is for clear, local code changes with stable external contracts. Database schema, constraint, and data migration changes are excluded. If the request does not fit, explain why and ask whether to use the standard workflow before implementation.

Plan Map, Implementation Plan, and TDD Task are artifacts. Coder and cleaner are shared execution stages; newtask and done are workflow states. Stage prompts define responsibilities, while each workflow defines admission and transitions. Stages do not require separate agents.

`/two-pack` is a workflow invocation convention interpreted after this skill is loaded, not a portable native slash-command registration. Hosts may adapt it; natural-language invocation remains supported.

## Respect the Standard Workflow Stage Gates

| Stage | Output | Gate forward |
| --- | --- | --- |
| Requirement Intake | Clarification or Requirement Ready | Material ambiguity is resolved |
| Planning | Plan Map when needed, plus one detailed Implementation Plan | User explicitly approves the detailed Plan |
| Task Breakdown | TDD tasks for the approved Plan | User approves a concrete Task and asks to execute it |
| Task Implementation | Tested increment and delivery evidence | User authorizes delivery or repository policy permits it |
| Production Learning | Evidence and resulting decision | User selects or confirms what comes next |

## Shared Execution Rules

Both workflows require a clean Git baseline before their first implementation edit; follow [the baseline check](references/task-implementation.md#enforce-a-clean-baseline). Do not repeat that check between coder and cleaner against changes made by the current run.

With Node.js 22.18+ available, use the bundled [check-baseline.ts](scripts/check-baseline.ts) as described in that reference. For maintenance of this skill itself, run [validate-skill.ts](scripts/validate-skill.ts) to check metadata and local resource links; structural validity does not establish workflow readiness or user approval.

Run [coder](references/stages/coder.md) then [cleaner](references/stages/cleaner.md) continuously within the authorized scope. Preserve existing delivery authorization boundaries; completing the workflow does not authorize commit, push, or deployment.

## Load Only What the Current Stage Needs

- Requirement intake and readiness: [references/requirements-analysis.md](references/requirements-analysis.md)
- Plan Map and Implementation Plan creation: [references/implementation-planning.md](references/implementation-planning.md)
- Task breakdown from an approved Plan: [references/implementation-tasks.md](references/implementation-tasks.md)
- Execution of an approved Task and clean-worktree gate: [references/task-implementation.md](references/task-implementation.md)
- Reuse, patterns, code smells, and extension points: [references/implementation-thinking.md](references/implementation-thinking.md)
- Domain modeling, architecture, and DSLs: [references/modeling-and-dsl.md](references/modeling-and-dsl.md)
- TDD, Chicago testing, and test boundaries: [references/testing.md](references/testing.md)
- Delivery, operation, observability, and feedback: [references/delivery-and-operations.md](references/delivery-and-operations.md)
- Java practices and naming: [references/java-style.md](references/java-style.md)
- Git safety and English Conventional Commits: [references/git-workflow.md](references/git-workflow.md)

Load another reference only when the current stage requires that concern.

## Use the Output Assets

- `assets/plan-map-template.md` for a multi-slice Story.
- `assets/implementation-plan-template.md` for the current slice.
- `assets/implementation-task-template.md` for its TDD tasks.
- `assets/production-learning-template.md` for operational evidence and decisions.

Copy and adapt assets; do not edit them in place. Keep artifacts proportional to risk.
