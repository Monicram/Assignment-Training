import { describe, test, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { InternProvider, useInterns } from '../contexts/intern-context'

function TestComponent() {
  const { interns, addIntern } = useInterns()

  return (
    <>
      <button
        onClick={() =>
          addIntern({
            name: 'Monica',
            score: 95,
            role: 'Frontend',
            isPresent: true,
          })
        }
      >
        Add Intern
      </button>

      <div data-testid="last-id">
        {interns.length > 0 ? interns[interns.length - 1].id : 'none'}
      </div>
    </>
  )
}

describe('InternProvider', () => {
  test('adds an intern with injected id', () => {
    render(
      <InternProvider generateId={() => 999}>
        <TestComponent />
      </InternProvider>
    )

    fireEvent.click(screen.getByText('Add Intern'))

    expect(screen.getByTestId('last-id').textContent).toBe('999')
  })
})

// Task 5.1
// InternProvider accepts a generateId function.
// This can be tested by passing a function that always returns 999.
// After calling addIntern, the new intern should have id 999.

// Injecting generateId makes the code easier to test.
// We can provide a fixed ID during testing instead of depending on the default implementation.
// If the ID generation changes in the future, the tests will still work.