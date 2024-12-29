import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* use proxy to bypass CORS */ 
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:3000/*',
      },
    ];
  },
};

export default nextConfig;
