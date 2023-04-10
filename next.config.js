/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    LOGROCKET_ID: process.env.NEXT_PUBLIC_LOGROCKET_ID,
  },
};

module.exports = nextConfig;
