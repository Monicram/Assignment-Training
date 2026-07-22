import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState<number>(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

export default Counter

// Task 1.1

// We cannot update `count` directly like count+1 because `count` is a state variable managed by React.
// Direct assignment does not trigger a re-render.
// We must use the setter function `setCount()` so React updates the state and re-renders the component with the new value.