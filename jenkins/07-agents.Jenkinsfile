// J7: where the build runs
pipeline {
    agent { label 'playwright' }
    stages {
        stage('Agent info') {
            steps {
                echo "Running on ${env.NODE_NAME}"
                sh 'node --version'
                sh 'npx playwright --version'
            }
        }
    }
}
