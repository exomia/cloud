pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            dir 'vue'
        }
    }
    stages {
        stage('Test') {
            steps {
                sh 'node --version'
                sh 'svn --version'
            }
        }
    }
}