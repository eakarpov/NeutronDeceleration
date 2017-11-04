const path = require('path');
const externals = require('./src/package.json').dependencies;

module.exports = {
  externals: Object.keys(externals || {}),
  entry: path.join(__dirname, './src/index.jsx'),
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};