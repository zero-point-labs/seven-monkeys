import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Environment variables for Icecast integration
  env: {
    ICECAST_HOST: process.env.ICECAST_HOST || 'localhost',
    ICECAST_PORT: process.env.ICECAST_PORT || '8000',
    ICECAST_PASSWORD: process.env.ICECAST_PASSWORD || 'sevenmonkeys2024',
  },
  
  // External packages for server components
  serverExternalPackages: ['howler'],
  
  // Headers for CORS and streaming
  async headers() {
    return [
      {
        source: '/api/stream/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
