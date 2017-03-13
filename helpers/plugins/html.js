const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: path.normalize(__dirname + '/../template.ejs')
});