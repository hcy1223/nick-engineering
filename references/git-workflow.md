# Git Workflow

Use Git history as a delivery interface: cohesive, reviewable, searchable, and safe to release or revert.

## Before Committing

1. Require explicit user authorization.
2. Inspect repository instructions, recent history, and the complete staged diff.
3. Stage only the intended cohesive change; preserve unrelated work.
4. Run verification proportional to the change and derive the message from the staged outcome.

## Write English Conventional Commits

Write all human-authored message text in English:

```text
<type>[optional scope][!]: <imperative summary>

[optional body]

[optional footer(s)]
```

Use `feat`, `fix`, `refactor`, `test`, `docs`, `perf`, `build`, `ci`, `chore`, or `revert` unless the repository defines a compatible extension. Use a scope only for a meaningful bounded context, module, or delivery area. Mark breaking changes with `!` and explain them in a `BREAKING CHANGE:` footer.

The summary must state the resulting behavior or engineering outcome, use imperative mood, and omit the trailing period. Avoid vague messages such as `update code`, `fix issue`, or `make changes`. Add a body for rationale, constraints, trade-offs, migration notes, or non-obvious consequences; add issue references in footers when useful.

Examples:

```text
feat(auth): add passwordless login
fix(order): prevent duplicate payment capture
docs(workflow): document implementation stage gates
```

## Preserve Repository Governance

Follow stricter compatible repository rules such as required scopes, issue identifiers, allowed types, or subject limits. If a rule conflicts with English Conventional Commits, report the conflict and ask which policy governs before committing.

Prefer one coherent commit for a small change. Split only when each commit has an independently understandable outcome and improves review, bisecting, release notes, or rollback. Never create noisy checkpoint history or rewrite shared history casually.
