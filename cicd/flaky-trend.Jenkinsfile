// C7: run the quarantined test 20 times and report how often it is flaky
pipeline {
    agent { label 'playwright' }
    environment {
        RUN_QUARANTINE = '1'
        PLAYWRIGHT_JSON_OUTPUT_NAME = 'results.json'
    }
    stages {
        stage('Repeat') {
            steps {
                sh 'npm ci'
                sh 'npx playwright test --project=chromium --grep @quarantine --repeat-each=20 --reporter=dot,json || true'
            }
        }
        stage('Flaky report') {
            steps { sh 'node cicd/flaky-report.js results.json' }
        }
    }
}
