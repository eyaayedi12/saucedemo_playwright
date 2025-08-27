pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.54.2-noble '
            args '--ipc=host'
        }
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests with JUnit and Allure reporters...'
                sh 'npx playwright test'
            }
        }

        stage('Publish JUnit Report') {
            steps {
                junit 'playwright-report/results.xml'
            }
        }

        stage('Publish Allure Report') {
            steps {
                allure(
                    includeProperties: false,
                    jdk: '',
                    results: [[path: 'allure-results']]
                )
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
        }
    }
}