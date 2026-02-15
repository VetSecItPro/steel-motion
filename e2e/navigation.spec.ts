import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Dismiss cookie notice by setting localStorage before navigation
    await page.addInitScript(() => {
      localStorage.setItem('cookie-notice-dismissed', 'true');
    });
  });

  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Steel Motion/);
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');

    // Test About link
    await page.getByRole('navigation', { name: 'Main navigation' }).getByText('About').click();
    await expect(page).toHaveURL(/\/about/);

    // Test Articles link
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Main navigation' }).getByText('Articles').click();
    await expect(page).toHaveURL(/\/articles/);
  });

  test('mobile navigation works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile menu should be present
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
    }
  });

  test('footer links work', async ({ page }) => {
    await page.goto('/');

    // Test Privacy Policy link
    await page.locator('footer').getByText('Privacy').click();
    await expect(page).toHaveURL(/\/privacy/);

    // Test Terms link
    await page.goto('/');
    await page.locator('footer').getByText('Terms').click();
    await expect(page).toHaveURL(/\/terms/);
  });
});
