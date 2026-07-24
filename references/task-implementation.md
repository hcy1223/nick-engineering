# Task Implementation

Use this workflow only after the user approves a concrete Task and explicitly asks to execute it. A requirement, approved Plan, or unapproved task list is not implementation authorization.

## Enforce a Clean Baseline

Before editing source, tests, configuration, schema, migrations, or generated implementation files for each Task:

1. Run `git status --porcelain` in the target repository.
2. Continue only when it produces no output.
3. If it reports staged, unstaged, or untracked files, show the status and stop.
4. If the target is not a Git repository, stop and ask how to establish a safe baseline.

Do not commit, stash, reset, discard, delete, or hide changes to manufacture a clean state unless the user separately authorizes that exact action. Read-only inspection remains allowed while this gate is closed. The first failing test is implementation work, so check before RED.

## Execute the Approved Task

1. Reconstruct intent from the Task, approved Plan, current code, behavioral tests, and relevant production evidence.
2. Resolve ambiguity that could change the approved outcome; expose only small, reversible assumptions.
3. Follow `references/testing.md`: write the smallest meaningful failing test, make it pass, then refactor.
4. Reuse existing behavior when semantics match. Apply a pattern only for a demonstrated force.
5. Keep the change inside the approved Task. Stop if evidence invalidates the Plan or Task boundary.
6. Run focused checks first, then the broader relevant suite.
7. Review the complete diff for code smells, accidental scope, compatibility, security, and operability.
8. Record verification, remaining risk, and the production signal that will confirm or challenge the change.

Load `references/implementation-thinking.md`, `references/java-style.md`, or `references/delivery-and-operations.md` only when the Task needs that guidance.

## Finish Without Assuming Delivery Authority

Report the implemented outcome, verification evidence, and remaining risk. Do not commit, push, deploy, or begin another Task without the required user authorization and stage gate.
