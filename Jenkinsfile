pipeline {
    agent any

    stages {
        stage('Running playwright tests') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.54.2-noble'
                    args '--ipc=host'
                }
            }
            stages{
                stage('install dependencies'){
                    steps{
                        sh 'npm ci'

                    }
                }
                stage('Run tests and generate reports '){
                    steps{
                        sh 'npx playwright test --reporter=junit,allure-playwright'

                    }
                }
                stage('stash allure report'){
                    steps{
                        stash name: 'allure-results', includes: 'allure-results/*'
                        stash name: 'playwright-report', includes: 'playwright-report/*'
                    }

                }
            }
        
        }

        
    }

    post {
        always {
            
            unstash 'allure-results'
            unstash 'playwright-report'
            junit 'playwright-report/results.xml'
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