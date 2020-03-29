const path = require('path');
const DotenvWebpack = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const withOptimizedImages = require('next-optimized-images');

const isProduction = process.env.NODE_ENV === 'production';

function webpack(config, options) {
  config.resolve = config.resolve || {};
  config.resolve.plugins = config.resolve.plugins || [];

  config.resolve.plugins.push(new TsconfigPathsPlugin());

  config.plugins = [
    ...config.plugins,
    new DotenvWebpack({
      path: path.join(__dirname, '.env'),
      systemvars: true,
    }),
  ];

  return config;
}

const analyzerOptions = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: './bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html',
    },
  },
};

const optimizedImagesOptions = {
  mozjpeg: {
    quality: 80,
  },
  pngquant: {
    quality: [0.65, 0.8],
  },
};

const nextOptions = {
  webpack,
  ...analyzerOptions,
  ...optimizedImagesOptions,
  // ...workboxOptions,
};

module.exports = [withOptimizedImages, withBundleAnalyzer].reduce(
  (acc, fn) => (acc == null ? fn(nextOptions) : fn(acc)),
  null,
);
