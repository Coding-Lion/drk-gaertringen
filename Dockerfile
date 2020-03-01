FROM node:lts
WORKDIR /usr/src/app
USER node
COPY . .
RUN npm i


FROM node:lts-slim
WORKDIR /usr/src/app
COPY --from=0 /usr/src/app/dist .
EXPOSE 4000
USER node
CMD [ "node", "server.js" ]