// J8: Chromium and Firefox at the same time
pipeline {
    agent { label 'playwright' }
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Browsers') {
            parallel {
                stage('Chromium') {
                    environment { PORT = '3001' }
                    steps {
                        sh 'npx playwright test --project=chromium'
                    }
                }
                stage('Firefox') {
                    environment { PORT = '3002' }
                    steps {
                        sh 'npx playwright test --project=firefox'
                    }
                }
            }
        }
    }
}
