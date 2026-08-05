import { describe, test, expect } from 'vitest'
import { validateInternForm } from '../utils/intern-validation'

describe('validateInternForm', () => {
  test('returns Name is required when name is empty string', () => {
    expect(validateInternForm('', 92)).toBe('Name is required')
  })

  test('returns Name is required when name is only whitespace', () => {
    expect(validateInternForm('   ', 92)).toBe('Name is required')
  })

  test('returns Score must be 0–100 when score is 101', () => {
    expect(validateInternForm('Rahul', 101)).toBe('Score must be 0–100')
  })

  test('returns Score must be 0–100 when score is -1', () => {
    expect(validateInternForm('Rahul', -1)).toBe('Score must be 0–100')
  })

  test('returns null when name is Rahul and score is 92', () => {
    expect(validateInternForm('Rahul', 92)).toBeNull()
  })

  test('returns null when score is exactly 0', () => {
    expect(validateInternForm('Rahul', 0)).toBeNull()
  })

  test('returns null when score is exactly 100', () => {
    expect(validateInternForm('Rahul', 100)).toBeNull()
  })
})

// Task 3.2 
// Lines of Arrange needed: 0. 
// Why it's simpler than renderHook: 
// Testing a pure function is much easier. We don't need to simulate React events, use act(), or wait for state updates. We just pass inputs and check the output directly in a single line.


// Each test required only one line of Arrange because the validation function
// is a pure function that accepts simple inputs.
// Compared to testing the hook with renderHook, these tests are much simpler
// since they do not require rendering hooks, managing React state, or mocking
// React behavior.