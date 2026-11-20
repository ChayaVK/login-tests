import { defineConfig, devices } from '@playwright/test';

const port = process.env.PORT || '3000';
// BASE_URL points the tests at a deployed environment (staging, production).
// Without it, Playwright starts the demo site locally.
const baseURL = process.env.BASE_URL || `http://localhost:${port}`;

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  // Quarantined tests are skipped unless RUN_QUARANTINE is set
  grepInvert: process.env.RUN_QUARANTINE ? undefined : /@quarantine/,
  use: { baseURL, trace: 'on-first-retry' },
  webServer: process.env.BASE_URL
    ? undefined
    : { command: 'node server.js', url: `http://localhost:${port}`, reuseExistingServer: !process.env.CI },
  projects: [
    { name: 'api', testDir: './api-tests' },
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'flags', testDir: './flag-tests', use: { ...devices['Desktop Chrome'] } },
  ],
});
