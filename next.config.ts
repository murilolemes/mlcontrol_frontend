import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    'local-origin.dev',
    '*.local-origin.dev'
  ],
  compiler: {
    styledComponents: true,
  }
};

export default nextConfig;
