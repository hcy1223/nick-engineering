# Implementation Planning

Create planning artifacts only after `references/requirements-analysis.md` reaches Requirement Ready. Otherwise return to clarification and stop.

## Resolve the Output

1. Preserve the requirement's language, technical terms, identifiers, and links.
2. If `docs/` does not exist, ask which output directory to use before writing.
3. For a multi-slice Story, write `docs/YYYY-MM-DD-plan-map-<story-slug>.md` from `assets/plan-map-template.md`.
4. Write the current slice to `docs/YYYY-MM-DD-implementation-plan-<slice-slug>.md` from `assets/implementation-plan-template.md`.

Derive lowercase hyphenated slugs from the Story outcome and selected slice, not from arbitrary file names.

## Map the Story Without Designing It All

An Implementation Plan covers one independently verifiable vertical slice. For a broader Story:

1. Order candidate slices by value, risk, learning, and real dependency.
2. Give each only an observable outcome, ordering reason, dependencies, success evidence, and status.
3. Mark exactly one slice `Next`; keep the rest `Later`.
4. Detail only `Next`. Let delivery evidence reorder, split, merge, add, or drop later slices.

Do not create separate plans for controllers, services, repositories, database work, or other technical layers. For a genuine single-slice requirement, omit the redundant Plan Map.

## Ground the Current Plan

Reconcile desired behavior with repository evidence before choosing changes:

- Trace the relevant current flow, tests, contracts, data, dependencies, and operational constraints.
- Name only verified existing artifacts; mark proposed artifacts as new.
- Reuse, compose, or adapt behavior only when semantics match.
- Protect important current behavior with characterization coverage where needed.
- Fit existing architecture unless a demonstrated problem justifies changing it.
- Make domain rules, invariants, and credible extension boundaries explicit.
- Record a design pattern only when a concrete force justifies it.
- Ask for clarification instead of inventing a product decision that changes behavior or scope.

Cover API, data, security, resilience, performance, user experience, migration, rollout, rollback, and observability only where relevant. Use Mermaid only when it materially improves review.

## Keep Planning Above Task Level

Name the first meaningful failing behavior and a few likely task boundaries to prove executability. Do not write the full Red–Green–Refactor checklist yet. Keep later Plan candidates out of the current execution scope.

Complete the readiness checklist in the Implementation Plan template. Remove irrelevant optional sections instead of filling them with “N/A.”

## Stop After Planning

Print the absolute Plan Map path when created, then the detailed Implementation Plan path. State that the detailed Plan is ready for review and later slices remain intentionally lightweight. Do not create Tasks, detail another Plan, or edit code.
