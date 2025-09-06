pipeline {
    agent any

    environment {
        EC2_SSH_PRIVATE_KEY = credentials('jenkins') 
        EC2_HOST = '54.151.166.129'
        REPO_DIR = 'tiktk-ui'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    sshagent(['jenkins']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                          ls &&
                          pwd &&
                          cd ~/_work/tiktard/${REPO_DIR} &&
                          pwd &&
                          git pull origin main &&
                          sudo docker compose up -d --build
                        '
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed.'
        } 
    }
}
