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

       
      
        }

}