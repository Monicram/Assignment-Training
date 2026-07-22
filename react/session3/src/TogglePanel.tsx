import { useState } from 'react'

function TogglePanel() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div>
      <button onClick={() => setIsOpen(prev => !prev)}>
        {isOpen ? 'Hide Details' : 'Show Details'}
      </button>

      {isOpen && (
        <div>
          <p>Name: Rahul</p>
          <p>Score: 92</p>
          <p>Role: Frontend</p>
        </div>
      )}
    </div>
  )
}

export default TogglePanel

// Both methods work.
// prev => !prev is safer because it uses the latest state.
// It avoids issues when state updates happen asynchronously.