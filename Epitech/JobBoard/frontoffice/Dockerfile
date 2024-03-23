FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY ./ ./

RUN npm install

RUN npm install -g http-server

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]