#!/usr/bin/env bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Creating repository..."
repository=$(aws ecr create-repository --region eu-west-2 --output json --repository-name cf-backend-test)
imageName=$(echo ${repository} | jq -r .repository.repositoryUri)

$(aws ecr get-login --region eu-west-2 --no-include-email)
docker build --no-cache -t ${imageName}:latest .
docker push ${imageName}:latest

echo "Creating key pair..."
aws ec2 create-key-pair --region eu-west-2 --key-name cf-backend-test  > /dev/null 2>&1

echo "Creating security group..."
securityGroup=$(aws ec2 create-security-group --region eu-west-2 --output json --group-name cf-backend-test --description cf-backend-test)
securityGroupId=$(echo ${securityGroup} | jq -r .GroupId)
aws ec2 authorize-security-group-ingress --region eu-west-2 --group-name cf-backend-test --protocol tcp --port 80 --cidr 0.0.0.0/0  > /dev/null 2>&1

echo "Creating IAM role..."
aws iam create-role --region eu-west-2 --role-name cf-backend-test --assume-role-policy-document file://${DIR}/ec2-role-trust-policy.json  > /dev/null 2>&1
aws iam put-role-policy --region eu-west-2 --role-name cf-backend-test --policy-name ECR-Permissions --policy-document file://${DIR}/ec2-role-access-policy.json  > /dev/null 2>&1

echo "Creating instance profile..."
instanceProfile=$(aws iam create-instance-profile --region eu-west-2 --instance-profile-name cf-backend-test)
aws iam add-role-to-instance-profile --region eu-west-2 --instance-profile-name cf-backend-test --role-name cf-backend-test
instanceProfileArn=$(echo ${instanceProfile} | jq -r .InstanceProfile.Arn)

sleep 10 # It can take a few seconds for the profile to become available

echo "Creating EC2 instance..."
instance=$(
  aws ec2 run-instances \
    --region eu-west-2 \
    --output json \
    --count 1 \
    --instance-type t2.small \
    --image-id ami-6b3fd60c \
    --key-name cf-backend-test \
    --security-group-ids ${securityGroupId} \
    --user-data file://${DIR}/user-data.sh \
    --iam-instance-profile Arn=${instanceProfileArn} \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=cf-backend-test}]'
)

echo "Finished!"
