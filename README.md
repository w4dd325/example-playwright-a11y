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

### Basic script
Navigate to a page 
Wait for the page elements to load.
Trigger the axe-core a11y check.
Then assert to ensure there are no violations listed.

Note: The assertion is there to make the test fail if any violations are found.

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

To ensure full covereage you should include all rule-sets 'upto' the one to want to validate against.

For example:
```.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])```

### Run the test
Assuming you have cloned the repo and run ```npm i``` to install all dependencies etc. you can trigger the test run using:

```npx playwright test```