// Silent failure audit — useInternSearch.ts
// Pattern 1: Silent default on division by zero — `avg` calculation defaults to `0` when `interns` array is empty (`interns.length > 0 ? ... : 0`), masking the absence of statistical data.
// Pattern 2: Null/undefined safety omission — `i.name.toLowerCase()` assumes `i.name` is always a valid string. If `i.name` is null/undefined, it will throw a runtime TypeError instead of providing explicit guard/validation.
// Pattern 3: Unfiltered missing property fallbacks — `filtered` assumes `interns` is an array; passing null or undefined will break the hook rather than handling state or throwing a domain error.

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
    avg:     number | null  // Changed to return null or throw when dataset is empty
  }
}

function useInternSearch(interns: Intern[]): UseInternSearchReturn {
  const [search, setSearch] = useState<string>('')

  const filtered = useMemo<Intern[]>(() => {
    if (!Array.isArray(interns)) {
      throw new Error(`useInternSearch: expected interns to be an array, got ${typeof interns}`)
    }
    return interns.filter(i =>
      i.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [interns, search])

  const stats = useMemo(() => {
    const total = interns.length
    const present = interns.filter(i => i.isPresent).length
    
    // Instead of defaulting average score to 0 (which incorrectly implies everyone got 0 points),
    // return null or explicitly handle empty sets.
    const avg = total > 0
      ? Math.round(interns.reduce((s, i) => s + i.score, 0) / total)
      : null

    return { total, present, avg }
  }, [interns])

  return { search, setSearch, filtered, stats }
}

export default useInternSearch

// useMemo avoids filtering on every render. It will render whenever there is a change.
// Filtering only runs when interns or search changes

// Most Dangerous Silent Failure in this file:
// Returning `0` as Default Average (`avg: 0`): Defaulting `avg` to `0` when there are no interns or no search matches creates 
// ambiguity between an actual class average score of 0 and a lack of data. UI components or reporting tools will render 
// "Average Score: 0%" instead of indicating "No Data Available" or an invalid calculation state, leading users to believe 
// candidates scored zero points.