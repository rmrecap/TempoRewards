import { NextConfig } from 'next';

const config: Partial<NextConfig> = {
  // Enable image optimization
  images: {
    domains: ['your-image-domain.com'], // Add your image domains here
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },

  // Security headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on',
        },
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ],

  // Enable compression
  compress: true,

  // Enable React Strict Mode
  reactStrictMode: true,

  // Configure CORS
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/api/:path*',
        has: [
          {
            type: 'header',
            key: 'origin',
            value: process.env.ALLOWED_ORIGINS?.split(',') || [],
          },
        ],
        destination: '/api/:path*',
      },
    ],
  }),

  // Optimize production builds
  swcMinify: true,
  poweredByHeader: false,
};

export default config;
