# Dockerfile for client (React)

FROM node:20.15-alpine3.19

ENV NODE_ENV development

# Working directory be app
WORKDIR /usr/app/client

COPY package.json /usr/app/client/package.json
COPY package-lock.json /usr/app/client/package-lock.json

RUN npm ci

COPY . /usr/app/client

EXPOSE 3001

CMD npm start