interface ProfileCardProps {
  name?: string
  role?: string
  score?: number
  skills?: string[]
}

function ProfileCard({
  name = 'Unknown',
  role = 'Intern',
  score = 0,
  skills = [],
}: ProfileCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score}</p>

      {skills.length > 0 && (
        <ul>
          {skills.map((skill: string, index: number) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProfileCard

// Task 1

// The '?' makes a prop optional, so it is not required when the component is used.
// If an optional prop is not provided, the default parameter value is used instead.
// This allows the component to render safely without causing errors.

// Task 2

// Error: 'skills' is possibly 'undefined'.
// Since 'skills' is an optional array, it may not be passed to the component.
// Using a default value (skills = []) ensures it is always an array,
// allowing methods like .length and .map() to be used safely without errors.