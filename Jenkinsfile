// pipeline {
//     agent {
//         node(label: 'thebrain')
//     }
//     stages {
//         stage('build image') {
//             steps {
//                 def actuality = docker.build 'actuality-api:jenkins-build'
//             }
//         }
//         stage('run image') {
//             steps {
                
//                 docker run --rm actuality-api:jenkins-build 
            
//             }
//         }
//     }
// }

pipeline {
  agent {
        node(label: 'thebrain')
  }
  environment {
    dockerimagename = "actuality-app"
    dockerImage = ""
  }
  stages {
    stage('Checkout Source') {
      steps {
        git 'https://github.com/grafstyle/Actuality-API.git'
      }
    }
    stage('Build image') {
      steps{
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }
    // stage('Pushing Image') {
    //   environment {
    //       registryCredential = 'dockerhub-credentials'
    //        }
    //   steps{
    //     script {
    //       docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
    //         dockerImage.push("latest")
    //       }
    //     }
    //   }
    // }
    stage('Deploying React.js container to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "deployment.yaml", 
                                         "service.yaml")
        }
      }
    }
  }
}