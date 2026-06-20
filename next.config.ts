import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-bb6c9d94d00f45b68ba134ebabec27ac.r2.dev',
      },
    ],
  },
};

export default nextConfig;