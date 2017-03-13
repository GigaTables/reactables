const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
  return module.exports = {
    test: /\.(scss|sass)$/,
    loader: ExtractTextPlugin.extract('style', ['css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass'])
  }
}

module.exports = {
  test: /\.(scss|sass)$/,
  loaders: ['style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss', 'sass']
};