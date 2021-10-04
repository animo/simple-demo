FROM node:12.18.3

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]