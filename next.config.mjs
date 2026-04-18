/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webpackBuildWorker: false
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d64gsuwffb70l.cloudfront.net"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  }
};

export default nextConfig;
