import { createContext, useContext, useState,type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

// Context is null until wrapped by ThemeProvider.
const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  function toggleTheme(): void {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)

  // Throws an error if used outside ThemeProvider.
  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider')
  }

  return context
}

//Task 2.2

// useTheme() only be used inside a React component or custom hook.
// Calling it in a normal function gives an "Invalid hook call" error.