pipeline {
  agent any

  environment {
    DOCKER_CREDENTIALS_ID = 'cb8c2f47-f8b0-4331-aa28-2c6e9ac9d088'
    GIT_SSH_CREDENTIALS_ID = '068f6da2-eafc-4c90-a4f6-1f3ba3d27b38' // 👈 This is the SSH key ID you created in Jenkins
    ORDER_IMAGE = 'yasir1510/order-service'
    PRODUCT_IMAGE = 'yasir1510/product-service'
    KUBECONFIG = '/var/lib/jenkins/.kube/config'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main',
            credentialsId: "${GIT_SSH_CREDENTIALS_ID}",
            url: 'https://github.com/yasirali-p/ecommerce-microservice.git'
      }
    }

    stage('Build Docker Images') {
      steps {
        script {
          docker.build("${ORDER_IMAGE}:latest", 'service/order-service')
          docker.build("${PRODUCT_IMAGE}:latest", 'service/product-service')
        }
      }
    }

    stage('Push Docker Images') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: "${DOCKER_CREDENTIALS_ID}",
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          script {
            docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
              docker.image("${ORDER_IMAGE}:latest").push()
              docker.image("${PRODUCT_IMAGE}:latest").push()
            }
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl apply -f k8s/namespace.yml'
        sh 'kubectl apply -f k8s/order-deployment-blue.yml'
        sh 'kubectl apply -f k8s/product-deployment-blue.yml'
        sh 'kubectl apply -f k8s/order-service.yml'
        sh 'kubectl apply -f k8s/product-service.yml'
        sh 'kubectl apply -f k8s/ingress.yml'
        sh 'kubectl apply -f k8s/hpa-order.yml'
        sh 'kubectl apply -f k8s/hpa-product.yml'
        sh 'kubectl apply -f k8s/prometheus-configmap.yml'
        sh 'kubectl apply -f k8s/prometheus-deployment.yml'
        sh 'kubectl apply -f k8s/prometheus-service.yml'
        sh 'kubectl apply -f k8s/grafana-deployment.yml'
        sh 'kubectl apply -f k8s/grafana-service.yml'
      }
    }
  }
}
