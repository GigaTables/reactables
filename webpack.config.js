const package = require('./package.json');
const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './main.js',
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
                    presets: ['es2015', 'react', 'stage-0'] // stage-2 = transform-object-rest-spread etc
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
    },
};
module.exports = config;
