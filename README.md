# login-tests

A small Playwright + TypeScript project (a demo login page and three tests) used to show GitHub Actions workflows for the QAMadeEasy interview series.

- `npm ci` then `npx playwright test` runs the tests locally (the demo site starts by itself).
- `.github/workflows/` has one workflow per topic. Some jobs fail on purpose (06 and 11) to show how failures are handled.

Workflows 01–11 match the episodes of Module 2.

## Jenkins (Module 3)

`jenkins/` has one Jenkinsfile per topic of the Jenkins episodes, and `jenkins/shared-lib/` is the shared library used in episode 10. The pipelines expect an agent with the label `playwright`, Node.js 22 and the Playwright browsers installed. Some builds fail or stop on purpose (06-unsafe, 07-windows, 09, 11) to show what Jenkins does in those cases.

Set `PORT` to run the demo site on a port other than 3000 (the parallel Jenkins stages use this).

`03-triggers` polls this repository every few minutes, so a push to `main` starts a new build of that job.
