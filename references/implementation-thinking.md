# Implementation Thinking

Use this guidance when implementation requires judgment about reuse, patterns, code smells, or future extension. Requirement slicing belongs in `requirements-analysis.md`; TDD mechanics belong in `testing.md`.

## Reconcile Intent with the Current System

Before changing code:

1. Map the approved behavior to existing capabilities, adaptable behavior, and genuine gaps.
2. Trace relevant callers and behavioral tests before extending an abstraction.
3. Separate stable domain policy from framework and infrastructure mechanisms.
4. Protect current contracts or make the compatibility decision explicit.

When the desired design fights the codebase, determine whether the requirement exposed a missing abstraction, the current model preserves valuable constraints, or the apparent reuse is only superficial.

## Reuse by Meaning

Choose in this order:

1. Reuse directly when behavior, invariants, lifecycle, and failure semantics match.
2. Compose or extract shared policy when the knowledge matches but delivery differs.
3. Adapt at a boundary when a stable capability has an incompatible interface.
4. Duplicate temporarily when similarity is accidental or the abstraction is not understood.

Prefer reused domain knowledge over reused lines. Reject reuse that creates misleading names, hidden conditionals, temporal coupling, or dependency on an unrelated lifecycle.

## Apply Patterns for Demonstrated Forces

Name the force before the pattern. Examples include independently varying policy, environment-dependent construction, boundary translation, added behavior around a stable core, or explicit state transitions.

Use the smallest pattern that makes the force visible and reduces coupling, conditional complexity, duplicated knowledge, or change cost. Prefer domain names over pattern-heavy class names.

Keep direct code when there is one case and no credible variation axis. Do not create factories, strategies, visitors, or extension registries for hypothetical reuse.

## Review the Completed Behavior

Read the full diff and look for:

- Names that hide domain meaning.
- Responsibilities with multiple reasons to change.
- Behavior located away from the knowledge it needs.
- Primitive obsession or invalid states represented by loose values.
- Duplicated domain knowledge and shotgun surgery.
- Conditional complexity that reveals a missing type or policy.
- Framework concerns leaking into domain code.
- Tests coupled to implementation details.
- Speculative generality and unused extension mechanisms.

Refactor now when the smell is inside the changed area, behavior is protected, and the remedy is proportionate. Record a follow-up when the correction crosses a larger boundary or would make delivery unsafe.

## Preserve Only Credible Extension Points

Design for the next evidenced change, not every imaginable one.

- Separate stable policy from volatile mechanisms.
- Encapsulate the demonstrated variation axis.
- Keep interfaces narrow and name them by domain role.
- Make a likely extension local without creating a generic framework.
- Preserve compatibility and tests at the boundary.

Keep the implementation concrete unless evidence identifies who will extend it, what will vary, and which invariant must remain stable.
