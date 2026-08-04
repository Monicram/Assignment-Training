import { describe, test, expect } from 'vitest'
import { validateInternForm } from '../utils/intern-validation'

describe('addIntern / form validation guard clauses', () => {
  test('throws if name is null or undefined', () => {
    // @ts-expect-error testing runtime guard against null
    expect(() => validateInternForm(null, 80)).toThrow('Name is required')
  })

  test('throws if name is empty', () => {
    expect(() => validateInternForm('', 80)).toThrow('Name is required')
  })

  test('throws if name is only whitespace', () => {
    expect(() => validateInternForm('   ', 80)).toThrow('Name is required')
  })

  test('throws if score is NaN', () => {
    expect(() => validateInternForm('Rahul', NaN)).toThrow('Score must be 0–100')
  })

  test('throws if score is below 0', () => {
    expect(() => validateInternForm('Rahul', -1)).toThrow('Score must be 0–100')
  })

  test('throws if score is above 100', () => {
    expect(() => validateInternForm('Rahul', 101)).toThrow('Score must be 0–100')
  })

  test('passes for valid inputs', () => {
    expect(() => validateInternForm('Rahul', 80)).not.toThrow()
  })
})

// Task 3.3
// Testing guard clauses directly as pure functions is significantly easier and faster 
// than testing through hooks or UI components.

// Task 4.2 
// The actual values (such as `name`, `score`, or `id`) were already available in scope as arguments passed directly to the functions.
// No function signatures needed to be modified—we simply interpolated the existing parameters (`${score}`, `${id}`, `JSON.stringify(name)`) directly into the error template strings.