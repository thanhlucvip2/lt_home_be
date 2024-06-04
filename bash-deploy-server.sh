#!/bin/bash
#deploy
# Variables - change these as needed
SERVER_USER="your_username"
SERVER_IP="your_server_ip"
PROJECT_NAME="nestjs_project"
REMOTE_DIR="/home/$SERVER_USER/$PROJECT_NAME"
LOCAL_DIR=$(pwd)
DOCKER_COMPOSE_FILE="docker-compose.yml"

# Step 1: Package the project
echo "Packaging the project..."
tar -czf $PROJECT_NAME.tar.gz -C $LOCAL_DIR .

# Step 2: Copy files to the server
echo "Copying files to the server..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_DIR"
scp $PROJECT_NAME.tar.gz $SERVER_USER@$SERVER_IP:$REMOTE_DIR

# Step 3: Extract files on the server
echo "Extracting files on the server..."
ssh $SERVER_USER@$SERVER_IP "cd $REMOTE_DIR && tar -xzf $PROJECT_NAME.tar.gz && rm $PROJECT_NAME.tar.gz"

# Step 4: Build and run Docker containers on the server
echo "Building and running Docker containers on the server..."
ssh $SERVER_USER@$SERVER_IP << EOF
cd $REMOTE_DIR
docker-compose down
docker-compose build
docker-compose up -d
EOF

# Clean up local package file
rm $PROJECT_NAME.tar.gz

echo "Deployment completed successfully!"
