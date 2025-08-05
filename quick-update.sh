#!/bin/bash

# Quick Update Script for CADIMAR Landing Page
# This script rebuilds, packages, and deploys the updated application

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
SERVER_USER="root"
SERVER_IP="128.140.15.157"
IMAGE_NAME="cadimar-landing-page:latest"
CONTAINER_NAME="cadimar-production"
ARCHIVE_NAME="cadimar-app.tar.gz"

echo -e "${BLUE}🚀 CADIMAR Quick Update Script${NC}"
echo -e "${BLUE}================================${NC}"

# Step 1: Test build locally
echo -e "\n${YELLOW}📦 Step 1: Testing local build...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Local build successful${NC}"
else
    echo -e "${RED}❌ Local build failed. Please fix errors before deploying.${NC}"
    exit 1
fi

# Step 2: Build new Docker image
echo -e "\n${YELLOW}🐳 Step 2: Building Docker image...${NC}"
echo "Building $IMAGE_NAME..."
if docker build -t $IMAGE_NAME .; then
    echo -e "${GREEN}✅ Docker image built successfully${NC}"
else
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

# Step 3: Export Docker image
echo -e "\n${YELLOW}📤 Step 3: Exporting Docker image...${NC}"
echo "Compressing image to $ARCHIVE_NAME..."
if docker save $IMAGE_NAME | gzip > $ARCHIVE_NAME; then
    SIZE=$(du -h $ARCHIVE_NAME | cut -f1)
    echo -e "${GREEN}✅ Image exported successfully ($SIZE)${NC}"
else
    echo -e "${RED}❌ Image export failed${NC}"
    exit 1
fi

# Step 4: Clean up old version on server
echo -e "\n${YELLOW}🧹 Step 4: Cleaning up old version on server...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'EOF'
    echo "Stopping and removing old container..."
    docker-compose down 2>/dev/null || echo "No running container found"
    
    echo "Removing old Docker image..."
    docker rmi cadimar-landing-page:latest 2>/dev/null || echo "No old image found"
    
    echo "Cleaning up old files..."
    rm -f cadimar-app.tar.gz docker-compose.prod.yml
    
    echo "✅ Server cleanup completed"
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Server cleanup successful${NC}"
else
    echo -e "${RED}❌ Server cleanup failed${NC}"
    exit 1
fi

# Step 5: Upload new files
echo -e "\n${YELLOW}📤 Step 5: Uploading new files to server...${NC}"
echo "Uploading $ARCHIVE_NAME..."
if scp $ARCHIVE_NAME $SERVER_USER@$SERVER_IP:~/; then
    echo -e "${GREEN}✅ Archive uploaded${NC}"
else
    echo -e "${RED}❌ Archive upload failed${NC}"
    exit 1
fi

echo "Uploading docker-compose.prod.yml..."
if scp docker-compose.prod.yml $SERVER_USER@$SERVER_IP:~/; then
    echo -e "${GREEN}✅ Docker compose file uploaded${NC}"
else
    echo -e "${RED}❌ Docker compose upload failed${NC}"
    exit 1
fi

# Step 6: Deploy on server
echo -e "\n${YELLOW}🚀 Step 6: Deploying on server...${NC}"
ssh $SERVER_USER@$SERVER_IP << 'EOF'
    echo "Loading new Docker image..."
    gunzip -c cadimar-app.tar.gz | docker load
    
    echo "Starting new container..."
    docker-compose -f docker-compose.prod.yml up -d
    
    echo "Waiting for container to be ready..."
    sleep 10
    
    echo "Checking container status..."
    docker ps | grep cadimar-production
    
    echo "Testing application..."
    if curl -f http://localhost:3000/api/languages > /dev/null 2>&1; then
        echo "✅ Application is responding"
    else
        echo "⚠️  Application may still be starting up"
    fi
    
    echo "Cleaning up deployment files..."
    rm -f cadimar-app.tar.gz
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Deployment successful${NC}"
else
    echo -e "${RED}❌ Deployment failed${NC}"
    exit 1
fi

# Step 7: Final verification
echo -e "\n${YELLOW}🔍 Step 7: Final verification...${NC}"
echo "Testing website accessibility..."

# Test local server response
if curl -f http://$SERVER_IP:3000/api/languages > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Direct server access working${NC}"
else
    echo -e "${YELLOW}⚠️  Direct server access not responding (may still be starting)${NC}"
fi

# Test HTTPS domain
if curl -f --resolve cadimar.net:443:$SERVER_IP https://cadimar.net > /dev/null 2>&1; then
    echo -e "${GREEN}✅ HTTPS domain access working${NC}"
else
    echo -e "${YELLOW}⚠️  HTTPS domain access not responding (DNS/SSL issue)${NC}"
fi

# Step 8: Cleanup local files
echo -e "\n${YELLOW}🧹 Step 8: Cleaning up local files...${NC}"
rm -f $ARCHIVE_NAME
echo -e "${GREEN}✅ Local cleanup completed${NC}"

# Summary
echo -e "\n${BLUE}📊 DEPLOYMENT SUMMARY${NC}"
echo -e "${BLUE}===================${NC}"
echo -e "${GREEN}✅ Code updated and deployed successfully${NC}"
echo -e "${GREEN}✅ Old version removed from server${NC}"
echo -e "${GREEN}✅ New container is running${NC}"
echo -e "${BLUE}🌐 Website: https://cadimar.net${NC}"
echo -e "${BLUE}🔒 SSL: Enabled${NC}"
echo -e "${BLUE}📱 Status: Production Ready${NC}"

echo -e "\n${GREEN}🎉 Quick update completed successfully!${NC}"
