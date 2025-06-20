pipeline {
    agent {
        docker {
            image 'docker pull mcr.microsoft.com/playwright:v1.53.0-noble'
            args '--network qatw-primeira-edicao_skynet'
        }
    }

    stages {
        stage('Node.js Deps') {
            steps {
                sh 'npm install'
            }
        }
        stage('E2E Testes') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
