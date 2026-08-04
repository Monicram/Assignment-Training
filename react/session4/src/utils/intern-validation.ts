import { assert } from './assert'

export function validateInternForm(name: string, score: number): void {
  // Precondition assertions (Guard against non-string / non-number programmer errors)
  assert(name !== null && name !== undefined, 'Name is required')
  assert(typeof name === 'string', `validateInternForm: name must be a string, got: ${typeof name}`)
  assert(typeof score === 'number', `validateInternForm: score must be a number, got: ${typeof score}`)

  // Business logic guard clauses (throw user-friendly error strings)
  if (!name.trim()) {
    throw new Error('Name is required')
  }

  if (Number.isNaN(score) || score < 0 || score > 100) {
    throw new Error('Score must be 0–100')
  }
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