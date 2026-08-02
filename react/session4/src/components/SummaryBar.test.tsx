import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import SummaryBar from './SummaryBar'

vi.mock('../contexts/intern-context', () => ({
  useInterns: () => ({
    interns: [
      {
        id: 1,
        name: 'Rahul',
        score: 92,
        isPresent: true,
        role: 'Frontend',
      },
      {
        id: 2,
        name: 'Priya',
        score: 78,
        isPresent: true,
        role: 'Backend',
      },
      {
        id: 3,
        name: 'Amit',
        score: 45,
        isPresent: false,
        role: 'Frontend',
      },
    ],
    isLoading: false,
    addIntern: vi.fn(),
    removeIntern: vi.fn(),
  }),
}))

test('shows total intern count as 3', () => {
  render(<SummaryBar />)

  expect(
    screen.getByText('Total Interns: 3')
  ).toBeInTheDocument()
})

test('shows present intern count as 2', () => {
  render(<SummaryBar />)

  expect(
    screen.getByText('Present: 2')
  ).toBeInTheDocument()
})

test('shows average score as 71.7', () => {
  render(<SummaryBar />)

  expect(
    screen.getByText('Average Score: 71.7')
  ).toBeInTheDocument()
})

// Task 4.1
// SummaryBar depends on the useInterns hook from the intern context.
// Using the real context could make tests dependent on application state,
// making them slower or less repeatable. Mocking the hook isolates the component.

// Task 4.2
// Without vi.mock(), SummaryBar tries to use the real InternProvider.
// This typically results in an error such as:
// "useInterns must be used within an InternProvider"
// or another context-related error.

// Task 4.3
// 1. We did not mock useState or useMemo because they are React's built-in
// hooks and should behave normally during testing.

// 2. addIntern and removeIntern are mocked with vi.fn().
// If SummaryBar accidentally calls them, the mock prevents real side effects
// and lets us verify whether they were called.

// 3. If the Intern interface gains a new required field,
// TypeScript will report type errors in the mock, letting us know
// that the mock needs to be updated.