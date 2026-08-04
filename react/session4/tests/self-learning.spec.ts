import { test, expect } from '@playwright/test';

// Research: page.fill() vs page.type()
// fill() clears the existing value and enters the new text instantly.
// type() types characters one by one and is useful for testing typing behavior.

test('demonstrates fill() vs type()', async ({ page }) => {
  await page.goto('/');

  const nameInput = page.getByPlaceholder('Name');

  await nameInput.fill('Rahul');
  await expect(nameInput).toHaveValue('Rahul');

  await nameInput.clear();

  await nameInput.type('Rahul');
  await expect(nameInput).toHaveValue('Rahul');
});

// Research: page.keyboard.press()
// keyboard.press() simulates keyboard keys such as Tab, Enter, and Escape.

test('moves focus using Tab key', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Name').fill('Vikram');
  await page.keyboard.press('Tab');

  await expect(page.getByPlaceholder('Score')).toBeFocused();
});

// Research: page.screenshot()
// page.screenshot() captures the page at a specific moment and saves it to a file.

test('takes a screenshot', async ({ page }) => {
  await page.goto('/');

  await page.screenshot({
    path: 'test-results/dashboard.png',
    fullPage: true,
  });
});

// Research: test.only() and test.skip()
// test.only() runs only the marked test and ignores all others.
// test.skip() skips a test temporarily. Never commit test.only() to source control.