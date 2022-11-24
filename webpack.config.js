const path = require('path');
var glob = require("glob");

const entryPoints = glob.sync('./routines/*.js')
  .map(file => ({...path.parse(file), fileName: file}))
  .reduce((stack, file) => {
    return {...stack, [file.name]: file.fileName}
  }, {});

module.exports = {
  entry: entryPoints,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    },
  },
};