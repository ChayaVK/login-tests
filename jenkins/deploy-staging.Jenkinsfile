// J3: the deploy job that the test job waits for
pipeline {
    agent { label 'linux' }
    stages {
        stage('Deploy') {
            steps {
                echo 'Deploying the app to staging...'
            }
        }
    }
}
