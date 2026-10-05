# Task Implementation

This is the standard workflow execution entry. Use it only after the user approves a concrete Task and explicitly asks to execute it. A requirement, approved Plan, or unapproved task list is not implementation authorization.

## Enforce a Clean Baseline

Before editing source, tests, configuration, schema, migrations, or generated implementation files for each Task:

1. With Node.js 22.18+, run `node <skill-directory>/scripts/check-baseline.ts <target-repository>`. It checks the entire worktree, including staged, unstaged, untracked, and submodule changes, without modifying it. If Node is unavailable, run `git status --porcelain=v1 --untracked-files=all --ignore-submodules=none` in the target repository instead.
2. Continue only when the script exits with `0` (clean), or the fallback Git command succeeds and produces no output. Script exit `1` means dirty; `2` means an operational or usage error. Both block implementation.
3. If it reports staged, unstaged, or untracked files, show the status and stop.
4. If the target is not a Git repository, stop and ask how to establish a safe baseline.

Do not commit, stash, reset, discard, delete, or hide changes to manufacture a clean state unless the user separately authorizes that exact action. Read-only inspection remains allowed while this gate is closed. The first failing test is implementation work, so check before RED.

## Execute the Approved Task

1. Pass the clean-baseline check above once before the first edit.
2. Load [coder](stages/coder.md) with the approved Task, its Plan, and repository evidence. Complete the implementation and verification within that Task.
3. Pass the concise in-context handoff to [cleaner](stages/cleaner.md). Continue without another approval or clean-baseline check for this run's own changes.
4. Mark only the current Task done after cleaner passes. A blocked stage is not completion; do not begin another Task automatically.

The shared stages do not remove standard Plan and Task approval gates. Two-pack has its own admission rules in [two-pack.md](two-pack.md).

## Finish Without Assuming Delivery Authority

Report the implemented outcome, verification evidence, and remaining risk. Do not commit, push, deploy, or begin another Task without the required user authorization and stage gate.
