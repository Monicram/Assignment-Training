import { test, expect } from '@playwright/test';
import { DashboardPage } from './pages/DashboardPage';

test.describe('Journeys via Page Object', () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    await dashboard.goto();

    // Wait for the initial interns to load
    await expect(dashboard.internCount).toHaveCount(4);
  });

  test('adds a new intern', async () => {
    await dashboard.addIntern('Vikram', '88', 'Backend');

    await expect(dashboard.internCard('Vikram')).toBeVisible();
    await expect(dashboard.internCount).toHaveCount(5);
  });

  test('searches and filters the list', async () => {
    await dashboard.search('Rah');

    // Search filters the InternSearch list
    await expect(
      dashboard.page.getByText('Rahul - Frontend - 92')
    ).toBeVisible();
  });

  test('clears search and restores all interns', async () => {
    await dashboard.search('Rah');
    await dashboard.clearSearch();

    await expect(
      dashboard.page.getByText('Priya - Backend - 78')
    ).toBeVisible();

    await expect(
      dashboard.page.getByText('Sneha - Fullstack - 95')
    ).toBeVisible();
  });

  test('removes an intern by name', async () => {
    await dashboard.removeButtonFor('Rahul').click();

    await expect(dashboard.internCount).toHaveCount(3);
  });

  test('toggles theme and button label updates', async () => {
    await dashboard.toggleTheme();

    await expect(dashboard.themeToggle).toContainText('Light');
  });
  test('shows validation error on empty submit', async () => {
  await dashboard.addButton.click();

  await expect(
    dashboard.validationError()
  ).toHaveText('Name is required');
});
test('chromium-only feature check', async ({ page, browserName }) => {
  // Skip this test on Firefox and WebKit
  test.skip(
    browserName !== 'chromium',
    'This test targets Chromium-specific behaviour only'
  );

  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Intern Dashboard' })
  ).toBeVisible();
});
});

// The theme button is stored in the constructor.
// "Light" means the theme changed and the button now lets the user switch back.

// test.skip(browserName !== 'chromium') is useful when testing a feature
// that is only supported or behaves differently in Chromium, such as the
// File System Access API or certain experimental CSS features.