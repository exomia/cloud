FROM node:10 as builder

ENV NODE_ENV production

RUN mkdir -p /home/node/exomia-cloud
WORKDIR /home/node/exomia-cloud

COPY package.json /home/node/exomia-cloud
RUN yarn --production=false

COPY . /home/node/exomia-cloud

RUN yarn ssr:build && \
  yarn --production && \
  yarn cache clean && \
  rm -rf /home/node/exomia-cloud/src && \
  rm -rf /home/node/exomia-cloud/public

FROM node:10-alpine

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 8080

COPY --from=builder /home/node/exomia-cloud /home/node/exomia-cloud

RUN chown -R node:node /home/node/exomia-cloud

USER node
WORKDIR /home/node/exomia-cloud

CMD ["./node_modules/@uvue/server/start.js"]
