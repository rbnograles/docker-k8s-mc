# Build Stage for Node.js application
# Pulls a lightweight Node.js image, installs dependencies
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Production Stage using Distroless Node.js image
# Copies only necessary files from the build stage
FROM gcr.io/distroless/nodejs22
WORKDIR /app
COPY --from=build /app/node_modules node_modules
COPY src src
ENV PORT=3000
CMD [ "src/server.js" ]              