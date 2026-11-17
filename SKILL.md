---
name: nick-engineering
description: Apply Nick's staged engineering method from requirement discovery through production learning. Use for clarifying one-line requests, issues, or Story documents; deciding what to complete in each plan; creating implementation plans and TDD tasks; implementing approved work or explicit /two-pack local code changes; reviewing reuse, patterns, code smells, and extension points; shaping domain models, DSLs, or Java/Kotlin code; delivering through Git; and learning from production.
---

# Nick Engineering

Treat engineering as one learning loop:

1. Build the right thing.
2. Build it right.
3. Run it right.
4. Feed production learning back into the next decision.

Working code is the floor. Optimize for sound product decisions, clear domain expression, maintainable code, trustworthy tests, safe delivery, and observable production behavior.

## Rule Priority and Strength

Apply host/system instructions first, then explicit user instructions and authorization, then repository rules, supported toolchain and existing contracts, then this skill's defaults. Resolve same-level instructions by scope and specificity. Personal style does not authorize changing versions, public contracts, or unrelated code. Surface an unresolved conflict only when it affects the requested work.

- **Required** (`must`, `do not`, `必须`, `禁止`): constraints within their stated scope, subject to the priority above.
- **Default** (`prefer`, `default`, `采用`, `优先`): use when compatible with the repository; deviate for concrete design or compatibility reasons.
- **Conditional / optional** (`when`, `may`, `可`): apply only when the stated need exists. Pattern lists and examples are not mandatory architecture.

Workflow authorization lives here and in workflow references; testing methodology lives in [testing.md](references/testing.md). Language references add language-specific decisions. Historical evidence explains provenance and never overrides current rules.

## Select the Workflow

Use the standard workflow below by default. An explicit `/two-pack <change>` or a natural-language request to use two-pack selects [the minimal workflow](references/two-pack.md): `newtask → coder → cleaner → done`. This invocation authorizes both execution stages without Plan or Task artifacts or intermediate approval. Do not infer this mode merely because a change looks small.

Two-pack is for clear, local code changes with stable external contracts. Database schema, constraint, and data migration changes are excluded. If the request does not fit, explain why and ask whether to use the standard workflow before implementation.

Plan Map, Implementation Plan, and TDD Task are artifacts. Coder and cleaner are shared execution stages; newtask and done are workflow states. Stage prompts define responsibilities, while each workflow defines admission and transitions. Stages do not require separate agents.

`/two-pack` is a workflow invocation convention interpreted after this skill is loaded, not a portable native slash-command registration. Hosts may adapt it; natural-language invocation remains supported.

## Respect the Standard Workflow Stage Gates

| Stage | Output | Gate forward |
| --- | --- | --- |
| Requirement Intake | Clarification or Requirement Ready | Material ambiguity is resolved |
| Planning | Plan Map when needed, plus one detailed Implementation Plan | User explicitly approves the detailed Plan |
| Task Breakdown | TDD tasks for the approved Plan | User authorizes a concrete Task, a Task group, or execution of the approved Plan |
| Task Implementation | Tested increment and delivery evidence | User authorizes delivery or repository policy permits it |
| Production Learning | Evidence and resulting decision | User selects or confirms what comes next |

An explicit authorization to execute an approved Plan or a named group of Tasks covers task breakdown and continuous coder → cleaner execution for that scope. Do not ask again at each Task. Approval of a Plan alone authorizes breakdown, not implementation. Stop for material ambiguity, scope or key design changes, verification blockers, or exhausted authorization. Later Plans and delivery actions remain outside this authorization.

## Shared Execution Rules

Both workflows require an inspected, safe Git baseline before their first implementation edit; follow [the baseline review](references/task-implementation.md#review-the-baseline). Existing changes do not automatically block implementation. Preserve them and distinguish them from this run’s changes.

With Node.js 22.18+ available, use the bundled [check-baseline.ts](scripts/check-baseline.ts) as described in that reference. For maintenance of this skill itself, run [validate-skill.ts](scripts/validate-skill.ts) to check metadata and local resource links; structural validity does not establish workflow readiness or user approval.

Run [coder](references/stages/coder.md) then [cleaner](references/stages/cleaner.md) continuously within the authorized scope. Preserve existing delivery authorization boundaries; completing the workflow does not authorize commit, push, or deployment.

## Load Only What the Current Stage Needs

- Requirement intake and readiness: [references/requirements-analysis.md](references/requirements-analysis.md)
- Plan Map and Implementation Plan creation: [references/implementation-planning.md](references/implementation-planning.md)
- Task breakdown from an approved Plan: [references/implementation-tasks.md](references/implementation-tasks.md)
- Execution of authorized Tasks and baseline review: [references/task-implementation.md](references/task-implementation.md)
- Reuse, patterns, code smells, and extension points: [references/implementation-thinking.md](references/implementation-thinking.md)
- Domain modeling, architecture, and DSLs: [references/modeling-and-dsl.md](references/modeling-and-dsl.md)
- TDD, Chicago testing, and test boundaries: [references/testing.md](references/testing.md)
- Delivery, operation, observability, and feedback: [references/delivery-and-operations.md](references/delivery-and-operations.md)
- Historical Java/Kotlin practice profile, anonymized examples, and evidence limits: [references/nick-practice-profile.md](references/nick-practice-profile.md). Read only when tracing style provenance or checking historical claims.
- Kotlin implementation choices and conditional pattern selection: [references/kotlin-practices.md](references/kotlin-practices.md). Read for Kotlin changes; apply the pattern decision criteria to Java too.
- Java practices and naming: [references/java-style.md](references/java-style.md)
- Error review, recurring mistakes, and scoped rule improvement: [references/error-learning.md](references/error-learning.md). Load after explicit corrections, repeated mistakes, or relevant evaluation failures; consult matching lessons during related work.
- Git safety and English Conventional Commits: [references/git-workflow.md](references/git-workflow.md)

Load another reference only when the current stage requires that concern.

## Use the Output Assets

- `assets/plan-map-template.md` for a Story that needs more than one plan.
- `assets/implementation-plan-template.md` for what to complete in the current plan.
- `assets/implementation-task-template.md` for its TDD tasks.
- `assets/production-learning-template.md` for operational evidence and decisions.
- `assets/error-review-template.md` for evidenced mistakes and prevention proposals.

Copy and adapt assets; do not edit them in place. Keep artifacts proportional to risk.
