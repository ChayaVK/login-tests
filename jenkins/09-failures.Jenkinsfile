// J9: retry and timeout
pipeline {
    agent { label 'playwright' }
    options {
        timeout(time: 30, unit: 'MINUTES')
    }
    stages {
        stage('Wait for app') {
            steps {
                retry(3) {
                    sh 'test -f .app-ready || { touch .app-ready; echo "App not ready yet"; exit 1; }'
                }
            }
        }
        stage('Hung step') {
            steps {
                timeout(time: 20, unit: 'SECONDS') {
                    sh 'echo "Waiting for a report upload..."; sleep 300'
                }
            }
        }
    }
    post {
        always {
            sh 'rm -f .app-ready'
        }
    }
}
