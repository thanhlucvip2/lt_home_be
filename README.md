# LT_HOME application

## Description

[Clone source LT_HOME](https://github.com/thanhlucvip2/lt_home_be.git) framework TypeScript starter repository.

# Setup on server

## Run the following command to automatically download the source and setup above

```console
$ git clone https://github.com/thanhlucvip2/lt_home_be.git
$ cd lt_home_be
$ sudo bash bash-setup-server.sh
```

# Setup local

# Installation app

## Use nvm

```bash
nvm install
nvm use
npm install -g yarn
yarn install
```

## or

## Use nodejs app

https://nodejs.org/en/download/package-manager
download and install node 20x

```bash
npm install -g yarn
yarn install
```

# 2. Setup env

## Create a copy of the file env.example then rename it to .env

### 1. Command create crypto

```bash
  yarn crypto:random-key
```

### 2. Copy the generated codes below to encrypt the password and update .env file</b>

```bash
CIPHER_KEY
CIPHER_IV
JWT_SECRET_KEY
JWT_EXPIRED_TIME_TOKEN
```

update env database

```bash
DB_NAME
DB_HOST
DB_PORT
DB_USER
DB_PASSWORD
```

### 3. Create table </b>

#### - run migration

```bash
 yarn migration:run
```

#### - revert migration

```bash
yarn migration:revert
```

# Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

# Running the app on docker

https://www.docker.com/ download and install docker, docker-compose

## update .env.prod file

```bash
$ yarn run dev:docker
```
