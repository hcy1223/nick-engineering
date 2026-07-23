# Implementation Planning

Use this workflow when asked to create a technical implementation plan from a requirement document, issue, or feature description. Produce a review-ready plan grounded in the current repository, not a generic architecture proposal.

## Require Requirement Ready

Do not create a plan while material requirement ambiguity remains. First read `references/requirements-analysis.md`, analyze the requirement and current system, and assess the Requirement Ready Gate.

The gate is satisfied when:

- The problem, beneficiary, desired behavior, acceptance examples, scope, constraints, and material decisions are sufficiently clear; and
- The next small vertical slice can be selected without guessing about product behavior or important engineering constraints.

If the gate is not satisfied, ask focused clarification questions and stop before choosing a plan boundary or creating an output file. Reassess after the user answers. If the gate is satisfied, create the plan without requiring a separate confirmation step.

## Resolve the Input and Output

1. If the input is a file path, read it as the source requirement. Otherwise treat the input as the feature description.
2. Write the plan in the same language as the source. Preserve technical terms, identifiers, API names, and established domain language.
3. After choosing the plan boundary, derive a lowercase hyphenated slug from the selected slice title.
4. Write to `docs/YYYY-MM-DD-implementation-plan-<slug>.md`.
5. If `docs/` does not exist, ask the user which output directory to use before writing.

## Choose a Small Plan Boundary

Treat an Implementation Plan as the design for one independently verifiable vertical slice, not as the complete technical design for a User Story. A User Story may produce several plans over time.

1. Identify the smallest slice that delivers observable behavior, retires a material risk, or creates valuable learning.
2. Keep the slice end to end. Do not create separate plans for controllers, services, repositories, database work, or other technical layers.
3. If the input is broader than one slice, list candidate plans ordered by value, risk, and real dependency.
4. Create only the next plan unless the user explicitly requests multiple plans. Record later slices as candidate follow-up plans without detailed design or tasks.
5. Derive the output slug from the selected slice rather than the entire parent User Story.

Keep the plan just detailed enough to review the next change safely. Stabilize decisions that affect the current slice and make deferred decisions explicit; do not design the whole story in advance.

## Understand Before Designing

1. Work top-down from the outcome, acceptance behavior, domain rules, constraints, and production signals.
2. Work bottom-up through the current execution flow, architecture, module boundaries, naming, tests, dependencies, and operational constraints.
3. Use repository evidence for every existing file, symbol, component, contract, and dependency named in the plan. Clearly mark proposed artifacts as new.
4. Identify behavior that can be reused directly, composed, or adapted. Explain semantic fit instead of citing structural similarity alone.
5. Identify characterization gaps where current behavior needs protection before modification.
6. Reconcile the desired behavior with the current design and name the concrete change points.

Ask for clarification when an unresolved requirement or design decision would materially alter scope, behavior, architecture, compatibility, data, security, success criteria, or delivery. Do not replace a missing product decision with an engineering assumption. Record only small, reversible assumptions that do not change the confirmed outcome.

## Make Design Decisions

- Fit the existing architecture unless a demonstrated problem justifies changing it.
- Make domain concepts, rules, invariants, and useful DSL vocabulary visible.
- Introduce a design pattern only for a concrete force or credible variation axis. Record important patterns considered and rejected.
- Preserve evidence-backed extension boundaries and avoid speculative flexibility.
- Cover relevant API, data, security, resilience, performance, and user-experience concerns.
- When a diagram materially improves review, use Mermaid to reflect the repository, highlight changed components, and show upstream and downstream dependencies.

## Plan Implementation and Testing

- Name the first meaningful failing behavior test for the selected slice without expanding the plan into task-level instructions.
- Identify a few likely task boundaries only to prove that the plan is executable; defer the complete checklist until plan review.
- Prefer real domain collaborators and observable state or behavior. Use substitutes only at true system boundaries.
- Include characterization, integration, contract, or end-to-end coverage where risks cross boundaries.
- Keep later plan candidates and detailed task breakdown out of the current execution scope.

## Plan Delivery and Learning

Address migration order, backward compatibility, rollout controls, rollback, ownership, telemetry, failure containment, and recovery in proportion to risk. Define how production evidence will become a decision, task, test, model change, or explicit non-action.

## Create the Document

Copy and adapt `assets/implementation-plan-template.md`. Remove irrelevant optional sections rather than filling them with “N/A.” Keep the document detailed enough to create executable tasks without pretending unresolved decisions are settled.

Before finishing, verify that:

- Business outcomes connect to domain decisions, code changes, tests, delivery, and production signals.
- Proposed changes match repository architecture, naming, and dependency conventions.
- Reuse and pattern decisions explain semantics and design forces.
- The plan covers one small vertical slice and leaves later slices as lightweight candidates.
- Expected task boundaries are reviewable and testable rather than component inventories.
- Compatibility, migration, rollback, and observability are proportional to risk.

After writing:

1. Print the absolute output path.
2. State that the Implementation Plan is ready for review.
3. Stop. Do not generate a task list, edit code, or begin implementation.
