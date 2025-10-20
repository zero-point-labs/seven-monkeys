# 🎧 Seven Monkeys DJ Platform

A modern, mobile-optimized DJ streaming platform built with Next.js 15, featuring real-time audio streaming via Icecast and Liquidsoap.

## ✨ Features

### 🎵 DJ Platform
- **Mobile-First Design** - Optimized for mobile devices with touch interactions
- **Real-Time Streaming** - Live audio streaming with Icecast integration
- **Background Playback** - Audio continues playing when mobile screen is locked
- **4 DJ Channels** - Support for multiple simultaneous DJ streams
- **Live Listener Counts** - Real-time listener statistics from Icecast

### 🎛️ Admin Dashboard
- **Stream Management** - Start/stop streams and monitor status
- **DJ Management** - Add, edit, and manage DJ profiles
- **Audio Library** - Upload and manage audio files
- **Real-Time Stats** - Monitor server health and performance

### 🏠 Bar Website
- **Modern Design** - Clean, responsive bar website
- **Brand Integration** - Seven Monkeys branding and theme
- **Mobile Optimized** - Perfect mobile experience

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for development)
- FFmpeg (for audio processing)

### Installation

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd seven-monkeys-streaming
   ./setup.sh
   ```

2. **Access the Platform**
   - 🎧 Music Platform: http://localhost:3000/music
   - 🏠 Bar Website: http://localhost:3000/bar-website
   - ⚙️ Admin Dashboard: http://localhost:3000/admin
   - 📡 Icecast Admin: http://localhost:8000/admin

### Manual Setup

If you prefer manual setup:

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Start Services**
   ```bash
   docker-compose up -d
   ```

3. **Build and Run**
   ```bash
   pnpm build
   pnpm start
   ```

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI, Magic UI
- **Audio**: Howler.js for mobile background playback
- **Streaming**: Icecast server with Liquidsoap processing
- **Containerization**: Docker & Docker Compose

### Services
- **Web App** (Port 3000) - Next.js application
- **Icecast** (Port 8000) - Audio streaming server
- **Liquidsoap** - Audio processing and streaming
- **Redis** (Port 6379) - Session storage and caching

## 📡 Streaming Setup

### Icecast Configuration
The platform uses Icecast 2.4+ with the following mount points:
- `/dj1` - DJ 1 stream
- `/dj2` - DJ 2 stream  
- `/dj3` - DJ 3 stream
- `/dj4` - DJ 4 stream

### Audio Sources
Place audio files in the following directories:
```
audio/
├── dj1/
│   ├── track1.mp3
│   └── track2.mp3
├── dj2/
├── dj3/
└── dj4/
```

### Stream URLs
Each DJ stream is available at:
- `http://localhost:8000/dj1`
- `http://localhost:8000/dj2`
- `http://localhost:8000/dj3`
- `http://localhost:8000/dj4`

## 🎛️ Admin Features

### Stream Control
- Start/stop individual DJ streams
- Monitor real-time listener counts
- View server health status
- Update stream metadata

### DJ Management
- Add new DJ profiles
- Edit existing DJ information
- Manage DJ avatars and genres
- Set up mount points

### Audio Library
- Upload audio files (MP3, AAC, OGG)
- Organize files by DJ
- Monitor file status and processing
- Delete unwanted files

## 📱 Mobile Optimization

### Background Playback
- Uses Howler.js for reliable mobile audio
- HTML5 audio with fallback support
- Continues playing when screen is locked
- Optimized for iOS and Android

### Touch Interactions
- Touch-friendly DJ card interactions
- Intersection Observer for viewport animations
- Responsive design for all screen sizes
- Fast loading and smooth animations

## 🔧 Configuration

### Environment Variables
```bash
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
```

### Customization
- **Brand Colors**: Edit `src/app/globals.css`
- **DJ Profiles**: Modify `src/app/api/djs/route.ts`
- **Stream Settings**: Update `icecast.xml`
- **Audio Processing**: Configure `liquidsoap.liq`

## 🚀 Production Deployment

### Security Considerations
- Change all default passwords
- Configure SSL certificates
- Set up proper firewall rules
- Use production database
- Enable authentication

### Performance Optimization
- Use CDN for static assets
- Configure Redis clustering
- Set up load balancing
- Monitor server resources

### Scaling
- Horizontal scaling with multiple Icecast instances
- Load balancing for web application
- Database clustering for high availability
- CDN for global content delivery

## 🐛 Troubleshooting

### Common Issues

**Icecast not starting**
```bash
# Check logs
docker-compose logs icecast

# Restart service
docker-compose restart icecast
```

**Audio not playing**
```bash
# Check stream status
curl http://localhost:8000/status.xsl

# Verify mount points
curl http://localhost:8000/dj1
```

**Mobile audio issues**
- Ensure HTTPS in production
- Check browser audio policies
- Verify Howler.js configuration

### Logs
- **Application**: `docker-compose logs webapp`
- **Icecast**: `docker-compose logs icecast`
- **Liquidsoap**: `docker-compose logs liquidsoap`

## 📄 API Documentation

### Stream API
- `GET /api/stream` - Get streaming status
- `POST /api/stream` - Start stream
- `PUT /api/stream` - Stop stream
- `PATCH /api/stream` - Update listeners

### DJ API
- `GET /api/djs` - Get all DJs
- `POST /api/djs` - Create DJ
- `GET /api/djs/[id]` - Get specific DJ
- `PUT /api/djs/[id]` - Update DJ
- `DELETE /api/djs/[id]` - Delete DJ

### Audio API
- `GET /api/audio` - Get audio files
- `POST /api/audio` - Upload file
- `DELETE /api/audio/[id]` - Delete file

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the API documentation

---

**Built with ❤️ for Seven Monkeys The Bar**