// Quality gate: reads the Playwright JSON report and decides if the build may go on.
// Usage: node cicd/quality-gate.js results.json
const report = require(require('path').resolve(process.argv[2]));
const { expected, unexpected, flaky } = report.stats;
const maxFlaky = Number(process.env.MAX_FLAKY ?? 0);

console.log(`Quality gate: ${expected} passed, ${unexpected} failed, ${flaky} flaky (allowed flaky: ${maxFlaky})`);
if (unexpected > 0 || flaky > maxFlaky) {
  console.log('Quality gate FAILED');
  process.exit(1);
}
console.log('Quality gate passed');
