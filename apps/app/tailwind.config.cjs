const sharedConfig = require('@wheel-go/tailwind-config')

/** @type {import('tailwindcss').Config} */
const config = {
  ...sharedConfig,
  plugins: [...sharedConfig.plugins, require('@tailwindcss/line-clamp')],
}

module.exports = config
