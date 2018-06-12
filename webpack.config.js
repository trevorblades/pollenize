const HtmlPlugin = require('html-webpack-plugin');
// const WebappWebpackPlugin = require('webapp-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash].js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      title: 'Pollenize',
      template: 'index.html'
    })
    // new WebappWebpackPlugin('./assets/logos/logo-small.svg'),
  ]
};
