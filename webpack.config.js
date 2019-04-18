const path = require('path');
const glob = require('glob-all');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
    main: ['./assets/js/bundle.js', './assets/sass/styles.scss']
	},
	output: {
		filename: './dist/js/[name].js',
    sourceMapFilename: './assets/js/[name].map'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [autoprefixer]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            },
          ],
          fallback: 'style-loader',
          publicPath: '/assets/'
        })
      },
    ]
  },
  plugins: [
    // Clean './dist' folder
    new CleanWebpackPlugin('./dist/'),
    // Create CSS file
    new ExtractTextPlugin({
      filename: './dist/css/[name].css',
      allChunks: true
    }),
    // Uglify JS File
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true
        }
      }
    }),
    // Purify CSS (Minify)
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, '*.htm')
      ]),
      minimize: true,
      purifyOptions: {
          whitelist: []
      }
    }),
    new HtmlWebpackPlugin({
      template : path.join(__dirname, 'index.htm'),
      filename : 'index.min.htm',
      inject   : false,
      minify   : {
        html5                          : true,
        minifyCSS                      : true,
        minifyJS                       : true,
        collapseWhitespace             : true,
        minifyURLs                     : false,
        removeAttributeQuotes          : true,
        removeComments                 : true,
        removeEmptyAttributes          : true,
        removeOptionalTags             : true,
        removeRedundantAttributes      : true,
        removeScriptTypeAttributes     : true,
        removeStyleLinkTypeAttributese : true,
        useShortDoctype                : true
      }
    }),
  ],
  devtool: 'source-map'
}