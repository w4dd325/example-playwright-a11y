import fs from 'fs';
import path from 'path';
import { Page } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

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

    const generateTableRows = (violations: any[]) => {
        return violations.map(v => `
            <tr>
                <td>${v.impact || 'N/A'}</td>
                <td>${v.id}</td>
                <td>${v.description}</td>
                <td>${v.help}</td>
                <td><a href="${v.helpUrl}" target="_blank">${v.helpUrl}</a></td>
                <td>${v.nodes.length}</td>
            </tr>
        `).join('\n');
    };

    const htmlReport = `
    <html>
      <head>
        <title>Accessibility Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          tr:nth-child(even) { background-color: #fafafa; }
        </style>
      </head>
      <body>
        <h1>Accessibility Report</h1>
        <h2>Total Violations: ${results.violations.length}</h2>
        <table>
          <thead>
            <tr>
              <th>Impact</th>
              <th>Rule</th>
              <th>Description</th>
              <th>Help</th>
              <th>Help URL</th>
              <th>Nodes</th>
            </tr>
          </thead>
          <tbody>
            ${generateTableRows(results.violations)}
          </tbody>
        </table>
      </body>
    </html>
  `;

    fs.writeFileSync(reportPath, htmlReport);

    return results;
}
