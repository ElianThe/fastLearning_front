module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module:react-native-dotenv', {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        whitelist: ['API_URL', 'TOKEN_KEY'],
        safe: false,
        allowUndefined: true,
      }],
    ]
  };
};
