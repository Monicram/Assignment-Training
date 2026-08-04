import { useInterns } from '../contexts/intern-context'

export default function SummaryBar() {
  const { interns } = useInterns()

  const total = interns.length

  const present = interns.filter(
    (intern) => intern.isPresent
  ).length

  const average =
    total === 0
      ? 0
      : (
          interns.reduce(
            (sum, intern) => sum + intern.score,
            0
          ) / total
        ).toFixed(1)

  return (
    <div>
      <p>Total Interns: {total}</p>
      <p>Present: {present}</p>
      <p>Average Score: {average}</p>
    </div>
  )
}

// This file calculates intern statistics and renders the summary bar UI.
// Concerns mixed (if any): Mixes UI rendering with data calculation logic.