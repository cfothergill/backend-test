FROM node:8

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . ./

CMD ["yarn", "start"]
