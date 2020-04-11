const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.tsx?$/,
      use: [{ loader: require.resolve('babel-loader') }, { loader: require.resolve('react-docgen-typescript-loader') }],
    },
    {
      test: /\.scss$/,
      oneOf: [
        {
          test: /\.module\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true,
                modules: { localIdentName: '[name]--[local]___[hash:base64:5]' },
              },
            },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
        {
          use: [
            'style-loader',
            { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2 } },
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
      ],
    },
  );
  config.resolve.extensions.push('.ts', '.tsx');
  if (!(config.resolve.plugins instanceof Array)) config.resolve.plugins = [];
  config.resolve.plugins.push(new TsconfigPathsPlugin());

  return config;
};
