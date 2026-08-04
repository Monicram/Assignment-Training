import { assert } from './assert'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

export function filterInterns(
  interns: Intern[],
  searchTerm: string
): Intern[] {
  const search = searchTerm.toLowerCase()

  const result = interns.filter(
    intern =>
      intern.name.toLowerCase().includes(search) ||
      intern.role.toLowerCase().includes(search)
  )

  // Postcondition assertion: guarantee output invariant before returning
  assert(Array.isArray(result), 'filterInterns: filter output must be an array')

  return result
}

// Task 5.3
// Array.prototype.filter always returns an array, so this check is purely documentation at runtime.
// It becomes valuable during refactoring or optimizations to guarantee the return type contract remains intact and prevent downstream bugs.