FROM node:18-alpine3.17

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --quiet
RUN npm install -g nodemon

COPY . .