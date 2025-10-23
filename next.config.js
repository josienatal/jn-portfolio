/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output: "standalone",
  turbopack: {
    // ✅ use absolute path to fix the “should be absolute” warning
    root: path.resolve(__dirname),
  },
};

module.exports = nextConfig;
