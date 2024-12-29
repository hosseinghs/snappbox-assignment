import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:3000/:path*', // Correct the destination path
      },
    ];
  },
};

export default nextConfig;
