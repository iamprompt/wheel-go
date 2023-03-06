const path = require('path')

module.exports = {
  root: true,
  extends: ['wheel-go'],
  settings: {
    tailwindcss: {
      config: path.join(__dirname, 'tailwind.config.js'),
    },
  },
}
