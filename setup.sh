#!/bin/bash

# Seven Monkeys DJ Platform - Setup Script
# This script sets up the complete streaming infrastructure

set -e

echo "🎧 Setting up Seven Monkeys DJ Platform..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi
    
    print_success "Docker and Docker Compose are installed"
}

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    mkdir -p audio/{dj1,dj2,dj3,dj4}
    mkdir -p logs
    mkdir -p tmp
    
    # Create sample audio files (silence for testing)
    for i in {1..4}; do
        mkdir -p "audio/dj$i"
        # Create a 10-second silence file for testing
        ffmpeg -f lavfi -i anullsrc=duration=10 -c:a libmp3lame -b:a 128k "audio/dj$i/silence.mp3" 2>/dev/null || true
    done
    
    print_success "Directories created successfully"
}

# Set up environment variables
setup_environment() {
    print_status "Setting up environment variables..."
    
    cat > .env << EOF
# Seven Monkeys DJ Platform Environment Variables

# Icecast Configuration
ICECAST_HOST=localhost
ICECAST_PORT=8000
ICECAST_PASSWORD=sevenmonkeys2024

# Next.js Configuration
NODE_ENV=production
NEXT_PUBLIC_ICECAST_HOST=localhost
NEXT_PUBLIC_ICECAST_PORT=8000

# Redis Configuration
REDIS_URL=redis://redis:6379

# Application Configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
EOF
    
    print_success "Environment variables configured"
}

# Build and start services
start_services() {
    print_status "Building and starting services..."
    
    # Build the Next.js application
    print_status "Building Next.js application..."
    docker-compose build webapp
    
    # Start all services
    print_status "Starting all services..."
    docker-compose up -d
    
    print_success "All services started successfully"
}

# Wait for services to be ready
wait_for_services() {
    print_status "Waiting for services to be ready..."
    
    # Wait for Icecast
    print_status "Waiting for Icecast server..."
    timeout=60
    while [ $timeout -gt 0 ]; do
        if curl -s http://localhost:8000/status.xsl > /dev/null 2>&1; then
            print_success "Icecast server is ready"
            break
        fi
        sleep 2
        timeout=$((timeout - 2))
    done
    
    if [ $timeout -le 0 ]; then
        print_warning "Icecast server did not start within 60 seconds"
    fi
    
    # Wait for Next.js app
    print_status "Waiting for Next.js application..."
    timeout=60
    while [ $timeout -gt 0 ]; do
        if curl -s http://localhost:3000 > /dev/null 2>&1; then
            print_success "Next.js application is ready"
            break
        fi
        sleep 2
        timeout=$((timeout - 2))
    done
    
    if [ $timeout -le 0 ]; then
        print_warning "Next.js application did not start within 60 seconds"
    fi
}

# Show service status
show_status() {
    print_status "Service Status:"
    echo ""
    
    # Check Icecast
    if curl -s http://localhost:8000/status.xsl > /dev/null 2>&1; then
        print_success "Icecast Server: Running on http://localhost:8000"
    else
        print_error "Icecast Server: Not running"
    fi
    
    # Check Next.js app
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        print_success "Web Application: Running on http://localhost:3000"
    else
        print_error "Web Application: Not running"
    fi
    
    # Check Redis
    if docker-compose ps redis | grep -q "Up"; then
        print_success "Redis: Running"
    else
        print_error "Redis: Not running"
    fi
    
    echo ""
    print_status "Available URLs:"
    echo "  🎧 Music Platform: http://localhost:3000/music"
    echo "  🏠 Bar Website: http://localhost:3000/bar-website"
    echo "  ⚙️  Admin Dashboard: http://localhost:3000/admin"
    echo "  📡 Icecast Admin: http://localhost:8000/admin (admin/sevenmonkeys2024)"
    echo ""
}

# Main setup function
main() {
    echo "🎧 Seven Monkeys DJ Platform Setup"
    echo "=================================="
    echo ""
    
    check_docker
    create_directories
    setup_environment
    start_services
    wait_for_services
    show_status
    
    echo ""
    print_success "Setup completed successfully!"
    echo ""
    print_status "Next steps:"
    echo "1. Visit http://localhost:3000/music to see the DJ platform"
    echo "2. Visit http://localhost:3000/admin to access the admin dashboard"
    echo "3. Configure your audio sources in the Liquidsoap configuration"
    echo "4. Upload audio files to the audio/ directories"
    echo ""
    print_warning "Note: This is a development setup. For production, please:"
    echo "- Change all default passwords"
    echo "- Configure proper SSL certificates"
    echo "- Set up proper firewall rules"
    echo "- Use a production database"
}

# Run main function
main "$@"
