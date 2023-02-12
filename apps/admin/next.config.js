const path = require('path')

module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@wheel-go/ui'],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../..'),
  },
}
