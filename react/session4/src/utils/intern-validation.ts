import { assert } from './assert'

const MIN_SCORE = 0;
const MAX_SCORE = 100;

export function validateInternForm(name: string, score: number): string | null {
  // Precondition assertions (Guard against non-string / non-number programmer errors)
  assert(name !== null && name !== undefined, 'Name is required')
  assert(typeof name === 'string', `validateInternForm: name must be a string, got: ${typeof name}`)
  assert(typeof score === 'number', `validateInternForm: score must be a number, got: ${typeof score}`)

  // Business logic guard clauses (return user-friendly error strings)
  if (!name.trim()) {
    return 'Name is required'
  }

  if (Number.isNaN(score) || score < MIN_SCORE || score > MAX_SCORE) {
    return `Score must be ${MIN_SCORE}–${MAX_SCORE}`
  }

  // Return null if validation passes completely
  return null
}

// Most Dangerous Silent Failure in this file:
// Returning `null` for Success Combined with Unchecked `NaN`:
// Returning `null` on valid states causes silent failures when `score` is passed as `NaN`. Because comparisons like `NaN < 0` 
// and `NaN > 100` evaluate to `false`, execution bypasses both `if` checks and returns `null` (indicating the form is completely valid!). 
// The caller assumes validation passed, allowing corrupted invalid numbers to enter the data store without throwing any errors.

// Task 5.2 
// The `assert` checks enforce developer-facing preconditions (type invariants), ensuring the function receives valid contract parameters.
// If an assertion fails, it throws unconditionally as an Uncaught Error—halting execution immediately because it indicates a programmer bug upstream.
// The validation logic below it handles expected domain/user input errors, returning a standard string (or throwing a caught UI error) so the application can gracefully display feedback to the user.

// Inconsistent returns mixing booleans, strings, and thrown errors.
// Fix first: Inconsistent returns, since it forces components to guess how to handle failures.