import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // Wait for the page to be ready
    await page.waitForLoadState('domcontentloaded');
    // Check that the page has loaded (body is visible)
    await expect(page.locator('body')).toBeVisible();
  });
});
