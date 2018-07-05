FROM mhart/alpine-node:9

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --prod

COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]
