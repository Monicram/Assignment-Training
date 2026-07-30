import { render, screen, waitFor } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import AddInternForm from './AddInternForm'

const mockAddIntern = vi.fn()

vi.mock('../contexts/intern-context', () => ({
  useInterns: () => ({
    interns: [],
    addIntern: mockAddIntern,
  }),
}))

describe('AddInternForm', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    mockAddIntern.mockClear()
  })

  describe('input updates', () => {
    test('updates name when user types', async () => {
      render(<AddInternForm />)

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

      expect(screen.getByDisplayValue('Rahul')).toBeInTheDocument()
    })

    test('updates score when user types', async () => {
      render(<AddInternForm />)

      await user.clear(screen.getByPlaceholderText('Score'))
      await user.type(screen.getByPlaceholderText('Score'), '92')

      expect(screen.getByDisplayValue(92)).toBeInTheDocument()
    })

    test('resets name input when Reset is clicked', async () => {
      render(<AddInternForm />)

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
      await user.click(screen.getByRole('button', { name: 'Reset' }))

      expect(screen.getByPlaceholderText('Name')).toHaveValue('')
    })
  })

  describe('submission', () => {
    test('calls addIntern with intern data when form is submitted', async () => {
      render(<AddInternForm />)

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
      await user.clear(screen.getByPlaceholderText('Score'))
      await user.type(screen.getByPlaceholderText('Score'), '92')

      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

      expect(mockAddIntern).toHaveBeenCalledTimes(1)

      expect(mockAddIntern).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Rahul',
          score: 92,
        })
      )
    })
  })

  describe('validation', () => {
    test('shows error when name is empty on submit', async () => {
      render(<AddInternForm />)

      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

      expect(screen.getByText('Name is required')).toBeInTheDocument()
    })

    test('shows error when score is above 100', async () => {
      render(<AddInternForm />)

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')
      await user.clear(screen.getByPlaceholderText('Score'))
      await user.type(screen.getByPlaceholderText('Score'), '150')

      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

      expect(screen.getByText('Score must be 0–100')).toBeInTheDocument()
    })

    test('does not call addIntern when form is invalid', async () => {
      render(<AddInternForm />)

      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

      expect(mockAddIntern).not.toHaveBeenCalled()
    })

    test('error clears when valid name is entered after failed submit', async () => {
      render(<AddInternForm />)

      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

      expect(screen.getByText('Name is required')).toBeInTheDocument()

      await user.type(screen.getByPlaceholderText('Name'), 'Rahul')

      await user.click(screen.getByRole('button', { name: 'Add Intern' }))

      await waitFor(() => {
        expect(
          screen.queryByText('Name is required')
        ).not.toBeInTheDocument()
      })
    })
  })
})

// Task 3.1
// userEvent is preferred over fireEvent because it simulates real user
// interactions such as typing, clicking, focusing and keyboard events
// similar to how a real user interacts with the application.

// Task 3.2
// expect.objectContaining() checks only the specified properties of an object.
// It ignores additional properties, making the test more flexible than
// checking the entire object.

// Task 4.1
// not.toHaveBeenCalled() is clearer than toHaveBeenCalledTimes(0)
// because it directly expresses that the function should never have
// been called, making the test easier to read.

// Task 4.2
// queryBy is used instead of getBy because getBy throws an error immediately
// if the element is not found. queryBy returns null when the element is
// absent, allowing us to verify that the validation message has disappeared.

// Task 8.1
// Keep describe blocks at two levels or less to keep test output easy to read.
// Deep nesting makes failures harder to locate and maintain.