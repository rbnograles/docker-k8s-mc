# Development Stage
FROM node:22-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]

# Production Stage
FROM node:22-alpine as prod-dependencies
WORKDIR /app
COPY package*.json .
RUN npm ci --only=production

FROM gcr.io/distroless/nodejs22
WORKDIR /app
COPY --from=prod-dependencies /app/node_modules node_modules
COPY src src
CMD ["src/server.js"]