import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/sentinel-sec-lab",
  assetPrefix: "/sentinel-sec-lab",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;