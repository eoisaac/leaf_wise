// Learn more https://docs.expo.io/guides/customizing-metro
/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro')

/** @type {import('expo/metro-config').MetroConfig} */

const projectRoot = __dirname
const config = getDefaultConfig(projectRoot, { isCSSEnabled: true })

if (config) {
  const { transformer, resolver } = config

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  }

  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...resolver.sourceExts, 'svg', 'mjs'],
  }
}

module.exports = withNativeWind(config, {
  input: './src/styles/globals.css',
  configPath: './tailwind.config.ts',
})
