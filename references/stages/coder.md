# Coder Stage

## Goal and Input

Implement the authorized outcome. Receive either an approved TDD Task with its Plan from the standard workflow, or the user's bounded change request from two-pack. The calling workflow owns authorization and the initial clean-baseline check; do not introduce another approval gate.

## Execution

- Keep implementation inside the supplied boundary. Apply [implementation thinking](../implementation-thinking.md) for reuse and design choices.
- For behavior changes and bug fixes, follow [TDD](../testing.md).
- For behavior-preserving local renames or mechanical edits, use relevant existing tests, compilation, and reference checks; do not invent tests that merely mirror the edit.
- Run focused verification and the broader checks required by the repository or affected behavior. Record what actually ran and distinguish pre-existing failures from new ones.

Load [Java guidance](../java-style.md) or [delivery guidance](../delivery-and-operations.md) only when relevant. If evidence invalidates the authorized boundary, pause through the calling workflow rather than expanding the change.

## Completion and Handoff

Enter cleaner when the requested outcome is implemented and required verification passes. Leave a concise in-context account of intent, changed areas, verification results, and review concerns. Do not create a handoff document. An unresolved implementation or verification failure is a blocker, not a successful handoff.
