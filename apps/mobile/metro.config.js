// Learn more https://docs.expo.io/guides/customizing-metro
/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */

const config = getDefaultConfig(__dirname)

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

module.exports = config
