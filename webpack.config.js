const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    App: "./src/components/App.js"
  },
  module: {
    rules:[{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
  }, {
      test: /\.css$/,
      use: [
          'style-loader',
          'css-loader'
      ]
  },{
    loader: "file-loader",
    test:/\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.wav$|\.ttf$|\.mp3$|\.ico$/
}
  
]
  },

  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public")
  },
  
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
  }),
  
  ]
};