import { useState, useEffect, useRef } from 'react'

interface Intern {
  id: number
  name: string
  score: number
  role: string
  isPresent: boolean
}

function Dashboard() {
  const [interns, setInterns] = useState<Intern[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTimeout(() => {
      setInterns([
        { id: 1, name: 'Rahul', score: 92, role: 'Frontend', isPresent: true },
        { id: 2, name: 'Priya', score: 78, role: 'Backend', isPresent: true },
        { id: 3, name: 'Amit', score: 45, role: 'Frontend', isPresent: false },
        { id: 4, name: 'Sneha', score: 95, role: 'Fullstack', isPresent: true },
      ])
      setIsLoading(false)
    }, 1500)
  }, [])

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus()
    }
  }, [isOpen])

  const filteredInterns = interns.filter(i =>
    i.name.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) return <p>Loading interns...</p>

  return (
    <div>
      <h2>Intern Dashboard</h2>

      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Hide Search' : 'Show Search'}
      </button>

      {isOpen && (
        <div>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search intern..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      )}

      <p>
        Showing {filteredInterns.length} of {interns.length} interns
      </p>

      {filteredInterns.map(intern => (
        <div
          key={intern.id}
          style={{
            border: '1px solid gray',
            padding: '10px',
            margin: '10px 0',
          }}
        >
          <h3>{intern.name}</h3>
          <p>Role: {intern.role}</p>
          <p>Score: {intern.score}</p>

          <span
            style={{
              color: intern.score >= 50 ? 'green' : 'red',
              fontWeight: 'bold',
            }}
          >
            {intern.score >= 50 ? 'Pass' : 'Fail'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Dashboard