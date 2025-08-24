#!/bin/bash

echo "🚀 Starting CADIMAR deployment..."

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Remove old images (optional)
echo "🗑️ Cleaning up old images..."
docker system prune -f

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service status
echo "📊 Checking service status..."
docker-compose ps

# Show logs
echo "📋 Recent logs:"
docker-compose logs --tail=50

echo "✅ Deployment completed!"
echo "🌐 Application should be available at:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:3001"
echo "   - Database: localhost:3306"

echo ""
echo "📝 To view logs: docker-compose logs -f"
echo "🔧 To restart: docker-compose restart"
echo "🛑 To stop: docker-compose down"
