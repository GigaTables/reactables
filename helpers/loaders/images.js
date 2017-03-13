module.exports = {
  test: /\.(jpe?g|png|gif)$/i,
  loaders: [
    'file?hash=sha512&digest=hex&name=[hash].[ext]'
  ]
};
