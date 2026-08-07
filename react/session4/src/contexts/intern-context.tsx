import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

interface InternContextType {
  interns: Intern[]
  isLoading: boolean
  addIntern: (intern: Omit<Intern, 'id'>) => void
  removeIntern: (id: number) => void
}

interface InternProviderProps {
  children: ReactNode
  generateId?: () => number
}

const InternContext = createContext<InternContextType | null>(null)
export function InternProvider({
  children,
  generateId = () => Date.now(),
}: InternProviderProps) {
  const [interns, setInterns] = useState<Intern[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setInterns([
        { id: 1, name: 'Rahul', score: 92, role: 'Frontend', isPresent: true },
        { id: 2, name: 'Priya', score: 78, role: 'Backend', isPresent: true },
        { id: 3, name: 'Amit', score: 45, role: 'Frontend', isPresent: false },
        { id: 4, name: 'Sneha', score: 95, role: 'Fullstack', isPresent: true },
      ])
      setIsLoading(false)
    }, 800)
  }, [])

  function addIntern(intern: Omit<Intern, 'id'>): void {
    const newIntern: Intern = {
      id: generateId(),
      ...intern,
    }

    setInterns(prev => [...prev, newIntern])
  }

  function removeIntern(id: number): void {
    setInterns(prev => prev.filter(i => i.id !== id))
  }

  return (
    <InternContext.Provider
      value={{ interns, isLoading, addIntern, removeIntern }}
    >
      {children}
    </InternContext.Provider>
  )
}

export function useInterns(): InternContextType {
  const context = useContext(InternContext)

  if (!context) {
    throw new Error('useInterns must be used inside InternProvider')
  }

  return context
}


// Theme and intern data are kept in separate contexts because they have different purposes.
// This keeps the code simple and avoids unnecessary updates.

// Testability — intern-context.tsx
// Q1 Predictable output? PARTIAL — initial data loading depends on a timer.
// Q2 No external deps? NO — uses setTimeout and React Context, so timing must be handled during testing.
// Q3 Dependencies injectable? NO — mock intern data and loading behavior are hardcoded inside the provider.
// Verdict: LOW TESTABILITY