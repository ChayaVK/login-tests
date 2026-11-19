// J5: declarative stages, when, input and post
pipeline {
    agent { label 'playwright' }
    parameters {
        booleanParam(name: 'DEPLOY', defaultValue: false)
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Smoke') {
            steps {
                sh 'npx playwright test --project=chromium --grep @smoke'
            }
        }
        stage('Deploy to prod') {
            when {
                expression { params.DEPLOY }
            }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                echo 'Deploying...'
            }
        }
    }
    post {
        success { echo 'Smoke passed.' }
        failure { echo 'Something failed. Tell the team.' }
        always  { echo 'Pipeline finished.' }
    }
}
