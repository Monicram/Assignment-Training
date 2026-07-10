import type { ReactNode } from 'react'

interface CardProps {
  title: string
  children?: ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>

      {children && (
        <div className="card-body">
          {children}
        </div>
      )}
    </div>
  )
}

export default Card

// Task 1

// ReactNode represents anything that React can render, such as text,
// numbers, JSX elements, fragments, arrays, or other components.
// It is the correct type for the children prop because it allows the
// Card component to display any valid React content.

// Task 2

// A required children prop means the component must always receive content.
// An optional children prop allows the component to render even when no
// content is passed. Use required children when content is mandatory,
// and optional children when the component can be displayed without it.