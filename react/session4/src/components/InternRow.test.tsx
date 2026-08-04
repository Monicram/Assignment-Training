import { render, screen } from '../test/test-utils'
import userEvent from '@testing-library/user-event'
import InternRow from './InternRow'

test('finds the Remove button by role', () => {
  render(
    <InternRow id={1} name="Rahul" score={92} onRemove={() => {}} />
  )

  // getByRole is the most preferred query — reflects how screen readers see the page
  const removeButton = screen.getByRole('button', { name: 'Remove' })
  expect(removeButton).toBeInTheDocument()
})
test('calls onRemove with the correct id when Remove is clicked', async () => {
  const user = userEvent.setup()
  const onRemove = vi.fn()

  render(
    <InternRow id={1} name="Rahul" score={92} onRemove={onRemove} />
  )

  await user.click(screen.getByRole('button', { name: 'Remove' }))

  expect(onRemove).toHaveBeenCalledTimes(1)
  expect(onRemove).toHaveBeenCalledWith(1)
})

test('does not call onRemove when row is only rendered', () => {
  const onRemove = vi.fn()

  render(
    <InternRow id={1} name="Rahul" score={92} onRemove={onRemove} />
  )

  // No interaction — callback should not fire
  expect(onRemove).not.toHaveBeenCalled()
})


//Task 2.2

// screen.debug() prints the current rendered HTML (DOM) of the component to the terminal. It helps us inspect the structure, element roles,
// accessible names, and attributes, making it easier to choose the
// correct Testing Library query such as getByRole(), getByText(), or getByLabelText().

// Task 7.1

// vi.fn() creates a mock function that records how it is called during a test.
// Unlike a real function, it lets us verify calls, arguments, and call count.