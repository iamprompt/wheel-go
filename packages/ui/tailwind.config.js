const sharedConfig = require('@wheel-go/tailwind-config')

/** @type {import('tailwindcss').Config} */
const config = {
  prefix: 'ui-',
  ...sharedConfig,
}

module.exports = config
