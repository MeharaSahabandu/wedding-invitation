/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/card",
      },
    ];
  },
};
module.exports = nextConfig;
