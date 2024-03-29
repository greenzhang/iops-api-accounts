FROM node:4.2

MAINTAINER Tyler Garlick <tjgarlick@gmail.com>

COPY . /src

WORKDIR /src

RUN npm install

EXPOSE 4000

CMD ["node", "index.js"]
