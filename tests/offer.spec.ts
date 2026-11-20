// Flaky on purpose: the banner sometimes takes longer than the 1-second wait
import { test, expect } from '@playwright/test';

test('offer banner appears @quarantine', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('offer')).toBeVisible({ timeout: 1000 });
});
