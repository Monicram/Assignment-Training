import { useState, useRef } from 'react'

function RefVsState() {
  const [stateCount, setStateCount] = useState<number>(0)
  const refCount = useRef<number>(0)

  function incrementState(): void {
    setStateCount(prev => prev + 1)
  }

  function incrementRef(): void {
    refCount.current += 1
    console.log('Ref value:', refCount.current)
  }

  return (
    <div>
      <p>State count (shown in UI): {stateCount}</p>
      <p>Ref count (check console): {refCount.current}</p>

      <button onClick={incrementState}>Increment State</button>
      <button onClick={incrementRef}>Increment Ref</button>
    </div>
  )
}

export default RefVsState

// useState updates the UI when the value changes.
// useRef stores values without re-rendering the component.