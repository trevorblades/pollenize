const HtmlPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const title = 'Pollenize';
const publicPath = '/';

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: ['babel-polyfill', './index.js'],
  output: {
    publicPath,
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
      },
      {
        test: /\.svg$/,
        use: 'svgr/webpack'
      },
      {
        test: /\.jpg$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      title,
      template: 'index.html'
    }),
    new WebappWebpackPlugin('./assets/logo.svg'),
    new webpack.DefinePlugin({
      'process.env.APP_TITLE': JSON.stringify(title),
      'process.env.PUBLIC_PATH': JSON.stringify(publicPath)
    })
  ]
};
