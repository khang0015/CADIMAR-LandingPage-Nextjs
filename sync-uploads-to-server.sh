#!/bin/bash

# Script để sync uploads folder lên server
# Chạy từ local machine để upload uploads folder lên server

SERVER_IP="YOUR_SERVER_IP"
SERVER_USER="root"
SERVER_UPLOADS_PATH="/www/wwwroot/cadimar.net/uploads"

echo "📤 Syncing uploads folder to server..."

# Check if uploads folder exists locally
if [ ! -d "./uploads" ]; then
    echo "❌ Local uploads folder not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi

echo "🔍 Found local uploads folder with:"
find ./uploads -type f | wc -l | xargs echo "Files:"
du -sh ./uploads | cut -f1 | xargs echo "Size:"

# Create tar archive of uploads
echo "📦 Creating uploads archive..."
tar -czf uploads.tar.gz uploads/

echo "📤 Uploading to server..."
scp uploads.tar.gz $SERVER_USER@$SERVER_IP:/tmp/

echo "🚀 Extracting on server..."
ssh $SERVER_USER@$SERVER_IP << 'EOF'
    # Extract uploads
    cd /tmp
    tar -xzf uploads.tar.gz
    
    # Create target directory if not exists
    mkdir -p /www/wwwroot/cadimar.net/uploads
    
    # Copy files
    cp -r uploads/* /www/wwwroot/cadimar.net/uploads/
    
    # Set permissions
    chown -R www-data:www-data /www/wwwroot/cadimar.net/uploads
    chmod -R 755 /www/wwwroot/cadimar.net/uploads
    
    # Cleanup
    rm -rf uploads uploads.tar.gz
    
    echo "✅ Uploads synced successfully!"
    echo "📊 Server uploads folder:"
    ls -la /www/wwwroot/cadimar.net/uploads/
EOF

# Cleanup local archive
rm uploads.tar.gz

echo "🎉 Upload sync completed!"
echo ""
echo "🔍 Next steps:"
echo "1. Verify uploads are accessible: https://cadimar.net/uploads/"
echo "2. Test upload functionality in your app"
echo "3. Check that new uploads appear in /www/wwwroot/cadimar.net/uploads/"
