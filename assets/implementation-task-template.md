# TDD Tasks for <Feature Name>

- **Based on**: <path/to/implementation-plan.md>
- **Generated**: <YYYY-MM-DD>
- **Status**: Ready

## Milestone 1: <Outcome-oriented milestone>

- **Outcome**: <Observable capability delivered by this milestone>
- **Dependencies**: <Earlier milestones or external dependencies; use “None” when independent>
- **Completion Evidence**: <Tests, behavior, migration result, or production signal>

### Task 1.1: <One focused, verifiable outcome>

- **Status**: To Do
- **Depends on**: <Task or milestone; use “None” when independent>
- **Expected Code Areas**: <Repository-grounded files, modules, or new artifacts>
- **Design Context**: <Relevant invariant, reuse decision, pattern decision, or boundary>

#### 1. RED — Define Failing Behavior

- [ ] Write <specific behavior, component, integration, contract, or end-to-end test>.
- [ ] Assert <observable state, output, interaction at a boundary, or failure behavior>.
- [ ] Run <focused test command> and confirm it fails for the expected reason.

#### 2. GREEN — Implement to Pass

- [ ] Make the smallest coherent production change that satisfies the failing behavior.
- [ ] Reuse, compose, or adapt <existing capability> where its semantics match.
- [ ] Re-run the focused test after each meaningful increment.
- [ ] Run <broader relevant verification> and confirm existing behavior remains green.

#### 3. REFACTOR — Improve the Design

- [ ] Improve domain names, responsibilities, duplication, and boundaries revealed by the test.
- [ ] Remove <specific smell or accidental coupling> without adding speculative flexibility.
- [ ] Re-run all relevant tests and static checks.

#### Completion Evidence

- [ ] Record the passing commands and relevant output.
- [ ] Confirm acceptance behavior and important failure paths.
- [ ] Record migration, rollout, telemetry, or rollback evidence when relevant.
- [ ] Record deliberately deferred work or accepted trade-offs as separate follow-up items.

### Task 1.2: <Next independent outcome>

<Repeat the same RED–GREEN–REFACTOR structure.>

## Milestone 2: <Next outcome-oriented milestone>

<Repeat milestone and task sections.>
