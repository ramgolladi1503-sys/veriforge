# Veriforge Content Model

Veriforge should be content-driven from day one. Pages, evidence packs, and future AI answers should come from structured content instead of hardcoded bragging.

## Case file model

```json
{
  "caseId": "VF-001",
  "title": "Aixion Control Tower",
  "category": "Human Approval Infrastructure",
  "status": "Active Build",
  "priority": "Now",
  "proofMaturity": 4,
  "signalScore": 9,
  "coreClaim": "I build approval infrastructure for AI-agent execution.",
  "problem": "AI agents need human approval before executing risky work.",
  "whyItMatters": "Without approval infrastructure, autonomous agents either become risky or useless.",
  "myRole": [
    "I shaped the product scope.",
    "I designed the approval lifecycle.",
    "I defined the proof targets and acceptance gates."
  ],
  "skills": [
    "AI Safety",
    "QA Strategy",
    "Product Architecture",
    "Backend Workflow Design"
  ],
  "evidenceIds": ["EV-001", "EV-002"],
  "decisionIds": ["DEC-001"],
  "failureIds": ["FAIL-001"],
  "proofGaps": [
    "Polished end-to-end demo still needs to be recorded."
  ],
  "nextProofTarget": "Record blocked -> approved -> forwarded workflow demo."
}
```

## Evidence model

```json
{
  "id": "EV-001",
  "title": "Approved payload hash integrity",
  "project": "Aixion Control Tower",
  "type": "Security Control",
  "status": "Implemented",
  "maturity": 4,
  "claimSupported": "I design execution-safety controls.",
  "summary": "Approval freezes the exact payload hash and the runner blocks stale or tampered payloads.",
  "links": []
}
```

## Failure model

```json
{
  "id": "FAIL-001",
  "project": "Tradebot",
  "failure": "The bot produced signals but did not execute trades.",
  "badAssumption": "Strategy quality or gating was probably the main issue.",
  "rootCause": "Signals could not reliably map to broker-tradable contracts.",
  "fix": "Improved contract resolution and fallback handling with safety constraints.",
  "testAddedOrNeeded": "Executable contract resolution regression tests.",
  "whatItProves": "I can separate symptoms from root cause."
}
```

## Decision model

```json
{
  "id": "DEC-001",
  "project": "Aixion Control Tower",
  "decision": "Freeze approved payload using approved_payload_hash.",
  "context": "An approval must apply to the exact payload, not only a request ID.",
  "chosenPath": "Hash the approved payload and validate before execution.",
  "rejectedPath": "Approve only the request ID.",
  "reason": "A stale or tampered payload could execute under a valid approval.",
  "tradeoff": "Adds implementation complexity but protects approval integrity."
}
```

## Build log model

```json
{
  "id": "BUILD-001",
  "date": "2026-05-10",
  "project": "Veriforge",
  "whatChanged": "Created the product bible and MVP scope.",
  "whatBroke": "Nothing yet.",
  "whatILearned": "Veriforge must stay evidence-first, not portfolio-first.",
  "proofLinks": ["docs/VERIFORGE_BIBLE.md", "docs/MVP_SCOPE.md"]
}
```

## Proof maturity labels

```json
[
  { "level": 0, "label": "Idea" },
  { "level": 1, "label": "Scoped" },
  { "level": 2, "label": "Designed" },
  { "level": 3, "label": "Prototype" },
  { "level": 4, "label": "Tested" },
  { "level": 5, "label": "Demo Ready" },
  { "level": 6, "label": "Shipped" },
  { "level": 7, "label": "Verified" }
]
```

## Content rules

1. Use first person.
2. Do not overclaim maturity.
3. Every major claim needs evidence.
4. Every flagship case file needs at least one failure and one decision.
5. Every future project must enter through the intake rule.
6. If AI/tools helped, say how I directed, reviewed, tested, or validated the work.
