import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
  });

  test('displays contact form', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
  });

  test('validates required fields', async ({ page }) => {
    // Try to submit empty form
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show validation errors
    await expect(page.locator('text=/required|must be/i').first()).toBeVisible({ timeout: 5000 });
  });

  test('validates email format', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('textarea[name="message"]', 'This is a test message that is long enough.');

    // Blur the email field to trigger validation
    await page.locator('input[name="email"]').blur();

    // Should show email validation error
    await expect(page.locator('text=/valid email/i')).toBeVisible({ timeout: 5000 });
  });

  test('validates message length', async ({ page }) => {
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'Short');

    // Blur the message field to trigger validation
    await page.locator('textarea[name="message"]').blur();

    // Should show message length error
    await expect(page.locator('text=/at least/i')).toBeVisible({ timeout: 5000 });
  });
});
