FROM node:16.19.0

WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .

EXPOSE 9999
CMD npm run start




