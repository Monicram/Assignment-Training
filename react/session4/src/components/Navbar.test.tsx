import { render, screen } from '../test/test-utils'
import { render as rtlRender } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from '../contexts/theme-context'
import Navbar from './Navbar'

test('renders the dashboard title', () => {
  render(<Navbar />)

  expect(screen.getByText('Intern Dashboard')).toBeInTheDocument()
})

test('theme toggle button is visible', () => {
  render(<Navbar />)

  expect(
    screen.getByRole('button', { name: /switch to dark mode/i })
  ).toBeInTheDocument()
})

test('theme toggle button label changes after click', async () => {
  const user = userEvent.setup()

  render(<Navbar />)

  await user.click(
    screen.getByRole('button', { name: /switch to dark mode/i })
  )

  expect(
    screen.getByRole('button', { name: /switch to light mode/i })
  ).toBeInTheDocument()
})

test('renders correctly when wrapped manually in ThemeProvider', () => {
  rtlRender(
    <ThemeProvider>
      <Navbar />
    </ThemeProvider>
  )

  expect(screen.getByText('Intern Dashboard')).toBeInTheDocument()
})


// SL-1
// Using render from @testing-library/react directly would cause
// "useTheme must be used inside ThemeProvider" because Navbar depends on ThemeProvider.


// SL-1
// The first three tests use the custom render helper, which automatically wraps
// components with ThemeProvider. The last test does the same wrapping manually.
// The custom render is preferred because it avoids repeating provider setup.
