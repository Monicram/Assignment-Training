import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
  readonly page:        Page;
  readonly nameInput:   Locator;
  readonly scoreInput:  Locator;
  readonly roleSelect:  Locator;
  readonly addButton:   Locator;
  readonly resetButton: Locator;
  readonly searchInput: Locator;
  readonly themeToggle: Locator;

  constructor(page: Page) {
    this.page        = page;
    this.nameInput   = page.getByPlaceholder('Name');
    this.scoreInput  = page.getByPlaceholder('Score');
    this.roleSelect  = page.locator('select[name="role"]');
    this.addButton   = page.getByRole('button', { name: 'Add Intern' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.searchInput = page.getByPlaceholder('Search Intern');
    this.themeToggle = page.getByRole('button', { name: /switch to/i });
  }

  async goto() {
    await this.page.goto('/');
  }

  async addIntern(name: string, score: string, role = 'Backend') {
  await this.nameInput.fill(name);
  await this.scoreInput.clear();
  await this.scoreInput.fill(score);

  await this.roleSelect.selectOption({ label: role });

  await this.addButton.click();
}
  async search(query: string) {
    await this.searchInput.fill(query);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async toggleTheme() {
    await this.themeToggle.click();
  }

  // Navigate from intern name heading up to the parent card div
  internCard(name: string): Locator {
  return this.page.locator('div').filter({ hasText: name }).last();
}

  removeButtonFor(name: string): Locator {
  return this.page
    .locator('div')
    .filter({ hasText: name })
    .last()
    .getByRole('button', { name: 'Remove' });
}
  get internCount(): Locator {
    return this.page.getByRole('button', { name: 'Remove' });
  }

validationError(): Locator {
  return this.page.getByText('Name is required');
}
}

//  Task 6.1
// Page Object Model stores page locators in one place.
// If the "Name" placeholder changes, only this file needs to be updated.

// Task 6.3
// locatorA.or(locatorB) matches either locator.
// It is useful when the same element can be found in different ways.
