import { describe, test, expect } from 'vitest'
import { prepareInternRequest } from '../utils/intern-request'

describe('prepareInternRequest', () => {
  test('prepares the request payload', () => {
    const data = {
      name: 'Rahul',
      score: 92,
      role: 'Frontend',
      isPresent: true,
    }

    expect(prepareInternRequest(data)).toEqual({
      method: 'POST',
      body: JSON.stringify(data),
    })
  })
})