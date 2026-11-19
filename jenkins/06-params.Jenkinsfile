// J6: parameters, environment variables and credentials
pipeline {
    agent { label 'playwright' }
    parameters {
        choice(name: 'BROWSER', choices: ['chromium', 'firefox'])
        choice(name: 'TEST_ENV', choices: ['qa', 'staging'])
    }
    environment {
        REPORT_NAME = "login-${params.TEST_ENV}-${env.BUILD_NUMBER}"
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                echo "Browser: ${params.BROWSER}, env: ${params.TEST_ENV}, report: ${env.REPORT_NAME}"
                withCredentials([string(credentialsId: 'login-password', variable: 'TEST_PASSWORD')]) {
                    sh 'echo "Password is $TEST_PASSWORD"'
                    sh 'npx playwright test --project=$BROWSER'
                }
            }
        }
    }
}
