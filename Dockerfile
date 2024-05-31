FROM node:18
WORKDIR /app/server

ENV NODE_ENV=development
ENV PORT=3000

# ENV PATH /app/server/node_modules/.bin:$PATH

ENV API_PREFIX_PATH=/api/v1
ENV DB_NAME=lt_home
ENV DB_HOST=127.0.0.1
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASSWORD=300420
ENV DB_LOGGING=true
ENV CIPHER_MODE=aes-256-cbc
ENV CIPHER_KEY=J9hJncoAQYmFMZtZciB4IETl0aSLMTk3
ENV CIPHER_IV=Xck7Htiav6uHTlck
ENV JWT_SECRET_KEY=1RaAnHSZ2cepYwDwiqawPu47JHkHymKB
ENV JWT_EXPIRED_TIME_TOKEN=1d
ENV CORS_ORIGIN="*,http://localhost:3000"

COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . /app/server
RUN yarn run build
EXPOSE 3000
CMD ["yarn", "start"]