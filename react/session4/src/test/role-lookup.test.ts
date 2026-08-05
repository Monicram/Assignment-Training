import { describe, it, expect } from 'vitest'
import { getRoleLabel } from '../utils/role-lookup'

describe('getRoleLabel', () => {
  it('returns the correct expanded label for a mapped role', () => {
    expect(getRoleLabel('Frontend')).toBe('Frontend Developer')
    expect(getRoleLabel('Backend')).toBe('Backend Developer')
  })

  // Task 5.2 Requirement: Test confirming the unknown case returns 'Unknown'
  it("returns 'Unknown' when a new or unmapped role is passed", () => {
    expect(getRoleLabel('Designer')).toBe('Unknown')
    expect(getRoleLabel('Manager')).toBe('Unknown')
    expect(getRoleLabel('')).toBe('Unknown')
  })
})