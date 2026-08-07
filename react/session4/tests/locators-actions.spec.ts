import { test, expect } from '@playwright/test';

test.describe('Locator Chaining and Filtering', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test("finds Rahul's Remove button using filter", async ({ page }) => {
    const rahulCard = page
      .locator('div')
      .filter({ hasText: 'Rahul' })
      .last();

    await expect(
      rahulCard.getByRole('button', { name: 'Remove' })
    ).toBeVisible();
  });

  test("finds Priya's score using filter and chaining", async ({ page }) => {
    const priyaCard = page
      .locator('div')
      .filter({ hasText: 'Priya' })
      .last();

    await expect(priyaCard).toContainText('78');
  });

  // Task 1.2
  test('counts only intern cards that contain a Remove button', async ({ page }) => {
    await expect(
      page.getByRole('button', { name: 'Remove' })
    ).toHaveCount(4); // Change if your initial data changes
  });

  test('finds Priya card using has', async ({ page }) => {
    const priyaCard = page
      .locator('div')
      .filter({ hasText: 'Priya' })
      .last();

    await expect(priyaCard).toContainText('Priya');
    await expect(
      priyaCard.getByRole('button', { name: 'Remove' })
    ).toBeVisible();
  });
  test('first Remove button belongs to the first intern', async ({ page }) => {
  // .first() is zero-index shorthand for .nth(0)
  const firstRemove = page.getByRole('button', { name: 'Remove' }).first();
  await expect(firstRemove).toBeVisible();
});

test('last Remove button belongs to the last intern', async ({ page }) => {
  const lastRemove = page.getByRole('button', { name: 'Remove' }).last();
  await expect(lastRemove).toBeVisible();
});

test('second intern is accessible by index', async ({ page }) => {
  const secondIntern = page
    .getByRole('button', { name: 'Remove' })
    .nth(1);

  await expect(secondIntern).toBeVisible();
});

});
test.describe('Scoped Locators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test("asserts Rahul's score and Remove button inside Rahul's card only", async ({ page }) => {
    const rahulCard = page
      .locator('div')
      .filter({ hasText: 'Rahul' })
      .last();

    // All assertions are scoped to Rahul's card
    await expect(rahulCard).toContainText('Rahul');
    await expect(rahulCard).toContainText('92');
    await expect(
      rahulCard.getByRole('button', { name: 'Remove' })
    ).toBeVisible();
  });

  test('asserts different data in two different cards', async ({ page }) => {
    const rahulCard = page
      .locator('div')
      .filter({ hasText: 'Rahul' })
      .last();

    const priyaCard = page
      .locator('div')
      .filter({ hasText: 'Priya' })
      .last();

    await expect(rahulCard).toContainText('92');
    await expect(priyaCard).toContainText('78');

    await expect(
      rahulCard.getByRole('button', { name: 'Remove' })
    ).toBeVisible();

    await expect(
      priyaCard.getByRole('button', { name: 'Remove' })
    ).toBeVisible();
  });
  test('fills the form using scoped locators', async ({ page }) => {
  const form = page
    .locator('div')
    .filter({
      has: page.getByRole('button', { name: 'Add Intern' }),
    })
    .last();

  // There are initially 4 interns
  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);

  await form.getByPlaceholder('Name').fill('Vikram');
  await form.getByPlaceholder('Score').fill('75');

  await form.getByRole('button', { name: 'Add Intern' }).click();

  // Verify a new intern was added
  await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(5);
});
});
test.describe('Actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('fill sets the input value directly', async ({ page }) => {
    await page.getByPlaceholder('Name').fill('Vikram');

    await expect(page.getByPlaceholder('Name')).toHaveValue('Vikram');
  });

  test('selectOption selects by visible label text', async ({ page }) => {
  const roleSelect = page.locator('select[name="role"]');

  await roleSelect.selectOption({ label: 'Backend' });

  await expect(roleSelect).toHaveValue('Backend');
});

test('selectOption selects by value attribute', async ({ page }) => {
  const roleSelect = page.locator('select[name="role"]');

  await roleSelect.selectOption('Frontend');

  await expect(roleSelect).toHaveValue('Frontend');
});

});
test.describe('Checkbox Actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('checkbox is checked by default', async ({ page }) => {
    const presentCheckbox = page.locator('input[name="isPresent"]');

    await expect(presentCheckbox).toBeChecked();
  });

  test('uncheck removes the checked state', async ({ page }) => {
    const presentCheckbox = page.locator('input[name="isPresent"]');

    await presentCheckbox.uncheck();

    await expect(presentCheckbox).not.toBeChecked();
  });

  test('check re-applies the checked state', async ({ page }) => {
    const presentCheckbox = page.locator('input[name="isPresent"]');

    await presentCheckbox.uncheck();
    await presentCheckbox.check();

    await expect(presentCheckbox).toBeChecked();
  });

});
test.describe('Keyboard Actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Tab moves focus from name input to score input', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Name');
    const scoreInput = page.getByPlaceholder('Score');

    await nameInput.focus();
    await expect(nameInput).toBeFocused();

    await page.keyboard.press('Tab');

    await expect(scoreInput).toBeFocused();
  });

  test('Enter inside name input does not submit incomplete form', async ({ page }) => {
    const nameInput = page.getByPlaceholder('Name');

    await nameInput.fill('Vikram');
    await nameInput.press('Enter');

    // Since score is required, the intern should not be added.
    await expect(page.getByText('Vikram')).not.toBeVisible();
  });

});
test.describe('Input Actions', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('clear() empties the input', async ({ page }) => {
  const scoreInput = page.getByPlaceholder('Score');

  await scoreInput.fill('92');
  await scoreInput.fill('');

  await expect(scoreInput).toHaveValue('0');
});

  test('type() fires individual key events', async ({ page }) => {
  const searchInput = page.getByPlaceholder('Search Intern');

  await searchInput.type('Rah');

  await expect(
    page.locator('li').filter({ hasText: 'Rahul' })
  ).toHaveCount(1);

  await expect(
    page.locator('li').filter({ hasText: 'Rahul' })
  ).toContainText('Rahul');
});
test('debug: inspect form state mid-test', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Name').fill('Debug Intern');

  await page.getByRole('button', { name: 'Add Intern' }).click();

  await expect(
  page.getByText('Debug Intern — 0')
).toBeVisible();
});
});

// Task 1.1
// Using .filter({ hasText: 'Priya' }) is safer than .nth(1)
// because it locates the element by its content instead of position.

// Task 1.2
// filter({ hasText: 'Priya' }) filters elements whose text contains "Priya".
// filter({ has: locator }) filters elements that contain a child element
// matching another locator. It is more precise for nested elements.

// Task 1.3
// .first() and .nth() depend on the position of elements in the list.
// If the list order changes due to sorting, filtering, or new items being
// added or removed, they may interact with a different element than intended.
// It is safer to locate elements using unique text or other stable attributes.

// Task 2.1
// Scoped locators limit searches to a specific container instead of the entire page.
// This prevents Playwright from matching similar elements in other cards.
// When a page has repeated structures (like multiple intern cards), scoped locators
// make tests more accurate, reliable, and easier to debug because each assertion
// only checks the intended card.

// Task 2.2
// 1. If a page contains multiple forms with "Name" and "Score" fields,
//    scoping ensures Playwright fills only the intended form.
// 2. If different sections have buttons with the same text (such as
//    "Add Intern" or "Submit"), scoping ensures the correct button is
//    clicked instead of a matching button elsewhere on the page.

// Task 3.1
// selectOption('Backend') selects an option using its value attribute.
// selectOption({ label: 'Backend' }) selects an option using the text
// visible to the user.
// Selecting by value is generally more resilient because the value attribute
// is usually stable and intended for program logic, while the visible label
// may change due to UI updates, wording changes, or localization.

// Task 3.2
// check() and uncheck() ensure the checkbox ends up in the expected state.
// Using click() simply toggles the checkbox. If the checkbox is already
// checked or unchecked, click() may change it to the wrong state, making the test unreliable.

// Task 3.3
// locator.press('Tab') sends the key press to a specific element.
// page.keyboard.press('Tab') sends the key press to whichever element
// currently has keyboard focus, simulating how a real user presses keys.

// Task 3.4
// fill() sets the entire input value at once.
// type() enters text one character at a time and triggers keyboard events
// for each keystroke. It is useful for inputs with live behavior such as
// search boxes, autocomplete fields, or live filtering, where the
// application updates results as the user types.

//  You want to check the page state before a test fails.
//  You want to inspect elements and find the correct locator more easily.