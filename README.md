# login-tests

A small Playwright + TypeScript project (a demo login page and three tests) used to show GitHub Actions workflows for the QAMadeEasy interview series.

- `npm ci` then `npx playwright test` runs the tests locally (the demo site starts by itself).
- `.github/workflows/` has one workflow per topic. Some jobs fail on purpose (06 and 11) to show how failures are handled.

Workflows 01–11 match the episodes of Module 2.
