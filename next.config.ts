import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["flagcdn.com", "restcountries.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
