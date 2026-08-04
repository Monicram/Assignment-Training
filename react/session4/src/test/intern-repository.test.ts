import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useInternRepository } from '../repositories/intern-repository'
import type { Intern } from '../types/intern'

const RAHUL: Intern = { id: 1, name: 'Rahul', score: 92, isPresent: true, role: 'Frontend' }
const PRIYA: Intern = { id: 2, name: 'Priya', score: 78, isPresent: false, role: 'Backend' }

describe('useInternRepository', () => {
  it('starts with an empty list', () => {
    const { result } = renderHook(() => useInternRepository())
    expect(result.current.interns).toEqual([])
  })

  it('add() adds an intern to the list', () => {
    const { result } = renderHook(() => useInternRepository())
    act(() => {
      result.current.add(RAHUL)
    })
    expect(result.current.interns).toEqual([RAHUL])
  })

  it('add() twice results in two interns', () => {
    const { result } = renderHook(() => useInternRepository())
    act(() => {
      result.current.add(RAHUL)
      result.current.add(PRIYA)
    })
    expect(result.current.interns).toEqual([RAHUL, PRIYA])
  })

  it('remove() removes an intern by id', () => {
    const { result } = renderHook(() => useInternRepository())
    act(() => {
      result.current.add(RAHUL)
      result.current.add(PRIYA)
    })
    act(() => {
      result.current.remove(1)
    })
    expect(result.current.interns).toEqual([PRIYA])
  })

  it('remove() on a non-existent id does nothing', () => {
    const { result } = renderHook(() => useInternRepository())
    act(() => {
      result.current.add(RAHUL)
    })
    act(() => {
      result.current.remove(999)
    })
    expect(result.current.interns).toEqual([RAHUL])
  })

  it('update() replaces the intern with the matching id', () => {
    const { result } = renderHook(() => useInternRepository())
    const updatedRahul: Intern = { ...RAHUL, score: 98 }

    act(() => {
      result.current.add(RAHUL)
    })
    act(() => {
      result.current.update(updatedRahul)
    })
    expect(result.current.interns[0].score).toBe(98)
  })

  it('update() does not affect other interns', () => {
    const { result } = renderHook(() => useInternRepository())
    const updatedRahul: Intern = { ...RAHUL, score: 98 }

    act(() => {
      result.current.add(RAHUL)
      result.current.add(PRIYA)
    })
    act(() => {
      result.current.update(updatedRahul)
    })
    expect(result.current.interns[1]).toEqual(PRIYA)
  })
})