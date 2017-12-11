/**
 * Created by mikkri on 2017-04-20.
 */
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js', '.json', '.css', '.html'],

    // An array of directory names to be resolved to the current directory
    modules: [path.join(__dirname, '/src'), 'node_modules']
  },

  module: {
    loaders: [
      // Support for .ts files.
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader?', 'angular2-template-loader', '@angularclass/hmr-loader'],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },

      // copy those assets to output
      // file-loader?name=assets/fonts/[name].[hash].[ext]?
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },

      // Support for *.json files.
      {test: /\.json$/, loader: 'json-loader'},

      // Support for CSS as raw text
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.css$/,
        exclude: path.join(__dirname, '/src/app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader']})
      },
      // all css required in src/app files will be merged in js files
      {test: /\.css$/, include: path.join(__dirname, '/src/app'), loader: 'raw-loader!postcss-loader'},

      // support for .scss files
      // use 'null' loader in test mode (https://github.com/webpack/null-loader)
      // all css in src/style will be bundled in an external css file
      {
        test: /\.(scss|sass)$/,
        exclude: path.join(__dirname, '/src/app'),
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader']})
      },
      // all css required in src/app files will be merged in js files
      {test: /\.(scss|sass)$/, exclude: path.join(__dirname, '/src/style'), loader: 'raw-loader!postcss-loader!sass-loader'},

      // support for .html as raw text
      // todo: change the loader to something that adds a hash to images
      {test: /\.html$/, loader: 'raw-loader',  exclude: path.join(__dirname, '/src/public')}
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),

    // Workaround needed for angular 2 angular/angular#11580
    new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('./src'),
        {}
    ),

    // Tslint configuration for webpack 2
    new webpack.LoaderOptionsPlugin({
      options: {
        /**
         * Apply the tslint loader as pre/postLoader
         * Reference: https://github.com/wbuchwalter/tslint-loader
         */
        tslint: {
          emitErrors: false,
          failOnHint: false
        },
        /**
         * Sass
         * Reference: https://github.com/jtangelder/sass-loader
         * Transforms .scss files to .css
         */
        sassLoader: {
          //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
        },
        /**
         * PostCSS
         * Reference: https://github.com/postcss/autoprefixer-core
         * Add vendor prefixes to your css
         */
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      chunksSortMode: 'dependency'
      //favicon: 'src/favicon/favicon.icns'
    }),
  ]
};