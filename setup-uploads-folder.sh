#!/bin/bash

# Script để setup uploads folder trên server aaPanel
# Chạy script này trên server sau khi deploy

echo "🚀 Setting up uploads folder for Cadimar website..."

# Tạo thư mục uploads trong website directory của aaPanel
WEBSITE_ROOT="/www/wwwroot/cadimar.net"
UPLOADS_DIR="$WEBSITE_ROOT/uploads"

echo "📁 Creating uploads directory at: $UPLOADS_DIR"

# Tạo thư mục uploads và các subdirectories
sudo mkdir -p "$UPLOADS_DIR/blog"
sudo mkdir -p "$UPLOADS_DIR/avatars"

# Set ownership cho www-data (nginx/apache user)
echo "🔐 Setting permissions..."
sudo chown -R www-data:www-data "$UPLOADS_DIR"
sudo chmod -R 755 "$UPLOADS_DIR"

# Copy existing uploads từ project nếu có
if [ -d "./uploads" ]; then
    echo "📋 Copying existing uploads..."
    sudo cp -r ./uploads/* "$UPLOADS_DIR/"
    sudo chown -R www-data:www-data "$UPLOADS_DIR"
fi

echo "✅ Uploads folder setup completed!"
echo "📍 Uploads location: $UPLOADS_DIR"
echo "🌐 Accessible via: https://cadimar.net/uploads/"

# Tạo test file để verify
echo "🧪 Creating test file..."
echo "Test file created at $(date)" | sudo tee "$UPLOADS_DIR/test.txt" > /dev/null
sudo chown www-data:www-data "$UPLOADS_DIR/test.txt"

echo "🔍 Directory structure:"
ls -la "$UPLOADS_DIR"

echo ""
echo "📝 Next steps:"
echo "1. Deploy your Docker containers with the updated configuration"
echo "2. Test uploads functionality"
echo "3. Verify images are accessible at https://cadimar.net/uploads/..."
echo "4. Remove test.txt file when everything works: sudo rm $UPLOADS_DIR/test.txt"
