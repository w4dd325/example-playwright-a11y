import { Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

export interface AxeResults {
    violations: any[];
    passes: any[];
    incomplete: any[];
}

export async function checkA11y(
    page: Page
): Promise<AxeResults> {

    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
        .analyze();

    return results;
}
