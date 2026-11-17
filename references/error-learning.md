# Error Review and Rule Improvement

## When to Use

Load this reference after an explicit user correction, a demonstrated repeated
mistake, or an evaluation failure that reveals a recurring decision problem.
Routine test failures during RED are not incidents. Fix the current task first;
record learning without interrupting already authorized work.

## Capture Evidence

Use [the lesson template](../assets/error-review-template.md). Keep project-specific
lessons in the target repository's existing learning location, or
`docs/engineering-lessons/` if no convention exists. For maintenance of this skill,
keep reusable lessons in `lessons/`. Create records only for actual observations,
not hypothetical risks. Respect repository write permissions and exclude secrets,
private source excerpts, and personal identifiers.

Search existing records by trigger, symptom, and cause before creating one. Update
an existing lesson with a new occurrence when the cause matches. A user correction
can justify the first record; label the cause uncertain until supported by evidence.
Do not claim repetition without independent occurrences. Do not automatically copy
project records into the installed skill or another repository.

Record the request and expected behavior, actual result, evidence, impact, cause,
current correction, recurrence trigger, and a narrow prevention proposal. Distinguish
skill ambiguity, missing repository context, tool/environment failure, and execution
error. Do not infer that every agent mistake needs another skill instruction.

## Consult Relevant Lessons

When implementing or reviewing a related change, search the chosen lesson location
for relevant triggers and read matching records only. An absent lesson directory is
normal. Lessons provide evidence and scoped guidance; they do not override user
instructions, repository policy, or the skill's authorization rules. Do not load the
entire incident history into every task.

## Improve the Right Layer

Choose the smallest durable intervention:

- A code defect: add a meaningful regression test or strengthen the responsible boundary.
- A repeated mechanical error: improve a deterministic tool or check when justified.
- A project-specific misunderstanding: improve local documentation or conventions.
- A recurring, reusable decision error caused by this skill: revise the owning reference
  and add a realistic behavior-evaluation scenario when useful.

Before promoting a lesson into a rule, state its trigger, evidence, scope, exceptions,
and observable success criterion. Search for existing guidance: clarify or consolidate
it rather than appending a duplicate prohibition. One serious correction can warrant
immediate action; occurrence counts alone do not establish a universal rule.

Writing a lesson during authorized project work does not authorize editing an installed
skill elsewhere, publishing private lessons, or changing unrelated repositories.
Propose such changes unless the user has already authorized maintenance at that location.
Do not add approval gates for ordinary in-scope fixes or records.

## Verify and Retire

Track status as `Observed`, `Proposed`, `Applied`, `Verified`, or `Retired`.
`Applied` means the fix or guidance exists; `Verified` requires actual regression or
behavioral evidence against the recorded failure. Structural validation alone is not
behavioral proof. Keep untested proposals explicitly unverified.

On recurrence, reopen the lesson and examine why the intervention failed rather than
adding a stronger duplicate. Merge duplicate lessons; narrow or retire stale guidance
when conditions change. Report new or updated lessons and any unverified rule changes
briefly with the task outcome. Do not create an incident report for every successful task.
