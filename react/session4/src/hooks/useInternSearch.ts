import { useMemo } from 'react'
import { filterInterns } from '../utils/intern-utils'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

function useInternSearch(
  interns: Intern[],
  searchTerm: string,
  filter: typeof filterInterns = filterInterns
): Intern[] {
  return useMemo(
    () => filter(interns, searchTerm),
    [interns, searchTerm, filter]
  )
}

export default useInternSearch
// useMemo avoids filtering on every render.It will render whenever there is a change.
// Filtering only runs when interns or search changes

// Testability — useInternSearch.ts
// Q1 Predictable output? YES — the same interns and search term always produce the same filtered list and statistics.
// Q2 No external deps? YES — no network, database, timers, or browser APIs are used.
// Q3 Dependencies injectable? YES — interns are passed as input and search state is controlled within the hook.
// Verdict: HIGHLY TESTABLE