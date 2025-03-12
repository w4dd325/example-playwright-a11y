import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

test('Check accessibility violations (WCAG 2.2 AA)', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  const results = await new AxeBuilder({ page })
  .withTags(['wcag22aa']) // Run only WCAG 2.2 AA rules
  .analyze();

  console.log(results);

  expect(results.violations).toEqual([]);
});
