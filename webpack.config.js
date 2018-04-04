const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const isProd = env === 'production';
  let NODE_ENV = JSON.stringify('development');

  if (isProd) {
    NODE_ENV = JSON.stringify('production');
  }

  return {
    entry: './src/index.jsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
      ],
    },
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    devServer: {
      port: 3001,
      historyApiFallback: true,
      hot: true,
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      overlay: {
        warnings: true,
        errors: true,
      },
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV,
        },
      }),
      new HtmlWebpackPlugin({
        title: '',
        template: 'index.ejs',
        minify: {
          collapseWhitespace: true,
        },
      }),
    ],
  };
};
