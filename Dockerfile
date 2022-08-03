FROM node:16-alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install @angular/cli@13 & npm install

COPY . .

RUN  npm run build -- --aot

FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist/weather_app .

CMD ["nginx", "-g", "daemon off;"]

