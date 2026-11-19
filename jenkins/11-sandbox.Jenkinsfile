// J11: the Groovy sandbox blocks unapproved code
pipeline {
    agent { label 'playwright' }
    stages {
        stage('Read a file') {
            steps {
                script {
                    def text = new File('/etc/hostname').text
                    echo text
                }
            }
        }
    }
}
