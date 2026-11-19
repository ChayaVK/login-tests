// J7: where the build runs
pipeline {
    agent { label 'playwright' }
    stages {
        stage('Agent info') {
            steps {
                sh 'node --version'
                sh 'npx playwright --version'
            }
        }
    }
}
