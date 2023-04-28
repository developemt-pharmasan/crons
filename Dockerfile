FROM node:18-alpine3.17
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --quiet
RUN npm install -g nodemon
RUN apk add --no-cache tzdata
ENV TZ America/Bogota
COPY . .