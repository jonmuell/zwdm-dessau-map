const path = require('path');

module.exports = {
  entry: {
    main: './src/scripts/map.js',
    addData: './src/scripts/addData.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
};