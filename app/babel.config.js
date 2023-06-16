module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'transform-inline-environment-variables',
      'tsconfig-paths-module-resolver',
      // NOTE: `expo-router/babel` is a temporary extension to `babel-preset-expo`.
      require.resolve('expo-router/babel'),
      'react-native-reanimated/plugin',
    ],
  }
}
