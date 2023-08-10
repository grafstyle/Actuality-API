FROM node:16-alpine3.11

RUN mkdir -p /api

WORKDIR  /api

COPY . .

RUN npm install --force

EXPOSE 3500


CMD [ "npm", "run", "serve" ]