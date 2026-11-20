// C6: the same tests with 1 and 2 workers, then only the tests a commit changed
pipeline {
    agent { label 'playwright' }
    stages {
        stage('Install') {
            steps { sh 'npm ci' }
        }
        stage('1 worker') {
            steps { sh 'npx playwright test --project=chromium --project=firefox --workers=1' }
        }
        stage('2 workers') {
            steps { sh 'npx playwright test --project=chromium --project=firefox --workers=2' }
        }
        stage('Only changed tests') {
            steps { sh 'npx playwright test --only-changed=HEAD~1' }
        }
    }
}
