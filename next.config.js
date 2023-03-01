/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'matdori.s3.ap-northeast-2.amazonaws.com'],
  },
};

module.exports = nextConfig;
