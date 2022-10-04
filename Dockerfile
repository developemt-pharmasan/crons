FROM node:16-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --quiet
RUN npm install -g nodemon

COPY . .