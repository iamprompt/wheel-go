const path = require('path')

module.exports = {
  root: true,
  extends: ['wheel-go'],
  ignorePatterns: ['!.*', 'dist', 'node_modules', 'ios', 'android'],
  rules: {
    'no-console': 'warn',
  },
  settings: {
    tailwindcss: {
      config: path.join(__dirname, 'tailwind.config.cjs'),
    },
  },
}
