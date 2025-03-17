const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // Match any image URL on the domain
        hostname: 'res.cloudinary.com'
      }
    ]
  }
}

module.exports = withNextIntl(nextConfig)
