# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

FROM node:20.15-alpine3.19

# Use production node environment by default.
ENV NODE_ENV development

WORKDIR /usr/app/server 

COPY package.json /usr/app/server/package.json
COPY package-lock.json /usr/app/server/package-lock.json

RUN npm ci

# Copy the rest of the source files into the image.
COPY . /usr/app/server 

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run development
