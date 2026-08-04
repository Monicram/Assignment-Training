import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import { vi, test, expect } from 'vitest'
import InternListWithCallback from './InternListWithCallback'

const mockRemoveIntern = vi.fn()

vi.mock('../contexts/intern-context', () => ({
  useInterns: () => ({
    interns: [
      {
        id: 1,
        name: 'Rahul',
        score: 92,
        role: 'Frontend',
        isPresent: true,
      },
      {
        id: 2,
        name: 'Priya',
        score: 78,
        role: 'Backend',
        isPresent: true,
      },
      {
        id: 3,
        name: 'Amit',
        score: 45,
        role: 'Fullstack',
        isPresent: false,
      },
    ],
    removeIntern: mockRemoveIntern,
  }),
}))

vi.mock('../contexts/theme-context', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../contexts/theme-context')>()

  return {
    ...actual,
    useTheme: () => ({
      theme: 'light',
      toggleTheme: vi.fn(),
    }),
  }
})

test('renders all interns from context', () => {
  render(<InternListWithCallback />)

  expect(screen.getByText('Rahul — 92')).toBeInTheDocument()
  expect(screen.getByText('Priya — 78')).toBeInTheDocument()
  expect(screen.getByText('Amit — 45')).toBeInTheDocument()
})

test('renders correct number of remove buttons', () => {
  render(<InternListWithCallback />)

  const buttons = screen.getAllByRole('button', { name: 'Remove' })

  expect(buttons).toHaveLength(3)
})

test('calls removeIntern with the correct id', async () => {
  const user = userEvent.setup()

  render(<InternListWithCallback />)

  const buttons = screen.getAllByRole('button', { name: 'Remove' })

  await user.click(buttons[0])

  expect(mockRemoveIntern).toHaveBeenCalledTimes(1)
  expect(mockRemoveIntern).toHaveBeenCalledWith(1)
})

// Mock only external dependencies (such as context, APIs, or services) to keep tests predictable.
// Let the component's own logic run normally so you're testing its real behavior, not the mock.