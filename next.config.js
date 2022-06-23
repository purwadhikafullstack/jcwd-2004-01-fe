/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: "http://172.105.119.73:5001",
  },
};

module.exports = nextConfig;
