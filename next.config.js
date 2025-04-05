/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This will prevent ESLint errors from blocking the build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;