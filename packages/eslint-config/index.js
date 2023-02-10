module.exports = {
  extends: ['@antfu', 'turbo', 'plugin:prettier/recommended'],
  // Override for next/babel issue - https://github.com/vercel/next.js/issues/40687#issuecomment-1421526821
  overrides: [
    {
      // Adapt to your needs (e.g. some might want to only override "next.config.js")
      files: ['*.js'],
      // This is the default parser of ESLint
      parser: 'espree',
      parserOptions: {
        ecmaVersion: 2020,
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'prettier/prettier': 'error',
  },
}
