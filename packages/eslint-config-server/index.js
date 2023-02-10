module.exports = {
  extends: ['eslint:recommended', '@antfu', 'turbo', 'prettier'],
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true,
      },
    },
  ],
}
