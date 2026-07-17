import { render, screen, waitFor } from '../test/test-utils'
import { vi } from 'vitest'
import ScoreStats from './ScoreStats'

vi.mock('../contexts/intern-context', () => ({
  useInterns: () => ({
    interns: [
      {
        id: 1,
        name: 'Rahul',
        score: 80,
        isPresent: true,
        role: 'Frontend',
      },
    ],
  }),
}))

test('shows loading state initially', () => {
  render(<ScoreStats />)

  expect(screen.getByText('Loading interns...')).toBeInTheDocument()
})

test('shows intern data after loading completes', async () => {
  render(<ScoreStats />)

  const stats = await screen.findByText(/Highest:/)

  expect(stats).toBeInTheDocument()

  expect(
    screen.queryByText('Loading interns...')
  ).not.toBeInTheDocument()
})
test('multiple statistics appear after data loads', async () => {
  render(<ScoreStats />)

  await waitFor(() => {
    expect(screen.getByText(/Highest:/)).toBeInTheDocument()
    expect(screen.getByText(/Passing:/)).toBeInTheDocument()
  })
})

// Task 5.1
// findByText() is asynchronous and automatically waits for an element to appear in the DOM. 
// It is useful when components render content after an asynchronous operation such as a fetch or setTimeout.

// Task 5.2
// findBy is used when waiting for a single element to appear in the DOM.
// It automatically retries until the element is found or the timeout expires.
// waitFor is used when waiting for multiple assertions or more complex
// conditions, such as checking that several elements appear or disappear after an asynchronous update.