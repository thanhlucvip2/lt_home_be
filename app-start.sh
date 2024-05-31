#!/bin/bash
docker run --name mysql_container -e MYSQL_ROOT_PASSWORD=300420 -e MYSQL_DATABASE=lt_home -p 3306:3306 -v mysql_data:/var/lib/mysql -d mysql:latest

docker build -f Dockerfile.app-start -t xypass-external-dev .
docker run --env-file ./server/.env --network="xypass_network" -d -p5000:5000 xypass-external-dev
