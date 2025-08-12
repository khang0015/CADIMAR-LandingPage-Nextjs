#!/bin/bash
# Deploy script cho aaPanel Docker
# File: deploy-aapanel.sh

echo "🚀 Starting deployment to aaPanel Docker..."

# Kiểm tra files tồn tại
if [ ! -f "cadimar-backend.tar.gz" ]; then
    echo "❌ cadimar-backend.tar.gz not found!"
    exit 1
fi

if [ ! -f "cadimar-frontend.tar.gz" ]; then
    echo "❌ cadimar-frontend.tar.gz not found!"
    exit 1
fi

if [ ! -f "docker-compose.production.yml" ]; then
    echo "❌ docker-compose.production.yml not found!"
    exit 1
fi

echo "✅ All files found"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.production.yml down 2>/dev/null || true

# Remove old images
echo "🗑️ Removing old images..."
docker rmi cadimar-landingpage-nextjs-backend:latest 2>/dev/null || true
docker rmi cadimar-landingpage-nextjs-frontend:latest 2>/dev/null || true

# Load new images
echo "📦 Loading new Docker images..."
echo "Loading backend image..."
docker load < cadimar-backend.tar.gz

echo "Loading frontend image..."
docker load < cadimar-frontend.tar.gz

# Verify images loaded
echo "🔍 Verifying images..."
docker images | grep cadimar-landingpage-nextjs

# Start containers
echo "🚀 Starting containers..."
docker-compose -f docker-compose.production.yml up -d

# Wait for containers to start
echo "⏳ Waiting for containers to start..."
sleep 10

# Check status
echo "📊 Container status:"
docker-compose -f docker-compose.production.yml ps

# Check health
echo "🏥 Health check:"
echo "Backend health:"
curl -f http://localhost:5000/api/health 2>/dev/null && echo "✅ Backend OK" || echo "❌ Backend failed"

echo "Frontend health:"
curl -f http://localhost:3000 2>/dev/null && echo "✅ Frontend OK" || echo "❌ Frontend failed"

# Show logs
echo "📋 Recent logs:"
echo "=== Backend logs ==="
docker-compose -f docker-compose.production.yml logs --tail=10 backend

echo "=== Frontend logs ==="
docker-compose -f docker-compose.production.yml logs --tail=10 frontend

echo "🎉 Deployment completed!"
echo "👉 Check your website: https://cadimar.net"
