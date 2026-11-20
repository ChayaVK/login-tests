# login-tests

A small Playwright + TypeScript project (a demo login page and three tests) used to show GitHub Actions workflows for the QAMadeEasy interview series.

- `npm ci` then `npx playwright test` runs the tests locally (the demo site starts by itself).
- `.github/workflows/` has one workflow per topic. Some jobs fail on purpose (06 and 11) to show how failures are handled.

Workflows 01–11 match the episodes of Module 2.

## Jenkins (Module 3)

`jenkins/` has one Jenkinsfile per topic of the Jenkins episodes, and `jenkins/shared-lib/` is the shared library used in episode 10. The pipelines expect an agent with the label `playwright`, Node.js 22 and the Playwright browsers installed. Some builds fail or stop on purpose (06-unsafe, 07-windows, 09, 11) to show what Jenkins does in those cases.

Set `PORT` to run the demo site on a port other than 3000 (the parallel Jenkins stages use this).

`03-triggers` polls this repository every few minutes, so a push to `main` starts a new build of that job.

## CI/CD (Module 4)

`cicd/` has the pipelines for the CI/CD episodes:

- `pipeline.Jenkinsfile`: API tests, UI tests, package, deploy to staging, smoke checks, an approval, then production.
- `quality-gate.Jenkinsfile` and `quality-gate.js`: the PR suite, then a gate that stops the build when tests fail or are flaky.
- `flaky.Jenkinsfile` and `flaky-trend.Jenkinsfile`: quarantined tests (tag `@quarantine`) and a flaky-rate report.
- `fast.Jenkinsfile`: 1 vs 2 workers, and `--only-changed`.
- `release.Jenkinsfile`: deploy to production with a rollback when the smoke tests fail.
- `feature-flags.Jenkinsfile`: tests for both states of the `FEATURE_REMEMBER_ME` flag.

The demo site has a small API (`/api/health`, `/api/login`, `/api/users`). "Staging" and "production" are two copies of the site on the agent, on ports 4001 and 4002. Set `BASE_URL` to run the tests against one of them.
