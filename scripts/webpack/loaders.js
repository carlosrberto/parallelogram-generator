const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  sassLoader: {
    loader: 'sass-loader',
    options: {
      includePaths: ['node_modules', './src'],
    },
  },
  cssModuleLoader: {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[name]__[local]--[hash:base64:5]',
      importLoaders: 1,
    },
  },
  postCSSLoader: {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        postcssPresetEnv(),
      ],
    },
  },
};
