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
export function validateInternForm(
  form: InternFormState
): string | null {
  if (!form.name || form.name.trim() === '') {
    return 'Name is required'
  }
  if (typeof form.score !== 'number' || isNaN(form.score)) {
    return 'Score must be a number'
  }
  if (form.score < 0 || form.score > 100) {
    return 'Score must be between 0 and 100'
  }
  return null
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