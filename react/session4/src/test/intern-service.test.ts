import { describe, it, expect } from 'vitest'
import {
  createIntern,
  validateInternForm,
  calculateAverageScore,
  getScoreLabel,
  filterInterns,
} from '../services/intern-service'
import type { Intern, InternFormState } from '../services/intern-service'

// --- TEST FACTORIES ---
// These allow us to create valid objects while only specifying the fields we care about testing
const makeIntern = (overrides: Partial<Intern> = {}): Intern => ({
  id: 1,
  name: 'Default Intern',
  score: 80,
  isPresent: true,
  role: 'Dev',
  ...overrides,
})

const makeForm = (overrides: Partial<InternFormState> = {}): InternFormState => ({
  name: 'Jane Doe',
  score: 85,
  isPresent: true,
  role: 'Frontend Developer',
  ...overrides,
})

describe('intern-service', () => {
  const validForm = makeForm()

  const sampleInterns: Intern[] = [
    makeIntern({ id: 1, name: 'Alice Smith', score: 90, role: 'Developer' }),
    makeIntern({ id: 2, name: 'Bob Jones', score: 40, isPresent: false, role: 'Designer' }),
  ]

  describe('createIntern', () => {
    it('generates an id, trims the name, and rounds the score', () => {
      // We only override the fields we are specifically testing the transformation of
      const form = makeForm({
        name: '   John Doe   ',
        score: 88.6,
        role: 'QA Engineer',
      })
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
      const form = makeForm({ name: '   ' })
      expect(validateInternForm(form)).toBe('Name is required')
    })

    it('returns error for score > 100', () => {
      const form = makeForm({ score: 105 })
      expect(validateInternForm(form)).toBe('Score must be 0–100') 
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
      // Look how clean this is! We only care about scores here, so we only provide scores.
      const interns: Intern[] = [
        makeIntern({ score: 80 }),
        makeIntern({ score: 85 }),
        makeIntern({ score: 90 }),
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


// Task 4.2
  
// How many tests shared the duplicated setup?
// At least 5 `Intern` objects and 4 `InternFormState` objects were manually constructed from scratch across the various tests.
  
// Does a test factory make individual tests easier to read?
// Yes, significantly. A factory hides the irrelevant boilerplate data. For example, in the `calculateAverageScore` test, the factory allows us to define only the `score` property, which makes it instantly clear to the reader that the score is the only variable that matters for that specific test block.