// Runs once with the feature flag off and once with it on
import { test, expect } from '@playwright/test';

const flagOn = process.env.FEATURE_REMEMBER_ME === 'on';

test(`remember me is ${flagOn ? 'shown' : 'hidden'}`, async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('remember-me')).toHaveCount(flagOn ? 1 : 0);
});

test('login still works', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill('asha');
  await page.getByTestId('password').fill('demo-pass');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByTestId('message')).toHaveText('Welcome, asha');
});
