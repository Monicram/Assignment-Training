import { useState } from 'react'

interface Intern {
  id:        number
  name:      string
  isPresent: boolean
}

function StateTypes() {
  // TypeScript infers type from initial value
  const [name,      setName]      = useState('')
  const [score,     setScore]     = useState(0)
  const [isActive,  setIsActive]  = useState(false)

  // Explicit annotation needed — initial value is ambiguous
  const [selected,  setSelected]  = useState<Intern | null>(null)
  const [interns,   setInterns]   = useState<Intern[]>([])

  return (
    <div>
      <p>Name: {name || '(none)'}</p>
      <p>Score: {score}</p>
      <p>Active: {isActive ? 'Yes' : 'No'}</p>
      <p>Selected: {selected ? selected.name : '(none)'}</p>
      <p>Intern count: {interns.length}</p>
      <button onClick={() => setName('Rahul')}>Set Name</button>
      <button onClick={() => setScore(92)}>Set Score</button>
      <button onClick={() => setIsActive(true)}>Activate</button>
    </div>
  )
}

export default StateTypes

// Task 1.2
// 1. setScore('92') shows a TypeScript error because `score` is inferred as a number, so `setScore()` only accepts number values.
// 2. setSelected({ id: 1, name: 'Rahul' }) also shows a TypeScript error because the `Intern` interface requires the `isPresent` property.
