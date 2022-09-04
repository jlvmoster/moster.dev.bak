/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['pages', 'components', 'lib'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
