import fs from 'fs';
import path from 'path';
import { Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { createHtmlReport } from 'axe-html-reporter';

export interface AxeResults {
    violations: any[];
    passes: any[];
    incomplete: any[];
}

export async function checkA11y(
    page: Page,
    reportPath: string = 'a11y-reports/a11y-report.html'
): Promise<AxeResults> {

    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'])
        .analyze();

    const folder = path.dirname(reportPath);
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    // axe-html-reporter
    createHtmlReport({
        results,
        options: {
            projectKey: 'ACCESSIBILITY',
            outputDir: folder,
            reportFileName: path.basename(reportPath),
        },
    });

    return results;
}
