import { useEffect, useMemo, useState } from 'react'
import { useInterns } from '../contexts/intern-context'

// 1. Extracted Pure Function (Does ONLY math/data processing)
export function calculateScoreStats(interns: Array<{ score: number }>) {
  const scores = interns.map(i => i.score)

  return {
    highest: scores.length > 0 ? Math.max(...scores) : 0,
    lowest: scores.length > 0 ? Math.min(...scores) : 0,
    average:
      scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0,
    passing: interns.filter(i => i.score >= 50).length,
  }
}

// 2. Component (Does ONLY UI and State management)
function ScoreStats() {
  const { interns } = useInterns()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const stats = useMemo(() => {
    console.log('Recalculating stats...')
    // Call the pure function instead of doing the math inline
    return calculateScoreStats(interns)
  }, [interns])

  if (loading) {
    return <p>Loading interns...</p>
  }

  return (
    <div style={{ padding: '12px', background: '#f9f9f9', marginBottom: '12px' }}>
      <p>
        Highest: {stats.highest} | Lowest: {stats.lowest} | Avg: {stats.average}
      </p>
      <p>
        Passing: {stats.passing} of {interns.length}
      </p>
    </div>
  )
}

export default ScoreStats

//   Task 3.3 
//   What are the two (or more) things the original function was doing?
//   The original ScoreStats component was calculating the complex mathematical statistics (highest, lowest, average, passing count) AND managing the component's UI rendering, local loading state, and context consumption.
  
//   After the extract, what does each new function do?
//   1. `calculateScoreStats` is a pure function that only handles the data processing and math logic. It takes inputs and returns calculated outputs.
//   2. `ScoreStats` handles consuming context, managing the loading state, and rendering the UI, delegating the math to the extracted pure function.
