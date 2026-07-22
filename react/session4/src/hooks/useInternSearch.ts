import { useState, useMemo } from 'react'

interface Intern {
  id: number; name: string; score: number; role: string; isPresent: boolean
}

interface UseInternSearchReturn {
  search:    string
  setSearch: (value: string) => void
  filtered:  Intern[]
  stats: {
    total:   number
    present: number
    avg:     number
  }
}

function useInternSearch(interns: Intern[]): UseInternSearchReturn {
  const [search, setSearch] = useState<string>('')

  const filtered = useMemo<Intern[]>(() =>
    interns.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase())
    ),
  [interns, search])

  const stats = useMemo(() => ({
    total:   interns.length,
    present: interns.filter(i => i.isPresent).length,
    avg:     interns.length > 0
      ? Math.round(interns.reduce((s, i) => s + i.score, 0) / interns.length)
      : 0,
  }), [interns])

  return { search, setSearch, filtered, stats }
}

export default useInternSearch

// useMemo avoids filtering on every render.It will render whenever there is a change.
// Filtering only runs when interns or search changes