import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    '192.168.1.2',
    'localhost',
  ],
};

export default nextConfig;
