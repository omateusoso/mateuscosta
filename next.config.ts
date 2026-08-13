import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phones on this local network to receive the development runtime,
  // which initializes the animated text and Liquid Ether background.
  allowedDevOrigins: ["192.168.1.17"],
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
