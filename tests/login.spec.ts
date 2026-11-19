// Login page tests for the ShopEasy demo site
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('valid user can log in @smoke', async ({ page }) => {
  await page.getByTestId('username').fill('asha');
  await page.getByTestId('password').fill(process.env.TEST_PASSWORD ?? 'demo-pass');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByTestId('message')).toHaveText('Welcome, asha');
});

test('wrong password shows an error', async ({ page }) => {
  await page.getByTestId('username').fill('asha');
  await page.getByTestId('password').fill('wrong');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByTestId('message')).toHaveText('Invalid username or password');
});

test('empty form shows a required message', async ({ page }) => {
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByTestId('message')).toHaveText('Username and password are required');
});
