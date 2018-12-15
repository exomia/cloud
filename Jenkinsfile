pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            dir 'vue'
            label 'Executing Dockerfile'
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