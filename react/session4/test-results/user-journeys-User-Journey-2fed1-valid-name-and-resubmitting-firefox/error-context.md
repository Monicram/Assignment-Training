# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: user-journeys.spec.ts >> User Journey — Add Intern Validation >> error clears after entering a valid name and resubmitting
- Location: tests\user-journeys.spec.ts:110:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Vikram — 88')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=Vikram — 88')

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
  61  |     await expect(raviCard).toBeVisible();
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
> 123 |   await expect(page.locator('text=Vikram — 88')).toBeVisible();
      |                                                  ^ Error: expect(locator).toBeVisible() failed
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
  162 |     await expect(page.locator('li')).toHaveCount(4);
  163 |   });
  164 | 
  165 |   test('search is case-insensitive', async ({ page }) => {
  166 |     await page.getByPlaceholder('Search Intern').fill('rahul');
  167 | 
  168 |     await expect(page.locator('li')).toHaveCount(1);
  169 |     await expect(page.locator('li')).toContainText('Rahul');
  170 |   });
  171 | 
  172 |   test('no matching intern returns an empty list', async ({ page }) => {
  173 |     await page.getByPlaceholder('Search Intern').fill('zzz');
  174 | 
  175 |     await expect(page.locator('li')).toHaveCount(0);
  176 |   });
  177 | 
  178 | });
  179 | test.describe('User Journey — Remove Intern', () => {
  180 | 
  181 |   test.beforeEach(async ({ page }) => {
  182 |     await page.goto('/');
  183 |   });
  184 | 
  185 |   test('clicking Remove on Rahul\'s card removes Rahul from the list', async ({ page }) => {
  186 |     const rahulCard = page.locator('div').filter({ hasText: 'Rahul' }).last();
  187 | 
  188 |     await rahulCard.getByRole('button', { name: 'Remove' }).click();
  189 | 
  190 |     await expect(page.locator('div').filter({ hasText: 'Rahul' })).toHaveCount(0);
  191 |   });
  192 | 
  193 |   test('intern count decreases after removal', async ({ page }) => {
  194 |     await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
  195 | 
  196 |     const rahulCard = page.locator('div').filter({ hasText: 'Rahul' }).last();
  197 |     await rahulCard.getByRole('button', { name: 'Remove' }).click();
  198 | 
  199 |     await expect(page.getByRole('button', { name: 'Remove' })).toHaveCount(3);
  200 |   });
  201 | 
  202 |   test('other interns remain after one is removed', async ({ page }) => {
  203 |     const rahulCard = page.locator('div').filter({ hasText: 'Rahul' }).last();
  204 |     await rahulCard.getByRole('button', { name: 'Remove' }).click();
  205 | 
  206 |     await expect(page.getByText('Priya — 78')).toBeVisible();
  207 |     await expect(page.getByText('Amit — 45')).toBeVisible();
  208 |     await expect(page.getByText('Sneha — 95')).toBeVisible();
  209 | });
  210 | 
  211 |   test('removed intern does not reappear after page interaction', async ({ page }) => {
  212 |     const rahulCard = page.locator('div').filter({ hasText: 'Rahul' }).last();
  213 |     await rahulCard.getByRole('button', { name: 'Remove' }).click();
  214 | 
  215 |     await page.getByRole('button', { name: /switch to dark mode/i }).click();
  216 | 
  217 |     await expect(page.locator('div').filter({ hasText: 'Rahul' })).toHaveCount(0);
  218 |   });
  219 | 
  220 | });
  221 | 
  222 | test.describe('User Journey — Theme Toggle', () => {
  223 | 
```