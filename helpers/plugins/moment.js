const webpack = require('webpack');

module.exports = new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /ru|en-gb/);
