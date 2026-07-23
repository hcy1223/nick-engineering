# Implementation Thinking

Implement requirements by meeting in the middle: decompose intent from the top down, discover the current system from the bottom up, and reconcile both views before changing code.

## Contents

- [Decompose Top-Down](#decompose-top-down)
- [Discover Bottom-Up](#discover-bottom-up)
- [Reconcile Both Views](#reconcile-both-views)
- [Reuse by Meaning](#reuse-by-meaning)
- [Apply Design Patterns for Demonstrated Forces](#apply-design-patterns-for-demonstrated-forces)
- [Drive the Slice with TDD](#drive-the-slice-with-tdd)
- [Review After the Behavior Works](#review-after-the-behavior-works)
- [Preserve Appropriate Extension](#preserve-appropriate-extension)
- [Completion Questions](#completion-questions)

## Decompose Top-Down

1. State the user or business outcome.
2. Turn the outcome into concrete acceptance examples.
3. Identify domain decisions, state transitions, failures, and guardrails.
4. Slice the behavior vertically from an observable entry point to an observable result.
5. Order slices by value, uncertainty, dependency, and reversibility.

Keep each slice meaningful to a user or caller. Do not decompose first by controller, service, repository, or database layer.

## Discover Bottom-Up

1. Trace current behavior through code and behavioral tests.
2. Find similar domain flows, policies, value types, adapters, and extension points.
3. Identify local conventions, invariants, compatibility constraints, and operational assumptions.
4. Distinguish stable domain policy from framework and infrastructure mechanisms.
5. Mark uncertainty that requires a characterization test, experiment, or production evidence.

Do not assume the feature starts from an empty system. Let the existing code reveal what the system already knows and what a safe change must preserve.

## Reconcile Both Views

Map each desired behavior to an existing capability, a capability that can be adapted, or a genuine gap. Choose the smallest vertical slice that closes one gap without weakening current behavior.

If the top-down design fights the codebase, do not automatically force either view. Determine whether the requirement exposed a missing abstraction, the existing model contains valuable constraints, or the apparent reuse is only superficial similarity.

## Reuse by Meaning

Evaluate reuse in this order:

1. Reuse directly when behavior, invariants, lifecycle, and failure semantics match.
2. Compose or extract a shared policy when the knowledge is the same but delivery mechanisms differ.
3. Adapt at a boundary when a stable capability has an incompatible interface.
4. Duplicate temporarily when similarity is accidental or the abstraction is not yet understood.

Prefer reusing domain knowledge over reusing lines of code. Reject reuse that creates misleading names, hidden conditionals, temporal coupling, or a dependency on an unrelated lifecycle.

Before extending an existing abstraction, inspect its callers and tests. Preserve its contract or make the compatibility decision explicit.

## Apply Design Patterns for Demonstrated Forces

Do not begin by selecting a pattern. First name the force:

- A policy varies independently from the workflow.
- Construction depends on type, configuration, or environment.
- An external interface must be translated at a boundary.
- Behavior must be added without changing a stable core.
- State transitions or commands require explicit semantics.

Use the smallest pattern that makes the force visible. Prefer domain concepts over pattern-heavy class names. Justify a pattern only when it reduces conditional complexity, coupling, duplicated knowledge, or change cost.

Keep direct code when there is one case, one credible path, and no meaningful variation axis. Refactor toward a pattern when a second concrete case or present design pressure clarifies the abstraction. Do not create factories, strategies, visitors, or extension registries only because they may be useful later.

## Drive the Slice with TDD

1. Start from one acceptance example or domain rule.
2. Write the smallest failing behavioral test and confirm the failure reason.
3. Implement the simplest coherent change that passes.
4. Refactor production and test code while preserving behavior.
5. Repeat until the vertical slice and important failures are complete.

In legacy code, add characterization tests around behavior that must not change before refactoring toward the new design. Prefer real objects and observable behavior; substitute true boundaries only.

Let testing difficulty inform the design. Excessive setup, many internal mocks, or awkward assertions usually indicate misplaced responsibility, an unclear boundary, or an oversized slice.

## Review After the Behavior Works

Read the complete diff as if encountering the code for the first time. Look for:

- Names that hide domain meaning.
- Long methods or classes with multiple reasons to change.
- Feature envy and behavior located away from the knowledge it needs.
- Primitive obsession and invalid states represented by loose values.
- Duplicated domain knowledge disguised by different syntax.
- Shotgun surgery and changes scattered across unrelated modules.
- Conditional complexity that reveals an unmodeled type or policy.
- Leaky abstractions and framework concerns inside domain code.
- Tests coupled to implementation details or excessive mocks.
- Speculative generality and unused extension mechanisms.

Refactor now when the smell is inside the changed area, behavior is protected, and the remedy is proportionate. Record a follow-up when the remedy crosses a larger boundary, lacks behavioral evidence, or would make delivery unsafe.

## Preserve Appropriate Extension

Design for the next credible change, not every imaginable change.

- Keep stable policy separate from volatile mechanisms.
- Encapsulate the demonstrated variation axis.
- Keep interfaces narrow and name them by domain role.
- Make one likely extension local without turning the system into a generic framework.
- Preserve compatibility and tests at the extension boundary.
- Prefer a design that is easy to refactor over one that is infinitely configurable.

An extension point is appropriate when evidence identifies who will extend it, what will vary, and which invariant must remain stable. Otherwise keep the implementation concrete.

## Completion Questions

Before completing the task, ask:

- What did the top-down view reveal that the code did not?
- What did the bottom-up view reveal that the requirement did not?
- Which knowledge was reused, and why is the semantic fit sound?
- Which pattern was adopted or rejected, and what force drove that decision?
- Which tests drove the design and document the resulting behavior?
- Which smells were removed, accepted, or deferred?
- Is the next credible extension local without speculative infrastructure?
