const package = require('./package.json');
const webpack = require('webpack');
const path = require('path');

const config = {
   entry: './src/Reactables.jsx',
   output: {
      path: path.normalize(__dirname + '/build'),
      publicPath: '',
      filename: 'index.js',
      library: '[name]',
      chunkFilename: '[name].[chunkhash].js'
   },
   devServer: {
      inline: true,
      port: 8888
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
          test: /\.css$/,
          loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
         },
         {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
      ]
   },
   plugins: []
    //  .concat(require('./helpers/plugins/injectVars')({
    //    bundleName: package.name,
    //    bundleVersion: package.version,
    //    bundleDescription: package.description,
    //    bundleAuthor: package.author,
    //    isPlatform: false,
    //  }))
     .concat(require('./helpers/plugins/css'))
     .concat(require('./helpers/plugins/uglify'))
     .concat(require('./helpers/plugins/html')),
   externals: {
     'react/addons': true
   }
}
module.exports = config;
