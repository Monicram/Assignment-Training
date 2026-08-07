import { describe, test, expect, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
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
  test('returns all interns when search is empty', () => {
    const { result } = renderHook(() => useInternSearch(interns))
    expect(result.current.filtered).toHaveLength(2)
    expect(result.current.stats.total).toBe(2)
  })

  test('filters interns when search term is set', () => {
    const { result } = renderHook(() => useInternSearch(interns))
    act(() => { result.current.setSearch('Rahul') })
    expect(result.current.filtered).toHaveLength(1)
    expect(result.current.filtered[0].name).toBe('Rahul')
  })

  test('uses injected filter function', () => {
    const customFilter = vi.fn(() => [])
    const { result } = renderHook(() => useInternSearch(interns, customFilter))
    expect(customFilter).toHaveBeenCalledWith(interns, '')
    expect(result.current.filtered).toEqual([])
  })
})

// Injecting the filter function is usually not needed for this hook.
// The original filterInterns function is already a pure function and easy to test.
// Dependency injection is useful when replacing external services or complex dependencies.
// In this case, adding injection increases complexity without much benefit.