// J5: the same smoke run as a scripted pipeline
node('playwright') {
    stage('Checkout') {
        checkout scm
    }
    stage('Smoke') {
        sh 'npm ci'
        sh 'npx playwright test --project=chromium --grep @smoke'
    }
}
