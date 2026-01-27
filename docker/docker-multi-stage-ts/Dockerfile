# Build Stage for Node.js application
# Pulls a lightweight Node.js image, installs dependencies
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY src src
COPY tsconfig.json tsconfig.json

RUN npm run build

# Dependencies Stage to install only production dependencies
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Production Stage using Distroless Node.js image
# Copies only necessary files from the build stage
FROM gcr.io/distroless/nodejs22
WORKDIR /app
COPY --from=deps /app/node_modules node_modules
COPY --from=build /app/dist dist

ENV PORT=3000

CMD [ "dist/server.js" ]              