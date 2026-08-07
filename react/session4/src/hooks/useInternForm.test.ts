import { renderHook, act } from '@testing-library/react'
import useInternForm from './useInternForm'

test('initialises with empty form state', () => {
  const { result } = renderHook(() => useInternForm())

  expect(result.current.form.name).toBe('')
  expect(result.current.form.score).toBe(0)
  expect(result.current.form.role).toBe('Frontend')
  expect(result.current.error).toBe('')
})

test('isValid returns false and sets error when name is empty', () => {
  const { result } = renderHook(() => useInternForm())

  let valid: boolean
  act(() => { valid = result.current.isValid() })

  expect(valid!).toBe(false)
  expect(result.current.error).toBe('Name is required')
})

test('isValid returns true when name and score are valid', () => {
  const { result } = renderHook(() => useInternForm())

  act(() => {
    result.current.handleChange({
      target: { name: 'name', value: 'Rahul', type: 'text' },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  act(() => {
    result.current.handleChange({
      target: { name: 'score', value: '92', type: 'number' },
    } as React.ChangeEvent<HTMLInputElement>)
  })

  let valid: boolean
  act(() => { valid = result.current.isValid() })

  expect(valid!).toBe(true)
  expect(result.current.error).toBe('')
})

test('handleReset clears form values and error', () => {
  const { result } = renderHook(() => useInternForm())

  // Set a value, trigger a validation error, then reset
  act(() => {
    result.current.handleChange({
      target: { name: 'name', value: 'Rahul', type: 'text' },
    } as React.ChangeEvent<HTMLInputElement>)
  })
  act(() => result.current.isValid())
  act(() => result.current.handleReset())

  expect(result.current.form.name).toBe('')
  expect(result.current.error).toBe('')
})

// Task 6.2
// Hook tests verify the hook's logic and state in isolation without any UI.
// Component tests only verify that the UI interacts with the hook correctly.