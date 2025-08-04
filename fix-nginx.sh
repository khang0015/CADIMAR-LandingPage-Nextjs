#!/bin/bash

# Fix Nginx Configuration Script
# Usage: ./fix-nginx.sh root@server-ip

set -e

SERVER=$1

if [ -z "$SERVER" ]; then
    echo "Usage: $0 user@server-ip"
    echo "Example: $0 root@128.140.15.157"
    exit 1
fi

echo "🔧 Fixing Nginx configuration on $SERVER..."

ssh $SERVER << 'ENDSSH'
set -e

echo "📋 Checking current nginx config..."
nginx -t

echo "🔄 Restarting nginx..."
systemctl restart nginx

echo "✅ Checking nginx status..."
systemctl status nginx --no-pager -l

echo "🧪 Testing local connection..."
sleep 2
curl -s http://localhost:3000/api/languages > /dev/null && echo "✅ Docker app is running" || echo "❌ Docker app issue"

echo "🌐 Testing nginx proxy..."
curl -s http://localhost/api/languages > /dev/null && echo "✅ Nginx proxy working" || echo "❌ Nginx proxy issue"

echo "📊 Current nginx sites:"
ls -la /etc/nginx/sites-enabled/

echo "📝 Nginx config content:"
cat /etc/nginx/sites-enabled/default || cat /etc/nginx/nginx.conf | tail -20

ENDSSH

echo "🎉 Nginx fix completed!"
echo "🧪 Testing from external..."
sleep 3
curl -I http://128.140.15.157/api/languages
