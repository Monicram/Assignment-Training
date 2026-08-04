import { test, expect } from '@playwright/test';

test.describe('Assertions — State', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Add Intern button is enabled', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Add Intern' })
    ).toBeEnabled();
  });

  test('name input is editable', async ({ page }) => {
    await expect(
      page.getByPlaceholder('Name')
    ).toBeEditable();
  });

  test('Present checkbox is checked by default', async ({ page }) => {
    await expect(
      page.locator('input[name="isPresent"]')
    ).toBeChecked();
  });

  test('name input receives focus when clicked', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Name');

    await nameInput.click();

    await expect(nameInput).toBeFocused();
  });

});

test.describe('Assertions — Attributes and Classes', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Present checkbox has type attribute of checkbox', async ({ page }) => {
    await expect(
      page.locator('input[name="isPresent"]')
    ).toHaveAttribute('type', 'checkbox');
  });

  test('theme switches to dark mode', async ({ page }) => {
    await page.getByRole('button', {
      name: /switch to dark mode/i,
    }).click();

    // Verify the button changes after switching themes
    await expect(
      page.getByRole('button', {
        name: /switch to light mode/i,
      })
    ).toBeVisible();
  });

  test('theme switches back to light mode', async ({ page }) => {
    await page.getByRole('button', {
      name: /switch to dark mode/i,
    }).click();

    await page.getByRole('button', {
      name: /switch to light mode/i,
    }).click();

    await expect(
      page.getByRole('button', {
        name: /switch to dark mode/i,
      })
    ).toBeVisible();
  });

});

test.describe('Assertions — Page Level', () => {

  test('page has the correct title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/session4/);
  });

  test('page URL is the root path', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL('http://localhost:5173/');
  });

  test('matches the intern dashboard screenshot', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Firefox rendering differs slightly');
    await page.goto('/');

    await expect(page).toHaveScreenshot('intern-dashboard.png');
  });

});
// Task 4.1
// toBeEnabled() verifies that a button can be interacted with,
// while toBeVisible() only checks that it is displayed.
// A button may be visible but disabled, preventing user interaction.

// Task 4.2
// A regex is used with toHaveClass(/dark/) because an element can
// have multiple CSS classes. The regex checks that the "dark" class
// exists without depending on the exact class list or class order.

// Task 4.3
// toHaveScreenshot() creates a baseline screenshot the first time it runs. On later runs, Playwright compares the current page with the baseline image.
// If there are no visual changes, the test passes.
// If the UI or visible text changes, Playwright detects the difference, generates a diff image, and the test fails until the baseline is updated.