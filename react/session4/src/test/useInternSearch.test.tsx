import { describe, test, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import useInternSearch from '../hooks/useInternSearch'

const interns = [
  {
    id: 1,
    name: 'Rahul',
    score: 92,
    role: 'Frontend',
    isPresent: true,
  },
  {
    id: 2,
    name: 'Priya',
    score: 80,
    role: 'Backend',
    isPresent: true,
  },
]

describe('useInternSearch', () => {
  test('uses injected filter function', () => {
    const customFilter = vi.fn(() => [])

    const { result } = renderHook(() =>
      useInternSearch(interns, 'Rahul', customFilter)
    )

    expect(result.current).toEqual([])
    expect(customFilter).toHaveBeenCalledWith(interns, 'Rahul')
  })
})

// Injecting the filter function is usually not needed for this hook.
// The original filterInterns function is already a pure function and easy to test.
// Dependency injection is useful when replacing external services or complex dependencies.
// In this case, adding injection increases complexity without much benefit.