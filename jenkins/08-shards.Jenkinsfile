// J8: split one suite into two shards on two executors
pipeline {
    agent none
    stages {
        stage('Shards') {
            parallel {
                stage('Shard 1') {
                    agent { label 'playwright' }
                    environment { PORT = '3011' }
                    steps {
                        sh 'npm ci'
                        sh 'npx playwright test --project=chromium --shard=1/2'
                    }
                }
                stage('Shard 2') {
                    agent { label 'playwright' }
                    environment { PORT = '3012' }
                    steps {
                        sh 'npm ci'
                        sh 'npx playwright test --project=chromium --shard=2/2'
                    }
                }
            }
        }
    }
}
