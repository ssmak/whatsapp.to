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
      path: path.resolve(__dirname, './docs'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './',
      publicPath: '/docs/'
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
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
        preProcessing: (originalHTML) => {
          // Check if production build
          if(env === 'production') {
            // Remove development code
            originalHTML = originalHTML.replace(/<script src="docs\/bundle.js"><\/script>/, "");
            originalHTML = originalHTML.replace(/<base href="\/">/, "<base href='/docs'>");
          }

          return originalHTML;
        },
      }),
      new HtmlWebpackProcessingPlugin(),
    ],
    stats: {
      children: false,
    }
  };
}