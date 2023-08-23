#build stage for a Node.js application
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#production stage
FROM steebchen/nginx-spa:stable as production-stage
COPY --from=build-stage /app/build /app
EXPOSE 80
CMD ["nginx"]