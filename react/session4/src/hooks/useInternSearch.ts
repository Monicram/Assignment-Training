import { useMemo, useState } from 'react'
import { filterInterns } from '../utils/intern-utils'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface InternSearchReturn {
  search: string
  setSearch: (value: string) => void
  filtered: Intern[]
  stats: {
    total: number
    present: number
    avg: number
  }
}

function useInternSearch(
  interns: Intern[],
  filter: typeof filterInterns = filterInterns
): InternSearchReturn {
  const [search, setSearch] = useState('')

  const filtered = useMemo(
() => filter(interns, search),
    [interns, search, filter]
  )

  const stats = useMemo(() => {
    const total = filtered.length
    const present = filtered.filter(i => i.isPresent).length
    const avg =
      filtered.length > 0
        ? Math.round(filtered.reduce((sum, i) => sum + i.score, 0) / filtered.length)
        : 0
    return { total, present, avg }
  }, [filtered])

  return { search, setSearch, filtered, stats }
}

export default useInternSearch
// useMemo avoids filtering on every render. It will render whenever there is a change.
// Filtering only runs when interns or search changes.

// Testability — useInternSearch.ts
// Q1 Predictable output? YES — the same interns and search term always produce the same filtered list and statistics.
// Q2 No external deps? YES — no network, database, timers, or browser APIs are used.
// Q3 Dependencies injectable? YES — interns are passed as input and search state is controlled within the hook.
// Verdict: HIGHLY TESTABLE