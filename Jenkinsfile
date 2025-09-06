pipeline {
    agent any

    environment {
        EC2_SSH_PRIVATE_KEY = credentials('admin') 
        EC2_HOST = '18.142.50.71'
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
                    // sshagent dùng private key Jenkins
                    sshagent(['admin']) {       
                        sh """
                        # Lấy public key từ private key
                        PUB_KEY=\$(ssh-keygen -y -f \$EC2_SSH_PRIVATE_KEY)

                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} 'bash -s' <<'ENDSSH'
                          mkdir -p ~/.ssh
                          chmod 700 ~/.ssh
                          # Thêm public key nếu chưa tồn tại
                          grep -qxF "\$PUB_KEY" ~/.ssh/authorized_keys || echo "\$PUB_KEY" >> ~/.ssh/authorized_keys
                          chmod 600 ~/.ssh/authorized_keys

                          # Deploy
                          mkdir -p ~/_work/tiktard/${REPO_DIR}
                          cd ~/_work/tiktard/${REPO_DIR}
                          if [ -d .git ]; then
                            git pull origin main
                          else
                            git clone git@github.com:Luo-Zhii/${REPO_DIR}.git .
                          fi
                          sudo docker compose up -d --build
ENDSSH
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
