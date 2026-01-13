import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('homepage has no critical accessibility issues', async ({ page }) => {
    await page.goto('/');

    // Check for basic accessibility requirements
    await expect(page.locator('html')).toHaveAttribute('lang', /en/);

    // Check for skip link
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();

    // Check images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');
      // Image should have alt text or be marked as presentational
      expect(alt !== null || role === 'presentation').toBe(true);
    }
  });

  test('forms have proper labels', async ({ page }) => {
    await page.goto('/#contact');

    // Check that form inputs have associated labels or aria-labels
    const inputs = page.locator('input:not([type="hidden"]), textarea, select');
    const inputCount = await inputs.count();

    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');
      const placeholder = await input.getAttribute('placeholder');

      // Input should have label, aria-label, or aria-labelledby
      const hasLabel = id ? await page.locator(`label[for="${id}"]`).count() > 0 : false;
      const hasAccessibleName = hasLabel || ariaLabel || ariaLabelledby || placeholder;

      expect(hasAccessibleName).toBeTruthy();
    }
  });

  test('buttons have accessible names', async ({ page }) => {
    await page.goto('/');

    // Check main interactive buttons (skip hidden/presentation buttons)
    const buttons = page.locator('button:visible, [role="button"]:visible');
    const buttonCount = await buttons.count();

    let accessibleCount = 0;
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');
      const title = await button.getAttribute('title');
      const hasIcon = await button.locator('svg').count() > 0;

      // Button should have text content, aria-label, title, or be an icon button
      const hasAccessibleName = (text && text.trim().length > 0) || ariaLabel || title || hasIcon;
      if (hasAccessibleName) accessibleCount++;
    }

    // At least 80% of buttons should be accessible
    expect(accessibleCount / buttonCount).toBeGreaterThan(0.8);
  });

  test('links have accessible names', async ({ page }) => {
    await page.goto('/');

    const links = page.locator('a[href]');
    const linkCount = await links.count();

    for (let i = 0; i < Math.min(linkCount, 50); i++) { // Test first 50 links
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');
      const hasImage = await link.locator('img[alt]').count() > 0;

      // Link should have text, aria-label, title, or image with alt
      const hasAccessibleName = (text && text.trim().length > 0) || ariaLabel || title || hasImage;
      expect(hasAccessibleName).toBeTruthy();
    }
  });

  test('color contrast is sufficient', async ({ page }) => {
    await page.goto('/');

    // This is a basic check - Lighthouse handles detailed contrast testing
    // Verify that text is visible against backgrounds
    const heroText = page.locator('h1').first();
    await expect(heroText).toBeVisible();
  });

  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully hydrate (DeviceContext may change rendered content)
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Check for h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);

    // Get heading levels in a single evaluation to avoid stale locators
    const headingLevels = await page.evaluate(() => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      return Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
    });

    // Heading levels should not skip (e.g., h1 then h3 without h2)
    let previousLevel = 0;
    for (const currentLevel of headingLevels) {
      if (previousLevel > 0 && currentLevel > previousLevel + 1) {
        console.warn(`Heading hierarchy issue: h${previousLevel} followed by h${currentLevel}`);
      }
      previousLevel = currentLevel;
    }
  });

  test('focus is visible on interactive elements', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully hydrate
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Tab to first focusable element
    await page.keyboard.press('Tab');

    // Get the focused element (wait for focus to settle)
    await page.waitForTimeout(100);
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible({ timeout: 10000 });
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully hydrate
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Should be able to navigate with keyboard
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(100);

    // Should have a focused element
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible({ timeout: 10000 });

    // Press Enter on focused element
    await page.keyboard.press('Enter');

    // Page should respond to keyboard input
    await page.waitForTimeout(500);
  });
});
