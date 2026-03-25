import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    // Set the root to the directory where this config file is located
    root: path.join(__dirname),
  },
};

export default nextConfig;
