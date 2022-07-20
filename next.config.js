/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    // NEXT_PUBLIC_API_URL: "https://jcwd200401api.purwadhikabootcamp.com",
    NEXT_PUBLIC_API_URL: "http://localhost:5000",
  },
};

module.exports = nextConfig;
