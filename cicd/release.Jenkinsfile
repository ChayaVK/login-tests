// C8: deploy to production, check it, and roll back if the smoke tests fail
pipeline {
    agent { label 'playwright' }
    environment {
        APP_VERSION = "1.1.${BUILD_NUMBER}"
    }
    parameters {
        booleanParam(name: 'BREAK_RELEASE', defaultValue: false, description: 'Change the welcome text, to show a rollback')
    }
    stages {
        stage('Package') {
            steps {
                sh 'npm ci'
                sh 'if [ "$BREAK_RELEASE" = true ]; then sed -i "s/Welcome, /Hello, /" site/index.html; fi'
                sh 'cicd/package.sh'
            }
        }
        stage('Deploy to production') {
            steps { sh 'cicd/deploy.sh production dist/*.tgz' }
        }
        stage('Smoke on production') {
            steps { sh 'cicd/smoke.sh production' }
        }
    }
    post {
        failure {
            sh 'cicd/rollback.sh production'
            sh 'cicd/smoke.sh production'
        }
    }
}
