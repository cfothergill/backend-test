#!/bin/sh

instances=$(aws ec2 describe-instances --region eu-west-2 --output json --filters "Name=tag:Name,Values=cf-backend-test" "Name=instance-state-name,Values=running")
instanceId=$(echo ${instances} | jq -r .Reservations[0].Instances[0].InstanceId)

echo "Deleting instance..."
aws ec2 terminate-instances --region eu-west-2 --instance-ids ${instanceId} > /dev/null 2>&1
aws ec2 wait instance-terminated --region eu-west-2 --instance-ids ${instanceId}

echo "Deleting instance profile..."
aws iam remove-role-from-instance-profile --region eu-west-2 --instance-profile-name cf-backend-test --role-name cf-backend-test > /dev/null 2>&1
aws iam delete-instance-profile --region eu-west-2 --instance-profile-name cf-backend-test > /dev/null 2>&1

echo "Deleting IAM role..."
aws iam delete-role-policy --region eu-west-2 --output json --role-name cf-backend-test --policy-name ECR-Permissions > /dev/null 2>&1
aws iam delete-role --region eu-west-2 --output json --role-name cf-backend-test > /dev/null 2>&1

echo "Deleting security group..."
aws ec2 delete-security-group --region eu-west-2 --group-name cf-backend-test > /dev/null 2>&1

echo "Deleting key pair..."
aws ec2 delete-key-pair --region eu-west-2 --key-name cf-backend-test > /dev/null 2>&1

echo "Deleting repository..."
aws ecr delete-repository --region eu-west-2 --repository-name cf-backend-test --force > /dev/null 2>&1

echo "Finished!"
