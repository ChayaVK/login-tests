// J6: the unsafe way. Groovy puts the secret into the command text.
pipeline {
    agent { label 'playwright' }
    stages {
        stage('Login') {
            steps {
                withCredentials([string(credentialsId: 'login-password', variable: 'TEST_PASSWORD')]) {
                    sh "echo Password is ${TEST_PASSWORD}"
                }
            }
        }
    }
}
