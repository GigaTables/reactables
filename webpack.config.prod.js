const package = require('./package.json');
const path = require('path');

const config = {
    mode: 'production',
    entry: './main.prod.js',
    output: {
        path: path.normalize(__dirname + '/build'),
        publicPath: '',
        filename: 'index.js',
        library: '[name]',
        chunkFilename: '[name].[chunkhash].js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devServer: {
        inline: true,
        port: 8888
    },
    module: {
        rules: [
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
    plugins: []
        .concat(require('./helpers/plugins/injectVars')({
            bundleName: package.name,
            bundleVersion: package.version,
            bundleDescription: package.description,
            bundleAuthor: package.author,
            isPlatform: false,
        })),
    externals: {
        'react/addons': true
    }
};
module.exports = config;
