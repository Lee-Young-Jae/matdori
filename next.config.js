/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'matdori.s3.ap-northeast-2.amazonaws.com',
      'search.pstatic.net',
      'matdori.vercel.app',
      'ldb-phinf.pstatic.net',
    ],
  },
  i18n: {
    locales: ['ko-KR'],
    defaultLocale: 'ko-KR',
  },
};

module.exports = nextConfig;
