/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.ctfassets.net'],
  },
  eslint: {
    dirs: ['pages', 'components', 'lib'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
