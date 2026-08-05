// Import our single source of truth for validation
import { validateInternForm as coreValidate } from '../utils/intern-validation'

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

// Creates a new Intern object from form data.
// ID generation is injected so tests can control it.
export function createIntern(
  form: InternFormState,
  generateId: () => number = Date.now
): Intern {
  return {
    id: generateId(),
    name: form.name.trim(),
    score: Math.round(form.score),
    isPresent: form.isPresent,
    role: form.role,
  }
}

// Returns an error string, or null if the form is valid.
// Task 4.1: Replaced duplicated logic with a call to the shared utility
export function validateInternForm(form: InternFormState): string | null {
  return coreValidate(form.name, form.score)
}

// Returns the average score, or 0 for an empty list.
export function calculateAverageScore(interns: Intern[]): number {
  if (interns.length === 0) return 0
  const total = interns.reduce((sum, intern) => sum + intern.score, 0)
  return Math.round(total / interns.length)
}

// Returns 'Pass' for score >= 50, 'Fail' otherwise.
export function getScoreLabel(score: number): 'Pass' | 'Fail' {
  return score >= 50 ? 'Pass' : 'Fail'
}

// Filters interns by name or role (case-insensitive).
export function filterInterns(
  interns: Intern[],
  query: string
): Intern[] {
  const trimmed = query.trim().toLowerCase()
  if (!trimmed) return interns

  return interns.filter(
    i =>
      i.name.toLowerCase().includes(trimmed) ||
      i.role.toLowerCase().includes(trimmed)
  )
}


// Task 4.1
// Where was the duplication?
// The validation logic for names and scores was duplicated. It existed both here in `intern-service.ts` and in the new `src/utils/intern-validation.ts` file we created earlier.
// What is the risk of leaving it in?
// Shotgun Surgery/Inconsistency. If the company changes the maximum score to 150, a developer might update one file and forget the other. The UI might allow a score that the service later rejects, causing a confusing user experience.  
// What does removing it make easier to change in the future?
// We now have a Single Source of Truth. If validation rules change, we only have to update the logic in one single place (`src/utils/intern-validation.ts`).
