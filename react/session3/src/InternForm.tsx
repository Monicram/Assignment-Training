import { useState } from 'react'

function InternForm() {
  const [name,  setName]  = useState<string>('')
  const [score, setScore] = useState<number>(0)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setName(e.target.value)
  }

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setScore(Number(e.target.value))
  }

  function handleReset(): void {
    setName('')
    setScore(0)
  }

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Intern name"
      />
      <input
        type="number"
        value={score}
        onChange={handleScoreChange}
        placeholder="Score"
      />
      <p>Name: {name} | Score: {score}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default InternForm

// e.target.value is always a string.
// Number() converts it to a number.
// Controlled input means the value is controlled by React state.
// onChange updates the state, so the input always shows the latest value.