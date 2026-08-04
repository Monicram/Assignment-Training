import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

interface Intern {
  id: number; name: string; score: number; role: string; isPresent: boolean
}

interface InternContextType {
  interns:      Intern[]
  isLoading:    boolean
  error:        string | null
  addIntern:    (intern: Intern) => void
  removeIntern: (id: number) => void
}

// Task 6.1 — Boundary validation function
export function validateInternResponse(data: unknown): Intern[] {
  if (!Array.isArray(data)) {
    throw new Error(`validateInternResponse: expected array, got: ${typeof data}`)
  }

  return data.map((item, index) => {
    if (typeof item?.name !== 'string' || !item.name.trim()) {
      throw new Error(`validateInternResponse: item[${index}].name is invalid`)
    }
    if (typeof item?.score !== 'number' || Number.isNaN(item.score) || item.score < 0 || item.score > 100) {
      throw new Error(`validateInternResponse: item[${index}].score is invalid, got: ${item?.score}`)
    }
    return item as Intern
  })
}

const InternContext = createContext<InternContextType | null>(null)

export function InternProvider({ children }: { children: ReactNode }) {
  const [interns,   setInterns]   = useState<Intern[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error,     setError]     = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadInterns() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800))
        
        const rawData: unknown = [
          { id: 1, name: 'Rahul', score: 92, role: 'Frontend',  isPresent: true  },
          { id: 2, name: 'Priya', score: 78, role: 'Backend',   isPresent: true  },
          { id: 3, name: 'Amit',  score: 45, role: 'Frontend',  isPresent: false },
          { id: 4, name: 'Sneha', score: 95, role: 'Fullstack', isPresent: true  },
        ]

        // TASK 6.1: Validate boundary data BEFORE setting state
        const validatedData = validateInternResponse(rawData)

        if (isMounted) {
          setInterns(validatedData)
          setIsLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : String(err)
          setError(`fetchInterns: failed to load interns — ${message}`)
          setIsLoading(false)
        }
      }
    }

    loadInterns()

    return () => {
      isMounted = false
    }
  }, [])

  function addIntern(intern: Intern): void {
    // GUARD CLAUSES: Run at the very top before any allocations or state updates
    if (!intern) {
      throw new Error('addIntern: intern object is required')
    }
    if (!intern.name || !intern.name.trim()) {
      throw new Error('addIntern: Name is required')
    }
    if (typeof intern.score !== 'number' || Number.isNaN(intern.score) || intern.score < 0 || intern.score > 100) {
      throw new Error('addIntern: Score must be a valid number between 0 and 100')
    }

    // WORK: Only executed if all guards pass
    setInterns(prev => [...prev, { ...intern, name: intern.name.trim() }])
  }

  function removeIntern(id: number): void {
    if (typeof id !== 'number' || id <= 0) {
      throw new Error(`removeIntern: expected positive number id, got: ${id}`)
    }
    setInterns(prev => prev.filter(i => i.id !== id))
  }
  
  return (
    <InternContext.Provider value={{ interns, isLoading, error, addIntern, removeIntern }}>
      {children}
    </InternContext.Provider>
  )
}

export function useInterns(): InternContextType {
  const context = useContext(InternContext)
  if (!context) throw new Error('useInterns must be used inside InternProvider')
  return context
}

// Task 6.1 
// Without this validation, malformed API data corrupts state, causing silent UI bugs or cryptic runtime crashes downstream when components attempt to render missing properties.
// With it, the application fails fast at the boundary with an explicit error message pinpointing the bad data before any invalid state is stored or processed.

// Task 3.1 
// 1. Work done before validation: Object transformations, string trimming, and state array spreads were happening before validating inputs.
// 2. Risk: Wastes CPU/memory and risks crashing with a `TypeError` on invalid properties before reaching validation logic.
// 3. First thing that runs now: Input guard clauses that throw instantly if data is missing or invalid, ensuring zero work is performed on bad data.

// Task 2.2
// What was the caller doing with the undefined return from the original function?
// Would it have crashed, or silently shown an empty list?

// The caller was relying on the state default (`[]`), so when the fetch failed silently and returned `undefined`,
// the `interns` state remained `[]` and `isLoading` remained trapped at `true` (or toggled to `false` without setting data).
// The UI did NOT crash—instead, it silently rendered an empty list or froze in a permanent loading skeleton.
// This is classic silent failure: the user is left looking at a blank list assuming no data exists, while the 
// underlying system failed to alert anyone that the network request failed.

// Theme and intern data are kept in separate contexts because they have different purposes.
// This keeps the code simple and avoids unnecessary updates.

// Most Dangerous Silent Failure in this file:
// Unhandled Async Operation with Perpetual Loading / Missing Catch:
// If the data fetch fails or throws inside `useEffect`, `setIsLoading(false)` is never called. The UI gets trapped in 
// a permanent loading state without showing an error message to the user. Additionally, functions like `addIntern` return `void` 
// and do not indicate whether the operation succeeded on a server backend, leaving the UI state out of sync with real data.