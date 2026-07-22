import { useRef } from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFocus(): void {
    inputRef.current?.focus()
  }

  function handleClear(): void {
    if (inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type something..." />
      <button onClick={handleFocus}>Focus Input</button>
      <button onClick={handleClear}>Clear and Focus</button>
    </div>
  )
}

export default FocusInput

// ?. checks if current is not null before calling focus().
// current is null before the input is rendered or after it is removed.