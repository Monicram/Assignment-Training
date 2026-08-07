// Section 1

// Worst testability: intern-context.tsx
// It is the hardest to test because the intern data and loading logic are hardcoded inside the provider using setTimeout.
// The dependencies cannot be replaced easily, so tests must wait for timers or mock them.
// Making the data source injectable would make the provider much easier to test.

// Section 2
import { test, expect } from 'vitest'

// Pure functions
function addItem(cart: string[], item: string): string[] {
  return [...cart, item]
}


test('cart starts empty', () => {
  const cart: string[] = []
  expect(cart).toHaveLength(0)
})

test('can add an item', () => {
  const cart: string[] = []
  const result = addItem(cart, 'Rahul')
  expect(result).toHaveLength(1)
})

test('can add two items', () => {
  let cart: string[] = []
  cart = addItem(cart, 'Rahul')
  cart = addItem(cart, 'Priya')
  expect(cart).toHaveLength(2)
})

test('cart is empty again', () => {
  const cart: string[] = []
  expect(cart).toHaveLength(0)
})
 
// Task 2.2
// The fixed version follows the First Principles of pure functions and test isolation.
// It does not modify shared global state.
// Each function takes its input as a parameter and returns a new array.
// Every test creates its own cart, so tests are independent and can run in any order.
