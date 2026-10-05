# Two-Pack

The minimal workflow is `newtask → coder → cleaner → done`. It produces a verified code change, not Plan or TDD Task documents.

## newtask: Admit the Request

An explicit `/two-pack <change>` or natural-language request to use two-pack authorizes coder and cleaner for that change. If no change is supplied, ask for it. Establish the intended behavior, scope, and verification from the request and relevant code; ask only questions whose answers materially affect implementation.

Suitable work includes local function logic changes, small bug fixes, local variable or private-method renames, and bounded module refactoring that preserves external contracts. Judge scope by impact and uncertainty, not line or file count.

Exclude database schema, database constraints, and data migrations. Also do not admit changes requiring unresolved cross-module design or external contract changes. Explain the concrete mismatch and ask whether to enter the standard planning workflow; do not silently create planning artifacts or start implementation.

Before the first implementation edit, apply [the shared clean-baseline check](task-implementation.md#enforce-a-clean-baseline). No Plan or Task approval is required for this workflow.

## coder → cleaner

Run [coder](stages/coder.md), then [cleaner](stages/cleaner.md) without intermediate user approval. Keep handoff information in conversation context; do not create status, Plan, or Task files. The same agent can perform both stages.

If either stage discovers schema work, a larger design boundary, or material ambiguity, pause and report the evidence and any changes already made. Preserve those changes; ask for the decision needed to proceed. Do not automatically expand scope, roll back, or switch workflows.

## done

Finish only when the requested behavior is implemented and cleaner has no unresolved in-scope blocker. Report the change, actual verification results, whether cleanup was needed, and remaining limitations. Failed or unavailable required verification leaves the workflow blocked, not done. Do not commit, push, deploy, or start another change without authorization.
