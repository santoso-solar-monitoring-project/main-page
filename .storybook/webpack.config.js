const path = require('path');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('babel-loader'),
    options: {
      presets: [['react-app', { flow: false, typescript: true }]],
    },
  });
  config.resolve.extensions.push('.ts', '.tsx');

  // https://github.com/storybooks/storybook/issues/3916#issuecomment-409691336
  config.resolve.modules = [
    ...(config.resolve.modules || []),
    path.resolve('./src'),
  ];
  return config;
};
