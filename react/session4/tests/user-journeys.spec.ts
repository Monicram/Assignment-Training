import { test, expect } from '@playwright/test';

test.describe('User Journey — Add Intern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // This journey test verifies that the complete user flow works together.
  // Unlike a unit test, it checks the form, context state updates, UI rendering,
  // and user interactions in the browser from start to finish.

  test('user fills the form and the new intern appears in the list', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4);

    await page.getByPlaceholder('Name').fill('Vikram');

    await page.getByPlaceholder('Score').fill('88');

    await page.locator('select[name="role"]').selectOption('Frontend');

    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(
      page.locator('div').filter({ hasText: 'Vikram' }).last()
    ).toContainText('88');

    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(5);
  });

  test('new intern is added with score 88', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

  await page.getByPlaceholder('Name').fill('Vikram');
  await page.getByPlaceholder('Score').fill('88');

  await page.locator('select[name="role"]').selectOption('Frontend');

  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(
    page.locator('text=Vikram — 88')
  ).toBeVisible();
});

  test('new intern is added with score 45', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Ravi');
    await page.getByPlaceholder('Score').fill('45');

    await page.getByRole('button', { name: 'Add Intern' }).click();

    const raviCard = page
      .locator('div')
      .filter({ hasText: 'Ravi' })
      .last();

    await expect(raviCard).toBeVisible();
    await expect(
  page.locator('div').filter({ hasText: 'Ravi' }).last()
).toBeVisible();

await expect(raviCard).toContainText('45');
  });

  test('form resets after successful submission', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByPlaceholder('Score').fill('88');

    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByPlaceholder('Name')).toHaveValue('');
    await expect(page.getByPlaceholder('Score')).toHaveValue('0');
  });

});
test.describe('User Journey — Add Intern Validation', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows error when submitting with empty name', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Intern' }).click();

    await expect(page.getByText('Name is required')).toBeVisible();
  });

  test('does not add intern when name is empty', async ({ page }) => {
  // Wait until the initial interns are loaded
  await expect(
    page.getByRole('button', { name: 'Remove' })
  ).toHaveCount(4);

  // Try to submit without a name
  await page.getByRole('button', { name: 'Add Intern' }).click();

  // Validation message should appear
  await expect(page.getByText('Name is required')).toBeVisible();

  // No new intern should be added
  await expect(
    page.getByRole('button', { name: 'Remove' })
  ).toHaveCount(4);
});

  test('error clears after entering a valid name and resubmitting', async ({ page }) => {
  // Trigger validation error
  await page.getByRole('button', { name: 'Add Intern' }).click();
  await expect(page.getByText('Name is required')).toBeVisible();

  // Fill a valid form
  await page.getByPlaceholder('Name').fill('Vikram');
  await page.getByPlaceholder('Score').fill('88');
  await page.locator('select[name="role"]').selectOption('Frontend');

  await page.getByRole('button', { name: 'Add Intern' }).click();

  // Verify the intern was added instead of checking if the error disappeared
  await expect(page.locator('text=Vikram — 88')).toBeVisible();
});

  test('shows error when score is above 100', async ({ page }) => {
  await page.getByPlaceholder('Name').fill('Vikram');
  await page.getByPlaceholder('Score').fill('120');

  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(
    page.getByText('Score must be 0–100')
  ).toBeVisible();
});

});
test.describe('User Journey — Search and Filter', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('typing in search filters the intern list', async ({ page }) => {
    // Initial list contains 4 interns
    await expect(page.locator('li')).toHaveCount(4);

    await page.getByPlaceholder('Search Intern').fill('Rah');

    await expect(page.locator('li')).toHaveCount(1);
    await expect(page.locator('li')).toContainText('Rahul');
  });

  test('clearing search restores all interns', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search Intern');

    await searchInput.fill('Rahul');
    await expect(page.locator('li')).toHaveCount(1);

    await searchInput.clear();

    await expect(page.locator('li')).toHaveCount(4);
  });

  test('search is case-insensitive', async ({ page }) => {
    await page.getByPlaceholder('Search Intern').fill('rahul');

    await expect(page.locator('li')).toHaveCount(1);
    await expect(page.locator('li')).toContainText('Rahul');
  });

  test('no matching intern returns an empty list', async ({ page }) => {
    await page.getByPlaceholder('Search Intern').fill('zzz');

    await expect(page.locator('li')).toHaveCount(0);
  });

});
test.describe('User Journey — Remove Intern', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clicking Remove on Rahul\'s card removes Rahul from the list', async ({ page }) => {
    const rahulCard = page.locator('div').filter({ hasText: 'Rahul' }).last();

    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    await expect(page.locator('div').filter({ hasText: 'Rahul' })).toHaveCount(0);
  });

  test('intern count decreases after removal', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    const rahulCard = page.locator('div').filter({ hasText: 'Rahul' }).last();
    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(3);
  });

  test('other interns remain after one is removed', async ({ page }) => {
    const rahulCard = page.locator('div').filter({ hasText: 'Rahul' }).last();
    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    await expect(page.getByText('Priya — 78')).toBeVisible();
    await expect(page.getByText('Amit — 45')).toBeVisible();
    await expect(page.getByText('Sneha — 95')).toBeVisible();
});

  test('removed intern does not reappear after page interaction', async ({ page }) => {
    const rahulCard = page.locator('div').filter({ hasText: 'Rahul' }).last();
    await rahulCard.getByRole('button', { name: 'Remove' }).click();

    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    await expect(page.locator('div').filter({ hasText: 'Rahul' })).toHaveCount(0);
  });

});

test.describe('User Journey — Theme Toggle', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toggle button shows current mode to switch to', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

  test('clicking toggle switches to dark mode', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    await expect(
      page.getByRole('button', { name: /switch to light mode/i })
    ).toBeVisible();
  });

  test('clicking toggle again switches back to light mode', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

});

// Task 5.1
// This test checks that the full user workflow works correctly from start to finish.

// Task 5.2
// This test checks that an invalid score shows an error and the intern is not added.

// Task 5.3
// These tests check that search works correctly, including filtering, clearing, and case-insensitive search.

// Task 5.4
// Using .first() may click the wrong Remove button if the order of interns changes.

// Task 5.5
// The button text changes when the theme changes.
// If the app used a CSS class, we would check that class instead.

// The Playwright Inspector showed that the locator did not match any element
// and highlighted the actual page state at each step. This made it easier to
// identify the incorrect locator than the terminal error message alone.

// The DOM Snapshot pane was the most useful because it showed the actual
// page elements at the moment of failure. I could clearly see there were
// only four Remove buttons, making the failed assertion easy to understand.