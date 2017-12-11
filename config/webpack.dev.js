/**
 * Created by mikkri on 2017-04-20.
 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BaseHrefWebpackPlugin = require('base-href-webpack-plugin').BaseHrefWebpackPlugin;
const path = require('path');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';
const API = 'http://api.mittbolan.local';


module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin({filename: 'assets/css/[name].css'}),
    new BaseHrefWebpackPlugin({ baseHref: '/' }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'API': JSON.stringify(API)
      }
    })
  ],

  devServer: {
    contentBase: './src/public',
    historyApiFallback: true,
    quiet: true,
    compress: true,
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  }
});