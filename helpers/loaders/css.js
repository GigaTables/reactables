const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
  return module.exports = {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('style', ['css', 'postcss'])
  }
}

module.exports = {
  test: /\.css$/,
  loaders: ['style', 'css', 'postcss']
};