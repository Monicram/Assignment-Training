import { useState, useEffect } from 'react'

function LiveTimer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    // Cleanup stops the timer when the component unmounts.
    // Without cleanup, multiple timers keep running.
    return () => clearInterval(timer)
  }, [])

  return <p>Live Timer: {seconds}s</p>
}

function SelfLearning() {
  /*
  1. React.StrictMode
  StrictMode calls components and effects twice in development.
  This helps find bugs and does not happen in production.

  2. useLayoutEffect
  useLayoutEffect runs before the browser paints the screen.
  useEffect runs after the screen is updated.

  3. useEffect without dependency array
  It runs after every render. If it updates state, it causes another render,
  creating an infinite loop.

  4. useReducer vs useState
  useState is best for simple state. useReducer is better for complex state
  with multiple related updates because it keeps update logic in one place.

  5. Cleanup function
  Cleanup removes timers and event listeners when they are no longer needed.
  Without cleanup, they continue running and may cause memory leaks.
  */

  return (
    <div>
      <h2>Self Learning</h2>
      <LiveTimer />
    </div>
  )
}

export default SelfLearning