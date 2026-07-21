import { defineConfig, devices } from '@playwright/test';

// Provide a minimal declaration for `process` so TypeScript recognizes it
// when @types/node is not installed.
declare const process: any;

export default defineConfig({
  testDir: './tests',

  // Runs all test files in parallel to reduce execution time.
  fullyParallel: true,

  // Retries failed tests twice in CI and does not retry locally.
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 30000,

  use: {
    // Sets the default URL for page.goto() and other navigation methods.
    baseURL: 'http://localhost:5173',

    // Captures a trace only if a test fails and is retried, helping with debugging.
    trace: 'on-first-retry',

    // Takes a screenshot only when a test fails.
    screenshot: 'only-on-failure',
  },

  projects: [
  // Desktop Chrome provides a predefined browser configuration including
  // viewport size, user agent, and device pixel ratio for desktop Chrome.
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
],

  // Starts the local development server before running the Playwright tests.
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});


// Task 1.2

// Examples of Playwright mobile device presets (used for mobile testing):
// - 'iPhone 14'
// - 'Pixel 7'