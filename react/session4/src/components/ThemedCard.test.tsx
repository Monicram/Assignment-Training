import { render, screen } from '../test/test-utils'
import ThemedCard from './ThemedCard'

test('renders the student name', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.getByText('Rahul')).toBeInTheDocument()
})

test('renders the score', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.getByText('Score: 92')).toBeInTheDocument()
})

test('shows Pass when score is 50 or above', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.getByText('Pass')).toBeInTheDocument()
})

test('shows Fail when score is below 50', () => {
  render(<ThemedCard name="Amit" score={45} />)

  expect(screen.getByText('Fail')).toBeInTheDocument()
})
test('does not show Fail when score is passing', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.queryByText('Fail')).not.toBeInTheDocument()
})

test('does not show Pass when score is failing', () => {
  render(<ThemedCard name="Amit" score={45} />)

  expect(screen.queryByText('Pass')).not.toBeInTheDocument()
})
test('renders score of 0 correctly', () => {
  render(<ThemedCard name="Neha" score={0} />)

  expect(screen.getByText('Score: 0')).toBeInTheDocument()
  expect(screen.getByText('Fail')).toBeInTheDocument()
})

test('renders score of 100 correctly', () => {
  render(<ThemedCard name="Neha" score={100} />)

  expect(screen.getByText('Score: 100')).toBeInTheDocument()
  expect(screen.getByText('Pass')).toBeInTheDocument()
})

test('renders a different name and score without mixing up values', () => {
  render(<ThemedCard name="Priya" score={75} />)

  expect(screen.getByText('Priya')).toBeInTheDocument()
  expect(screen.getByText('Score: 75')).toBeInTheDocument()
  expect(screen.getByText('Pass')).toBeInTheDocument()
})
test('no console errors during ThemedCard render', () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {})

  render(<ThemedCard name="Rahul" score={92} />)

  expect(spy).not.toHaveBeenCalled()

  spy.mockRestore()
})
// Task 1.1
// We import render and screen from test-utils so the component is automatically wrapped with ThemeProvider during testing.

// Task 1.2
// getBy is used when an element should be present in the DOM.
// queryBy is used when checking that an element should NOT be present.
// toBeInTheDocument() verifies that an element exists,
// while not.toBeInTheDocument() verifies that an element is absent.

// Task 1.3
// Testing boundary values like 0 and 100 ensures the component handles
// minimum and maximum valid scores correctly. These edge cases help catch
// bugs that may not appear when testing only a typical value like 92.

// Task 7.3

// vi.fn() creates a mock function whose calls and arguments can be inspected.
// vi.mock() replaces an entire module with a mocked version for a test.
// vi.spyOn() observes an existing function and lets you verify its calls without permanently replacing it.