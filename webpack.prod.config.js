const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const SWAManifestWebpackPlugin = require('pwa-manifest-webpack-plugin');

const config = {
  entry: {
      main: './src/main',
      vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[local]--[hash:base64:5]'
          }
        }
      })
    }]
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new ExtractTextPlugin("styles.[hash].css"),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index_tpl.ejs',
      inject: true,
      minify: {collapseWhitespace: false}
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'pwa-todos',
      filename: 'sw.js',
    }),
    new SWAManifestWebpackPlugin({
      name: 'Todos',
      description: 'a todo demo of pwa',
      icon: path.resolve('src/images/icon.jpg'),
    })
  ]
};

module.exports = config;
