---
name: nick-engineering
description: Apply Nick's engineering method across product discovery, domain modeling, code and architecture, TDD, delivery, and production operation. Use when planning a feature, creating or implementing engineering tasks, designing a domain model or small DSL, reviewing implementation quality, shaping Java code, choosing tests and test doubles, preparing a safe Git delivery workflow, operating a service, or feeding production evidence into the next product and engineering decision.
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
2. Model the domain language and decisions. Prefer a small DSL when it compresses recurring domain knowledge rather than merely hiding syntax.
3. Implement through TDD as a design discipline. Grow behavior in small vertical slices.
4. Prefer Chicago-style tests: real objects, observable state and behavior, and substitutes at true system boundaries. Avoid mocks that mirror implementation details.
5. Make delivery and operation part of the design: migration, compatibility, rollback, telemetry, ownership, and failure handling.
6. Inspect production evidence and turn learning into the next product, model, test, or operational decision.

Treat clear code and behavioral tests as the most trustworthy description of current system behavior. Keep supplementary documentation focused on intent, constraints, decisions, and operational knowledge that code cannot express well.

## Route to Detailed Guidance

Load only the references needed for the current task:

- Product intent, feature slicing, task creation, implementation, and Git workflow: [references/workflows.md](references/workflows.md)
- Domain modeling, architecture, and knowledge-compressing DSLs: [references/modeling-and-dsl.md](references/modeling-and-dsl.md)
- TDD, Chicago-school testing, test boundaries, and test quality: [references/testing.md](references/testing.md)
- Delivery design, production operation, observability, and feedback: [references/delivery-and-operations.md](references/delivery-and-operations.md)
- Java practices, idioms, and naming preferences: [references/java-style.md](references/java-style.md)

For end-to-end work, read the relevant domain-specific references together rather than applying one stage in isolation.

## Use the Assets

Copy and adapt templates instead of editing them in place:

- `assets/feature-plan-template.md` for feature discovery and planning.
- `assets/engineering-task-template.md` for independently deliverable tasks.
- `assets/production-learning-template.md` for turning operational evidence into decisions.

Keep artifacts proportional to risk. A small change may need only a few lines; uncertainty, irreversibility, or operational risk justify more detail.

## Definition of Done

Before declaring work complete, verify that:

- The implemented behavior advances an explicit outcome and success signal.
- Domain concepts and names are visible in the code.
- Tests drove and explain behavior without excessive mocking.
- The change is understandable, cohesive, and safe to evolve.
- Delivery, compatibility, rollback, and production visibility are addressed in proportion to risk.
- New production learning has a destination: a decision, task, test, model change, or explicitly recorded non-action.
