/**
 * Created by AlexEOL on 22.02.17.
 */
const webpack = require('webpack');
const keys = require('lodash/keys');

module.exports = vars => new webpack.DefinePlugin((
  keys(vars).reduce((prev, next) => Object.assign(prev, { [next]: JSON.stringify(vars[next]) }), {})
));
