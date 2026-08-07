# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-journeys.spec.ts >> User Journey — Add Intern >> new intern is added with score 45
- Location: tests\user-journeys.spec.ts:50:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('div').filter({ hasText: 'Ravi' }).last()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('div').filter({ hasText: 'Ravi' }).last()

```

```yaml
- navigation:
  - heading "Intern Dashboard" [level=1]
  - button "Switch to Dark Mode"
- paragraph: "Highest: 95 | Lowest: 45 | Avg: 78"
- paragraph: "Passing: 3 of 4"
- textbox "Name"
- spinbutton: "0"
- checkbox [checked]
- text: Present
- combobox:
  - option "Frontend" [selected]
  - option "Backend"
  - option "Fullstack"
- button "Add Intern"
- button "Reset"
- textbox "Search Intern"
- paragraph: "Total: 4"
- paragraph: "Present: 3"
- paragraph: "Average Score: 78"
- list:
  - listitem: Rahul - Frontend - 92
  - listitem: Priya - Backend - 78
  - listitem: Amit - Frontend - 45
  - listitem: Sneha - Fullstack - 95
- text: Rahul — 92
- button "Remove"
- text: Priya — 78
- button "Remove"
- text: Amit — 45
- button "Remove"
- text: Sneha — 95
- button "Remove"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('User Journey — Add Intern', () => {
  4   | 
  5   |   test.beforeEach(async ({ page }) => {
  6   |     await page.goto('/');
  7   |   });
  8   | 
  9   |   // This journey test verifies that the complete user flow works together.
  10  |   // Unlike a unit test, it checks the form, context state updates, UI rendering,
  11  |   // and user interactions in the browser from start to finish.
  12  | 
  13  |   test('user fills the form and the new intern appears in the list', async ({ page }) => {
  14  |     await expect(
  15  |       page.getByRole('button', { name: 'Remove' })
  16  |     ).toHaveCount(4);
  17  | 
  18  |     await page.getByPlaceholder('Name').fill('Vikram');
  19  | 
  20  |     await page.getByPlaceholder('Score').fill('88');
  21  | 
  22  |     await page.locator('select[name="role"]').selectOption('Frontend');
  23  | 
  24  |     await page.getByRole('button', { name: 'Add Intern' }).click();
  25  | 
  26  |     await expect(
  27  |       page.locator('div').filter({ hasText: 'Vikram' }).last()
  28  |     ).toContainText('88');
  29  | 
  30  |     await expect(
  31  |       page.getByRole('button', { name: 'Remove' })
  32  |     ).toHaveCount(5);
  33  |   });
  34  | 
  35  |   test('new intern is added with score 88', async ({ page }) => {
  36  |   await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
  37  | 
  38  |   await page.getByPlaceholder('Name').fill('Vikram');
  39  |   await page.getByPlaceholder('Score').fill('88');
  40  | 
  41  |   await page.locator('select[name="role"]').selectOption('Frontend');
  42  | 
  43  |   await page.getByRole('button', { name: 'Add Intern' }).click();
  44  | 
  45  |   await expect(
  46  |     page.locator('text=Vikram — 88')
  47  |   ).toBeVisible();
  48  | });
  49  | 
  50  |   test('new intern is added with score 45', async ({ page }) => {
  51  |     await page.getByPlaceholder('Name').fill('Ravi');
  52  |     await page.getByPlaceholder('Score').fill('45');
  53  | 
  54  |     await page.getByRole('button', { name: 'Add Intern' }).click();
  55  | 
  56  |     const raviCard = page
  57  |       .locator('div')
  58  |       .filter({ hasText: 'Ravi' })
  59  |       .last();
  60  | 
> 61  |     await expect(raviCard).toBeVisible();
      |                            ^ Error: expect(locator).toBeVisible() failed
  62  |     await expect(
  63  |   page.locator('div').filter({ hasText: 'Ravi' }).last()
  64  | ).toBeVisible();
  65  | 
  66  | await expect(raviCard).toContainText('45');
  67  |   });
  68  | 
  69  |   test('form resets after successful submission', async ({ page }) => {
  70  |     await page.getByPlaceholder('Name').fill('Vikram');
  71  |     await page.getByPlaceholder('Score').fill('88');
  72  | 
  73  |     await page.getByRole('button', { name: 'Add Intern' }).click();
  74  | 
  75  |     await expect(page.getByPlaceholder('Name')).toHaveValue('');
  76  |     await expect(page.getByPlaceholder('Score')).toHaveValue('0');
  77  |   });
  78  | 
  79  | });
  80  | test.describe('User Journey — Add Intern Validation', () => {
  81  | 
  82  |   test.beforeEach(async ({ page }) => {
  83  |     await page.goto('/');
  84  |   });
  85  | 
  86  |   test('shows error when submitting with empty name', async ({ page }) => {
  87  |     await page.getByRole('button', { name: 'Add Intern' }).click();
  88  | 
  89  |     await expect(page.getByText('Name is required')).toBeVisible();
  90  |   });
  91  | 
  92  |   test('does not add intern when name is empty', async ({ page }) => {
  93  |   // Wait until the initial interns are loaded
  94  |   await expect(
  95  |     page.getByRole('button', { name: 'Remove' })
  96  |   ).toHaveCount(4);
  97  | 
  98  |   // Try to submit without a name
  99  |   await page.getByRole('button', { name: 'Add Intern' }).click();
  100 | 
  101 |   // Validation message should appear
  102 |   await expect(page.getByText('Name is required')).toBeVisible();
  103 | 
  104 |   // No new intern should be added
  105 |   await expect(
  106 |     page.getByRole('button', { name: 'Remove' })
  107 |   ).toHaveCount(4);
  108 | });
  109 | 
  110 |   test('error clears after entering a valid name and resubmitting', async ({ page }) => {
  111 |   // Trigger validation error
  112 |   await page.getByRole('button', { name: 'Add Intern' }).click();
  113 |   await expect(page.getByText('Name is required')).toBeVisible();
  114 | 
  115 |   // Fill a valid form
  116 |   await page.getByPlaceholder('Name').fill('Vikram');
  117 |   await page.getByPlaceholder('Score').fill('88');
  118 |   await page.locator('select[name="role"]').selectOption('Frontend');
  119 | 
  120 |   await page.getByRole('button', { name: 'Add Intern' }).click();
  121 | 
  122 |   // Verify the intern was added instead of checking if the error disappeared
  123 |   await expect(page.locator('text=Vikram — 88')).toBeVisible();
  124 | });
  125 | 
  126 |   test('shows error when score is above 100', async ({ page }) => {
  127 |   await page.getByPlaceholder('Name').fill('Vikram');
  128 |   await page.getByPlaceholder('Score').fill('120');
  129 | 
  130 |   await page.getByRole('button', { name: 'Add Intern' }).click();
  131 | 
  132 |   await expect(
  133 |     page.getByText('Score must be 0–100')
  134 |   ).toBeVisible();
  135 | });
  136 | 
  137 | });
  138 | test.describe('User Journey — Search and Filter', () => {
  139 | 
  140 |   test.beforeEach(async ({ page }) => {
  141 |     await page.goto('/');
  142 |   });
  143 | 
  144 |   test('typing in search filters the intern list', async ({ page }) => {
  145 |     // Initial list contains 4 interns
  146 |     await expect(page.locator('li')).toHaveCount(4);
  147 | 
  148 |     await page.getByPlaceholder('Search Intern').fill('Rah');
  149 | 
  150 |     await expect(page.locator('li')).toHaveCount(1);
  151 |     await expect(page.locator('li')).toContainText('Rahul');
  152 |   });
  153 | 
  154 |   test('clearing search restores all interns', async ({ page }) => {
  155 |     const searchInput = page.getByPlaceholder('Search Intern');
  156 | 
  157 |     await searchInput.fill('Rahul');
  158 |     await expect(page.locator('li')).toHaveCount(1);
  159 | 
  160 |     await searchInput.clear();
  161 | 
```