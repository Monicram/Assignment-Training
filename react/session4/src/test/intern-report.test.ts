import { describe, it, expect } from 'vitest'
import { getReport } from '../utils/intern-report'

describe('getReport', () => {
  it('generates a pass/fail report for interns', () => {
    const input = [
      { name: '  Rahul ', score: 90 },
      { name: 'Amit', score: 40 }
    ]
    const result = getReport(input)
    expect(result).toEqual([
      { n: 'Rahul', s: 'PASS' },
      { n: 'Amit', s: 'FAIL' }
    ])
  })
})