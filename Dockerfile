FROM node:alpine as build

WORKDIR /tmp/app

COPY . /tmp/app

RUN npm ci
RUN npm run build

FROM nginx:alpine as run

WORKDIR /usr/share/nginx/html

COPY --from=build /tmp/app/dist /usr/share/nginx/html

EXPOSE 80 443