# Cleaner Stage

## Goal and Input

Review the completed change as a whole and leave it clear, cohesive, and no larger than necessary. Receive the authorized request or Task, actual diff, and coder's in-context handoff. Independently inspect the code rather than treating that handoff as proof.

## Review and Cleanup

- Review the completed behavior using [implementation thinking](../implementation-thinking.md).
- Fix demonstrated in-scope issues directly. Preserve intended behavior during refactoring; if review finds a behavioral defect, add or adjust its meaningful regression test and correct it.
- Rerun affected verification after edits, plus required broader checks where warranted. If no edits are needed and coder's evidence remains valid, avoid repeating checks without a reason.

Review is mandatory; refactoring is conditional. No cleanup needed is a valid result. Cleaner is not Git cleanup: never discard, stash, or commit changes to make the worktree clean.

## Completion

Pass only when verification is sufficient and no in-scope blocker remains. Report cleanup performed or why none was needed, verification evidence, and remaining limitations. If a fix requires crossing the workflow boundary, pause through that workflow. Do not mark done with an unresolved blocker or demand an additional user approval merely to finish this stage.
