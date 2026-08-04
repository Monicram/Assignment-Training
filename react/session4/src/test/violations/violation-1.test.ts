// import { test, expect } from 'vitest'

// const interns: { id: number; name: string }[] = []

// test('can add first intern', () => {
//   interns.push({ id: 1, name: 'Rahul' })
//   expect(interns).toHaveLength(1)
// })

// test('can add second intern', () => {
//   interns.push({ id: 2, name: 'Priya' })
//   expect(interns).toHaveLength(2)
// })

// test("score report has today's date", () => {
//   const report = { date: new Date().toISOString().slice(0, 10) }
//   expect(report.date).toBe("2024-11-15")   // hardcoded — fails tomorrow
// })

// test('calculates average score', () => {
//   const scores = [92, 78, 45, 95]
//   const avg = scores.reduce((a, b) => a + b, 0) / scores.length
//   console.log('Average:', avg)    // no assertion
// })

// test('loads interns from API', async () => {
//   const response = await fetch('http://localhost:5173/api/interns')
//   const data = await response.json()
//   expect(data).toHaveLength(4)
// })


// Task 1.1 
// FIRST Principle Violated: Independent
// The second test depends on the first test because both share the same
// 'interns' array. When the second test is run by itself, the array starts
// empty, so it contains only one intern instead of two. Therefore, the test
// fails with "Expected length: 2, Received length: 1".

// Task 1.2
// FIRST Principle Violated: Repeatable
// This test depends on the current system date.
// Since the expected date is hardcoded as "2024-11-15",
// the test will fail on any day other than 2024-11-15.

// Task 1.3
// FIRST Principle Violated: Self-validating
// This test has no assertion (expect()).
// It only prints the average using console.log(), so it always passes,
// even if the calculation is incorrect. This makes it unreliable because
// it cannot automatically detect bugs.

// Task 1.4
// FIRST Principles Violated: Fast and Repeatable
// This test makes a real API request to a local server.
// It is slow because it depends on a network call (Fast violation).
// It is not repeatable because it requires the server to be running.
// In CI, the localhost server is usually unavailable, so the test fails.

import { test, expect } from 'vitest'

const numbers: number[] = []

test('adds first number', () => {
  numbers.push(1)
  expect(numbers).toHaveLength(1)
})

test('adds second number', () => {
  numbers.push(2)
  expect(numbers).toHaveLength(2)
})