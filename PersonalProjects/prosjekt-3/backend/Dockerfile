FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN  npm run build

COPY .env dist/.env

WORKDIR /app/dist

EXPOSE 9000

CMD [ "node", "server.js" ]