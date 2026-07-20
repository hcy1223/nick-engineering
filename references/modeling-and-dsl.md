# Modeling, Architecture, and DSLs

## Model the Decisions

- Start from domain terms, rules, examples, and contradictions rather than tables, endpoints, or framework types.
- Put invariants next to the state they protect.
- Make illegal states difficult or impossible to represent.
- Assign behavior to the object or module that has the knowledge needed to decide it.
- Separate domain policy from transport, persistence, frameworks, and vendor APIs.
- Preserve useful boundaries; do not create layers that only forward calls.
- Prefer cohesive modules with small, stable interfaces and substantial hidden decisions.

Use architecture to protect important changes: domain policy should evolve without unnecessary coupling to delivery mechanisms, and infrastructure should be replaceable at explicit boundaries.

## Design a Small DSL

Introduce a DSL when the same domain decisions recur and a compact vocabulary would improve correctness, review, or collaboration.

A good DSL:

- Uses the language domain experts use.
- Compresses rules, defaults, constraints, and composition—not only punctuation or method calls.
- Makes valid expressions easy and invalid combinations difficult.
- Has a deliberately small vocabulary and predictable semantics.
- Produces useful validation errors in domain terms.
- Remains testable independently of parsing or framework machinery.

Design it in this order:

1. Collect representative domain examples, including invalid and boundary cases.
2. Identify the smallest semantic model that explains them.
3. Define vocabulary and composition around domain meaning.
4. Choose the lightest surface: fluent API, builders, annotations, configuration, or a parser only when justified.
5. Test semantics first; test syntax only where syntax carries meaning.
6. Evaluate whether the DSL actually removes repeated knowledge from callers.

Avoid DSLs that merely rename a general-purpose API, hide control flow, depend on surprising implicit state, or require readers to learn more machinery than domain knowledge gained.

## Evaluate Design Quality

Ask:

- Can a reader locate the domain decision quickly?
- Does one concept have one clear name?
- Are dependencies directed toward stable policy?
- Does the design expose necessary choices and hide incidental ones?
- Can likely changes remain local?
- Do tests describe behavior through public or domain-relevant interfaces?

Prefer the simplest structure that gives strong answers today. Evolve boundaries from demonstrated pressure rather than speculative flexibility.
