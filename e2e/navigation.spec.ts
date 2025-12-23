import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Steel Motion/);
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('navigation links work', async ({ page }) => {
    await page.goto('/');

    // Test About link
    await page.click('nav >> text=About');
    await expect(page).toHaveURL(/\/about/);

    // Test Blog link
    await page.goto('/');
    await page.click('nav >> text=Blog');
    await expect(page).toHaveURL(/\/blog/);
  });

  test('mobile navigation works', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Mobile menu should be present
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"]');
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      await expect(page.locator('nav')).toBeVisible();
    }
  });

  test('footer links work', async ({ page }) => {
    await page.goto('/');

    // Test Privacy Policy link
    await page.click('footer >> text=Privacy');
    await expect(page).toHaveURL(/\/privacy/);

    // Test Terms link
    await page.goto('/');
    await page.click('footer >> text=Terms');
    await expect(page).toHaveURL(/\/terms/);
  });
});
