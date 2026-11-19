// J1, J2: a simple test pipeline
pipeline {
    agent { label 'playwright' }
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npx playwright test --project=chromium'
            }
        }
    }
}
