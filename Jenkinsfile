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
    
        stage('run tests'){
            steps{
                sh 'npx playwright test'
            }
        }
        stage('JUnit Resultat')
        { steps{ 
            junit 'test-results/e2e-junit-results.xml' } 
        }

       
      
        }
    //     post {
    //     always {

    //         archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    //     }
    // }

}