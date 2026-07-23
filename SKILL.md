---
name: nick-engineering
description: Apply Nick's engineering method across product discovery, implementation, domain modeling, code and architecture, TDD, delivery, and production operation. Use when planning a feature or creating a technical implementation plan from requirements; breaking an implementation plan into test-first tasks; decomposing requirements top-down and bottom-up; implementing on an existing codebase; deciding what to reuse or when a design pattern is justified; driving implementation with TDD; reviewing code smells and appropriate extension points; creating engineering tasks; designing a domain model or small DSL; shaping Java code; choosing tests and test doubles; preparing a safe Git delivery workflow; operating a service; or feeding production evidence into the next decision.
---

# Nick Engineering

Treat engineering as one learning loop:

1. Build the right thing.
2. Build it right.
3. Run it right.
4. Feed production learning back into the next decision.

Working code is the floor, not the goal. Optimize for correct product decisions, clear domain expression, maintainable implementation, trustworthy tests, safe delivery, and observable production behavior together.

## Apply the Method

1. Establish the outcome, users, constraints, and evidence of success before choosing a solution.
2. Decompose from both directions. Work top-down from the outcome to behavioral slices and bottom-up from current code to reusable capabilities, constraints, and safe change points. Reconcile them before editing.
3. Model the domain language and decisions. Prefer a small DSL when it compresses recurring domain knowledge rather than merely hiding syntax.
4. Reuse existing behavior when semantics match. Introduce a design pattern only when it resolves a concrete force or variation axis more clearly than direct code.
5. Implement through TDD as a design discipline. Grow behavior in small vertical slices.
6. Prefer Chicago-style tests: real objects, observable state and behavior, and substitutes at true system boundaries. Avoid mocks that mirror implementation details.
7. Review the completed change for code smells, accidental coupling, and the next credible extension. Refactor demonstrated problems without building speculative flexibility.
8. Make delivery and operation part of the design: migration, compatibility, rollback, telemetry, ownership, and failure handling.
9. Inspect production evidence and turn learning into the next product, model, test, or operational decision.

Treat clear code and behavioral tests as the most trustworthy description of current system behavior. Keep supplementary documentation focused on intent, constraints, decisions, and operational knowledge that code cannot express well.

## Route to Detailed Guidance

Load only the references needed for the current task:

- Product intent, feature slicing, task creation, implementation, and Git workflow: [references/workflows.md](references/workflows.md)
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

- `assets/feature-plan-template.md` for feature discovery and planning.
- `assets/engineering-task-template.md` for independently deliverable tasks.
- `assets/implementation-plan-template.md` as the output document skeleton for a technical implementation plan.
- `assets/implementation-task-template.md` as the output skeleton for a milestone-structured TDD task list.
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
