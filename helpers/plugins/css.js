const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = new ExtractTextPlugin('[name].css', { allChunks: true });
