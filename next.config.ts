import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Only use GitHub Pages settings in production builds
  ...(isProd && {
    basePath: "/twoandhalfmeters",
    assetPrefix: "/twoandhalfmeters",
  }),
};

export default nextConfig;