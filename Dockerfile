FROM node:lts
WORKDIR /home/node
USER node
COPY . .
RUN npm i
RUN npm run build:ssr

FROM node:lts-slim
WORKDIR /home/node
COPY --from=0 /home/node/dist ./dist
EXPOSE 4000
USER node
ENV NODE_ENV=production
CMD [ "node", "dist/drk-angular/server.js" ]