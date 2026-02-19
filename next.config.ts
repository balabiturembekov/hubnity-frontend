import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.automatonsoft.de",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
