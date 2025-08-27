pipeline{
    agent{
      docker {
            image 'mcr.microsoft.com/playwright:v1.54.2-noble'
            args '--ipc=host' 
        }
    }
      stages{
       stage('Install ') {
            steps {
                sh 'npm ci'
            }
        }
    
       stage('Run Playwright Tests') {
         steps {
            sh 'npx playwright test --reporter=junit --output=results.xml'
         }
      }

      stage('Publish JUnit Report') {
         steps {
            junit 'playwright-report/results.xml'
         }
      }
        
      
        }
        post {
         always {

             archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
         }
     }

}