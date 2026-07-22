import { useState, useEffect } from 'react'

interface Intern {
  id: number; name: string; score: number; role: string
}

function InternLoader() {
  const [interns,   setInterns]   = useState<Intern[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)
    // Simulating an API call with a delay
    setTimeout(() => {
      setInterns([
        { id: 1, name: 'Rahul', score: 92, role: 'Frontend'  },
        { id: 2, name: 'Priya', score: 78, role: 'Backend'   },
        { id: 3, name: 'Amit',  score: 45, role: 'Frontend'  },
        { id: 4, name: 'Sneha', score: 95, role: 'Fullstack' },
      ])
      setIsLoading(false)
    }, 1500)
  }, [])

  if (isLoading) return <p>Loading interns...</p>

  return (
    <ul>
      {interns.map(i => (
        <li key={i.id}>{i.name} — {i.role} — {i.score}</li>
      ))}
    </ul>
  )
}

export default InternLoader

// [] runs only once when the component mounts.
// [role] runs when role changes, and no dependency array runs after every render.