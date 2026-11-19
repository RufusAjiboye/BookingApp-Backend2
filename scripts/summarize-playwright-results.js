'use strict';

const fs = require('node:fs');

const reportPath = process.argv[2] || 'test-results/playwright-report.json';
const summaryPath = process.argv[3] || 'test-summary.md';

const reportExists = fs.existsSync(reportPath);
const report = reportExists
  ? JSON.parse(fs.readFileSync(reportPath, 'utf8'))
  : { suites: [] };
const counts = { total: 0, passed: 0, skipped: 0, failed: 0 };
const failures = [];

function visitSuite(suite, parentTitles = []) {
  const titles = suite.title ? [...parentTitles, suite.title] : parentTitles;

  for (const spec of suite.specs || []) {
    const scenarioTitles = spec.title ? [...titles, spec.title] : titles;

    for (const test of spec.tests || []) {
      counts.total += 1;
      const results = test.results || [];
      const lastResult = results[results.length - 1];

      if (
        test.expectedStatus === 'skipped'
        || test.status === 'skipped'
        || lastResult?.status === 'skipped'
      ) {
        counts.skipped += 1;
      } else if (
        test.status === 'expected'
        || test.status === 'flaky'
        || lastResult?.status === 'passed'
      ) {
        counts.passed += 1;
      } else {
        counts.failed += 1;
        const project = test.projectName ? ` [${test.projectName}]` : '';
        failures.push(`${scenarioTitles.join(' > ')}${project}`);
      }
    }
  }

  for (const childSuite of suite.suites || []) {
    visitSuite(childSuite, titles);
  }
}

for (const suite of report.suites || []) {
  visitSuite(suite);
}

const lines = [
  '# Playwright test summary',
  '',
  `Environment: ${process.env.TARGET_ENV || 'not specified'}`,
  '',
  ...(!reportExists
    ? ['No Playwright report was produced; check the API test step.', '']
    : []),
  '| Outcome | Count |',
  '| --- | ---: |',
  `| Total | ${counts.total} |`,
  `| Passed | ${counts.passed} |`,
  `| Skipped | ${counts.skipped} |`,
  `| Failed | ${counts.failed} |`,
  '',
  '## Failing scenarios',
  '',
  ...(failures.length > 0
    ? failures.map((title) => `- ${title.replace(/[\r\n]/g, ' ')}`)
    : ['None']),
  '',
];
const summary = lines.join('\n');

fs.writeFileSync(summaryPath, summary);
process.stdout.write(summary);
