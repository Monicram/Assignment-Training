import { describe, test, expect } from 'vitest'
import { config } from '../config.ts'

describe('configuration load', () => {
  test('exports valid configuration values at startup', () => {
    expect(config.apiBase).toBeDefined()
    expect(typeof config.apiBase).toBe('string')
    expect(config.apiBase.startsWith('http')).toBe(true)
  })
})