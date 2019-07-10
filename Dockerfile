#FROM node:10.15.0-alpine
#
#WORKDIR /home/app
#
#COPY package.json /home/app/
#COPY package-lock.json /home/app/
#
#ARG NODE_ENV=development
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /usr/src/app
#
#COPY package.json ./
#RUN npm install
#
#COPY . .
#
#CMD [ "npm", "run", "start:server" ]

FROM node:10.16.0-alpine
EXPOSE 3000

WORKDIR /home/app

COPY package.json /home/app/
COPY ./ package-lock.json* /home/app/

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

RUN npm i

COPY . /home/app

RUN npm run build

CMD npm run start:server