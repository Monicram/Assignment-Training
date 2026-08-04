import { createContext, useContext,type ReactNode } from 'react'
import type { Intern, InternFormState } from '../types/intern'
import { useInternRepository } from '../repositories/intern-repository'
import {
  createIntern,
  calculateAverageScore,
} from '../services/intern-service'

interface InternContextValue {
  interns: Intern[]
  averageScore: number
  addIntern: (form: InternFormState) => void
  removeIntern: (id: number) => void
}

const InternContext = createContext<InternContextValue | null>(null)

export function InternProvider({ children }: { children: ReactNode }) {
  const repo = useInternRepository()

  const value: InternContextValue = {
    interns: repo.interns,
    averageScore: calculateAverageScore(repo.interns),

    addIntern: (form: InternFormState) => {
      const intern = createIntern(form)
      repo.add(intern)
    },

    removeIntern: (id: number) => repo.remove(id),
  }

  return (
    <InternContext.Provider value={value}>
      {children}
    </InternContext.Provider>
  )
}

export function useInterns() {
  const context = useContext(InternContext)
  if (!context) {
    throw new Error('useInterns must be used within an InternProvider')
  }
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

// This file manages global intern state and provides actions to add, remove, and fetch interns.
// Concerns mixed (if any): Mixes state management, API data fetching, error handling, and data validation.