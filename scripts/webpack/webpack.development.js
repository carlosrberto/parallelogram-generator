const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const loaders = require('./loaders.js');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss|sass$/,
        use: [
          'style-loader',
          loaders.cssModuleLoader,
          loaders.postCSSLoader,
          loaders.sassLoader,
        ],
      },
    ],
  },
});
