import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.tsx",
    deviceSizes: [640, 828, 1080],
    imageSizes: [],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r2.optikasole.rs",
      },
    ],
  },
};

export default nextConfig;
