import { describe, test, expect } from 'vitest'
import { generateInternId } from '../utils/generate-id'

describe('generateInternId', () => {
  test('returns expected ID using injected values', () => {
    const id = generateInternId(
      () => 123456789,
      () => 0.12345
    )

    expect(id).toBe('intern-123456789-0.12345')
  })

  test('returns identical IDs with the same injected values', () => {
    const id1 = generateInternId(
      () => 100,
      () => 0.5
    )

    const id2 = generateInternId(
      () => 100,
      () => 0.5
    )

    expect(id1).toBe(id2)
  })
})