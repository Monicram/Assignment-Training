// Silent failure audit — useInternForm.ts
// Pattern 1: Silent coercion/defaulting on score — input coercion using `Number(value)` produces `NaN` when input is invalid or non-numeric without throwing or explicit handling.
// Pattern 2: Silent state mutation without error clearing — `handleChange` does not clear previous validation errors when a user starts fixing input.
// Pattern 3: Fallback boolean masking — `isValid()` relies on side-effect state setter (`setError`) and returns a plain `boolean`, losing error context or reason if unhandled by caller.
import { describe, test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import useInternForm from './useInternForm'

describe('useInternForm', () => {
  test('initializes with default form state', () => {
    const { result } = renderHook(() => useInternForm())
    expect(result.current.form.name).toBe('')
    expect(result.current.form.score).toBe(0)
    expect(result.current.error).toBe('')
  })

  test('catches validation error when isValid is called on invalid state', () => {
    const { result } = renderHook(() => useInternForm())

    act(() => {
      const valid = result.current.isValid()
      expect(valid).toBe(false)
    })

    expect(result.current.error).toBe('Name is required')
  })
})

// regarding caller null-checks:
// Callers removed: 1 primary caller (`isValid` in useInternForm) and any UI form submission handlers that were checking `if (result === null)` or `if (error !== null)`.
// What this tells us: Callers previously implicitly trusted the return signature `string | null` to catch invalid data, but because `NaN` bypassed the old comparison checks and returned `null`, callers were blindly trusting `null` as absolute confirmation of valid data. Switching to a throw pattern enforces immediate failure at the source whenever invalid domain data is encountered.

// UseInternFormReturn defines what the hook returns.
// It improves type safety and makes the hook easier to use.

// Most Dangerous Silent Failure in this file:
// Silent NaN Coercion (`Number(value)`): If an invalid numeric string or blank string is entered into the score field,
// `Number('')` silently evaluates to `0`, and `Number('abc')` evaluates to `NaN`. Because JavaScript treats `NaN < 0` 
// and `NaN > 100` as `false`, `isValid()` passes when `score` is `NaN`. This corrupts downstream data with `NaN` values 
// without triggering a validation error or throwing an exception.