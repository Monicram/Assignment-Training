import { describe, test, expect } from 'vitest'
import { filterInterns } from '../utils/intern-utils'

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
    score: 85,
    role: 'Backend',
    isPresent: true,
  },
  {
    id: 3,
    name: 'Amit',
    score: 76,
    role: 'Frontend',
    isPresent: false,
  },
  {
    id: 4,
    name: 'Sneha',
    score: 95,
    role: 'Fullstack',
    isPresent: true,
  },
]

describe('filterInterns', () => {
  test('returns all interns when search term is empty', () => {
    expect(filterInterns(interns, '')).toEqual(interns)
  })

  test('returns interns whose name matches (case-insensitive)', () => {
    expect(filterInterns(interns, 'rahul')).toEqual([interns[0]])
    expect(filterInterns(interns, 'RAHUL')).toEqual([interns[0]])
  })

  test('returns interns whose role matches (case-insensitive)', () => {
    expect(filterInterns(interns, 'frontend')).toEqual([
      interns[0],
      interns[2],
    ])
    expect(filterInterns(interns, 'BACKEND')).toEqual([
      interns[1],
    ])
  })

  test('returns an empty array when no interns match', () => {
    expect(filterInterns(interns, 'Designer')).toEqual([])
  })

  test('returns interns that match on either name OR role', () => {
    expect(filterInterns(interns, 'Sneha')).toEqual([interns[3]])
    expect(filterInterns(interns, 'Fullstack')).toEqual([interns[3]])
  })
})