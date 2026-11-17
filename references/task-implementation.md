# Task Implementation

Use after the user authorizes execution of a concrete Task, a named Task group, or an approved Plan. Plan approval alone permits breakdown, not implementation. Plan-wide execution authorization includes deriving its Tasks and executing them in dependency order without repeated approval. Preserve explicit requests to stop after planning or breakdown.

## Review the Baseline

Before the first implementation edit:

1. Run `node <skill-directory>/scripts/check-baseline.ts <target-repository>` with Node.js 22.18+, or `git status --porcelain=v1 --untracked-files=all --ignore-submodules=none`. Inspect relevant staged and unstaged diffs and untracked files without exposing secrets.
2. Script exit `0` means clean; `1` means changes need review, not automatic rejection; `2` means the baseline could not be inspected and blocks implementation. A non-Git target requires agreement on another safe baseline.
3. Record existing changed paths and relevant content in context. Classify existing user work, local startup changes, and this run's artifacts. Plan/Task documents and changes from earlier authorized Tasks are allowed.
4. Local startup changes such as generated output, logs, local IDE settings, or environment-specific configuration may be left outside the task when evidence shows they are unrelated. Judge content and impact, not filename alone: lockfiles, shared configuration, migrations, and executable scripts may affect the implementation or verification.
5. Continue when existing changes can be preserved and the task can be safely isolated. If edits overlap, inspect the actual hunks; proceed only when the intended change is clear and existing work can be preserved. Pause for conflicting intent, unclear ownership that affects the task, or changes that invalidate verification.

Do not commit, stash, reset, discard, delete, alter ignore rules, or hide changes to manufacture a clean state. Do not include unrelated changes in delivery. If the user or repository explicitly requires a clean worktree, honor that stricter requirement. The first failing test is implementation work, so review before RED.

## Execute the Authorized Scope

1. Review the baseline once before the first edit; recheck unexpected changes or conflicts as needed.
2. Load [coder](stages/coder.md) with the current Task, its Plan, and repository evidence.
3. Pass the in-context handoff to [cleaner](stages/cleaner.md), without another approval or baseline gate for this run's changes.
4. Mark a Task done only after cleaner passes. Continue to the next authorized, unblocked Task in dependency order. Stop when the authorized scope is complete or a material blocker appears.

If evidence invalidates the approved scope or a key decision, report the concrete issue and obtain a decision before dependent work. Two-pack has its own admission rules in [two-pack.md](two-pack.md).

## Finish Without Assuming Delivery Authority

Report the outcome, verification evidence, preserved baseline changes, and remaining risk. Execution authorization does not authorize commit, push, deployment, or work outside the selected scope.
