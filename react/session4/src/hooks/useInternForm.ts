import { useState } from 'react'
import { validateInternForm } from '../utils/intern-validation'

interface InternFormState {
  name:      string
  score:     number
  isPresent: boolean
  role:      string
}

interface UseInternFormReturn {
  form:         InternFormState
  error:        string
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleReset:  () => void
  isValid:      () => boolean
}

const initialForm: InternFormState = {
  name: '', score: 0, isPresent: true, role: 'Frontend',
}

function useInternForm(): UseInternFormReturn {
  const [form,  setForm]  = useState<InternFormState>(initialForm)
  const [error, setError] = useState<string>('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void {
    const { name, value, type } = e.target

    // Fail Fast Check: Ensure target has a valid field name
    if (!name || !(name in initialForm)) {
      throw new Error(`handleChange: Invalid or missing form field name: "${name}"`)
    }

    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : name === 'score' 
          ? Number(value) 
          : value,
    }))

    if (error) setError('')
  }

  function handleReset(): void {
    setForm(initialForm)
    setError('')
  }

  function isValid(): boolean {
    try {
      // Validate required domain fields rather than letting defaults mask invalid state
      validateInternForm(form.name, form.score)
      setError('')
      return true
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred during validation')
      }
      return false
    }
  }

  return { form, error, handleChange, handleReset, isValid }
}

export default useInternForm

// Task 2.3
// The default (like defaulting role to '' or 'Unknown' or score to 0) was almost always masking a caller error.

// UseInternFormReturn defines what the hook returns.
// It improves type safety and makes the hook easier to use.