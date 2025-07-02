/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Turbopack configuration for better performance
    turbo: {
      rules: {
        '*.woff2': {
          loaders: ['file-loader'],
        },
        '*.woff': {
          loaders: ['file-loader'],
        },
      },
    },
  },
  // Font optimization
  optimizeFonts: true,
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization
  images: {
    domains: ['images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Headers for better performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig; 