const path = require('path');

module.exports = {
  entry: path.join(__dirname, './src/index.jsx'),
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  target: "electron",
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /^((?!\.module).)*\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.module.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      },
    ]
  }
};