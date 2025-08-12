import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Experimental features
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
    ];
  },

  // API rewrites cho backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:3001'}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:3001'}/uploads/:path*`,
      },
    ];
  },

  // Environment variables
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3001',
  },

  // Production server configuration
  output: 'standalone',
  
  // Images configuration - disable optimization for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Cho phép load hình từ external sources nếu cần
      },
    ],
  },
};

export default nextConfig;