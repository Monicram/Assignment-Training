import { test, expect, vi, afterEach } from 'vitest'

afterEach(() => {
  vi.useRealTimers()
})

test("score report has today's date", () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2024-11-15'))

  const report = {
    date: new Date().toISOString().slice(0, 10),
  }

  expect(report.date).toBe('2024-11-15')
})

// If vi.useRealTimers() is not called,
// the mocked system time remains active.
// Other tests may continue using the fake date,
// causing unexpected test failures.