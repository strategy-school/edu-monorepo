/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    // remotePatterns: [
    //   { protocol: 'http', hostname: '146.185.159.12', port: '8000' },
    // ],
  },
  webpack(config) {
    config.cache = true;
    return config;
  },
};

module.exports = nextConfig;
