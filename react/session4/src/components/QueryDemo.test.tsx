import { render, screen } from '../test/test-utils'
import ThemedCard from './ThemedCard'

// getBy - throws an error if the element is not found
test('getByText finds an existing element', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.getByText('Rahul')).toBeInTheDocument()

  // Uncomment to see the error
  // screen.getByText('Priya')
})

// queryBy - returns null if the element is not found
test('queryBy returns null when element is missing', () => {
  render(<ThemedCard name="Rahul" score={92} />)

  expect(screen.queryByText('Fail')).not.toBeInTheDocument()
})

// getAllBy - finds multiple matching elements
test('getAllBy finds multiple Pass labels', () => {
  render(
    <div>
      <ThemedCard name="Rahul" score={92} />
      <ThemedCard name="Priya" score={78} />
    </div>
  )

  const passLabels = screen.getAllByText('Pass')
  expect(passLabels).toHaveLength(2)
})

// Task 2.1
// getByRole is used to find a single element with a specific role.
// getAllByRole is used when multiple elements share the same role and
// you want to retrieve all of them as an array.