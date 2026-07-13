import { useState } from 'react'

interface FormState {
  name:      string
  score:     number
  isPresent: boolean
  role:      string
}

const initialForm: FormState = {
  name: '', score: 0, isPresent: true, role: 'Frontend',
}

function InternObjectForm() {
  const [form, setForm] = useState<FormState>(initialForm)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setForm(prev => ({ ...prev, name: e.target.value }))
  }

  function handleScoreChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setForm(prev => ({ ...prev, score: Number(e.target.value) }))
  }

  function handlePresentChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setForm(prev => ({ ...prev, isPresent: e.target.checked }))
  }

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setForm(prev => ({ ...prev, role: e.target.value }))
  }

  function handleReset(): void {
    setForm(initialForm)
  }

  return (
    <div>
      <input type="text"     value={form.name}      onChange={handleNameChange}    placeholder="Name"  />
      <input type="number"   value={form.score}      onChange={handleScoreChange}   placeholder="Score" />
      <input type="checkbox" checked={form.isPresent} onChange={handlePresentChange} />
      <label>Present</label>
      <select value={form.role} onChange={handleRoleChange}>
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      <p>Name: {form.name} | Score: {form.score} | Present: {form.isPresent ? 'Yes' : 'No'} | Role: {form.role}</p>
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}

export default InternObjectForm

// We use ...prev to keep the existing state values.
// Without the spread, the other properties would be lost.