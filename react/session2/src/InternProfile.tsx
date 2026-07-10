interface Intern {
  id: number
  name: string
  score: number
  isPresent: boolean
  skills: string[]
}

interface InternProfileProps {
  intern: Intern
}

function InternProfile({ intern }: InternProfileProps) {
  return (
    <div className="card">
      <h2>{intern.name}</h2>
      <p>Score: {intern.score}</p>
      <p>{intern.isPresent ? 'Present' : 'Absent'}</p>

      <ul>
        {intern.skills.map((skill: string, index: number) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

export default InternProfile

// Task 1

// A separate Intern interface defines the structure of an intern object in one place.
// It can be reused across multiple components, improving readability and reducing code duplication.
// If the data structure changes, it only needs to be updated once.

// Task 2

// The spread operator (...) creates a shallow copy of an object.
// It is useful when creating a new object or updating some properties without changing the original object.
// Using the spread operator unnecessarily, when the original object can be passed directly, makes the code longer and less clear.
