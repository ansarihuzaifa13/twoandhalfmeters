import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Because you're deploying to GitHub Pages under a repository
  basePath: "/twoandhalfmeters",
  assetPrefix: "/twoandhalfmeters",
};

export default nextConfig;