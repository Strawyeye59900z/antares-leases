import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Site estático para o Cloudflare Pages (pasta "out")
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
