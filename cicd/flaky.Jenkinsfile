// C5: the main suite skips quarantined tests; a separate stage still runs them, without blocking
pipeline {
    agent { label 'playwright' }
    stages {
        stage('Main suite') {
            steps {
                sh 'npm ci'
                sh 'npx playwright test --project=chromium'
            }
        }
        stage('Quarantine') {
            environment { RUN_QUARANTINE = '1' }
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'UNSTABLE') {
                    sh 'npx playwright test --project=chromium --grep @quarantine'
                }
            }
        }
    }
}
