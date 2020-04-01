const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      use: [{ loader: require.resolve('babel-loader') }, { loader: require.resolve('react-docgen-typescript-loader') }],
    },
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader', options: { sourceMap: true } },
        { loader: 'css-loader', options: { sourceMap: true } },
      ],
    },
    {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader', options: { sourceMap: true } },
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: '[name]--[local]___[hash:base64:5]',
            modules: true,
            sourceMap: true,
          },
        },
        { loader: 'postcss-loader', options: { sourceMap: true } },
        { loader: 'sass-loader', options: { sourceMap: true } },
      ],
    },
  );
  config.resolve.extensions.push('.ts', '.tsx');
  if (!(config.resolve.plugins instanceof Array)) config.resolve.plugins = [];
  config.resolve.plugins.push(new TsconfigPathsPlugin());

  return config;
};
