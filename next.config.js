const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'res.cloudinary.com' },
      { hostname: 'images.unsplash.com' },
      { hostname: 'assets.aceternity.com' },
      { hostname: 'ui.aceternity.com' }
    ]
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/en',
      permanent: true,
    }
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Disable innerGraph optimization on the client to work around production issues
      config.optimization.innerGraph = false
    }
    return config
  }
}

module.exports = withNextIntl(nextConfig)

