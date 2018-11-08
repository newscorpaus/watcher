FROM mhart/alpine-node:8.12.0

RUN apk update && \
    apk upgrade && \
    apk add git

# Create app directory
RUN mkdir -p /srv/watcher
WORKDIR /srv/watcher

# Install app dependencies
COPY package.json /srv/watcher
COPY yarn.lock /srv/watcher

RUN yarn install

# Bundle app source
COPY . /srv/watcher

RUN yarn build-ts

EXPOSE 3000
CMD [ "yarn", "start" ]
