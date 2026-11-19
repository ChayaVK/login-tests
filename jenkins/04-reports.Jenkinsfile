// J4: publish JUnit results and keep failure evidence
pipeline {
    agent { label 'playwright' }
    environment {
        PLAYWRIGHT_JUNIT_OUTPUT_NAME = 'results.xml'
        TEST_PASSWORD = credentials('login-password')
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npx playwright test --project=chromium --reporter=list,junit || true'
            }
        }
    }
    post {
        always {
            junit 'results.xml'
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }
    }
}
