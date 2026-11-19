// J3: start builds on a push, on a schedule, or after another job
pipeline {
    agent { label 'playwright' }
    triggers {
        pollSCM('H/5 * * * *')
        cron('H 2 * * 1-5')
        upstream(upstreamProjects: 'deploy-staging',
                 threshold: hudson.model.Result.SUCCESS)
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npx playwright test --project=chromium'
            }
        }
    }
}
