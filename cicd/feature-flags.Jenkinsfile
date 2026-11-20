// C8: test both states of a feature flag
pipeline {
    agent { label 'playwright' }
    stages {
        stage('Install') {
            steps { sh 'npm ci' }
        }
        stage('Flag states') {
            parallel {
                stage('Flag off') {
                    environment { FEATURE_REMEMBER_ME = 'off'; PORT = '3021' }
                    steps { sh 'npx playwright test --project=flags' }
                }
                stage('Flag on') {
                    environment { FEATURE_REMEMBER_ME = 'on'; PORT = '3022' }
                    steps { sh 'npx playwright test --project=flags' }
                }
            }
        }
    }
}
