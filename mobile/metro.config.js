const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);
config.resolver.platforms = Array.from(new Set([...(config.resolver.platforms || []), 'web']));

const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    platform === 'web' &&
    moduleName === 'react-native/Libraries/Components/TextInput/TextInputState'
  ) {
    return {
      filePath: path.join(__dirname, 'src/web/TextInputStateShim.js'),
      type: 'sourceFile',
    };
  }

  if (platform === 'web' && moduleName === 'react-native') {
    return context.resolveRequest(context, 'react-native-web', platform);
  }

  if (defaultResolveRequest) {
    return defaultResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
