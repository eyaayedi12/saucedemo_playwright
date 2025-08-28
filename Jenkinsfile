pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.54.2-noble'
            args '--ipc=host'
        }
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=junit --output=test-results'
            }
        }

        stage('Publish JUnit Report') {
            steps {
                junit 'playwright-report/results.xml'
            }
        }
        stage('Run Playwright Tests pour generer l allure ') {
            steps {
                sh 'npx playwright test --reporter=allure-playwright'
            }
        }

        // stage('Publish Allure Report') {
        //     steps {
        //         allure(
        //             includeProperties: false,
        //             jdk: '',
        //             results: [[path: 'allure-results']]
        //         )
        //     }
        // }
    }

    post {
        always {
            //archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            allure([
                includeProperties: false,
                jdk: '',
                results: [[path: 'allure-report']]
            ])
        }
    }
}