const path = require('path');
const webpack = require('webpack');

const port = process.env.PORT || 8080;
const publicPath = `http://localhost:${port}/public/`;

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, './src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js',
    publicPath: publicPath,
  },
  target: "electron",
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: [
            'react-hot-loader/babel'
          ],
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
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: 'url-loader',
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  devServer: {
    port,
    publicPath,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'public'),
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
  }
};