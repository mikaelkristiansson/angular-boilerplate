/**
 * Created by Mikael Kristiansson on 2017-05-31.
 */
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BaseHrefWebpackPlugin = require('base-href-webpack-plugin').BaseHrefWebpackPlugin;
const path = require('path');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const API = 'http://api.mittbolan.local';
const base = '';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'js/[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin({filename: 'assets/css/[name].[hash].css'}),
    new BaseHrefWebpackPlugin({ baseHref: '/' + base }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'API': JSON.stringify(API)
      }
    }),
    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([{
      from: __dirname + '/src/public'
    }])
  ]
});