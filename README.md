# example-playwright-a11y
An example of using the Axe-Core NPM package with Playwright.

---

### Install Playwright
```npm init playwright@latest```
More info: https://playwright.dev/docs/intro#installing-playwright


### Install Axe-Core
```npm install @axe-core/playwright```
More info: https://www.npmjs.com/package/@axe-core/playwright

---

### Setup a basic script
Navigate to a page and trigger the axe-core a11y check.
Then assert to ensure there are no violations listed.

```TypeScript
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
```

---

### Rules
Available rules to test against.
| Tag         | Description                 |
|-------------|-----------------------------|
| 'wcag2a'    | Run only WCAG 2.0 A rules   |
| 'wcag2aa'   | Run only WCAG 2.0 AA rules  |
| 'wcag2aaa'  | Run only WCAG 2.0 AAA rules |
| 'wcag21a'   | Run only WCAG 2.1 A rules   |
| 'wcag21aa'  | Run only WCAG 2.1 AA rules  |
| 'wcag21aaa' | Run only WCAG 2.1 AAA rules |
| 'wcag22a'   | Run only WCAG 2.2 A rules   |
| 'wcag22aa'  | Run only WCAG 2.2 AA rules  |