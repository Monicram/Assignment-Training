import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SummaryBar } from './SummaryBar'

describe('SummaryBar', () => {
  test('shows correct total', () => {
    render(<SummaryBar total={3} presentCount={2} averageScore={80} />)

    expect(screen.getByText('Total: 3')).toBeInTheDocument()
  })

  test('shows correct present count', () => {
    render(<SummaryBar total={3} presentCount={2} averageScore={80} />)

    expect(screen.getByText('Present: 2')).toBeInTheDocument()
  })

  test('shows average score 0', () => {
    render(<SummaryBar total={0} presentCount={0} averageScore={0} />)

    expect(screen.getByText('Average Score: 0')).toBeInTheDocument()
  })

  test('updates when props change', () => {
    const { rerender } = render(
      <SummaryBar total={3} presentCount={2} averageScore={80} />
    )

    rerender(
      <SummaryBar total={5} presentCount={4} averageScore={90} />
    )

    expect(screen.getByText('Total: 5')).toBeInTheDocument()
    expect(screen.getByText('Present: 4')).toBeInTheDocument()
    expect(screen.getByText('Average Score: 90')).toBeInTheDocument()
  })
})