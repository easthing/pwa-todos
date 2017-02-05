const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
      main: './src/main',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]--[hash:base64:5]',
        }
      }]
    }]
  }
};

module.exports = config;
