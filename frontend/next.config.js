/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  webpack(config) {
    config.cache = true;
    return config;
  },
};

module.exports = nextConfig;
