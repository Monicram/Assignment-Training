
  export interface Intern {
    id: number
    name: string
    score: number
    isPresent: boolean
    role: string
  }

  export interface InternFormState {
    name: string
    score: number
    isPresent: boolean
    role: string
  }


import { describe, it, expect } from 'vitest'
import {
  createIntern,
  validateInternForm,
  calculateAverageScore,
  getScoreLabel,
  filterInterns,
} from '../services/intern-service'

describe('intern-service', () => {
  const validForm: InternFormState = {
    name: 'Jane Doe',
    score: 85,
    isPresent: true,
    role: 'Frontend Developer',
  }

  const sampleInterns: Intern[] = [
    { id: 1, name: 'Alice Smith', score: 90, isPresent: true, role: 'Developer' },
    { id: 2, name: 'Bob Jones', score: 40, isPresent: false, role: 'Designer' },
  ]

  describe('createIntern', () => {
    it('generates an id, trims the name, and rounds the score', () => {
      const form: InternFormState = {
        name: '   John Doe   ',
        score: 88.6,
        isPresent: true,
        role: 'QA Engineer',
      }
      const intern = createIntern(form, () => 123)

      expect(intern.id).toBe(123)
      expect(intern.name).toBe('John Doe')
      expect(intern.score).toBe(89)
      expect(intern.isPresent).toBe(true)
      expect(intern.role).toBe('QA Engineer')
    })
  })

  describe('validateInternForm', () => {
    it('returns error for empty name', () => {
      const form = { ...validForm, name: '   ' }
      expect(validateInternForm(form)).toBe('Name is required')
    })

    it('returns error for score > 100', () => {
      const form = { ...validForm, score: 105 }
      expect(validateInternForm(form)).toBe('Score must be between 0 and 100')
    })

    it('returns null when valid', () => {
      expect(validateInternForm(validForm)).toBeNull()
    })
  })

  describe('calculateAverageScore', () => {
    it('returns 0 for empty list', () => {
      expect(calculateAverageScore([])).toBe(0)
    })

    it('returns correct average and rounds correctly', () => {
      const interns: Intern[] = [
        { id: 1, name: 'A', score: 80, isPresent: true, role: 'Dev' },
        { id: 2, name: 'B', score: 85, isPresent: true, role: 'Dev' },
        { id: 3, name: 'C', score: 90, isPresent: true, role: 'Dev' },
      ]
      expect(calculateAverageScore(interns)).toBe(85)
    })
  })

  describe('getScoreLabel', () => {
    it("returns 'Pass' for 50", () => {
      expect(getScoreLabel(50)).toBe('Pass')
    })

    it("returns 'Fail' for 49", () => {
      expect(getScoreLabel(49)).toBe('Fail')
    })

    it("returns 'Pass' for 100", () => {
      expect(getScoreLabel(100)).toBe('Pass')
    })
  })

  describe('filterInterns', () => {
    it('returns all when query is empty', () => {
      expect(filterInterns(sampleInterns, '')).toEqual(sampleInterns)
    })

    it('matches on name', () => {
      const result = filterInterns(sampleInterns, 'Alice')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Alice Smith')
    })

    it('matches on role', () => {
      const result = filterInterns(sampleInterns, 'Designer')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Bob Jones')
    })

    it('is case-insensitive', () => {
      const result = filterInterns(sampleInterns, 'aLiCe')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Alice Smith')
    })
  })
})