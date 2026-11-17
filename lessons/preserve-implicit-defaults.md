# Lesson: Preserve implicit defaults when fixing a boundary

- **Status**: Proposed
- **Scope**: Reusable implementation and evaluation concern
- **Trigger**: Replacing fallback expressions while fixing falsy or boundary values

## Observation

In the 2026-11-17 independent Plan evaluation, an agent replaced
`quantity || 1` with direct multiplication while fixing zero quantity. Zero and
negative acceptance checks passed, but omitted quantity changed from one to NaN.
The initial Plan did not explicitly mention this existing behavior and the initial
checker omitted it. Other independent two-pack runs preserved the default.
This is one observed failure, not evidence of a repeated universal defect.

## Cause and correction

The fixture's compatibility contract and checker were incomplete. Whether the
skill itself needs a stronger rule remains uncertain. The evaluator now probes
omitted quantity, and new Plan fixtures explicitly include its default behavior.
The original run remains failed under this expanded compatibility criterion;
its narrow initial acceptance results are retained in the evaluation report.

## Prevention proposal

When changing fallback logic, inspect and characterize existing defaults as well
as the newly requested boundary. Prefer improving concrete plans and regression
checks before adding another general prohibition to the skill.

## Verification

The strengthened checker rejects the original implementation and accepts the
independent implementations that preserve the default. A fresh Plan evaluation
is being recorded separately; automated success alone does not verify all process
claims. Reopen on recurrence; retire if superseded by a better-defined contract.
