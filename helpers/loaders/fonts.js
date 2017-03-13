module.exports = [
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?name=font.[hash].[ext]&limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader?name=font.[hash].[ext]'
  }
];