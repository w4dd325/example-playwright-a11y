import { test, expect } from '@playwright/test';
import { checkA11y } from '../utils/a11y';

test.describe('Accessibility checks', () => {
  test('Mars demo page should have no critical violations', async ({ page }) => {
    await page.goto('https://zero.aviva.co.uk/');
    await page.waitForSelector('body', { timeout: 5000 });
    await page.waitForTimeout(3000);

    const results = await checkA11y(page, 'a11y-reports/mars-report.html');

    // Optionally fail the test if there are violations
    expect(results.violations.length).toBe(0);
  });

  // Example: check another page
  test('Another page should have no critical violations', async ({ page }) => {
    await page.goto('https://zero.aviva.co.uk/accessibility-policy');
    await page.waitForSelector('body', { timeout: 5000 });
    await page.waitForTimeout(3000);

    const results = await checkA11y(page, 'a11y-reports/example-report.html');

    expect(results.violations.length).toBe(0);
  });
});
