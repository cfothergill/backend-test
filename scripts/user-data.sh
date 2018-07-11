#!/bin/sh

set -e

# Install packages...

apt-get update
apt-get install -y docker.io awscli

# Run mysql

docker run -d \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=main \
  --name mysql \
  mysql:5.7

# Run app

$(aws ecr get-login --region eu-west-2)
accountId=$(aws sts get-caller-identity --output text --query 'Account')
image="${accountId}.dkr.ecr.eu-west-2.amazonaws.com/cf-backend-test"

docker run -d \
  -e DB_DRIVER=mysql \
  -e DB_HOST=mysql \
  -e DB_NAME=main \
  -e DB_PORT=3306 \
  -e DB_USERNAME=root \
  -e DB_PASSWORD=secret \
  -p 80:3000 \
  --link mysql:mysql \
  --name app \
  ${image}:latest
