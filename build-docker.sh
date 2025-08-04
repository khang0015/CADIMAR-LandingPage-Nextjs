#!/bin/bash
set -e

echo "🚀 Building CADIMAR Landing Page..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t cadimar-landing-page:latest .

echo "🧪 Testing the build..."
# Test run the container
docker run --rm -d --name cadimar-test -p 3001:3000 cadimar-landing-page:latest

# Wait a moment for the container to start
sleep 5

# Test if the app is responding
if curl -f http://localhost:3001/api/languages > /dev/null 2>&1; then
    echo "✅ App is running successfully!"
    docker stop cadimar-test
else
    echo "❌ App failed to start properly"
    docker stop cadimar-test
    exit 1
fi

echo "🎉 Build completed successfully!"
echo ""
echo "To run the app:"
echo "  docker run -p 3000:3000 cadimar-landing-page:latest"
echo ""
echo "Or with docker-compose:"
echo "  docker-compose up"
