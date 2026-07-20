# TDD and Behavioral Testing

## Use TDD as Design Discipline

Run a tight red-green-refactor loop:

1. Choose one externally meaningful behavior or domain rule.
2. Write the smallest failing test that expresses it.
3. Confirm that it fails for the intended reason.
4. Write the simplest coherent implementation that passes.
5. Refactor production and test code while preserving behavior.

Let difficulty in testing reveal design friction. Hard setup, excessive collaborators, and awkward assertions often signal misplaced responsibility or a weak interface.

## Prefer the Chicago School

- Exercise real domain objects together when they are fast and deterministic.
- Assert observable state, returned results, emitted domain events, or other meaningful behavior.
- Substitute only genuine boundaries such as clocks, randomness, networks, filesystems, external services, or slow databases.
- Prefer small fakes or in-memory adapters when their semantics can remain faithful.
- Use spies or mocks sparingly when the interaction itself is the contract, such as a required external command.

Avoid mocking internal collaborators, verifying call order without a domain reason, stubbing every getter, or coupling tests to private structure. These tests freeze implementation choices while providing weak behavioral confidence.

## Build a Trustworthy Test Portfolio

- Put most domain rules in fast behavioral tests using real objects.
- Add contract tests at replaceable boundaries.
- Add integration tests for persistence, serialization, messaging, framework wiring, and vendor assumptions.
- Keep a small number of end-to-end tests for critical journeys and deployment confidence.
- Turn every important production defect into the cheapest durable test that would have caught it at the right boundary.

Test important failures, boundaries, state transitions, idempotency, and concurrency where relevant. Do not chase coverage percentages detached from risk.

## Treat Tests as Documentation

Name tests in domain language and make each test explain one behavior. Keep setup focused, expected outcomes visible, and incidental values behind builders or fixtures. A reader should be able to infer current system behavior without reverse-engineering mocks.

Delete or rewrite tests that are flaky, redundant, misleading, or tied to obsolete structure. Trustworthy documentation cannot contain known lies.
