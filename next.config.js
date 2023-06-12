const { i18n } = require( './next-i18next.config' );

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['']
  },
  i18n,
  experimental: {
    images: {
      unoptimized: true
    }
  }
};

module.exports = nextConfig;
