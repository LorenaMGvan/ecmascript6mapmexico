const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {

    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      },
      {
        test: /\.scss$/,
          use: [{
            loader: "style-loader"
          }, {
            loader: "css-loader" 
          }, {
            loader: "sass-loader"
          }]
      },     
      {
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset",
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,       
      }
    ],
        
    // rules: [
    //   {
    //     test: /\.(js)$/,
    //     exclude: /node_modules/,
    //     use: ['babel-loader'],
    //   },
    // ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new MiniCssExtractPlugin(),
    // new CopyWebpackPlugin([{from: 'images/'}]),    
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),    
    new CopyPlugin({
      patterns: [
        { from: "src/img", to: "img" },
        // { from: "other", to: "public" },
      ],
    }),
  ],
};
