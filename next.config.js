/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    loader: "default",
    domains: ["localhost"],
  },
  env: {
    API_PROD_URI: process.env.API_PROD_URI,
  },
}

module.exports = nextConfig
