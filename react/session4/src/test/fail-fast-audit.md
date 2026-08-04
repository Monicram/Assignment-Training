## Silent Failure Priority List

1. Null return on success with unchecked NaN guard in src/utils/intern-validation.ts:8-17 — risk: Passing NaN as score causes comparisons (NaN < 0 and NaN > 100) to evaluate to false, returning null (success) and letting corrupted data into the system without throwing an error.
2. Unhandled async state in src/contexts/intern-context.tsx:21-31 — risk: Async fetch lacks try/catch or error state; if data fails to load, setIsLoading(false) is never called and the UI hangs indefinitely in a loading state.
3. Silent NaN coercion in src/hooks/useInternForm.ts:31-33 — risk: Number(value) silently evaluates non-numeric string input to NaN, silently corrupting the form state object without resetting errors or throwing.

## Guard Clause Order — validateInternForm

Before:
  1. Business/Range check (`!name.trim()`)
  2. Range check (`score < 0 || score > 100`)

After:
  1. Null/undefined check (`name == null` / `score == null`)
  2. Type check (`typeof name !== 'string'` / `typeof score !== 'number'` / `Number.isNaN(score)`)
  3. Format & Range check (`!name.trim()`, `score < 0 || score > 100`)
  4. Duplicate / Business rule check (expensive — runs last)

Reason for reordering:
Calling `name.trim()` on `null` or `undefined` throws an unhandled `TypeError` before the guard check can run. Ordering guards from cheapest (null and type checks) to most expensive prevents execution crashes and enforces fail-fast error handling cleanly.

## Error Message Audit

| File | Current message | Answers all 3 questions? | Improved message |
|------|----------------|--------------------------|-----------------|
| `src/utils/intern-validation.ts:4` | `'Name is required'` | No | `'validateInternForm: expected non-empty string for name, got: ' + JSON.stringify(name)` |
| `src/utils/intern-validation.ts:8` | `'Score must be 0–100'` | No | `'validateInternForm: expected score between 0 and 100, got: ' + score` |
| `src/contexts/intern-context.tsx:55` | `'addIntern: intern object is required'` | No | `'addIntern: expected valid Intern object, got: ' + typeof intern` |
| `src/contexts/intern-context.tsx:58` | `'addIntern: Name is required'` | No | `'addIntern: expected non-empty string for name, got: ' + JSON.stringify(intern?.name)` |
| `src/contexts/intern-context.tsx:61` | `'addIntern: Score must be a valid number between 0 and 100'` | No | `'addIntern: expected score between 0 and 100, got: ' + intern?.score` |
| `src/contexts/intern-context.tsx:71` | `'removeIntern: invalid id provided (' + id + ')'` | Partial | `'removeIntern: expected positive number id, got: ' + id` |
| `src/contexts/intern-context.tsx:87` | `'useInterns must be used inside InternProvider'` | Yes | `'useInterns: expected context within InternProvider, got: null'` |

## 2am Test — removeIntern

Error message: "removeIntern: expected positive number id, got: -1"

What I know from this message alone:
  - Which function failed: `removeIntern`
  - What the rule is: expected a positive numeric ID (`id > 0`)
  - What was actually passed: `-1`

What I would do next without reading any code:
  - Check the UI component/event trigger firing the delete action for invalid state or bad ID binding.
  - Audit the state management / API response upstream that generated or passed `-1` as an identifier.

Would the original message "Invalid ID" have been enough? Why not?
  - No, "Invalid ID" gives zero debugging context. At 2am, it doesn't tell you if the ID was `null`, `undefined`, a string, a zero, or a negative number. Without knowing the actual received value (`-1`), you cannot determine whether the bug stemmed from a missing payload, a type coercion failure, or a corrupted state value without reproducing the bug step-by-step.