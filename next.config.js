/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  images: {
    domains: ['randomuser.me'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
});



