FROM node:18.16.0-alpine

WORKDIR /app/test

COPY package*.json ./

RUN npm i 

COPY . .

ENV PORT = 3005

EXPOSE 3005

CMD ["npm", "start"] or node dist/index.js