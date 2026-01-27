# Define a base image
FROM node:16-alpine

# Setup Work Directory
WORKDIR /app

# Issue installation for dependencies and copy files
COPY package.json /app
RUN npm install
COPY . . 

# Default Command
CMD [ "npm", "start" ]