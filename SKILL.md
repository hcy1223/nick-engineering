---
name: nick-engineering
description: Apply Nick's engineering method across product discovery, implementation, domain modeling, code and architecture, TDD, delivery, and production operation. Use when ingesting a one-line request, issue, or existing Story document; clarifying requirements through multiple rounds like a senior developer before planning or coding; mapping a broad Story into ordered vertical-slice plans; creating one detailed technical implementation plan for the next slice; breaking an approved implementation plan into test-first tasks; decomposing requirements top-down and bottom-up; implementing approved tasks on an existing codebase; deciding what to reuse or when a design pattern is justified; driving implementation with TDD; reviewing code smells and appropriate extension points; creating engineering tasks; designing a domain model or small DSL; shaping Java code; choosing tests and test doubles; preparing a safe Git delivery workflow; operating a service; or feeding production evidence into the next decision.
---

# Nick Engineering

Apply this method independently of the host AI agent. Keep the core workflow, references, and output artifacts free of vendor-specific commands. Treat agent-specific metadata, invocation syntax, and installation paths as optional adapters.

Treat engineering as one learning loop:

1. Build the right thing.
2. Build it right.
3. Run it right.
4. Feed production learning back into the next decision.

Working code is the floor, not the goal. Optimize for correct product decisions, clear domain expression, maintainable implementation, trustworthy tests, safe delivery, and observable production behavior together.

## Respect the Stage Gates

Treat the workflow as explicit states controlled by the user:

| Current stage | Output | Gate to the next stage |
| --- | --- | --- |
| Requirement Understanding | Focused clarification questions or a Requirement Ready decision | Material requirement ambiguities are resolved |
| Implementation Planning | A lightweight Plan Map when needed, plus one detailed plan for the next vertical slice | User explicitly says the detailed plan is OK or otherwise approves it |
| Implementation Tasks | Small Red–Green–Refactor task list for the approved plan | User reviews and approves the tasks, asks to execute one, and the Git worktree is clean |
| Task Implementation | Tested, reviewed increment with delivery evidence | User authorizes delivery or the normal repository workflow permits it |
| Production Learning | Evidence and resulting decision | User selects or confirms the next requirement or plan |

Do not cross a gate because a later action seems implied. A one-line request, issue, or existing Story document authorizes requirement analysis; none is automatically Requirement Ready. If material ambiguity remains, ask a focused group of questions and stop, repeating across as many rounds as needed. When the requirement becomes ready, map a broad Story into ordered lightweight plan slices and create only the first detailed Implementation Plan. For a single-slice request, omit the redundant Plan Map. Stop after planning. If the user then explicitly says the detailed plan is OK, approved, or ready to proceed, treat that response as authorization to create its task list. Apply engineering judgment to the decomposition, output only the tasks, and stop. Never edit implementation or test code until the user has reviewed and approved the task list, explicitly asked to execute a task, and the Git worktree is clean.

Before beginning each approved task and before its first implementation edit, run `git status --porcelain` in the target repository. Any staged, unstaged, or untracked entry means the worktree is not clean: report the state and stop without writing code. Never commit, stash, discard, or otherwise hide existing changes merely to pass this gate unless the user separately authorizes that exact action.

## Apply the Method

1. Establish the outcome, users, constraints, and evidence of success before choosing a solution.
2. Decompose from both directions. Work top-down from the outcome to behavioral slices and bottom-up from current code to reusable capabilities, constraints, and safe change points. Reconcile them before editing.
3. Map a broad User Story into ordered vertical-slice plans, but detail only the next small, independently verifiable slice. Let delivery and production feedback reshape later plans before detailing them.
4. Model the domain language and decisions. Prefer a small DSL when it compresses recurring domain knowledge rather than merely hiding syntax.
5. Reuse existing behavior when semantics match. Introduce a design pattern only when it resolves a concrete force or variation axis more clearly than direct code.
6. After the user approves the current plan, use professional engineering judgment to break it into executable tasks; do not mechanically restate plan sections. Implement later through TDD as a design discipline.
7. Prefer Chicago-style tests: real objects, observable state and behavior, and substitutes at true system boundaries. Avoid mocks that mirror implementation details.
8. Review the completed change for code smells, accidental coupling, and the next credible extension. Refactor demonstrated problems without building speculative flexibility.
9. Make delivery and operation part of the design: migration, compatibility, rollback, telemetry, ownership, and failure handling.
10. Inspect production evidence and turn learning into the next requirement, plan, task, model, test, or operational decision.

Treat clear code and behavioral tests as the most trustworthy description of current system behavior. Keep supplementary documentation focused on intent, constraints, decisions, and operational knowledge that code cannot express well.

## Route to Detailed Guidance

Load only the references needed for the current task:

- Ingesting and clarifying a one-line request, issue, or Story document before planning or implementation: [references/requirements-analysis.md](references/requirements-analysis.md)
- Product intent, feature slicing, task creation, and implementation: [references/workflows.md](references/workflows.md)
- Git safety, commit boundaries, and English Conventional Commit messages: [references/git-workflow.md](references/git-workflow.md)
- Creating a repository-grounded technical implementation plan from a requirement file or feature description: [references/implementation-planning.md](references/implementation-planning.md)
- Breaking a reviewed implementation plan into small, executable Red–Green–Refactor tasks: [references/implementation-tasks.md](references/implementation-tasks.md)
- Requirement decomposition, code reuse, design-pattern judgment, implementation review, and appropriate extensibility: [references/implementation-thinking.md](references/implementation-thinking.md)
- Domain modeling, architecture, and knowledge-compressing DSLs: [references/modeling-and-dsl.md](references/modeling-and-dsl.md)
- TDD, Chicago-school testing, test boundaries, and test quality: [references/testing.md](references/testing.md)
- Delivery design, production operation, observability, and feedback: [references/delivery-and-operations.md](references/delivery-and-operations.md)
- Java practices, idioms, and naming preferences: [references/java-style.md](references/java-style.md)

For end-to-end work, read the relevant domain-specific references together rather than applying one stage in isolation.

## Use the Assets

Copy and adapt templates instead of editing them in place:

- `assets/feature-plan-template.md` for a multi-slice Story's lightweight Plan Map.
- `assets/engineering-task-template.md` for independently deliverable tasks.
- `assets/implementation-plan-template.md` as the output document skeleton for a technical implementation plan.
- `assets/implementation-task-template.md` as the output skeleton for the current plan's TDD task list.
- `assets/production-learning-template.md` for turning operational evidence into decisions.

Keep artifacts proportional to risk. A small change may need only a few lines; uncertainty, irreversibility, or operational risk justify more detail.

## Definition of Done

Before declaring work complete, verify that:

- The implemented behavior advances an explicit outcome and success signal.
- Top-down intent and bottom-up code understanding agree on the chosen slice and change points.
- Reuse and design-pattern decisions are based on semantic fit and demonstrated forces.
- Domain concepts and names are visible in the code.
- Tests drove and explain behavior without excessive mocking.
- Code smells introduced or exposed by the change are resolved or deliberately recorded.
- The change is understandable, cohesive, and leaves only evidence-backed extension points.
- Delivery, compatibility, rollback, and production visibility are addressed in proportion to risk.
- New production learning has a destination: a decision, task, test, model change, or explicitly recorded non-action.
