# Requirement Understanding

Use this workflow as the default entry point for every new requirement, whether the user provides one sentence, an issue, or an apparently complete Story or requirements document. Treat an existing artifact as requirement evidence, not as proof that the requirement is ready for planning.

While the requirement is vague, this is an analysis-only stage. Inspect requirements, relevant code, tests, documentation, and production evidence, but do not create an Implementation Plan, generate tasks, or edit production code.

## Resolve the Requirement Input

- If the input names a file, read the complete file and the directly referenced material needed to understand it.
- Otherwise treat the user's message as the initial requirement description.
- Preserve the source language, domain terms, identifiers, and links.
- Compare the written Story with current repository behavior; do not assume either is complete or current.
- Do not treat labels such as “Ready,” “Refined,” or “Approved” as a substitute for the Requirement Ready Gate.

## Build a Shared Understanding

Analyze the request from both directions:

### Top-down

- Identify the user or stakeholder, their problem, and the outcome they need.
- Describe desired behavior with concrete acceptance examples.
- Define observable success and guardrail signals.
- Separate in-scope behavior, non-goals, and possible future slices.
- Identify domain terms, rules, invariants, permissions, and exceptional cases.

### Bottom-up

- Trace the current behavior through relevant entry points, modules, contracts, data, and downstream effects.
- Find existing tests that document current behavior.
- Identify reusable capabilities, constraints, compatibility obligations, and safe change points.
- Note operational realities such as migrations, rollout, ownership, observability, and failure handling.

Reconcile both views. Do not assume the requested mechanism is the correct solution, and do not invent repository facts that have not been inspected.

## Separate Knowledge from Uncertainty

Classify findings as:

- **Known**: Supported by the user's requirement, repository evidence, tests, or production evidence.
- **Assumed**: A provisional interpretation that is safe to expose for confirmation.
- **Unknown**: Missing information that could change behavior, scope, domain rules, contracts, data, security, delivery, or success criteria.

Ask focused questions for material unknowns from a senior developer's perspective. Challenge unclear outcomes and requested mechanisms, but do not ask the user for facts that can be discovered safely from the repository. Ask the smallest useful group of high-impact questions, explain why each decision matters, and wait for the answers before reassessing readiness. Expect multiple rounds when later answers expose new domain rules or boundary decisions; do not compress every possible question into one overwhelming questionnaire.

## Discover Agile Slices

When the requirement is broader than one independently verifiable behavior, discover candidate vertical slices ordered by value, risk, learning, and real dependency. Use them to test whether the Story is understood and whether the first slice can be selected. Do not design the slices in detail and do not turn them into tasks yet.

## Requirement Ready Gate

Before proposing the next stage, verify that:

- The problem, beneficiary, and intended outcome are explicit.
- Current and desired behavior are distinguishable.
- Acceptance examples cover the main behavior and important failure cases.
- Scope, non-goals, domain rules, and constraints are visible.
- Material unknowns are resolved or explicitly owned.
- The next small vertical slice can be selected without guessing.

## Clarify or Create the Plan

If the requirement is not ready:

- Briefly state the current understanding only where it helps frame the uncertainty.
- Ask the material clarification questions.
- Stop and wait for the user's answers.
- Repeat this loop until the Requirement Ready Gate is satisfied.

When the requirement is ready, proceed directly to `references/implementation-planning.md`. Do not emit a separate Requirement Understanding artifact unless the user asks for one. For a broad Story, create a lightweight Plan Map and one detailed Implementation Plan for the recommended next slice. For a single-slice request, create only the detailed plan. Then stop; do not generate tasks or edit production code.
