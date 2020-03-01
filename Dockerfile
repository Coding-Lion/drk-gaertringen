FROM node
WORKDIR /usr/src/app
COPY ./dist .
EXPOSE 4000
USER node
CMD [ "node", "server.js" ]