// Flaky-test report: counts, per test, how often it passed, failed, or passed only on retry.
// Usage: node cicd/flaky-report.js results.json
const report = require(require('path').resolve(process.argv[2]));
const rows = {};
const walk = (suite) => {
  for (const spec of suite.specs ?? []) {
    for (const t of spec.tests) {
      const r = (rows[spec.title] ??= { runs: 0, passed: 0, flaky: 0, failed: 0 });
      r.runs++;
      if (t.status === 'expected') r.passed++;
      else if (t.status === 'flaky') r.flaky++;
      else if (t.status === 'unexpected') r.failed++;
    }
  }
  (suite.suites ?? []).forEach(walk);
};
report.suites.forEach(walk);

console.log('Test                                Runs  Passed  Flaky  Failed  Flaky rate');
for (const [title, r] of Object.entries(rows)) {
  const rate = Math.round((100 * r.flaky) / r.runs) + '%';
  console.log(title.padEnd(36) + [r.runs, r.passed, r.flaky, r.failed].map((n) => String(n).padStart(4)).join('    ') + rate.padStart(10));
}
