import { render, screen } from './test-utils'
import { vi, test, expect, afterEach } from 'vitest'
import { within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddInternForm from '../components/AddInternForm'

const mockAddIntern = vi.fn()

vi.mock('../contexts/intern-context', () => ({
  useInterns: () => ({
    interns: [],
    addIntern: mockAddIntern,
  }),
}))

afterEach(() => {
  vi.useRealTimers()
})


// SL-2
// vi.useFakeTimers() replaces real timers with fake ones so tests do not wait
// for actual time to pass. vi.runAllTimers() immediately executes pending timers.

test('uses fake timers to fast-forward a loading delay', () => {
  vi.useFakeTimers()

  const callback = vi.fn()

  setTimeout(callback, 500)

  expect(callback).not.toHaveBeenCalled()

  vi.runAllTimers()

  expect(callback).toHaveBeenCalledTimes(1)
})


// SL-3
// within() limits queries to a specific section of the page, avoiding matches
// from other components that contain the same text.

test('uses within to query inside one container', () => {
  render(
    <div>
      <div data-testid="card-1">
        <span>Rahul</span>
        <span>92</span>
      </div>

      <div data-testid="card-2">
        <span>Rahul</span>
        <span>75</span>
      </div>
    </div>
  )

  const firstCard = screen.getByTestId('card-1')

  expect(within(firstCard).getByText('92')).toBeInTheDocument()
})


// SL-4
// user.tab() simulates keyboard Tab navigation, allowing accessibility testing
// by verifying which element currently has keyboard focus.

test('tab moves focus through AddInternForm inputs', async () => {
  const user = userEvent.setup()

  render(<AddInternForm />)

  await user.tab()
  expect(screen.getByPlaceholderText('Name')).toHaveFocus()

  await user.tab()
  expect(screen.getByPlaceholderText('Score')).toHaveFocus()

  await user.tab()
  expect(screen.getByRole('checkbox')).toHaveFocus()

  await user.tab()
  expect(screen.getByRole('combobox')).toHaveFocus()

  await user.tab()
  expect(
    screen.getByRole('button', { name: 'Add Intern' })
  ).toHaveFocus()

  await user.tab()
  expect(
    screen.getByRole('button', { name: 'Reset' })
  ).toHaveFocus()
})

// SL-5

// useInternForm.ts line coverage: 100%

// Line coverage measures the percentage of executable lines of code that were
// executed during testing.

// Branch coverage measures the percentage of decision paths (such as if/else,
// switch statements, and conditional expressions) that were exercised by the
// tests. Branch coverage is usually lower because every possible path must be
// tested.

