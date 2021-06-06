node {
   def commit_id
   stage('Preparation') {
     checkout scm
     sh "git rev-parse --short HEAD > .git/commit-id"
     commit_id = readFile('.git/commit-id').trim()
   }
   stage('Test') {
     def myTestContainer = docker.image('node:14')
     myTestContainer.pull()
     myTestContainer.inside {
       sh "yarn install --only=dev"
       sh "yarn test"
     }
   }
   stage('Docker build/push') {
     docker.withRegistry('https://index.docker.io/v1/', 'dockerhub') {
       def app = docker.build("djunior90/docker-nodejs-demo:${commit_id}", '.').push()
     }
   }
}
