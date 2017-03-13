const config = {
   entry: './main.js',
   output: {
      path:'./build',
      filename: 'index.js',
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
   externals: {
     'react/addons': true
   }
}
module.exports = config;
