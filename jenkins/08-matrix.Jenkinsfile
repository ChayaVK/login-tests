// J8: one stage definition, run once for every browser
pipeline {
    agent none
    stages {
        stage('Tests') {
            matrix {
                agent { label 'playwright' }
                axes {
                    axis {
                        name 'BROWSER'
                        values 'chromium', 'firefox'
                    }
                }
                environment {
                    PORT = "${BROWSER == 'chromium' ? '3001' : '3002'}"
                }
                stages {
                    stage('Run') {
                        steps {
                            sh 'npm ci'
                            sh 'npx playwright test --project=$BROWSER'
                        }
                    }
                }
            }
        }
    }
}
