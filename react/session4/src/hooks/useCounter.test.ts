import { renderHook, act } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import useCounter from './useCounter'

describe('useCounter', () => {
  test('initialises with the default value of 0', () => {
    const { result } = renderHook(() => useCounter())

    expect(result.current.count).toBe(0)
  })

  test('initialises with a custom initial value', () => {
    const { result } = renderHook(() =>
      useCounter({ initial: 10 })
    )

    expect(result.current.count).toBe(10)
  })

  test('increment increases count by 1', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  test('decrement decreases count by 1', () => {
    const { result } = renderHook(() =>
      useCounter({ initial: 5 })
    )

    act(() => {
      result.current.decrement()
    })

    expect(result.current.count).toBe(4)
  })

  test('reset returns count to the initial value', () => {
    const { result } = renderHook(() =>
      useCounter({ initial: 10 })
    )

    act(() => {
      result.current.increment()
      result.current.increment()
      result.current.reset()
    })

    expect(result.current.count).toBe(10)
  })
})


// Task 6.1

// result.current contains the current value returned by the custom hook,
// including its state and functions.
// When a hook updates state, React applies the update inside act() and
// then re-renders the hook. Therefore, read result.current after the
// act() call so you get the latest state instead of the previous value.