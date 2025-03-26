const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/runner.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'runner.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/DS_Runner.html',
      filename: 'DS_Runner.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './config.json' }],
    }),
  ],
  devServer: {
    historyApiFallback: {
      // disableDotRule: true,
      rewrites: [{ from: /(.*)/, to: '/DS_Runner.html' }],
    },
    port: 3000,
  },
};
