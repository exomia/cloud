FROM node:10 as builder

ENV NODE_ENV production

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json /home/node/app
RUN yarn --production=false

COPY . /home/node/app

RUN yarn ssr:build && \
  yarn --production && \
  yarn add core-js regenerator-runtime && \
  yarn cache clean

#######################################################
FROM node:10-alpine

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 8080

COPY --from=builder /home/node/app /home/node/app

RUN chown -R node:node /home/node/app

USER node
WORKDIR /home/node/app

CMD ["./node_modules/@vueneue/ssr-server/docker"]
