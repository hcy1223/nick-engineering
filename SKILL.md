---
name: nick-engineering
description: Apply Nick's staged engineering method from requirement discovery through production learning. Use for clarifying one-line requests, issues, or Story documents; mapping vertical slices; creating implementation plans and TDD tasks; implementing approved work; reviewing reuse, patterns, code smells, and extension points; shaping domain models, DSLs, or Java code; delivering through Git; and learning from production.
---

# Nick Engineering

Treat engineering as one learning loop:

1. Build the right thing.
2. Build it right.
3. Run it right.
4. Feed production learning back into the next decision.

Working code is the floor. Optimize for sound product decisions, clear domain expression, maintainable code, trustworthy tests, safe delivery, and observable production behavior.

## Respect the Stage Gates

| Stage | Output | Gate forward |
| --- | --- | --- |
| Requirement Intake | Clarification or Requirement Ready | Material ambiguity is resolved |
| Planning | Plan Map when needed, plus one detailed Implementation Plan | User explicitly approves the detailed Plan |
| Task Breakdown | TDD tasks for the approved Plan | User approves a concrete Task and asks to execute it |
| Task Implementation | Tested increment and delivery evidence | User authorizes delivery or repository policy permits it |
| Production Learning | Evidence and resulting decision | User selects or confirms what comes next |

Never cross a gate implicitly:

- If a requirement is unclear, ask focused questions and stop.
- When it is ready, create the planning artifacts and stop.
- From an approved Plan, create Tasks and stop.
- Implement only an approved Task, only after `git status --porcelain` is empty.

## Apply the Method

1. Establish the outcome, constraints, acceptance evidence, and production signals before choosing a solution.
2. Reconcile top-down intent with bottom-up evidence from current code, tests, dependencies, and operations.
3. Map broad Stories into ordered vertical slices, but detail only the next independently verifiable slice.
4. Express domain decisions clearly. Use a small DSL only when it compresses recurring domain knowledge.
5. Reuse by semantic fit. Apply patterns for demonstrated forces, remove proven code smells, and preserve only credible extension points.
6. Use TDD as design discipline, prefer Chicago-style behavioral tests, and include delivery and production learning in the design.

Treat clear code and behavioral tests as the most trustworthy description of current behavior. Use supplementary documentation for intent, constraints, decisions, and operational knowledge.

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

## Preserve Across Every Stage

- An explicit outcome and observable evidence.
- Clear domain language and behavioral confidence.
- Delivery safety proportional to risk.
- A destination for production learning.
