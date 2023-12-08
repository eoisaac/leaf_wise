module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',

      ['@babel/plugin-proposal-decorators', { legacy: true }],
      'transform-inline-environment-variables',
      'react-native-reanimated/plugin',
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '../../.env',
        },
      ],
    ],
  }
}
