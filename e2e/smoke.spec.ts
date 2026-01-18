import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Steel Motion/i);
  });

  test('navigation links are visible', async ({ page }) => {
    await page.goto('/');
    // Check that main navigation exists
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('contact section exists on homepage', async ({ page }) => {
    await page.goto('/');
    // Scroll to contact section or check it exists
    const contactHeading = page.getByRole('heading', { name: /contact|get in touch/i });
    await expect(contactHeading).toBeVisible();
  });
});
