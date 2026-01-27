# build Stage
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Server the app with nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html