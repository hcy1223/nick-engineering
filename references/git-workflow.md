# Git Workflow

Use Git history as a delivery and communication interface. Keep every commit coherent, reviewable, searchable, and safe to release or revert.

## Before Committing

1. Require explicit user authorization to create a commit.
2. Inspect repository instructions, the staged diff, and recent commit history.
3. Stage only the intended cohesive change. Do not absorb unrelated user work.
4. Run verification proportional to the change and review the complete staged diff.
5. Derive the message from the actual staged outcome, not only from a task title.

## Write English Conventional Commits

Write all human-authored commit message text in English. Use this format:

```text
<type>[optional scope][!]: <imperative summary>

[optional body]

[optional footer(s)]
```

Use one of these types unless the repository defines a compatible extension:

- `feat`: add or change user-visible behavior.
- `fix`: correct defective behavior.
- `refactor`: improve structure without changing intended behavior.
- `test`: add or improve tests without changing production behavior.
- `docs`: change documentation only.
- `perf`: improve performance.
- `build`: change build tooling or dependencies.
- `ci`: change continuous-integration behavior.
- `chore`: perform necessary maintenance not covered above.
- `revert`: revert an earlier commit.

Use a scope only when it names a meaningful bounded context, module, or delivery area. Mark breaking changes with `!` and explain them in a `BREAKING CHANGE:` footer.

## Make the Message Explain the Outcome

- Use a concise imperative summary.
- Describe the resulting behavior or engineering outcome, not the editing activity.
- Omit the trailing period.
- Avoid vague summaries such as `update code`, `fix issue`, `make changes`, or `misc cleanup`.
- Add a body when reviewers need rationale, constraints, trade-offs, migration notes, or non-obvious consequences.
- Reference issues or tasks in a footer when useful or required by the repository.

Examples:

```text
feat(auth): add passwordless login
fix(order): prevent duplicate payment capture
refactor(pricing): extract discount policy
test(checkout): cover expired coupon behavior
docs(workflow): document implementation stage gates
```

## Preserve Repository Governance

Follow stricter repository rules when they remain compatible with English Conventional Commits, such as an allowed type list, required scope, issue identifier, or subject-length limit. If a repository rule conflicts with this style, report the exact conflict and ask the user which policy should govern before committing. Do not silently violate either rule.

Prefer one coherent commit for a small change. Use multiple commits only when each has an independently understandable outcome and improves review, bisecting, release notes, or rollback. Never manufacture noisy checkpoint history.
