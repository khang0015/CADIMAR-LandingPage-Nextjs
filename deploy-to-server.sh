#!/bin/bash

# CADIMAR Production Deployment Script
# Usage: ./deploy-to-server.sh user@server-ip

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SERVER=$1
APP_DIR="/home/$(echo $SERVER | cut -d'@' -f1)/cadimar"

if [ -z "$SERVER" ]; then
    echo -e "${RED}Error: Please provide server address${NC}"
    echo "Usage: $0 user@server-ip"
    exit 1
fi

echo -e "${GREEN}🚀 Starting CADIMAR deployment to $SERVER${NC}"

# Step 1: Upload Docker image
echo -e "${YELLOW}📦 Uploading Docker image...${NC}"
if [ ! -f "cadimar-app.tar.gz" ]; then
    echo -e "${RED}Error: cadimar-app.tar.gz not found. Please run 'docker save cadimar-landing-page:latest | gzip > cadimar-app.tar.gz' first${NC}"
    exit 1
fi

scp cadimar-app.tar.gz $SERVER:~/

# Step 2: Upload docker-compose file
echo -e "${YELLOW}📋 Uploading docker-compose configuration...${NC}"
scp docker-compose.prod.yml $SERVER:~/docker-compose.yml

# Step 3: Connect to server and deploy
echo -e "${YELLOW}🔗 Connecting to server and deploying...${NC}"
ssh $SERVER << 'ENDSSH'
set -e

echo "🏗️  Setting up application directory..."
mkdir -p ~/cadimar
cd ~/cadimar

echo "📦 Loading Docker image..."
if [ -f ~/cadimar-app.tar.gz ]; then
    gunzip -c ~/cadimar-app.tar.gz | docker load
    echo "✅ Docker image loaded successfully"
else
    echo "❌ Docker image file not found"
    exit 1
fi

echo "📋 Setting up docker-compose..."
if [ -f ~/docker-compose.yml ]; then
    mv ~/docker-compose.yml ./
    echo "✅ Docker-compose file ready"
else
    echo "❌ Docker-compose file not found"
    exit 1
fi

echo "🛑 Stopping existing containers..."
docker compose down 2>/dev/null || true

echo "🚀 Starting new deployment..."
docker compose up -d

echo "⏳ Waiting for application to start..."
sleep 10

echo "🔍 Checking application health..."
if curl -f http://localhost:3000/api/languages > /dev/null 2>&1; then
    echo "✅ Application is running successfully!"
    echo "🌐 Website should be available at: http://cadimar.net"
else
    echo "❌ Application health check failed"
    echo "📋 Container logs:"
    docker compose logs --tail=20
    exit 1
fi

echo "🧹 Cleaning up..."
rm -f ~/cadimar-app.tar.gz

echo "✅ Deployment completed successfully!"
echo "📊 Container status:"
docker compose ps

ENDSSH

echo -e "${GREEN}🎉 Deployment completed!${NC}"
echo -e "${GREEN}🌐 Your website should be available at: http://cadimar.net${NC}"
echo -e "${YELLOW}📝 To check logs: ssh $SERVER 'cd ~/cadimar && docker-compose logs'${NC}"
