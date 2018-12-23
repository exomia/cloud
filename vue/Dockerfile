FROM node:10 as builder

ENV NODE_ENV production

RUN mkdir -p /home/node/exomia-cloud
WORKDIR /home/node/exomia-cloud

COPY package.json /home/node/exomia-cloud
RUN npm run install:prod

COPY . /home/node/exomia-cloud

RUN npm run build

FROM node:10-alpine

ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 8000

COPY --from=builder /home/node/exomia-cloud /home/node/exomia-cloud

RUN chown -R node:node /home/node/exomia-cloud

USER node
WORKDIR /home/node/exomia-cloud

CMD ["./node_modules/@uvue/server/start.js"]
