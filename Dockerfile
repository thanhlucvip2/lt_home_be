FROM node:20
WORKDIR /app/server

COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . /app/server
RUN yarn run build
EXPOSE 3000
# CMD ["yarn", "start"]




