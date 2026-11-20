// C1-C2: one pipeline from commit to production
pipeline {
    agent { label 'playwright' }
    stages {
        stage('Install') {
            steps { sh 'npm ci' }
        }
        stage('API tests') {
            steps { sh 'npx playwright test --project=api' }
        }
        stage('UI tests') {
            steps { sh 'npx playwright test --project=chromium' }
        }
        stage('Package') {
            steps {
                sh 'cicd/package.sh'
                archiveArtifacts artifacts: 'dist/*.tgz'
            }
        }
        stage('Deploy to staging') {
            steps { sh 'cicd/deploy.sh staging dist/*.tgz' }
        }
        stage('Smoke on staging') {
            steps { sh 'cicd/smoke.sh staging' }
        }
        stage('Approve') {
            steps { input message: 'Deploy to production?' }
        }
        stage('Deploy to production') {
            steps { sh 'cicd/deploy.sh production dist/*.tgz' }
        }
        stage('Smoke on production') {
            steps { sh 'cicd/smoke.sh production' }
        }
    }
}
