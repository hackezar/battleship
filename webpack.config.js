const path = require('path');


// Link to webpack Development page//
// https://webpack.js.org/guides/development/

// Below requires the plugins to minimize css
// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: 'development',
  plugins: [
    // Homepage for app
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
    // Actual game page for app
    new HtmlWebpackPlugin({
      filename: 'app.html',
      template: 'src/app.html',
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  entry: {
    index: './src/index.js',
    shipPlacement: './src/shipPlacement.js',
    app: './src/app.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    hot: true,
    liveReload: false,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
    /* For webpack@5 you can use the `...` syntax to extend existing minimizers
         (i.e. `terser-webpack-plugin`), uncomment the next line */
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};
