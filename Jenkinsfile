pipeline {
    agent any

    stages {
        stage('Install') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.54.2-noble'
                    args '--ipc=host'
           // args '-v /var/jenkins_home/tools:/var/jenkins_home/tools --ipc=host'
                }
            }
            steps {
                sh 'npm ci'
                sh 'npx playwright test --reporter=junit,allure-playwright'
                stash name: 'allure-results', includes: 'allure-results/*'
            }
        }

        // stage('Run Playwright Tests') {
        //     steps {
        //         //sh 'npx playwright test --reporter=junit --output=test-results'
        //         sh 'npx playwright test --reporter=junit,allure-playwright'
        //     }
        // }

        stage('Publish JUnit Report') {
            steps {
                junit 'playwright-report/results.xml'
            }
        }
        // stage('Run Playwright Tests pour generer l allure ') {
        //     steps {
        //         sh 'npx allure generate allure-results --clean -o allure-report'
        //         //sh 'npx playwright test --reporter=allure-playwright'
        //     }
        // }
        //  stage('Run Playwright Tests pour generer l allure ') {
        //     steps {
        //         sh 'npx allure generate allure-results --clean -o allure-report || true'
        //         //sh 'npx playwright test --reporter=allure-playwright'
        //     }
        // }

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
            unstash 'allure-results'
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'allure-results']]
            ])
        }
    }
}