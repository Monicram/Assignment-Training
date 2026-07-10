// interface InternCardProps {
//   name: string
//   score: number
//   isPresent: boolean
// }

// function InternCard({ name, score, isPresent }: InternCardProps) {

//   // ❌ Do NOT modify props directly.
//   // score = score + 10

//   // ✅ Create a new value without changing the prop.
//   const adjustedScore: number = score >= 90 ? score : score + 5

//   return (
//     <div className="card">
//       <h2>{name}</h2>
//       <p>Original Score: {score}</p>
//       <p>Adjusted Score: {adjustedScore}</p>
//       <p>{isPresent ? 'Present' : 'Absent'}</p>
//     </div>
//   )
// }

// export default InternCard


import Avatar from './Avatar'
import Badge from './Badge'
import ScoreBar from './ScoreBar'

interface InternCardProps {
  name: string
  score: number
  isPresent: boolean
  role: string
}
function InternCard({ name, score, isPresent, role }: InternCardProps) {
  return (
    <div className="card">
      <Avatar name={name} />

      <h2>{name}</h2>

      <ScoreBar score={score} />

      <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
        <Badge label={role} color="#4f46e5" />

        <Badge
          label={isPresent ? 'Present' : 'Absent'}
          color={isPresent ? 'green' : '#e53e3e'}
        />

        {score >= 90 && (
          <Badge
            label="Top Performer"
            color="#d97706"
          />
        )}
      </div>
    </div>
  )
}

export default InternCard

// Task 1.1 

// The props interface is defined separately to improve readability,
// make it reusable across components, and keep the component code clean.
// It also makes the expected props easier to understand and maintain.

// Task 1.3

// Props are read-only because they are passed from the parent component.
// A child component should never change them directly.
// If props are mutated, the UI may become inconsistent and React may not
// re-render correctly. Instead, derive a new value or use state when needed.

// Task 5.2

// Badge is reusable and avoids writing the same span multiple times.
// It keeps the code cleaner, easier to maintain, and TypeScript checks
// every usage to ensure the correct props are passed.