const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackProcessingPlugin = require('html-webpack-processing-plugin');
const yargs = require('yargs').argv;

module.exports = () => {
  const env = yargs.mode ? yargs.mode : 'development';

  return {
    devtool: 'inline-source-map',
    entry: './src/App.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './',
      publicPath: '/dist/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', /*"eslint-loader"*/],
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            'postcss-loader',
          ],
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {},
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        hash: true,
        template: path.resolve(__dirname, `./index.html`),
        base: env === 'production' ? 'https://ssmak.github.io/whatsapp.to/' : '/',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
      }),
      new HtmlWebpackProcessingPlugin(),
    ],
    stats: {
      children: false,
    }
  };
}