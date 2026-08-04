import { test, expect } from '@playwright/test';

test.describe('Intern Dashboard', () => {

  // Navigate to the home page before each test so every test starts
  // from the same initial state and avoids repeating page.goto('/') in each test.
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the page title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toBeVisible();
  });
  test('shows the initial intern names', async ({ page }) => {
  await expect(page.getByText('Rahul - Frontend - 92')).toBeVisible();
  await expect(page.getByText('Priya - Backend - 78')).toBeVisible();
  await expect(page.getByText('Amit - Frontend - 45')).toBeVisible();
  await expect(page.getByText('Sneha - Fullstack - 95')).toBeVisible();
});
test('shows the correct number of intern cards', async ({ page }) => {
  // Each card has a Remove button — count them to count the cards
  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
});
test('shows the theme toggle button', async ({ page }) => {
  await expect(
    page.getByRole('button', { name: /switch to dark mode/i })
  ).toBeVisible();
});
});
test.describe('Locator Practice — getByRole', () => {

  // Navigate to the home page before each test so each test starts
  // from the same initial state.
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('finds the Add Intern button by role', async ({ page }) => {
    const addButton = page.getByRole('button', { name: 'Add Intern' });
    await expect(addButton).toBeVisible();
  });

  test('finds the heading by role', async ({ page }) => {
    const heading = page.getByRole('heading', { name: 'Intern Dashboard' });
    await expect(heading).toBeVisible();
  });

  test('finds the name input by role', async ({ page }) => {
    // A text input has the ARIA role "textbox".
    const nameInput = page.getByRole('textbox', { name: 'Name' });
    await expect(nameInput).toBeVisible();
  });
  test('finds the name input by placeholder', async ({ page }) => {
  const nameInput = page.getByPlaceholder('Name');
  await expect(nameInput).toBeVisible();
  await expect(nameInput).toBeEmpty();
});

test('finds the score input by placeholder', async ({ page }) => {
  const scoreInput = page.getByPlaceholder('Score');
  await expect(scoreInput).toBeVisible();
});
test('finds text with exact matching', async ({ page }) => {
  await expect(
    page.getByText('Rahul - Frontend - 92')
  ).toBeVisible();
});

test('finds text with regex matching', async ({ page }) => {
  await expect(
    page.getByText(/Average Score: \d+/)
  ).toBeVisible();
});

test('asserts that an absent element is not visible', async ({ page }) => {
  // Nobody named "Placeholder" is in the initial list
  await expect(page.getByText('Placeholder')).not.toBeVisible();
});
});
test.describe('Assertions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('heading has the correct text', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Intern Dashboard' })
    ).toHaveText('Intern Dashboard');
  });

  test('theme toggle button contains the word "Dark"', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toContainText('Dark');
  });

  test('error message is not visible initially', async ({ page }) => {
    await expect(page.getByText('Name is required')).not.toBeVisible();
  });
  test('name input is empty initially', async ({ page }) => {
  await expect(page.getByPlaceholder('Name')).toHaveValue('');
});

test('score input is 0 initially', async ({ page }) => {
  await expect(page.getByPlaceholder('Score')).toHaveValue('0');
});
test('correct number of Remove buttons matches the intern count', async ({ page }) => {
  await expect(page.getByText('Loading interns...')).not.toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Remove' })
  ).toHaveCount(4);
});

});
test.describe('Add Intern Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('adds a new intern and shows them in the list', async ({ page }) => {
  await page.getByPlaceholder('Name').fill('Vikram');
  await page.getByPlaceholder('Score').clear();
  await page.getByPlaceholder('Score').fill('88');

  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(
    page.getByText('Vikram - Frontend - 88')
  ).toBeVisible();

  await expect(
    page.getByText('Vikram — 88')
  ).toBeVisible();
});

  test('intern count increases after adding', async ({ page }) => {
    // 4 interns initially
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    // 5 interns after adding
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(5);
  });

  test('form clears after successful submission', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram');
    await page.getByPlaceholder('Score').fill('88');
    await page.getByRole('button', { name: 'Add Intern' }).click();

    // Form should reset after submit
    await expect(page.getByPlaceholder('Name')).toHaveValue('');
  });
  test('shows validation error when name is empty', async ({ page }) => {
  // Click submit without filling in the name
  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(page.getByText('Name is required')).toBeVisible();
});

test('does not add intern when form is invalid', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Intern' }).click();

  // Intern count should remain 4 — the invalid form was not submitted
  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
});

test('validation error disappears after successful submission', async ({ page }) => {
  await page.getByRole('button', { name: 'Add Intern' }).click();
  await expect(page.getByText('Name is required')).toBeVisible();

  await page.getByPlaceholder('Name').fill('Vikram');
  await page.getByPlaceholder('Score').fill('88');
  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(page.getByText('Name is required')).not.toBeVisible();
});

});

test.describe('Remove Intern Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('removes an intern when Remove is clicked', async ({ page }) => {
  // Confirm Rahul's card is present
  const rahulCard = page.getByText('Rahul — 92').locator('..');

  await expect(rahulCard).toBeVisible();

  // Click Rahul's Remove button
  await rahulCard.getByRole('button', { name: 'Remove' }).click();

  // Rahul's card should no longer exist
  await expect(page.getByText('Rahul — 92')).not.toBeVisible();
});

  test('intern count decreases after removal', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

    await page.getByRole('button', { name: 'Remove' }).first().click();

    await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(3);
  });

});
test.describe('Theme Toggle Journey', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('toggle button label changes from Dark to Light after click', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();

    await page.getByRole('button', { name: /switch to dark mode/i }).click();

    await expect(
      page.getByRole('button', { name: /switch to light mode/i })
    ).toBeVisible();
  });

  test('toggle switches back on second click', async ({ page }) => {
    await page.getByRole('button', { name: /switch to dark mode/i }).click();
    await page.getByRole('button', { name: /switch to light mode/i }).click();

    await expect(
      page.getByRole('button', { name: /switch to dark mode/i })
    ).toBeVisible();
  });

});
// Task 2.2

// toBeVisible() checks that an element exists and is visible to the user in the browser.
// toBeInTheDocument() (from React Testing Library) only checks that an element exists in the DOM,
// even if it is hidden. Playwright uses toBeVisible() for end-to-end UI testing.

// Task 2.3

// The regex /switch to dark mode/i matches the button text
// regardless of letter casing because the 'i' flag makes it case-insensitive.

// Task 3.1

// getByRole() is the preferred locator because it finds elements the same way
// users and assistive technologies do. It is more reliable and accessible than
// getByTestId(), which relies on custom attributes added only for testing.

// Task 3.2

// toBeEmpty() verifies that an input field has no value,
// confirming the form starts in its initial empty state.

// Task 3.3

// .first() is used because the regex may match multiple elements.
// It selects the first matching element so the locator is unique.

// Task 4.1

// fill() clears any existing text in an input field and enters
// the specified value, simulating how a user types into the field.

// Task 4.2

// click() simulates a real user clicking a button or other interactive
// element, triggering its associated action or event.

// Task 4.3

// toHaveValue() verifies that an input field contains the expected
// value after user interaction, ensuring the form was updated correctly.

// Task 5.1

// This end-to-end test verifies the complete user workflow, ensuring
// that filling the form, clicking the button, and updating the UI all
// work together, which cannot be verified by a unit test alone.

// Task 5.2

// not.toBeVisible() confirms that the validation message is no longer
// visible to the user, making it the appropriate assertion for an
// end-to-end UI test instead of a queryByText() pattern.

// Task 5.3

// filter() scopes the locator to the element containing Rahul without
// relying on parent traversal using locator('..').

// Task 5.4

// This Playwright test verifies the actual browser behavior after user
// interaction, confirming that the theme toggle updates the visible UI.
// A unit test can verify component logic, but it cannot validate the
// complete browser interaction and rendered interface.

// Task 6.1

// UI mode shows each test step and highlights locators,
// making debugging easier than terminal output.

// Task 6.2

// Running a single browser or test file speeds up development.
// Run all browsers only for final testing or CI.

// Task 6.3

// Headless mode is faster for automated testing and CI.
// Headed mode is useful for watching and debugging browser interactions.

// Task 6.4

// Debug mode lets you step through each action and inspect locators.
// It helps quickly identify why a Playwright test is failing.

// Task 7.1

// The HTML report showed the failure screenshot and detailed error message.
// It also displayed the expected vs actual result, making debugging easier.

// Task 7.2

// Timeline helps identify the exact step where the test failed.
// Screenshots show the page state during each action.
// Network helps diagnose failed or slow API requests.
// DOM snapshot lets you inspect the page elements at any test step.