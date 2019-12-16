FROM node:12

# Add Tini
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

EXPOSE 8080

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

ENV NODE_ENV=production

COPY ./*.js ./

USER node

CMD ["node", "./app.js"]
