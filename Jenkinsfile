pipeline {
    agent {
        docker {
            //image 'mcr.microsoft.com/playwright:v1.52.0-noble'
            image 'rps1988/playwright-nj-v1.52.0-noble' //minha imagem rps1988/playwright-nj-v1.52.0-noble
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
                allure includeProperties: false, jdk: '', results: [[path: 'allure-results']] //tem que rodar com imagem rps1988/playwright-nj-v1.52.0-noble
            }
        }
    }
}
