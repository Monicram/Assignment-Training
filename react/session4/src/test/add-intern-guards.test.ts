import { describe, test, expect } from 'vitest'
import { validateInternForm } from '../utils/intern-validation'

describe('addIntern / form validation guard clauses', () => {
  test('throws if name is null or undefined', () => {
    // This one STILL throws because of the assert() precondition!
    expect(() => validateInternForm(null as any, 80)).toThrow()
    expect(() => validateInternForm(undefined as any, 80)).toThrow()
  })

  test('returns error if name is empty', () => {
    expect(validateInternForm('', 80)).toBe('Name is required')
  })

  test('returns error if name is only whitespace', () => {
    expect(validateInternForm('   ', 80)).toBe('Name is required')
  })

  test('returns error if score is NaN', () => {
    expect(validateInternForm('Rahul', NaN)).toBe('Score must be 0–100')
  })

  test('returns error if score is below 0', () => {
    expect(validateInternForm('Rahul', -1)).toBe('Score must be 0–100')
  })

  test('returns error if score is above 100', () => {
    expect(validateInternForm('Rahul', 101)).toBe('Score must be 0–100')
  })

  test('passes for valid inputs', () => {
    expect(validateInternForm('Rahul', 80)).toBeNull()
  })
})

// Task 3.3
// Testing guard clauses directly as pure functions is significantly easier and faster 
// than testing through hooks or UI components.

// Task 4.2 
// The actual values (such as `name`, `score`, or `id`) were already available in scope as arguments passed directly to the functions.
// No function signatures needed to be modified—we simply interpolated the existing parameters (`${score}`, `${id}`, `JSON.stringify(name)`) directly into the error template strings.