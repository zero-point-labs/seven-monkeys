# 🚀 Production Deployment Guide

This guide covers deploying the Seven Monkeys DJ Platform to production with proper security, performance, and scalability considerations.

## 📋 Prerequisites

### Server Requirements
- **CPU**: 2+ cores (4+ recommended)
- **RAM**: 4GB+ (8GB+ recommended)
- **Storage**: 50GB+ SSD
- **Network**: Stable internet connection
- **OS**: Ubuntu 20.04+ or CentOS 8+

### Software Requirements
- Docker 20.10+
- Docker Compose 2.0+
- Nginx (for reverse proxy)
- SSL certificates
- Domain name

## 🔒 Security Configuration

### 1. Change Default Passwords

**Update Icecast passwords:**
```bash
# Edit icecast.xml
<authentication>
    <source-password>YOUR_SECURE_PASSWORD</source-password>
    <relay-password>YOUR_SECURE_PASSWORD</relay-password>
    <admin-user>admin</admin-user>
    <admin-password>YOUR_SECURE_ADMIN_PASSWORD</admin-password>
</authentication>
```

**Update environment variables:**
```bash
# .env.production
ICECAST_PASSWORD=YOUR_SECURE_PASSWORD
NEXTAUTH_SECRET=YOUR_SECURE_SECRET_KEY
REDIS_PASSWORD=YOUR_SECURE_REDIS_PASSWORD
```

### 2. Configure Firewall

```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 8000/tcp  # Icecast (if external access needed)
sudo ufw enable
```

### 3. SSL Configuration

**Using Let's Encrypt:**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 🌐 Nginx Configuration

### Reverse Proxy Setup

```nginx
# /etc/nginx/sites-available/seven-monkeys
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    # Main Application
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Icecast Admin (Restricted)
    location /icecast-admin {
        allow YOUR_ADMIN_IP;
        deny all;
        proxy_pass http://localhost:8000/admin;
    }

    # Static Files
    location /_next/static {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Audio Streams (if external access needed)
    location /stream/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 🐳 Docker Production Configuration

### Updated docker-compose.prod.yml

```yaml
version: '3.8'

services:
  # Icecast streaming server
  icecast:
    image: moul/icecast:latest
    container_name: seven-monkeys-icecast-prod
    ports:
      - "127.0.0.1:8000:8000"  # Bind to localhost only
    volumes:
      - ./icecast.xml:/etc/icecast2/icecast.xml:ro
      - ./logs:/var/log/icecast2
      - ./audio:/audio:ro
    environment:
      - ICECAST_SOURCE_PASSWORD=${ICECAST_PASSWORD}
      - ICECAST_RELAY_PASSWORD=${ICECAST_PASSWORD}
      - ICECAST_ADMIN_PASSWORD=${ICECAST_ADMIN_PASSWORD}
    restart: unless-stopped
    networks:
      - seven-monkeys-network
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Liquidsoap audio processor
  liquidsoap:
    image: savonet/liquidsoap:latest
    container_name: seven-monkeys-liquidsoap-prod
    depends_on:
      - icecast
    volumes:
      - ./liquidsoap.liq:/etc/liquidsoap/liquidsoap.liq:ro
      - ./audio:/audio:ro
      - ./logs:/var/log/liquidsoap
    command: liquidsoap /etc/liquidsoap/liquidsoap.liq
    restart: unless-stopped
    networks:
      - seven-monkeys-network
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Next.js application
  webapp:
    build:
      context: .
      dockerfile: Dockerfile.prod
    container_name: seven-monkeys-webapp-prod
    ports:
      - "127.0.0.1:3000:3000"  # Bind to localhost only
    environment:
      - NODE_ENV=production
      - ICECAST_HOST=icecast
      - ICECAST_PORT=8000
      - ICECAST_PASSWORD=${ICECAST_PASSWORD}
      - REDIS_URL=redis://redis:6379
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=https://yourdomain.com
    depends_on:
      - icecast
      - redis
    restart: unless-stopped
    networks:
      - seven-monkeys-network
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Redis for session storage and caching
  redis:
    image: redis:7-alpine
    container_name: seven-monkeys-redis-prod
    ports:
      - "127.0.0.1:6379:6379"  # Bind to localhost only
    volumes:
      - redis-data:/data
    command: redis-server --requirepass ${REDIS_PASSWORD}
    restart: unless-stopped
    networks:
      - seven-monkeys-network
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  # Monitoring with Prometheus (Optional)
  prometheus:
    image: prom/prometheus:latest
    container_name: seven-monkeys-prometheus
    ports:
      - "127.0.0.1:9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
    restart: unless-stopped
    networks:
      - seven-monkeys-network

volumes:
  redis-data:

networks:
  seven-monkeys-network:
    driver: bridge
```

### Production Dockerfile

```dockerfile
# Dockerfile.prod
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile --prod

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN corepack enable pnpm && pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

## 📊 Monitoring Setup

### Prometheus Configuration

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'seven-monkeys-webapp'
    static_configs:
      - targets: ['webapp:3000']
    metrics_path: '/api/metrics'

  - job_name: 'seven-monkeys-icecast'
    static_configs:
      - targets: ['icecast:8000']
    metrics_path: '/admin/stats'

  - job_name: 'seven-monkeys-redis'
    static_configs:
      - targets: ['redis:6379']
```

### Health Check Script

```bash
#!/bin/bash
# health-check.sh

# Check web application
if ! curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    echo "Web application is down"
    exit 1
fi

# Check Icecast
if ! curl -f http://localhost:8000/status.xsl > /dev/null 2>&1; then
    echo "Icecast server is down"
    exit 1
fi

# Check Redis
if ! redis-cli -h localhost -p 6379 ping > /dev/null 2>&1; then
    echo "Redis is down"
    exit 1
fi

echo "All services are healthy"
```

## 🔄 Backup Strategy

### Database Backup
```bash
#!/bin/bash
# backup.sh

# Create backup directory
mkdir -p /backups/$(date +%Y%m%d)

# Backup Redis data
docker exec seven-monkeys-redis-prod redis-cli BGSAVE
docker cp seven-monkeys-redis-prod:/data/dump.rdb /backups/$(date +%Y%m%d)/redis-backup.rdb

# Backup audio files
tar -czf /backups/$(date +%Y%m%d)/audio-backup.tar.gz ./audio/

# Backup configuration
cp -r ./icecast.xml ./liquidsoap.liq ./docker-compose.prod.yml /backups/$(date +%Y%m%d)/

# Cleanup old backups (keep 30 days)
find /backups -type d -mtime +30 -exec rm -rf {} \;
```

### Automated Backups
```bash
# Add to crontab
0 2 * * * /path/to/backup.sh
```

## 🚀 Deployment Steps

### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Application Deployment
```bash
# Clone repository
git clone <repository-url>
cd seven-monkeys-streaming

# Configure environment
cp .env.example .env.production
# Edit .env.production with production values

# Start services
docker-compose -f docker-compose.prod.yml up -d

# Verify deployment
./health-check.sh
```

### 3. SSL Setup
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com
```

## 📈 Performance Optimization

### 1. Caching Strategy
- Enable Redis caching for API responses
- Use CDN for static assets
- Implement browser caching headers

### 2. Database Optimization
- Use Redis clustering for high availability
- Implement connection pooling
- Monitor query performance

### 3. Audio Streaming Optimization
- Use multiple Icecast instances for load balancing
- Implement stream failover
- Monitor bandwidth usage

## 🔍 Monitoring and Alerting

### Key Metrics to Monitor
- Server CPU and memory usage
- Disk space and I/O
- Network bandwidth
- Active listeners per stream
- Application response times
- Error rates

### Alerting Setup
- Set up alerts for service downtime
- Monitor disk space usage
- Track high error rates
- Alert on unusual traffic patterns

## 🆘 Troubleshooting

### Common Production Issues

**High Memory Usage**
```bash
# Check memory usage
docker stats

# Restart services if needed
docker-compose restart
```

**Audio Streaming Issues**
```bash
# Check Icecast logs
docker-compose logs icecast

# Verify stream URLs
curl -I http://localhost:8000/dj1
```

**Performance Issues**
```bash
# Monitor system resources
htop
iotop
nethogs
```

---

**Production deployment completed! 🎉**

Your Seven Monkeys DJ Platform is now running securely in production with proper monitoring, backups, and performance optimization.
