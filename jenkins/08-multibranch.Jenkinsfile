// J8: one job per branch. Main also runs the full suite.
pipeline {
    agent { label 'playwright' }
    options {
        skipDefaultCheckout()
    }
    stages {
        stage('Checkout') {
            steps {
                cleanWs()
                checkout scm
            }
        }
        stage('Smoke') {
            steps {
                sh 'npm ci'
                sh 'npx playwright test --project=chromium --grep @smoke'
            }
        }
        stage('Full suite') {
            when { branch 'main' }
            steps {
                sh 'npx playwright test --project=chromium'
            }
        }
    }
}
