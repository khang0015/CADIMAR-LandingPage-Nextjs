#!/bin/bash

# Script deploy với uploads folder tách riêng
set -e

echo "🚀 Building and deploying CADIMAR with external uploads..."

# Build Docker images
echo "📦 Building Backend Docker image..."
docker build -f Dockerfile.backend -t cadimar-landingpage-nextjs-backend:latest .

echo "📦 Building Frontend Docker image..."  
docker build -f Dockerfile.frontend -t cadimar-landingpage-nextjs-frontend:latest .

# Export images
echo "💾 Exporting Docker images..."
docker save cadimar-landingpage-nextjs-backend:latest | gzip > cadimar-backend.tar.gz
docker save cadimar-landingpage-nextjs-frontend:latest | gzip > cadimar-frontend.tar.gz

echo "✅ Docker images built and exported successfully!"
echo ""
echo "📋 Files ready for upload to server:"
echo "  - cadimar-backend.tar.gz"
echo "  - cadimar-frontend.tar.gz"
echo "  - docker-compose.production.yml"
echo "  - nginx-cadimar.conf (or nginx-cadimar-http-only.conf)"
echo "  - setup-uploads-folder.sh"
echo ""
echo "🚀 Deployment steps on server:"
echo ""
echo "1. Upload files to server"
echo "2. Load Docker images:"
echo "   docker load < cadimar-backend.tar.gz"
echo "   docker load < cadimar-frontend.tar.gz"
echo ""
echo "3. Setup uploads folder (run as root):"
echo "   chmod +x setup-uploads-folder.sh"
echo "   ./setup-uploads-folder.sh"
echo ""
echo "4. Copy existing uploads to server uploads folder:"
echo "   sudo cp -r ./uploads/* /www/wwwroot/cadimar.net/uploads/"
echo "   sudo chown -R www-data:www-data /www/wwwroot/cadimar.net/uploads"
echo ""
echo "5. Update nginx configuration:"
echo "   - Copy nginx-cadimar.conf to /etc/nginx/sites-available/"
echo "   - Or update existing config in aaPanel"
echo "   - Reload nginx: sudo systemctl reload nginx"
echo ""
echo "6. Start containers:"
echo "   docker-compose -f docker-compose.production.yml up -d"
echo ""
echo "7. Test uploads functionality:"
echo "   - Access https://cadimar.net/uploads/test.txt"
echo "   - Try uploading a new image via admin panel"
echo "   - Verify image is accessible at https://cadimar.net/uploads/..."
echo ""
echo "🔍 Benefits of this setup:"
echo "  ✅ Uploads persist across container restarts"
echo "  ✅ Faster nginx serving of static files"
echo "  ✅ Easier backup and management of uploads"
echo "  ✅ Smaller Docker images (no uploads included)"
echo "  ✅ Can manage uploads directly via aaPanel file manager"
