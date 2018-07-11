# Backend Test

## Assumptions

- There are no user accounts, any `User-Id` header is valid.
- There are no courses, any `courseId` is valid. 
- `aws-cli`, `jq` & `docker` are installed
- Deployed into `eu-west-2`
- You have a default VPC

## Running

- `cp .env.example .env`
- `yarn`
- `docker-compose up`
- `open http://localhost:3000`

## Testing

- `yarn test` will run both unit and e2e tests.

## Deploying

- `./scripts/deploy.sh` will deploy the app to AWS. You must be signed in to the cli.
- Once the script is finished it will take a few minutes for the instance to boot and provision.
- Once finished testing run `./scripts/destroy.sh` to delete all the resources from AWS.
