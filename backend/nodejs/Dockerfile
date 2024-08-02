FROM node:21.7.3-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "dev"]

EXPOSE 5001