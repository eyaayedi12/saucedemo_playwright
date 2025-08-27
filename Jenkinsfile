pipeline{
      docker {
            image 'mcr.microsoft.com/playwright:v1.47.0-jammy' 
            args '--ipc=host' 
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