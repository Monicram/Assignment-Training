import { useState } from 'react'
import { validateInternForm } from '../utils/intern-validation'

interface InternFormState {
  name: string
  score: number
  isPresent: boolean
  role: string
}

interface UseInternFormReturn {
  form: InternFormState
  error: string
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  handleReset: () => void
  isValid: () => boolean
}

const initialForm: InternFormState = {
  name: '',
  score: 0,
  isPresent: true,
  role: 'Frontend',
}

function useInternForm(): UseInternFormReturn {
  const [form, setForm] = useState<InternFormState>(initialForm)
  const [error, setError] = useState<string>('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value, type } = e.target

    setForm(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'score'
          ? Number(value)
          : value,
    }))
  }

  function handleReset(): void {
    setForm(initialForm)
    setError('')
  }

  function isValid(): boolean {
    const validationError = validateInternForm(form.name, form.score)

    if (validationError) {
      setError(validationError)
      return false
    }

    setError('')
    return true
  }

  return {
    form,
    error,
    handleChange,
    handleReset,
    isValid,
  }
}

export default useInternForm

// UseInternFormReturn defines what the hook returns.
// It improves type safety and makes the hook easier to use.

// Testability — useInternForm.ts
// Q1 Predictable output? YES — given the same form values, validation always returns the same result.
// Q2 No external deps? YES — no server, database, or browser APIs are required.
// Q3 Dependencies injectable? PARTIAL — form state is managed internally with React state, so it cannot be directly injected.
// Verdict: MODERATELY TESTABLE