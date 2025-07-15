// /web/next.config.mjs

import path from 'path';
import { fileURLToPath } from 'url';

// This is the correct way to get the directory name in an ES module.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Now this alias will be set correctly.
      '@': path.resolve(__dirname),
    };
    return config;
  },
};

export default nextConfig;