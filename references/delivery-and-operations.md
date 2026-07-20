# Delivery, Operation, and Production Learning

## Design the Delivery

Address these concerns before merge in proportion to risk:

- Backward and forward compatibility across mixed versions.
- Schema and data migration, including duration and recovery.
- Feature flags or staged exposure when uncertainty is high.
- Idempotency, retries, timeouts, resource limits, and partial failure.
- Security, privacy, and audit implications.
- Rollback or roll-forward strategy and the point of no easy return.
- Ownership and communication during rollout.

Prefer small reversible releases. Separate deployment from exposure when that improves safety or learning.

## Make Behavior Observable

Instrument the outcome and the failure modes, not only machine activity.

- Define service-level or product signals that connect to user value.
- Use structured logs for diagnosable events, metrics for trends and alerting, and traces for distributed paths.
- Include correlation identifiers and relevant domain context without leaking sensitive data.
- Alert on actionable symptoms with an owner and response path.
- Create dashboards or runbooks only when they support a real operational decision.

Verify telemetry in a production-like environment and during rollout. An unobserved successful deploy is not yet demonstrated success.

## Operate the Change

During rollout:

1. Confirm baseline signals.
2. Expose the change to the smallest useful cohort.
3. Compare success and guardrail signals with expectations.
4. Pause, roll back, or continue using predefined decision thresholds where practical.
5. Record unexpected behavior and operational toil.

For incidents, stabilize impact first, preserve evidence, communicate clearly, and avoid speculative changes. Follow with a blameless analysis focused on system conditions and defenses.

## Close the Learning Loop

Convert production evidence into a concrete destination:

- Product learning changes the outcome, scope, or prioritization.
- Domain learning changes vocabulary, rules, or model boundaries.
- Quality learning adds or reshapes a behavioral, contract, or integration test.
- Operational learning changes telemetry, automation, capacity, resilience, or ownership.
- Contrary evidence may justify an explicit decision to stop or remove a feature.

Record signal, interpretation, confidence, decision, owner, and follow-up. Use `assets/production-learning-template.md` when the learning should survive the immediate conversation.
