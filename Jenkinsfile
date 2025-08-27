pipeline{
    agent{
      docker {
            image 'mcr.microsoft.com/playwright:v1.55.0-noble'
            args '--entrypoint=' 
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