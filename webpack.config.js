const config = {
   entry: './main.js',
   output: {
      path:'/',
      filename: 'index.js',
   },
   devServer: {
      inline: true,
      port: 8888
   },
   module: {
      loaders: [
         {
            test: /\.(jsx?|css)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            // ExtractTextPlugin.extract({
            //   notExtractLoader: 'style-loader',
            //   loader: 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!resolve-url!postcss',
            // }),
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
  //  plugins: [
    //  new ExtractTextPlugin({
    //    filename: 'app.css'
    //  })
  //  ]
}

module.exports = config;
