// C3: the PR suite, then a quality gate that decides if the build may go on
pipeline {
    agent { label 'playwright' }
    environment {
        PLAYWRIGHT_JSON_OUTPUT_NAME = 'results.json'
        TEST_PASSWORD = credentials('login-password')
    }
    stages {
        stage('PR suite') {
            steps {
                sh 'npm ci'
                sh 'npx playwright test --project=api --project=chromium --reporter=list,json || true'
            }
        }
        stage('Quality gate') {
            steps { sh 'node cicd/quality-gate.js results.json' }
        }
    }
}
