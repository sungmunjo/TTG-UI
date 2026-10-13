// TTG-UI 배포 파이프라인
// docker-compose.yml 과 nginx 설정은 TTG-service 저장소의 deploy/ 에서 관리한다
// main 에 push → GitHub webhook → 이미지 빌드 → ECR push → 서비스 서버에서 docker compose 로 교체
//
// Jenkins 쪽 준비물 (자세한 순서는 PR 설명/가이드 참고)
//  - Jenkins 서버에 docker, aws cli 설치 + ECR push 권한이 있는 IAM Role 연결
//  - 플러그인: Pipeline, Git, GitHub, SSH Agent
//  - Credentials: app-server-ssh (서비스 서버 접속용 SSH 키, 사용자 ubuntu)
//  - Manage Jenkins > System > Global properties 의 환경변수: AWS_REGION, ECR_REGISTRY, APP_HOST
pipeline {
    agent any

    triggers {
        githubPush()
    }

    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    environment {
        IMAGE = "${env.ECR_REGISTRY}/ttg-ui"
        DEPLOY_DIR = '/opt/ttg'
    }

    stages {
        stage('Build image') {
            steps {
                script {
                    env.TAG = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                }
                sh 'docker build -t $IMAGE:$TAG -t $IMAGE:latest ttg-project'
            }
        }

        stage('Push to ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region $AWS_REGION \
                      | docker login --username AWS --password-stdin $ECR_REGISTRY
                    docker push $IMAGE:$TAG
                    docker push $IMAGE:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sshagent(credentials: ['app-server-ssh']) {
                    sh '''
                        SSH="ssh -o StrictHostKeyChecking=accept-new ubuntu@$APP_HOST"
                        # 첫 배포: compose 파일은 TTG-service 파이프라인이 올려준다. 아직 없으면 이미지만 올리고 끝낸다.
                        if ! $SSH "test -f $DEPLOY_DIR/docker-compose.yml"; then
                            echo "docker-compose.yml 이 아직 없음: TTG-service 를 한 번 배포하면 이 UI 이미지(latest)도 함께 뜬다"
                            exit 0
                        fi
                        $SSH "cd $DEPLOY_DIR \
                          && sed -i 's/^UI_TAG=.*/UI_TAG=$TAG/' .env \
                          && aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY \
                          && docker compose pull ui \
                          && docker compose up -d ui \
                          && docker image prune -f"
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker image prune -f || true'
        }
    }
}
