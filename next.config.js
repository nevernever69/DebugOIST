const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com'
      },
      {
        hostname: 'images.unsplash.com'
      }, 
      {
        hostname: 'assets.aceternity.com'
      },
      {
        hostname: 'ui.aceternity.com'
      }
      
    ]
  },
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ]
  }
}

module.exports = withNextIntl(nextConfig)
