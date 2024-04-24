FROM node:19-bullseye

WORKDIR /code

COPY package.json ./
RUN npm i

COPY . .

CMD ["npm", "run", "dev"]