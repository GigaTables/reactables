const atImport = require("postcss-smart-import");
const autoprefixer = require('autoprefixer');
const rucksack = require('rucksack-css');
const csswring = require('csswring');

module.exports = function () {
  return [
    atImport,
    rucksack(),
    autoprefixer({
      browsers: ['last 2 versions']
    }),
    csswring
  ];
};
