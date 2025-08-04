#!/bin/bash

# SSL Setup Script with Let's Encrypt
# Usage: ./setup-ssl.sh root@server-ip domain

set -e

SERVER=$1
DOMAIN=${2:-cadimar.net}

if [ -z "$SERVER" ]; then
    echo "Usage: $0 user@server-ip [domain]"
    echo "Example: $0 root@128.140.15.157 cadimar.net"
    exit 1
fi

echo "🔒 Setting up SSL for $DOMAIN on $SERVER..."

ssh $SERVER << ENDSSH
set -e

echo "📦 Installing Certbot..."
apt update
apt install -y certbot python3-certbot-nginx

echo "🔒 Getting SSL certificate for $DOMAIN..."
# Stop nginx temporarily to get certificate
systemctl stop nginx

# Get certificate for both domain and www subdomain
certbot certonly --standalone -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN

echo "📝 Updating Nginx configuration with SSL..."
cat > /etc/nginx/sites-available/cadimar.net << 'EOF'
# HTTP to HTTPS redirect
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name cadimar.net www.cadimar.net;
    
    # Redirect all HTTP requests to HTTPS
    return 301 https://\$server_name\$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2 default_server;
    listen [::]:443 ssl http2 default_server;
    server_name cadimar.net www.cadimar.net;

    # SSL Certificate configuration
    ssl_certificate /etc/letsencrypt/live/cadimar.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cadimar.net/privkey.pem;
    
    # Modern SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # HSTS (HTTP Strict Transport Security)
    add_header Strict-Transport-Security "max-age=63072000" always;
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    
    # Proxy to Next.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout       60s;
        proxy_send_timeout          60s;
        proxy_read_timeout          60s;
    }
}
EOF

echo "🔄 Testing Nginx configuration..."
nginx -t

echo "🚀 Starting Nginx..."
systemctl start nginx
systemctl enable nginx

echo "🔄 Setting up SSL auto-renewal..."
# Test renewal
certbot renew --dry-run

# Add cron job for auto-renewal
echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -

echo "✅ SSL setup completed!"
echo "🌐 Your website is now available at:"
echo "   https://cadimar.net"
echo "   https://www.cadimar.net"

ENDSSH

echo "🎉 SSL setup completed!"
echo "🧪 Testing SSL..."
sleep 5
curl -I https://$DOMAIN 2>/dev/null | head -1 || echo "Waiting for DNS propagation..."
