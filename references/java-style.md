# Modern Java Style

Use modern Java to make domain meaning, valid state, and control-flow completeness visible to the compiler and the reader. Treat working code as the floor; optimize for correctness, clarity, evolvability, and operational safety.

## Keep the Platform Modern

- Target the latest organization-supported LTS or feature release that production can operate safely.
- Treat Java 8 as a tactical exception for constrained legacy systems, not a default for new work.
- Upgrade continuously enough to avoid a high-risk migration cliff and to benefit from security, runtime, and language improvements.
- Automate broad migrations with tools such as OpenRewrite. Review and test the transformation instead of hand-editing repetitive API and syntax changes.
- Introduce preview or newly finalized features only when the build, runtime, deployment, and team can support them consistently.

## Default to Immutability

- Make classes and fields `final` by default. Make mutability a deliberate, localized design decision.
- Construct objects in a valid, complete state and preserve their invariants throughout their lifetime.
- Return new values instead of mutating shared state when the domain permits it.
- Do not place raw arrays inside immutable types. Prefer immutable collections, `List.copyOf`, or defensive copies at boundaries.
- Do not expose mutable collections or retain caller-owned mutable data.
- Favor composition over inheritance. Use inheritance only for a genuine substitutable relationship with stable semantics.
- Never depend on iteration order from unordered collections such as `Set.of` or `Map.of`.

## Choose the Data Model Deliberately

- Use records as transparent immutable data carriers when every component is legitimately part of the public state.
- Do not use records where private representation, identity-based lifecycle, hidden state, or substantial encapsulated behavior matters.
- Decide record-versus-class conventions deliberately at an architectural boundary; avoid accidental mixtures of `foo()` and `getFoo()` APIs.
- Use sealed interfaces or classes to model a closed set of alternatives.
- Keep sealed hierarchies shallow and explicit. Avoid `non-sealed` unless openness is a real domain requirement.
- Introduce value types for identifiers, money, quantities, ranges, and domain states when they carry rules or prevent confusion.
- Prefer enums or sealed hierarchies to strings and boolean flags when states have distinct meaning or behavior.

## Make Branching Exhaustive

- Prefer pattern matching to separate type testing, casting, and extraction.
- Use arrow-form switch labels; do not use colon labels or fall-through.
- Prefer switch expressions when a branch computes a value.
- Omit a catch-all `default` for closed enums and sealed hierarchies when the compiler can enforce exhaustiveness. Let a newly added case break compilation at every incomplete decision point.
- Use record patterns to expose the exact data involved in a decision.
- Use `var` inside nested patterns when it emphasizes exceptional type constraints rather than hiding useful information.

## Use Optional Strictly

- Use `Optional` only as a return type when absence is an expected result of an API.
- Do not use `Optional` as a field, constructor argument, or method parameter.
- Do not call `get()` after `isPresent()`. Express the decision with `map`, `flatMap`, `filter`, `or`, `orElseGet`, or an explicit branch that handles both outcomes.
- Return empty collections for “no elements”; do not wrap collections in `Optional`.
- Never return `null` where the contract promises an `Optional`.

## Use Local Syntax to Reveal Intent

- Use `var` only when the initializer makes the type obvious and the variable name supplies the missing meaning.
- Add an `Opt` suffix to a `var` local holding an `Optional`, such as `customerOpt`.
- Use unnamed variables and patterns (`_`) for intentionally ignored values when the configured Java version supports them.
- Use text blocks for multiline SQL, JSON, and similar literals. Continue to bind SQL parameters; text blocks do not prevent injection.
- Prefer Markdown documentation comments when the configured JDK supports them. Document intent, constraints, units, thread safety, and surprising contracts rather than restating the code.

## Apply Data-Oriented Programming Intentionally

Use data-oriented programming where the problem is primarily transparent data transformation, such as messages, integration boundaries, and data-centric services. Combine four ideas:

1. Keep data immutable.
2. Represent transparent data with records.
3. Operate on alternatives with pattern matching.
4. Enforce completeness with sealed types and exhaustive switches.

Validate external data at entry boundaries and establish invariants before it reaches domain logic or persistence. Do not replace a behavior-rich domain model with passive records merely because records are concise. Choose data-oriented or behavior-oriented modeling according to where the knowledge and invariants belong.

## Name the Domain

- Use domain terms instead of placeholders such as `data`, `info`, `manager`, `helper`, `util`, or `process`.
- Name classes and records as precise nouns; name methods as verbs or domain predicates.
- Prefer `isEligibleFor`, `calculateRenewalPrice`, and `reserveInventory` over `check`, `handle`, and `execute`.
- Use one term for one concept across code, tests, APIs, and events.
- Avoid `I` prefixes for interfaces and `Impl` suffixes for implementations. Name the role and distinguish implementations by policy or mechanism.
- Keep public APIs minimal and cohesive. Reduce visibility by default.

## Preserve Behavioral Confidence

- Follow TDD and express tests in domain language.
- Prefer real objects, observable state, and behavioral assertions. Substitute only true boundaries.
- Do not assert an unordered collection through `toString()` or incidental iteration order. Assert membership, size, or domain meaning.
- Test every case in a closed hierarchy and retain compiler exhaustiveness as an additional safety net.
- Use test-data builders when they emphasize relevant differences and preserve valid defaults.
- Keep framework annotations and persistence concerns outside the domain model when practical.

## Review a Modernization

Before completing a Java change, verify that:

- The target Java version and toolchain support every feature used.
- State is immutable unless mutation has a clear owner and reason.
- Records expose only intentionally transparent data.
- Closed alternatives use sealed types and exhaustive arrow switches.
- `Optional` appears only in appropriate return contracts and never relies on `get()`.
- Collection tests assert semantics rather than order or string rendering.
- Names express domain knowledge and the code remains consistent with repository conventions.
- Large migrations are automated, reviewed, tested, and delivered in reversible steps.

When repository conventions conflict with these preferences, preserve behavior and plan a coherent migration. Do not create a half-modernized codebase through unrelated local style changes.
