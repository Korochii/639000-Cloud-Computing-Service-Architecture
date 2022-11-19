As instructed in E3, I have only attached the .yaml files in the submission.

The full set of files can be found at: https://github.com/Korochii/639000-Cloud-Computing-Service-Architecture

It is designed to be run with either docker-compose, k3s or minikube.

For docker-compose:

1. `docker-compose up --build`

- Note: In order for the environment variables to work for frontend, the environment variables can either be
  specified during the docker build phase, or simply change/hard-code the respective host/ports in
  `/frontend/src/pages/Home.jsx` and ` /frontend/src/pages/Log.jsx`

For k3s:

1. `sudo systemctl restart k3s`
2. `k3s kubectl delete daemonsets,replicasets,services,deployments,pods,rc,ingress --all`
3. `k3s kubectl apply -f backend-deployment.yaml,backend-tcp-service.yaml,db-claim0-persistentvolumeclaim.yaml,db-deployment.yaml,db-tcp-service.yaml,frontend-deployment.yaml,frontend-tcp-service.yaml,minio-deployment.yaml,minio-tcp-service.yaml,network-backend-networkpolicy.yaml,network-frontend-networkpolicy.yaml`

For minikube:

1. `minikube start`
2. `kubectl delete daemonsets,replicasets,services,deployments,pods,rc,ingress --all`
3. `kubectl apply -f backend-deployment.yaml,backend-tcp-service.yaml,db-claim0-persistentvolumeclaim.yaml,db-deployment.yaml,db-tcp-service.yaml,frontend-deployment.yaml,frontend-tcp-service.yaml,minio-deployment.yaml,minio-tcp-service.yaml,network-backend-networkpolicy.yaml,network-frontend-networkpolicy.yaml`
4. `minikube tunnel`
