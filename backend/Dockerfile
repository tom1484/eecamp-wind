FROM node:16.7.0

WORKDIR /code

COPY ["package.json", "package-lock.json*", "./"]

RUN yarn install

COPY . .

CMD ["yarn", "start"]