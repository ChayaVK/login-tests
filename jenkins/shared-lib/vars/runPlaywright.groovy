// vars/runPlaywright.groovy: one test pipeline that every team calls
def call(Map config = [:]) {
    def browser = config.browser ?: 'chromium'
    def tag = config.tag ?: ''
    pipeline {
        agent { label 'playwright' }
        stages {
            stage('Install') {
                steps {
                    sh 'npm ci'
                }
            }
            stage('Test') {
                steps {
                    sh "npx playwright test --project=${browser} --grep '${tag}'"
                }
            }
        }
        post {
            always {
                echo "Finished ${browser} tests for ${env.JOB_NAME}"
            }
        }
    }
}
