pipeline {
    agent {
        node(label: 'thebrain')
    }
    stages {
        stage('build image') {
            steps {
                bash """
                docker build -t actuality-api:jenkins-build .
                """
            }
        }
        stage('run image') {
            steps {
                bash """
                docker run --rm actuality-api:jenkins-build 
                """
            }
        }
    }
}