import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

test('soft assertion smoke test', async ({ page }) => {
  await page.goto('/');

  await expect.soft(page.getByRole('button', { name: 'Add Intern' })).toBeVisible();
  await expect.soft(page.getByPlaceholder('Name')).toBeVisible();
  await expect.soft(page.getByPlaceholder('Search Intern')).toBeVisible();
  await expect.soft(page.getByRole('button', { name: 'Remove' })).toHaveCount(4);
});

// Soft assertions continue running even if one assertion fails,
// making them useful for smoke tests where multiple UI elements
// should be verified together.

test('page.route example', async ({ page }) => {
  await page.route('**/api/interns', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 1,
          name: 'Mock Rahul',
          score: 100,
          role: 'Frontend',
        },
      ]),
    });
  });

  await page.goto('/');

  // Uncomment if your app actually fetches interns from /api/interns
  // await expect(page.getByText('Mock Rahul')).toBeVisible();
});

// page.route() intercepts network requests and returns mock data,
// allowing tests to run without a real backend.

// Fixtures create reusable setup that is automatically available
// to tests. Unlike beforeEach(), fixtures can provide reusable
// objects such as a DashboardPage instance.


test('visual regression example', async ({ page, browserName }) => {
  test.skip(
    browserName === 'firefox',
    'Firefox rendering differs slightly'
  );

  await page.goto('/');

  await expect(page).toHaveScreenshot('dashboard.png');
});

// Playwright stores the first screenshot as the baseline.
// Future test runs compare against that image to detect visual changes.


test('read CSS variable using evaluate', async ({ page }) => {
  await page.goto('/');

  const background = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--background-color')
  );

  expect(background).toBeDefined();
});

// page.evaluate() executes JavaScript inside the browser context.
// It is useful for reading DOM properties, CSS variables,
// localStorage, and browser APIs that Playwright locators cannot access.