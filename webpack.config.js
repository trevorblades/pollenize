const HtmlPlugin = require('html-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const title = 'Pollenize';
const branchName = process.env.CIRCLE_BRANCH;
const publicPath =
  branchName && branchName !== 'master' ? `/${branchName}/` : '/';

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
        test: /\.(png|jpg)$/,
        use: 'color-loader'
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      title,
      template: 'index.html'
    }),
    new WebappWebpackPlugin({
      logo: './assets/logo.svg',
      favicons: {
        icons: {
          android: false,
          appleIcon: false,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          yandex: false,
          windows: false
        }
      }
    }),
    new webpack.DefinePlugin({
      APP_TITLE: JSON.stringify(title),
      PUBLIC_PATH: JSON.stringify(publicPath)
    })
  ]
};
