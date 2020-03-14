pipeline {
    agent any
    stages {
        stage ('Checkout') {
            steps {
                echo 'Pulling...' + env.GIT_BRANCH
                checkout scm
            }
        }
        stage('NPM Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build development branch') {
            when { equals expected: 'origin/development', actual: env.GIT_BRANCH  }
            steps {
                slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [development-build#${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                sh 'ng build -c dev'
            }
        }

        stage('Build production') {
            when { equals expected: 'origin/master', actual: env.GIT_BRANCH  }
            steps {
                slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [production-build#${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                sh 'ng build --prod'
            }
        }
        
        /*
        stage('Compress build dist') {
            steps {
                sh 'tar -cvzf angular-dev-dist.tar.gz --strip-components=1 dist'
                //archiveArtifacts 'dist.tar.gz'
            }
        }*/
        
        stage('Deploy development') {
            when { equals expected: 'origin/development', actual: env.GIT_BRANCH  }
            steps {
                sh 'tar -cvzf everywan-dev-dist.tar.gz --strip-components=1 dist/everywan-backoffice'
                withAWS(region:'eu-west-1',credentials:'everywan-dev-aws') {
                    s3Upload(file:'everywan-dev-dist.tar.gz', bucket:'everywan-app-dev', path:'dist-fe/')
                }
                sh 'curl https://everywan-dev.everyup.it/update/fe'
            }
        }
        /*
        stage('Deploy production') {
            // milestone()
            when { equals expected: 'origin/master', actual: env.GIT_BRANCH  }
            steps {
                
            }
        }*/
    }
    post {
        always {
            script {
                if ( currentBuild.currentResult == "SUCCESS" ) {
                    slackSend (color: '#00FF00', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
                else if( currentBuild.currentResult == "FAILURE" ) {
                    slackSend (color: 'danger', message: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                }
                else if( currentBuild.currentResult == "UNSTABLE" ) {
                    slackSend color: "warning", message: "Job: ${env.JOB_NAME} with buildnumber ${env.BUILD_NUMBER} was unstable"
                }
                else {
                    slackSend color: "danger", message: "Job: ${env.JOB_NAME} with buildnumber ${env.BUILD_NUMBER}  was unclear"
                }
            }
        }
    }
}

