# Implementation Planning

Use this workflow when asked to create a technical implementation plan from a requirement document, issue, or feature description. Produce a review-ready plan grounded in the current repository, not a generic architecture proposal.

## Resolve the Input and Output

1. If the input is a file path, read it as the source requirement. Otherwise treat the input as the feature description.
2. Write the plan in the same language as the source. Preserve technical terms, identifiers, API names, and established domain language.
3. Derive a lowercase hyphenated slug from the feature title.
4. Write to `docs/YYYY-MM-DD-implementation-plan-<slug>.md`.
5. If `docs/` does not exist, ask the user which output directory to use before writing.

## Understand Before Designing

1. Work top-down from the outcome, acceptance behavior, domain rules, constraints, and production signals.
2. Work bottom-up through the current execution flow, architecture, module boundaries, naming, tests, dependencies, and operational constraints.
3. Use repository evidence for every existing file, symbol, component, contract, and dependency named in the plan. Clearly mark proposed artifacts as new.
4. Identify behavior that can be reused directly, composed, or adapted. Explain semantic fit instead of citing structural similarity alone.
5. Identify characterization gaps where current behavior needs protection before modification.
6. Reconcile the desired behavior with the current design and name the concrete change points.

Ask for clarification only when an unresolved requirement or design decision would materially alter scope, architecture, compatibility, data, or delivery. Otherwise record a small explicit assumption and continue.

## Make Design Decisions

- Fit the existing architecture unless a demonstrated problem justifies changing it.
- Make domain concepts, rules, invariants, and useful DSL vocabulary visible.
- Introduce a design pattern only for a concrete force or credible variation axis. Record important patterns considered and rejected.
- Preserve evidence-backed extension boundaries and avoid speculative flexibility.
- Cover relevant API, data, security, resilience, performance, and user-experience concerns.
- Use a Mermaid diagram that reflects the repository. Highlight changed components and show upstream and downstream dependencies.

## Plan Implementation and Testing

- Sequence high-level milestones as thin, independently verifiable vertical slices.
- Name the first meaningful failing behavior test for each slice without expanding the plan into task-level instructions.
- Prefer real domain collaborators and observable state or behavior. Use substitutes only at true system boundaries.
- Include characterization, integration, contract, or end-to-end coverage where risks cross boundaries.
- Keep detailed task breakdown out of the plan; create Implementation Tasks after the plan is reviewed.

## Plan Delivery and Learning

Address migration order, backward compatibility, rollout controls, rollback, ownership, telemetry, failure containment, and recovery in proportion to risk. Define how production evidence will become a decision, task, test, model change, or explicit non-action.

## Create the Document

Copy and adapt `assets/implementation-plan-template.md`. Remove irrelevant optional sections rather than filling them with “N/A.” Keep the document detailed enough to create executable tasks without pretending unresolved decisions are settled.

Before finishing, verify that:

- Business outcomes connect to domain decisions, code changes, tests, delivery, and production signals.
- Proposed changes match repository architecture, naming, and dependency conventions.
- Reuse and pattern decisions explain semantics and design forces.
- Milestones are vertical, reviewable, and testable rather than component inventories.
- Compatibility, migration, rollback, and observability are proportional to risk.

After writing:

1. Print the absolute output path.
2. Summarize the key architectural decisions in 3–5 sentences.
3. Suggest creating actionable work with the Implementation Task workflow.

